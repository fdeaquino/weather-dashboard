const search = document.querySelector("#searchCity");
const searchForm = document.querySelector("#city-search-form");
const submitBtn = document.querySelector("#submit-button");
const containerForSaved = document.querySelector("#saved-cities");
const containerForCurrentCityWeather = document.querySelector("#current-weather");
const containerForFiveDayForecast = document.querySelector("#five-day-forecast");
const currentCityName = document.querySelector("#current-city-name");
const temp = document.querySelector("#current-temp");
const wind = document.querySelector("#current-wind");
const humidity = document.querySelector("#current-humidity");
// TA said not to include uv data in project - deleted variable
const image = document.querySelector("#current-icon");
const apiKey = "e350d44f0fd3cd89fc464afb4f48dec4";
let cityArr;
let cityValue;

if (localStorage.getItem("cities")) {
    cityArr = JSON.parse(localStorage.getItem("cities"));
} else {
    cityArr =[]
}

localStorage.setItem("cities", JSON.stringify(cityArr))
const savedCityHistory = JSON.parse(localStorage.getItem("cities"));

// fetches current and future weather information and other data for a city
function fetchCurrent(city) {
    // query parameter to include imperial values
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&units=imperial&appid=" + apiKey)
        // console.log("https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&units=imperial" + "&appid=" + apiKey)


    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        let currentDate = new Date(response.dt * 1000).toLocaleDateString("en-US");
        // displays city name and current date in the current weather container
        currentCityName.textContent = response.name + " " + "(" + (currentDate) + ")";
        // displays current weather icon in current weather container
        let weatherIcon = response.weather[0].icon;
        image.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        // displays current temp wind and humidity in current weather container
        temp.textContent = "Temp: " + response.main.temp + "℉";
        wind.textContent = "Wind: " + response.wind.speed + " mph";
        humidity.textContent = "Humidity: " + response.main.humidity + "%";

        // will fetch data for five day forecast
        return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&units=imperial&appid=" + apiKey)

        .then(function(response) {
            return response.json();
        })
        // for loop iterates five times and displays date, weather icon, temp, wind, and humidity for five day forecast
        .then(function(response) {
            for (i = 1; i < 6; i++) {
                let dayForecast = document.querySelector("#dia-" + [i]);
                dayForecast.textContent = new Date(response.daily[i].dt * 1000).toLocaleDateString("en-US");
                let tempForecast = document.querySelector("#temp-" + [i]);
                tempForecast.textContent = "Temp: " + response.daily[i].temp.day + "℉";
                let forecastPic = document.querySelector("#icon-" + [i]);
                let forecastIcon = response.daily[i].weather[0].icon;
                forecastPic.setAttribute("src", "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png");
                let windForecast = document.querySelector("#wind-" +[i]);
                windForecast.textContent = "Wind: " + response.daily[i].wind_speed + " mph";
                let humidityForecast = document.querySelector("#humid-" + [i]);
                humidityForecast.textContent = "Humidity: " + response.daily[i].humidity + "%";
            }
        })
    });
}

// sets searched cities into localStorage
function setStorage() {
    cityArr.push(search.value);
    localStorage.setItem("cities", JSON.stringify(cityArr))
};

const eventHandler = function(event) {
    event.preventDefault;
    containerForCurrentCityWeather.style.display = "block";
    containerForFiveDayForecast.style.display = "flex";
    cityValue = $(this).val();
    fetchCurrent(cityValue);
};

// A button is created for each city searched
function makeBtns(text) {
    let savedCityBtns = document.createElement("button");
    savedCityBtns.textContent = text;
    savedCityBtns.className = "savedCityBtns";
    savedCityBtns.setAttribute("type", "submit");
    savedCityBtns.setAttribute("value", text);
    savedCityBtns.addEventListener("click", eventHandler);
    containerForSaved.appendChild(savedCityBtns);
};

savedCityHistory.forEach(function(item) {
    makeBtns(item);
});

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    cityValue = search.value;
    fetchCurrent(cityValue);
    containerForCurrentCityWeather.style.display = "block";
    containerForFiveDayForecast.style.display = "flex";
    setStorage();
    JSON.parse(localStorage.getItem("cities"));
    makeBtns(search.value);
    search.value = "";
});

$(".savedCityBtns").click(eventHandler);

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
        // DONE

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
        // DONE

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
        // DONE

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
        // DONE