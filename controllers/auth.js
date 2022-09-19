const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const {httpOnly} = require("express-session/session/cookie");
const checkAuth = require("../middlewares/checkAuth");
const pages = require("../routes/pages");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    const {name, email, password, passwordConfirm} = req.body;

    if(!name || !email || !password || !passwordConfirm)             return res.render('register', {
        message: 'Tout les champs doivent être complétés'
    })

    db.query('SELECT mail FROM users WHERE mail = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
             router.get('/register',checkAuth.loggedData, (req, res) => {
             return   res.render('register', {
                    message: 'L\'adresse mail est déjà utilisée !'
                })
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', checkAuth.onlyAdmin, {
                message: 'Les mot de passes ne correspondent pas'
            });
        }
        let hashPwd = await bcrypt.hash(password, 8);

        db.query('INSERT INTO users SET ? ', {isAdmin: 0, name: name, mail: email, password: hashPwd}, async (error, result) => {
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

exports.logout = (req, res) => {
    res.clearCookie('access_token');
    return res.redirect('/');
}

exports.login = (req, res) => {
    const {email, password} = req.body;

    if(!email || !password)return res.render('login', {
        message: 'Tout les champs doivent être complétés'
    })

    db.query('SELECT * FROM users WHERE mail = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0 && bcrypt.compareSync(password, results[0].password)) {

            const isAdmin = results[0].isAdmin;
            const name = results[0].name;
            const id = results[0].id;

            const token = await jwt.sign({ id,name,email, isAdmin }, process.env.JWT_SECRET, { expiresIn: 3600000})
            res.cookie('access_token', token, {
                httpOnly: true
            });
            return res.redirect("../dashboard");
        } else {
            return res.render('login', {
                message: 'Le compte est introuvable ou le mot de passe est incorrect.'
            })
        }


    });
}