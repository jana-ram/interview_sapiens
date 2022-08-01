const { loginValidation } = require("../middleware");
const { login } = require("../controllers/auth.controller");

module.exports = function(app) {
  app.post("/api/auth/signin", [loginValidation],login);
};
