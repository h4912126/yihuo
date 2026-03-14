
var zhixing = {}
const hid = require('hid.js')

// 全局配置变量
var config = null;

// 初始化配置
function initConfig() {
    if (config) return config;
    
    var storage = storages.create('zhanguo');
    config = {
        // 抢单类型配置
        didikuaiche: storage.get('didikuaiche', false),
        tehuikuaiche: storage.get('tehuikuaiche', false),
        diditekuai: storage.get('diditekuai', false),
        suixinjie: storage.get('suixinjie', false),
        chenjipinche: storage.get('chenjipinche', false),
        didipinche: storage.get('didipinche', false),
        qitaleixing: storage.get('qitaleixing', false),
        
        // 抢单配置
        qitajiage: parseFloat(storage.get('qitajiage', '30')),
        jiange1: storage.get('jiange1', '500'),
        jiange2: storage.get('jiange2', '800'),
        shezhijuli: parseFloat(storage.get('shezhijuli', '5')),
        shezhijiage: parseFloat(storage.get('shezhijiage', '20')),
        
        // 终点关键词配置
        bqzdbox: storage.get('bqzdbox', false),
        zbjhs: storage.get('zbjhs', '').split('#').map(keyword => keyword.trim()).filter(keyword => keyword !== ''),
        zqzdbox: storage.get('zqzdbox', false),
        zqzdwz: storage.get('zqzdwz', '').split('#').map(keyword => keyword.trim()).filter(keyword => keyword !== '')
    };
    
    // 输出配置数据
    console.log('抢单类型配置:');
    console.log('快车:', config.didikuaiche);
    console.log('特惠快车:', config.tehuikuaiche);
    console.log('滴滴特快:', config.diditekuai);
    console.log('随心接:', config.suixinjie);
    console.log('城际拼车:', config.chenjipinche);
    console.log('滴滴拼车:', config.didipinche);
    console.log('其他类型:', config.qitaleixing);

    console.log('\n抢单配置:');
    console.log('其他类型均价:', config.qitajiage);
    console.log('刷新间隔:', config.jiange1, '-', config.jiange2, '毫秒');
    console.log('接人距离:', config.shezhijuli, '公里内');
    console.log('抢单价格:', config.shezhijiage, '元以上');

    console.log('\n终点关键词配置:');
    console.log('不抢终点:', config.bqzdbox);
    console.log('不抢终点关键词:', config.zbjhs);
    console.log('只抢终点:', config.zqzdbox);
    console.log('只抢终点关键词:', config.zqzdwz);
    
    return config;
}

