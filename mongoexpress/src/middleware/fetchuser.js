const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Angularexpress'; 

const fetchuser = (req, res, next) => {
    //Get the user from JWT token and add id to request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: 'Please authenticate using valid token'});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch(err) {
        res.status(401).send({error: 'Please authenticate using valid token'});
    }
}
module.exports = fetchuser;