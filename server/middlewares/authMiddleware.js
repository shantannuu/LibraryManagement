const jwt = require("jsonwebtoken")

module.exports = function(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token)
        const decoded = jwt.verify(token,process.env.jwt_token);
        // console.log(decoded.userId)
        if (decoded.userId) {
            req.body.userIdFromToken = decoded.userId;
            next();
        } else {
            return res.send({
                success: false,
                message: "Invalid token",
            })
        }
    } catch (error) {
        console.log("hello")
        return res.send({
            success: false,
            message: error.message,
        })
    }
}