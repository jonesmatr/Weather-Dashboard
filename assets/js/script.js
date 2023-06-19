const apiKey = '922e43f3a98d8aba52633511ec6358f3'; // Replace with your API key
const lat = '37.5407'; // Replace with the latitude
const lon = '77.4360'; // Replace with the longitude
var city;

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const weatherContainer = document.getElementById('weather-container');
    data.list.forEach((forecast, index) => {
      if (index % 8 === 0) { // Only take one forecast per day
        const forecastElement = document.createElement('div');
        forecastElement.innerHTML = `
          <h2>${new Date(forecast.dt_txt).toLocaleDateString()}</h2>
          <p>Temperature: ${forecast.main.temp}°K</p>
          <p>Weather: ${forecast.weather[0].description}</p>
        `;
        weatherContainer.appendChild(forecastElement);
      }
    });
  });
