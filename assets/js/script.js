const apiKey = '922e43f3a98d8aba52633511ec6358f3'; // Replace with your API key
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
var currentWeather = document.getElementById("current-weather");


  

function fetchWeather(city) {
    // Fetch current weather
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

  document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('search-input').value;

  // Fetch five-day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const weatherContainer = document.getElementById('weather-container');
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
