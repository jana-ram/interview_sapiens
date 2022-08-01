const { themeValidation , verifyToken } = require("../middleware");
const { update } = require("../controllers/theme.controller");

module.exports = function(app) {
  app.put("/api/theme", [
    verifyToken,
    themeValidation
],update);
};
