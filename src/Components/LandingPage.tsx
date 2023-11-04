import React, { useContext, useEffect, useState } from "react"
import { weatherContext } from "../Context/weatherContext";
import { useNavigate } from "react-router-dom";
export const LandingPage=()=>{
    const tStormVideo = require("../media/thunderstormvideo.mp4") as string;
    const {setCity,handleWeatherSearch,locationWeather}=useContext(weatherContext);
    const navigate =useNavigate();
    const handlePageNav=async ()=>{
       await handleWeatherSearch();
        navigate('/weather');
    }
    const handleKeyPress = async (event) => {
        if(event.key === 'Enter'){
            await handleWeatherSearch();
            navigate('/weather');
        }
    }
    return(
        <div className="landing-page-wrapper">
        <video className="video-layout position-absolute" playsInline autoPlay muted loop poster="cake.jpg">
        <source src={tStormVideo} type="video/mp4"/>
            Your browser does not support the video tag.
            </video>
            <div className="landing-page-content">
                <div className='landing-page-title'>MilaCast</div>
                <div className="d-flex align-items-center justify-content-center">
                    <input className='landing-search-input' onKeyDown={(event)=>handleKeyPress(event)} placeholder="Enter a city to get the weather forecast" type="search" onChange={(location)=>setCity(location.target.value)}/>
                    <button className='landing-search-button' onClick={()=> handlePageNav()}> Search</button>
            </div>
            </div>
        </div>

    )
}