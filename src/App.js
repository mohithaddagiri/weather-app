import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');

  const API_KEY = '895284fb2d2c50a520ea537456963d9c';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        const dailyData = response.data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
        setForecast(dailyData);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <h1>5-Day Weather Forecast</h1>
        <div className="forecast-container">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <h2>{new Date(day.dt_txt).toLocaleDateString()}</h2>
              <p>{day.weather[0].description}</p>
              <p>Temp: {day.main.temp.toFixed()}°F</p>
              <p>Feels Like: {day.main.feels_like.toFixed()}°F</p>
              <p>Humidity: {day.main.humidity}%</p>
              <p>Wind Speed: {day.wind.speed.toFixed()} MPH</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
