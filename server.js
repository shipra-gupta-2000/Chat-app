const http=require('http');
const express=require('express');
const app=express();
const socketio=require('socket.io');
const server=http.createServer(app);
const io=socketio(server);

let users={
}
let server_map={
}
connects=(s,u)=>{
    s.join(u)
    s.emit('msg_got')
    server_map[s.id]=u;
}
io.on('connection',(socket)=>{
    console.log("connected to socket with socket id "+socket.id);
    
    socket.on('login',(data)=>{
        if(users[data.user])
        {
            if(users[data.user]==data.password)
            {
               connects(socket,data.user);
            }else{
                socket.emit('login_failed');
            }
        }else{
            users[data.user]=data.password;
            connects(socket,data.user);
        }
    })
    socket.on('chat',(data)=>{
        if(data.to)
        {
           io.to(data.to).emit('msg_rec',data,server_map,socket.id);
        }
        else
        {
           io.emit('msg_rec',data,server_map,socket.id)
        }
    })
})
app.use('/',express.static(__dirname+'/public'));
server.listen(3344,()=>{
    console.log('listening on port '+'localhost:3344');
})