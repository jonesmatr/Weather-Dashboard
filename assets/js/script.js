const apiKey = '922e43f3a98d8aba52633511ec6358f3'; // API key
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; // Search history
var currentWeather = document.getElementById("current-weather");
var searchButton = document.getElementById("search-button");
var searchCity = document.getElementById("search-input");
var weatherContainer = document.getElementById("weather-container");
const searchHistoryElement = document.getElementById('search-history');
const city = document.getElementById('search-input');

// Function to fetch weather data and five-day forecast based on latitude and longitude
async function fetchWeatherByLocation(lat, lon) {
  // Fetch current weather
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
  const data = await response.json();

  // Display the weather data
  const date = new Date();
  const dateString = date.toLocaleDateString();
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Construct icon URL
  currentWeather.innerHTML = `
    <h2>${data.name} - (${dateString}) <img src="${iconUrl}" alt="Weather icon"></h2>
    <p>Temperature: ${data.main.temp}°F</p>
    <p>Wind Speed: ${data.wind.speed} mph</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
  
  const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
  const forecastData = await forecastResponse.json();
       
    weatherContainer.innerHTML = '';
    forecastData.list.forEach((forecast, index) => {
      if (index % 8 === 0) { // Only take one forecast per day
        const forecastElement = document.createElement('div');
        forecastElement.className = 'card p-3 mb-2';
        forecastElement.innerHTML = `
          <h2>${new Date(forecast.dt_txt).toLocaleDateString()}</h2>
          <p><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png"/></p>
          <p>Temperature: ${forecast.main.temp}°F</p>
          <p>Wind Speed: ${forecast.wind.speed} mph</p>
          <p>Humidity: ${forecast.main.humidity}%</p>
          <p>Weather: ${forecast.weather[0].description}</p>
        `;
        weatherContainer.appendChild(forecastElement);
      }

    }); 
  };

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Fetch weather data for the user's current location
      fetchWeatherByLocation(lat, lon);
    });
  } else {
    // Geolocation is not supported by this browser
    console.log('Geolocation is not supported by this browser.');
  }
});


if (searchHistory.length > 0) {
  fetchWeather(searchHistory[0]);
}

  
 
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('search-input').value;
  
//I want this information to be displayed on the page when the user searches for a city, then added to local storage

// Remove city from search history if it's already there
const index = searchHistory.indexOf(city);
if (index > -1) {
  searchHistory.splice(index, 1);
}


    // Fetch current weather
function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const date = new Date();
        const dateString = date.toLocaleDateString();
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Construct icon URL
        currentWeather.innerHTML = `
            <h2>${data.name} - (${dateString}) <img src="${iconUrl}" alt="Weather icon"></h2>
            <p>Temperature: ${data.main.temp}°F</p>
            <p>Wind Speed: ${data.wind.speed} mph</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Weather: ${data.weather[0].description}</p>
    `;
    localStorage.setItem('weatherData', JSON.stringify(data));
  });
}








  // Fetch five-day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {      
      weatherContainer.innerHTML = '';
      data.list.forEach((forecast, index) => {
        if (index % 8 === 0) { // Only take one forecast per day
          const forecastElement = document.createElement('div');
          forecastElement.className = 'card p-3 mb-2';
          forecastElement.innerHTML = `
            <h2>${new Date(forecast.dt_txt).toLocaleDateString()}</h2>
            <p><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png"/></p>
            <p>Temperature: ${forecast.main.temp}°F</p>
            <p>Wind Speed: ${forecast.wind.speed} mph</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
            <p>Weather: ${forecast.weather[0].description}</p>
          `;
          weatherContainer.appendChild(forecastElement);
        }
      });     





      
      // Update search history
      searchHistory = [city, ...searchHistory.slice(0, 9)];
      searchHistoryElement.innerHTML = '';
      searchHistory.forEach(city => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = city;
        li.addEventListener('click', () => fetchWeather(city)); // Add event listener
        searchHistoryElement.appendChild(li);
      });
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    });

    window.addEventListener('load', () => {
        if (searchHistory.length > 0) {
          fetchWeather(searchHistory[0]);
        }
});
});
