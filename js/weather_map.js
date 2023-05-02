//making dates
var today = new Date()
var todayConverted = today.toISOString().slice(0, 10);

var tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
var tomorrowConverted = tomorrow.toISOString().slice(0, 10);

var thirdDay = new Date(today)
thirdDay.setDate(thirdDay.getDate() + 2)
var thirdDayConverted = thirdDay.toISOString().slice(0, 10);

var fourthDay = new Date(today)
fourthDay.setDate(fourthDay.getDate() + 3)
var fourthDayConverted = fourthDay.toISOString().slice(0, 10);

var fifthDay = new Date(today)
fifthDay.setDate(fifthDay.getDate() + 4)
var fifthDayConverted = fifthDay.toISOString().slice(0, 10);

//variables to hold date objects
var todayForecast;
var tomorrowsForecast;
var thirdDayForecast;
var fourthDayForecast;
var fifthDayForecast;

//calling forecast weather on my hometown first
forecastWeather(-116.444975, 43.484744);

function convertDate(dateTime) {
    let unix_timestamp = dateTime;
    var date = new Date(unix_timestamp * 1000);
    return date.toISOString().slice(0, 10);
}

function convertTime(dateTime) {
    let unix_timestamp = dateTime;
    var date = new Date(unix_timestamp * 1000);
    return date.toString().slice(16, 24);
}

function clearCards() {
    $('#card-one').html('');
    $('#card-two').html('');
    $('#card-three').html('');
    $('#card-four').html('');
    $('#card-five').html('');
}

function forecastWeather(longitude, latitude) {
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: OPEN_WEATHER_KEY,
        lat: latitude,
        lon: longitude,
        units: 'imperial'
    }).done(function (data) {
        console.log('5 day forecast', data);
        $('#location').html(`Seeing weather for: ${data.city.name}`);

        clearCards();
        // //today
        todayForecast = createDayData(data)
        setDayInfo(todayForecast, todayConverted, data);
        manipulateData(todayForecast);
        addRegCard(todayForecast, todayConverted, "card-one");

        //tomorrow
        tomorrowsForecast = createDayData(data)
        setDayInfo(tomorrowsForecast, tomorrowConverted, data);
        manipulateData(tomorrowsForecast);
        addRegCard(tomorrowsForecast, tomorrowConverted, "card-two");

        //third day
        thirdDayForecast = createDayData(data);
        setDayInfo(thirdDayForecast, thirdDayConverted, data);
        manipulateData(thirdDayForecast);
        addRegCard(thirdDayForecast, thirdDayConverted, "card-three");

        //fourth day
        fourthDayForecast = createDayData(data);
        setDayInfo(fourthDayForecast, fourthDayConverted, data);
        manipulateData(fourthDayForecast);
        addRegCard(fourthDayForecast, fourthDayConverted, "card-four");

        //fifth day
        fifthDayForecast = createDayData(data);
        setDayInfo(fifthDayForecast, fifthDayConverted, data);
        manipulateData(fifthDayForecast);
        addRegCard(fifthDayForecast, fifthDayConverted, "card-five");

        buttonRegListeners();
    });
}

function createDayData(data) {
    return {
        city: data.city.name,
        country: data.city.country,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset,
        times: [],
        temps: [],
        feelsLike: [],
        description: [],
        icons: [],
        speeds: [],
        pressures: [],
        humiditys: []
    }
}

function setDayInfo(day, date, data) {
    for (var i = 0; i < data.list.length; i++) {
        if (convertDate(data.list[i].dt) == date) {
            var dateTxt = data.list[i].dt_txt
            day.times.push(dateTxt.slice(11, 19));
            day.temps.push(data.list[i].main.temp);
            day.feelsLike.push(data.list[i].main.feels_like);
            day.description.push(data.list[i].weather[0].description);
            day.speeds.push(data.list[i].wind.speed);
            day.pressures.push(data.list[i].main.pressure);
            day.humiditys.push(data.list[i].main.humidity);
            day.icons.push(data.list[i].weather[0].icon);
        }
    }
}

