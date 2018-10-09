const jwt = require('jsonwebtoken')
const UserModel= require('../models/userModel');
const isLogin = (req, res, next) => {
  let token = req.headers.token

  if (token) {
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    
    UserModel.findOne({email:decoded.email})
         .then(result=>{  
            console.log(result.email)
            req.curent_user_id=result._id; 
            req.params.decoded=decoded
            req.body.decoded = decoded
            next()
         })
         .catch(err=>{
             res.status(500).json({ message: err.message})
         })
    // req.params.decoded=decoded
    // req.body.decoded = decoded
        //must check database
    //next()
  } else {
    res.status(500).json({
        status: 'failed',
        message: 'you need to login first'
    })
  }
}

module.exports = isLogin