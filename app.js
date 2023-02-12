function formatDate(timestamp, timezone) {
  let date = new Date(timestamp + (timezone * 1000));
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getUTCDay()];
  let hours = date.getUTCHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let day = days[date.getDay()];
  return `${day}`;
}
function displayForecast(response) {
  const days = [4, 12, 20, 28, 36];
  let forecast = response.data.list.filter(function (a, index) {
    if (days.includes(index)) return true;
    else return false;
  });

  console.log('HERE: ', forecast);
  let forecastElement = document.querySelector('#forecast');

  forecastElement.innerHTML = '';

  forecast.forEach(function (forecastDay) {
    forecastElement.innerHTML += `<div class='col-2'>
        <div class="weather-forecast-date">${formatDay(forecastDay.dt * 1000)}</div>
        <img src="images/${forecastDay.weather[0].icon}.png" alt="" width="80" />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            (forecastDay.main.temp_max - 273) * 1.8 + 32
          )}° | </span>
          <span class="weather-forecast-temperature-min">${Math.round(
            (forecastDay.main.temp_min - 273)
          )}°</span>
        </div>
      </div>`;
  });
}

function getForecast(coordinates) {
  let apiKey = "275a753ef1dcfe59aa4a1d07e378894a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000, response.data.timezone);
  iconElement.setAttribute(
    // "src",
    // `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  iconElement.style.width = "250px"

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "275a753ef1dcfe59aa4a1d07e378894a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
search("New York");


function convertToCelsius(event) {
  event.preventDefault();
  if(!celsiusLink.classList.contains("active")){
    let celsiusElement = document.querySelector("#temperature");
    let celsiusTemperature = ((5/9) * (celsiusElement.innerHTML - 32));
    celsiusElement.innerHTML = Math.round(celsiusTemperature);
  }
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}
function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitElement = document.querySelector("#temperature");
  fahrenheitElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener('click', convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener('click', convertToFahrenheit);

var lightTheme = true;

function toggleTheme(event) {
  let temperatureDiv = document.querySelector(".temperatures");
  let body = document.querySelector("body");
  let githubLink = document.querySelector(".github-link");
  let unitsDiv = document.querySelector(".units");

  if (lightTheme) {
  event.target.classList.remove("dark-theme");
  event.target.classList.add("light-theme");
  unitsDiv.classList.remove("light");
  unitsDiv.classList.add("dark");
  body.style.background = "#006d77";
  temperatureDiv.style.background = "#83c5be";
  githubLink.style.color = "#83c5be";
  lightTheme = false;
  } else {
    event.target.classList.remove("light-theme");
    event.target.classList.add("dark-theme");
    unitsDiv.classList.remove("dark");
    unitsDiv.classList.add("light");
    body.style.background = "#83c5be";
    temperatureDiv.style.background = "#006d77";
    githubLink.style.color = "#006d77";
    lightTheme = true;
    }
}

let toggleThemeButton = document.querySelector(".toggle");
toggleThemeButton.addEventListener("click", toggleTheme);