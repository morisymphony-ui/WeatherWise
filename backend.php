<?php
require_once 'config.php';


// سخت گیری امنیتی: خطاهای PHP هرگز مستقیم به کاربر نمایش داده نشن
// (فقط توی لاگ سرور ثبت می شن؛ جلوگیری از لو رفتن مسیر فایل ها/ساختار سرور)
error_reporting(E_ALL);
ini_set('display_errors', '0');


// بارگذاری Geographer (در صورت وجود)
use MenaraSolutions\Geographer\Earth;

header('Content-Type: application/json');


// دریافت و اعتبارسنجی پارامترهای ورودی
$lat = isset($_GET['lat']) ? $_GET['lat'] : null;
$lon = isset($_GET['lon']) ? $_GET['lon'] : null;
$city = isset($_GET['city']) ? trim((string)$_GET['city']) : null;
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';
$type = isset($_GET['type']) ? $_GET['type'] : 'weather'; // weather, weekly, suggest

// اعتبارسنجی زبان (whitelist)
if (!in_array($lang, ['en', 'fa', 'es'])) {
    $lang = 'en';
}

// اعتبارسنجی type (whitelist) — به جای اجازه دادن به هر مقدار دلخواه
if (!in_array($type, ['weather', 'weekly', 'suggest'])) {
    $type = 'weather';
}

// اعتبارسنجی طول نام شهر — جلوگیری از ورودی های غیرمنطقی بلند
// (هم برای امنیت، هم برای جلوگیری از پر شدن بی رویه ی کش با ورودی های مزخرف)
if ($city !== null) {
    if (mb_strlen($city) > 100) {
        http_response_code(400);
        echo json_encode(['error' => 'نام شهر خیلی طولانیه']);
        exit;
    }
    // حذف کاراکترهای کنترلی نامرئی که می تونن باعث رفتار غیرمنتظره بشن
    $city = preg_replace('/[\x00-\x1F\x7F]/u', '', $city);
    if ($city === '') {
        $city = null;
    }
}


// تابع ترجمه با Geographer (فقط برای فارسی)
function getGeographerCities() {
    // ساخته می شود فقط یک بار در طول اجرای اسکریپت (نه هر بار که تابع صدا زده می شود)
    static $cities = null;
    if ($cities === null) {
        $earth = new Earth();
        $cities = $earth->findAll('City');
    }
    return $cities;
}

// تشخیص این که آیا متن ورودی خط فارسی/عربی داره یا نه
// (این تشخیص بر اساس خودِ متن تایپ شده ست، نه زبان انتخابی توی رابط کاربری —
//  چون ممکنه کاربر رابط رو روی انگلیسی گذاشته باشه ولی اسم شهر رو فارسی تایپ کنه، یا برعکس)
function containsPersianScript($text) {
    return (bool) preg_match('/[\x{0600}-\x{06FF}]/u', $text);
}

// نرمال سازی حروف فارسی: خیلی از کیبورد/صفحه کلیدها حروف عربیِ «ي» و «ك» رو تولید می کنن
// که ظاهرشون با حروف فارسیِ «ی» و «ک» یکیه ولی از نظر کدِ یونیکد کاملا متفاوتن —
// همین باعث می شه مقایسه ی دقیق رشته ای (مثل جستجو توی دیکشنری) بی صدا شکست بخوره.
// مثال: «ملایر» با یِ فارسی (U+06CC) با «ملایر» با یِ عربی (U+064A) STRING برابر نیست، با این که عینا یکی به نظر می رسن.
function normalizePersian($text) {
    $map = [
        "\u{064A}" => "\u{06CC}", // ي عربی -> ی فارسی
        "\u{0643}" => "\u{06A9}", // ك عربی -> ک فارسی
        "\u{0629}" => "\u{0647}", // ة -> ه
        "\u{0624}" => "\u{0648}", // ؤ -> و
        "\u{0626}" => "\u{06CC}", // ئ -> ی
        "\u{200C}" => ' ',        // نیم فاصله -> فاصله ی معمولی (برای مقایسه ی یکدست)
    ];
    return str_replace(array_keys($map), array_values($map), $text);
}

