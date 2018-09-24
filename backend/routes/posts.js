const express = require('express');
const router  = express.Router();
const Post       = require('../models/post')


router.post('', (req,res,next) => {
  const post = new Post({
    title:req.body.title,
    content: req.body.content
  });
  post.save().then((cretedPost) =>{
    res.status(201).json({
      message:'Post added succesfully!',
      postId: cretedPost._id
    });
    });

});

// update post route
router.put('/:id', (req,res,next) => {
  const updatedPost = new Post({
   _id:req.body.id,
   title: req.body.title,
   content: req.body.content
  });
  Post.updateOne({_id:req.params.id}, updatedPost).then((result) =>{
    res.status(200).json({
      message: "Update successful"
    });
  }).catch(() => {
 console.log('update error');
  })
})

//get All post route
router.get('',(req,res,next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message:"success",
      posts: documents
   });
  });
});

// get a single post route
router.get('/:id',(req,res,next) => {
  Post.findById(req.params.id).then((result) => {
   if(result){
  res.status(200).json(result);
   } else {
  res.status(404).json({
    message: "post not found"
  });
}
  });

});

//delete post
router.delete('/:id',(req,res,next) => {
  Post.deleteOne({_id:req.params.id}).then(() => {
    res.status(200).json({
      message : 'delete sucessfull'
    });
  });
});

module.exports = router;
