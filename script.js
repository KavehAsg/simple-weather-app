// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
// api.openweathermap.org/data/2.5/weather?q=tehran&appid=edc228562ac0a8aa3116d41c0687cf56&units=metric

const form = document.querySelector(".user-input");
const searchedCity = document.querySelector(".user-input input");
const errorMsg = document.querySelector(".error-msg");
const list = document.querySelector(".display");

const apiKey = "a1e61fb4c46665c7d4b49aefab41ebcc";
let cities = [];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = searchedCity.value.toLowerCase().trim();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    searchedCity.value = "";
    fetch(url)
        .then((response) => response.json())
        .then(data => {
            const { weather, main, sys, name } = data;
            if (!cities.includes(name)) {
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
                const li = document.createElement("li");
                li.innerHTML = `
                        <div class="container">
                            <div class="city-geo">
                                <span class="city-name">${name}</span>
                                <span class="country-name">${sys.country}</span>
                            </div>

                            <div class="city-weather">
                                <div class="city-temp">
                                    <span class="temp">${Math.round(main.temp)}</span>
                                    <span class="metric">°C</span>
                                </div>

                                <figure>
                                    <img src='${icon}' alt="weather">
                                    <figcaption>${weather[0].description}</figcaption>
                                </figure>
                            </div>
                        </div>
                        ` ;

                list.appendChild(li);
                errorMsg.innerText = "";
                cities.push(name);
            }
            else {
                errorMsg.innerText = "you have already searched this city";
            }
        })
        .catch(() => errorMsg.innerText = "please search a valid city");

});

