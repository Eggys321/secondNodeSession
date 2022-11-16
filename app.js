// =======================EXPRESS SET-UP==========================================
// --First require express
// --Then invoke

// const express = require('express');
// const app = express()

// app.get('/', (req,res)=>{
//     res.send('hello')
    
// })
// app.listen(4000)

// =======================SENDING HTML============================================
// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World</h1>')
// })
// app.listen(4000)

// ===========================SENDING HTML FILES=====================================
// When sending an html file,do below
// We use res.sendFile()
// And u mux indicate d path otherwise express picks absolute path of ur system,to solve this,please do below
// res.sendFIle('./',{root:__dirname})--first quote is d html file path
// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {
// //   res.send('<h1>Hello World</h1>')
// res.sendFile('./views/index.html', {root:__dirname})
// })
// app.listen(4000)
// =============================ROUTING TO OTHER HTML FILES=========================
const express = require('express')
const app = express()


// app.get('/', (req, res) => {
//   //   res.send('<h1>Hello World</h1>')
//   res.sendFile('./views/index.html', { root: __dirname })
// })
// app.get('/about', (req, res) => {
//   //   res.send('<h1>Hello World</h1>')
//   res.sendFile('./views/about.html', { root: __dirname })
// })

// ==========================REDIRECT===============================================
// app.get('/', (req, res) => {
//   //   res.send('<h1>Hello World</h1>')
//   res.sendFile('./views/index.html', { root: __dirname })
// })
// app.get('/about', (req, res) => {
//   //   res.send('<h1>Hello World</h1>')
//   res.sendFile('./views/about.html', { root: __dirname })
// })
// app.get('/about-us', (req, res) => {
//   //   res.send('<h1>Hello World</h1>')
//   res.redirect('/about')
// })
// ==============404 PAGE===========================================================
// app.get('/', (req, res) => {
//   //   res.send('<h1>Hello World</h1>')
//   res.sendFile('./views/index.html', { root: __dirname })
// })
// app.get('/about', (req, res) => {
//   //   res.send('<h1>Hello World</h1>')
//   res.sendFile('./views/about.html', { root: __dirname })
// })
// app.get('/about-us', (req, res) => {
//   //   res.send('<h1>Hello World</h1>')
//   res.redirect('/about')
// })
// app.use((req, res) => {
//   //   res.send('<h1>Hello World</h1>')
//   res.sendFile('./views/404.html', {root:__dirname})
// })
// ========================VIEW ENGINE===================================================
// --We have been sending static files ever since,lets render dynamic values
// --There are many view engines in express,but we wud use Ejs,see below on its installaton
// --Goto npmjs.com/package/ejs,u wud see how to install and use it
// To install,type in ur terminal npm install ejs
// --To use,type app.set('view engine',ejs)
// --We render() and not sendFile() 
const News = require('./models/news')

// app.get('/add-new', (req,res)=>{
//     const NEWS = new News({
//         title:'latest news2',
//         snippet:'about my news',
//         body:'more news'
//     })
//     NEWS.save()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })

// })
// To get all d data
// app.get('/all-news', (req,res)=>{
//    News.find()
//    .then((result)=>{
//     res.send(result)
//    })
//    .catch((err)=>console.log(err))

// })
// To get a single data
// app.get('/single-news', (req,res)=>{
//    News.findById('631ed77bc8c660ed6f270666')
//      .then((result) => {
//        res.send(result)
//      })
//      .catch((err) => console.log(err))

// })
require('dotenv/config')
const mongoose = require('mongoose')
const DbUrl =
  process.env.DBURI;
  mongoose
    .connect(DbUrl)
    .then((result) =>  {
        console.log('DB CONNECTED SUCCESSFULLY'),
         app.listen(4000)
    } )
    .catch((err) => console.log(err))
 app.set('view engine','ejs')

//  const morgan = require('morgan')
//  app.use(morgan('dev'))
app.use(express.static('public'))
//  app.use((req,res,next)=>{
//     console.log('Hey a new request has just been made: ');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next()

//  })
 
//  app.set('views','view')--incase u dnt use a views folder
app.get('/', (req, res) => {
    
// res.render('/',{title:'My Blog',News})
News.find()
.then((result)=>{
    res.render('index',{title:'My Blog',News:result})
})
})
// =================================POST REQUEST==========================
// Now we use app.post('')
// Ensure dt d name attribute on d form is same as d key property used in d newSchema
// Also we need a middleware dt wud attach body to d req,see below
// app.use(express.urlencoded())
app.use(express.urlencoded({extended:true}))
app.post('/',(req,res)=>{
    // console.log(req.body);
    const singleNews = new News(req.body)
    singleNews.save()
    .then((rr)=>{
        res.redirect('/')
    })
    .catch((err)=>console.log(err))
 

})


app.get('/index/:id',(req,res)=>{
    const id = req.params.id
    News.findById(id)
    .then((Result) => {
        res.render('details',{News:Result,title:'details page'})
    })
    .catch((err)=>console.log(err))
    
    // console.log(id);
})
app.delete('/index/:id', (req, res) => {
  const id = req.params.id
  News.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/' })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/about', (req, res) => {
    //   res.send('<h1>Hello World</h1>')
    //   res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About My Blog' })
})
app.get('/about-us', (req, res) => {
    //   res.send('<h1>Hello World</h1>')
    // res.redirect('/about')
    res.redirect('about')
})
app.get('/new-blog', (req, res) => {
    //   res.send('<h1>Hello World</h1>')
    // res.redirect('/about')
    res.render('new-blog', { title: 'New Blog' })
})
app.use((req, res) => {
    //   res.send('<h1>Hello World</h1>')
    // res.sendFile('./views/404.html', {root:__dirname})
    res.render('404', { title: 'Error Page' })
})