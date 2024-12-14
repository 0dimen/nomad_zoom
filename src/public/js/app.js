// 프론트엔드에서 실행.

const socket = new WebSocket(`ws://${window.location.host}`); // socket : 서버로 연결

socket.addEventListener("open", ()=>{
    console.log("Connected to Server");
});

socket.addEventListener("message", (message)=>{
    console.log(`Got this: ${message.data} from Server`);
});

socket.addEventListener("close", ()=>{
    console.log("Disconnected from Server");
});

setTimeout(()=>{
    socket.send("hello from the browser");
}, 1000);