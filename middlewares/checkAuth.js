const jwt = require('jsonwebtoken');

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

exports.onlyAdmin = onlyAdmin;
exports.blockToLogged = blockToLogged;
exports.loggedData = loggedData;