// دیکشنری مطمئنِ شهرهای معروف ایران (فارسی -> انگلیسی)
// این ها همیشه از این دیکشنری خونده میشن، نه از API ترجمه ی رایگان — چون اون API (MyMemory)
// برای اسم های خاص کوتاه گاهی ترجمه ی کاملا بی ربط برمی گردونه (مثلا «اراک» -> «Saint Lucia»)
function getKnownCityTranslation($cityName) {
    static $knownCities = [
        // مراکز استان ها
        'تهران' => 'Tehran', 'مشهد' => 'Mashhad', 'اصفهان' => 'Isfahan',
        'کرج' => 'Karaj', 'شیراز' => 'Shiraz', 'تبریز' => 'Tabriz',
        'قم' => 'Qom', 'اهواز' => 'Ahvaz', 'کرمانشاه' => 'Kermanshah',
        'رشت' => 'Rasht', 'زاهدان' => 'Zahedan', 'همدان' => 'Hamedan',
        'یزد' => 'Yazd', 'اردبیل' => 'Ardabil', 'بندرعباس' => 'Bandar Abbas',
        'اراک' => 'Arak', 'کرمان' => 'Kerman', 'ارومیه' => 'Urmia',
        'زنجان' => 'Zanjan', 'سنندج' => 'Sanandaj', 'قزوین' => 'Qazvin',
        'خرم آباد' => 'Khorramabad',
        'گرگان' => 'Gorgan', 'ساری' => 'Sari', 'بوشهر' => 'Bushehr',
        'ایلام' => 'Ilam', 'بیرجند' => 'Birjand', 'شهرکرد' => 'Shahrekord',
        'یاسوج' => 'Yasuj', 'سمنان' => 'Semnan', 'بجنورد' => 'Bojnord',
        // شهرهای پرجمعیت/معروف دیگه (غیر از مرکز استان)
        'نجف آباد' => 'Najafabad',
        'سبزوار' => 'Sabzevar', 'نیشابور' => 'Neyshabur',
        'قوچان' => 'Quchan', 'تربت حیدریه' => 'Torbat-e Heydarieh',
        'تربت جام' => 'Torbat-e Jam',
        'خمینی شهر' => 'Khomeinishahr', 'نطنز' => 'Natanz',
        'شاهرود' => 'Shahroud', 'دامغان' => 'Damghan',
        'بابل' => 'Babol', 'آمل' => 'Amol', 'قائم شهر' => 'Qaemshahr',
        'بهشهر' => 'Behshahr', 'رامسر' => 'Ramsar', 'نوشهر' => 'Noshahr',
        'چالوس' => 'Chalus', 'تنکابن' => 'Tonekabon',
        'گنبد کاووس' => 'Gonbad-e Kavus', 'علی آباد کتول' => 'Aliabad-e Katul',
        'رشتخوار' => 'Rashtkhvar', 'کاشمر' => 'Kashmar', 'گناباد' => 'Gonabad',
        'دزفول' => 'Dezful', 'آبادان' => 'Abadan', 'خرمشهر' => 'Khorramshahr',
        'بندر ماهشهر' => 'Bandar-e Mahshahr', 'ماهشهر' => 'Mahshahr',
        'شوشتر' => 'Shushtar', 'ایذه' => 'Izeh', 'اندیمشک' => 'Andimeshk',
        'مسجدسلیمان' => 'Masjed Soleyman',
        'بروجرد' => 'Borujerd', 'دورود' => 'Dorud', 'الیگودرز' => 'Aligudarz',
        'خوی' => 'Khoy', 'میاندوآب' => 'Miandoab', 'مراغه' => 'Maragheh',
        'مرند' => 'Marand', 'بناب' => 'Bonab', 'اهر' => 'Ahar',
        'ملایر' => 'Malayer', 'نهاوند' => 'Nahavand', 'تویسرکان' => 'Tuyserkan',
        'کاشان' => 'Kashan', 'ساوه' => 'Saveh',
        'محلات' => 'Mahallat', 'خمین' => 'Khomein',
        'میبد' => 'Meybod', 'اردکان' => 'Ardakan', 'بافق' => 'Bafq',
        'رفسنجان' => 'Rafsanjan', 'سیرجان' => 'Sirjan', 'جیرفت' => 'Jiroft',
        'بم' => 'Bam', 'زرند' => 'Zarand',
        'ایرانشهر' => 'Iranshahr', 'چابهار' => 'Chabahar', 'سراوان' => 'Saravan',
        'فسا' => 'Fasa', 'جهرم' => 'Jahrom', 'مرودشت' => 'Marvdasht',
        'کازرون' => 'Kazerun', 'لار' => 'Lar', 'داراب' => 'Darab',
        'سقز' => 'Saqqez', 'مریوان' => 'Marivan', 'بانه' => 'Baneh',
        'قروه' => 'Qorveh', 'کامیاران' => 'Kamyaran',
        'اسلام آباد غرب' => 'Eslamabad-e Gharb', 'پاوه' => 'Paveh',
        'سرپل ذهاب' => 'Sarpol-e Zahab', 'هرسین' => 'Harsin',
        'خرمدره' => 'Khorramdareh', 'ابهر' => 'Abhar',
        'کوهدشت' => 'Kuhdasht', 'الشتر' => 'Aleshtar',
        'لاهیجان' => 'Lahijan', 'لنگرود' => 'Langarud', 'آستارا' => 'Astara',
        'رودسر' => 'Rudsar', 'بندر انزلی' => 'Bandar-e Anzali', 'انزلی' => 'Anzali',
        'اسلام شهر' => 'Eslamshahr', 'ورامین' => 'Varamin', 'دماوند' => 'Damavand',
        'شهریار' => 'Shahriar', 'ری' => 'Rey', 'پاکدشت' => 'Pakdasht',
        'فردیس' => 'Fardis', 'نظرآباد' => 'Nazarabad',
        'خوانسار' => 'Khansar', 'گلپایگان' => 'Golpayegan', 'شاهین شهر' => 'Shahin Shahr',
        'فولادشهر' => 'Fooladshahr', 'زرین شهر' => 'Zarinshahr',
        'آباده' => 'Abadeh', 'اقلید' => 'Eqlid', 'فیروزآباد' => 'Firuzabad',
        'میناب' => 'Minab', 'جاسک' => 'Jask', 'کیش' => 'Kish', 'قشم' => 'Qeshm',
        'بستک' => 'Bastak', 'خاش' => 'Khash', 'زابل' => 'Zabol',
    ];
    $normalized = mb_strtolower(normalizePersian(trim($cityName)));
    foreach ($knownCities as $fa => $en) {
        if (mb_strtolower(normalizePersian($fa)) === $normalized) {
            return $en;
        }
    }
    return null;
}

