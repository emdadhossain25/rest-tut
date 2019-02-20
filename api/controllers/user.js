const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register user
const registerUserController = (req,res,next)=>{

bcrypt.hash(req.body.password, 10, (err,hash)=>{
    if (err) {
        res.json({
            err
        })
    }

    let user = new User({
        email:req.body.email,
        password:hash
    })

    user.save()
        .then(result=>{
            res.status(200).json({
                message:'user created successfully',
                original:user.password,
                user:result
            })
        })
        .catch(error=>{
            res.json({
                error
            })
        })
})
}

// login controller

const loginController = (req,res,next)=>{
    let email = req.body.email;
    let password = req.body.password;

   User.findOne({email})
        .then(user=>{
            if (user) {
                bcrypt.compare(password,user.password,(err,reaction)=>{
                    if (err) {
                        res.json({
                            message:'login failed'
                        })
                    }
                    if(reaction){
                        let token = jwt.sign({email: user.email, _id: user._id},'SECRET',{expiresIn:"2h"})
                        res.json({
                            message:'successful login',
                            token
                        })
    
                    }
                    else{
                        res.json({
                            message:'Password do not match'
                        })
                    }
                })
            }else{
                res.json({
                    message:'User Not Found'
                })
            }
            
        })
        .catch(err=>{
            res.json({
                err
            })
        })  
}


//get all user controller
const getAllusers = (req,res,next)=>{
    let password = req.body.password;
    User.find()
        .then(result=>{
            res.json({
                result
                
                
            })
        
        })
        .catch(err=>{
            res.json({
                err
            })
        })
}

module.exports = {
    registerUserController,
    loginController,
    getAllusers
}