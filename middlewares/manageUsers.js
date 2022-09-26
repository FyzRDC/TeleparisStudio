const mysql = require("mysql2");
const XMLHttpRequest = require('xhr2');
const {logout} = require("../controllers/auth");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})


let getActiveUser = async () => {
    let result;
    db.promise().query('SELECT actualProduction FROM data LIMIT 1').then((results, error) => {
        if (error) {
            return null;
        }
        if(results.length == 0) {
            console.log(results)
            console.log("Uh oh")
            return null;
        }
        console.log("Error ? : "+error);
        console.log(results[0]);
        result = results[0];
        return result;
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