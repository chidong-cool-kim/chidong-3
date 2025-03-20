const socket = io();  // Socket.io 서버에 연결

// 메시지 보내기 버튼 클릭 시 이벤트
document.getElementById('sendButton').addEventListener('click', () => {
    const msg = document.getElementById('message').value;
    if (msg.trim()) {
        socket.emit('chat message', msg);  // 서버로 메시지 전송
        saveMessageLocally(msg);  // 로컬 스토리지에 메시지 저장
        document.getElementById('message').value = '';  // 입력창 비우기
    }
});

// 서버로부터 메시지 수신 후 화면에 출력
socket.on('chat message', (msg) => {
    displayMessage(msg);
});

// 로컬 스토리지에 메시지 저장
function saveMessageLocally(message) {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.push(message);
    localStorage.setItem('messages', JSON.stringify(savedMessages));
}

// 로컬 스토리지에서 이전 메시지 불러오기
window.onload = () => {
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.forEach(msg => {
        displayMessage(msg);
    });
};

// 메시지 화면에 출력
function displayMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('message-box'); // 메시지 박스를 추가
    div.textContent = msg;

    // 메시지에 '내 메시지'가 포함되면 본인 메시지로 간주
    if (msg.includes('내 메시지')) {
        div.classList.add('my-message');
    }

    document.getElementById('messages').appendChild(div);

    // 메시지 리스트의 마지막으로 스크롤을 자동으로 내리기
    const messagesContainer = document.getElementById('messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;  // 항상 마지막 메시지로 스크롤
}

// 우클릭 메뉴 생성
function createContextMenu(event, div, msg) {   
    const menu = document.createElement('div');
    menu.classList.add('context-menu');
    menu.style.left = `${event.pageX}px`;
    menu.style.top = `${event.pageY}px`;

    const deleteOption = document.createElement('div');
    deleteOption.classList.add('delete-option');
    deleteOption.textContent = '삭제';

    menu.appendChild(deleteOption);
    return menu;
}
