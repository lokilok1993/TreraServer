
const jwt = require('jsonwebtoken');

const authError = (res) =>
    res.status(401).json({
        message: "Ошибка авторизации"
    })



module.exports = (req, res, next) => {
    try{
        if(!req.headers.authorization) return authError(res);
        const token = req.headers.authorization
        req.userData = jwt.verify(token, process.env.JWT_KEY)
        next();
    }catch(error){
        return authError(res)
    }
};