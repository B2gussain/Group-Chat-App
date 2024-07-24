const socket = io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageinput=document.getElementById('messageimp')
const messagecontainer=document.querySelector(".container");
var audio=new Audio('tone.mp3');

// function which will append  event info to the container
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position=='left')
    {
        audio.play();
    }
}
// ask new user for his/her name& let the server know
const name=prompt('enter your name to join');
socket.emit('new-user-joined',name);


// if new user joins ,receive his/her name from the server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})

// if server send the message recive it
socket.on('receive',data=>{
    append(`${data.name}:${data.message} `,'left')
})

// if user leave append the info to container
socket.on('left',data=>{
    append(`${name} left the chat `,'right')
})

// if the form gets submited send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageinput.value;
    append(`you:${message}`,'right');
    socket.emit('send',message);
    messageinput.value="";
})