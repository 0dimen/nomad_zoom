// 프론트엔드에서 실행.

const socket = io();

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");
const room = document.getElementById("room");
// const roomForm = room.querySelector("form");
room.hidden = true;

let roomName = "";


function handleWelcomeSubmit(event){
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    const value = input.value;
    socket.emit("enter_room", value, showRoom);
    roomName = value;
    input.value = "";
}

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handleNickNameSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#name input");
    const value = input.value;
    socket.emit("nickname", value);
    input.value = "";
}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", roomName, value, ()=>{
        addMessage(`You: ${value}`);
    });
    input.value= "";
}

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const roomTitle = room.querySelector("h3");
    roomTitle.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");
    msgForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNickNameSubmit);
}

socket.on("welcome", (user)=>{
    addMessage(`${user} arrived!`);
});

socket.on("new_message", addMessage);

socket.on("bye", (left)=>{
    addMessage(`${left} left`);
})

welcomeForm.addEventListener("submit", handleWelcomeSubmit);
// roomForm.addEventListener("submit", handleRoomSubmit); // room의 socket id가 정해지기 전에 roomForm에 eventListener를 다는 것은 리소스 낭비다.


/*
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`); // socket : 서버로 연결

// let nickName= '';

function makeMessage(type, payload){ // Object -> String
    
    
    //  * Object를 String으로 변환해야 하는 이유
    //  다른 프로그래밍 언어로 작성된 서버와 통신하기 위해서.
    //  - Object는 자바스크립트에서 사용되는 객체이다. 다른 프로그래밍 언어는 다른 객체 형태를 사용할 수 있다.
    //  - webSocket은 브라우저의 api이므로, 어떤 언어에서 사용될지 판단하면 안됨.


    const msg = {
        type, payload, 
        //nickName
    }
    return JSON.stringify(msg);
}

socket.addEventListener("open", ()=>{
    console.log("Connected to Server");
});

socket.addEventListener("message", (message)=>{
    // console.log(`Got this: ${message.data} from Server`);
    const li = document.createElement("li");
    // const data = JSON.parse(message.data);
    // li.innerText = `${data.nickName}: ${data.payload}`;
    li.innerText = `${message.data}`;
    messageList.append(li);
});

socket.addEventListener("close", ()=>{
    console.log("Disconnected from Server");
});

// setTimeout(()=>{
//     socket.send("hello from the browser");
// }, 1000);

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
    const li = document.createElement("li");
    li.innerText = `You : ${input.value}`;
    messageList.append(li);
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    // nickName = input.value;
}

messageForm.addEventListener("submit", handleSubmit);
nickForm. addEventListener("submit", handleNickSubmit);
*/