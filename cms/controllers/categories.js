import Category from '../models/Category.js'

export default {

    renderCreateForm: (req, res) => {
        res.render('categories/create')
    },

    categoryCreate: async (req, res) => {

        let category = new Category({ title: req.body.title })

        try {
            category = await category.save()
            res.redirect('/dashboard/categories')
        } 
        catch (e) {
            console.log(e);
            res.render('index/index')
        } 
    },

    categoryDelete: async (req, res) => {
        await Category.findByIdAndDelete(req.params.id)
        res.redirect('/dashboard/categories')
    }
    
}

