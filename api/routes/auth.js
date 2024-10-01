const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../model/auth')
const mongoose= require('mongoose')
const jwt = require('jsonwebtoken')


//user signup
router.post('/user/signup',(req,res)=>{
bcrypt.hash(req.body.password,10,(err,hash)=>{
  if(err)
  {
    return res.status(500).json({
      error:err
    })
  }
  else
  {
    const user = new User({
      _id:new mongoose.Types.ObjectId,
      fullName:req.body.fullName,
      email:req.body.email,
      password:hash
    })
    user.save()
    .then(result=>{
      res.status(200).json({
        newUser:result
      })
    })
    .catch(error=>{
      console.log(err)
      res.status(500).json({
        error:error
      })
    })
  }
})
})

// user login
router.post('/user/login',(req,res)=>{
  User.find({email:req.body.email})
  .then(user=>{
    if(user.length<1)
    {
      return res.status(404).json({
        message:'user not found'
     })
    }
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
      if(!result)
      {
        return res.status(401).json({
          message:"passwor matching failed"
        })
      }
      const token = jwt.sign({
        email:user[0].email,
        fullName:user[0].fullName,
        userType:'user'
       },
       'i am sumit',
       {
          expiresIn:'1d'
       })
       res.status(200).json({
        email:user[0].email,
        fullName:user[0].fullName,
        token:token
       })
    })
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      error:err
    })
  })
})

//admin login
router.post('/admin/login',(req,res)=>{
  if(req.body.userName == 'sumit@123' && req.body.password =='123456')
  {
    const token = jwt.sign({
      email:'sumit@gmail.com',
      fullName:'sumit kumar',
      userType:'admin'
     },
     'i am sumit',
     {
        expiresIn:'1d'
     })
      return res.status(200).json({
      fullName:'sumit kumar',
      email:'sumit@gmail.com',
      token:token
     })
  }
  res.status(404).json({
    msg:'bad request'
  })
})




module.exports = router;