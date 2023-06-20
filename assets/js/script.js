const apiKey = '922e43f3a98d8aba52633511ec6358f3'; // Replace with your API key
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
var currentWeather = document.getElementById("current-weather");
 
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('search-input').value;
  
//I want this information to be displayed on the page when the user searches for a city, then added to local storage

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
  });

// Remove city from search history if it's already there
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

  // Create a new div element for the heading
  const headingDiv = document.createElement('div');
  headingDiv.className = 'heading-div col-12';

  // Add the <h2> element to the headingDiv
  const forecastHeading = document.createElement('h2');
  forecastHeading.textContent = '5-Day Forecast:';
  headingDiv.appendChild(forecastHeading);

  // Append the headingDiv to the weatherContainer
  weatherContainer.appendChild(headingDiv);

  // Create a new div element for the forecast cards
  const forecastDiv = document.createElement('div');
  forecastDiv.className = 'row forecast-div';

  data.list.forEach((forecast, index) => {
    if (index % 8 === 0) { // Only take one forecast per day
      // Create a new div for each card
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card-div';

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
      cardDiv.appendChild(forecastElement);
      forecastDiv.appendChild(cardDiv);
    }
  });

  // Append the forecastDiv to the weatherContainer
  weatherContainer.appendChild(forecastDiv);

  // ... rest of your code ...
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
