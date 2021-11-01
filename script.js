const socket= io('http://localhost:8000');

const names=prompt('Enter Your Name');

socket.emit('new-user', names);
