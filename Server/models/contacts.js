const mongoose=require('mongoose')

const Schema=mongoose.Schema
const contactSchema=new Schema({
    contactid:String,
    contactname:String,
    contactphonenumber:Number,
    contactaddress:String,
    jobfunction:String,
    customerrelationship:String,
    status:Number

})
module.exports=mongoose.model('contact',contactSchema,'Contacts')