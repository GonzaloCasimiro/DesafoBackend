console.log('bienvenido al chat')
const socket=io();

const input=document.getElementById('message');
const messageList=document.getElementById('list-message')
input.addEventListener('keyup',e =>{
    if(e.key==='Enter'){
        socket.emit('mensaje_cliente',input.value)
        input.value=""
    }
})
socket.on('messages_server',data=>{
    console.log(data);
})
/*
socket.emit('message',"esto es data en forma de string")
socket.on('socket_individual',data=>{
    console.log(data)
})
socket.on('para_todos_menos_el_actual',data=>{
    console.log(data)
})
socket.on('evento_para_todos',data=>{
    console.log(data);
})
*/
