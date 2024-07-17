const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'author_id',
});

User.hasMany(Post, {
    foreignKey: 'author_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

User.hasMany(Comment, {
    foreignKey: 'author_id',
});