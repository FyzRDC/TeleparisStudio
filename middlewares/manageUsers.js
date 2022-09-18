const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const getAllUsers = () => {
    console.log("getAllusers");
    db.query('SELECT * FROM users WHERE isAdmin = 0', async (error, results) => {
        if (error) {
            console.log(error);
        }
        return results;
    });
}

exports.getAllUsers = getAllUsers;