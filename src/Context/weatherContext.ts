import { createContext } from "react";

export type WeatherLocation = {
    city: string
    farenheitTemp: string,
    humidity: string,
    visibility: string,
    wind_speed: string,
    daily:[];
    hourly:[];
    current:{weather:[]}
}

export const weatherContext = createContext({
    locationWeather: {
        city: '',
        humidity: '',
        farenheitTemp: '',
        visibility: '',
        wind_speed: '',
        daily:[],
        hourly:[],
        current:{weather:[]}
    },
    city:'',
    setCity: (city: string) => { },
    handleWeatherSearch: async () => { },
});