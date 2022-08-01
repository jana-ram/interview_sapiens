module.exports = function(app) {
    app.get("/api", (req,res) =>{
        res.status(200).json({message : 'Welcome..!'});
    });
    app.get("/api/health-check", (req,res) =>{
        res.status(200).json({message : 'version 1.0'});
    });
};
