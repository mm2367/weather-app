import { weatherContext } from '../Context/weatherContext';
import './App.css';
import React, { useContext } from 'react';

export const ErrorPage=()=> {
  const {setCity,locationWeather,handleWeatherSearch}=useContext(weatherContext);

  return (
    <div>
      Sorry that City does not exist
    </div>
  );
}
