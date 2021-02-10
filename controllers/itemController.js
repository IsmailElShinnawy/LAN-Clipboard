const db = require('../model/database');

const items_index = (req, res) => {
    db.all(`
    SELECT
        I.text,
        I.timestamp,
        U.login_name
    FROM
        item I
    INNER JOIN user U
        ON I.user_id = U.user_id;
    `, [], (err, rows) => {
        if(err){
            console.log(err);
            return;
        }
        res.render('index', {content: rows});
    })
}


module.exports = {
    items_index,
}