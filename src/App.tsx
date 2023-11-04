import './App.css';
import React, { useContext, useState } from 'react';
import { WeatherLocation, weatherContext } from './Context/weatherContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from './Components/LandingPage';
import { WeatherPage } from './WeatherPage';
export const App = () => {
    const [city, setCity] = useState<string>('')
    const [locationWeather, setLocationWeather] = useState<WeatherLocation>({
        city: '',
        farenheitTemp: '',
        humidity: '',
        visibility: '',
        wind_speed: '',
        daily:[],
        hourly:[],
        current:{weather:[]}
    })



    const handleWeatherSearch = async () => {
        if (city !== '') {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=69f5298328e80f43bf91cdb9f9784d9a`)
            const initData = await response.json()

            if (initData!==undefined && initData.length>0) {
                let latitiude=initData[0]?.lat;
                let longitude=initData[0]?.lon;
                const forecastResponse= await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitiude}&lon=${longitude}&appid=69f5298328e80f43bf91cdb9f9784d9a&units=Imperial`)
                const forecast = await forecastResponse.json();
                setLocationWeather({
                    ...forecast, farenheitTemp: forecast.current.temp,
                    city: city,
                    humidity: forecast.current.humidity, visibility: forecast.current.visibility,
                    wind_speed: forecast.current.wind_speed, daily:forecast.daily, hourly: forecast.hourly,
                })

            }

        }
    }
    return (
        <weatherContext.Provider value={{ city: city, setCity: setCity, locationWeather: locationWeather, handleWeatherSearch: () => handleWeatherSearch() }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LandingPage />}>
                    </Route>
                    <Route path='/weather' element={<WeatherPage />}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </weatherContext.Provider>
    );
}
