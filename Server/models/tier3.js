const mongoose=require('mongoose')

const Schema=mongoose.Schema
const tier3Schema=new Schema({
    tier3:String,

})
module.exports=mongoose.model('tier3',tier3Schema,'Tier3')