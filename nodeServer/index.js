//Node Server which will handle socket io  connections

const io=require('socket.io')(8000)

const  users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('
})

