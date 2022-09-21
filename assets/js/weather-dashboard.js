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
const apiKey = "e350d44f0fd3cd89fc464afb4f48dec4";
let cityArr = [];

function fetchCurrent(city) {
    const cityValue = search.value;

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&units=imperial" + "&appid=" + apiKey)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        currentCityName.textContent = response.name + " " + moment().format("(dddd, MMMM Do YYYY)");
        temp.textContent = "Temp: " + response.main.temp + "℉";
        wind.textContent = "Wind: " + response.wind.speed + " mph";
        humidity.textContent = "Humidity: " + response.main.humidity + "%";
    });
}

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    fetchCurrent();
})