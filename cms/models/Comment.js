import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    comment_body: { type: String, required: true },
    is_approved: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    creation_date: { type: Date, default: Date.now },
})

export default mongoose.model('Comment', commentSchema)