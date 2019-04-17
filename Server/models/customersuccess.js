const mongoose=require('mongoose')

const Schema=mongoose.Schema
const customersuccessSchema=new Schema({
    customerid:String,
    customername:String,
    phonenumber:Number,
    address:String,
    email:String,
    industry:String,
    contactid:String,
    contactname:String,
    contactphonenumber:Number,
    contactaddress:String,
    jobfunction:String,
    customerrelationship:String,
    transactionid:String,
    createdBy:String,
    day:Number,
    month:String,
    year:Number,
    description:String,
    measurementid:String,
    legacyid:String,
    downloadpath:[Object],
    status :Number

})
module.exports=mongoose.model('customersuccess',customersuccessSchema,'CustomerSuccess')