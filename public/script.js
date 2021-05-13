let socket=io();

$('#login').show();
$('#chat_box').hide();
$('#btn_start').click(()=>{
        socket.emit('login',{
        user:$('#inp_user').val(),
        password:$('#password').val()
    })
})
socket.on('msg_got',()=>{
    $('#login').hide();
    $('#chat_box').show();
})
socket.on('login_failed',()=>{
    window.alert("username or password is invalid");
})
$('#btn_send').click(()=>{
    socket.emit('chat',{
        to:$('#send_to').val(),
        msg:$('#inp_msg').val()
    })
})
socket.on('msg_rec',(data,server_map,ID)=>{
    $('#ulist').append($('<li>').text("["+server_map[ID]+"] "+data.msg));
})