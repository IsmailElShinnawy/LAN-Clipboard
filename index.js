const express = require('express');
const socketio = require('socket.io');
require('dotenv').config();

const app = express(); // creates an Express App
const PORT = process.env.PORT || 3000; // sets PORT number to the enviroment PORT if available or 3000

// app listens to request made on the PORT specified and returns a server object
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`listening on PORT ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const io = socketio(server);
io.on('connection', (socket)=>{
    console.log(`user ${process.env.USERNAME} connected`);
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });
});

const content = [
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
    {
        text:'Magna est eu deserunt ipsum sunt. Fugiat veniam duis nulla ipsum qui sunt aliqua deserunt aute sint adipisicing pariatur nostrud. Ipsum ad Lorem pariatur ex voluptate. Sunt adipisicing elit excepteur sit aliqua commodo ad anim Lorem velit sit veniam ipsum.',
        user: 'Ismail El Shinnawy',
        timestamp: '01/01/2021 11:59 PM'
    },
]

app.get('/', (req, res) =>{
    res.render('index', {content});
});