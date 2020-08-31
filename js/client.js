const socket=io('http://localhost:8000');

//Get DOM elements in respective js variables
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');

const messageContainer=document.querySelector(".container");

//audio that will play on recieving msgs
var audio =new Audio('../ring.mp3');

//funtion which will append event info to the container
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();
    }


}

//ask for new user his/her name and let the server
const name=prompt("enter your name to join");
socket.emit('new-user-joined',name);

//if a new user joins, recive user name from the server
socket.on('user-joined',name=>{
    append(`${name} : joined the chat`,`right`);

})

//if server send a msgs, receive it
socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,`left`);

})

//if a user leave the chat, append the info to the conatiner
socket.on('leave',name=>{
    append(`${name}: left the chat`,`right`);

});

//if the form gets submitted send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})