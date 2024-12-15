// 프론트엔드에서 실행.

const socket = io();

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