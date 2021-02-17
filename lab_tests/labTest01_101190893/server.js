const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Establishing a connection with mongoBD
const mongoPath = 'mongodb+srv://test:sahil678@cluster0.m8vkf.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true });

const messageSchema = mongoose.Schema({
    from_user: String,
    room: String,
    message: String
});

const messageModel = mongoose.model('message', messageSchema);

//Setting static folder
app.use(express.static(path.join(__dirname, 'public')));

const chatBot = 'Chat app bot';

// Run when a user connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Welcome user
        socket.emit('message', formatMessage( chatBot, 'Welcome to chat app :)' ));

        // Broadcast message when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage( chatBot, `${user.username} has joined the chat` ));

        // Sending users and room info
        io.to(user.room).emit('roomUsers', { room: user.room, users: getRoomUsers(user.room) });
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit('message', formatMessage( chatBot, `${user.username} has left the chat` ));

            // Sending users and room info
            io.to(user.room).emit('roomUsers', { room: user.room, users: getRoomUsers(user.room) });
        }
    });

    // Listening for chat message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage( user.username, msg ));

        let sendToDB = {
            from_user: user.username,
            room: user.room,
            message: msg
        }
        
        new messageModel(sendToDB).save();
    });
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));