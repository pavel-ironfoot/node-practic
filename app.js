const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');


const app = express();

app.set('view engine', 'ejs');

const PORT = 8000;
const db = 'mongodb+srv://Pavel-Ironfoot:Yanad-Durinul13@cluster0.e1fzadk.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res)=> console.log('Connected to DB'))
    .catch((error)=> console.log(error));


app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port:localhost:${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false}));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

// порядок роутов имеет значение
app.get('/',(req,res)=>{
    const title = 'Home';
    // res.send('<h1>Hello world</h1>');
    res.render(createPath('index'),{title});
});


app.get('/about-us',(req,res)=>{
    res.redirect('/contacts');
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

////это мы все непонятные адреса будем отлавливать
app.use((req,res)=>{
    const title = 'Error page';
    // res.statusCode = 404;
    res.status(404).render(createPath('error'),{ title });
});

