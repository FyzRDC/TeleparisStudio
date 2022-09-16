const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const {httpOnly} = require("express-session/session/cookie");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body);

    const {name, email, password, passwordConfirm} = req.body;

    if(!name || !email || !password || !passwordConfirm)             return res.render('register', {
        message: 'Tout les champs doivent être complétés'
    })

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

        db.query('INSERT INTO users SET ? ', {name: name, mail: email, password: hashPwd}, async (error, result) => {
            if (error) {
                console.log(error);
            } else {


                return res.render('register', {
                    message: 'Utilisateur inscrit !'
                });
            }
        })

    });
}

exports.login = (req, res) => {
    console.log(req.body);

    const {email, password} = req.body;

    if(!email || !password)return res.render('login', {
        message: 'Tout les champs doivent être complétés'
    })

    db.query('SELECT * FROM users WHERE mail = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0 && bcrypt.compareSync(password, results[0].password)) {

            const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 3600000})
            res.cookie('access_token', token, {
                httpOnly: true
            }).render('login', {
                message: 'Utilisateur connecté !'
            })
        } else {
            return res.render('login', {
                message: 'Le compte est introuvable ou le mot de passe est incorrect.'
            })
        }


    });
}