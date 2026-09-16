<?php
require_once 'config.php';

// بارگذاری Geographer (در صورت وجود)
use MenaraSolutions\Geographer\Earth;

header('Content-Type: application/json');

// دریافت پارامترها
$lat = isset($_GET['lat']) ? $_GET['lat'] : null;
$lon = isset($_GET['lon']) ? $_GET['lon'] : null;
$city = isset($_GET['city']) ? $_GET['city'] : null;
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';
$type = isset($_GET['type']) ? $_GET['type'] : 'weather'; // weather, weekly, suggest

// اعتبارسنجی زبان
if (!in_array($lang, ['en', 'fa', 'es'])) {
    $lang = 'en';
}


// تابع ترجمه با Geographer (فقط برای فارسی)
function getGeographerCities() {
    // ساخته می‌شود فقط یک بار در طول اجرای اسکریپت (نه هر بار که تابع صدا زده می‌شود)
    static $cities = null;
    if ($cities === null) {
        $earth = new Earth();
        $cities = $earth->findAll('City');
    }
    return $cities;
}

function translateCityWithGeographer($cityName, $lang) {
    global $geographerAvailable;
    if ($lang !== 'fa' || !$geographerAvailable) {
        return $cityName;
    }
    try {
        $cities = getGeographerCities();
        foreach ($cities as $city) {
            $localNames = $city->getLocalNames();
            if (isset($localNames['fa']) && stripos($localNames['fa'], $cityName) !== false) {
                return $city->getName();
            }
            if (stripos($city->getName(), $cityName) !== false) {
                return $city->getName();
            }
        }
        return $cityName;
    } catch (Exception $e) {
        return $cityName;
    }
}


// تابع ترجمه با Google Translate (Fallback)
function translateWithGoogle($text, $targetLang = 'en') {
    if (!defined('GOOGLE_TRANSLATE_API_KEY') || empty(GOOGLE_TRANSLATE_API_KEY)) {
        return $text;
    }
    
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
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        return $text;
    }
    
    $result = json_decode($response, true);
    if (isset($result['data']['translations'][0]['translatedText'])) {
        return $result['data']['translations'][0]['translatedText'];
    }
    return $text;
}


// تابع ترکیبی ترجمه (برای جستجوی اصلی)
function translateCityName($cityName, $lang) {
    $translated = translateCityWithGeographer($cityName, $lang);
    if ($translated === $cityName && $lang === 'fa') {
        $translated = translateWithGoogle($cityName);
    }
    return $translated;
}


// تابع کمکی برای درخواست با cURL
function fetchUrl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    // این خطا رو لاگ کن تا وقتی یک API (مثل Open-Meteo) همیشه fail میشه، بفهمیم چرا
    if ($curlError || $httpCode !== 200) {
        error_log("fetchUrl -> {$url} | httpCode={$httpCode} | curlError=" . ($curlError ?: 'none'));
    }

    return ['response' => $response, 'httpCode' => $httpCode, 'error' => $curlError];
}


// فرمت‌دهی مختصات بدون وابستگی به locale سرور
// (جلوگیری از تبدیل نقطه اعشار به کاما در برخی تنظیمات locale)
function fmtCoord($value) {
    return sprintf('%.6F', (float)$value);
}


// تابع جستجوی شهر با OpenWeatherMap (Fallback)
function searchCityWithOpenWeatherMap($cityName) {
    if (!defined('OPENWEATHER_API_KEY') || empty(OPENWEATHER_API_KEY)) {
        return null;
    }
    
    $url = "http://api.openweathermap.org/geo/1.0/direct?q=" . urlencode($cityName) . "&limit=1&appid=" . OPENWEATHER_API_KEY;
    $result = fetchUrl($url);
    
    if ($result['httpCode'] !== 200) {
        return null;
    }
    
    $data = json_decode($result['response'], true);
    if (!empty($data)) {
        return [
            'lat' => $data[0]['lat'],
            'lon' => $data[0]['lon'],
            'name' => $data[0]['name'],
            'country' => $data[0]['country']
        ];
    }
    return null;
}


// بخش Suggest (پیشنهادات حین تایپ)
if ($type === 'suggest') {
    $q = isset($_GET['q']) ? $_GET['q'] : '';
    if (strlen($q) < 2) {
        echo json_encode([]);
        exit;
    }
    
    // ترجمه کوئری تایپ‌شده (فارسی/غیرلاتین به انگلیسی) قبل از جستجو
    $searchQuery = translateCityName($q, $lang);

    // اول با WeatherAPI جستجو کن
    $url = "http://api.weatherapi.com/v1/search.json?key=" . WEATHER_API_KEY . "&q=" . urlencode($searchQuery) . "&lang=" . $lang;
    $result = fetchUrl($url);
    
    if ($result['httpCode'] === 200) {
        $suggestData = json_decode($result['response'], true);
        if (!empty($suggestData)) {
            echo $result['response'];
            exit;
        }
        // WeatherAPI با HTTP 200 برگشت ولی آرایه خالی بود → برو سراغ Fallback
    }
    
    // اگر WeatherAPI جواب نداد، از OpenWeatherMap استفاده کن
    $openWeatherResult = searchCityWithOpenWeatherMap($searchQuery);
    if ($openWeatherResult) {
        $formatted = [[
            'id' => 0,
            'name' => $openWeatherResult['name'],
            'region' => '',
            'country' => $openWeatherResult['country'],
            'lat' => $openWeatherResult['lat'],
            'lon' => $openWeatherResult['lon'],
            'url' => ''
        ]];
        echo json_encode($formatted);
        exit;
    }
    
    echo json_encode([]);
    exit;
}


