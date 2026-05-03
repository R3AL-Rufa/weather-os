// weather.js
const LAT = 7.1934088;
const LON = 5.2309982;

async function vibeCheck() {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,precipitation&hourly=precipitation_probability&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
        const data = await response.json();
        
        const temp = data.current.temperature_2m;
        const rainChance = data.hourly.precipitation_probability[0];
        const isRaining = data.current.precipitation > 0;
        
        // 1. Keep your cool console logs for debugging
        console.log(`TEMP: ${temp}°C`);

        // 2. NEW: Update the actual website screen
        // Make sure your index.html has an element with id="weather-display"
        const display = document.getElementById('weather-display');
        if (display) {
            display.innerHTML = `
                <h1>${temp}°C</h1>
                <p>Rain Probability: ${rainChance}%</p>
                <p>Status: ${isRaining ? 'RAINING' : 'DRY'}</p>
            `;
        }

    } catch (err) {
        console.error('Failed to reach weather server.');
    }
}

vibeCheck();