zhixing.zhixing = function zhixing() {
    console.log("执行了");
    // 初始化配置
    initConfig();
    
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

function qd() {
    // 确保配置已初始化
    if (!config) {
        initConfig();
    }
    
    // 模拟获取文本（实际使用时应该从OCR获取）
    let text = "TextView text=\"出发时间\" ... TextView text=\"抢单\" Rect(811, 1230 - 902, 1283)";
    
    // 解析订单
    let orders = jiexi(text);
    console.log('解析到的订单:', orders.length, '个');
    
    // 筛选符合配置的订单
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        let isValid = true;
        
        // 1. 筛选订单类型
        let orderType = order['类型'] || '';
        let typeValid = false;
        
        // 优先检查特惠快车
        if (config.tehuikuaiche && orderType.includes('特惠')) {
            typeValid = true;
        } 
        // 再检查普通快车（排除特惠快车）
        else if (config.didikuaiche && orderType.includes('快车') && !orderType.includes('特惠')) {
            typeValid = true;
        }
        // 检查其他类型
        else if (config.diditekuai && orderType.includes('特快')) {
            typeValid = true;
        } else if (config.suixinjie && orderType.includes('随心')) {
            typeValid = true;
        } else if (config.chenjipinche && orderType.includes('城际')) {
            typeValid = true;
        } else if (config.didipinche && orderType.includes('拼车')) {
            typeValid = true;
        } else if (config.qitaleixing) {
            typeValid = true;
        }
        
        if (!typeValid) {
            continue;
        }
        
        // 2. 筛选距离
        let distance = parseFloat(order['距离'] || '0');
        if (distance > config.shezhijuli) {
            continue;
        }
        
        // 3. 筛选价格
        let price = parseFloat(order['价格'] || '0');
        if (price < config.shezhijiage) {
            continue;
        }
        
        // 4. 筛选终点关键词
        let destination = order['目的地'] || '';
        if (config.bqzdbox) {
            // 不抢包含指定关键词的终点
            let hasBadKeyword = false;
            for (let keyword of config.zbjhs) {
                if (destination.includes(keyword)) {
                    hasBadKeyword = true;
                    break;
                }
            }
            if (hasBadKeyword) {
                continue;
            }
        }
        
        if (config.zqzdbox) {
            // 只抢包含指定关键词的终点
            let hasGoodKeyword = false;
            for (let keyword of config.zqzdwz) {
                if (destination.includes(keyword)) {
                    hasGoodKeyword = true;
                    break;
                }
            }
            if (!hasGoodKeyword) {
                continue;
            }
        }
        
        // 找到第一个符合条件的订单
        console.log('找到符合条件的订单，索引:', i, '订单:', order);
        // 返回订单和索引
        return {
            order: order,
            index: i
        };
    }
    
    console.log('没有找到符合条件的订单');
    return null;
}
function jiexi(text){
    // 分割文本为单行（处理多个空格和制表符）
    let lines = text.split(/\s+/).filter(line => line.trim() !== '');
    let orders = [];
    let currentOrder = null;
    let orderStarted = false;
    
    // 遍历所有行
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        // 检查是否开始新订单
        if (line.includes('TextView') && line.includes('text="出发时间"')) {
            // 如果已有订单，保存并开始新订单
            if (currentOrder) {
                orders.push(currentOrder);
            }
            currentOrder = {};
            orderStarted = true;
        }
        
        // 提取距离信息
        if (orderStarted && line.includes('TextView') && line.includes('text="距您"')) {
            // 查找下一个TextView
            for (let j = i + 1; j < lines.length; j++) {
                let nextLine = lines[j].trim();
                if (nextLine.includes('TextView') && nextLine.includes('text="')) {
                    let distanceMatch = nextLine.match(/text="([^"]+)"/);
                    if (distanceMatch) {
                        currentOrder['距离'] = distanceMatch[1];
                    }
                    break;
                }
            }
        }
        
        // 提取价格信息
        if (orderStarted && line.includes('TextView') && line.includes('text="元"')) {
            // 查找前一个TextView
            for (let j = i - 1; j >= 0; j--) {
                let prevLine = lines[j].trim();
                if (prevLine.includes('TextView') && prevLine.includes('text="')) {
                    let priceMatch = prevLine.match(/text="([^"]+)"/);
                    if (priceMatch) {
                        currentOrder['价格'] = priceMatch[1];
                    }
                    break;
                }
            }
        }
        
        // 提取目的地信息
        if (orderStarted && line.includes('TextView') && line.includes('text="') && line.includes('|')) {
            let destinationMatch = line.match(/text="([^"]+)"/);
            if (destinationMatch) {
                currentOrder['目的地'] = destinationMatch[1];
            }
        }
        
        // 提取类型信息
        if (orderStarted && line.includes('TextView') && line.includes('text="') && line.includes('单"')) {
            let typeMatch = line.match(/text="([^"]+)"/);
            if (typeMatch) {
                currentOrder['类型'] = typeMatch[1];
            }
        }
        
        // 提取抢单坐标
        if (orderStarted && line.includes('TextView') && line.includes('text="抢单"')) {
            // 查找包含Rect的行
            for (let j = i; j < lines.length; j++) {
                let rectLine = lines[j].trim();
                if (rectLine.includes('Rect(')) {
                    let rectMatch = rectLine.match(/Rect\(([^\)]+)\)/);
                    if (rectMatch) {
                        currentOrder['抢单坐标'] = rectMatch[1];
                        // 订单结束，保存
                        orders.push(currentOrder);
                        currentOrder = null;
                        orderStarted = false;
                    }
                    break;
                }
            }
        }
    }
    
    // 确保最后一个订单也被保存
    if (currentOrder) {
        orders.push(currentOrder);
    }
    
    return orders;
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

function onClickByText(text, addname, index) {
    var nodes = szzlSelector().text(text).find();
    if (!nodes || nodes.length === 0) {
        return;
    }
    // 如果不传index，默认取第一个
    var node = nodes[typeof index === 'number' ? index : 0];
    if (!node) {
        return;
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