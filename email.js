/**
 * Created by 崔晋瑜 on 2017/5/20.
 */
// 开启一个 SMTP 连接池
var sendEmail=function sendEmail(message) {
    var nodemailer = require("nodemailer");
    var smtpTransport = require('nodemailer-smtp-transport');
    var transport =  nodemailer.createTransport(smtpTransport({
        host: "smtp.qq.com", // 主机
        secureConnection: true, // 使用 SSL
        port: 465, // SMTP 端口
        auth: {
            user: "857353825@qq.com", // 账号
            pass: "xkdeejjiflavbcdc" // 密码
        }
    }));

// 设置邮件内容
    var mailOptions = {
        from: "义疗预约小助手 <857353825@qq.com>", // 发件地址
        to: "2510271615@qq.com", // 收件列表
        subject: "义疗小屋", // 标题
        html: '<p>'+message.name+message.phone+message.Class+message.School+message.QQ+message.Question+'</p>'// html 内容
    }
// 发送邮件
    transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
            console.log("发送的信息为："+message)
        }
        transport.close(); // 如果没用，关闭连接池
    });
}
module.exports=sendEmail;
