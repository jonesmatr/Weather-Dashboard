const apiKey = '922e43f3a98d8aba52633511ec6358f3'; // Replace with your API key
let searchHistory = [];

document.getElementById('search-button').addEventListener('click', () => {
  const city = document.getElementById('search-input').value;
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
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
            <p>Temperature: ${forecast.main.temp}°K</p>
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
        searchHistoryElement.appendChild(li);
      });
    });
});

