//  ترجمه‌ها 
const translations = {
    fa: {
        appTitle: 'پیش بینی آب و هوا',
        today: 'امروز',
        tomorrow: 'فردا',
        footer: 'منبع: WeatherAPI.com',
        temperatureChart: 'نمودار دما',
        humidity: 'رطوبت',
        wind: 'باد',
        uv: 'UV',
        searchPlaceholder: 'جستجوی شهر...',
        offsetSame: 'هماهنگ با ساعت جهانی',
        offsetHours: 'اختلاف {offset} ساعت با UTC',
        weekly: 'پیش بینی هفتگی',
        noData: 'اطلاعاتی برای روزهای آینده موجود نیست',
        noFutureData: 'هیچ روز آینده‌ای در دسترس نیست',
    },
    en: {
        appTitle: 'Weather Forecast',
        today: 'Today',
        tomorrow: 'Tomorrow',
        footer: 'Source: WeatherAPI.com',
        temperatureChart: 'Temperature Chart',
        humidity: 'Humidity',
        wind: 'Wind',
        uv: 'UV',
        searchPlaceholder: 'Search city...',
        offsetSame: 'Synchronized with UTC',
        offsetHours: '{offset} hours difference from UTC',
        weekly: 'Weekly Forecast',
        noData: 'No information available for future days',
        noFutureData: 'No future days available',
    },
    es: {
        appTitle: 'Pronóstico del Tiempo',
        today: 'Hoy',
        tomorrow: 'Mañana',
        footer: 'Fuente: WeatherAPI.com',
        temperatureChart: 'Gráfico de Temperatura',
        humidity: 'Humedad',
        wind: 'Viento',
        uv: 'UV',
        searchPlaceholder: 'Buscar ciudad...',
        offsetSame: 'Sincronizado con UTC',
        offsetHours: '{offset} horas de diferencia con UTC',
        weekly: 'Pronóstico Semanal',
        noData: 'No hay información para los próximos días',
        noFutureData: 'No hay días futuros disponibles',
    }
};

// نام روزهای هفته
const weekDays = {
    fa: ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
};

// دیکشنری ترجمه وضعیت‌ها (انگلیسی به فارسی) 
const weatherTranslations = {
    'Sunny': 'آفتابی',
    'Partly cloudy': 'نیمه ابری',
    'Partly Cloudy': 'نیمه ابری',
    'Cloudy': 'ابری',
    'Overcast': 'تمام ابری',
    'Mist': 'مه‌آلود',
    'Patchy rain nearby': 'باران پراکنده در نزدیکی',
    'Patchy light drizzle': 'نم نم باران پراکنده',
    'Light drizzle': 'نم نم باران',
    'Patchy light rain': 'باران خفیف پراکنده',
    'Light rain': 'باران خفیف',
    'Moderate rain at times': 'باران متوسط گاهی',
    'Moderate rain': 'باران متوسط',
    'Heavy rain at times': 'باران سنگین گاهی',
    'Heavy rain': 'باران سنگین',
    'Light freezing rain': 'باران یخ‌زده خفیف',
    'Moderate or heavy freezing rain': 'باران یخ‌زده متوسط یا سنگین',
    'Light sleet': 'برف‌آب خفیف',
    'Moderate or heavy sleet': 'برف‌آب متوسط یا سنگین',
    'Patchy light snow': 'برف خفیف پراکنده',
    'Light snow': 'برف خفیف',
    'Patchy moderate snow': 'برف متوسط پراکنده',
    'Moderate snow': 'برف متوسط',
    'Patchy heavy snow': 'برف سنگین پراکنده',
    'Heavy snow': 'برف سنگین',
    'Ice pellets': 'دانه‌های یخ',
    'Light rain shower': 'رگبار خفیف باران',
    'Moderate or heavy rain shower': 'رگبار متوسط یا سنگین باران',
    'Torrential rain shower': 'رگبار سیل‌آسا',
    'Light sleet showers': 'رگبار خفیف برف‌آب',
    'Moderate or heavy sleet showers': 'رگبار متوسط یا سنگین برف‌آب',
    'Light snow showers': 'رگبار خفیف برف',
    'Moderate or heavy snow showers': 'رگبار متوسط یا سنگین برف',
    'Light showers of ice pellets': 'رگبار خفیف دانه‌های یخ',
    'Moderate or heavy showers of ice pellets': 'رگبار متوسط یا سنگین دانه‌های یخ',
    'Patchy light rain with thunder': 'باران خفیف پراکنده همراه با رعد',
    'Moderate or heavy rain with thunder': 'باران متوسط یا سنگین همراه با رعد',
    'Patchy light snow with thunder': 'برف خفیف پراکنده همراه با رعد',
    'Moderate or heavy snow with thunder': 'برف متوسط یا سنگین همراه با رعد',
    'Clear': 'صاف',
    'Smoky haze': 'دودآلود',
    'Thunderstorm with light hail': 'رعد و برق با تگرگ خفیف',
    'Thunderstorm with heavy hail': 'رعد و برق با تگرگ سنگین',
    'Fog': 'مه',
    'Moderate rain shower': 'رگبار باران متوسط',
    'Patchy light rain in area with thunder': 'باران خفیف پراکنده همراه با رعد در منطقه',
    'Moderate drizzle': 'نم نم باران متوسط',
    'Heavy drizzle': 'نم نم باران سنگین',
    'Light freezing drizzle': 'نم نم باران یخ‌زده خفیف',
    'Heavy freezing drizzle': 'نم نم باران یخ‌زده سنگین',
    'Snow grains': 'دانه‌های برف',
    'Light snow shower': 'رگبار خفیف برف',
    'Heavy snow shower': 'رگبار سنگین برف',
    'Blowing snow': 'برف در حال وزیدن',
    'Blizzard': 'کولاک',
    'Snowstorm': 'طوفان برف',
    'Snow': 'برف',
    'Snow showers': 'رگبار برف',
    'Heavy snow showers': 'رگبار سنگین برف',
    'Moderate snow showers': 'رگبار متوسط برف',
    'Light snow showers': 'رگبار خفیف برف',
    'Patchy snow nearby': 'برف پراکنده در نزدیکی',
    'Light snow': 'برف خفیف',
    'Moderate snow': 'برف متوسط',
    'Heavy snow': 'برف سنگین',
    'Patchy light snow': 'برف خفیف پراکنده',
    'Patchy moderate snow': 'برف متوسط پراکنده',
    'Patchy heavy snow': 'برف سنگین پراکنده',
    'Snow grains': 'دانه‌های برف',
    'Ice pellets': 'دانه‌های یخ',
    'Light ice pellets': 'دانه‌های یخ خفیف',
    'Heavy ice pellets': 'دانه‌های یخ سنگین',
    'Light sleet': 'برف‌آب خفیف',
    'Moderate or heavy sleet': 'برف‌آب متوسط یا سنگین',
    'Light sleet showers': 'رگبار خفیف برف‌آب',
    'Moderate or heavy sleet showers': 'رگبار متوسط یا سنگین برف‌آب',
    'Light showers of ice pellets': 'رگبار خفیف دانه‌های یخ',
    'Moderate or heavy showers of ice pellets': 'رگبار متوسط یا سنگین دانه‌های یخ',
    'Light snow with thunder': 'برف خفیف همراه با رعد',
    'Moderate or heavy snow with thunder': 'برف متوسط یا سنگین همراه با رعد',
    'Patchy light snow with thunder': 'برف خفیف پراکنده همراه با رعد',
    'Moderate or heavy snow with thunder': 'برف متوسط یا سنگین همراه با رعد',
    'Smoky haze': 'دودآلود',
    'Thunderstorm': 'رعد و برق',
    'Thundery outbreaks in nearby': 'رعد و برق‌های پراکنده در نزدیکی',
    'Thundery outbreaks possible': 'احتمال رعد و برق',
    'Patchy light rain with thunder': 'باران خفیف پراکنده همراه با رعد',
    'Moderate or heavy rain with thunder': 'باران متوسط یا سنگین همراه با رعد',
    'Light rain with thunder': 'باران خفیف همراه با رعد',
    'Squalls': 'تندباد',
    'Freezing fog': 'مه یخ‌زده',
    'Ice pellets': 'دانه‌های یخ',
    'Heavy freezing rain': 'باران یخ‌زده سنگین',
    'Light freezing rain': 'باران یخ‌زده خفیف',
    'Patchy freezing drizzle nearby': 'نم نم باران یخ‌زده پراکنده در نزدیکی',
    'Freezing drizzle': 'نم نم باران یخ‌زده',
    'Moderate or heavy showers of ice pellets': 'رگبار متوسط یا سنگین دانه‌های یخ',
    'Light showers of ice pellets': 'رگبار خفیف دانه‌های یخ',
    'Moderate or heavy snow with thunder': 'برف متوسط یا سنگین همراه با رعد',
    'Patchy light snow with thunder': 'برف خفیف پراکنده همراه با رعد',
    'Light snow with thunder': 'برف خفیف همراه با رعد',
    'Sandstorm': 'طوفان شن',
    'Duststorm': 'طوفان گرد و خاک',
    'Dust': 'گرد و خاک',
    'Smoke': 'دود',
    'Haze': 'غبار',
    'Fog': 'مه',
    'Freezing fog': 'مه یخ‌زده',
    'Mist': 'مه رقیق',
    'Overcast': 'تمام ابری',
};

