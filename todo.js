const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput= toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let idNumbers = 1;

let toDos= [];

function paintCheckToDo(li){
    const span = li.querySelector("span");
    span.classList.add("lineThrough");
    const checkBtn = li.querySelector(".js-checkBtn");
    checkBtn.classList.add("makeGray");
}

function loadedCheckToDo(toDo){
    const li = document.getElementById(`${toDo.id}`);
    paintCheckToDo(li);
}

function checkToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDos.forEach(function(toDo){
        if(toDo.id === parseInt(li.id)){
            if(toDo.check==="false"){
                toDo.check = "true";
                saveToDos();
                paintCheckToDo(li);
            }
        }
    });
}

function deleteToDo(event){ //event = event 객체
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });//리턴값이 true인것만을 모아 새 배열을 만듦
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));//js의 객체를 문자열으로 바꾼다.
}

function paintToDo(text, check){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("js-checkBtn");
    const span = document.createElement("span");
    const newId = idNumbers++;
    delBtn.innerText = "✖";
    delBtn.addEventListener("click", deleteToDo);
    checkBtn.innerText="✔";
    checkBtn.addEventListener("click", checkToDo);//함수 실행시 매개변수로 event객체 전달됨
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text:text,
        id:newId,
        check:check
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    const check = "false";
    paintToDo(currentValue, check);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){//todo= 현재 처리할 요소
            paintToDo(toDo.text, toDo.check);
        });
        toDos.forEach(function(toDo){
            if(toDo.check === "true"){
                loadedCheckToDo(toDo);
            }
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();