var PORT = process.env.PORT;
const io = require('socket.io')(PORT);



const users = {};
io.on('connection', (socket) => {
socket.on('add-new-user',(name) =>{
 users[socket.id] = name;
//  console.log(socket.id);
socket.broadcast.emit('user-joined',name);
});

socket.on('send',(message)=>{
  // console.log(message);
socket.broadcast.emit('message_recived',{name:users[socket.id],message:message});
});

socket.on('disconnect',()=>{
  socket.broadcast.emit('user-leaved',{name: users[socket.id]});
});


});