// دیکشنری ترجمه وضعیت‌ها (اسپانیایی) 
const weatherTranslationsEs = {
    'Sunny': 'Soleado',
    'Partly cloudy': 'Parcialmente nublado',
    'Partly Cloudy': 'Parcialmente nublado',
    'Cloudy': 'Nublado',
    'Overcast': 'Cubierto',
    'Mist': 'Neblinoso',
    'Patchy rain nearby': 'Lluvia dispersa cerca',
    'Patchy light drizzle': 'Llovizna ligera dispersa',
    'Light drizzle': 'Llovizna ligera',
    'Patchy light rain': 'Lluvia ligera dispersa',
    'Light rain': 'Lluvia ligera',
    'Moderate rain at times': 'Lluvia moderada a veces',
    'Moderate rain': 'Lluvia moderada',
    'Heavy rain at times': 'Lluvia fuerte a veces',
    'Heavy rain': 'Lluvia fuerte',
    'Light freezing rain': 'Lluvia helada ligera',
    'Moderate or heavy freezing rain': 'Lluvia helada moderada o fuerte',
    'Light sleet': 'Aguanieve ligera',
    'Moderate or heavy sleet': 'Aguanieve moderada o fuerte',
    'Patchy light snow': 'Nieve ligera dispersa',
    'Light snow': 'Nieve ligera',
    'Patchy moderate snow': 'Nieve moderada dispersa',
    'Moderate snow': 'Nieve moderada',
    'Patchy heavy snow': 'Nieve fuerte dispersa',
    'Heavy snow': 'Nieve fuerte',
    'Ice pellets': 'Gránulos de hielo',
    'Light rain shower': 'Chubasco ligero',
    'Moderate or heavy rain shower': 'Chubasco moderado o fuerte',
    'Torrential rain shower': 'Chubasco torrencial',
    'Light sleet showers': 'Chubascos ligeros de aguanieve',
    'Moderate or heavy sleet showers': 'Chubascos moderados o fuertes de aguanieve',
    'Light snow showers': 'Chubascos ligeros de nieve',
    'Moderate or heavy snow showers': 'Chubascos moderados o fuertes de nieve',
    'Light showers of ice pellets': 'Chubascos ligeros de gránulos de hielo',
    'Moderate or heavy showers of ice pellets': 'Chubascos moderados o fuertes de gránulos de hielo',
    'Patchy light rain with thunder': 'Lluvia ligera dispersa con truenos',
    'Moderate or heavy rain with thunder': 'Lluvia moderada o fuerte con truenos',
    'Patchy light snow with thunder': 'Nieve ligera dispersa con truenos',
    'Moderate or heavy snow with thunder': 'Nieve moderada o fuerte con truenos',
    'Clear': 'Despejado',
    'Smoky haze': 'Neblina ahumada',
    'Thunderstorm': 'Tormenta eléctrica',
    'Thunderstorm with light hail': 'Tormenta con granizo ligero',
    'Thunderstorm with heavy hail': 'Tormenta con granizo fuerte',
    'Fog': 'Niebla',
    'Moderate rain shower': 'Chubasco moderado',
    'Patchy light rain in area with thunder': 'Lluvia ligera dispersa en zona con truenos',
    'Moderate drizzle': 'Llovizna moderada',
    'Heavy drizzle': 'Llovizna fuerte',
    'Light freezing drizzle': 'Llovizna helada ligera',
    'Heavy freezing drizzle': 'Llovizna helada fuerte',
    'Snow grains': 'Granos de nieve',
    'Light snow shower': 'Chubasco ligero de nieve',
    'Heavy snow shower': 'Chubasco fuerte de nieve',
    'Blowing snow': 'Nieve soplada',
    'Blizzard': 'Ventisca',
    'Snowstorm': 'Tormenta de nieve',
    'Snow': 'Nieve',
    'Snow showers': 'Chubascos de nieve',
    'Heavy snow showers': 'Chubascos fuertes de nieve',
    'Moderate snow showers': 'Chubascos moderados de nieve',
    'Patchy snow nearby': 'Nieve dispersa cerca',
    'Light ice pellets': 'Gránulos de hielo ligeros',
    'Heavy ice pellets': 'Gránulos de hielo fuertes',
    'Light snow with thunder': 'Nieve ligera con truenos',
    'Thundery outbreaks in nearby': 'Tormentas eléctricas dispersas cerca',
    'Thundery outbreaks possible': 'Posibles tormentas eléctricas',
    'Patchy light rain with thunder': 'Lluvia ligera dispersa con truenos',
    'Moderate or heavy rain with thunder': 'Lluvia moderada o fuerte con truenos',
    'Light rain with thunder': 'Lluvia ligera con truenos',
    'Squalls': 'Rachas de viento',
    'Freezing fog': 'Niebla helada',
    'Heavy freezing rain': 'Lluvia helada fuerte',
    'Light freezing rain': 'Lluvia helada ligera',
    'Patchy freezing drizzle nearby': 'Llovizna helada dispersa cerca',
    'Freezing drizzle': 'Llovizna helada',
    'Moderate or heavy showers of ice pellets': 'Chubascos moderados o fuertes de gránulos de hielo',
    'Light showers of ice pellets': 'Chubascos ligeros de gránulos de hielo',
    'Moderate or heavy snow with thunder': 'Nieve moderada o fuerte con truenos',
    'Patchy light snow with thunder': 'Nieve ligera dispersa con truenos',
    'Light snow with thunder': 'Nieve ligera con truenos',
    'Sandstorm': 'Tormenta de arena',
    'Duststorm': 'Tormenta de polvo',
    'Dust': 'Polvo',
    'Smoke': 'Humo',
    'Haze': 'Calima',
    'Fog': 'Niebla',
    'Freezing fog': 'Niebla helada',
    'Mist': 'Neblina',
    'Overcast': 'Cubierto',
};

