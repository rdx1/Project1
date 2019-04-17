const mongoose=require('mongoose')

const Schema=mongoose.Schema
const tier2Schema=new Schema({
    tier2:String,

})
module.exports=mongoose.model('tier2',tier2Schema,'Tier2')