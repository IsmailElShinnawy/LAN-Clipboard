require('dotenv').config();
const express = require('express');
const session = require('express-session');
const itemsRouter = require('./routes/itemRoutes');
const loginRouter = require('./routes/loginRoutes');

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
app.use(session({
    secret: process.env.SESSION_SECRET || 'averyhardtoguesssecretstring'
}));

// renders index file when root is requested
app.get('/', (req, res) =>{
    res.redirect('/login');
});

app.use('/items', itemsRouter);
app.use('/login', loginRouter);

