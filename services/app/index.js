const bodyParser = require('body-parser');
const db = require("./models");
var bcrypt = require("bcryptjs");
var cors=require('cors');
const crosSetup = app =>  {
    try {

        app.use(cors({origin:true,credentials: true}));
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader(
                'Access-Control-Allow-Methods',
                'OPTIONS, GET, POST, PUT, PATCH, DELETE'
            );
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        app.use(bodyParser.json({limit: '1024mb'}));
        app.use(bodyParser.urlencoded({extended: true, limit: '1024mb', parameterLimit: 50000}));
    } catch(e){
        throw new Error('sorry something went to wrong!'); 
    }
}
const userSeed = () =>{    
    try {
        const User = db.user;
        db.sequelize.sync();
        // force: true will drop the table if it already exists
        db.sequelize.sync({force: true}).then(() => {
            console.log('Drop and Resync Database with { force: true }');        
            User.create({
                username: "janakiraman",
                password : bcrypt.hashSync("11223344", 8),
                isActive : true
            });
            User.create({
                username: "sapiens",
                password : bcrypt.hashSync("welcome@123", 8),
                isActive : true
            });
            User.create({
                username: "virat",
                password : bcrypt.hashSync("virat@123", 8),
                isActive : true
            });
        });
    }catch(e){
        throw new Error('sorry something went to wrong!'); 
    }
}
module.exports = {
    crosSetup,
    userSeed
}
