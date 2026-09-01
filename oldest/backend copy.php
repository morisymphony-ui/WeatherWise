<?php
require_once 'config.php';

header('Content-Type: application/json');

$lat = isset($_GET['lat']) ? $_GET['lat'] : null;
$lon = isset($_GET['lon']) ? $_GET['lon'] : null;
$city = isset($_GET['city']) ? $_GET['city'] : null;
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';
$type = isset($_GET['type']) ? $_GET['type'] : 'weather'; // weather یا weekly

if (!in_array($lang, ['en', 'fa', 'es'])) {
    $lang = 'en';
}

// جستجوی شهر با WeatherAPI با پشتیبانی از زبان
if ($city && !$lat && !$lon) {
    // ارسال زبان به API برای جستجو
    $searchUrl = "http://api.weatherapi.com/v1/search.json?key=" . WEATHER_API_KEY . "&q=" . urlencode($city) . "&lang=" . $lang;
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

// 
// بخش ۱: برای امروز و فردا (WeatherAPI)
// 
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

// 
// بخش ۲: برای ۷ روز آینده (Open-Meteo)
// 
if ($type === 'weekly') {
    // تبدیل به فرمت Open-Meteo
    $url = "https://api.open-meteo.com/v1/forecast?latitude={$lat}&longitude={$lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        // Fallback به WeatherAPI برای ۳ روز
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
    
    // تبدیل داده‌های Open-Meteo به فرمت WeatherAPI
    $data = json_decode($response, true);
    if (!$data || !isset($data['daily'])) {
        echo json_encode(['error' => 'داده‌های Open-Meteo نامعتبر']);
        exit;
    }
    
    // تبدیل به فرمت مورد انتظار کلاینت
    $converted = convertOpenMeteoToWeatherAPI($data, $lat, $lon, $lang);
    echo json_encode($converted);
    exit;
}

// 
// تابع تبدیل Open-Meteo به فرمت WeatherAPI
// 
function convertOpenMeteoToWeatherAPI($data, $lat, $lon, $lang) {
    $daily = $data['daily'];
    $forecastDays = [];
    
    // نقشه کدهای آب و هوای Open-Meteo به متن
    $weatherCodes = [
        0 => 'Clear',
        1 => 'Clear',
        2 => 'Partly cloudy',
        3 => 'Overcast',
        45 => 'Fog',
        48 => 'Fog',
        51 => 'Light drizzle',
        53 => 'Moderate drizzle',
        55 => 'Heavy drizzle',
        56 => 'Light freezing drizzle',
        57 => 'Heavy freezing drizzle',
        61 => 'Light rain',
        63 => 'Moderate rain',
        65 => 'Heavy rain',
        66 => 'Light freezing rain',
        67 => 'Heavy freezing rain',
        71 => 'Light snow',
        73 => 'Moderate snow',
        75 => 'Heavy snow',
        77 => 'Snow grains',
        80 => 'Light rain shower',
        81 => 'Moderate rain shower',
        82 => 'Heavy rain shower',
        85 => 'Light snow shower',
        86 => 'Heavy snow shower',
        95 => 'Thunderstorm',
        96 => 'Thunderstorm with light hail',
        99 => 'Thunderstorm with heavy hail',
    ];
    
    // ایموجی‌ها برای Open-Meteo
    $weatherEmojis = [
        0 => '☀️',
        1 => '☀️',
        2 => '⛅',
        3 => '☁️',
        45 => '🌫️',
        48 => '🌫️',
        51 => '🌧️',
        53 => '🌧️',
        55 => '🌧️',
        56 => '🌧️❄️',
        57 => '🌧️❄️',
        61 => '🌧️',
        63 => '🌧️',
        65 => '⛈️',
        66 => '🌧️❄️',
        67 => '🌧️❄️',
        71 => '🌨️',
        73 => '🌨️',
        75 => '❄️',
        77 => '❄️',
        80 => '🌦️',
        81 => '🌧️',
        82 => '⛈️',
        85 => '🌨️',
        86 => '❄️',
        95 => '⛈️',
        96 => '⛈️',
        99 => '⛈️',
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
                    'icon' => 'https://cdn.weatherapi.com/weather/64x64/day/113.png', // placeholder
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