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
                console.log(err);
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
                console.log(err);
            }
        });
        // .run(`
        // INSERT INTO user (login_name)
        // VALUES ('Ismail El Shinnawy');
        // `, [], (err) => {
        //     if(err){
        //         console.log(err);
        //     }
        // });
        // .run(`
        // INSERT INTO item (text, user_id)
        // VALUES ('Some random text to test', 1),
        // ('Some random text to test', 1),
        // ('Some random text to test', 1),
        // ('Some random text to test', 1),
        // ('Some random text to test', 1);
        // `, [], (err) => {
        //     if(err) {
        //         console.log(err);
        //     }
        // })
        // .all(`
        // SELECT
        //     *
        // FROM
        //     item;
        // `, [], (err, rows) => {
        //     if(err){
        //         console.log(err);
        //         return;
        //     }
            
        //     rows.forEach(row => {
        //         console.log(`${row.text} ${row.user_id}`);
        //     });
        // });
});

module.exports = db;