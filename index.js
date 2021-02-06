const express = require('express');
const socket = require('socket.io');

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

app.use(express.static('public'));

const io = socket(server);
io.on('connection', (socket)=>{
    console.log('user connected');
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
});

app.get('/', (req, res) =>{
    res.sendFile('index.html');
});