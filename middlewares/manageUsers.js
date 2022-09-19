const mysql = require("mysql");
const XMLHttpRequest = require('xhr2');
const {logout} = require("../controllers/auth");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const MAX_ELEMENTS = 20;

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

const testURL = (id, number) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/action/get");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if(xhr.status === 404) {
                return false;
            }
            return true;
        }};



    let data = "{\"id\":\""+id+"\", \"number\":"+number+"}";

    xhr.send(data);
}

const getAllElements = (req, id) => {
    let elements = []
    for(let j = 0; j < MAX_ELEMENTS; j++) {
        if(testURL(id, j)) {
            elements.push(j);
        }
    }
    return elements;
}

exports.getAllElements = getAllElements;
exports.getAllUsers = getAllUsers;