//  دیکشنری آیکون‌های جایگزین 
const weatherIconMap = {
    'Patchy light drizzle': 'https://cdn.weatherapi.com/weather/64x64/day/266.png',
    'Heavy rain at times': 'https://cdn.weatherapi.com/weather/64x64/day/308.png',
    'Overcast': 'https://cdn.weatherapi.com/weather/64x64/day/122.png',
    'Cloudy': 'https://cdn.weatherapi.com/weather/64x64/day/119.png',
    'Moderate rain at times': 'https://cdn.weatherapi.com/weather/64x64/day/302.png',
    'Patchy rain nearby': 'https://cdn.weatherapi.com/weather/64x64/day/176.png',
    'Light rain': 'https://cdn.weatherapi.com/weather/64x64/day/296.png',
    'Heavy rain': 'https://cdn.weatherapi.com/weather/64x64/day/308.png',
};

// دیکشنری ایموجی‌ها بر اساس وضعیت
const weatherEmojiMap = {
    'Sunny': '☀️',
    'Clear': '☀️',
    'Partly cloudy': '⛅',
    'Cloudy': '☁️',
    'Overcast': '☁️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Patchy rain nearby': '🌦️',
    'Patchy light drizzle': '🌦️',
    'Light drizzle': '🌧️',
    'Patchy light rain': '🌧️',
    'Light rain': '🌧️',
    'Moderate rain at times': '🌧️',
    'Moderate rain': '🌧️',
    'Heavy rain at times': '⛈️',
    'Heavy rain': '⛈️',
    'Light freezing rain': '🌧️❄️',
    'Moderate or heavy freezing rain': '⛈️❄️',
    'Light sleet': '🌨️',
    'Moderate or heavy sleet': '🌨️',
    'Patchy light snow': '🌨️',
    'Light snow': '🌨️',
    'Patchy moderate snow': '🌨️',
    'Moderate snow': '❄️',
    'Patchy heavy snow': '❄️❄️',
    'Heavy snow': '❄️❄️',
    'Ice pellets': '🧊',
    'Light rain shower': '🌦️',
    'Moderate or heavy rain shower': '⛈️',
    'Torrential rain shower': '⛈️💧',
    'Light sleet showers': '🌨️',
    'Moderate or heavy sleet showers': '🌨️',
    'Light snow showers': '🌨️',
    'Moderate or heavy snow showers': '❄️',
    'Light showers of ice pellets': '🧊',
    'Moderate or heavy showers of ice pellets': '🧊🧊',
    'Patchy light rain with thunder': '⛈️',
    'Moderate or heavy rain with thunder': '⛈️⛈️',
    'Patchy light snow with thunder': '⛈️❄️',
    'Moderate or heavy snow with thunder': '⛈️❄️❄️',
};

//  متغیرهای عمومی 
let currentLang = 'fa';
let currentCoords = null;
let weatherChart = null;
let map = null;
let mapMarker = null;
let rainInterval = null;
let clockInterval = null;
let weatherRefreshInterval = null;

//  DOM Elements 
const DOM = {
    cityName: document.getElementById('cityName'),
    countryName: document.getElementById('countryName'),
    currentTemp: document.getElementById('currentTemp'),
    currentCondition: document.getElementById('currentCondition'),
    currentIcon: document.getElementById('currentIcon'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    uvIndex: document.getElementById('uvIndex'),
    todayContainer: document.getElementById('today-hours'),
    tomorrowContainer: document.getElementById('tomorrow-hours'),
    citySearch: document.getElementById('citySearch'),
    searchBtn: document.getElementById('searchBtn'),
    langBtns: document.querySelectorAll('.lang-btn'),
    chartCtx: document.getElementById('tempChart'),
    effectsContainer: document.getElementById('weather-effects'),
    localTime: document.getElementById('localTime'),
    timeOffset: document.getElementById('timeOffset'),
};

// مدیریت صفحه لودینگ
const LoadingScreen = {
    element: document.getElementById('loading-screen'),
    title: document.getElementById('loadingTitle'),
    message: document.getElementById('loadingMessage'),
    retryBtn: document.getElementById('loadingRetryBtn'),
    retryText: document.getElementById('retryText'),
    langBtns: document.querySelectorAll('.loading-lang-btn'),
    isHidden: false,
    
    // پیام‌ها به سه زبان
    messages: {
        fa: {
            locating: 'در حال دریافت موقعیت مکانی...',
            loading: 'در حال دریافت اطلاعات آب و هوا...',
            translating: 'در حال ترجمه و آماده‌سازی...',
            errorLocation: 'خطا در دریافت موقعیت. لطفاً دسترسی موقعیت را فعال کنید.',
            errorWeather: 'خطا در دریافت اطلاعات آب و هوا. لطفاً دوباره تلاش کنید.',
            errorNetwork: 'خطا در اتصال به سرور. اتصال اینترنت خود را بررسی کنید.',
            retry: 'تلاش مجدد',
            timeout: 'زمان انتظار به پایان رسید. لطفاً دوباره تلاش کنید.',
        },
        en: {
            locating: 'Getting your location...',
            loading: 'Fetching weather data...',
            translating: 'Translating and preparing...',
            errorLocation: 'Location access failed. Please enable location permission.',
            errorWeather: 'Failed to fetch weather data. Please try again.',
            errorNetwork: 'Network error. Please check your internet connection.',
            retry: 'Try Again',
            timeout: 'Request timed out. Please try again.',
        },
        es: {
            locating: 'Obteniendo tu ubicación...',
            loading: 'Cargando datos del clima...',
            translating: 'Traduciendo y preparando...',
            errorLocation: 'Error al obtener la ubicación. Activa el permiso de ubicación.',
            errorWeather: 'Error al cargar los datos del clima. Inténtalo de nuevo.',
            errorNetwork: 'Error de red. Verifica tu conexión a internet.',
            retry: 'Intentar de nuevo',
            timeout: 'Tiempo de espera agotado. Inténtalo de nuevo.',
        }
    },
    
    show() {
        this.isHidden = false;
        this.element.classList.remove('hidden');
        this.retryBtn.style.display = 'none';
        this.message.classList.remove('error');
    },
    
    hide() {
        if (this.isHidden) return;
        this.isHidden = true;
        this.element.classList.add('hidden');
        // بعد از محو شدن، کاملاً حذف کن
        setTimeout(() => {
            this.element.style.display = 'none';
        }, 1000);
    },
    
    setMessage(key, isError = false) {
        const t = this.messages[currentLang] || this.messages.en;
        this.message.textContent = t[key] || key;
        this.message.classList.toggle('error', isError);
        if (isError) {
            this.retryBtn.style.display = 'flex';
            this.retryText.textContent = t.retry || 'Retry';
        }
    },
    
    updateLanguageButtons(lang) {
        this.langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }
};

// رویداد کلیک روی دکمه‌های زبان در لودینگ
LoadingScreen.langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.dataset.lang;
        currentLang = lang;
        LoadingScreen.updateLanguageButtons(lang);
        setLanguage(lang);
        
        // اگر خطا نمایش داده شده، دوباره تلاش کن
        if (LoadingScreen.retryBtn.style.display !== 'none') {
            LoadingScreen.setMessage('locating');
            getLocation();
        }
    });
});

