const searchInput = document.querySelector(".search input");
const searchButton = document.getElementById("searchbutton");
const carouselInner = document.querySelector(".carousel-inner");

const proxy = 'https://cors-anywhere.herokuapp.com/'; // Proxy مؤقت

async function getWeather(city = "Egypt") {
  try {
    const url = `${proxy}http://api.weatherapi.com/v1/forecast.json?key=78afdeadba63468c957163718252608&q=${city}&days=3&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

function displayWeather(data) {
  carouselInner.innerHTML = "";

  data.forecast.forecastday.forEach((day, index) => {
    const activeClass = index === 0 ? "active" : "";

    const card = `
      <div class="carousel-item ${activeClass}">
        <div class="card text-center p-3" style="width: 70%; margin:auto;">
          <img src="https:${day.day.condition.icon}" class="card-img-top mx-auto" alt="weather icon" style="width:64px;">
          <div class="card-body">
            <h5 class="card-title">${data.location.name}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${day.date}</h6>
            <p class="card-text">
              ${day.day.condition.text} <br>
              🌡 Max: ${day.day.maxtemp_c}°C | Min: ${day.day.mintemp_c}°C <br>
              💨 Wind: ${day.day.maxwind_kph} kph <br>
              ☀ Avg Temp: ${day.day.avgtemp_c}°C
            </p>
          </div>
        </div>
      </div>
    `;

    carouselInner.innerHTML += card;
  });
}

searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
  }
});


getWeather();
