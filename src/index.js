let currentTime = new Date();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let date = document.querySelector(".moment");
date.innerHTML = `Day:${day} 
Time:${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let searchInput = document.querySelector("#search-input");
  city.innerHTML = searchInput.value;
}
let searching = document.querySelector("#search-Form");
searching.addEventListener("submit", search);

function showWeather(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  let h1 = document.querySelector("h1");
  document.querySelector("#temperature").innerHTML = response.data.main.temp;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-Speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  h1.innerHTML = `${temperature}℃`;
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrPosition);
}

function getCurrPosition(position) {
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", retrievePosition);
