/**
 * Created by 崔晋瑜 on 2017/5/15.
 */
var Order=require('./user');
var Problem=require('./problem')
class Func {
//插入
    insert(information) {
        var order=new Order();
        for(let i in information)
        {
            order[i]=information[i];
        }
        order.save(function (err, res) {
            if (err) {
                console.log("ERRORS" + err);
            } else {
                console.log("RES" + res);
            }
        });
    }

    insertProblem(problem)
    {
        var problems=new Problem();
        for(let i in problem)
        {
            problems[i]=problem[i];
        }
        problems.save(function (err,res) {
            if(err)
            {
                console.log("ERRORS"+err);
            }else
            {
                console.log("RES"+res);
            }
        });
    }

    findAll(information){
        var order=new Order();
        Order.find("",function(req,docx){

        });
        console.log(information);
    }
    del(problemname) {
        var wherestr = {'problemname':problemname};

        Problem.remove(wherestr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            }
            else {
                console.log("Res:" + res);
            }
        })
    }
    getByConditions() {
        var wherestr = {'username': "崔晋瑜"};
        var opt = {"username": 1, "_id": 0};
        Order.find(wherestr, opt, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            } else {
                console.log("Res:" + res);
            }
        })
    }
}
//var func=new Func();
//func.insert();
//func.del();
//func.getByConditions();
module.exports=Func;