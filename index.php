<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WeatherWise - سامانه هوشمند آب و هوا</title>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <!-- Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <link rel="stylesheet" href="style.css?v=2">
</head>
<body>
    <div class="container">
        <!-- هدر -->
        <header>
            <div class="header-left">
                <h1><i class="fas fa-cloud-sun"></i> WeatherWise</h1>
                <span class="subtitle">پیش بینی هوشمند</span>
            </div>
            
            <!-- ساعت با موقعیت جغرافیایی -->
            <div class="header-clock">
                <div class="clock-display">
                    <i class="fas fa-clock"></i>
                    <span id="localTime">--:--</span>
                </div>
                <div class="clock-offset" id="timeOffset">هماهنگ با ساعت جهانی</div>
            </div>

            <div class="header-right">
                <div class="search-box">
                    <input type="text" id="citySearch" list="citySuggestions" placeholder="جستجوی شهر..." autocomplete="off" />
                    <datalist id="citySuggestions"></datalist>
                    <button id="searchBtn"><i class="fas fa-search"></i></button>
                </div>
                <div class="lang-selector">
                    <button class="lang-btn active" data-lang="fa">فا</button>
                    <button class="lang-btn" data-lang="en">En</button>
                    <button class="lang-btn" data-lang="es">Es</button>
                </div>
            </div>
        </header>

        <!-- نقشه -->
        <section id="map-section">
            <div id="map"></div>
        </section>

        <!-- وضعیت فعلی -->
        <section id="current-weather">
            <div class="current-info">
                <div class="location-info">
                    <h2 id="cityName">تهران</h2>
                    <p id="countryName">ایران</p>
                </div>
                <div class="weather-main">
                    <img id="currentIcon" src="" alt="وضعیت آب و هوا">
                    <span id="currentTemp">24°C</span>
                    <span id="currentCondition">آفتابی</span>
                </div>
                <div class="weather-details">
                    <div><i class="fas fa-tint"></i> <span id="humidity">0%</span></div>
                    <div><i class="fas fa-wind"></i> <span id="windSpeed">0 km/h</span></div>
                    <div><i class="fas fa-sun"></i> <span id="uvIndex">0</span></div>
                </div>
            </div>
        </section>

        <!-- نمودار دما -->
        <section id="chart-section">
            <h2><i class="fas fa-chart-line"></i> <span data-i18n="temperatureChart">نمودار دما</span></h2>
            <div class="chart-container">
                <canvas id="tempChart"></canvas>
            </div>
        </section>

        <!-- پیش بینی ساعتی -->
        <section id="today">
            <h2><i class="fas fa-calendar-day"></i> <span data-i18n="today">امروز</span></h2>
            <div id="today-hours" class="hours-container"></div>
        </section>

        <section id="tomorrow">
            <h2><i class="fas fa-calendar-alt"></i> <span data-i18n="tomorrow">فردا</span></h2>
            <div id="tomorrow-hours" class="hours-container"></div>
        </section>

        <!-- پیش بینی هفتگی -->
        <section id="weekly-forecast">
            <h2><i class="fas fa-calender-week"></i><span data-i8n="weekly">پیش بینی هفتگی</span></h2>
            <div id="weekly-container" class="weekly container">
                <!-- کارت های هفتگی با جاوااسکریپت -->
            </div>
        </section>

        <footer>
            <p><span data-i18n="footer">منبع: WeatherAPI.com</span> | WeatherWise v2.0</p>
        </footer>
    </div>

    <!-- افکت های آب و هوا -->
    <div id="weather-effects"></div>

    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="script.js?v=2"></script>
</body>
</html>