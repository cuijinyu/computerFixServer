/**
 * Created by 崔晋瑜 on 2017/5/19.
 */
var mongoose=require("./db.js");
const Schema=mongoose.Schema;
var Problem=new mongoose.Schema({
    problemname:{type:String},
    solveway:{type:String}
});
module.exports=mongoose.model('Problem',Problem);