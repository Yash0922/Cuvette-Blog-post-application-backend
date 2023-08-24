const express = require('express');
const router = express.Router();
const Post = require('../Model/post');
const Comment = require('../Model/comment');
router.get('/Getposts', async (req, res) => {
  const posts = await Post.findAll({
    include: Comment,
  });
  res.json(posts);
});

router.post('/posts', async (req, res) => {
  const { title, content ,avatar} = req.body;
  try {
    const post = await Post.create({ title, content,avatar });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put('/posts/:uuid', async (req, res) => {
    const postId = req.params.uuid;
    const { title, content, avatar } = req.body;
    
    try {
      const [rowsUpdated] = await Post.update(
        { title, content, avatar },
        { where: { uuid: postId } }
      );
      
      if (rowsUpdated === 0) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        const updatedPost = await Post.findOne({ where: { uuid: postId } });
        res.status(200).json(updatedPost);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  router.delete('/posts/:uuid', async (req, res) => {
    const postUuid = req.params.uuid;
  
    try {
      const rowsDeleted = await Post.destroy({ where: { uuid: postUuid } });
  
      if (rowsDeleted === 0) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.post('/posts/:uuid/comments', async (req, res) => {
    const postUuid = req.params.uuid;
    const { text } = req.body;
  
    try {
      const post = await Post.findOne({ where: { uuid: postUuid } });
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
  
      const comment = await Comment.create({ text, postId: post.id }); 
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  router.get('/posts/:uuid/getComments', async (req, res) => {
    const postUuid = req.params.uuid;
  
    try {
      const post = await Post.findOne({ where: { uuid: postUuid } });
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
      }
  
      const comments = await Comment.findAll({ where: { postId: post.id } });
      res.status(200).json(comments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;
