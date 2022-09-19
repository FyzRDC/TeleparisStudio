const mysql = require("mysql");
const checkAuth = require("../middlewares/checkAuth");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.delete = (req, res) => {
    const {id_delete} = req.body
    db.query('DELETE FROM users WHERE id = ?', [id_delete], async (error, results) => {
        if (error) {
            console.log(error);
        }
    })
    res.redirect("/dashboard")
}