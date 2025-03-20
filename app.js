const express = require("express");
const http = require("http");
const path = require("path");
const dbConnect = require("./dbConnect");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const socketIo = require("socket.io");

// 라우터 임포트
const { router_start, router_lunch, router_login, router_sign, router_teacher, router_event, router_alert, router_talk, router_suggest } = require('./view/router/router_1');

// Express 앱 설정
const app = express();

// HTTP 서버 설정 (Socket.io와 함께 사용)
const server = http.createServer(app);
const io = socketIo(server); // Socket.io 연결

// 데이터베이스 연결
dbConnect();

// Express 서버 미들웨어 설정
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'view', 'error')));
app.use(express.static(path.join(__dirname, 'view', 'start')));
app.use(express.static(path.join(__dirname, 'view', 'lunch')));
app.use(express.static(path.join(__dirname, 'view', 'mong')));
app.use(express.static(path.join(__dirname, 'view', 'koong')));
app.use(express.static(path.join(__dirname, 'view', 'teacher')));
app.use(express.static(path.join(__dirname, 'view', 'event')));
app.use(express.static(path.join(__dirname, 'view', 'alert')));
app.use(express.static(path.join(__dirname, 'view', 'suggest')));
app.use(express.static(path.join(__dirname, 'view', 'talk')));
app.use(express.static(path.join(__dirname, 'view', 'error_1')));

// 라우터 설정
app.use("/lunch", router_lunch);
app.use("/login", router_login);
app.use("/sign", router_sign);
app.use("/teacher", router_teacher);
app.use("/event", router_event);
app.use("/alert", router_alert);
app.use("/suggest", router_suggest);
app.use("/talk", router_talk);
app.use("/start", router_start);

// 웹소켓 연결 처리
io.on('connection', (socket) => {
    console.log('새로운 사용자 연결됨');

    // 클라이언트로부터 받은 채팅 메시지 처리
    socket.on('chat message', (msg) => {
        console.log('메시지:', msg);
        
        // 연결된 모든 클라이언트에게 메시지 전송
        io.emit('chat message', msg);
    });

    // 클라이언트와 연결이 끊어졌을 때
    socket.on('disconnect', () => {
        console.log('사용자 연결 종료');
    });
});

// 서버 시작 (웹소켓과 Express 서버 동시에 실행)
server.listen(3000, () => {
    console.log("서버가 http://localhost:3000 에서 실행 중");
});
