// ==================== ترجمه‌ها ====================
const translations = {
    fa: {
        appTitle: 'پیش‌بینی آب و هوا',
        today: 'امروز',
        tomorrow: 'فردا',
        footer: 'منبع: WeatherAPI.com',
        temperatureChart: 'نمودار دما',
        humidity: 'رطوبت',
        wind: 'باد',
        uv: 'UV',
        searchPlaceholder: 'جستجوی شهر...',
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
    }
};

let currentLang = 'fa';
let currentCoords = null;
let currentCity = '';
let weatherChart = null;
let map = null;
let mapMarker = null;
let rainInterval = null;

// ==================== DOM Elements ====================
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
};

// ==================== تنظیم زبان ====================
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

// ==================== دریافت موقعیت ====================
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
                alert('نمی‌توان موقعیت را تشخیص داد. لطفاً یک شهر جستجو کنید.');
            }
        })
        .catch(() => alert('خطا در دریافت موقعیت. لطفاً یک شهر جستجو کنید.'));
}

// ==================== جستجوی شهر ====================
function searchCity() {
    const city = DOM.citySearch.value.trim();
    if (!city) return;
    currentCity = city;
    fetchWeather(null, null, currentLang, city);
    // برای نقشه، از API جداگانه استفاده می‌کنیم (در backend انجام می‌شود)
}

DOM.searchBtn.addEventListener('click', searchCity);
DOM.citySearch.addEventListener('keypress', e => {
    if (e.key === 'Enter') searchCity();
});

// ==================== دریافت داده از Backend ====================
function fetchWeather(lat, lon, lang, city = null) {
    let url = `backend.php?lang=${lang}`;
    if (city) {
        url += `&city=${encodeURIComponent(city)}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    } else {
        return;
    }

    // بررسی کش
    const cacheKey = `weather_${city || `${lat}_${lon}`}_${lang}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        const data = JSON.parse(cached);
        const age = Date.now() - data.timestamp;
        if (age < 30 * 60 * 1000) { // 30 دقیقه
            displayWeather(data.weather);
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
            // ذخیره در کش
            localStorage.setItem(cacheKey, JSON.stringify({
                weather: data,
                timestamp: Date.now()
            }));
            displayWeather(data);
        })
        .catch(err => {
            console.error('Fetch error:', err);
            alert('خطا در دریافت اطلاعات آب و هوا.');
        });
}

// ==================== نمایش داده‌ها ====================
function displayWeather(data) {
    const current = data.current;
    const location = data.location;
    const forecast = data.forecast.forecastday;

    // اطلاعات فعلی
    DOM.cityName.textContent = location.name;
    DOM.countryName.textContent = location.country;
    DOM.currentTemp.textContent = `${Math.round(current.temp_c)}°C`;
    DOM.currentCondition.textContent = current.condition.text;
    DOM.currentIcon.src = current.condition.icon;
    DOM.humidity.textContent = `${current.humidity}%`;
    DOM.windSpeed.textContent = `${Math.round(current.wind_kph)} km/h`;
    DOM.uvIndex.textContent = current.uv || '0';

    // به‌روزرسانی نقشه
    updateMap(location.lat, location.lon, location.name);

    // پیش‌بینی ساعتی
    if (forecast && forecast.length >= 2) {
        displayHours(DOM.todayContainer, forecast[0].hour);
        displayHours(DOM.tomorrowContainer, forecast[1].hour);
        // تنظیم تم
        const todayAstro = forecast[0].astro;
        if (todayAstro) {
            setThemeBySun();
        }
        // رسم نمودار
        drawChart(forecast[0].hour);
        // افکت آب و هوا
        applyWeatherEffect(current.condition.text);
    }
}

function displayHours(container, hours) {
    container.innerHTML = '';
    hours.forEach((hour, index) => {
        const timeStr = hour.time.split(' ')[1];
        const temp = hour.temp_c;
        const condition = hour.condition.text;
        const icon = hour.condition.icon;

        const card = document.createElement('div');
        card.className = 'hour-card';
        card.style.animationDelay = `${index * 0.03}s`;

        card.innerHTML = `
            <div class="time">${timeStr}</div>
            <img src="${icon}" alt="${condition}">
            <div class="temp">${Math.round(temp)}°C</div>
            <div class="condition">${condition}</div>
        `;
        container.appendChild(card);
    });
}

// ==================== نمودار دما ====================
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
                label: 'دما (°C)',
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

// ==================== نقشه ====================
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

// ==================== تم بر اساس طلوع/غروب ====================
function setThemeBySun() {
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

// ==================== افکت‌های آب و هوایی ====================
function applyWeatherEffect(condition) {
    const container = DOM.effectsContainer;
    container.innerHTML = '';
    if (rainInterval) {
        clearInterval(rainInterval);
        rainInterval = null;
    }

    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain') || conditionLower.includes('باران')) {
        // باران
        for (let i = 0; i < 60; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.height = `${15 + Math.random() * 25}px`;
            drop.style.animationDuration = `${0.6 + Math.random() * 0.8}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(drop);
        }
    } else if (conditionLower.includes('sun') || conditionLower.includes('آفتاب') || conditionLower.includes('clear')) {
        // آفتاب
        const sun = document.createElement('div');
        sun.className = 'sun-glow';
        container.appendChild(sun);
    }
}

// ==================== رویدادهای دکمه‌های زبان ====================
DOM.langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.dataset.lang;
        setLanguage(lang);
        if (currentCoords) {
            fetchWeather(currentCoords.lat, currentCoords.lon, lang);
        }
    });
});

// ==================== راه‌اندازی ====================
document.addEventListener('DOMContentLoaded', function() {
    setLanguage('fa');
    getLocation();
    // تنظیم placeholder جستجو
    DOM.citySearch.placeholder = translations.fa.searchPlaceholder;
});