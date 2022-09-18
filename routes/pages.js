const express = require('express');
const checkAuth = require("../middlewares/checkAuth");
const manageUsers = require("../middlewares/manageUsers");

const router = express.Router();

router.get('/',checkAuth.loggedData,( req, res) => {
    res.render('index');
})

router.get('/login',checkAuth.loggedData, (req, res) => {
    res.render('login');
})

router.get('/register', checkAuth.onlyAdmin,(req, res) => {
    res.render('register');
})

router.get('/dashboard', checkAuth.blockToLogged, (req, res) => {
    res.render('dashboard');
})

router.get('/users', checkAuth.onlyAdmin, (req, res) => {
    const all = manageUsers.getAllUsers;
    res.render('users', { users: ["Test", "test2"] });
})

module.exports = router;