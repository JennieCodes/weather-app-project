function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = docuemnt.querySelector("#description");
    let precipitationElement = document.querySelector("#precipitation");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    precipitationElement.innerHTML = response.data.main.precipitation;
    descriptionElement.innerHTML= response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dayOfWeek = document.querySelector("#date");
  let timeOfDay = document.querySelector("#time");
  let day = date[now.getDay()];
  let hours = now.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes= now.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}`;
  return `${hours}:${minutes}`;
}

let apiKey = "275a753ef1dcfe59aa4a1d07e378894a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
