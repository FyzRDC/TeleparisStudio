const mysql = require("mysql");
const path = require("path");
const fs = require('fs');
const checkAuth = require("../middlewares/checkAuth");
const jwt = require("jsonwebtoken");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.get = (req, res) => {


    const token = req.cookies.access_token;
    if(!token) {
        res.sendFile(path.resolve("upload/default.png"), {
            id: checkAuth.getUser(req)
        });
    } else {

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.sendFile(path.resolve("upload/default.png"), {
                id: checkAuth.getUser(req)
            });
        } else {
            let number = req.query.nb;
            if(fs.existsSync(path.resolve("upload/" + user.id + "/" + number + ".png"))) {

                res.sendFile(path.resolve("upload/" + user.id + "/" + number + ".png"), {
                    id: checkAuth.getUser(req)
                });
            } else {
                res.sendFile(path.resolve("upload/default.png"), {
                    id: checkAuth.getUser(req)
                });
            }
        }
    })
    }
}


exports.delete = (req, res) => {
    const {id_delete} = req.body

    if(checkAuth.getUser(req) !== "none") {
        db.query('DELETE FROM users WHERE id = ?', [id_delete], async (error, results) => {
            if (error) {
                console.log(error);
            }
        })
    }
    res.redirect("/dashboard")
}