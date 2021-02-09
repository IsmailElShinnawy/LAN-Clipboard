const { Pool } = require('pg');
// const Cursor = require('pg-cursor');

const pool = new Pool(); // creates a pool object with the configurations from the .env file

async function create_users_table(client) {
    // check if users table exists and if not create it
    const check_users_query = `
    SELECT EXISTS(
        SELECT FROM information_schema.tables
        WHERE table_name = 'users'
    );
    `;
    client
        .query(check_users_query)
        .then(res => {
            if (!res.rows[0].exists) {
                const create_users_query = `
                CREATE TABLE users(
                    user_id SERIAL,
                    login_name VARCHAR(50),
                    CONSTRAINT pk_users PRIMARY KEY(user_id)
                );
                `;
                client
                    .query(create_users_query)
                    .then(() => {
                        console.log('users table created successfully.');
                    })
                    .catch(err => {
                        console.log('create_users', err);
                    })
            }
        })
        .catch(err => {
            console.log('check_users', err);
        })
}

async function create_item_table(client) {
    // check if item table exists and if not create it
    const check_items_query = `
    SELECT EXISTS(
        SELECT FROM information_schema.tables
        WHERE table_name = 'item'
    );
    `;

    client
        .query(check_items_query)
        .then(res => {
            if (!res.rows[0].exists) {
                const create_items_query = `
                CREATE TABLE item(
                    item_id SERIAL,
                    text VARCHAR,
                    timestamp TIMESTAMP,
                    user_id INTEGER,
                    CONSTRAINT pk_item PRIMARY KEY(user_id, item_id),
                    CONSTRAINT fk_user_id_item FOREIGN KEY(user_id) REFERENCES users(user_id)
                );
                `;
                client
                    .query(create_items_query)
                    .then(() => {
                        console.log('item table created successfully.');
                    })
                    .catch((err) => {
                        console.log('create_item', err);
                    });
            }
        })
        .catch(err => {
            console.log('check_item', err);
        });
}

// pool connects to DB and creates users and item tables
pool.connect()
    .then((client) => {
        create_users_table(client)
            .then(() => {
                create_item_table(client)
                    .then(() => { });
            });
    })
    .catch(err => {
        console.log(err);
    });
    // .finally(() => {
    //     pool.end();
    // });


module.exports = pool;