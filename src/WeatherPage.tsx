import './App.css';
import React, { useContext, useEffect } from 'react';
import { BarChart } from './Components/BarChart';
import { LineChart } from './Components/LineChart';
import { CurrentWeather } from './Components/CurrentWeather';
import { useNavigate } from "react-router-dom";
import { weatherContext } from './Context/weatherContext';

export const WeatherPage = () => {
const {locationWeather}=useContext(weatherContext);
const navigate =useNavigate();

try{
  return (
    <div className='d-lg-flex w-100 h-100 container weather-page-wrapper justify-space-between'>
      <div className='current-weather-layout' >
        <CurrentWeather />
      </div>
      <div className='chart-wrapper'>
        <LineChart />
        <BarChart />
      </div>
    </div>
  );

}
catch{
navigate('/')
}
}
