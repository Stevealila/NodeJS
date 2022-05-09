import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export default {
    
    commentCreate: async (req, res) => {
        const post = await Post.findById(req.params.id)

        const comment_body = req.body.comment_body
        const isApproved = req.body.is_approved ? true : false
        
        let comment = new Comment({ comment_body, is_approved: isApproved, user: req.user.id, post: req.params.id})
        
        try {

            comment = await comment.save()
            post.comments.push(comment._id)
            res.redirect(`/posts/one/${post._id}`)
        } 
        catch {
            res.render('index/index')
        } 
    }
    
}

