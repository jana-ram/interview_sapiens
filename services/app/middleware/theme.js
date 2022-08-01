const themeValidation = (req, res, next) => {
    try {
      const {
        guid,
        theme
      } = req.body;
      if(guid === ""){
        res.status(400).send({
          success : 0,
          message: "Failed! User is mandatory!"
        });
        return;
      }  
      if(theme === ""){
        res.status(400).send({
          success : 0,
          message: "Failed! Theme is mandatory!"
        });
        return;
      }
      next();
    } catch(e){
      throw new Error('sorry something went to wrong!'); 
    }
  };
  module.exports = {
    themeValidation
  };
  