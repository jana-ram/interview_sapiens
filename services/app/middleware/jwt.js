const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const verifyToken = (req, res, next) => {
  try {
    let authorization = req.headers["authorization"];
    let token = "";
    if(authorization){
      let authorizationStr = authorization.split(" ");
      token = authorizationStr[1];
    }
    if(!token)
      return res.status(403).send({
        message: "No token provided!",
        success  : 403
      });
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
          success  : 401
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch(e){
    throw new Error('sorry something went to wrong!'); 
  }
};

module.exports = {
  verifyToken
}
