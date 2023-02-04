const jwt = require('jsonwebtoken');
const JWT_SECRITE = "Tahoorahmed+1"
const fetchuser = (req, res, next) => {
    // get user from jwt token to get user id & add it in ot req obj
    const token = req.header('auth-token')
    if(!token) {
        res.status(400).send({ err: "authenticat with a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRITE)
    
        req.user = data.user
        next()
     
    } catch (err) {
        res.send(err)
    }


}
module.exports=fetchuser