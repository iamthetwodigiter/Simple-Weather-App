const apiKey = "paste your openweather api key here";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const search = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const closeBtn = document.querySelector('.close');

var forecastContainer = document.querySelector('.forecast');
const forecastBtn = document.querySelector('.forecast-btn');
const forecastIcon = document.querySelector('.forecast-icon');
const forecastClose = document.querySelector('.forecast-close');


async function checkWeather(city) {

    const response = await fetch(url + `${city}&appid=${apiKey}`);

    forecastContainer.classList.add('none');

    if(response.status == 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";

        closeBtn.addEventListener('click', ()=> {
        document.querySelector('.error').style.display = "none";
        })
    }
    else {
        if(document.querySelector('.error').style.display == "block") {
            document.querySelector('.error').style.display = "none";
        }

        var data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";
        
        const weather = data.weather[0].main;

        if(weather == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        else if(weather == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(weather == "Rain"){
            weatherIcon.src = "images/rain.png";
        }
        else if(weather == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(weather == "Mist"){
            weatherIcon.src = "images/mist.png";
        }
        else if(weather == "Snow"){
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector('.weather').style.display = "block";
    }

}

async function forecastWeather(city) {
    const response2 = await fetch(forecastUrl + `${city}&appid=${apiKey}`);
    var data2 = await response2.json();

    for(let i=0; i<30; i=i+2) {

        let dateText = data2.list[i].dt_txt;
        const dateArray = dateText.split(" ");
        const date = dateArray[0];
        const time = dateArray[1];
        
        const forecastweather = data2.list[i].weather[0].main;
        const ftemp = data2.list[i].main.temp + " °C";
        const fhumidity = data2.list[i].main.humidity + "%";
        const fwind = data2.list[i].wind.speed + " km/h";

        var newcontainer = document.createElement('div');
        var newdate = document.createElement('h5');
        var newtime = document.createElement('h5');
        var newicon = document.createElement('img');
        var newtemp = document.createElement('h3');
        var newhumidity = document.createElement('h5');
        var newwind = document.createElement('h5');

        newdate.innerText = date;
        newdate.classList.add('date');
        newcontainer.appendChild(newdate);

        newtime.innerText = time;
        newtime.classList.add('time');
        newcontainer.appendChild(newtime);
    
        if(forecastweather == "Clouds"){
            newicon.src = "images/clouds.png";
        }
        else if(forecastweather == "Clear"){
            newicon.src = "images/clear.png";
        }
        else if(forecastweather == "Rain"){
            newicon.src = "images/rain.png";
        }
        else if(forecastweather == "Drizzle"){
            newicon.src = "images/drizzle.png";
        }
        else if(forecastweather == "Mist"){
            newicon.src = "images/mist.png";
        }
        else if(forecastweather == "Snow"){
            newicon.src = "images/snow.png";
        }
    
        newicon.classList.add('forecast-icon');
        newcontainer.appendChild(newicon);
    
        newtemp.innerText = ftemp;
        newtemp.classList.add('forecast-temp');
        newcontainer.appendChild(newtemp);
    
        newhumidity.innerText = fhumidity;
        newhumidity.classList.add('forecast-humidity');
        newcontainer.appendChild(newhumidity);
    
        newwind.innerText = fwind;
        newwind.classList.add('forecast-wind');
        newcontainer.appendChild(newwind);

        newcontainer.classList.add('container');
        forecastContainer.appendChild(newcontainer);

    }

    if (search.value != "") {
        search.value = "";
    }
}


document.addEventListener('keypress', (event)=>{
  let keyCode = event.keyCode ? event.keyCode : event.which;
  if(keyCode === 13) {
    searchBtn.click();
  }
});


searchBtn.addEventListener('click' , () => {
    checkWeather(search.value);
});

forecastBtn.addEventListener('click' , () => {
    document.querySelector('.forecast').classList.remove('none');
    document.querySelector('.forecast-close').classList.remove('none');
    forecastWeather(search.value);
})

forecastClose.addEventListener('click', () => {
    document.querySelector('.forecast').classList.add('none');
    document.querySelector('.forecast-close').classList.add('none');
})

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', ()=> {
    document.location.reload();
})
