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
            user_id
        FROM
            user
        WHERE
            login_name = (?) COLLATE NOCASE;
        `, [loginName], (err, row) => {
            if(err){
                console.log(err);
                return;
            }
            // if user exists then login in else insert new record into database
            if(row){
                req.session.user_id = row.user_id;
                req.session.login_name = loginName;
                res.redirect('/items');
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
                        req.session.login_name = loginName;
                        res.redirect('/items');
                    })
                });
            }
        });
    }
}

const logout = (req, res) => {
    req.session.user_id = null;
    req.session.login_name = null;
    res.redirect('/users/login');
}

const user_delete = (req, res) => {
    const deleteid = req.params.id;
    if(req.session.user_id != deleteid){
        res.redirect('/items');
    } else {
        db.serialize(() => {
            db
                .run(`
                DELETE FROM user
                WHERE user_id = ?;
                `, [deleteid], (err) => {
                    if(err){
                        console.log(err);
                        return;
                    }
                })
                .run(`
                DELETE FROM item
                WHERE user_id = ?
                `, [deleteid], (err) => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                    res.json({ 
                        redirect: '/users/logout',
                    });
                });
        });
    }
}


module.exports = {
    login_index,
    login_check_credinitials,
    logout,
    user_delete,
}
