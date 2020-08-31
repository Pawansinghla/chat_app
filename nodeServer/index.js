//Node Server which will handle socket io  connections
//to start server use nodemon index.js
const io=require('socket.io')(8000)

const  users={};
io.on('connection',socket=>{
    //if any new user joins, let other users connected to the server know!
    socket.on('new-user-joined',name=>{
      //  console.log("NEW USER",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    //if someone send a message, braodtcast it to other people
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
//if someone leave the chat, let other know
//desconnect is built-in event
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id]
    });
})

