const jwt = require('jsonwebtoken');

const createToken = user => {
    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    return accessToken;
}

const authRole = role => {
    return (req, res, next) => {
        var userRole = typeof req.user?.role === 'undefined' ? '' : req.user.role;
        console.log('current user role: ' + userRole);
        
        if (userRole != role){
            console.log("You don't have acces in this page");
            res.redirect('/dashboard');
        }
        else next();
    };
}

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies['accessToken'];

    if (typeof accessToken !== 'undefined'){
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
            if (!err){
                console.log('token verified!');
                req.user = authData.user;
                console.log("user: ");
                console.log(req.user);
                next();
            }
            else {
                console.log('Session invalid/expired, need to login again');
                res.clearCookie('accessToken');
                res.redirect('/login');
            }
        });
    }
    else {
        console.log("Need to login first.");
        res.redirect('/login');
    } 
}

module.exports = {
    createToken,
    authRole,
    verifyToken
}