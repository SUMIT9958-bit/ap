const express = require('express');
const app = express();
const mongosse = require('mongoose')
const bodyParser = require('body-parser')
const {urlencoded,json} = require('body-parser')
const blogRoute = require('./api/routes/blog')
const categoryRoute = require('./api/routes/category')
const authRout = require('./api/routes/auth')
const commentRout = require('./api/routes/comment')
const cors = require('cors')
mongosse.connect('mongodb+srv://ksumit83794:pLQEjF64Wbdg41em@sumit-pro-db.esnqj.mongodb.net/?retryWrites=true&w=majority&appName=sumit-pro-db')
mongosse.connection.on('connected',()=>{
  console.log('connected wih database')
})
mongosse.connection.on('error',(err)=>{
  console.log('connection failed')
  console.log(err)
})
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())

app.use('/blog',blogRoute)
app.use('/category',categoryRoute)
app.use('/auth',authRout)
app.use('/comment',commentRout)

app.use((req,res)=>{
  res.status(200).json({
   msg:'bad request'
  })
})












module.exports = app;