const mysql = require("mysql");
const XMLHttpRequest = require('xhr2');
const {logout} = require("../controllers/auth");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const getActiveUser = () => {
    db.query('SELECT actualProduction FROM data LIMIT 1', (error, results) => {
        if (error) {
            console.log(error);
            return null;
        }
        if(results.length != 1) {
            return null;
        }
        db.query('SELECT * FROM users WHERE id = ?', [results[0]], (error, results) => {
            if(error) {
                return null;
            }
            if(results.length == 1) {

                let id = results[0].id;
                let name = results[0].name;
                let email = results[0].email;

                return {id:id, name:name, email:email};
            }
            return null;
        })
    });
}


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


exports.getActiveUser = getActiveUser;
exports.getAllUsers = getAllUsers;