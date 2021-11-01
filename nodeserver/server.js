// Node server which will handle socket.io
const io=require('socket.io')(8000,{cors:{origin:'*',}});  // there we are hiring the socket.io and 8000 is a port 

const user={};

io.on('connection', socket=>{
    socket.on('new-user',name=>{
        console.log("user name: " +name);
        user[socket.id]=name;
        socket.broadcast.emit('new-user-joined',name);
    });
    
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:user[socket.id]})
    });
})