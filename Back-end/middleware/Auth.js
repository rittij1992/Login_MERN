const jwt = require('jsonwebtoken');

exports.auth = (req, res, next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message: 'Token not found'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id;
        next();
    } catch (error) {
        res.status(401).json({message: error.message});
    }
};