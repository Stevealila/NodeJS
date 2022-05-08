import Post from '../models/Post.js'
import Category from '../models/Category.js'

export default {
    
    index: async (req, res) => {
        const posts = await Post.find().sort({creation_date: 'desc'}).limit(3)
        res.render('index/index', { posts })
    },
    
    dashboard: (req, res) => {
        // res.render('dashboard/index', { username: req.user.username })
        res.render('dashboard/index')
    },
    
    dashboardPosts: async (req, res) => {
        const posts = await Post.find().sort({ creation_date: 'desc' })

        res.render('dashboard/posts/table', { posts })
    },
    dashboardCategories: async (req, res) => {
        const categories = await Category.find().sort({creation_date: 'desc'})
        res.render('dashboard/categories/table', { categories })
    }
}