const db = require('../model/database');

const login_index = (req, res) => {
    res.render('login', {err: ''});
}

const login_check_credinitials = (req, res) => {
    const loginName = req.body.loginName; 
    const serverPassword = req.body.serverPassword;
    if(serverPassword !== process.env.SERVER_PASSWORD){
        res.render('login', {err: 'Wrong server password, please try again.'});
    } else {
        // check if a user with the same name already exists
        db.get(`
        SELECT
            1
        FROM
            user
        WHERE
            login_name = (?) COLLATE NOCASE;
        `, [loginName], (err, row) => {
            if(err){
                console.log(err);
                return;
            }
            // if user exists then display error else insert new record into database
            if(row){
                res.render('login', {err: 'A user already exists with the same name'})
            }else{
                db.run(`
                INSERT INTO user(login_name)
                VALUES (?);
                `, [loginName], (err) => {
                    if(err){
                        console.log(err);
                        return;
                    }
                    db.get(`
                    SELECT
                        user_id
                    FROM
                        user
                    WHERE
                        login_name = (?);
                    `, [loginName], (err, row) => {
                        if(err) {
                            console.log(err);
                            return;
                        }
                        req.session.user_id = row.user_id;
                        res.redirect('/items');
                    })
                });
            }
        });
    }
}


module.exports = {
    login_index,
    login_check_credinitials,
}
