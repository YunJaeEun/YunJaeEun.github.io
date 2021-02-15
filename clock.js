const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const btn12 = document.querySelector(".btn12");
const btn24 = document.querySelector(".btn24");

let clocktwelve = false;

function changeTo12(event){
    const btn = event.target;
    btn.classList.add("makeGray");
    btn24.classList.remove("makeGray");
    clocktwelve = true;
    console.log(12);
}

function changeTo24(event){
    const btn = event.target;
    btn.classList.add("makeGray");
    btn12.classList.remove("makeGray");
    clocktwelve = false;
    console.log(24);
}

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    let hours = date.getHours();
    const seconds = date.getSeconds();

    if(clocktwelve===true){
        hours = date.getHours()-12;
    }
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes<10 ? `0${minutes}`:minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;

}

function init(){
    btn12.addEventListener("click", changeTo12);
    btn24.addEventListener("click", changeTo24);
    getTime();
    btn24.classList.add("makeGray");
    btn12.classList.remove("makeGray");
    setInterval(getTime, 500);
}

init();