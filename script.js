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
}

//  دریافت موقعیت 
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                currentCoords = {
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                };
                fetchWeather(currentCoords.lat, currentCoords.lon, currentLang);
                updateMap(currentCoords.lat, currentCoords.lon);
            },
            () => fetchLocationByIP()
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
                alert('نمی توان موقعیت را تشخیص داد. لطفا یک شهر جستجو کنید.');
            }
        })
        .catch(() => alert('خطا در دریافت موقعیت. لطفا یک شهر جستجو کنید.'));
}

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


// دریافت داده‌های امروز و فردا
function fetchWeather(lat, lon, lang, city = null) {
    let url = `backend.php?type=weather&lang=${lang}`;
    if (city) {
        url += `&city=${encodeURIComponent(city)}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    } else {
        return;
    }

    const cacheKey = `weather_${city || `${lat}_${lon}`}_${lang}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
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
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert('خطا: ' + data.error);
                return;
            }
            
            // به‌روزرسانی currentCoords با مختصات جدید
            if (data.location) {
                currentCoords = {
                    lat: data.location.lat,
                    lon: data.location.lon
                };
            }
            
            localStorage.setItem(cacheKey, JSON.stringify({
                weather: data,
                timestamp: Date.now()
            }));
            displayWeather(data);
            
            // دریافت داده‌های هفتگی با مختصات جدید
            if (currentCoords) {
                fetchWeekly(currentCoords.lat, currentCoords.lon, lang);
            }
        })
        .catch(err => {
            console.error('Fetch error:', err);
            alert('خطا در دریافت اطلاعات آب و هوا.');
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
    updateClock(location.tz_id, location.localtime);

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

//  ساعت و اختلاف زمانی 
function updateClock(timezone, localtime) {
    if (!timezone || !localtime) return;

    // استخراج ساعت و دقیقه از localtime (فرمت: "2025-06-15 14:30")
    const parts = localtime.split(' ');
    if (parts.length < 2) return;
    const timePart = parts[1];
    DOM.localTime.textContent = timePart.substring(0, 5); // HH:MM

    // محاسبه اختلاف با UTC
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const localDate = new Date(localtime);
    const localHours = localDate.getHours();
    const localMinutes = localDate.getMinutes();

    let diffHours = localHours - utcHours;
    let diffMinutes = localMinutes - utcMinutes;
    if (diffMinutes < 0) {
        diffMinutes += 60;
        diffHours -= 1;
    }
    if (diffHours < -12) diffHours += 24;
    if (diffHours > 12) diffHours -= 24;

    const t = translations[currentLang];
    let offsetText = '';
    if (diffHours === 0 && diffMinutes === 0) {
        offsetText = t.offsetSame;
    } else {
        const sign = diffHours >= 0 ? '+' : '';
        const formattedOffset = `${sign}${diffHours}:${String(Math.abs(diffMinutes)).padStart(2, '0')}`;
        offsetText = t.offsetHours.replace('{offset}', formattedOffset);
    }
    DOM.timeOffset.textContent = offsetText;
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

        card.innerHTML = `
            <div class="time">${timeStr}</div>
            <img src="${iconUrl}" alt="${translatedCondition}">
            <div class="temp">${Math.round(temp)}°C</div>
            <div class="condition">${translatedCondition}</div>
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

//  تنظیم تم بر اساس ساعت محلی 
function setThemeByTime() {
    const now = new Date();
    const hours = now.getHours();

    let theme = 'day';
    if (hours >= 6 && hours < 17) {
        theme = 'day';
    } else if (hours >= 17 && hours < 19) {
        theme = 'sunset';
    } else {
        theme = 'night';
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
    
    // تشخیص باران (انگلیسی یا فارسی)
    const isRain = conditionLower.includes('rain') || 
                   conditionLower.includes('drizzle') || 
                   conditionLower.includes('باران') || 
                   conditionLower.includes('نم') ||
                   conditionLower.includes('shower') ||
                   conditionLower.includes('رگبار');
    
    // تشخیص آفتاب (انگلیسی یا فارسی)
    const isSun = conditionLower.includes('sun') || 
                  conditionLower.includes('clear') || 
                  conditionLower.includes('آفتاب') || 
                  conditionLower.includes('صاف') ||
                  conditionLower.includes('partly cloudy') ||
                  conditionLower.includes('نیمه ابری');

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

//  راه‌اندازی 
document.addEventListener('DOMContentLoaded', function() {
    setLanguage('fa');
    getLocation();
    DOM.citySearch.placeholder = translations.fa.searchPlaceholder;

    // بروزرسانی ساعت هر دقیقه
    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(() => {
        // اگر داده‌های موقعیت موجوده، دوباره زمان رو به‌روز کن
        if (currentCoords) {
            // می‌تونیم از کش شده استفاده کنیم یا دوباره واکشی کنیم
            // فعلاً کاری نمی‌کنیم چون توی displayWeather تنظیم میشه
        }
    }, 60000);
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
        
        // برچسب امروز
        const isToday = index === 0;
        const dayLabel = isToday ? (currentLang === 'fa' ? 'امروز' : 'Today') : dayName;
        
        const card = document.createElement('div');
        card.className = 'weekly-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="week-day">${dayLabel}</div>
            <div class="week-date">${isToday ? '' : dateStr}</div>
            <div class="week-emoji">${emoji}</div>
            <div class="week-temp">${typeof avgTemp === 'number' ? Math.round(avgTemp) : avgTemp}°C</div>
            <div class="week-desc">${translatedCondition}</div>
            <div class="week-day-night">
                <span>☀️ ${translatedCondition}</span>
                <span>🌙 ${translatedCondition}</span>
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