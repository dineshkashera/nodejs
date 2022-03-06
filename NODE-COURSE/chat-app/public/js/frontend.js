const socket = io();//create new instance
const messageRender = document.querySelector('#messages');
//listener, receive the data from server using the same event
socket.on('countUpdated',(count) => {
    console.log('Count updated',count);
});

const incrementId = document.getElementById('increment');
incrementId.addEventListener('click', () => {
    //send event to server to increment the value
    console.log('Click Increment Count');
    socket.emit('incrementCount');
});

socket.on('welcomeClient', (welcomeMsg) => {
    let p = document.createElement(`p`);
    p.innerHTML = welcomeMsg;
    messageRender.append(p);
});

document.querySelector('.chatboard form').addEventListener('submit',(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form submitted');
    let getMessage = formData.get('message');
    //send message to client
    socket.emit('SendMessage',getMessage, (handshaking) => {
        console.log(handshaking);//Means: message is received.
    });
})