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
// function displayForecast(response) {
//   let forecast = response.data.daily;

//   let forecastElement = document.querySelector("#forecast");

//   let forecastHTML = `div class="row">`;
//   forecast.forEach(function(forecastDay, index)) {
//     if (index < 6) {
//     forecastHTML = 
//       forecastHTML = 
//       `<div class="col-2">
//         <div class="weather-forecast-date">${forecastDay.dt}</div>
//         <img
//           src="mages/${response.data.weather[0].icon}.png" 
//           alt=""
//           width="80"
//         />
//         <div class="weather-forecast-temperatures">
//           <span class="weather-forecast-temperature-max>${Math.round(forecastDay.temp.max)}°</span>
//           <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.main)}°</span>
//         </div>
//       </div>
//       `;
//     }
//   }
//   forecastHTML = forecastHTML + `</div>`;
//   forecastElement.innerHTML = forecastHTML;
// }

function getforecast(coordinates) {
  let apiKey = "275a753ef1dcfe59aa4a1d07e378894a";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=imperial`;
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