
var zhixing = {}
const hid = require('hid.js')
zhixing.zhixing = function zhixing() {
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
    hid.HID_init()

    if (szzl.exists()) {

    }
    else {
        console.log('请开启数字助理服务:');
        sleep(1000)
        exit()
    }     // 是否为默认数字助理

    if (szzl.isRunning()) {

    }
    else {
        console.log('请开启数字助理服务:');
        sleep(1000)
        exit()
    }     // 是否为默认数字助理
    if (initOCR()) {

    }
    else {
        console.log('ocr初始化失败:');
        sleep(1000)
        exit()
    }
    // 在这里使用配置数据进行抢单逻辑
    app.launch('com.sdu.didi.gsui');
    while (true) {
        sleep(3000);
    }


}

function waitHome() {
    while (true) {
        guanbishaixuan()
        node2 = szzlSelector().text("规则").find()
        node3 = szzlSelector().text("抢单大厅").find()
        if (node2 && node3) {
            return True
        }
        sleep(1000)
    }
}
function guanbishaixuan() {
    var node = szzlSelector().text("筛选订单类型").find()
    if (node) {
        if (onClickByText("确定")) {
            sleep(0.5)
            return True
        }
    }
    return False
}

function qd(){
    

}

// OCR相关变量
var ocrPredictor = null;
var ocrInitialized = false;

// 初始化OCR
function initOCR() {
    if (ocrInitialized) return true;

    try {
        const Predictor = com.baidu.paddle.lite.ocr.Predictor;
        ocrPredictor = new Predictor();

        // 初始化模型（使用精简版模型，速度较快）
        let loading = threads.disposable();
        threads.start(function () {
            loading.setAndNotify(ocrPredictor.init(context, true));
        });

        let loadSuccess = loading.blockedGet();
        if (loadSuccess) {
            ocrInitialized = true;
            console.log('OCR初始化成功');
            return true;
        } else {
            console.error('OCR初始化失败');
            return false;
        }
    } catch (e) {
        console.error('OCR初始化异常:', e);
        return false;
    }
}

// OCR识别函数
function ocrRecognize() {
    if (!ocrInitialized && !initOCR()) {
        return [];
    }

    try {
        if (!requestScreenCapture()) {
            console.error('请求截图权限失败');
            return [];
        }

        let img = captureScreen();
        if (!img) {
            console.error('截图失败');
            return [];
        }

        let result = ocrPredictor.runOcr(img.getBitmap());
        img.recycle();
        return result;
    } catch (e) {
        console.error('OCR识别异常:', e);
        return [];
    }
}

// 创建缓存存储
var ocrCache = storages.create('ocr_cache');

function onClickByText(text, addname) {
    var node = szzlSelector().text(text).findOne();
    if (node) {
    }
    else {
        return
    }

    // 生成缓存键：text + addname
    let cacheKey = 'click_' + text + (addname || '');

    // 只有findmode不等于0时才使用缓存
    if (findMode != 0) {
        // 检查本地缓存（只使用OCR缓存）
        let cachedData = ocrCache.get(cacheKey, null);
        if (cachedData && cachedData.mode === 'ocr') {
            console.log('使用OCR缓存数据点击:', cachedData);
            hid.onClick(cachedData.x, cachedData.y);
            return True;
        }
    }

    if (findMode == 0) {
        // 使用节点点击（不缓存）
        console.log('使用节点查找文本:', text);

        if (node) {
            let x = node.centerX();
            let y = node.centerY();
            hid.onClick(x, y);
            console.log('节点点击坐标:', { x: x, y: y });
            return True
        } else {
            console.error('未找到文本节点:', text);
        }
    } else {
        // 使用OCR识别（缓存）
        console.log('使用OCR识别文本:', text);
        let ocrResults = ocrRecognize();

        for (let i = 0; i < ocrResults.length; i++) {
            let ocrResult = ocrResults[i];
            if (ocrResult.label.includes(text)) {
                let rect = ocrResult.bounds;
                let x = (rect.left + 70)
                let y = (rect.top + rect.bottom) / 2;
                hid.onClick(x, y);
                // 保存到缓存
                ocrCache.put(cacheKey, { x: x, y: y, mode: 'ocr', text: ocrResult.label, addname: addname });
                console.log('OCR识别成功并缓存:', { x: x, y: y, text: ocrResult.label, cacheKey: cacheKey });
                return True; 
            }
        }

        console.error('OCR未找到文本:', text);
    }
}


module.exports = zhixing; // 导出函数