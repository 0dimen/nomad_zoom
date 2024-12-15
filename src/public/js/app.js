// 프론트엔드에서 실행.

const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`); // socket : 서버로 연결

let nickName= '';

function makeMessage(type, payload, nickName){ // Object -> String 
    const msg = {
        type, payload, nickName
    }
    return JSON.stringify(msg);
}

socket.addEventListener("open", ()=>{
    console.log("Connected to Server");
});

socket.addEventListener("message", (message)=>{
    // console.log(`Got this: ${message.data} from Server`);
    const li = document.createElement("li");
    const data = JSON.parse(message.data);
    
    li.innerText = `${data.nickName}: ${data.payload}`;
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
    socket.send(makeMessage("new_message", input.value, nickName));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    // socket.send(makeMessage("nickname", input.value));
    nickName = input.value;
}

messageForm.addEventListener("submit", handleSubmit);
nickForm. addEventListener("submit", handleNickSubmit);