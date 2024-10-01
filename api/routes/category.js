const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const category = require('../model/category')
//get category by admin
router.post('/',(req,res)=>{
  console.log(req.body)
  const newCategory = new category({
    _id:new mongoose.Types.ObjectId,
    name:req.body.name,
    imageUrl:req.body.imageUrl
  })
  newCategory.save()
  .then(result=>{
    res.status(200).json({
      new_Category:result
   })
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      error:err
    })
  })
})
// get all Category
router.get('/',(req,res)=>{
  category.find()
  .select('_id name imageUrl')
  .then(result=>{
    res.status(200).json({
      category:result
    })
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      error:err
    })
  })
})


// delete category by id 
router.delete('/:id',(req,res)=>{
  category.deleteOne({_id:req.params.id})
  .then(result=>{
    res.status(200).json({
      deletedData:result
    })
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      error:err
    })
  })
})

//update category
router.put('/:id',(req,res)=>{
  category.updateOne({_id:req.params.id},req.body)
  .then(result=>{
    res.status(200).json({
      updatedData:result
    })
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      error:err
    })
  })
})

// return n latest Category
router.get('/latest-category/:n',(req,res)=>{
  category.find().sort({$natural :-1}).limit(req.params.n)
  .then(result=>{
    res.status(200).json({
      category:result
    })
      })
      .catch(err=>{
        console.log(err)
        res.status(500).json({
          error:err
    })
  })
})


// count all category
router.get('/get/count',(req,res)=>{
  category.find().countDocuments()
  .then(result=>{
    res.status(200).json({
      total:result
    })
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      error:err
    })
  })
})



module.exports=router;