import Post from '../models/Post.js'
import Category from '../models/Category.js'
import Comment from '../models/Comment.js'

export default {
    
    index: async (req, res) => {
        const posts = await Post.find({status: 'public'}).sort({creation_date: 'desc'}).limit(3)
        res.render('index/index', { posts })
    },
    
    dashboard: async (req, res) => {
        const posts = await Post.find({ user: req.user.id }).sort({ creation_date: 'desc' }).populate('category').exec()
        res.render('dashboard/index', { posts })
    },
    
    dashboardPosts: async (req, res) => {
        const posts = await Post.find().sort({ creation_date: 'desc' }).populate('category').populate('user').exec()
        res.render('dashboard/posts/table', { posts })
    },

    dashboardCategories: async (req, res) => {
        const categories = await Category.find().sort({creation_date: 'desc'})
        res.render('dashboard/categories/table', { categories })
    },
    
    dashboardComments: async (req, res) => {
        
        const comments = await Comment.find().sort({ creation_date: 'desc' })
        .populate('user')
        .populate('post')
        .exec()

        res.render('dashboard/comments/table', { comments })
    },
}