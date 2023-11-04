import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as Chartjs, registerables } from 'chart.js/auto';
import { weatherContext } from '../Context/weatherContext';
import { options } from 'yargs';

Chartjs.register(...registerables);

export const LineChart=()=>{
    const {city, locationWeather}=useContext(weatherContext);

    const hourlyLabels=()=>{
        return locationWeather.hourly.slice(0,24).map((hour)=>{
        let dateObj= new Date(hour.dt*1000).toLocaleTimeString('en-US',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
      );
        return dateObj

        });
    }
    const combinedData={
        labels:hourlyLabels(),
        datasets:[
            {
            label:`${city} Hourly Weather Forecast`,
            data: locationWeather.hourly.slice(0,24).map((hour)=>{return hour.temp}),
            backgroundColor:"white",
            borderColor:"1e1e1e",
            borderWidth:1,
            fill:"origin",
            tension: 0.05
        },
    ],
    options: {
        scales: {
            yAxes:[{
                scaleLabel: {
                        display: true,
                        labelString: "number of cars",
                        fontColor: "color you want",
                      }
              }],
        },
    }
    }
    return(
        <div     
        style={{
            width: "100%",
            height: "50%",
            display:"flex",
            justifyContent:"center"
          }}>
        <Line data={combinedData} options={{maintainAspectRatio:false}}/> 
        </div>
    )

}