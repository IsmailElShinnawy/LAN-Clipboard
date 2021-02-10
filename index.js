require('dotenv').config();
const express = require('express');
const socketio = require('socket.io');
const itemsRouter = require('./routes/itemRoutes');
// const pool = require('./model/database');

const app = express(); // creates an Express App
const PORT = process.env.PORT || 3000; // sets PORT number to the enviroment PORT if available or 3000

// app listens to request made on the PORT specified
const server = app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const io = socketio(server);
io.on('connection', (socket)=>{
    console.log('user connected');
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });
});

// renders index file when root is requested
app.get('/', (req, res) =>{
    res.redirect('/items');
});

app.use('/items', itemsRouter);

