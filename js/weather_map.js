//making dates
var today = new Date()
console.log(today)

var tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
var tomorrowConverted = tomorrow.toISOString().slice(0, 10);
console.log(tomorrowConverted);

//converting dates
function convertDate(dateTime) {
    let unix_timestamp = dateTime
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
    var hours = date.getHours();
// Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    // console.log("formatted date?" + date.toDateString());
    // console.log("formatted time" + formattedTime);

    return date.toISOString().slice(0, 10);
}


//get weather data
function forecastWeather(longitude, latitude) {
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: OPEN_WEATHER_KEY,
        lat:   latitude,
        lon:   longitude,
    }).done(function(data) {
        console.log('5 day forecast', data);

        //tomorrow
        tomorrowsForecast = createDayData(data)
        setDayInfo(tomorrowsForecast, tomorrowConverted, data);
        manipulateData(tomorrowsForecast);
        console.log(tomorrowsForecast);
    });
}


var tomorrowsForecast;

function createDayData(data) {
    return {
        city: data.city.name,
        country: data.city.country,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset,
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
    for(var i = 0;  i < data.list.length; i++) {
        if(convertDate(data.list[i].dt) == date) {
            day.temps.push(data.list[i].main.temp);
            day.feelsLike.push(data.list[i].main.feels_like);
            day.description.push(data.list[i].weather[0].description);
            day.speeds.push(data.list[i].wind.speed);
            day.pressures.push(data.list[i].main.pressure);
            day.humiditys.push(data.list[i].main.humidity);
            day.icons.push(data.list[i].weather[0].icon);
        }
    }
    console.log(day.temps)
    //for all the list items,
    //if the date matches
    //push the item to day.item arry
    //day.temps.push(tempdata)
}

function manipulateData(day) {
    day.averageTemp = getAverage(day.temps);
    day.minTemp = Math.min.apply(null,day.temps);
    day.maxTemp = Math.max.apply(null,day.temps);
    day.averageFeelsLike = getAverage(day.feelsLike);
    day.averageDescription = mostFrequent(day.description);
    day.averageSpeed = getAverage(day.speeds);
    day.averagePressure = getAverage(day.pressures);
    day.averageHumidity = getAverage(day.humiditys)
    day.averageIcon = day.icons[day.description.indexOf(day.averageDescription)];
}

function getAverage(arr) {
    var sum = 0;
    arr.forEach(function(element) {
        sum += element;
    })
    var average = sum/arr.length;
    return average;
}




var testArr = [4,4,2,6,4,2,8,3,2]
var testarr2 = ["not","maybe","maybe","not","not","maybe","maybe","maybe", "not","not"]
var weathertest = ['few clouds', 'few clouds', 'few clouds', 'clear sky', 'few clouds', 'scattered clouds', 'scattered clouds', 'broken clouds']

function mostFrequent(arr) {
    var words = [];
    var count = [];
    for(var i = 0; i < arr.length; i++) {
        if(!words.includes(arr[i])) {
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
    var highest = Math.max.apply(null,count);
    // console.log(highest)
    var indexOfMostOccured = count.indexOf(Math.max.apply(null,count));
    // console.log(indexOfMostOccured)
    var mostOccured = words[indexOfMostOccured];
    // console.log(mostOccured)
    return mostOccured;
}

// console.log(mostFrequent(weathertest));


forecastWeather(-116.444975,43.484744);




// <!--<script>-->
// <!--    //starting points-->
// <!--    var startingZoom = 12;-->
// <!--    var startLat = 43.484744;-->
// <!--    var startLon = -116.444975;-->
//
// <!--    //creating map-->
// <!--    mapboxgl.accessToken = MAPBOX_KEY;-->
// <!--    const map = new mapboxgl.Map({-->
// <!--        container: 'map',-->
// <!--        style: 'mapbox://styles/mapbox/dark-v11',-->
// <!--        center: [startLon, startLat], // [lng, lat]-->
// <!--        zoom: startingZoom-->
// <!--    });-->
//
// <!--    map.doubleClickZoom.disable();-->
//
// <!--    //center map on idaho-->
// <!--    geocode("Kuna, Idaho", MAPBOX_KEY).then(function (result) {-->
// <!--        map.setCenter(result);-->
// <!--    });-->
//
// <!--    var marker;-->
// <!--    placeMarkerGeocode('Kuna, Idaho', MAPBOX_KEY, map);-->
//
// <!--    //place marker-->
// <!--    function placeMarkerGeocode(info, token, map) {-->
// <!--        geocode(info, token).then(function (coordinates) {-->
// <!--            marker = new mapboxgl.Marker()-->
// <!--                .setLngLat(coordinates)-->
// <!--                .addTo(map)-->
// <!--            // markers.push(marker);-->
// <!--            map.setCenter(coordinates);-->
// <!--            // console.log('coords' + coordinates)-->
// <!--            // console.log(typeof coordinates)-->
// <!--            // console.log(coordinates)-->
// <!--        });-->
// <!--    }-->
//
//
// <!--    function placeMarkerCoordinates(longlat, token, map) {-->
// <!--        var coordinates = longlat;-->
// <!--            marker = new mapboxgl.Marker()-->
// <!--                .setLngLat(coordinates)-->
// <!--                .addTo(map)-->
// <!--            map.setCenter(coordinates);-->
// <!--            //cords are lon first-->
// <!--            // console.log("coords" + coordinates)-->
// <!--    }-->
//
//
//
//
//
//
// <!--    //change marker on double click-->
// <!--    map.on('dblclick', (e) => {-->
// <!--        marker.remove();-->
// <!--        var lonLat = [e.lngLat.lng, e.lngLat.lat];-->
// <!--        placeMarkerCoordinates(lonLat, MAPBOX_KEY, map);-->
// <!--    });-->
//
//
// <!--    //change marker location on search-->
// <!--    $('#search').keyup(function(e) {-->
// <!--        if (e.key === "Enter") {-->
// <!--            var address = $(this).val();-->
// <!--            // console.log(address);-->
// <!--            geocode(address, MAPBOX_KEY).then(function (result) {-->
// <!--                // console.log(result)-->
// <!--            });-->
// <!--            marker.remove();-->
// <!--            placeMarkerGeocode(address, MAPBOX_KEY, map);-->
// <!--        }-->
// <!--    })-->
//
//
// <!--// &lt;!&ndash;    current weather&ndash;&gt;-->
// <!--// $.get("http://api.openweathermap.org/data/2.5/weather", {-->
// <!--//     APPID: OPEN_WEATHER_KEY,-->
// <!--//     // q:     "Kuna, US"-->
// <!--//     lat:   43.484744,-->
// <!--//     lon:   -116.444975,-->
// <!--//-->
// <!--// }).done(function(data) {-->
// <!--//     console.log(data);-->
// <!--//     console.log("temp" + data.main.temp);-->
// <!--//     console.log("humidty" + data.main.humidity);-->
// <!--//     console.log("description" + data.weather[0].description);-->
// <!--//     console.log("speed" + data.wind.speed);-->
// <!--//     console.log("pressure" + data.main.pressure);-->
// <!--//     console.log("-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;")-->
// <!--// });-->
//
//
//
//
//
//
//
//
//
//
//
//
//
// <!--</script>-->