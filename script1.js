function getWeather() {
    const city = document.getElementById('city').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!city) {
        resultDiv.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    const apiKey = 'f187fe6df98f970f1793ca672080bc6b'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const xhr = new XMLHttpRequest(); // Create an XMLHttpRequest object

    // Define the callback function for when the request state changes
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // Check if the request is complete
            if (xhr.status === 200) { // Check if the response is successful
                const data = JSON.parse(xhr.responseText); // Parse the JSON response
                const temperature = data.main.temp;
                const weatherStatus = data.weather[0].description;

                resultDiv.innerHTML = `<p>Temperature: ${temperature}&#8451;</p><p>Weather: ${weatherStatus}</p>`;
            } else if (xhr.status === 404) { // Handle city not found
                resultDiv.innerHTML = '<p class="error">Error: City not found.</p>';
            } else { // Handle other errors
                resultDiv.innerHTML = `<p class="error">Error: Unable to fetch weather data. Status code: ${xhr.status}</p>`;
            }
        }
    };

    xhr.open('GET', url, true); // Initialize a GET request
    xhr.send(); // Send the request
}
