<?php
require_once 'config.php';

// ============================================
// لود کردن Geographer (اگر با Composer نصب شده)
// ============================================
require_once 'vendor/autoload.php'; // اگر Composer داری

// اگر Composer نداری، این رو فعال کن:
// require_once 'vendor/menarasolutions/geographer/src/Earth.php';
// use MenaraSolutions\Geographer\Earth;

use MenaraSolutions\Geographer\Earth;

header('Content-Type: application/json');

$lat = isset($_GET['lat']) ? $_GET['lat'] : null;
$lon = isset($_GET['lon']) ? $_GET['lon'] : null;
$city = isset($_GET['city']) ? $_GET['city'] : null;
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';
$type = isset($_GET['type']) ? $_GET['type'] : 'weather'; // weather, weekly, suggest

if (!in_array($lang, ['en', 'fa', 'es'])) {
    $lang = 'en';
}

// ============================================
// تابع تبدیل نام فارسی شهر به انگلیسی با Geographer
// ============================================
function translateCityWithGeographer($cityName, $lang) {
    // فقط برای فارسی ترجمه کن
    if ($lang !== 'fa') {
        return $cityName;
    }
    
    try {
        $earth = new Earth();
        
        // جستجوی شهر در پایگاه داده Geographer
        $cities = $earth->findAll('City');
        
        // جستجوی اسم فارسی
        foreach ($cities as $city) {
            // بررسی کنید که نام فارسی با ورودی مطابقت داره یا نه
            $localNames = $city->getLocalNames();
            if (isset($localNames['fa']) && stripos($localNames['fa'], $cityName) !== false) {
                return $city->getName(); // برگردون اسم انگلیسی
            }
            // بررسی اسم رسمی (به انگلیسی)
            if (stripos($city->getName(), $cityName) !== false) {
                return $city->getName();
            }
        }
        
        // اگر پیدا نشد، اسم اصلی رو برگردون
        return $cityName;
    } catch (Exception $e) {
        // اگر Geographer خطا داد، برگرد به اسم اصلی
        return $cityName;
    }
}

// ============================================
// تابع Fallback با Google Translate
// ============================================
function translateWithGoogle($text, $targetLang = 'en') {
    $apiKey = GOOGLE_TRANSLATE_API_KEY;
    $url = "https://translation.googleapis.com/language/translate/v2?key={$apiKey}";
    
    $data = [
        'q' => $text,
        'target' => $targetLang,
        'source' => 'fa'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $result = json_decode($response, true);
    if (isset($result['data']['translations'][0]['translatedText'])) {
        return $result['data']['translations'][0]['translatedText'];
    }
    
    return $text;
}

// ============================================
// تابع اصلی ترجمه (ترکیبی)
// ============================================
function translateCityName($cityName, $lang) {
    // ۱. اول با Geographer امتحان کن
    $translated = translateCityWithGeographer($cityName, $lang);
    
    // ۲. اگه Geographer نتونست ترجمه کنه (همون اسم برگشت)، از Google Translate استفاده کن
    if ($translated === $cityName && $lang === 'fa') {
        $translated = translateWithGoogle($cityName);
    }
    
    return $translated;
}

// ============================================
// جستجوی شهر با WeatherAPI
// ============================================
if ($city && !$lat && !$lon) {
    // ترجمه اسم شهر (فارسی به انگلیسی)
    $searchQuery = translateCityName($city, $lang);
    
    $searchUrl = "http://api.weatherapi.com/v1/search.json?key=" . WEATHER_API_KEY . "&q=" . urlencode($searchQuery) . "&lang=" . $lang;
    $searchResponse = file_get_contents($searchUrl);
    $searchData = json_decode($searchResponse, true);
    
    if (!empty($searchData)) {
        $lat = $searchData[0]['lat'];
        $lon = $searchData[0]['lon'];
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'شهر پیدا نشد']);
        exit;
    }
}

if (!is_numeric($lat) || !is_numeric($lon)) {
    http_response_code(400);
    echo json_encode(['error' => 'مختصات نامعتبر']);
    exit;
}

// ============================================
// بخش ۱: برای امروز و فردا (WeatherAPI)
// ============================================
if ($type === 'weather' || !isset($_GET['type'])) {
    $url = "http://api.weatherapi.com/v1/forecast.json?key=" . WEATHER_API_KEY 
           . "&q={$lat},{$lon}&days=2&lang={$lang}";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        http_response_code($httpCode);
        echo json_encode(['error' => 'خطا در ارتباط با سرویس هواشناسی']);
        exit;
    }
    
    echo $response;
    exit;
}