// رویداد کلیک روی دکمه تلاش مجدد
LoadingScreen.retryBtn.addEventListener('click', function() {
    LoadingScreen.setMessage('locating');
    LoadingScreen.retryBtn.style.display = 'none';
    getLocation();
});

//  تنظیم زبان 
function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.textContent = t[key];
    });
    DOM.citySearch.placeholder = t.searchPlaceholder || 'جستجوی شهر...';
    DOM.langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    if (currentCoords) {
        fetchWeather(currentCoords.lat, currentCoords.lon, lang);
    }
    if (currentCoords && LoadingScreen.isHidden) {
        fetchWeather(currentCoords.lat, currentCoords.lon, lang);
    }
}

//  جستجوی هوشمند با Datalist 
const searchInput = document.getElementById('citySearch');
const datalist = document.getElementById('citySuggestions');
let searchTimeout = null;

// رویداد تایپ برای دریافت پیشنهادات
searchInput.addEventListener('input', function() {
    const query = this.value.trim();
    if (query.length < 2) {
        datalist.innerHTML = '';
        return;
    }
    
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        fetchCitySuggestions(query);
    }, 300);
});

// تابع دریافت پیشنهادات از سرور
let suggestController = null; // برای لغو درخواست‌های قدیمی‌تر

function fetchCitySuggestions(query) {
    // اگر درخواست قبلی هنوز در حال اجراست، لغوش کن تا جواب قدیمی جای جواب جدید رو نگیره
    if (suggestController) {
        suggestController.abort();
    }
    suggestController = new AbortController();

    const url = `backend.php?type=suggest&q=${encodeURIComponent(query)}&lang=${currentLang}`;

    fetch(url, { signal: suggestController.signal })
        .then(res => res.json())
        .then(data => {
            datalist.innerHTML = '';
            if (data && data.length > 0) {
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.name;
                    option.dataset.lat = item.lat;
                    option.dataset.lon = item.lon;
                    option.dataset.country = item.country;
                    datalist.appendChild(option);
                });
            }
        })
        .catch(err => {
            if (err.name !== 'AbortError') {
                console.error('خطا در دریافت پیشنهادات:', err);
            }
        });
}

//  دریافت موقعیت 
function getLocation() {
    LoadingScreen.setMessage('locating'); 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                currentCoords = {
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                };
                LoadingScreen.setMessage('loading');
                fetchWeather(currentCoords.lat, currentCoords.lon, currentLang);
                updateMap(currentCoords.lat, currentCoords.lon);
            },
            (err) => {
                console.warn('Geolocation failed:', err.message);
                LoadingScreen.setMessage('loading');
                fetchLocationByIP();
            },
            { timeout: 10000, enableHighAccuracy: false }
        );
    } else {
        fetchLocationByIP();
    }
}

function fetchLocationByIP() {
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            if (data.latitude && data.longitude) {
                currentCoords = { lat: data.latitude, lon: data.longitude };
                fetchWeather(currentCoords.lat, currentCoords.lon, currentLang);
                updateMap(currentCoords.lat, currentCoords.lon);
            } else {
                LoadingScreen.setMessage('errorLocation', true);            }
        })
        .catch(() => {
            LoadingScreen.setMessage('errorLocation', true);
        });}

//  جستجوی شهر 
function searchCity() {
    const query = searchInput.value.trim();
    if (!query) return;

    // بررسی انتخاب از datalist
    let selectedOption = null;
    for (let opt of datalist.options) {
        if (opt.value === query) {
            selectedOption = opt;
            break;
        }
    }

    if (selectedOption) {
        const lat = selectedOption.dataset.lat;
        const lon = selectedOption.dataset.lon;
        if (lat && lon) {
            currentCoords = { lat: parseFloat(lat), lon: parseFloat(lon) };
            fetchWeather(currentCoords.lat, currentCoords.lon, currentLang);
            updateMap(currentCoords.lat, currentCoords.lon);
            return;
        }
    }

    // ارسال به backend برای ترجمه
    fetchWeather(null, null, currentLang, query);
}

document.getElementById('searchBtn').addEventListener('click', searchCity);
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchCity();
    }
});


// راه‌اندازی 
document.addEventListener('DOMContentLoaded', function() {
    // راه‌اندازی
    setLanguage('fa');

    // تایمر محافظ: اگه بعد از ۳۰ ثانیه هنوز لودینگ بود، خطا نشون بده
    let loadingTimeout = setTimeout(() => {
        if (!LoadingScreen.isHidden) {
            LoadingScreen.setMessage('timeout', true);
        }
    }, 30000);

    // پاک کردن تایمر هنگام بسته شدن لودینگ
    const originalHide = LoadingScreen.hide.bind(LoadingScreen);
    LoadingScreen.hide = function() {
        if (loadingTimeout) {
            clearTimeout(loadingTimeout);
            loadingTimeout = null;
        }
        originalHide();
    };

    getLocation();

    DOM.citySearch.placeholder = translations.fa.searchPlaceholder;

    // ساعت هر ثانیه زنده به‌روزرسانی میشه (کاملاً سمت کلاینت، بدون فراخوانی API)
    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(tickClock, 1000);

    // داده‌ی واقعی آب‌وهوا هر ۵ دقیقه یک‌بار در پس‌زمینه رفرش میشه.
    // عمداً هر ثانیه رفرش نمیشه چون دمای واقعی این‌قدر سریع تغییر نمی‌کنه
    // و این کار سهمیه‌ی API رو (به‌خصوص با مشکلات اتصال) خیلی سریع می‌سوزونه.
    if (weatherRefreshInterval) clearInterval(weatherRefreshInterval);
    weatherRefreshInterval = setInterval(() => {
        if (currentCoords) {
            fetchWeather(currentCoords.lat, currentCoords.lon, currentLang, null, true);
        }
    }, 5 * 60 * 1000);
});


