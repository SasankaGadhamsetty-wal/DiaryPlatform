const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        console.log(token)
        res.status(401).json({ message: 'Authorization Header Missing' });
    }
    try {
        const decodedToken = jwt.verify(token, 'secret123');
        console.log(decodedToken);
        next();
    } catch (error) {
        console.log(token);
        res.status(500).json({ message: 'Invalid token' });
    }
};