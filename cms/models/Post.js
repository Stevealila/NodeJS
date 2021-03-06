import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    _body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    creation_date: { type: Date, default: Date.now },
    comments: [ 
        { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
    ],
})
    
export default mongoose.model('Post', postSchema)