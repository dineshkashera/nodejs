const socket = io();//create new instance

//receive the data from server using the same event
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
    console.log(welcomeMsg);
});

document.querySelector('.chatboard form').addEventListener('submit',(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Form submitted');
    let getMessage = formData.get('message');
    socket.emit('SendMessage',getMessage, (handshaking) => {
        console.log(handshaking);//Means: message is received.
    });
})