function manipulateData(day) {
    day.averageTemp = getAverage(day.temps);
    day.minTemp = Math.min.apply(null, day.temps);
    day.maxTemp = Math.max.apply(null, day.temps);
    day.averageFeelsLike = getAverage(day.feelsLike);
    day.averageDescription = mostFrequent(day.description);
    day.averageSpeed = getAverage(day.speeds);
    day.averagePressure = getAverage(day.pressures);
    day.averageHumidity = getAverage(day.humiditys)
    day.averageIcon = day.icons[day.description.indexOf(day.averageDescription)];
}

function getAverage(arr) {
    var sum = 0;
    arr.forEach(function (element) {
        sum += element;
    })
    var average = sum / arr.length;
    return average;
}

function mostFrequent(arr) {
    var words = [];
    var count = [];
    for (var i = 0; i < arr.length; i++) {
        if (!words.includes(arr[i])) {
            words.push(arr[i])
            count.push(1)
            // console.log(count)
        } else {
            var countIndex = words.indexOf(arr[i]);
            // console.log(countIndex)
            count[countIndex] += 1;
        }
    }
    // console.log(words)
    // console.log(count)
    var highest = Math.max.apply(null, count);
    // console.log(highest)
    var indexOfMostOccured = count.indexOf(Math.max.apply(null, count));
    // console.log(indexOfMostOccured)
    var mostOccured = words[indexOfMostOccured];
    // console.log(mostOccured)
    return mostOccured;
}

function hourlies(day) {
    var html = ``;
    for (var i = 0; i < day.times.length; i++) {
        html += `<div class="col three-hour">
                            <div class="bg-secondary p-3">
                                <h6>${day.times[i]}</h6>
                                 <img class="small-icon" src="http://openweathermap.org/img/w/${day.icons[i]}.png" alt="weather-icon">
                                <p>${day.description[i]}</p>
                                <p>${day.temps[i]}</p>
                            </div>
                        </div>`
    }

    return html;
}

function addRegCard(day, date, place) {
    var regularCardTemplate = `<div class="card">
            <div class="card-header text-center">
                ${date}
            </div>
            <div class="card-body">
                <div class="center">
                    <p class="m-0">${day.minTemp}&#8457; / ${day.maxTemp}&#8457;</p>
                    <img class="small-icon" src="http://openweathermap.org/img/w/${day.averageIcon}.png" alt="weather-icon">
                   <h4 class="mb-3">Average Forecast</h4>
                </div>
                <div class="my-1">
                <p><strong>Description: </strong>${day.averageDescription}</p>
                <p><strong>Humidity: </strong>${day.averageHumidity.toFixed(2)}%</p>
                <p><strong>Wind: </strong>${day.averageSpeed.toFixed(2)} mph</p>
                <p><strong>Pressure: </strong>${day.averagePressure.toFixed(0)} hPa</p>
                </div>
            </div>
            <div class="card-footer p-0 d-flex justify-content-end">
                <button class="btn view-more ${place}">View More</button>
            </div>
        </div>`

    $(`#${place}`).html(regularCardTemplate);
}

function addLargeCard(place, day, date) {
    var largeCardTemplate = `<div class="card">
            <div class="card-header text-center">
                ${date}
            </div>
            <div class="card-body text-center">
                <div>
                    <p class="m-0"${day.minTemp}&#8457; / ${day.maxTemp}&#8457;</p>
                    <img class="large-icon" src="http://openweathermap.org/img/w/${day.averageIcon}.png" alt="weather-icon">
               <h4>Average Forecast</h4>
                </div>
                <div class="d-flex flex-wrap justify-content-evenly mt-3">
                    <p><strong>Temperature: </strong>${day.averageTemp.toFixed(2)}&#8457;</p>
                    <p><strong>Feels Like: </strong>${day.averageFeelsLike.toFixed(2)}&#8457;</p>
                    <p><strong>Description: </strong>${day.averageDescription}</p>
                    <p><strong>Humidity: </strong>${day.averageHumidity.toFixed(2)}%</p>
                    <p><strong>Wind: </strong>${day.averageSpeed.toFixed(2)}mph</p>
                    <p><strong>Pressure: </strong>${day.averagePressure} hPa</p>
                </div>
                <div class="d-flex flex-wrap justify-content-evenly mt-3">
                    <p><span>Sunrise: </span>${convertTime(day.sunrise)}</p>
                    <p><span>Sunset: </span>${convertTime(day.sunset)}</p>
                </div>
                <h5>3 Hour Forecast</h5>
                <div class="hourly">
                    <div class="row">
                        ${hourlies(day)}
                    </div>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <button class="btn view-less ${place}">View Less</button>
            </div>
        </div>`

    $(`#${place}`).html(largeCardTemplate);

}

