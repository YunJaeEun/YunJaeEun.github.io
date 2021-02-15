const weather = document.querySelector(".js-weather");
const spanTemp = document.querySelector(".js-temp");
const spanPlace = document.querySelector(".js-place");
const weatherImg = document.querySelector(".js-weatherImage");

const API_KEY = "0a7b3acee7603e7b5efb1c31c1183fcd";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){ // API 호출이 성공했을 경우에는 response 객체를 resolve
        return response.json();
    }).then(function(json){
       const temperature = json.main.temp;
       const place = json.name;
       spanTemp.innerText=`${temperature.toFixed(1)}℃`;
       spanPlace.innerText=`${place}`;
       const icon = json.weather[0].icon;
       weatherImg.src=`http://openweathermap.org/img/wn/${icon}@2x.png`;
    });
} 

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude =  position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,//latitude,  으로도 가능
        longitude: longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords =localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);//string->object
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();