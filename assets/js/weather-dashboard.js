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
const uvIndex = document.querySelector("#current-uv-index");
const image = document.querySelector("#current-icon");
const apiKey = "e350d44f0fd3cd89fc464afb4f48dec4";
let cityArr = [];

function fetchCurrent(city) {
    const cityValue = search.value;

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&units=imperial&appid=" + apiKey)
        // console.log("https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&units=imperial" + "&appid=" + apiKey)


    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        let currentDate = new Date(response.dt * 1000).toLocaleDateString("en-US");

        currentCityName.textContent = response.name + " " + "(" + (currentDate) + ")";

        let weatherIcon = response.weather[0].icon;
        image.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");

        temp.textContent = "Temp: " + response.main.temp + "℉";
        wind.textContent = "Wind: " + response.wind.speed + " mph";
        humidity.textContent = "Humidity: " + response.main.humidity + "%";

        return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&units=imperial&appid=" + apiKey)

        .then(function(response) {
            return response.json();
        })

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

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    fetchCurrent();
    containerForCurrentCityWeather.style.display = "block";
    containerForFiveDayForecast.style.display = "flex";
});