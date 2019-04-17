const mongoose=require('mongoose')

const Schema=mongoose.Schema
const tier1Schema=new Schema({
    tier1:String,

})
module.exports=mongoose.model('tier1',tier1Schema,'Tier1')