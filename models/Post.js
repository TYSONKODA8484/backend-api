import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 }, // Expire after 7 days
});

postSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL Index
postSchema.index({ title: 'text', content: 'text' }); // Text index for search


const Post = mongoose.model('Post', postSchema);
export default Post;
