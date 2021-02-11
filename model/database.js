const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/lan_clipboard.db', (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('connected to DB successfully.');
});

db.serialize(() => {
    db
        .run(`
        CREATE TABLE user(
            user_id INTEGER PRIMARY KEY,
            login_name VARCHAR(50)
        );
        `, [], (err) => {
            if(err) {
                console.log('Table user already exists');
            }
        })
        .run(`
        CREATE TABLE item(
            item_id INTEGER PRIMARY KEY,
            text VARCHAR,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER,
            CONSTRAINT fk_user_id_item FOREIGN KEY (user_id) REFERENCES user (user_id)
        );  
        `, [], (err) => {
            if(err) {
                console.log('Table item already exists');
            }
        });
});

module.exports = db;