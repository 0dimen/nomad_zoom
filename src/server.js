// 백엔드에서 실행.
import http from 'http';
import WebSocket,{WebSocketServer} from 'ws';
import path from 'path';
import express from 'express';

const __dirname = path.resolve();

const app = express(); // node_modules에서 express 모듈을 사용한다.

app.set("view engine", "pug"); // view 엔진 설정
app.set("views", __dirname + "/src/views"); // 템플릿 위치 설정
app.use("/public", express.static(__dirname + "/src/public")); // public url 설정을 통해 사용자에게 파일 공유.
app.get('/', (req, res) => res.render('home')); // home.pug 파일 렌더링.
app.get("/*", (req,res) => res.redirect("/"));

const handleListen = () => console.log('Listening to http://localhost:3000');
// app.listen(3000, handleListen);

const server = http.createServer(app); // http 서버 생성.
const wss = new WebSocketServer({server}); // http 서버에 WebSocket 서버 얹기 -> 동일한 포트에서 ws, http request 처리 가능.

// function handleConnection(socket){
//     // socket : 연결된 브라우저
//     console.log(socket);
// }

wss.on("connection", (socket)=>{
    console.log("Connected to Browser"); // 브라우저와 연결된 경우 출력
    socket.on("close", ()=>{ // 브라우저에서 창을 닫는 경우,
        console.log("Disconnected from Browser");
    })
    socket.on("message", (message)=>{ // 브라우저에서 메세지를 받는 경우,
        console.log(`Got this: ${message} from Browser`);
    })
    socket.send("hello"); // 브라우저에 메세지 전송
});

server.listen(3000, handleListen); // http 서버에 access