const mysql = require("mysql");
const {logout} = require("../controllers/auth");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const getAllUsers = () => {
    let users = [];
    db.query('SELECT * FROM users WHERE isAdmin = 0', (error, results) => {
        if (error) {
            console.log(error);
        }
        for(let j = 0; j < results.length; j++) {
            users.push(results[j]);
        }
    });
    return users;
}

exports.getAllUsers = getAllUsers;