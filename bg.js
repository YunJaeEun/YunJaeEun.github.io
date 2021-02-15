const body = document.querySelector("body");

const IMG_NUM = 10;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUM);
    return number;
}

function init(){
    const ramdomNumber = genRandom();
    paintImage(ramdomNumber);
}

init();