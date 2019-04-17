const express= require('express')
const bodyparser= require('body-parser')
const cors=require('cors')
const PORT=3000
const api=require('./routes/api')
const app= express()
app.use(cors())
app.use(bodyparser.json());
app.use('/api',api)
app.get('/',function(req, res){
    res.send('Hello from server');
})
app.listen(PORT,function(req, res){
    console.log('Server Running on localhost:'+ PORT);
})




