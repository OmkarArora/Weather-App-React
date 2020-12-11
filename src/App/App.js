import { useState, useEffect } from "react";
import "./App.css";
import arrowIcon from "../images/arrow.svg";
import locationIcon from "../images/location.svg";

import TimeDisplay from "../TimeDisplay/TimeDisplay";
import { getHeaderImage } from "../util/getHeaderImage";


function App() {
  const [weatherData, setWeatherData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");
  const [timezone, setTimezone] = useState(0);
  const [headerIcon, setHeaderIcon] = useState({icon:"", alt:""});
 
  useEffect(() => fetchWeather(), [])

   function fetchWeather(){
// let url ="";
    // if(navigator.geolocation){
    //   let position = navigator.geolocation()
    //   url=`https://api.openweathermap.org/data/2.5/weather?lat=${}&lon=${lon}&appid={API key}`
    // }

     fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
       setWeatherData(data)
       let icon = data.weather[0].icon;
       setWeatherIcon(`http://openweathermap.org/img/wn/${icon}@2x.png`)

       let timezone = data.timezone;
       setTimezone(timezone);
       setHeaderIcon(getHeaderImage(timezone));
      })
      .catch((error) => console.log("An error occured"));
  }

  return (
    <div className="App">
      <div className="place-container">
        <span>
          <p className="city-name">
            <img src={locationIcon} alt="location" className="location-icon" />
            {weatherData!==undefined?weatherData.name:""}, {weatherData!==undefined && weatherData.sys!==undefined?weatherData.sys.country:""}
          </p>
          <TimeDisplay timezone={timezone}/>
        </span>
        <span>
          {headerIcon.icon!==""? <img
            src={headerIcon.icon}
            className="time-indication-icon"
            alt={headerIcon.alt}
          />: <></>}
         
        </span>
      </div>

      <div className="temp-details">
        <span>
        <p className="temp">
          {weatherData!==undefined && weatherData.main!==undefined?weatherData.main.temp:""}<span className="celsius-symbol">&#8451;</span>
        </p>
        <div className="minmax-container">
          <span className="max">
            <img src={arrowIcon} className="arrow-icon up" alt="up" /> {weatherData!==undefined && weatherData.main!==undefined?weatherData.main.temp_max:""}
            &#8451;
          </span>
          <span className="min">
            <img src={arrowIcon} className="arrow-icon down" alt="up" /> {weatherData!==undefined && weatherData.main!==undefined?weatherData.main.temp_min:""}
            &#8451;
          </span>
        </div>
        </span>
        <span>
        <img src={weatherIcon} alt="weather" className="weather-icon"/>
          <p className="weather-description">{weatherData!==undefined && weatherData.weather!==undefined?weatherData.weather[0].main: ""}</p>
        </span>
      </div>
      <div className="card">
        <p className="card-header">Wind</p>
        <p className="card-value">{weatherData!==undefined &&weatherData.wind!==undefined?weatherData.wind.speed:""} m/s, {weatherData!==undefined && weatherData.wind!==undefined?weatherData.wind.deg:""}&deg;</p>
      </div>
      <div className="card">
        <p className="card-header">Visibility</p>
        <p className="card-value">{weatherData!==undefined?weatherData.visibility/1000:""} km</p>
      </div>
      <div className="card">
        <p className="card-header">Humidity</p>
        <p className="card-value">{weatherData!==undefined && weatherData.main!==undefined?weatherData.main.humidity:""} %</p>
      </div>
      <div className="card">
        <p className="card-header">Pressure</p>
        <p className="card-value">{weatherData!==undefined && weatherData.main!==undefined?weatherData.main.pressure:""} hPa</p>
      </div>
    </div>
  );
}
export default App;