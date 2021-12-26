// Node server which will handle socket.io
const io=require('socket.io')(8000,{cors:{origin:'*',}});  // there we are hiring the socket.io and 8000 is a port 

const user={};

io.on('connection', socket=>{                // it is for connect everyone
    socket.on('new-user',name=>{             // it is for give the update to the other users about message and joining
        user[socket.id]=name;
        socket.broadcast.emit('new-user-joined',name);
    });
    
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:user[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    })
})