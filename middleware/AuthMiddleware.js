const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: "Access denied, token missing" });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Access denied, token missing" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Access denied, invalid token" });
    }
};
module.exports = verifyToken;
