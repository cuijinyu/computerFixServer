/**
 * Created by 崔晋瑜 on 2017/5/15.
 */
var mongoose=require("./db.js");
const Schema=mongoose.Schema;
var Order=new mongoose.Schema({
   name:{type:String,default:"匿名用户"},//姓名
     phone:{type:String},    //手机号码
    School:{type:String},   //所在学院
    Class:{type:String},    //所在年级
    QQ:{type:Number},       //QQ号码
    Question:{type:String}  //碰到的问题
});
module.exports=mongoose.model('Order',Order);