// دریافت داده‌های امروز و فردا
function fetchWeather(lat, lon, lang, city = null, forceRefresh = false) {
    let url = `backend.php?type=weather&lang=${lang}`;
    if (city) {
        url += `&city=${encodeURIComponent(city)}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    } else {
        return;
    }

    const cacheKey = `weather_${city || `${lat}_${lon}`}_${lang}`;
    let cached = null;
    try {
        cached = forceRefresh ? null : localStorage.getItem(cacheKey);
    } catch (e) {
        console.warn('localStorage در دسترس نیست (مثلاً حالت خصوصی مرورگر):', e);
    }
    if (cached) {
        try {
            const data = JSON.parse(cached);
            const age = Date.now() - data.timestamp;
            if (age < 30 * 60 * 1000) {
                displayWeather(data.weather);
                // به‌روزرسانی مختصات از کش
                if (data.weather.location) {
                    currentCoords = {
                        lat: data.weather.location.lat,
                        lon: data.weather.location.lon
                    };
                    fetchWeekly(currentCoords.lat, currentCoords.lon, lang);
                }
                return;
            }
        } catch (e) {
            console.warn('داده‌ی کش‌شده خراب بود، نادیده گرفته شد:', e);
        }
    }

    // اگر مختصات از قبل داریم (جستجوی شهر با lat/lon، نه با نام)،
    // fetchWeekly رو هم‌زمان با fetchWeather شروع کن، نه بعد از اتمام اون
    // (این دو درخواست به هم وابسته نیستند مگر وقتی جستجو فقط با نام شهر انجام شده)
    if (lat && lon) {
        fetchWeekly(lat, lon, lang);
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                if (!LoadingScreen.isHidden) {
                    // تا وقتی صفحه‌ی لودینگ فعاله، هیچ alert ای نشون نده — خطا رو خودِ لودینگ نشون می‌ده
                    LoadingScreen.setMessage('errorWeather', true);
                } else {
                    // بعد از لودینگ (مثلاً جستجوی شهر جدید)، همچنان alert بزن ولی به زبان خودِ کاربر
                    const alertMsgs = {
                        fa: 'خطا: شهر پیدا نشد یا مشکلی در دریافت اطلاعات آب‌وهوا پیش اومد.',
                        en: 'Error: city not found or a problem occurred fetching weather data.',
                        es: 'Error: ciudad no encontrada o hubo un problema al obtener los datos del clima.'
                    };
                    alert(alertMsgs[currentLang] || alertMsgs.en);
                }
                return;
            }
            
            // به‌روزرسانی currentCoords با مختصات جدید
            const hadCoordsBefore = !!(lat && lon);
            if (data.location) {
                currentCoords = {
                    lat: data.location.lat,
                    lon: data.location.lon
                };
            }
            
            try {
                localStorage.setItem(cacheKey, JSON.stringify({
                    weather: data,
                    timestamp: Date.now()
                }));
            } catch (e) {
                console.warn('ذخیره در localStorage ممکن نشد (مثلاً حالت خصوصی مرورگر):', e);
            }
            displayWeather(data);
            
            // محو کردن صفحه لودینگ
            LoadingScreen.hide();

            if (currentCoords) {
                fetchWeekly(currentCoords.lat, currentCoords.lon, lang);
            }
            
            // اگر جستجو با نام شهر بود (مختصات از قبل معلوم نبود)،
            // فقط بعد از دریافت مختصات از پاسخ weather می‌تونیم weekly رو بگیریم
            if (!hadCoordsBefore && currentCoords) {
                fetchWeekly(currentCoords.lat, currentCoords.lon, lang);
            }
        })
        .catch(err => {
            console.error('Fetch error:', err);
            LoadingScreen.setMessage('errorNetwork', true);
        });
}

//دریافت داده‌های هفتگی (Open-Meteo) 
function fetchWeekly(lat, lon, lang) {
    const url = `backend.php?type=weekly&lat=${lat}&lon=${lon}&lang=${lang}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.warn('خطا در دریافت داده‌های هفتگی:', data.error);
                // Fallback: از WeatherAPI برای ۳ روز استفاده کن
                fallbackWeekly(lat, lon, lang);
                return;
            }
            
            // نمایش پیش بینی هفتگی
            if (data.forecast && data.forecast.forecastday) {
                displayWeekly(data.forecast.forecastday);
            } else {
                console.warn('ساختار داده‌های هفتگی نامعتبر:', data);
                fallbackWeekly(lat, lon, lang);
            }
        })
        .catch(err => {
            console.error('خطا در دریافت داده‌های هفتگی:', err);
            fallbackWeekly(lat, lon, lang);
        });
}

