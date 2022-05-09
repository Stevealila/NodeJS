import Post from '../models/Post.js'
import Category from '../models/Category.js'

export default {

    renderCreateForm: async (req, res) => {
        const categories = await Category.find({})

        res.render('posts/create', {categories })
    },
    
    postCreate: async (req, res) => {
        const { title, status, category, _body } = req.body
        
        let post = new Post({ title, status, category, _body, user: req.user.id })
        
        try {
            post = await post.save()
            res.redirect('/dashboard/posts')
        } 
        catch {
            res.render('posts/create')
        } 
    },
    
    renderEditForm: async (req, res) => {
        const post = await Post.findById(req.params.id).populate('category')
        const categories = await Category.find({})

        res.render('posts/edit', { post, categories })
    },

    readOnePost: async (req, res) => {
        const post = await Post.findById(req.params.id)

        res.render('index/read_single_post', { post })
    },

    postEdit: async (req, res) => {
        let post = await Post.findById(req.params.id)

        post.title = req.body.title_update
        post.status = req.body.status_update
        post.category = req.body.category_update
        post._body = req.body._body_update
        post.user = req.user.id

        try {
            post = await post.save()
            res.redirect('/dashboard/posts')
        } 
        catch {
            res.render('posts/edit')
        } 
    },

    postDelete: async (req, res) => {
        
        await Post.findByIdAndDelete(req.params.id)
        res.redirect('/dashboard/posts')

    }
    
}

