import Comment from '../models/Comment.js'

export const allComments = (req, res) => {
    res.render('admin/comments/all')
}

export const getComment = (req, res) => {
    res.render('admin/comments/create')
}

export const postComment = async (req, res) => {

    const { comment_body, is_approved } = req.body

    const commentsApproved = is_approved ? true: false

        let comment = new Comment({ comment_body, is_approved: commentsApproved, user: req.user.username })

        try {

           comment = await comment.save()
           req.flash('sucess_alert', 'comment created successfully!')
           res.redirect('/admin/dashboard')

           console.log(comment);
            
        } catch (e) {
            console.log(e);
            req.flash('failure_alert', 'Failed to create a comment..')
            res.render('admin/dashboard')
        }

    
}