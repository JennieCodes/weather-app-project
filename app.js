function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = docuemnt.querySelector("#description");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement = response.data.weather[0].description;
}

let now = new Date();
let dayOfWeek = document.querySelector("#date");
let timeOfDay = document.querySelector("#time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minut= now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dayOfWeek.innerHTML = `${day}`
timeOfDay.innerHTML = `${hours}:${minutes}`;

let apiKey = "275a753ef1dcfe59aa4a1d07e378894a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
