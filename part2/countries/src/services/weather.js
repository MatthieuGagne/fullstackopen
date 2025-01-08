import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall';
const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Access the API key from environment variables; // Access the API key from environment variables

const getWeather = (lat, lon, exclude) => {
    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`);
    console.log(request)
    return request.then(response => response.data);
};

export default { getWeather };