import React, { useContext, useEffect, useState } from "react";
import { weatherContext } from "../Context/weatherContext";
import { async } from "q";
import { useNavigate } from "react-router-dom";

export const CurrentWeather = () => {
    const currentDate = new Date();
    const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const [imageSourceUrl, setImageSourceUrl] = useState<string>("");

    const { city, setCity, locationWeather, handleWeatherSearch } = useContext(weatherContext);
    const currentTime = currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const currentDatePretty = daysOfWeek[currentDate.getDay()] + "," + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
    const navigate =useNavigate();

    const getIcon = async () => {
        if(locationWeather.city?.length>0){
        const response = await fetch(`https://openweathermap.org/img/wn/${locationWeather.current.weather[0].icon}@2x.png`)
        return response.blob()
        }
    }

    const downloadImageAndSetSource = async () => {
        const image = await getIcon();
        setImageSourceUrl(URL.createObjectURL(image));
    }
     const handleKeyPress = async (event) => {
        if(event.key === 'Enter' && city.length>0){
            await handleWeatherSearch()
        }
    }
    useEffect(() => {
        if(locationWeather.city){
        downloadImageAndSetSource()
        }
    }, [locationWeather.city])


    return (
        <div className="current-weather-wrapper">
            <div className="current-weather-title text-center">{city} Weather Forecast</div>
            <input  className="weather-search-input "type="search"  onKeyDown={(event) => handleKeyPress(event)} onChange={(location) => setCity(location.target.value)} />
            <button className="weather-search-button" onClick={() => handleWeatherSearch()}> Search</button>
            <div className="d-flex justify-content-center my-3">
                {currentTime + " " + currentDatePretty}
            </div>
            <div className='d-flex justify-content-center'>
            <img src={imageSourceUrl} />
            {locationWeather.current.weather[0]?.main}
            </div>
            <div className="d-flex justify-content-between mx-4">
                <div>
                    Humidity 
                <div>{locationWeather.humidity}%</div>
                </div>
                <div className="wind-speed-text">
                    Wind Speed
                    <div>{locationWeather.wind_speed} mph</div>
                    </div>
            </div>
            <div>

            </div>
        </div>
    )

}