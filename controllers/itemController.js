const db = require('../model/database');

const items_index = (req, res) => {
    if(!req.session.user_id){
        res.redirect('/users/login');
        return;
    }
    db.all(`
    SELECT
        I.item_id,
        I.text,
        datetime(I.timestamp, 'localtime') AS timestamp,
        I.user_id,
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
        res.render('index', { 
            content: rows, 
            current_user: 
                {
                    user_id: req.session.user_id, 
                    login_name: req.session.login_name 
                },
            title: 'Home',
        });
    })
}

const item_paste_post = (req, res) => {
    if(!req.session.user_id){
        res.redirect('/users/login');
        return;
    }
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
                I.user_id,
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
                res.render('index', { 
                    content: rows, 
                    current_user: 
                        {
                            user_id: req.session.user_id, 
                            login_name: req.session.login_name 
                        },
                    title: 'Home',
                });
            });
    });
}

const item_delete = (req, res) => {
    if(!req.session.user_id){
        res.redirect('/users/login');
        return;
    }
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

const items_user_get = (req, res) => {
    if(!req.session.user_id){
        res.redirect('/users/login');
        return;
    }
    const user_id = req.params.id;
    db.all(`
    SELECT
        item_id,
        text,
        timestamp
    FROM
        item
    WHERE
        user_id = ?;
    `, [user_id], (err, rows) => {
        if(err){
            console.log(err);
            return;
        }
        res.render('myClipboard', { 
            content: rows, 
            current_user: 
                {
                    user_id: req.session.user_id, 
                    login_name: req.session.login_name 
                },
            title: 'My Clipboard',
        });
    })
}


module.exports = {
    items_index,
    item_paste_post,
    item_delete,
    items_user_get,
}