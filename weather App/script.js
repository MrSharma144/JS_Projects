document.addEventListener('DOMContentLoaded', () => {
    const cityInput= document.getElementById('city-input');
    const getWeatherButton = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errorMesssage = document.getElementById('error-message');

    const API_KEY = "3db4b010dbfca685b377dc0709572195"; //put in env variables

    getWeatherButton.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (city === '') {
            errorMesssage.textContent = 'Please enter a city name.';
            return;
        }

        // it may throw an error if the API is not reachable or the city is not found
        // server/database is always in another continent

        try{
           const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData);
           
        }
        catch(error) {
            showError();
        }



            
    })
    

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);

        if(!response.ok) {
            throw new Error('City not found ')
        }
        const data = await response.json()
        return data;
    }

    function displayWeatherData(data) {
        console.log(data);
        const { name, main, weather } = data;
        cityName.innerHTML = name; 
        temperature.innerHTML = `Temperature: ${main.temp} °C`; 
        description.innerHTML = `Description: ${weather[0].description}`;

        
        // unlock the display of weather info
        weatherInfo.classList.remove('hidden');
        errorMesssage.classList.add('hidden');
    }
  

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMesssage.classList.add('hidden');
    }
        
});