/**
 * Created by 崔晋瑜 on 2017/5/15.
 */
const Func=require('./function.js');
const express=require('express');
const app=express();
const path = require('path');
const bodyParser = require('body-parser');
const func=new Func();
const Order=require("./user.js");
const Problem=require("./problem.js");
const email=require("./email.js");
var orderlist=[];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//当直接访问根目录时
app.use('/', express.static(path.join(__dirname, 'client')));

//当访问order时
app.post('/api/order',function (res,req) {
    var information=req.req.body;
    email(information);
    console.log(information);
    console.log(information instanceof Object);
    func.insert(information);
});
app.post('/api/problem',function (res,req) {
    var problem=req.req.body;
    console.log(problem);
    console.log(problem instanceof Object);
    func.insertProblem(problem);
})
app.delete('/api/order',function (res,req) {
    func.del();
});
app.get('/api/order',function (res,req) {
    func.getByConditions();
    res.json();
    console.log("成功获取到义疗预约项目");
});

//答题系统
app.get("/api/mustquestions", function (req, res) {
    Mreset();
    res.json(mustQuestions);
    console.log("已经获取到必答题");
    mustQuestions=[];
});
app.get("/api/quickquestions", function (req, res) {
    Qreset();
    res.json(quickQuestions);
    console.log("已经获取到抢答题了");
    quickQuestions=[];
});
app.get("/api/orderlist",function (req,res){
    var response=res;
   Order.find("",function (res,docx) {
        response.send(docx);
        console.log(docx);
    })
});

app.get("/api/problemlist",function (req,res) {
    var response=res;
    console.log("成功获取到问题列表")
    Problem.find("",function (res,docx) {
        Problem.find("",function (res,docx) {
            response.send(docx);
            console.log(docx);
        })
    })
})

app.delete("/api/problem/:problemname",function (req,res) {
    console.log(req.params.problemname);
    func.del(req.params.problemname);
})

