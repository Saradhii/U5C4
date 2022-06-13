const mongoose = require("mongoose");
const {Schema,model} = require("mongoose");
const connection = mongoose.connect("mongodb://localhost:27017/news");

const NewsSchema =Schema({
    Title:String,
    Description:String,
    Date:String,
    Author:{type:[String]},
    Location:{type:[String]},
    tags:{type:[String]},
    total_views:Number,
    category:String,
})

const News = model("news",NewsSchema);
module.exports = {News,connection};