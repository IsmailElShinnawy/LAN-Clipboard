const db = require('../model/database');

const items_index = (req, res) => {
    db.all(`
    SELECT
        I.text,
        datetime(I.timestamp, 'localtime') AS timestamp,
        U.login_name
    FROM
        item I
    INNER JOIN user U
        ON I.user_id = U.user_id;
    `, [], (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render('index', { content: rows });
    })
}

const item_paste_post = (req, res) => {
    const text = req.body.new_item;
    db.serialize(() => {
        db
            .run(`
            INSERT INTO item (text, user_id)
            VALUES (?, 1);
            `, [text], (err) => {
                if (err) {
                    console.log(err);
                }
            })
            .all(`
            SELECT
                I.text,
                datetime(I.timestamp,'localtime') AS timestamp,
                U.login_name
            FROM
                item I
            INNER JOIN user U
                ON I.user_id = U.user_id;
            `, [], (err, rows) => {
                if (err) {
                    console.log(err);
                    return;
                }
                res.render('index', { content: rows });
            });
    });

}


module.exports = {
    items_index,
    item_paste_post,
}