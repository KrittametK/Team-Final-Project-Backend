// module.exports = (app.db) => 
//const jwt = require("jsonwebtoken")
const passport = require("passport")
//const config = require("")

module.exports = (app, db) => {

    app.post('/register',(req,res, next) => {
        passport.authenticate('register',(err,user,info) => {
            if (info !== undefined ) {
                console.error(info.message);
                res.status(403).send(info.message)
            } else {
                user.update({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                    address: req.body.address,
                    district: req.body.district,
                    province: req.body.province,
                    user_image: req.body.user_image,

                })
                .then(result => {
                    console.log('user created in db')
                    res.status(200).send({message:'user created'})
                })
                .catch(err => {
                    console.erroe(err)
                    res.status(400).send({message:err.message})
                })
            }
        })(req,res,next)
    })

}