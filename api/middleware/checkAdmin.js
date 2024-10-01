const jwt = require('jsonwebtoken')


module.exports = (req,res,next)=>{
  console.log(req.headers.authorization)
  try{
  const token =req.headers.authorization.split(" ")[1];
  const verify = jwt.verify(token,'i am sumit')
  console.log(verify);
  if(verify.userType == 'admin')
  {
    next()
  }
  else
  {
    return res.status(401).json({
      error:'user is not valid'
    })
  }
  }
  catch(err)
  {
    return res.status(401).json({
      message:'not valid user'
    })
  }
}