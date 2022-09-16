const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body);

    const {name, email, password, passwordConfirm} = req.body;

    db.query('SELECT mail FROM users WHERE mail = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'L\'adresse mail est déjà utilisée !'
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Les mot de passes ne correspondent pas'
            });
        }
        let hashPwd = await bcrypt.hash(password, 8);

        db.query('INSERT INTO users SET ? ', {name: name, mail: email, password: hashPwd}, (error, result) => {
            if(error) {
                console.log(error);
            } else{
                return res.render('register', {
                    message: 'Utilisateur inscrit !'
                });
            }
        })

    });
}