// تابع Fallback برای زمانی که Open-Meteo کار نکرد
function fallbackWeekly(lat, lon, lang) {
    const url = `backend.php?type=weather&lat=${lat}&lon=${lon}&lang=${lang}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.forecast && data.forecast.forecastday) {
                displayWeekly(data.forecast.forecastday);
            } else {
                document.getElementById('weekly-container').innerHTML = 
                    `<p style="text-align:center;opacity:0.6;padding:20px;">${translations[currentLang].noData || 'اطلاعات هفتگی در دسترس نیست'}</p>`;
            }
        })
        .catch(() => {
            document.getElementById('weekly-container').innerHTML = 
                `<p style="text-align:center;opacity:0.6;padding:20px;">${translations[currentLang].noData || 'اطلاعات هفتگی در دسترس نیست'}</p>`;
        });
}


//  نمایش داده‌ها 
function displayWeather(data) {
    const current = data.current;
    const location = data.location;
    const forecast = data.forecast.forecastday;

    // اطلاعات فعلی
    DOM.cityName.textContent = location.name;
    DOM.countryName.textContent = location.country;
    DOM.currentTemp.textContent = `${Math.round(current.temp_c)}°C`;

    // ترجمه وضعیت
    const conditionText = current.condition.text;
    const translatedCondition = translateCondition(conditionText);
    DOM.currentCondition.textContent = translatedCondition;

    // آیکون
    const iconUrl = getWeatherIcon(conditionText, current.condition.icon);
    DOM.currentIcon.src = iconUrl;

    DOM.humidity.textContent = `${current.humidity}%`;
    DOM.windSpeed.textContent = `${Math.round(current.wind_kph)} km/h`;
    DOM.uvIndex.textContent = current.uv || '0';

    // به‌روزرسانی نقشه
    updateMap(location.lat, location.lon, location.name);

    // ساعت محلی و اختلاف
    updateClock(location.tz_id);

    // پیش بینی ساعتی
    if (forecast && forecast.length >= 2) {
        displayHours(DOM.todayContainer, forecast[0].hour);
        displayHours(DOM.tomorrowContainer, forecast[1].hour);
        // تنظیم تم بر اساس ساعت محلی
        setThemeByTime();
        // رسم نمودار
        drawChart(forecast[0].hour);
        // افکت آب و هوا
        applyWeatherEffect(conditionText);
    }

    console.log("tedad roz",forecast.length);
    // نمایش پیش بینی هفتگی
    if (forecast && forecast.length > 0) {
        displayWeekly(forecast);
    } else {
        document.getElementById('weekly-container').innerHTML = '<p style="text-align:center;opacity:0.6;padding:20px;">داده‌ای موجود نیست</p>';
    }

}

//  ترجمه وضعیت 
// نکته‌ی امنیتی: قبل از قرار دادن هر متن دینامیک توی innerHTML، این تابع کاراکترهای خطرناک HTML رو escape می‌کنه
function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function translateCondition(text) {
    if (currentLang === 'fa') {
        return weatherTranslations[text] || text;
    }
    return text;
}

//  آیکون جایگزین 
function getWeatherIcon(conditionText, defaultIcon) {
    if (weatherIconMap[conditionText]) {
        return weatherIconMap[conditionText];
    }
    // اگر آیکون پیش فرض شکسته بود، از یک آیکون پیش فرض استفاده کن
    if (!defaultIcon || defaultIcon.includes('404')) {
        return 'https://cdn.weatherapi.com/weather/64x64/day/113.png'; // آیکون پیش‌فرض
    }
    return defaultIcon;
}

// تابع تبدیل وضعیت به ایموجی
function getWeatherEmoji(conditionText) {
    if (weatherEmojiMap[conditionText]) {
        return weatherEmojiMap[conditionText];
    }
    // جستجوی جزئی (برای وضعیت‌هایی که ممکنه دقیقا توی دیکشنری نباشن)
    const text = conditionText.toLowerCase();
    if (text.includes('sun') || text.includes('clear')) return '☀️';
    if (text.includes('partly cloud')) return '⛅';
    if (text.includes('cloud')) return '☁️';
    if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) return '🌧️';
    if (text.includes('thunder')) return '⛈️';
    if (text.includes('snow') || text.includes('sleet')) return '❄️';
    if (text.includes('mist') || text.includes('fog')) return '🌫️';
    if (text.includes('ice')) return '🧊';
    return '🌤️'; // پیش فرض
}

//  ساعت زنده (تیک هر ثانیه) و اختلاف زمانی 
let currentTzId = null; // آخرین tz_id دریافت‌شده از API (مثل "Asia/Tehran")

// محاسبه اختلاف یک منطقه زمانی با UTC بر حسب دقیقه، در لحظه‌ی داده‌شده
// (این روش با تغییر ساعت تابستانی/زمستانی هم به‌درستی سازگار است)
function getTzOffsetMinutes(tz, date) {
    const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone: tz, hour12: false,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    const parts = dtf.formatToParts(date).reduce((acc, p) => {
        if (p.type !== 'literal') acc[p.type] = p.value;
        return acc;
    }, {});
    const asUTC = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    return Math.round((asUTC - date.getTime()) / 60000);
}

function updateClock(timezone) {
    if (!timezone) return;
    currentTzId = timezone;
    tickClock(); // بلافاصله یک‌بار به‌روزرسانی کن، نه فقط منتظر تیک بعدی بمون
}

function tickClock() {
    if (!currentTzId) return;
    const now = new Date();

    // ساعت زنده‌ی محل (HH:MM:SS) با استفاده از timezone واقعی
    DOM.localTime.textContent = new Intl.DateTimeFormat('en-GB', {
        timeZone: currentTzId,
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).format(now);

    // اختلاف با ساعت جهانی (UTC)
    const diffTotalMinutes = getTzOffsetMinutes(currentTzId, now);
    const sign = diffTotalMinutes >= 0 ? '+' : '-';
    const diffHours = Math.floor(Math.abs(diffTotalMinutes) / 60);
    const diffMinutes = Math.abs(diffTotalMinutes) % 60;

    const t = translations[currentLang];
    let offsetText;
    if (diffTotalMinutes === 0) {
        offsetText = t.offsetSame;
    } else {
        const formattedOffset = `${sign}${diffHours}:${String(diffMinutes).padStart(2, '0')}`;
        offsetText = t.offsetHours.replace('{offset}', formattedOffset);
    }
    DOM.timeOffset.textContent = offsetText;

    // پس‌زمینه و تم هم هر ثانیه بر اساس همین ساعت محلی به‌روزرسانی میشه
    setThemeByTime();
}

//  نمایش ساعتی 
function displayHours(container, hours) {
    container.innerHTML = '';
    hours.forEach((hour, index) => {
        const timeStr = hour.time.split(' ')[1];
        const temp = hour.temp_c;
        const condition = hour.condition.text;
        const icon = hour.condition.icon;

        const translatedCondition = translateCondition(condition);
        const iconUrl = getWeatherIcon(condition, icon);

        const card = document.createElement('div');
        card.className = 'hour-card';
        card.style.animationDelay = `${index * 0.03}s`;

        // نکته‌ی امنیتی: هرچند این مقادیر از API آب‌وهوا میان (نه مستقیم از کاربر)،
        // برای احتیاط (defense in depth) قبل از قرار گرفتن توی innerHTML، escape میشن
        card.innerHTML = `
            <div class="time">${escapeHtml(timeStr)}</div>
            <img src="${escapeHtml(iconUrl)}" alt="${escapeHtml(translatedCondition)}">
            <div class="temp">${Math.round(temp)}°C</div>
            <div class="condition">${escapeHtml(translatedCondition)}</div>
        `;
        container.appendChild(card);
    });
}

//  نمودار دما 
function drawChart(hours) {
    const labels = hours.map(h => h.time.split(' ')[1]);
    const temps = hours.map(h => h.temp_c);

    if (weatherChart) {
        weatherChart.destroy();
    }

    weatherChart = new Chart(DOM.chartCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: currentLang === 'fa' ? 'دما (°C)' : 'Temp (°C)',
                data: temps,
                borderColor: '#0077be',
                backgroundColor: 'rgba(0, 119, 190, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: '#0077be',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

//  نقشه 
function initMap(lat, lon, name = '') {
    if (!map) {
        map = L.map('map').setView([lat, lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);
    } else {
        map.setView([lat, lon], 10);
    }

    if (mapMarker) {
        map.removeLayer(mapMarker);
    }
    mapMarker = L.marker([lat, lon]).addTo(map);
    if (name) {
        mapMarker.bindPopup(name).openPopup();
    }
}

function updateMap(lat, lon, name = '') {
    if (!map) {
        initMap(lat, lon, name);
    } else {
        map.setView([lat, lon], 10);
        if (mapMarker) {
            map.removeLayer(mapMarker);
        }
        mapMarker = L.marker([lat, lon]).addTo(map);
        if (name) {
            mapMarker.bindPopup(name).openPopup();
        }
    }
}

//  ابزار کمکی: تبدیل رنگ HEX به [r,g,b] 
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16)
    ];
}

// درون‌یابی خطی بین دو رنگ HEX با نسبت t (بین ۰ و ۱) -> رشته‌ی "rgb(r, g, b)"
// همین باعث میشه رنگ به‌جای «یهو عوض شدن»، به آرامی و بدون آزار چشم تغییر کنه
function lerpColor(hexA, hexB, t) {
    t = Math.max(0, Math.min(1, t));
    const [r1, g1, b1] = hexToRgb(hexA);
    const [r2, g2, b2] = hexToRgb(hexB);
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return `rgb(${r}, ${g}, ${b})`;
}

// ساعت محلی (با اعشار دقیقه) در منطقه‌ی زمانی داده‌شده، مثلاً ۶:۳۰ -> 6.5
function getLocalHourDecimal(date, tzId) {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: tzId || undefined,
        hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(date).reduce((acc, p) => {
        if (p.type !== 'literal') acc[p.type] = p.value;
        return acc;
    }, {});
    return parseInt(parts.hour, 10) + parseInt(parts.minute, 10) / 60;
}

//  محاسبه‌ی میزان «شب بودن» به‌صورت پیوسته: 0 = روز کامل، 1 = شب کامل 
// بین ساعت DAWN_START تا DAWN_END به‌آرامی از شب به روز میره (نزدیک ۵ صبح)
// بین ساعت DUSK_START تا DUSK_END به‌آرامی از روز به شب میره (نزدیک ۶ عصر)
function getNightFactor(hourDecimal) {
    const DAWN_START = 4, DAWN_END = 6;    // طلوع: ۴ تا ۶ صبح
    const DUSK_START = 17, DUSK_END = 19;  // غروب: ۵ تا ۷ عصر، مرکز آن ۶ عصر

    if (hourDecimal <= DAWN_START || hourDecimal >= DUSK_END) {
        return 1; // شب کامل
    }
    if (hourDecimal >= DAWN_END && hourDecimal <= DUSK_START) {
        return 0; // روز کامل
    }
    if (hourDecimal < DAWN_END) {
        // در حال طلوع: مقدار از ۱ (شب) به ۰ (روز) کاهش پیدا می‌کنه
        return 1 - (hourDecimal - DAWN_START) / (DAWN_END - DAWN_START);
    }
    // در حال غروب: مقدار از ۰ (روز) به ۱ (شب) افزایش پیدا می‌کنه
    return (hourDecimal - DUSK_START) / (DUSK_END - DUSK_START);
}

// میزان «تیرگی اضافه‌ی نیمه‌شب»: ۰ به‌جز نزدیکی‌های ۰۰:۰۰، و دقیقاً در ۰۰:۰۰ به بیشترین مقدار (۱) می‌رسه
// این باعث میشه شب یکدست نباشه؛ نزدیک نیمه‌شب کمی تیره‌تر از مثلاً ساعت ۸ شب یا ۳ بامداد به‌نظر بیاد
function getMidnightDepth(hourDecimal) {
    const WINDOW = 3; // فقط بین ۲۱:۰۰ و ۰۳:۰۰ این افکت اعمال میشه (۳ ساعت قبل/بعد از نیمه‌شب)
    let distance = Math.min(hourDecimal, 24 - hourDecimal); // فاصله تا ۰۰:۰۰ با در نظر گرفتن چرخش شبانه‌روز
    if (distance >= WINDOW) {
        return 0;
    }
    return 1 - (distance / WINDOW);
}

// میزان «شب بودن» مخصوص رنگ متن: از ۴ تا ۵ صبح رنگ‌پریده (حالت شب) می‌مونه،
// بین ۵ تا ۶ صبح به آرامی به سمت تیره (حالت روز) میره، و از ۶ صبح به بعد کاملاً تیره‌ست.
function getTextNightFactor(hourDecimal) {
    const PALE_HOLD_START = 4, RAMP_START = 5, RAMP_END = 6;

    if (hourDecimal >= PALE_HOLD_START && hourDecimal < RAMP_START) {
        return 1; // رنگ‌پریده (حالت شب) — بین ۴ تا ۵ صبح
    }
    if (hourDecimal >= RAMP_START && hourDecimal <= RAMP_END) {
        // گذار نرم از رنگ‌پریده به تیره — بین ۵ تا ۶ صبح
        return 1 - (hourDecimal - RAMP_START) / (RAMP_END - RAMP_START);
    }
    // بیرون از این بازه‌ها، دقیقاً هماهنگ با پس‌زمینه (که خودش هم در همین حوالی صبح می‌شه)
    return getNightFactor(hourDecimal);
}

//  تنظیم تم و محو شدن پیوسته‌ی پس‌زمینه و متن، بر اساس ساعتِ محلِ شهر انتخاب‌شده (نه دستگاه کاربر) 
function setThemeByTime() {
    const now = new Date();
    const hourDecimal = getLocalHourDecimal(now, currentTzId);

    const nightFactor = getNightFactor(hourDecimal);       // 0..1 (روز کامل تا شب کامل) - برای پس‌زمینه
    const midnightDepth = getMidnightDepth(hourDecimal);   // 0..1 (فقط نزدیک نیمه‌شب غیرصفره)
    const textNightFactor = getTextNightFactor(hourDecimal); // 0..1 - برای رنگ متن (زمان‌بندی جداگانه‌ی صبح)

    // محو شدن پیوسته‌ی خودِ پس‌زمینه (همون منطق قبلی)
    document.body.style.setProperty('--night-opacity', nightFactor.toFixed(3));

    // رنگ گرادینت شب رو کمی تیره‌تر کن، فقط نزدیک نیمه‌شب (حداکثر ۶۰٪ به سمت تقریباً مشکی)
    const nightC1 = lerpColor('#0a0a2a', '#000006', midnightDepth * 0.6);
    const nightC2 = lerpColor('#1a1a3e', '#04040c', midnightDepth * 0.6);
    document.body.style.setProperty('--night-c1', nightC1);
    document.body.style.setProperty('--night-c2', nightC2);

    // رنگ متن (تیتر‌ها، اسم شهر و ...) هم به‌آرامی و پیوسته بین رنگ روز و شب تغییر می‌کنه
    // تا هنگام تغییر تم، چشم اذیت نشه (به‌جای پرش ناگهانی رنگ)
    // رنگ متن تم شب رنگ‌پریده‌تر شد (نزدیک‌تر به سفید، به‌جای بنفش-آبی پررنگ قبلی)
    document.body.style.setProperty('--text-color', lerpColor('#1a1a2e', '#f0f0f8', textNightFactor));

    // کلاس تم هم برای پس‌زمینه‌ی کارت‌ها به‌روزرسانی می‌شود (پلکانی، نه پیوسته)
    let theme = 'day';
    if (nightFactor >= 0.75) {
        theme = 'night';
    } else if (nightFactor > 0.1) {
        theme = 'sunset';
    }
    document.body.className = theme;
}

function applyWeatherEffect(condition) {
    const container = document.getElementById('weather-effects');
    if (!container) {
        console.warn('weather-effects container not found');
        return;
    }
    
    // پاک کردن افکت‌های قبلی
    container.innerHTML = '';
    if (rainInterval) {
        clearInterval(rainInterval);
        rainInterval = null;
    }

    const conditionLower = condition.toLowerCase();
    
    // تشخیص باران (انگلیسی، فارسی یا اسپانیایی)
    const isRain = conditionLower.includes('rain') || 
                   conditionLower.includes('drizzle') || 
                   conditionLower.includes('باران') || 
                   conditionLower.includes('نم') ||
                   conditionLower.includes('shower') ||
                   conditionLower.includes('رگبار') ||
                   conditionLower.includes('lluvia') ||
                   conditionLower.includes('llovizna') ||
                   conditionLower.includes('chubasco');
    
    // تشخیص آفتاب (انگلیسی، فارسی یا اسپانیایی)
    const isSun = conditionLower.includes('sun') || 
                  conditionLower.includes('clear') || 
                  conditionLower.includes('آفتاب') || 
                  conditionLower.includes('صاف') ||
                  conditionLower.includes('partly cloudy') ||
                  conditionLower.includes('نیمه ابری') ||
                  conditionLower.includes('sol') ||
                  conditionLower.includes('despejado') ||
                  conditionLower.includes('parcialmente nublado');

    if (isRain) {
        // ساخت باران
        for (let i = 0; i < 80; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.height = `${10 + Math.random() * 30}px`;
            drop.style.animationDuration = `${0.5 + Math.random() * 0.8}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.opacity = 0.2 + Math.random() * 0.3;
            container.appendChild(drop);
        }
    } else if (isSun) {
        // ساخت خورشید (دایره محو)
        const sun = document.createElement('div');
        sun.className = 'sun-glow';
        container.appendChild(sun);
        
        // اضافه کردن چند پرتو نوری
        for (let i = 0; i < 8; i++) {
            const ray = document.createElement('div');
            ray.className = 'sun-ray';
            ray.style.transform = `rotate(${i * 45}deg)`;
            container.appendChild(ray);
        }
    } else {
        // حالت ابری: بدون افکت خاص
        const cloud = document.createElement('div');
        cloud.className = 'cloud-effect';
        cloud.textContent = '☁️';
        cloud.style.cssText = `
            position: absolute;
            top: 10%;
            right: 15%;
            font-size: 6rem;
            opacity: 0.2;
            animation: floatCloud 20s linear infinite;
        `;
        container.appendChild(cloud);
    }
}

