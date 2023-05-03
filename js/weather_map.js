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
currentWeather(-116.444975, 43.484744);
forecastWeather(-116.444975, 43.484744);

function currentWeather(longitude,latitude) {
    $.get("http://api.openweathermap.org/data/2.5/weather", {
        APPID: OPEN_WEATHER_KEY,
        lat: latitude,
        lon: longitude,
        units: 'imperial'
    }).done(function (data) {
        console.log("current")
        console.log(data);
        $('#location').html(`${data.name}`);
        //
        // clearCards();
        // $('#card-two').removeClass('d-none')
        // //today
        todayForecast = createCurrentDayData(data);
        console.log(todayForecast)
        addRegCard(todayForecast, todayConverted, today,"card-one");
    });

}


function displayAll(){
    var cards = ['card-one', 'card-two', 'card-three', 'card-four','card-five',];
    cards.forEach(function(card) {
        $(`#${card}`).removeClass('d-none')
    })

}

function convertDate(dateTime) {
    let unix_timestamp = dateTime;
    var date = new Date(unix_timestamp * 1000);
    return date.toISOString().slice(0, 10);
}

function displayDate() {
    let unix_timestamp = dateTime;
    var date = new Date(unix_timestamp * 1000);
    console.log(date)
}

function convertTime(dateTime) {
    let unix_timestamp = dateTime;
    var date = new Date(unix_timestamp * 1000);
    return date.toString().slice(16, 24);
}



function forecastWeather(longitude, latitude) {
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: OPEN_WEATHER_KEY,
        lat: latitude,
        lon: longitude,
        units: 'imperial'
    }).done(function (data) {
        console.log('5 day forecast', data);


        //tomorrow
        tomorrowsForecast = createDayData(data)
        setDayInfo(tomorrowsForecast, tomorrowConverted, data);
        manipulateData(tomorrowsForecast);
        addRegCard(tomorrowsForecast, tomorrowConverted, tomorrow,"card-two");

        //third day
        thirdDayForecast = createDayData(data);
        setDayInfo(thirdDayForecast, thirdDayConverted, data);
        manipulateData(thirdDayForecast);
        addRegCard(thirdDayForecast, thirdDayConverted, thirdDay,"card-three");

        //fourth day
        fourthDayForecast = createDayData(data);
        setDayInfo(fourthDayForecast, fourthDayConverted, data);
        manipulateData(fourthDayForecast);
        addRegCard(fourthDayForecast, fourthDayConverted, fourthDay,"card-four");

        //fifth day
        fifthDayForecast = createDayData(data);
        setDayInfo(fifthDayForecast, fifthDayConverted, data);
        manipulateData(fifthDayForecast);
        addRegCard(fifthDayForecast, fifthDayConverted, fifthDay,"card-five");

        buttonRegListeners();
    });
}

function displayTime(time){
    var headerTime = time.slice(0,2);
    var endTime = time.slice(3,5);
    var suffix = headerTime >= 12 ? "P.M.":"A.M.";

    if(headerTime >=13) {
        var newHeaderTime = headerTime%12;
        return (`${newHeaderTime}:${endTime} ${suffix}`)
    } else if(headerTime == '00') {
        return (`12:${endTime} ${suffix}`)
    }
    else {
        return (`${headerTime}:${endTime} ${suffix}`)
    }
}

// displayTime("13:23:12");

function createCurrentDayData(data) {
        return {
            minTemp: data.main.temp_min,
            maxTemp: data.main.temp_max,
            averageDescription: data.weather[0].description,
            averageIcon: data.weather[0].icon,
            averageSpeed: data.wind.speed,
            averagePressure: data.main.pressure,
            averageHumidity: data.main.humidity
        }

}
function createDayData(data) {
    return {
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
        html += `<div class="col three-hour red-weather">
                            <div class="p-0">
                                <h6 class="m-0">${displayTime(day.times[i])}</h6>
                                 <img class="small-icon" src="http://openweathermap.org/img/w/${day.icons[i]}.png" alt="weather-icon">
                                <p>${capitalize(day.description[i])}</p>
                                <p>${day.temps[i]}&#8457;</p>
                            </div>
                        </div>`
    }

    return html;
}