// جستجوی شهر با نام (برای type=weather یا weekly)

if ($city && !$lat && !$lon) {
    // ترجمه نام شهر (فارسی به انگلیسی) با ترکیب Geographer + Google
    $searchQuery = translateCityName($city, $lang);
    
    // ۱. اول با WeatherAPI جستجو کن
    $searchUrl = "http://api.weatherapi.com/v1/search.json?key=" . WEATHER_API_KEY . "&q=" . urlencode($searchQuery) . "&lang=" . $lang;
    $result = fetchUrl($searchUrl);
    
    if ($result['httpCode'] === 200) {
        $searchData = json_decode($result['response'], true);
        if (!empty($searchData)) {
            $lat = $searchData[0]['lat'];
            $lon = $searchData[0]['lon'];
        }
    }
    
    // ۲. اگر WeatherAPI پیدا نکرد، از OpenWeatherMap به‌عنوان Fallback استفاده کن
    if (!$lat || !$lon) {
        $openWeatherResult = searchCityWithOpenWeatherMap($searchQuery);
        if ($openWeatherResult) {
            $lat = $openWeatherResult['lat'];
            $lon = $openWeatherResult['lon'];
        }
    }
    
    // ۳. اگر هیچ‌کدام پیدا نکردند، خطا بده
    if (!$lat || !$lon) {
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


// بخش ۱: امروز و فردا (WeatherAPI)

if ($type === 'weather') {
    $latStr = fmtCoord($lat);
    $lonStr = fmtCoord($lon);
    $url = "http://api.weatherapi.com/v1/forecast.json?key=" . WEATHER_API_KEY 
           . "&q={$latStr},{$lonStr}&days=2&lang={$lang}";
    $result = fetchUrl($url);
    
    if ($result['httpCode'] !== 200) {
        http_response_code($result['httpCode']);
        echo json_encode(['error' => 'خطا در دریافت اطلاعات آب و هوا']);
        exit;
    }
    
    echo $result['response'];
    exit;
}


// بخش ۲: هفتگی (Open-Meteo) با Fallback به WeatherAPI
if ($type === 'weekly') {
    $latStr = fmtCoord($lat);
    $lonStr = fmtCoord($lon);
    $url = "https://api.open-meteo.com/v1/forecast?latitude={$latStr}&longitude={$lonStr}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7";
    $result = fetchUrl($url);
    
    if ($result['httpCode'] !== 200) {
        error_log("Open-Meteo weekly forecast failed for lat={$latStr}, lon={$lonStr}: httpCode={$result['httpCode']}, curlError=" . ($result['error'] ?: 'none') . ", body=" . substr((string)$result['response'], 0, 300));

        // Fallback به WeatherAPI (فقط ۳ روز - محدودیت پلن رایگان WeatherAPI)
        $fallbackUrl = "http://api.weatherapi.com/v1/forecast.json?key=" . WEATHER_API_KEY 
                      . "&q={$latStr},{$lonStr}&days=3&lang={$lang}";
        $fallbackResult = fetchUrl($fallbackUrl);
        if ($fallbackResult['httpCode'] === 200) {
            echo $fallbackResult['response'];
        } else {
            echo json_encode(['error' => 'خطا در دریافت اطلاعات هفتگی']);
        }
        exit;
    }
    
    $data = json_decode($result['response'], true);
    if (!$data || !isset($data['daily'])) {
        echo json_encode(['error' => 'داده‌های Open-Meteo نامعتبر']);
        exit;
    }
    
    $converted = convertOpenMeteoToWeatherAPI($data, $lat, $lon, $lang);
    echo json_encode($converted);
    exit;
}


// اگر نوع نامشخص بود، پیش‌فرض weather
$latStr = fmtCoord($lat);
$lonStr = fmtCoord($lon);
$url = "http://api.weatherapi.com/v1/forecast.json?key=" . WEATHER_API_KEY 
       . "&q={$latStr},{$lonStr}&days=2&lang={$lang}";
$result = fetchUrl($url);
if ($result['httpCode'] !== 200) {
    http_response_code($result['httpCode']);
    echo json_encode(['error' => 'خطا در ارتباط با سرویس هواشناسی']);
    exit;
}
echo $result['response'];


// تابع تبدیل Open-Meteo به فرمت WeatherAPI
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
                'avgtemp_c' => round(($daily['temperature_2m_max'][$i] + $daily['temperature_2m_min'][$i]) / 2, 1),
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
?>