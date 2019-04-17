const mongoose=require('mongoose')
const schema=mongoose.Schema
const nominationschema=new schema({
    customerid:String,
    phonenumber:Number,
    customername:String,
    address:String,
    loginid:String,
    industry:String,
    contactid:String,
    contactphonenumber:Number,
    contactname:String,
    contactAddress:String,
    jobfunction:String,
    customerrelationship:String,
    id:Number,
    tier1:String,
    tier2:String,
    tier3:String,
    transactionid:String,
    createdby:String,
    description:String,
    status:Number,
    jobfunction:String,
    day:Number,
    month:String,
    year:Number,
    custcall:Boolean,
    custmarket:Boolean,
    customerdigital:Boolean,
    nomineezip:[Object],
    notes:String
})
module.exports=mongoose.model('Nominee',nominationschema,'Nominations')