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

router.get('/dashboard', checkAuth.dashboard, (req, res) => {
    res.render('dashboard');
})

router.get('/users', checkAuth.users, (req, res) => {
    res.render('users');
})

module.exports = router;