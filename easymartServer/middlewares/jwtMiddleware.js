const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {

    try {
        const token = req.headers['authorization'].split(' ')[1];
        // console.log("token::",token);
        const jwtResponse = jwt.verify(token,process.env.SECRET_KEY);
        req.payload = jwtResponse.userId;
        next()  
    }
    catch (err) {
        res.status(401).json('Authorization Failed')
    }
}
module.exports = jwtMiddleware;