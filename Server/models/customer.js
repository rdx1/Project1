const mongoose=require('mongoose')

const Schema=mongoose.Schema
const customerSchema=new Schema({
    customerid:String,
    customername:String,
    phonenumber:Number,
    address:String,
    email:String,
    industry:String,
    status:Number

})
module.exports=mongoose.model('customer',customerSchema,'Customers')