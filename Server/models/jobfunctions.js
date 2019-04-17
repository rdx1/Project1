const mongoose=require('mongoose')

const Schema=mongoose.Schema
const jfSchema=new Schema({
    jobfunction:String,

})
module.exports=mongoose.model('jobfunction',jfSchema,'Jobfunctions')