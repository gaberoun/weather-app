import { getImg, getSvg } from "./helper";

// API HANDLERS
const API_KEY = atob(process.env.API_KEY);

async function fetchLocation(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
    const data = await response.json();

    displayLocation(data[0]);
    // Returns the first city it finds
    return [data[0].lat, data[0].lon];

  } catch (error) {
    console.log(error.message);
  }
}

async function fetchAPI(location) {
  try {
    // Obtain latitude and longitude of city input
    const coords = await fetchLocation(location);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=minutely&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data);
    
    // Display forecast for today
    displayMain(data.current);

    // Display additional info if there is no alert
    if (data.hasOwnProperty('alerts')) {
      displayAlerts(data.alerts);
    } else {
      displayExtras(data.current);
    }
    // Display hourly and daily forecasts
    displayHourly(data.hourly);
    displayDaily(data.daily);
    
  } catch (error) {
    // Return to default location if user input is invalid
    console.log(error.message);
    alert('Please enter a valid city.');
    run();
  }
}

async function fetchCity(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`);
    const data = await response.json();

    // Proceeds to fetching forecast using geographical location
    fetchAPI(data[0].name);

  } catch (error) {
    console.log(error.message);
  }
}


// SCRIPT HANDLERS
function displayMain(data) {
  const container = document.getElementById('container');
  const background = getImg(data.weather[0].icon);
  document.getElementById('background').style.backgroundImage = `url(${background})`;

  const temp = document.createElement('h2');
  temp.textContent = `${data.temp.toFixed(1)}\u00B0C`;
  temp.id = 'temp';
  const weather = document.createElement('h3');
  weather.textContent = data.weather[0].description;
  weather.id = 'weather';
  weather.classList = 'weather';

  container.appendChild(temp);
  container.appendChild(weather);
}

function displayAlerts(data) {
  const container = document.getElementById('container');
  const alerts = document.createElement('div');
  alerts.id = 'alerts-container';

  data.forEach((alert) => {
    const alertContainer = document.createElement('div');
    alertContainer.classList = 'alert-container';

    const icon = document.createElement('img');
    icon.src = 'https://cdn-icons-png.flaticon.com/512/607/607870.png';
    icon.classList = 'icon';

    const event = document.createElement('p');
    event.textContent = alert.event;
    event.classList = 'alert-event';

    const time = document.createElement('p');
    let start = new Date(alert.start * 1000);
    start = formatTime(start);
    let end = new Date(alert.end * 1000);
    end = formatTime(end);
    time.textContent = `${start[0]} ${start[1]} to ${end[0]} ${end[1]}`;

    alertContainer.appendChild(icon);
    alertContainer.appendChild(event);
    alertContainer.appendChild(time);
    alerts.appendChild(alertContainer);
  })
  container.appendChild(alerts);
}

function displayExtras(data) {
  const container = document.getElementById('container');
  const extras = document.createElement('div');
  extras.id = 'extras-container';

  const feelsLike = document.createElement('h5');
  feelsLike.innerHTML = 'Feels like:' + '<br />' + `${data.feels_like.toFixed(1)}\u00B0C`;
  const rain = document.createElement('h5');
  rain.innerHTML = 'Rain:' + '<br />' + `${data.rain ? data.rain.toFixed(1) : 0} mm/hr`;
  const wind = document.createElement('h5');
  wind.innerHTML = 'Wind:' + '<br />' + `${data.wind_speed} m/s`;

  extras.appendChild(feelsLike);
  extras.appendChild(rain);
  extras.appendChild(wind);
  container.appendChild(extras);
}

function displayLocation(data) {
  const container = document.getElementById('container');

  const location = document.createElement('h3');
  location.textContent = `${data.name}, ${data.country}`;

  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const today = new Date().toLocaleDateString('en-US', options);
  const date = document.createElement('p');
  date.textContent = today;

  container.appendChild(location);
  container.appendChild(date);
}

function formatTime(date) {
  // Format date
  let hours = date.getHours();
  const hoursLabel = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  // Convert 0 to 12
  hours = hours ? hours : 12; 

  return [hours, hoursLabel];
}

function displayHourly(data) {
  // Display time, weather, and icon per hour
  data.forEach((time) => {
    const container = document.createElement('div');
    container.classList = 'hourly-forecast';
    
    const label = document.createElement('p');
    const date = new Date(time.dt * 1000);
    const hours = formatTime(date);

    label.textContent = `${hours[0]} ${hours[1]}`;

    const icon = document.createElement('img');
    icon.src = getSvg(time.weather[0].icon);
    icon.classList = 'icon';

    const temp = document.createElement('p');
    temp.textContent = `${time.temp.toFixed(0)}\u00B0C`;

    container.appendChild(label);
    container.appendChild(icon);
    container.appendChild(temp);
    document.getElementById('hourly-container').appendChild(container);
  })
}

function displayDaily(data) {
  // Display day, date, weather, icon, max/min temp, and rain per day
  data.forEach((time) => {
    const container = document.createElement('div');
    container.classList = 'daily-forecast';
    
    const dateContainer = document.createElement('div');
    const day = document.createElement('p');
    const date = document.createElement('p');
    const newDate = new Date(time.dt * 1000);

    // Format date label
    day.textContent = newDate.toLocaleDateString('en-US', {weekday: 'long'});
    date.textContent = newDate.toLocaleDateString('en-US', {month: 'numeric', day: 'numeric'});

    dateContainer.appendChild(day);
    dateContainer.appendChild(date);

    const weather = document.createElement('p');
    weather.textContent = time.weather[0].description;
    weather.classList = 'weather';

    const icon = document.createElement('img');
    icon.src = getSvg(time.weather[0].icon);
    icon.classList = 'icon';

    const dataContainer = document.createElement('div');
    dataContainer.classList = 'data-container'; 

    const temp = document.createElement('p');
    temp.textContent = `${time.temp.min.toFixed(0)}\u00B0/${time.temp.max.toFixed(0)}\u00B0`
    const rain = document.createElement('p');
    rain.textContent = `${time.rain ? time.rain.toFixed(1) : 0} mm`;
    dataContainer.appendChild(temp);
    dataContainer.appendChild(rain);

    container.appendChild(dateContainer);
    container.appendChild(weather);
    container.appendChild(icon);
    container.appendChild(dataContainer);
    document.getElementById('daily-container').appendChild(container);
  })
}

// Get location input from user
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Remove pre-rendered components before fetching
  document.getElementById('container').textContent = '';
  document.getElementById('hourly-container').textContent = '';
  document.getElementById('daily-container').textContent = '';
  const dataInput = document.getElementById('city-input').value;
  fetchAPI(dataInput.toLowerCase());

  // Remove input after submitting
  e.target.reset();
});


// MAIN FUNCTION
function run() {
  // Render default
  const successCallback = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetchCity(lat, lon);
  };
  
  const errorCallback = (error) => {
    console.log(error);
    fetchAPI('London');
  };
  // Get user's current location if available
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

run();