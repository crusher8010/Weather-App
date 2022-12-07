const apikey = "5b4e452deefe465549cbe3213a17fe3d";

window.addEventListener("load", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=${apikey}`;

            fetch(url).then(res => {
                return res.json()
            }).then((data) => {
                console.log(data);
                weatherReport(data);
            })
        })
    }
})

document.getElementById('search').addEventListener('click',() => {
    let place = document.getElementById('input').value;
    console.log(place)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;
    fetch(url).then(res => {
        return res.json();
    }).then((data) => {
        weatherReport(data);
    })
})

function weatherReport(data){
    let urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}`;

    fetch(urlcast).then(res => {
        return res.json()
    }).then((forecast) => {
        console.log(forecast);
        hourForecast(forecast);
        dayForecast(forecast);

        document.getElementById('city').innerHTML = data.name+ ' ,' + data.sys.country;

        document.getElementById('temperature').innerHTML = Math.floor(data.main.temp - 273)+ ' °C';

        let imag = document.getElementById('img');
        let temp = data.weather[0].icon;
        imag.src = `http://openweathermap.org/img/w/${temp}.png`;

        document.getElementById('clouds').innerHTML = data.weather[0].description;
    })
}

function hourForecast(forecast){
    document.querySelector('.templist').innerHTML = '';
    for(let i=0;i<5;i++){
        let date = new Date(forecast.list[i].dt*1000);

        let hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');

        let div = document.createElement('div');
        let time = document.createElement('div');
        time.setAttribute('class', 'time');
        time.innerText = (date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00','');

        let temp = document.createElement('p');
        temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273)+ ' °C' + ' / ' + Math.floor(forecast.list[i].main.temp_min - 273)+ ' °C'

        div.appendChild(time)
        div.appendChild(temp)

        let desc = document.createElement('p');
        desc.setAttribute('class','desc');
        desc.innerText = forecast.list[i].weather[0].description

        hourR.appendChild(div)
        hourR.appendChild(desc)

        document.querySelector('.templist').appendChild(hourR);
    }
}

function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML = "";
    for(let i=8;i< forecast.list.length;i+=8){
        console.log(forecast.list[i]);
        let div = document.createElement('div');
        div.setAttribute('class','dayF');

        let day = document.createElement('p');
        day.setAttribute('class','date');
        day.innerText = new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
        div.append(day);

        let temp = document.createElement('p');
        temp.innerText= Math.floor((forecast.list[i].main.temp_max - 273))+ ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273))+ ' °C';
        div.append(temp)

        let desc = document.createElement('p');
        desc.setAttribute('class','desc');
        desc.innerText = forecast.list[i].weather[0].description;
        div.append(desc);

        document.querySelector('.weekF').appendChild(div);
    }
}