//  رویدادهای دکمه‌های زبان 
DOM.langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.dataset.lang;
        setLanguage(lang);
        if (currentCoords) {
            fetchWeather(currentCoords.lat, currentCoords.lon, lang);
        }
    });
});



//نمایش پیش بینی هفتگی 
function displayWeekly(forecastDays) {
    const container = document.getElementById('weekly-container');
    if (!container) {
        console.error('weekly-container پیدا نشد!');
        return;
    }
    
    container.innerHTML = '';
    
    if (!forecastDays || forecastDays.length === 0) {
        container.innerHTML = `<p style="text-align:center;opacity:0.6;padding:20px;">${translations[currentLang].noData || 'اطلاعاتی برای روزهای آینده موجود نیست'}</p>`;
        return;
    }
    
    // اگر کمتر از ۷ روز بود، پیغام نشون بده
    if (forecastDays.length < 7) {
        console.warn(`فقط ${forecastDays.length} روز در دسترس است`);
    }
    
    const today = new Date();
    const todayDayIndex = today.getDay();
    const daysInWeek = weekDays[currentLang] || weekDays.en;
    
    forecastDays.forEach((day, index) => {
        const dayOffset = todayDayIndex + index;
        const weekDayIndex = dayOffset % 7;
        const dayName = daysInWeek[weekDayIndex];
        
        const dateObj = new Date(day.date);
        const dateStr = dateObj.toLocaleDateString(currentLang === 'fa' ? 'fa-IR' : 'en-US', {
            month: 'short',
            day: 'numeric'
        });
        
        // استفاده از ایموجی از Open-Meteo یا خودکار
        let emoji = day.day.emoji || getWeatherEmoji(day.day.condition.text);
        const avgTemp = day.day.avgtemp_c;
        const conditionText = day.day.condition.text;
        const translatedCondition = translateCondition(conditionText);

        // وضعیت شب حالا واقعاً جدا از روزه (اگه از Open-Meteo اومده باشه).
        // فقط اگه این داده موجود نبود (مثلاً توی حالت fallback سه‌روزه‌ی WeatherAPI)، همون وضعیت روز رو نشون بده
        const nightConditionText = day.night?.condition?.text || conditionText;
        const translatedNightCondition = translateCondition(nightConditionText);
        
        // برچسب امروز
        const isToday = index === 0;
        const dayLabel = isToday ? (currentLang === 'fa' ? 'امروز' : 'Today') : dayName;
        
        const card = document.createElement('div');
        card.className = 'weekly-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="week-day">${escapeHtml(dayLabel)}</div>
            <div class="week-date">${isToday ? '' : escapeHtml(dateStr)}</div>
            <div class="week-emoji">${escapeHtml(emoji)}</div>
            <div class="week-temp">${typeof avgTemp === 'number' ? Math.round(avgTemp) : escapeHtml(String(avgTemp))}°C</div>
            <div class="week-desc">${escapeHtml(translatedCondition)}</div>
            <div class="week-day-night">
                <span>☀️ ${escapeHtml(translatedCondition)}</span>
                <span>🌙 ${escapeHtml(translatedNightCondition)}</span>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // اگر کمتر از ۷ روز بود، پیغام تکمیلی
    if (forecastDays.length < 7) {
        const note = document.createElement('p');
        note.style.cssText = 'text-align:center;opacity:0.5;font-size:0.8rem;margin-top:10px;';
        note.textContent = currentLang === 'fa' ? 
            `* تنها ${forecastDays.length} روز در دسترس است` : 
            `* Only ${forecastDays.length} days available`;
        container.appendChild(note);
    }
}


// تابع ساخت آیکون با فال بک ایموجی
function createWeatherIcon(conditionText, iconUrl, className = '') {
    const img = document.createElement('img');
    img.src = iconUrl;
    img.alt = conditionText;
    img.className = className;
    img.loading = 'lazy';
    
    // فال بک: اگه تصویر لود نشد، ایموجی جایگزین کن
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const emoji = getWeatherEmoji(conditionText);
        const span = document.createElement('span');
        span.textContent = emoji;
        span.className = className + ' emoji-fallback';
        span.style.fontSize = '2.5rem';
        span.style.lineHeight = '1';
        this.parentNode.replaceChild(span, this);
    });
    
    return img;
}



const card = document.createElement('div');
card.className = 'hour-card';
card.style.animationDelay = `${index * 0.03}s`;

const timeDiv = document.createElement('div');
timeDiv.className = 'time';
timeDiv.textContent = timeStr;

const iconElement = createWeatherIcon(
    condition,
    iconUrl,
    'hour-icon'
);

const tempDiv = document.createElement('div');
tempDiv.className = 'temp';
tempDiv.textContent = `${Math.round(temp)}°C`;

const condDiv = document.createElement('div');
condDiv.className = 'condition';
condDiv.textContent = translatedCondition;

card.appendChild(timeDiv);
card.appendChild(iconElement);
card.appendChild(tempDiv);
card.appendChild(condDiv);
container.appendChild(card);