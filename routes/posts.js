const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
// const Post = require('../models/Post');

// GETs back all the posts
router.get('/', async (req, res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    } catch(err){
        console.log(err);
    }
});

// GETs back a specific post
router.get('/:postID', async (req, res)=>{
    try{
        const specificPost = await Post.findById(req.params.postID);
        res.json(specificPost);
    } catch(err){
        console.log(err);
    }
});

router.get('/specific', (req,res)=>{
    res.send('Specific posts');
});
// POSTs a post
router.post('/', (req, res)=>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    })

    post.save()
    .then(data=>{
        res.json(data);
    }).catch(err=>{
        // res.json({message: err});
        console.log(err);
    })
});

// DELETE a specific post
router.delete('/:postID', async (req, res)=>{
    try{
        const removedPost = await Post.remove({_id: req.params.postID});
        res.json(removedPost);
    } catch(err){
        res.json({message: err});
    }
});

// UPDATE a specific post
router.patch('/:postID', async (req, res)=>{
    try{
        const updatedPost = await Post.updateOne({_id: req.params.postID}, {$set :{title: req.body.title, description: req.body.description}});
        res.json(updatedPost);
    } catch(err){
        res.json({message: err});
    }
});

module.exports = router; 