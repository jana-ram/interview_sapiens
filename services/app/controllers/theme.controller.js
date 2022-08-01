const db = require("../models");
const User = db.user;
const update = (req, res) => {
  try {
    const {
        userGuid,
        theme
    } = req.body;
    // User exists checking
    User.findOne({
        where: {
            id: userGuid
        }
    }).then(user => {
        if (!user) {
            res.status(400).send({
                success : 0,
                message: "Failed! Invalid user!"
            });
        } else {
            User.update(
                {
                    theme : theme
                },
                {
                    where : {
                        id :userGuid
                    }
                }
            ).then((user)=>{
                if(user)
                    res.status(200).send({ 
                        message: "theme updated successsfully!",
                        success : 1
                    });
                else
                    res.status(400).send({ 
                        message: "Unable to update theme!",
                        success : 0
                    });
            }).catch(err => {
                res.status(500).send({                 
                    message: "sorry! something went wrong",
                    success : 0
                });
            });
        }
    });
  } catch(e){
    throw new Error('sorry something went to wrong!'); 
  }
};
module.exports = {
    update
}
