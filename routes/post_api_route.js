const mongoose = require('mongoose');
const Posts = mongoose.model('Post');

module.exports = app => {
  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await Posts.find({ _user: req.user.id });
      res.status(200).send(posts)
    } catch (e) {
      res.sendStatus(404);
    }
  });

  app.post('/api/posts', async (req, res) => {
    const { title, coordinates, description } = req.body;
    const newPost = new Posts({
      title,
      coordinates,
      description,
      _user: req.user.id
    });
    try {
      await newPost.save();
      res.sendStatus(200);
    } catch (e) {
      res.status(400).send(e);
    }
  });
}