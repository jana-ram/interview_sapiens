process.env.NODE = "development";
process.env.PORT = PORT = 3000;
const express = require("express");
const app = express();
const { crosSetup , userSeed } = require('./app/index');
try{
  crosSetup(app); // cros setup
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
  });
  require('./app/routes/index')(app); // web service routes
  userSeed(); // seed initial data for database
} catch(e){
  throw new Error('sorry something went to wrong!'); 
}