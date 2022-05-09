import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String }
})

export default mongoose.model('User', userSchema)