function addRegCard(day, date, longDate, place) {
    var button = `<button class="btn view-more ${place}">View More</button>`;

    if(place == 'card-one' ){
        var button = `<button class="btn view-more ${place}" disabled>View More</button>`
    }

    var regularCardTemplate = `<div class="card">
            <div class="card-header text-center">
                <h4>${longDate.toString().slice(0,10)}</h4>
            </div>
            <div class="card-body">
                <div class="center">
<!--                     <p class="m-0">${day.minTemp}&#8457; / ${day.maxTemp}&#8457;</p>-->
                    <h4 class="m-0 p-0">${capitalize(day.averageDescription)}</h4>
                    <img class="small-icon" src="http://openweathermap.org/img/w/${day.averageIcon}.png" alt="weather-icon">
<!--                    <h4 class="mb-4">${day.averageDescription}</h4>-->
<p class="mb-3 mt-0">${day.minTemp}&#8457; / ${day.maxTemp}&#8457;</p>
                </div>
                <div class="my-1">
                <p><strong>Humidity: </strong>${day.averageHumidity.toFixed(2)}%</p>
                <p><strong>Wind: </strong>${day.averageSpeed.toFixed(2)} mph</p>
                <p><strong>Pressure: </strong>${day.averagePressure.toFixed(0)} hPa</p>
                </div>
            </div>
           <div class="card-footer p-0 d-flex justify-content-end">
                ${button}
            </div>
        </div>`

    $(`#${place}`).html(regularCardTemplate);
}

function addLargeCard(place, day, longDate, date) {
    var largeCardTemplate = `<div class="card">
            <div class="card-header text-center">
               <h3> ${longDate.toString().slice(0,10)}</h3>
            </div>
            <div class="card-body text-center">
                <div>
                    <p class="m-0"${day.minTemp}&#8457; / ${day.maxTemp}&#8457;</p>
<!--                   <img class="large-icon" src="http://openweathermap.org/img/w/${day.averageIcon}.png" alt="weather-icon">-->
               <h3 class="m-0">Average For the Day </h3>
               <img class="medium-icon" src="http://openweathermap.org/img/w/${day.averageIcon}.png" alt="weather-icon">
                </div>
                <div class="d-flex flex-wrap justify-content-evenly mt-3 info">
                    <p><strong>Temperature: </strong>${day.averageTemp.toFixed(2)}&#8457;</p>
                    <p><strong>Feels Like: </strong>${day.averageFeelsLike.toFixed(2)}&#8457;</p>
                    <p><strong>Description: </strong>${capitalize(day.averageDescription)}</p>
                    <p><strong>Humidity: </strong>${day.averageHumidity.toFixed(2)}%</p>
                    <p><strong>Wind: </strong>${day.averageSpeed.toFixed(2)}mph</p>
                    <p><strong>Pressure: </strong>${day.averagePressure} hPa</p>
                </div>
                <div class="d-flex flex-wrap justify-content-evenly mt-3 sun py-2">
                    <p><strong>Sunrise: </strong>${displayTime(convertTime(day.sunrise))}</p>
                    <p><strong>Sunset: </strong>${displayTime(convertTime(day.sunset))}</p>
                </div>
                <h4 class="my-1 py-3">3 Hour Forecast</h4>
                <div class="hourly">
                    <div class="row d-flex justify-content-center flex-nowrap overflow-auto">
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
        regButtonActions('card-one', todayForecast, today,todayConverted);
    });
    $('button.card-two').click(function () {
        regButtonActions('card-two', tomorrowsForecast, tomorrow, tomorrowConverted);
    });
    $('button.card-three').click(function () {
        regButtonActions('card-three', thirdDayForecast, thirdDay, thirdDayConverted);
    });
    $('button.card-four').click(function () {
        regButtonActions('card-four', fourthDayForecast, fourthDay, fourthDayConverted);
    });
    $('button.card-five').click(function () {
        regButtonActions('card-five', fifthDayForecast, fifthDay,fifthDayConverted);
    })
}

function regButtonActions(cardNo, forecastDay, longDate,date) {
    var cards = ['card-one', 'card-two', 'card-three', 'card-four', 'card-five'];
    var index = cards.indexOf(cardNo);
    if (index !== -1) {
        cards.splice(index, 1);
    }
    cards.forEach(function (card) {
        $(`#${card}`).addClass('d-none');
    });
    $(`#${cardNo}`).html("<div></div>");
    addLargeCard(cardNo, forecastDay, longDate);
    buttonLargeListeners();
}

