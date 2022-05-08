import express from "express"
import dotenv from 'dotenv'
if(process.env.NODE_ENV != 'production') dotenv.config()

import mongoose from "mongoose"
import expressLayouts from "express-ejs-layouts"
import passport  from 'passport'
import methodOverride  from 'method-override'
import session  from 'express-session'
import MongoStore from 'connect-mongo'
import flash from 'connect-flash'

// Configurations
import { dbConnection } from './config/db.js'
import { globalVariables } from './middleware/globalVariables.js'
import authenticateUser from './config/passport.js'

// Routes
import indexRoutes from './routes/index.js'
import usersRoutes from './routes/users.js'
import postsRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import categoryRoutes from './routes/categories.js'

const app = express()


dbConnection(mongoose, process.env.mongoURI)
authenticateUser(passport)

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))

app.use(express.urlencoded({ extended: false, limit: '4mb' }))
app.use(express.json({ extended: false }))

// use express sessions
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.mongoURI }),
    cookie: {
        maxAge: 1000* 60 * 60 * 24
    }
}))

// configure passport session & method override
app.use(passport.initialize())
app.use(passport.session())

// Handle put and delete requests
app.use(methodOverride('_method'))

// Handle alerts $$ global variables
app.use(flash())
app.use(globalVariables)

// routing
app.use('/', indexRoutes)
app.use('/users', usersRoutes)
app.use('/posts', postsRoutes)
app.use('/comments', commentRoutes)
app.use('/categories', categoryRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT)