const pool = require('../model/database');

const items_index = (req, res) => {
    pool.connect()
        .then(client => {
            const get_all_items_query = `
            SELECT
                I.text,
                I.timestamp,
                U.login_name
            FROM
                item I
            INNER JOIN users U USING(user_id);
            `;
            client
                .query(get_all_items_query)
                .then((result) => {
                    res.render('index', {content: result.rows});
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
        // .finally(() => {
        //     pool.end();
        // });
}


module.exports = {
    items_index,
}