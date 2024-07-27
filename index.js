// node server for handle socket io connections
const io = require('socket.io')(8000, {cors: {origin: "*"}});
const users = {};
io.on('connection',socket=>{
    // if new user joins let other user connected to  the server know
    socket.on('new-user-joined',name=>{
        // console.log('new user',name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    // if someone send a message then broadcast the message to other
    socket.on("send",message=>{
        socket.broadcast.emit('receive',{name: users[socket.id],message: message})
    });
    // if someone send a message then let other know
    socket.on("disconnect",message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})