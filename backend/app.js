const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const postRoutes     = require('./routes/posts')
const app = express();

mongoose.connect('mongodb+srv://daniel:ict4rd2012*@cluster0-j7d3x.mongodb.net/node-angular?retryWrites=true')
.then(()=>{
  console.log('connected to MongoDb');
}).catch(()=>{
  console.log('Connection to MDB failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next) => {
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers',
'Origin,X-Requested-with,Content-Type, Accept');
res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,PUT,DELETE,OPTIONS');
next();
})

app.use('/api/posts', postRoutes)

module.exports = app;