//答题系统实现
var Question = (function () {
    function Question(id, title, answers, rightAnswer,analysis) {
        this.id = id;
        this.title = title;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
        this.analysis=analysis;
    };
    return Question;
}());
exports.Question = Question;
var Mquestions = [
    new Question(1, '已知数据表A中每个元素距其最终位置不远，为节省时间，应采用的算法是', ['A、堆排序', 'B、直接插入排序', 'C、快速排序', 'D、直接选择排序'], 'B', '无'),
    new Question(2, '下列不属于软件调试技术的是', ['A、强行排错法', 'B、集成测试法', 'C、回溯法', 'D、原因排除法'], 'B', '无'),
    new Question(3, '在一个线程中调用下列方法，不会改变该线程运行状态的是______。', ['A、yield方法', 'B、另一个线程的join方法', 'C、sleep方法', 'D、一个对象的notify方法'], 'B', '当前线程执行了yield()或者当前线程因调度策略从而导致当前线程进入可运行状态。线程调用了sleep()方法、join()方法时，线程进入阻塞状态。在等待阻塞状态下的线程若被notify()和notifyAll()唤醒、被interrupt()中断或等待时间到，线程将进入对象锁阻塞状态。另一个线程join方法并不影响该线程的运行状态。因此，本题的正确答案是B。'),
    new Question(4, '在switch(expression)语句中，expression的数据类型不能是______。', ['A、double', 'B、char', 'C、byte', 'D、short'], 'A ', '表达式expresion只能返回几个类型的值：int、byte、short和Char。题目中的double是不正确的。'),
    new Question(5, 'IP数据包包装成相应网络可以传输的数据帧是____的功能', ['A、应用层 ', 'B、传输层', 'C、网间网层', 'D、网络接口层'], 'D', '无'),
    new Question(6, '计算机病毒最不可能感染的文件是', ['A、COM文件', 'B、EXE文件', 'C、BAT文件', 'D、DOC文件'], 'C', '无'),
    new Question(7, '一个5.6MB的文件利用56KB/S的调制解调器发送，在理想情况下至少需要秒', ['A、100 ', 'B、1000 ', 'C、800 ', 'D、无法计算'], 'C', '传输速度 = 56/8 = 7KB/S，5.6*1024/7 = 819.2秒'),
    new Question(8, '在OSI的参考模型中，自下而上第一个提供端到端的服务器的层次是（）', ['A、数据链路层', 'B、传输层', 'C、会话层', 'D、应用层'], 'B', '无'),
    new Question(9, '密码学中，破译密码被称为（）', ['A、密码结构学', 'B、密码分析学', 'C、密码方法学', 'D、密码专业学'], 'B', '无'),
    new Question(10, '现代密码体制使用的基本方法仍然是替换和（）', ['A、RSA', 'B、换位', 'C、一次性填充', 'D、DES'], 'B', '无'),
    new Question(11, 'ARP协议的功能是（）', ['A、根据IP地址查询MAC地址', 'B、根据MAC 地址查询IP地址', 'C、根据域名查询IP地址', 'D、根据IP地址查询域名'], 'A', '地址解析协议，即ARP（Address Resolution Protocol），是根据IP地址获取物理地址的一个TCP/IP协议。'),
    new Question(12, '计算机操作系统通常具有的五大功能是', ['A、CPU管理、显示器管理、键盘管理、打印机管理和鼠标器管理', 'B、硬盘管理、U盘管理、CPU的管理、显示器管理和键盘管理 ', 'C、处理器(CPU)管理、存储管理、文件管理、设备管理和作业管理', 'D、启动、打印、显示、文件存取和关机'], 'C', '无'),
    new Question(13, '在MySQL中，通常使用________语句来指定一个已有数据库作为当前工作数据库。', ['A、USING', 'B、USED', 'C、USES', 'D、USE'], 'D', '无'),
    new Question(14, '下列对文件的描述中，哪一项与文件的物理结构相关?', ['A、文件长度', 'B、用户对文件的存取方式', 'C、文件中记录的个数', 'D、文件目录的结构'], 'B', '无'),
    new Question(15, '计算机操作系统中，设备管理的主要任务之一是', ['A、通过缓冲技术匹配高、低速设备', 'B、通过改变配置加速数据传输', 'C、通过适配技术连接不同设备', 'D、通过总线技术提高设备效率'], 'A', '无'),
    new Question(16, '下列描述的现象中，属于活锁的是', ['A、相关进程进入阻塞状态，且无法唤醒', 'B、相关进程没有阻塞，可被调度，但是没有进展', 'C、相关进程没有阻塞，但是调度被无限推后', 'D、相关进程进入阻塞状态，且可以唤醒'], 'B', '无'),
    new Question(17, '在访问Web站点时，为了避免主机受到非安全软件的危害，我们可以采取的行动为', ['A、将整个Internet划分成Internet、Intranet、可信、受限等不同区域', 'B、在主机浏览器中加载自己的证书', 'C、浏览站点前索要Web站点的证书', 'D、通信中使用SSL技术'], 'A', '无'),
    new Question(18, '在微机的性能指标中，用户可用的内存容量通常是指（ ）', ['A、RAM的容量', 'B、RAM和ROM的容量之和', 'C、ROM的容量', 'D、CD-ROM的容量'], 'A', '无'),
    new Question(19, 'word提供了多种显示方式，其中有一种显示与打印效果完全相同，所谓“所见即所得”， 同时还能对它进行编辑。它是（ ）', ['A、普通显示', 'B、页面显示', 'C、dg显示', 'D、全屏显示'], 'B', '无'),
    new Question(20, '文件型病毒传染的对象主要是______类文件。', ['A、.COM 和 .BAT', 'B、.EXE 和 .BAT', 'C、.COM 和 .EXE', 'D、.EXE 和 .TXT'], 'C', '无'),
    new Question(21, 'BGP属于下列哪种类型的协议？', ['A、内部路由协议', 'B、外部路由协议', 'C、内部终端协议', 'D、外部终端协议'], 'B', '边界网关协议（BGP）是运行于 TCP 上的一种自治系统的路由协议。'),
    new Question(22, '为了清除计算机上的病毒，要求用无病毒的软件重新启动机器，其目的是清除 ', ['A、CPU', 'B、ROM', 'C、RAM', 'D、硬盘'], 'C', '无'),
    new Question(23, '连接到计算机网络上的计算机都是________。', ['A、高性能计算机', 'B、具有通信能力的计算机', 'C、自治计算机', 'D、主从计算机'], 'C', '入网的计算机都是"自治计算机"，"自治"的含义是可以脱离网络而独立工作。'),
    new Question(24, '下列情况中，不会调用拷贝构造函数的是(　　)。', ['A、用一个对象去初始化同一类的另一个新对象时', 'B、将类的一个对象赋值给该类的另一个对象时', 'C、函数的形参是类的对象，调用函数进行形参和实参结合时', 'D、函数的返回值是类的对象，函数执行返回调用时'], 'B', '无'),
    new Question(25, '算法的时间复杂度是指______。', ['A、执行算法程序所需要的时间', 'B、算法程序的长度', 'C、算法执行过程中所需要的基本运算次数', 'D、算法程序中的指令条数'], 'C', '无'),
    new Question(26, '结构化程序设计主要强调的是______。', ['A、程序的规模', 'B、程序的易读性', 'C、程序的执行效率', 'D、程序的可移植性'], 'B', '无'),
    new Question(27, '下述关于数据库系统的叙述中正确的是______。', ['A、数据库系统减少了数据冗余', 'B、数据库系统避免了一切冗余', 'C、数据库系统中数据的一致性是指数据类型的一致', 'D、数据库系统比文件系统能管理更多的数据'], 'A', '无'),
    new Question(28, '冯诺依曼研制成功的存储程序计算机名叫（       ）。', ['A、EDVAC', 'B、ENIAC', 'C、EDSAC', 'D、MARK-2'], 'A', '无'),
    new Question(29, '利用虚拟设备达到输入输出要求的技术是( )', ['A、利用外存作为缓冲，将作业与外存交换信息和外存与物理设备交换信息两者独立起来，并使它们并行工作的过程', 'B、把I／O要求交给多个物理设备分散完成的过程', 'C、把I／O信息先放在外存，然后由一台物理设备分批完成I／O要求的过程', 'D、把共享设备改为某作业的独享设备，集中完成I／O要求的过程'], 'A', '无'),
    new Question(30, '碎片是指( )', ['A、存储分配完后所剩的空闲区', 'B、没有被使用的存储区', 'C、不能被使用的存储区', 'D、未被使用，而又暂时不能使用的存储区'], 'D', '无'),
    new Question(31, '操作系统中采用缓冲技术的目的是为了增强系统( )的能力。', ['A、串行操作', 'B、重执操作', 'C、控制操作', 'D、并行操作'], 'D', '无'),
    new Question(32, '在单一处理器上，将执行时间有重叠的几个程序称为( )', ['A、顺序程序', 'B、多道程序', 'C、并发程序', 'D、并行程序'], 'c', '无'),
    new Question(33, '用以太网形式构成的局域网，其拓扑结构为(　 　)。', ['A、环型', 'B、总线型', 'C、星型', 'D、树型'], 'B', '无'),
    new Question(34, '下列关于磁道的说法中，正确的是______。', ['A、盘面上的磁道是一组同心圆', 'B、由于每一磁道的周长不同，所以每一磁道的存储容量也不同', 'C、盘面上的磁道是一条阿基米德螺线', 'D、磁道的编号是最内圈为0，并次序由内向外逐渐增大，最外圈的编号最大'], 'A', '盘片两面均被划分为80个同心圆，每个同心圆称为一个磁道，磁道的编号是：最外面为0磁道，最里面为79道。每个磁道分为等长的18段，段又称为扇区，每个扇区可以记录512个字节。磁盘上所有信息的读写都以扇区为单位进行。'),
    new Question(35, '配置高速缓冲存储器（Cache）是为了解决______。', ['A、内存与辅助存储器之间速度不匹配问题', 'B、CPU与辅助存储器之间速度不匹配问题', 'C、CPU与内存储器之间速度不匹配问题', 'D、主机与外设之间速度不匹配问题'], 'C', '内存是解决主机与外设之间速度不匹配问题；高速缓冲存储器是为了解决CPU与内存储器之间速度不匹配问题。'),
    new Question(36, '病毒程序按其侵害对象不同分为（  ）', ['A、外壳型、入侵型、原码型和良性型', 'B、原码型、外壳型、复合型和网络病毒', 'C、引导型、文件型、复合型和网络病毒', 'D、良性型、恶性型、原码型和外壳型'], 'C', '无'),
    new Question(37, '在资源管理器中，选定多个不连续的文件应首先按下', ['A、Ctrl', 'B、Shift', 'C、Alt', 'D、Ctrl+Shift'], 'A', '无'),
    new Question(38, '把连续的影视和声音信息经过压缩后，放到网络媒体服务器上，让用户边下载边收看，这种技术称作为( )', ['A、流媒体技术', 'B、网络信息传输技术', 'C、媒体技术', 'D、网络媒体技术'], 'A', '无'),
    new Question(39, '默认的FTP协议使用的命令端口是( )', ['A、21', 'B、22', 'C、23', 'D、24'], 'A', '无'),
    new Question(40, '为幻灯片中的对象设置动画效果的方法是( )', ['A、单击“幻灯片放映”菜单的“自定义动画”命令', 'B、单击“编辑”菜单的“自定义动画”命令', 'C、单击“文件”菜单的“动画设置”命令', 'D、单击“格式”菜单的“幻灯片版式”命令'], 'A', '无')
];
var Qquestions = [
    new Question(1, '在浏览网页时，下列可能泄漏隐私的是', ['A、HTML文件', 'B、Session', 'C、Cookie', 'D、应用程序'], 'C', '无'),
    new Question(2, '微机中的CMOS属于', ['A、RAM', 'B、ROM', 'C、Cache', 'D、CPU'], 'B', '无'),
    new Question(3, 'HUB指的是 ', ['A、网卡', 'B、调制解调器', 'C、交换机', 'D、网络集线器'], 'D', '无'),
    new Question(4, 'internet主要由(   )、通信线路、服务器与客户机和信息资源四部分组成。', ['A、网关', 'B、路由器', 'C、网桥', 'D、集线器'], 'B', '无'),
    new Question(5, '采用点一点线路的通信子网的基本拓扑结构有4种，它们是(   )。', ['A、星型、环型、树型和网状型', 'B、总线型、环型、树型和网状型', 'C、星型、总线型、树型和网状型 ', 'D、星型、环型、树型和总线型'], 'A', '无'),
    new Question(6, '中国网络公司中,谁的股票最早在纳斯达克上市?', ['A、网易', 'B、中华网', 'C、搜狐', 'D、新浪'], 'B', '先后顺序：中华网、新浪、搜狐、网易'),
    new Question(7, '磁盘与主机之间的数据传送方式是什么？', ['A、无条件', 'B、程序查询', 'C、中断方式', 'D、DMA方式'], 'B', '程序查询方式是一种程序直接控制方式,这是主机与外设间进行信息交换的最简单的方式,输入和输出完全是通过CPU执行程序来完成的。一旦某一外设被选中并启动后，主机将查询这个外设的某些状态位，看其是否准备就绪？若外设未准备就绪，主机将再次查询；若外设已准备就绪，则执行一次I/O操作。'),
    new Question(8, '(  )是指将数据进行加工处理后形成的具有保留价值的文件。', ['A、系统文件', 'B、文档文件', 'C、用户文件', 'D、顺序文件'], 'B', '无'),
    new Question(9, '虚拟存储技术是 (  )', ['A、补充内存物理空间的技术', 'B、补充相对地址空间的技术', 'C、扩充外存空间的技术', 'D、扩充输入输出缓冲区的技术'], 'B', '虚拟存储技术是用小的内存实现在大的虚空间中程序的运行工作。简单地说，虚拟存储技术是由操作系统提供的一个假想的特大存储器，是补充相对(逻辑、虚拟)地址空间的技术。'),
    new Question(10, '在windows中能弹出对话框的操作是（）', ['A、选择了带省略号的菜单项', 'B、选择了带向右三角形箭头的菜单项', 'C、选择了颜色变灰的菜单项', 'D、运行了与对话框对应的应用程序'], 'A', '无'),
    new Question(11, '当选定软盘上的文件或文件夹并按delete键后，所选定的文件或文件夹将（）', ['A、不删除也不放入“回收站”', 'B、被删除并放入“回收站”', 'C、不被删除但放入“回收站”', 'D、被删除但不放入“回收站”'], 'D', '软盘跟硬盘式一样的，移动的软盘是按delete就会永久删除的。因为他不是在电脑上，所以不能放入回收站。'),
    new Question(12, 'Excel 中,在B3单元格中输入公式:=C3+$D5,若将B3单元格的公式复制到同一工作表的D7中的公式为（）', ['A、=C3+$D5', 'B、=D7+$E9', 'C、=E7+$D9', 'D、=E7+$D5'], 'C', '如果没有$的话，B3 - >D7, X:+2, Y:4所以c3变成了E7，D5变成了F9，但是$是绝对引用，所以D不变，为D9'),
    new Question(13, '数据库(DATABASE)是指在计算机存储设备上合理存放的_____的相关____', ['A、层次化，数据集合', 'B、结构化，数据集合', 'C、规范化，信息集合', 'D、结构化，信息集合'], 'B', '无'),
    new Question(14, '下列图片文件中只能储存256种颜色的图片是哪一张：', ['A、256.BMP', 'B、256.JPG', 'C、256.GIF', 'D、256.TIFF'], 'C', 'GIF图像文件的数据是经过压缩的，而且是采用了可变长度等压缩算法。所以GIF的图像深度从1bit到8bit，也即GIF最多支持256种色彩（2的8次幂）的图像。'),
    new Question(15, '下面关于CPU字长的叙述，不正确的是______。', ['A、字长越长，CPU同时处理的数据位数越多', 'B、在其他指标不变的情况下，字长越长，运算速度越快', 'C、在其他指标不变的情况下，字长越长，运算精度越高', 'D、在其他指标不变的情况下，字长越长，CPU主频越高'], 'D', '无'),
    new Question(16, '给文件取名时能与“ABC?.?”匹配的是（）', ['A、AB12．C', 'B、ABCD.FOR ', 'C、ABCD.C ', 'D、ABC.TXT'], 'C', '无'),
    new Question(17, '计算机存储和处理文档的汉字时,使用的是（）', ['A、字形码', 'B、国标码', 'C、机内码', 'D、输入码'], 'C', '无'),
    new Question(18, '在Excel中,“分类汇总”的类型不包含（）', ['A、求和', 'B、求最大值', 'C、立方', 'D、方差'], 'C', '无'),
    new Question(19, '广域网和局域网是按照（）来分的', ['A、网络使用者', 'B、信息交换方式', 'C、网络连接距离', 'D、传输控制规程'], 'C', '无'),
    new Question(20, '多媒体技术的发展趋势是（）', ['A、网络化、智能化', 'B、硬件化、集中化', 'C、无线化、集成化', 'D、简单化、软件化'], 'A', '无'),
    new Question(21, '以下属于流媒体文件格式的为（）', ['A、AVI格式', 'B、WMV格式', 'C、MPEG格式', 'D、MOV格式'], 'B', '无'),
    new Question(22, 'FLASH的帧类型不包括（）', ['A、关键帧', 'B、有效帧', 'C、普通帧', 'D、空白关键帧'], 'B', '无'),
    new Question(23, '在“我的电脑”窗口中，要激活“文件”下拉菜单，应该按（）键', ['A、Alt+空格', 'B、Alt+F', 'C、Shift+F', 'D、Ctrl+F'], 'B', '无'),
    new Question(24, 'CERNET指的是（）', ['A、中国公用计算机互联网', 'B、中国科技网', 'C、中国教育和科研计算机网', 'D、中国互联网信息中心'], 'C', '无'),
    new Question(25, '关于图像压缩的描述正确的一项为（）', ['A、图像压缩的比例越高越好', 'B、图像压缩的比例越低，占用的存储空间越少', 'C、有损压缩算法和无损压缩算法都会造成原有图像信息的丢失', 'D、JPEG是一种图像的有损压缩方式'], 'D', '无'),
    new Question(26, '信息处理的核心技术是（）', ['A、计算机技术 ', 'B、通讯技术', 'C、多媒体技术', 'D、网络技术'], 'A', '无'),
    new Question(27, '快捷方式和快捷键（ ）改变应用程序、文件、文件夹、打印机或网络中计算机的位置，它不是副本，而是一个指针，使用它可以更快地打开项目，删除、移动或重命名快捷方式（ ）影响原有的项目。 ', ['A、会，会', 'B、不会，不会', 'C、会，不会', 'D、不会，会'], 'B', '无'),
    new Question(28, '世界上第一款网页浏览器是（）', ['A、NCSA Mosaic', 'B、WorldWideWeb', 'C、Erwise', 'D、IE'], 'B', 'WorldWideWeb是世界上第一个网页浏览器及网页编辑器，由万维网（World Wide Web）的发明人蒂姆·伯纳斯-李开发'),
    new Question(29, '键盘打字键区的8个基准键位是指______。', ['A、SDFGHJKL', 'B、ASDFGHJK', 'C、ASDFHJKL', 'D、ASDFJKL;'], 'D', '无'),
    new Question(30, '山西大学计算机与信息技术学院成立于哪一年', ['A、请直接写出答案', 'B、请直接写出答案', 'C、请直接写出答案', 'D、请直接写出答案'], '1980年', '无'),
    new Question(31, 'Android是哪家公司创造的（）', ['A、请直接写出答案', 'B、请直接写出答案', 'C、请直接写出答案', 'D、请直接写出答案'], 'Android公司', '无'),
    new Question(32, '柳传志是哪家公司的CEO（ ）', ['A、方正', 'B、金山', 'C、联想', 'D、同方'], 'C', '无'),
    new Question(33, 'PowerPoint中，在浏览视图下，按住CTRL并拖动某幻灯片，可以完成（）操作', ['A、移动幻灯片', 'B、复制幻灯片', 'C、删除幻灯片', 'D、选定幻灯片'], 'B', '无'),
    new Question(34, '网上的交流催生了一些奇怪的表达方式，有时，揣测这些词句的含义就象猜谜一样。"l8ly"代表____。', ['A、近来', 'B、百合花', 'C、戴眼镜的人', 'D、再见 '], 'A', '无'),
    new Question(35, '世界上的第一所MOOC学院的名字是（）', ['A、请直接写出正确答案', 'B、请直接写出正确答案', 'C、请直接写出正确答案', 'D、请直接写出正确答案'], '可汗学院', '可汗学院（Khan Academy）'),
    new Question(36, '"蓝牙"是一种无线通信技术,请问它的命名出自哪国国王的名字（）', ['A、丹麦', 'B、苏格兰', 'C、荷兰', 'D、英格兰'], 'A', '无'),
    new Question(37, '（ ）不是磁盘的特性。', ['A、磁盘可以依顺序方式操作', 'B、硬盘内的磁道每英寸可存取750个字符', 'C、磁盘不具可靠性的', 'D、磁盘在高温和灰尘多的环境下很容易损坏'], 'B', '无'),
    new Question(38, '下列关于剪贴板的叙述中，___是错误的。', ['A、凡是有“剪切”和“复制”命令的地方都可以把选取的信息送到剪贴板中', 'B、剪贴板中的信息超过一定数量时会自动清空，以节省内存空间', 'C、剪贴板中的信息可以自动保存成磁盘文件并长期保存', 'D、剪贴板只能存放文字，还能存放图片等'], 'C', '无'),
    new Question(39, 'CAD 是计算机的主要应用领域,它的含义是（）', ['A、计算机辅助教育', 'B、计算机辅助测试', 'C、计算机辅助设计', 'D、计算机辅助管理'], 'C', '计算机辅助设计Computer Aided Design'),
    new Question(40, '以下属于第四代微处理器的是（）', ['A、Intel8008', 'B、Intel8085', 'C、Intel8086', 'D、Intel80386'], 'D', '无'),
    new Question(41, 'USB1.1、USB2.0 Full Speed、USB 2.0 High-Speed、USB3.0三种规范的速度分别是()', ['A、12Mbps、12Mbps、480Mbps、5Gbps ', 'B、12Mbps、480Mbps、480Mbps、5Gbps ', 'C、12Mbps、12Mbps、5Gbps、5Gbps ', 'D、12Mbps、480Mbps、12Mbps、5Gbps'], 'A', '无'),
    new Question(42, '我国的四大主干网是:中国金桥信息网、中国公用计算机互联网、中国科技网和（）', ['A、中国铁路通信网', 'B、中国联合通信网', 'C、中国邮电通信网', 'D、中国教育与科研网'], 'D', '无'),
    new Question(43, '硬盘工作时应特别注意避免( )', ['A、噪声', 'B、震动', 'C、潮湿', 'D、日光'], 'D', '无'),
    new Question(44, 'Internet网是目前世界上第一大互联网，它起源于美国，其雏形是____。', ['A、NCFC网', 'B、CERNET网', 'C、GBNET网', 'D、ARPANET网'], 'D', '1980年美国国防部高等研究计划局研制的名为“ARPANET”的计算机网络，后来发展称为如今的Internet网。其余三个选项：NCFC网是中国国家计算机网络设施(也称为中关村网)，CERNET网是中国教育和科研网，GBNET网是金桥网。'),
    new Question(45, '近日，在国内校园大面积感染的勒索病毒（“永恒之蓝”），感染的途径或遭受攻击的原因是什么？', ['A、请直接写出正确答案', 'B、请直接写出正确答案', 'C、请直接写出正确答案', 'D、请直接写出正确答案'], '远程攻击Windows的445端口（文件共享）', '“永恒之蓝”可远程攻击Windows的445端口（文件共享），如果系统没有安装今年3月的微软补丁，无需用户任何操作，只要开机上网，“永恒之蓝”就能在电脑里执行任意代码，植入勒索病毒等恶意程序。只要涉及445端口或文件共享即可得分。')
];
var mustQuestions=[];
var quickQuestions=[];
Mquestions.sort(function(){ return 0.5 - Math.random() });
Qquestions.sort(function(){ return 0.5 - Math.random() });
function Mreset()
{
    for(let i=0;i<10;i++)
    {
        if(i+1>Mquestions.length)
        {
            mustQuestions.push(new Question(0,"抱歉哦，题库宝宝没有题了哦",['A、抱歉哦','B、真的好抱歉哦','C、原谅宝宝吧','D、宝宝知道错了'],'ABCD','无'));
            break;
        }
        console.log("第"+Mquestions[i].id+"题");
        Mquestions[i].id=i+1;
        mustQuestions.push(Mquestions[i]);
    }
    Mquestions.sort(function(){ return 0.5 - Math.random() });
}
function Qreset()
{
    for(let i=0;i<5;i++)
    {
        if(i+1>Qquestions.length)
        {
            quickQuestions.push(new Question(0,"抱歉哦，题库宝宝没有题了哦",['A、抱歉哦','B、真的好抱歉哦','C、原谅宝宝吧','D、宝宝知道错了'],'ABCD','无'));
            break;
        }
        console.log("第"+Qquestions[i].id+"题");
        Qquestions[i].id=i+1;
        quickQuestions.push(Qquestions[i]);
    }
    Qquestions.sort(function(){ return 0.5 - Math.random() });
}

//服务器启动
var server = app.listen(8000,"0.0.0.0", function () {
    console.log("服务器已经启动，地址是http：//local" + ":8000");
})