const loginValidation = (req, res, next) => {
  try {
    const {
      username,
      password
    } = req.body;
    if(username === ""){
      res.status(400).send({
        success : 0,
        message: "Failed! Username is mandatory!"
      });
      return;
    }  
    if(password === ""){
      res.status(400).send({
        success : 0,
        message: "Failed! Password is mandatory!"
      });
      return;
    }
    next();
  } catch(e){
    throw new Error('sorry something went to wrong!'); 
  }
};
module.exports = {
  loginValidation
};
