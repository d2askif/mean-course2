const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String,require:true},
  content: String
});

module.exports = mongoose.model('Post', postSchema);
