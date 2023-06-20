const apiKey = '922e43f3a98d8aba52633511ec6358f3'; // API key
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; // Search history
var currentWeather = document.getElementById("current-weather"); //Create variable for current weather

// Function to fetch weather data based on latitude and longitude
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
}
    //Get weather data for the user's current location
  window.addEventListener('load', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        // Fetch weather data for the user's current location
        fetchWeatherByLocation(lat, lon);
      });
    } else {
      // Display error message if Geolocation is not supported
      console.log('Geolocation is not supported by this browser.');
    }
    });
  
 // Event listener for search button
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('search-input').value;  

    // Fetch current weather data for the city that was searched for by the user
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
    localStorage.setItem('weatherData', JSON.stringify(data));// Store weather data in local storage
  });
  
}
fetchWeather(city);
// Remove city from search history if it's already in the search history
  const index = searchHistory.indexOf(city);
  if (index > -1) {
    searchHistory.splice(index, 1);
  }

  // Fetch five-day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const weatherContainer = document.getElementById('weather-container');
      weatherContainer.innerHTML = '';
      // Need to change this header so that it is above the cards and not to the left of them, which is pushing
      const forecastHeading = document.createElement('h2');
      forecastHeading.textContent = '5-Day Forecast:';
      weatherContainer.appendChild(forecastHeading);

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
      const searchHistoryElement = document.getElementById('search-history');
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