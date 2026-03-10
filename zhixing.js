
var zhixing = {}

zhixing.zhixing = function zhixing(){
    console.log("执行了");
    // 读取配置数据
    var storage = storages.create('zhanguo');
    
    // 读取抢单类型配置
    var didikuaiche = storage.get('didikuaiche', false);
    var tehuikuaiche = storage.get('tehuikuaiche', false);
    var diditekuai = storage.get('diditekuai', false);
    var suixinjie = storage.get('suixinjie', false);
    var chenjipinche = storage.get('chenjipinche', false);
    var didipinche = storage.get('didipinche', false);
    var qitaleixing = storage.get('qitaleixing', false);
    
    // 读取抢单配置
    var qitajiage = storage.get('qitajiage', '30');
    var jiange1 = storage.get('jiange1', '500');
    var jiange2 = storage.get('jiange2', '800');
    var shezhijuli = storage.get('shezhijuli', '5');
    var shezhijiage = storage.get('shezhijiage', '20');
    
    // 读取终点关键词配置
    var bqzdbox = storage.get('bqzdbox', false);
    var zbjhs = storage.get('zbjhs', '机场#火车站');
    var zqzdbox = storage.get('zqzdbox', false);
    var zqzdwz = storage.get('zqzdwz', '软件园#医院');
    
    // 输出配置数据
    console.log('抢单类型配置:');
    console.log('快车:', didikuaiche);
    console.log('特惠快车:', tehuikuaiche);
    console.log('滴滴特快:', diditekuai);
    console.log('随心接:', suixinjie);
    console.log('城际拼车:', chenjipinche);
    console.log('滴滴拼车:', didipinche);
    console.log('其他类型:', qitaleixing);
    
    console.log('\n抢单配置:');
    console.log('其他类型均价:', qitajiage);
    console.log('刷新间隔:', jiange1, '-', jiange2, '毫秒');
    console.log('接人距离:', shezhijuli, '公里内');
    console.log('抢单价格:', shezhijiage, '元以上');
    
    console.log('\n终点关键词配置:');
    console.log('不抢终点:', bqzdbox);
    console.log('不抢终点关键词:', zbjhs);
    console.log('只抢终点:', zqzdbox);
    console.log('只抢终点关键词:', zqzdwz);

    // 在这里使用配置数据进行抢单逻辑
    app.launch('com.sdu.didi.gsui');
    while(true){
        sleep(3000);
    }


}

module.exports = zhixing; // 导出函数