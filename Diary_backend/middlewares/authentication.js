const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(`authHeader:${authHeader}`);
    if(authHeader){
        const token=authHeader.split(" ")[1];
        console.log(`token:${token}`);
    try {
        const decodedToken = jwt.verify(token, 'secret123');
        console.log(decodedToken);
        next();
    } catch (err) {
        console.log(token);
        res.status(401).send({error:err.toString()});
    }
    }
    else{
        console.log("Authorization header missing");
        res.status(401).send({error:"Authorization header missing"});
    }
};