// دیکشنری شهرهای معروف خارجی که به فارسی نویسه گردانی شدن (نه ترجمه ی معنایی)
// این ها با حرف نویسیِ ساده قابل بازیابی نیستن (چون خودشون از انگلیسی به فارسی تلفظ نویسی شدن، برعکسش کار نمی کنه)
function getKnownForeignCityTranslation($cityName) {
    static $foreignCities = [
        'نیویورک' => 'New York', 'لس آنجلس' => 'Los Angeles',
        'شیکاگو' => 'Chicago', 'میامی' => 'Miami', 'واشنگتن' => 'Washington',
        'لندن' => 'London', 'پاریس' => 'Paris', 'برلین' => 'Berlin',
        'مادرید' => 'Madrid', 'بارسلون' => 'Barcelona', 'بارسلونا' => 'Barcelona',
        'رم' => 'Rome', 'میلان' => 'Milan', 'ونیز' => 'Venice',
        'مسکو' => 'Moscow', 'سن پترزبورگ' => 'Saint Petersburg',
        'توکیو' => 'Tokyo', 'اوزاکا' => 'Osaka', 'پکن' => 'Beijing',
        'شانگهای' => 'Shanghai', 'سئول' => 'Seoul', 'بانکوک' => 'Bangkok',
        'دهلی' => 'Delhi', 'دهلی نو' => 'New Delhi', 'بمبئی' => 'Mumbai',
        'دبی' => 'Dubai', 'ابوظبی' => 'Abu Dhabi', 'دوحه' => 'Doha',
        'ریاض' => 'Riyadh', 'کویت' => 'Kuwait City', 'مسقط' => 'Muscat',
        'استانبول' => 'Istanbul', 'آنکارا' => 'Ankara',
        'قاهره' => 'Cairo', 'بغداد' => 'Baghdad', 'دمشق' => 'Damascus', 'بیروت' => 'Beirut',
        'تورنتو' => 'Toronto', 'ونکوور' => 'Vancouver', 'مونترال' => 'Montreal',
        'سیدنی' => 'Sydney', 'ملبورن' => 'Melbourne',
        'وین' => 'Vienna', 'زوریخ' => 'Zurich', 'ژنو' => 'Geneva',
        'آمستردام' => 'Amsterdam', 'بروکسل' => 'Brussels', 'مونیخ' => 'Munich',
        'فرانکفورت' => 'Frankfurt', 'هامبورگ' => 'Hamburg',
        'پراگ' => 'Prague', 'وارشو' => 'Warsaw', 'بوداپست' => 'Budapest',
        'آتن' => 'Athens', 'استکهلم' => 'Stockholm', 'اسلو' => 'Oslo',
        'کپنهاگ' => 'Copenhagen', 'هلسینکی' => 'Helsinki', 'دوبلین' => 'Dublin',
        'لیسبون' => 'Lisbon',
    ];
    $normalized = mb_strtolower(normalizePersian(trim($cityName)));
    foreach ($foreignCities as $fa => $en) {
        if (mb_strtolower(normalizePersian($fa)) === $normalized) {
            return $en;
        }
    }
    return null;
}


// حرف به حرف نویسیِ فارسی به لاتین (Transliteration)، نه ترجمه ی معنایی
// اسم های خاص (مثل اسم شهرها) باید «حرف نویسی» بشن نه «ترجمه»؛ همین اشتباهِ استفاده
// از یک API ترجمه ی معنایی برای اسم های خاص بود که باعث نتایج بی ربط می شد (مثل «اراک» -> «Saint Lucia»).
// این روش برای هر اسمی کار می کنه (نه فقط لیست بالا)، ولی چون فارسی مصوت های کوتاه رو نمی نویسه،
// نتیجه ش تقریبیه، نه همیشه 100٪ دقیق.
function transliteratePersian($text) {
    static $map = [
        'آ' => 'A', 'ا' => 'a', 'ب' => 'b', 'پ' => 'p', 'ت' => 't', 'ث' => 's',
        'ج' => 'j', 'چ' => 'ch', 'ح' => 'h', 'خ' => 'kh', 'د' => 'd', 'ذ' => 'z',
        'ر' => 'r', 'ز' => 'z', 'ژ' => 'zh', 'س' => 's', 'ش' => 'sh', 'ص' => 's',
        'ض' => 'z', 'ط' => 't', 'ظ' => 'z', 'ع' => 'a', 'غ' => 'gh', 'ف' => 'f',
        'ق' => 'gh', 'ک' => 'k', 'گ' => 'g', 'ل' => 'l', 'م' => 'm', 'ن' => 'n',
        'و' => 'v', 'ه' => 'h', 'ی' => 'i', 'ء' => '', 'ئ' => 'i', 'أ' => 'a',
        'إ' => 'e', 'ؤ' => 'o', 'ة' => 'h', ' ' => ' ', // نیم فاصله -> فاصله ی معمولی
    ];
    $result = '';
    $len = mb_strlen($text);
    for ($i = 0; $i < $len; $i++) {
        $ch = mb_substr($text, $i, 1);
        $result .= array_key_exists($ch, $map) ? $map[$ch] : $ch;
    }
    $result = trim(preg_replace('/\s+/', ' ', $result));
    return mb_convert_case($result, MB_CASE_TITLE, 'UTF-8');
}

