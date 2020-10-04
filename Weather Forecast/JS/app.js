let city = document.querySelector('input');
let button = document.querySelector('.submit');
let buttonLocation = document.querySelector('.btn-location');
let timezone = document.querySelector('.timezone');
let degree = document.querySelector('.degree');
let degreeMax = document.querySelector('.max');
let degreeMin = document.querySelector('.min');
let degreeSection = document.querySelector('.degree-section');
let descriptionWeather = document.querySelector('.description');
let iconWeather = document.querySelector('.icon');
let measure = document.querySelector('span');


// Get current weather in your location
buttonLocation.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const units = 'metric';

            const apiLocation = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=72fe768d404c5e2c3777a7ca2754ca13`;

            fetchApi(apiLocation);
        })
    }
})

// Get current weather by selecting a location
button.addEventListener('click', (e) => {
    e.preventDefault();

    const units = 'metric';
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=72fe768d404c5e2c3777a7ca2754ca13`;
    city.value = '';

    fetchApi(api)

});

// Change degree units
const degreeConverter = (temp, temp_max, temp_min) => {
    degreeSection.addEventListener('click', () => {

        let c = temp;
        let k = temp + 273.15;

        if (measure.textContent === 'K') {
            degree.textContent = c;
            degreeMax.textContent = Math.floor(temp_max);
            degreeMin.textContent = Math.floor(temp_min);
            measure.textContent = 'C';
        } else if (measure.textContent === 'C') {
            degree.textContent = Math.floor(k);
            degreeMax.textContent = Math.floor(temp_max + 273.15);
            degreeMin.textContent = Math.floor(temp_min + 273.15);
            measure.textContent = 'K';
        };

    });
}

//  Fetch weather API
const fetchApi = (api) => {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            const { temp, temp_max, temp_min, humidity, units } = data.main;
            const { description, icon } = data.weather[0];
            const nameLocation = data.name;
            degree.textContent = temp;
            degreeMax.textContent = temp_max;
            degreeMin.textContent = temp_min;
            timezone.textContent = nameLocation;
            descriptionWeather.textContent = description;
            console.log(data);

            iconWeather.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;

            degreeConverter(temp, temp_max, temp_min);


        })
}