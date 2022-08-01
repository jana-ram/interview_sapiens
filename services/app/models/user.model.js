module.exports = (sequelize, Sequelize) => {
  try {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      theme: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      }
    });  
    return User;
  } catch(e){
    throw new Error('sorry something went to wrong!'); 
  }
};