function translateCityWithGeographer($cityName, $lang) {
    global $geographerAvailable;
    if (!containsPersianScript($cityName) || !$geographerAvailable) {
        return $cityName;
    }
    try {
        $normalizedInput = normalizePersian($cityName);
        $cities = getGeographerCities();
        foreach ($cities as $city) {
            $localNames = $city->getLocalNames();
            if (isset($localNames['fa']) && stripos(normalizePersian($localNames['fa']), $normalizedInput) !== false) {
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


// تابع ترجمه با MyMemory (رایگان و بدون نیاز به کلید API یا حساب بانکی)
// نکته: دیگه توی زنجیره ی حل کردن اسم شهر صدا زده نمی شه (چون برای اسم های خاص غیرقابل اعتماد بود،
// مثل ترجمه ی «اراک» به «Saint Lucia»). به جاش الان transliteratePersian استفاده می شه.
// این تابع فقط برای استفاده ی احتمالی در آینده (مثلا ترجمه ی متن های دیگه) نگه داشته شده.
function translateWithMyMemory($text, $targetLang = 'en', $sourceLang = 'fa') {
    $params = [
        'q' => $text,
        'langpair' => $sourceLang . '|' . $targetLang,
    ];
    // اختیاری: اگه یک ایمیل توی config.php تعریف کنی (define('MYMEMORY_EMAIL', 'you@example.com');)
    // سقف رایگان روزانه 10 برابر میشه. کاملا اختیاریه و بدون اون هم کار می کنه.
    if (defined('MYMEMORY_EMAIL') && !empty(MYMEMORY_EMAIL)) {
        $params['de'] = MYMEMORY_EMAIL;
    }

    $url = "https://api.mymemory.translated.net/get?" . http_build_query($params);
    $result = fetchUrl($url);

    if ($result['httpCode'] !== 200) {
        return $text;
    }

    $data = json_decode($result['response'], true);
    if (!empty($data['responseData']['translatedText'])) {
        if (!empty($data['quotaFinished'])) {
            return $text;
        }
        return $data['responseData']['translatedText'];
    }
    return $text;
}


// تابع ترکیبی ترجمه (برای جستجوی اصلی)
// ترتیب اولویت: 1) دیکشنری مطمئن  2) Geographer (اگه نصب باشه)  3) حرف نویسیِ خودمون (برای هر اسمی کار می کنه)
// این تابع بر اساس خط خود متن ورودی تصمیم می گیره که ترجمه لازمه یا نه —
// نه بر اساس $lang (که فقط زبان نمایش رابط کاربریه و ربطی به زبان تایپ شده نداره)
function translateCityName($cityName, $lang) {
    if (!containsPersianScript($cityName)) {
        return $cityName; // متن از قبل لاتینه؛ نیازی به ترجمه نیست
    }

    // اول دیکشنری های مطمئن رو چک کن (سریع تر و قابل اعتمادتر از هر API ای)
    $known = getKnownCityTranslation($cityName);
    if ($known !== null) {
        return $known;
    }
    $knownForeign = getKnownForeignCityTranslation($cityName);
    if ($knownForeign !== null) {
        return $knownForeign;
    }

    $translated = translateCityWithGeographer($cityName, $lang);
    if ($translated !== $cityName) {
        return $translated;
    }

    // نه دیکشنری ها نه Geographer چیزی پیدا نکردن.
    // اینجا MyMemory رو امتحان کن — برای اسم های معروف خارجیِ نویسه گردانی شده (مثل نیویورک/برلین)
    // که با حرف نویسی قابل بازسازی نیستن، MyMemory معمولا جواب درست می ده چون این جفت اسم ها پرتکرارن.
    // (برخلاف اسم های کم کاربرد ایرانی که قبلا باعث جواب غلط MyMemory می شدن — آن ها الان از دیکشنری میان)
    $myMemoryResult = translateWithMyMemory($cityName, 'en', 'fa');
    if ($myMemoryResult !== $cityName) {
        return $myMemoryResult;
    }

    // اگه هیچ کدوم جواب ندادن، از حرف نویسی خودمون به عنوان آخرین راه استفاده کن
    return transliteratePersian($cityName);
}


// تابع کمکی برای درخواست با cURL

function fetchUrl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
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


// محدودیت نرخ درخواست ساده (بر اساس IP)
// جلوگیری از سوءاستفاده/غرق کردن سرور با درخواست های خودکار زیاد
define('RATE_LIMIT_FILE', __DIR__ . '/cache/rate_limit.json');
define('RATE_LIMIT_MAX_REQUESTS', 30); // حداکثر 30 درخواست
define('RATE_LIMIT_WINDOW_SECONDS', 30); // در هر 30 ثانیه، به ازای هر IP

function checkRateLimit() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $dir = dirname(RATE_LIMIT_FILE);
    if (!is_dir($dir)) {
        @mkdir($dir, 0775, true);
    }
    $htaccessPath = $dir . '/.htaccess';
    if (!file_exists($htaccessPath)) {
        @file_put_contents($htaccessPath, "Require all denied\n");
    }

    $fp = @fopen(RATE_LIMIT_FILE, 'c+');
    if (!$fp) {
        return true; // اگه نتونستیم فایل رو باز کنیم، درخواست رو مسدود نمی کنیم (fail-open)
    }

    flock($fp, LOCK_EX);
    $content = stream_get_contents($fp);
    $data = json_decode($content, true);
    if (!is_array($data)) {
        $data = [];
    }

    $now = time();
    // پاک سازی رکوردهای قدیمی (جلوگیری از رشد بی رویه ی فایل)
    foreach ($data as $key => $entry) {
        if ($now - $entry['start'] > RATE_LIMIT_WINDOW_SECONDS) {
            unset($data[$key]);
        }
    }

    $allowed = true;
    if (!isset($data[$ip]) || ($now - $data[$ip]['start']) > RATE_LIMIT_WINDOW_SECONDS) {
        $data[$ip] = ['start' => $now, 'count' => 1];
    } else {
        $data[$ip]['count']++;
        if ($data[$ip]['count'] > RATE_LIMIT_MAX_REQUESTS) {
            $allowed = false;
        }
    }

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);

    return $allowed;
}


// فرمت دهی مختصات بدون وابستگی به locale سرور
// (جلوگیری از تبدیل نقطه اعشار به کاما در برخی تنظیمات locale)
function fmtCoord($value) {
    return sprintf('%.6F', (float)$value);
}


// کش جستجوی شهر (یک فایل JSON روی سرور)
// این کش بین همه ی بازدیدکننده ها مشترکه: هر شهر فقط یک بار واقعا
// جستجو/ترجمه میشه (کار سنگین Geographer + درخواست به API های بیرونی)،
// و دفعات بعد مستقیم از این فایل خونده میشه.
define('CITY_CACHE_FILE', __DIR__ . '/cache/city_cache.json');
define('CITY_CACHE_TTL', 60 * 60 * 24 * 30); // 30 روز؛ مختصات شهرها عملا تغییر نمی کنه

function loadCityCache() {
    if (!file_exists(CITY_CACHE_FILE)) {
        return [];
    }
    $fp = @fopen(CITY_CACHE_FILE, 'r');
    if (!$fp) {
        return [];
    }
    flock($fp, LOCK_SH);
    $content = stream_get_contents($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    $data = json_decode($content, true);
    return is_array($data) ? $data : [];
}

function saveCityCache($cache) {
    $dir = dirname(CITY_CACHE_FILE);
    if (!is_dir($dir)) {
        @mkdir($dir, 0775, true);
    }
    // امنیتی: مطمئن شو این پوشه از طریق مرورگر مستقیم قابل دسترسی نیست
    // (این فقط برای هاست های Apache کار می کنه؛ روی Nginx باید توی تنظیمات سرور جلوش گرفته بشه)
    $htaccessPath = $dir . '/.htaccess';
    if (!file_exists($htaccessPath)) {
        @file_put_contents($htaccessPath, "Require all denied\n");
    }
    $fp = @fopen(CITY_CACHE_FILE, 'c+');
    if (!$fp) {
        error_log("City cache: نمی تونم فایل {$dir} رو برای نوشتن باز کنم — دسترسی نوشتن رو چک کن.");
        return false;
    }
    flock($fp, LOCK_EX);
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($cache, JSON_UNESCAPED_UNICODE));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    return true;
}

function cityCacheKey($type, $lang, $query) {
    return $type . ':' . $lang . ':' . mb_strtolower(normalizePersian(trim($query)));
}

function getCityCache($key) {
    $cache = loadCityCache();
    if (isset($cache[$key]) && (time() - $cache[$key]['t']) < CITY_CACHE_TTL) {
        return $cache[$key]['v'];
    }
    return null;
}

function setCityCache($key, $value) {
    $cache = loadCityCache();
    $cache[$key] = ['v' => $value, 't' => time()];
    saveCityCache($cache);
}


// ترجمه ی اسم شهر برای *نمایش* به زبان انتخابی کاربر (جدا از ترجمه ی جستجو)
// اسم پایه ای که از API ها می گیریم معمولا انگلیسیه (مثل Tehran, Paris)،
// این تابع همون اسم رو برای نمایش به fa/es برمی گردونه (کش می شه تا دوباره API صدا نزنیم)

function translateCityDisplayName($text, $targetLang) {
    if (empty($text) || $targetLang === 'en') {
        return $text; // زبان مقصد انگلیسیه؛ معمولا خودِ اسم پایه همینه، نیازی به ترجمه نیست
    }
    if ($targetLang === 'fa' && containsPersianScript($text)) {
        // خودِ WeatherAPI بعضی وقت ها وقتی lang=fa باشه، اسم رو همون جا به فارسی برمی گردونه.
        // اگه متن از قبل فارسیه، نیازی به ترجمه نیست (و تلاش برای ترجمه ی en->fa روی متنی
        // که اصلا انگلیسی نیست، فقط باعث تأخیر یا جواب غلط می شه)
        return $text;
    }

    $cacheKey = cityCacheKey('display', $targetLang, $text);
    $cached = getCityCache($cacheKey);
    if ($cached !== null) {
        return $cached;
    }

    $params = ['q' => $text, 'langpair' => 'en|' . $targetLang];
    if (defined('MYMEMORY_EMAIL') && !empty(MYMEMORY_EMAIL)) {
        $params['de'] = MYMEMORY_EMAIL;
    }
    $url = "https://api.mymemory.translated.net/get?" . http_build_query($params);

    // این فقط یه تزئین نمایشیه (نه داده ی حیاتی)، پس تایم اوتش کوتاه تر از درخواست های اصلیه
    // تا اگه MyMemory کند بود، کل پاسخ آب وهوا رو بی خودی معطل نکنه
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200) {
        return $text;
    }

    $data = json_decode($response, true);
    if (!empty($data['responseData']['translatedText']) && empty($data['quotaFinished'])) {
        $translated = $data['responseData']['translatedText'];
        setCityCache($cacheKey, $translated);
        return $translated;
    }
    return $text;
}

// به یه آرایه ی پاسخِ از قبل دیکد شده، فیلد name_translated رو اضافه می کنه
// (فقط اگه واقعا با اسم اصلی فرق داشته باشه، تا فرانت مجبور نشه چیز تکراری نشون بده)
function attachTranslatedLocationName(&$responseArr, $lang) {
    if (!isset($responseArr['location']['name'])) {
        return;
    }
    $originalName = $responseArr['location']['name'];
    $translatedName = translateCityDisplayName($originalName, $lang);
    if ($translatedName !== '' && mb_strtolower($translatedName) !== mb_strtolower($originalName)) {
        $responseArr['location']['name_translated'] = $translatedName;
    }
}

// گرفتن اسم واقعیِ شهر/کشور از روی مختصات (reverse geocoding)
// این برای وقتیه که مسیر Open-Meteo فعال می شه (چون خودش هیچ اسم شهری برنمی گردونه)
// نتیجه کش میشه (با تقریب ~1 کیلومتر) تا هر بار درخواست جدید نزنیم

function reverseGeocode($lat, $lon, $lang = 'en') {
    if (!defined('OPENWEATHER_API_KEY') || empty(OPENWEATHER_API_KEY)) {
        return null;
    }
    $cacheKey = cityCacheKey('reverse', $lang, round($lat, 2) . ',' . round($lon, 2));
    $cached = getCityCache($cacheKey);
    if ($cached !== null) {
        return $cached;
    }

    $latStr = fmtCoord($lat);
    $lonStr = fmtCoord($lon);
    $url = "https://api.openweathermap.org/geo/1.0/reverse?lat={$latStr}&lon={$lonStr}&limit=1&appid=" . OPENWEATHER_API_KEY;
    $result = fetchUrl($url);

    if ($result['httpCode'] !== 200) {
        return null;
    }

    $data = json_decode($result['response'], true);
    if (!empty($data[0]['name'])) {
        $info = [
            'name' => $data[0]['name'],
            'country' => $data[0]['country'] ?? '',
        ];
        setCityCache($cacheKey, $info);
        return $info;
    }
    return null;
}


// تابع جستجوی شهر با OpenWeatherMap (Fallback)
function searchCityWithOpenWeatherMap($cityName) {
    if (!defined('OPENWEATHER_API_KEY') || empty(OPENWEATHER_API_KEY)) {
        return null;
    }
    
    $url = "https://api.openweathermap.org/geo/1.0/direct?q=" . urlencode($cityName) . "&limit=1&appid=" . OPENWEATHER_API_KEY;
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
    // محدودیت نرخ درخواست فقط این جا لازمه، چون این endpoint با هر کاراکتر تایپ شده صدا زده می شه
    // (weather و weekly که فقط با هر بار باز کردن سایت اجرا می شن، نباید محدود بشن)
    if (!checkRateLimit()) {
        http_response_code(429);
        echo json_encode(['error' => 'تعداد درخواست ها بیش از حد مجازه؛ لطفا کمی صبر کن']);
        exit;
    }

    $q = isset($_GET['q']) ? trim((string)$_GET['q']) : '';
    $q = preg_replace('/[\x00-\x1F\x7F]/u', '', $q); // حذف کاراکترهای کنترلی
    if (mb_strlen($q) < 2) {
        echo json_encode([]);
        exit;
    }
    if (mb_strlen($q) > 100) {
        echo json_encode([]); // ورودی غیرمنطقی بلند؛ چیزی برنمی گردونیم، نه خطا (چون این endpoint فقط پیشنهاده)
        exit;
    }

    // اول از کش JSON چک کن
    $cacheKey = cityCacheKey('suggest', $lang, $q);
    $cached = getCityCache($cacheKey);
    if ($cached !== null) {
        echo json_encode($cached);
        exit;
    }
    
    // ترجمه کوئری تایپ شده (فارسی/غیرلاتین به انگلیسی) قبل از جستجو
    $searchQuery = translateCityName($q, $lang);

    // اول با WeatherAPI جستجو کن
    // نکته ی مهم: اینجا عمدا از lang=en استفاده می کنیم، نه از $lang انتخابی کاربر —
    // چون پارامتر lang روی endpoint جستجو، می تونه باعث بشه WeatherAPI برای همون کوئری،
    // یه مکانِ کاملا متفاوت برگردونه (مقابل دیتابیس محلی سازی شده ی هر زبان match می کنه).
    // جستجو باید مستقل از زبان نمایش باشه؛ فقط خودِ داده ی آب وهوا باید به زبان کاربر باشه.
    $url = "https://api.weatherapi.com/v1/search.json?key=" . WEATHER_API_KEY . "&q=" . urlencode($searchQuery) . "&lang=en";
    $result = fetchUrl($url);
    
    if ($result['httpCode'] === 200) {
        $suggestData = json_decode($result['response'], true);
        if (!empty($suggestData)) {
            setCityCache($cacheKey, $suggestData);
            echo json_encode($suggestData);
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
        setCityCache($cacheKey, $formatted);
        echo json_encode($formatted);
        exit;
    }
    
    // نتیجه ی خالی رو کش نمی کنیم؛ شاید فقط یک قطعی موقت API بوده
    echo json_encode([]);
    exit;
}


// جستجوی شهر با نام (برای type=weather یا weekly)
if ($city && !$lat && !$lon) {
    // اول از کش JSON چک کن
    $cityCacheKeyStr = cityCacheKey('search', $lang, $city);
    $cachedCoords = getCityCache($cityCacheKeyStr);

    if ($cachedCoords !== null) {
        $lat = $cachedCoords['lat'];
        $lon = $cachedCoords['lon'];
    } else {
        // ترجمه نام شهر (فارسی به انگلیسی) با ترکیب Geographer + Google
        $searchQuery = translateCityName($city, $lang);
        
        // 1. اول با WeatherAPI جستجو کن (عمدا lang=en — دلیلش بالاتر در تابع suggest توضیح داده شده)
        $searchUrl = "https://api.weatherapi.com/v1/search.json?key=" . WEATHER_API_KEY . "&q=" . urlencode($searchQuery) . "&lang=en";
        $result = fetchUrl($searchUrl);
        
        if ($result['httpCode'] === 200) {
            $searchData = json_decode($result['response'], true);
            if (!empty($searchData)) {
                $lat = $searchData[0]['lat'];
                $lon = $searchData[0]['lon'];
            }
        }
        
        // 2. اگر WeatherAPI پیدا نکرد، از OpenWeatherMap به عنوان Fallback استفاده کن
        if (!$lat || !$lon) {
            $openWeatherResult = searchCityWithOpenWeatherMap($searchQuery);
            if ($openWeatherResult) {
                $lat = $openWeatherResult['lat'];
                $lon = $openWeatherResult['lon'];
            }
        }

        // نتیجه ی موفق رو کش کن تا دفعه ی بعد نیازی به Geographer/API نباشه
        if ($lat && $lon) {
            setCityCache($cityCacheKeyStr, ['lat' => $lat, 'lon' => $lon]);
        }
    }
    
    // 3. اگر هیچ کدام پیدا نکردند، خطا بده
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

// محدوده ی جغرافیایی واقعی رو هم چک کن، نه فقط اینکه عدد باشه
$lat = (float)$lat;
$lon = (float)$lon;
if ($lat < -90 || $lat > 90 || $lon < -180 || $lon > 180) {
    http_response_code(400);
    echo json_encode(['error' => 'مختصات نامعتبر']);
    exit;
}


// امروز و فردا (WeatherAPI)

if ($type === 'weather') {
    $latStr = fmtCoord($lat);
    $lonStr = fmtCoord($lon);
    $url = "https://api.weatherapi.com/v1/forecast.json?key=" . WEATHER_API_KEY 
           . "&q={$latStr},{$lonStr}&days=2&lang={$lang}";
    $result = fetchUrl($url);
    
    if ($result['httpCode'] === 200) {
        $weatherData = json_decode($result['response'], true);
        if (is_array($weatherData)) {
            attachTranslatedLocationName($weatherData, $lang);
            echo json_encode($weatherData);
        } else {
            echo $result['response']; // اگه دیکد نشد (غیرمنتظره)، همون پاسخ خام رو برگردون
        }
        exit;
    }

    error_log("WeatherAPI (امروز/فردا) شکست خورد: httpCode={$result['httpCode']}, curlError=" . ($result['error'] ?: 'none'));

    // Fallback به Open-Meteo (همون سرویسی که برای پیش بینی هفتگی استفاده می کنیم)
    // این جا هم hourly و هم current رو می خوایم، چون بخش «امروز»/«فردا» به صورت ساعتی نمایش داده میشه
    $meteoUrl = "https://api.open-meteo.com/v1/forecast?latitude={$latStr}&longitude={$lonStr}"
              . "&hourly=temperature_2m,weather_code"
              . "&daily=weather_code,temperature_2m_max,temperature_2m_min"
              . "&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m"
              . "&timezone=auto&forecast_days=2";
    $meteoResult = fetchUrl($meteoUrl);

    if ($meteoResult['httpCode'] === 200) {
        $meteoData = json_decode($meteoResult['response'], true);
        if ($meteoData && isset($meteoData['hourly']) && isset($meteoData['daily'])) {
            $converted = convertOpenMeteoHourlyToWeatherAPI($meteoData, $lat, $lon, $lang);
            attachTranslatedLocationName($converted, $lang);
            echo json_encode($converted);
            exit;
        }
        error_log("Open-Meteo (امروز/فردا) داده ی نامعتبر برگردوند.");
    } else {
        error_log("Open-Meteo (امروز/فردا) هم شکست خورد: httpCode={$meteoResult['httpCode']}, curlError=" . ($meteoResult['error'] ?: 'none'));
    }

    // اگه هیچ کدوم جواب ندادن، همون خطای اصلی رو نشون بده
    http_response_code($result['httpCode']);
    echo json_encode(['error' => 'خطا در دریافت اطلاعات آب و هوا']);
    exit;
}


// هفتگی (Open-Meteo) با Fallback به WeatherAPI

if ($type === 'weekly') {
    $latStr = fmtCoord($lat);
    $lonStr = fmtCoord($lon);
    $url = "https://api.open-meteo.com/v1/forecast?latitude={$latStr}&longitude={$lonStr}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=weather_code&timezone=auto&forecast_days=7";
    $result = fetchUrl($url);
    
    if ($result['httpCode'] !== 200) {
        error_log("Open-Meteo weekly forecast failed for lat={$latStr}, lon={$lonStr}: httpCode={$result['httpCode']}, curlError=" . ($result['error'] ?: 'none') . ", body=" . substr((string)$result['response'], 0, 300));

        // Fallback به WeatherAPI (فقط 3 روز - محدودیت پلن رایگان WeatherAPI)
        $fallbackUrl = "https://api.weatherapi.com/v1/forecast.json?key=" . WEATHER_API_KEY 
                      . "&q={$latStr},{$lonStr}&days=3&lang={$lang}";
        $fallbackResult = fetchUrl($fallbackUrl);
        if ($fallbackResult['httpCode'] === 200) {
            $fallbackData = json_decode($fallbackResult['response'], true);
            if (is_array($fallbackData)) {
                attachTranslatedLocationName($fallbackData, $lang);
                echo json_encode($fallbackData);
            } else {
                echo $fallbackResult['response'];
            }
        } else {
            echo json_encode(['error' => 'خطا در دریافت اطلاعات هفتگی']);
        }
        exit;
    }
    
    $data = json_decode($result['response'], true);
    if (!$data || !isset($data['daily'])) {
        echo json_encode(['error' => 'داده های Open-Meteo نامعتبر']);
        exit;
    }
    
    $converted = convertOpenMeteoToWeatherAPI($data, $lat, $lon, $lang);
    attachTranslatedLocationName($converted, $lang);
    echo json_encode($converted);
    exit;
}


// نگاشت کدهای وضعیت آب وهوای Open-Meteo (استفاده ی مشترک برای هفتگی و امروز/فردا)

function getOpenMeteoCondition($code) {
    $map = [
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
    return $map[$code] ?? 'Unknown';
}

function getOpenMeteoEmoji($code) {
    $map = [
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
    return $map[$code] ?? '🌤️';
}


// تابع تبدیل Open-Meteo (روزانه، برای پیش بینی هفتگی) به فرمت WeatherAPI

// نزدیک ترین ساعتِ موجود به یک ساعتِ هدف رو پیدا می کنه (مثلا نزدیک ترین به 13 برای «روز»)
function findClosestHourCode($hoursMap, $targetHour) {
    if (empty($hoursMap)) {
        return null;
    }
    $bestHour = null;
    $bestDiff = 999;
    foreach ($hoursMap as $hour => $code) {
        $diff = abs($hour - $targetHour);
        if ($diff < $bestDiff) {
            $bestDiff = $diff;
            $bestHour = $hour;
        }
    }
    return $hoursMap[$bestHour];
}

function convertOpenMeteoToWeatherAPI($data, $lat, $lon, $lang) {
    $daily = $data['daily'];
    $forecastDays = [];

    // اگه داده ی ساعتی موجود باشه، کد وضعیت رو برای هر روز به تفکیک ساعت گروه بندی کن
    // تا بشه یه کد «نماینده ی روز» (مثلا ساعت 13) و یه کد «نماینده ی شب» (مثلا ساعت 0) جدا از هم پیدا کرد
    $hourlyByDate = [];
    if (isset($data['hourly']['time']) && isset($data['hourly']['weather_code'])) {
        foreach ($data['hourly']['time'] as $i => $isoTime) {
            $datePart = substr($isoTime, 0, 10);
            $hourPart = (int)substr($isoTime, 11, 2);
            $hourlyByDate[$datePart][$hourPart] = $data['hourly']['weather_code'][$i];
        }
    }

    for ($i = 0; $i < count($daily['time']); $i++) {
        $dateStr = $daily['time'][$i];
        $code = $daily['weather_code'][$i];
        $condition = getOpenMeteoCondition($code);
        $emoji = getOpenMeteoEmoji($code);

        // کد وضعیت مخصوص روز (نزدیک ظهر) و مخصوص شب (نزدیک نیمه شب) همون روز، اگه داده ی ساعتی موجود باشه
        $hoursForDate = $hourlyByDate[$dateStr] ?? [];
        $dayCode = findClosestHourCode($hoursForDate, 13) ?? $code;
        $nightCode = findClosestHourCode($hoursForDate, 0) ?? $code;

        $forecastDays[] = [
            'date' => $dateStr,
            'day' => [
                'avgtemp_c' => round(($daily['temperature_2m_max'][$i] + $daily['temperature_2m_min'][$i]) / 2, 1),
                'condition' => [
                    'text' => getOpenMeteoCondition($dayCode),
                    'icon' => 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
                ],
                'emoji' => getOpenMeteoEmoji($dayCode),
            ],
            'night' => [
                'condition' => [
                    'text' => getOpenMeteoCondition($nightCode),
                    'icon' => 'https://cdn.weatherapi.com/weather/64x64/night/113.png',
                ],
                'emoji' => getOpenMeteoEmoji($nightCode),
            ],
            'astro' => [
                'sunrise' => '06:00 AM',
                'sunset' => '06:00 PM',
            ]
        ];
    }

    $locationInfo = reverseGeocode($lat, $lon, $lang);

    return [
        'location' => [
            'name' => $locationInfo['name'] ?? '',
            'country' => $locationInfo['country'] ?? '',
            'lat' => $lat,
            'lon' => $lon,
            'localtime' => date('Y-m-d H:i'),
            'tz_id' => $data['timezone'] ?? 'UTC', // Open-Meteo با timezone=auto واقعا این رو برمی گردونه
        ],
        'current' => [
            'temp_c' => $daily['temperature_2m_max'][0] ?? 20,
            'condition' => [
                'text' => getOpenMeteoCondition($daily['weather_code'][0] ?? 0),
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


// تابع تبدیل Open-Meteo (ساعتی، برای امروز/فردا) به فرمت WeatherAPI
// برخلاف تابع بالا، این یکی آرایه ی hour رو هم برای هر روز می سازه
// (چون بخش «امروز»/«فردا» توی رابط کاربری به صورت ساعتی نمایش داده میشه)

function convertOpenMeteoHourlyToWeatherAPI($data, $lat, $lon, $lang) {
    $hourly = $data['hourly'];
    $daily = $data['daily'];
    $current = $data['current'] ?? null;

    // ساعت ها رو بر اساس روز تقویمی (YYYY-MM-DD) گروه بندی کن
    $hoursByDate = [];
    for ($i = 0; $i < count($hourly['time']); $i++) {
        $isoTime = $hourly['time'][$i]; // مثل "2024-06-15T14:00"
        $datePart = substr($isoTime, 0, 10);
        $timeFormatted = str_replace('T', ' ', $isoTime); // فرمتی که فرانت اند انتظار داره: "2024-06-15 14:00"
        $code = $hourly['weather_code'][$i];

        $hoursByDate[$datePart][] = [
            'time' => $timeFormatted,
            'temp_c' => $hourly['temperature_2m'][$i],
            'condition' => [
                'text' => getOpenMeteoCondition($code),
                'icon' => 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
            ],
        ];
    }

    $forecastDays = [];
    for ($i = 0; $i < count($daily['time']); $i++) {
        $date = $daily['time'][$i];
        $code = $daily['weather_code'][$i];

        $forecastDays[] = [
            'date' => $date,
            'day' => [
                'avgtemp_c' => round(($daily['temperature_2m_max'][$i] + $daily['temperature_2m_min'][$i]) / 2, 1),
                'condition' => [
                    'text' => getOpenMeteoCondition($code),
                    'icon' => 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
                ],
                'emoji' => getOpenMeteoEmoji($code),
            ],
            'astro' => [
                'sunrise' => '06:00 AM',
                'sunset' => '06:00 PM',
            ],
            'hour' => $hoursByDate[$date] ?? [],
        ];
    }

    if ($current) {
        $currentBlock = [
            'temp_c' => $current['temperature_2m'] ?? ($daily['temperature_2m_max'][0] ?? 20),
            'condition' => [
                'text' => getOpenMeteoCondition($current['weather_code'] ?? 0),
                'icon' => 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
            ],
            'humidity' => $current['relative_humidity_2m'] ?? 50,
            'wind_kph' => $current['wind_speed_10m'] ?? 10,
            'uv' => 5, // Open-Meteo مقدار UV لحظه ای نمی ده؛ این یک مقدار پیش فرضه (مثل قبل)
        ];
    } else {
        $currentBlock = [
            'temp_c' => $daily['temperature_2m_max'][0] ?? 20,
            'condition' => [
                'text' => getOpenMeteoCondition($daily['weather_code'][0] ?? 0),
                'icon' => 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
            ],
            'humidity' => 50,
            'wind_kph' => 10,
            'uv' => 5,
        ];
    }

    $locationInfo = reverseGeocode($lat, $lon, $lang);

    return [
        'location' => [
            'name' => $locationInfo['name'] ?? '',
            'country' => $locationInfo['country'] ?? '',
            'lat' => $lat,
            'lon' => $lon,
            'localtime' => date('Y-m-d H:i'),
            'tz_id' => $data['timezone'] ?? 'UTC',
        ],
        'current' => $currentBlock,
        'forecast' => [
            'forecastday' => $forecastDays,
        ],
    ];
}
?>