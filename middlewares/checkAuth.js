const jwt = require('jsonwebtoken');

 const checkAuth = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.redirect('login')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.redirect('login')
        }
        req.user = {
            id: user
        }
        next();
    })
}



module.exports = checkAuth;