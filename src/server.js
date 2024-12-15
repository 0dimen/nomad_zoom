// 백엔드에서 실행.
import http from 'http';
// import WebSocket,{WebSocketServer} from 'ws';
import {Server} from 'socket.io';
import path from 'path';
import express from 'express';

const __dirname = path.resolve();

const app = express(); // node_modules에서 express 모듈을 사용한다.

app.set("views", __dirname + "/src/views"); // 템플릿 위치 설정
app.use("/public", express.static(__dirname + "/src/public")); // public url 설정을 통해 사용자에게 파일 공유.
app.get('/', (req, res) => res.sendFile(__dirname + '/src/views/home1.html')); // HTML 파일 직접 전송
app.get("/*", (req,res) => res.redirect("/"));

const handleListen = () => console.log('Listening to http://localhost:3000');
// app.listen(3000, handleListen);

const httpServer = http.createServer(app); // http 서버 생성.
// const wss = new WebSocketServer({server}); // http 서버에 WebSocket 서버 얹기 -> 동일한 포트에서 ws, http request 처리 가능.
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket)=>{
    console.log(socket);
})


// function handleConnection(socket){
//     // socket : 연결된 브라우저
//     console.log(socket);
// }

/*
const sockets = [];
wss.on("connection", (socket)=>{
    sockets.push(socket);
    socket["nickname"] = "Anonymous";
    console.log("Connected to Browser"); // 브라우저와 연결된 경우 출력
    socket.on("close", ()=>{ // 브라우저에서 창을 닫는 경우,
        console.log("Disconnected from Browser");
    })
    socket.on("message", (msg)=>{ // 브라우저에서 메세지를 받는 경우,
        // console.log(`Got this: ${message} from Browser`);
        const message = JSON.parse(msg);
        switch (message.type){
            case "new_message":
                sockets.forEach((aSocket) => {
                    // if(aSocket !== socket) // 본인 소켓을 제외한 모든 소켓에 전송.
                    aSocket.send(`${socket["nickname"]}: ${message.payload}`);
                })
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                break;
        }
        // socket.send(message.toString()); // 브라우저에 받았던 메시지 전송.
    })
    // socket.send("hello"); // 브라우저에 메세지 전송
});
*/

httpServer.listen(3000, handleListen); // http 서버에 access
