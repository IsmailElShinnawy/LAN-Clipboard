const db = require('../model/database');

const items_index = (req, res) => {
    if(!req.session.user_id){
        res.redirect('/login');
        return;
    }
    db.all(`
    SELECT
        I.item_id,
        I.text,
        datetime(I.timestamp, 'localtime') AS timestamp,
        U.login_name
    FROM
        item I
    INNER JOIN user U
        ON I.user_id = U.user_id
    ORDER BY
        timestamp DESC;
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
            VALUES (?, ?);
            `, [text, req.session.user_id], (err) => {
                if (err) {
                    console.log(err);
                }
            })
            .all(`
            SELECT
                I.item_id,
                I.text,
                datetime(I.timestamp,'localtime') AS timestamp,
                U.login_name
            FROM
                item I
            INNER JOIN user U
                ON I.user_id = U.user_id
            ORDER BY
                timestamp DESC;
            `, [], (err, rows) => {
                if (err) {
                    console.log(err);
                    return;
                }
                res.render('index', { content: rows });
            });
    });
}

const item_delete = (req, res) => {
    const delete_id = req.params.id;
    db.serialize(() => {
        db
            .run(`
            DELETE FROM item
            WHERE item_id = ?;
            `, [delete_id], (err) => {
                if (err) {
                    console.log(err);
                }
            })
            .all(`
            SELECT
                I.item_id,
                I.text,
                datetime(I.timestamp,'localtime') AS timestamp,
                U.login_name
            FROM
                item I
            INNER JOIN user U
                ON I.user_id = U.user_id
            ORDER BY
                timestamp DESC;
            `, [], (err, rows) => {
                if (err) {
                    console.log(err);
                    return;
                }
                res.json({ redirect: '/items' });
            });
    });
}


module.exports = {
    items_index,
    item_paste_post,
    item_delete,
}