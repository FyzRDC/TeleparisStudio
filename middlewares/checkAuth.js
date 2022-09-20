const jwt = require('jsonwebtoken');
const manageUsers = require('../middlewares/manageUsers');

const loggedData = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.render(req.route.path.substring(1), req.user = {
            id: "none"
        });
    }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.render(req.route.path.substring(1), req.user = {
                    id: "none"
                });
            }
            return res.render(req.route.path.substring(1), req.user = {
                id: user
            });
            next();
        })
}

const dashboard = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.redirect('/')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.redirect('/')
        }

        /*
        TODO :
        Make a loop with every images to display with the API,
        maybe check if image is default
        or customised and add buttons to delete and modify
         */
        return res.render(req.route.path.substring(1), req.user = {
            id: user,
         });
        next();
    })
}

const users = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.redirect('/')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.redirect('/')
        }
        if(user.isAdmin !== 1) {
            return res.redirect('/')
        }
        const users_list = manageUsers.getAllUsers();
        return res.render(req.route.path.substring(1), req.user = {
            id: user,
            users: users_list
        });
        next();
    })
}

const onlyAdmin = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.redirect('/')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.redirect('/')
        }
        if(user.isAdmin !== 1) {
            return res.redirect('/')
        }
        return res.render(req.route.path.substring(1), req.user = {
            id: user
        });
        next();
    })
}

const getUser = (req) => {
    const token = req.cookies.access_token;
    if(!token) {
        return "none";
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            console.log(err);
            return "none";
        }
        return user;
    })
    return "none";
}

 const blockToLogged = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.redirect('login')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.redirect('login')
        }
        return res.render(req.route.path.substring(1), req.user = {
            id: user
        });
        next();
    })
}

exports.dashboard = dashboard;
exports.getUser = getUser;
exports.users = users;
exports.onlyAdmin = onlyAdmin;
exports.blockToLogged = blockToLogged;
exports.loggedData = loggedData;