// ============================================
// بخش ۲: برای ۷ روز آینده (Open-Meteo)
// ============================================
if ($type === 'weekly') {
    $url = "https://api.open-meteo.com/v1/forecast?latitude={$lat}&longitude={$lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        // Fallback به WeatherAPI
        $fallbackUrl = "http://api.weatherapi.com/v1/forecast.json?key=" . WEATHER_API_KEY 
                      . "&q={$lat},{$lon}&days=3&lang={$lang}";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $fallbackUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($ch);
        curl_close($ch);
        
        echo $response;
        exit;
    }
    
    $data = json_decode($response, true);
    if (!$data || !isset($data['daily'])) {
        echo json_encode(['error' => 'داده‌های Open-Meteo نامعتبر']);
        exit;
    }
    
    $converted = convertOpenMeteoToWeatherAPI($data, $lat, $lon, $lang);
    echo json_encode($converted);
    exit;
}

// ============================================
// بخش ۳: پیشنهادات شهر (برای datalist)
// ============================================
if ($type === 'suggest') {
    $q = isset($_GET['q']) ? $_GET['q'] : '';
    if (strlen($q) < 2) {
        echo json_encode([]);
        exit;
    }
    
    // اگه فارسی بود، ترجمه کن
    $searchQuery = translateCityName($q, $lang);
    
    $url = "http://api.weatherapi.com/v1/search.json?key=" . WEATHER_API_KEY . "&q=" . urlencode($searchQuery) . "&lang=" . $lang;
    $response = file_get_contents($url);
    echo $response;
    exit;
}

// ============================================
// تابع تبدیل Open-Meteo به فرمت WeatherAPI
// ============================================
function convertOpenMeteoToWeatherAPI($data, $lat, $lon, $lang) {
    $daily = $data['daily'];
    $forecastDays = [];
    
    $weatherCodes = [
        0 => 'Clear', 1 => 'Clear', 2 => 'Partly cloudy', 3 => 'Overcast',
        45 => 'Fog', 48 => 'Fog',
        51 => 'Light drizzle', 53 => 'Moderate drizzle', 55 => 'Heavy drizzle',
        56 => 'Light freezing drizzle', 57 => 'Heavy freezing drizzle',
        61 => 'Light rain', 63 => 'Moderate rain', 65 => 'Heavy rain',
        66 => 'Light freezing rain', 67 => 'Heavy freezing rain',
        71 => 'Light snow', 73 => 'Moderate snow', 75 => 'Heavy snow',
        77 => 'Snow grains',
        80 => 'Light rain shower', 81 => 'Moderate rain shower', 82 => 'Heavy rain shower',
        85 => 'Light snow shower', 86 => 'Heavy snow shower',
        95 => 'Thunderstorm', 96 => 'Thunderstorm with light hail', 99 => 'Thunderstorm with heavy hail',
    ];
    
    $weatherEmojis = [
        0 => '☀️', 1 => '☀️', 2 => '⛅', 3 => '☁️',
        45 => '🌫️', 48 => '🌫️',
        51 => '🌧️', 53 => '🌧️', 55 => '🌧️',
        56 => '🌧️❄️', 57 => '🌧️❄️',
        61 => '🌧️', 63 => '🌧️', 65 => '⛈️',
        66 => '🌧️❄️', 67 => '🌧️❄️',
        71 => '🌨️', 73 => '🌨️', 75 => '❄️',
        77 => '❄️',
        80 => '🌦️', 81 => '🌧️', 82 => '⛈️',
        85 => '🌨️', 86 => '❄️',
        95 => '⛈️', 96 => '⛈️', 99 => '⛈️',
    ];
    
    for ($i = 0; $i < count($daily['time']); $i++) {
        $code = $daily['weather_code'][$i];
        $condition = isset($weatherCodes[$code]) ? $weatherCodes[$code] : 'Unknown';
        $emoji = isset($weatherEmojis[$code]) ? $weatherEmojis[$code] : '🌤️';
        
        $forecastDays[] = [
            'date' => $daily['time'][$i],
            'day' => [
                'avgtemp_c' => ($daily['temperature_2m_max'][$i] + $daily['temperature_2m_min'][$i]) / 2,
                'condition' => [
                    'text' => $condition,
                    'icon' => 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
                ],
                'emoji' => $emoji,
            ],
            'astro' => [
                'sunrise' => '06:00 AM',
                'sunset' => '06:00 PM',
            ]
        ];
    }
    
    return [
        'location' => [
            'name' => 'Location',
            'country' => 'Earth',
            'lat' => $lat,
            'lon' => $lon,
            'localtime' => date('Y-m-d H:i'),
            'tz_id' => 'UTC',
        ],
        'current' => [
            'temp_c' => $daily['temperature_2m_max'][0] ?? 20,
            'condition' => [
                'text' => $weatherCodes[$daily['weather_code'][0]] ?? 'Clear',
                'icon' => 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
            ],
            'humidity' => 50,
            'wind_kph' => 10,
            'uv' => 5,
        ],
        'forecast' => [
            'forecastday' => $forecastDays,
        ],
    ];
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo json_encode(['error' => 'خطا در ارتباط با سرویس هواشناسی']);
    exit;
}

// ارسال پاسخ به کلاینت
echo $response;
?>