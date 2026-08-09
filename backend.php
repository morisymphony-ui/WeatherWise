<?php
require_once 'config.php';

header('Content-Type: application/json');

// دریافت پارامترها
$lat = isset($_GET['lat']) ? $_GET['lat'] : null;
$lon = isset($_GET['lon']) ? $_GET['lon'] : null;
$city = isset($_GET['city']) ? $_GET['city'] : null;
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';

// اعتبارسنجی زبان
if (!in_array($lang, ['en', 'fa', 'es'])) {
    $lang = 'en';
}

// اگر شهر داده شده، آن را به مختصات تبدیل کن
if ($city && !$lat && !$lon) {
    $geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" . urlencode($city) . "&limit=1&appid=" . GEO_API_KEY;
    $geoResponse = file_get_contents($geoUrl);
    $geoData = json_decode($geoResponse, true);
    
    if (!empty($geoData)) {
        $lat = $geoData[0]['lat'];
        $lon = $geoData[0]['lon'];
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'شهر پیدا نشد']);
        exit;
    }
}

// اعتبارسنجی مختصات
if (!is_numeric($lat) || !is_numeric($lon)) {
    http_response_code(400);
    echo json_encode(['error' => 'مختصات نامعتبر']);
    exit;
}

// ساخت URL درخواست به WeatherAPI
$url = "http://api.weatherapi.com/v1/forecast.json?key=" . WEATHER_API_KEY 
       . "&q={$lat},{$lon}&days=2&lang={$lang}";

// ارسال درخواست با cURL
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