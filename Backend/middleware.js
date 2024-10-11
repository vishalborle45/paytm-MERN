const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    console.log(token)

    try {
        const decoded = await jwt.verify(token,JWT_SECRET);
        console.log(decoded)
        req.userId = decoded.user;

        next();
    } catch (err) {
        return res.status(403).json({
            message : "jwt verification failed"
        });
    }
};

module.exports = {
    authMiddleware
}