function buttonLargeListeners() {
    $('button.card-two').click(function () {
        largeButtonActions('card-two', tomorrowsForecast, tomorrow, tomorrowConverted);
    });
    $('button.card-three').click(function () {
        largeButtonActions('card-three', thirdDayForecast, thirdDay, thirdDayConverted);
    });
    $('button.card-four').click(function () {
        largeButtonActions('card-four', fourthDayForecast, fourthDay, fourthDayConverted);
    });
    $('button.card-five').click(function () {
        largeButtonActions('card-five', fifthDayForecast, fifthDay, fifthDayConverted);
    })
}

function largeButtonActions(cardNo, forecastDay, longDate, date) {
    var cards = ['card-one', 'card-two', 'card-three', 'card-four', 'card-five'];
    var index = cards.indexOf(cardNo);
    if (index !== -1) {
        cards.splice(index, 1);
    }
    cards.forEach(function (card) {
        $(`#${card}`).removeClass('d-none');
    });
    $(`#${cardNo}`).html("<div></div>");
    addRegCard(forecastDay, date, longDate, cardNo);
    buttonRegListeners();
}

function capitalize(words) {
    var separatedWords = words.split(" ");
    var capitalized = [];
    // console.log(word);
    separatedWords.forEach(function(word) {
        var brokenWord = word.split("");
        brokenWord[0] = brokenWord[0].toUpperCase();
        capitalized.push(brokenWord.join(""));
    })

    return capitalized.join(" ");
    console.log(capitalized)
    // return words;
}


$('#slider').click(function() {
    if($('body').hasClass('body-bg-red')) {
        $('body').removeClass('body-bg-red');
        $('body').addClass('body-bg-purple');
        // map.setStyle("mapbox://styles/madaleinedeffinbaugh/clh6he5oq00a401pwdwleaazj");
        // map.setStyle("mapbox://styles/madaleinedeffinbaugh/clh81u5ka00b501podapd4brb");
        map.setStyle("mapbox://styles/madaleinedeffinbaugh/clh83tlok00ba01oh7vos9y2u/draft")
        $('#search').removeClass('search-red');
        $('#search').addClass('search-purple');
        $('#header').removeClass('header-red');
        $('#header').addClass('header-purple');
        $('.three-hour').removeClass('red-weather');
        $('.three-hour').addClass('purple-weather')
    } else {
        $('body').removeClass('body-bg-purple');
        $('body').addClass('body-bg-red');
        $('#search').removeClass('search-purple');
        $('#search').addClass('search-red');
        // map.setStyle("mapbox://styles/madaleinedeffinbaugh/clh817m1400b501pph9gu8gdi/draft")
        map.setStyle("mapbox://styles/madaleinedeffinbaugh/clh830ofy00az01r5d24whnuy")
        $('#header').removeClass('header-purple');
        $('#header').addClass('header-red');
        $('.three-hour').removeClass('purple-weather');
        $('.three-hour').addClass('purple-weather')
    }
})


//starting points
var startingZoom = 12;
var startLat = 43.484744;
var startLon = -116.444975;

// var mapstyle = "mapbox://styles/madaleinedeffinbaugh/clh7vyivy00ax01pwg6559g0x"


//creating map
mapboxgl.accessToken = MAPBOX_KEY;
const map = new mapboxgl.Map({
    container: 'map',
    //purple
    // style: 'mapbox://styles/madaleinedeffinbaugh/clh6he5oq00a401pwdwleaazj',
    //red mapbox://styles/madaleinedeffinbaugh/clh7vyivy00ax01pwg6559g0x
    style: 'mapbox://styles/madaleinedeffinbaugh/clh830ofy00az01r5d24whnuy/draft',
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
    currentWeather(e.lngLat.lng, e.lngLat.lat)
    forecastWeather(e.lngLat.lng, e.lngLat.lat);

});


//change marker location on search
$('#search').keyup(function (e) {
    if (e.key === "Enter") {
        var address = $(this).val();
        geocode(address, MAPBOX_KEY).then(function (result) {
            currentWeather(result[0], result[1]);
            forecastWeather(result[0], result[1]);
        });
        marker.remove();
        placeMarkerGeocode(address, MAPBOX_KEY, map);
    }
})