function buttonRegListeners() {
    $('button.card-one').click(function () {
        regButtonActions('card-one', todayForecast, todayConverted);
    });
    $('button.card-two').click(function () {
        regButtonActions('card-two', tomorrowsForecast, tomorrowConverted);
    });
    $('button.card-three').click(function () {
        regButtonActions('card-three', thirdDayForecast, thirdDayConverted);
    });
    $('button.card-four').click(function () {
        regButtonActions('card-four', fourthDayForecast, fourthDayConverted);
    });
    $('button.card-five').click(function () {
        regButtonActions('card-five', fifthDayForecast, fifthDayConverted);
    })
}

function regButtonActions(cardNo, forecastDay, date) {
    var cards = ['card-one', 'card-two', 'card-three', 'card-four', 'card-five'];
    var index = cards.indexOf(cardNo);
    if (index !== -1) {
        cards.splice(index, 1);
    }
    cards.forEach(function (card) {
        $(`#${card}`).addClass('d-none');
    });
    $(`#${cardNo}`).html("<div></div>");
    addLargeCard(cardNo, forecastDay, date);
    buttonLargeListeners();
}

function buttonLargeListeners() {
    $('button.card-one').click(function () {
        largeButtonActions('card-one', todayForecast, todayConverted);
    });
    $('button.card-two').click(function () {
        largeButtonActions('card-two', tomorrowsForecast, tomorrowConverted);
    });
    $('button.card-three').click(function () {
        largeButtonActions('card-three', thirdDayForecast, thirdDayConverted);
    });
    $('button.card-four').click(function () {
        largeButtonActions('card-four', fourthDayForecast, fourthDayConverted);
    });
    $('button.card-five').click(function () {
        largeButtonActions('card-five', fifthDayForecast, fifthDayConverted);
    })
}

function largeButtonActions(cardNo, forecastDay, date) {
    var cards = ['card-one', 'card-two', 'card-three', 'card-four', 'card-five'];
    var index = cards.indexOf(cardNo);
    if (index !== -1) {
        cards.splice(index, 1);
    }
    cards.forEach(function (card) {
        $(`#${card}`).removeClass('d-none');
    });
    $(`#${cardNo}`).html("<div></div>");
    addRegCard(forecastDay, date, cardNo);
    buttonRegListeners();
}


//starting points
var startingZoom = 12;
var startLat = 43.484744;
var startLon = -116.444975;

//creating map
mapboxgl.accessToken = MAPBOX_KEY;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [startLon, startLat], // [lng, lat]
    zoom: startingZoom
});

map.doubleClickZoom.disable();

//center map on idaho
geocode("Kuna, Idaho", MAPBOX_KEY).then(function (result) {
    map.setCenter(result);
});

var marker;
placeMarkerGeocode('Kuna, Idaho', MAPBOX_KEY, map);

//place marker
function placeMarkerGeocode(info, token, map) {
    geocode(info, token).then(function (coordinates) {
        marker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map)
        // markers.push(marker);
        map.setCenter(coordinates);
        // console.log('coords' + coordinates)
        // console.log(typeof coordinates)
        // console.log(coordinates)
    });
}


function placeMarkerCoordinates(longlat, token, map) {
    var coordinates = longlat;
    marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map)
    map.setCenter(coordinates);
    //cords are lon first
    // console.log("coords" + coordinates)
}


//change marker on double click
map.on('dblclick', (e) => {
    marker.remove();
    var lonLat = [e.lngLat.lng, e.lngLat.lat];
    placeMarkerCoordinates(lonLat, MAPBOX_KEY, map);
    forecastWeather(e.lngLat.lng, e.lngLat.lat);
});


//change marker location on search
$('#search').keyup(function (e) {
    if (e.key === "Enter") {
        var address = $(this).val();
        geocode(address, MAPBOX_KEY).then(function (result) {
            forecastWeather(result[0], result[1]);
        });
        marker.remove();
        placeMarkerGeocode(address, MAPBOX_KEY, map);
    }
})





