async function getWeather() {
    const city = document.getElementById('city').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!city) {
        resultDiv.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    const apiKey = 'f187fe6df98f970f1793ca672080bc6b'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        const temperature = data.main.temp;
        const weatherStatus = data.weather[0].description;

        resultDiv.innerHTML = `<p>Temperature: ${temperature}&#8451;</p><p>Weather: ${weatherStatus}</p>`;
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}
