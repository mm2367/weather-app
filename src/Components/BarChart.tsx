import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js/auto';
import { weatherContext } from '../Context/weatherContext';

Chart.register(...registerables);

export const BarChart=()=>{
    const {locationWeather}=useContext(weatherContext);
    let currentDay=new Date().getDay();
    const days=["Sunday","Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"]
    const weatherLabel=[];
    for (let i = currentDay; i < currentDay+7; i++) {
        weatherLabel.push(days[i%7])
   }
        const combinedData={
        labels:weatherLabel,
        datasets:[
            {
            label:'7-Day Forecast',
            data: locationWeather.daily.map((day)=>{return day.temp.max}),
            backgroundColor:"white",
            borderColor:"1e1e1e",
            borderWidth:1,
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
        <div  className="bar-chart-wrapper">
        <Bar data={combinedData} options={{ maintainAspectRatio: false }}
/> 
        </div>
    )

}