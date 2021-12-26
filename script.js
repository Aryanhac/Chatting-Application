

const socket= io('http://localhost:8000');            // to connect to the server
const names=prompt('Enter Your Name');
socket.emit('new-user', names);

const messageContainer=document.querySelector('.box');
const form=document.getElementById('send-container');

let audio=new Audio('./alerttone/ting.mp3');

const append1=(message)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('rightbox');
    messageContainer.append(messageElement);
}
const append2=(message)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('leftbox');
    messageContainer.append(messageElement);
    audio.play();
}
const append3=(message)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('middlebox');
    messageContainer.append(messageElement);
}
let mess;
function getValue(){
    mess=document.getElementById('send').value;
}

socket.on('new-user-joined',data=>{
    append3(`${data} joined the chat`);
})

form.addEventListener('submit',(e)=>{
      e.preventDefault();
      let mess=document.getElementById('input').value;
      append1(`You:${mess}`);
      socket.emit('send',mess);
      document.getElementById('input').value=null;
})
socket.on('receive',data=>{
    append2(`${data.name}: ${data.message}`)
})

socket.on('left',user=>{
    append3(`${user} has left`);
})