
var zhixing = {}
// 全局配置变量
var config = null;
var findMode = 0
var delaysz = 500
var clickMode = 0 // 1是蓝牙， 0是OTG

var Hid = null;
// 参数，0是usb模式，  1是蓝牙模式
function HID_init(hid_type) {
    console.log("初始化fishhid开始")
    
    // 检查是否已经初始化过
    if (global.hidInitialized) {
        console.log("HID已经初始化，跳过")
        return true
    }
    
    if (!Hid) {
        Hid = HidBridge();
        console.log("HidBridge初始化成功")
    }
    
    // 尝试初始化libnetwork-lib.so
    if (!global.libInitialized) {
        try {
            if (!Hid.initialize(context, files.cwd() + "/lib/arm64-v8a/libnetwork-lib.so")) {
                console.log("Hid.initialize失败，可能是共享库已加载")
                // 即使初始化失败，也尝试继续执行，因为可能是共享库已经加载
            }
            global.libInitialized = true;
            console.log("libnetwork-lib.so初始化成功")
        } catch (e) {
            console.error("Hid.initialize异常:", e);
            // 捕获异常，继续执行，因为可能是共享库已经加载
            global.libInitialized = true;
        }
    }
    
    if (hid_type == 1) {
        var result = Hid.init("bluetooth", 10000);
        if (result) {
            global.hidInitialized = true;
        }
        return result;
    } else {
        var result = Hid.init("usb", 10000);
        if (result) {
            global.hidInitialized = true;
        }
        return result;
    }
}

function GetMac() {
    return Hid.getMac()
}

function Home() {
    return Hid.sendCommand("home")
}

function Recents() {
    return Hid.sendCommand("recents")
}

function Back() {
    return Hid.sendCommand("back")
}

function Back1() {
    return Hid.sendCommand("back1")
}

function Back2() {
    return Hid.sendCommand("back2")
}

function Paste() {
    return Hid.sendCommand("key_paste")
}

function ChargeOn() {
    return Hid.sendCommand("charge:1")
}

function ChargeOff() {
    return Hid.sendCommand("charge:0")
}

function Click(x, y) {
    const delay1 = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    const delay2 = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    return Hid.sendCommand(`tap:${x},${y},${delay1},${delay2},1,0,0`);
}

// 百分比点击，传入0.0-1.0 之间的范围
function ClickPersent(x, y) {
    const delay1 = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    const delay2 = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    return Hid.sendCommand(`tap:${x},${y},${delay1},${delay2},1,0,1`);
}

// 滑动， 加速模式为慢快慢， 先慢慢加速到中间速度最快，然后逐渐减速到末尾
function Swipe1(x1, y1, x2, y2) {
    return Hid.sendCommand(`swipe:${x1},${y1},${x2},${y2},0,0`);
}

// 滑动， 加速模式为慢快， 滑动逐渐加速到末尾
function Swipe2(x1, y1, x2, y2) {
    return Hid.sendCommand(`swipe:${x1},${y1},${x2},${y2},0,2`);
}

// 百分比滑动， 加速模式为慢快慢， 先慢慢加速到中间速度最快，然后逐渐减速到末尾
function Swipe1Persent(x1, y1, x2, y2) {
    return Hid.sendCommand(`swipe:${x1},${y1},${x2},${y2},1,0`);
}

// 百分比滑动， 加速模式为慢快， 滑动逐渐加速到末尾
function Swipe2Persent(x1, y1, x2, y2) {
    return Hid.sendCommand(`swipe:${x1},${y1},${x2},${y2},1,2`);
}

// HID初始化函数
function initHID() {
    // 检查是否已经初始化过
    if (global.hidInitialized) {
        console.log("HID已初始化，跳过重复初始化");
        return true;
    }

    if (!HID_init(clickMode)) {  //初始化为蓝牙模式
        console.log("初始化失败")
        sleep(1000)
        exit()
    }
    console.log("mac:" + GetMac());

    // 标记为已初始化
    global.hidInitialized = true;
    return true;
}


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

    // 初始化HID
    initHID();

    // 初始化配置
    initConfig();

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
    if (findMode == 1) {
        if (initOCR()) {

        }
        else {
            console.log('ocr初始化失败:');
            sleep(1000)
            exit()
        }
    }

    // 在这里使用配置数据进行抢单逻辑
    app.launch('com.sdu.didi.gsui');
    // 计算配置的两个刷新时间之间的随机值作为刷新间隔
    var jiange1 = parseInt(config.jiange1) || 500;
    var jiange2 = parseInt(config.jiange2) || 800;
    var refreshInterval = Math.floor(Math.random() * (jiange2 - jiange1 + 1)) + jiange1;

    console.log('刷新间隔设置为:', refreshInterval, '毫秒');

    // 记录上次刷新时间
    var lastRefreshTime = new Date().getTime();

    while (true) {
        if (waitHome()) {
            szzl.wakeUp()
            sleep(delaysz)
            var allInfoText = szzl.dumpNodes()
            var orderInfo = qd(allInfoText)
            if (orderInfo) {
                console.log('符合条件的订单:', orderInfo);
                onClickByText("抢单", orderInfo.index.toString(), orderInfo.index)
            }
        }

        // 计算当前时间与上次刷新时间的差值
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - lastRefreshTime;

        console.log('已过时间:', elapsedTime, '毫秒');

        // 如果超过了刷新间隔，执行刷新操作
        if (elapsedTime >= refreshInterval) {
            console.log('达到刷新间隔，执行刷新操作');
            shuaxin();
            // 重新生成随机刷新间隔
            refreshInterval = Math.floor(Math.random() * (jiange2 - jiange1 + 1)) + jiange1;
            console.log('新的刷新间隔设置为:', refreshInterval, '毫秒');
            // 重置上次刷新时间
            lastRefreshTime = currentTime;
        }

        // 短时间休眠，避免CPU占用过高，同时保证检测的实时性
        sleep(1000);
    }

}

function waitHome() {
    while (true) {
        szzl.wakeUp()
        sleep(delaysz)
        guanbishaixuan()
        node2 = szzlSelector().text("规则").findOne()
        node3 = szzlSelector().text("抢单大厅").findOne()
        if (node2 && node3) {
            console.log("进入抢单大厅")
            return true
        }
        else {
            //console.log("未进入抢单大厅")
        }
        sleep(1000)
    }
}
function guanbishaixuan() {
    var node = szzlSelector().text("筛选订单类型").findOne()
    if (node) {
        if (onClickByText("确定")) {
            sleep(500)
            return true
        }
    }
    return false
}


function shuaxin() {
    szzl.wakeUp()
    sleep(delaysz)
    var node = szzlSelector().text("筛选").findOne()
    if (node) {
        if (onClickByText("筛选")) {
            sleep(1000)
            szzl.wakeUp()
            sleep(delaysz)
            guanbishaixuan()
        }
    }
}

function qd(text) {
    // 确保配置已初始化
    if (!config) {
        initConfig();
    }
    print(text)
    // 解析订单
    let orders = jiexi(text);
    console.log('解析到的订单:', orders.length, '个');

    // 筛选符合配置的订单
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        console.log('处理订单', i, ':', order);
        let isValid = true;

        // 1. 筛选订单类型
        let orderType = order['类型'] || '';
        let typeValid = false;
        console.log('订单类型:', orderType);
        console.log('配置的订单类型:', {
            didikuaiche: config.didikuaiche,
            tehuikuaiche: config.tehuikuaiche,
            diditekuai: config.diditekuai,
            suixinjie: config.suixinjie,
            chenjipinche: config.chenjipinche,
            didipinche: config.didipinche,
            qitaleixing: config.qitaleixing
        });

        // 优先检查特惠快车
        if (config.tehuikuaiche && orderType.includes('特惠')) {
            typeValid = true;
            console.log('符合条件：特惠快车');
        }
        // 再检查普通快车（排除特惠快车）
        else if (config.didikuaiche && orderType.includes('快车') && !orderType.includes('特惠')) {
            typeValid = true;
            console.log('符合条件：普通快车');
        }
        // 检查其他类型
        else if (config.diditekuai && orderType.includes('特快')) {
            typeValid = true;
            console.log('符合条件：特快');
        } else if (config.suixinjie && orderType.includes('随心')) {
            typeValid = true;
            console.log('符合条件：随心接');
        } else if (config.chenjipinche && orderType.includes('城际')) {
            typeValid = true;
            console.log('符合条件：城际拼车');
        } else if (config.didipinche && orderType.includes('拼车')) {
            typeValid = true;
            console.log('符合条件：滴滴拼车');
        } else if (config.qitaleixing) {
            typeValid = true;
            console.log('符合条件：其他类型');
        }

        if (!typeValid) {
            console.log('订单类型不符合条件，跳过');
            continue;
        }

        // 2. 筛选距离
        let distance = parseFloat(order['距离'] || '0');
        console.log('订单距离:', distance, 'km, 配置最大距离:', config.shezhijuli, 'km');
        if (distance > config.shezhijuli) {
            console.log('距离不符合条件，跳过');
            continue;
        }

        // 3. 筛选价格
        let price = parseFloat(order['价格'] || '0');
        console.log('订单价格:', price, '元, 配置最低价格:', config.shezhijiage, '元');
        if (price < config.shezhijiage) {
            console.log('价格不符合条件，跳过');
            continue;
        }

        // 4. 筛选终点关键词
        let destination = order['目的地'] || '';
        console.log('订单目的地:', destination);
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
                console.log('目的地包含不抢关键词，跳过');
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
                console.log('目的地不包含只抢关键词，跳过');
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
function jiexi(text) {
    // 分割文本为单行（只按换行符分割）
    let lines = text.split('\n').filter(line => line.trim() !== '');
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
        if (orderStarted && line.includes('TextView') && line.includes('text="')) {
            // 匹配类型文本，包括"特惠快车"、"随心接实时单"等
            let typeMatch = line.match(/text="([^"]+)"/);
            if (typeMatch) {
                let typeText = typeMatch[1];
                if (typeText.includes('快车') || typeText.includes('拼车') || typeText.includes('随心') || typeText.includes('特快')) {
                    currentOrder['类型'] = typeText;
                }
            }
        }

        // 提取抢单坐标
        if (orderStarted && line.includes('TextView') && line.includes('text="抢单"')) {
            let rectMatch = line.match(/Rect\(([^\)]+)\)/);
            if (rectMatch) {
                // 优化抢单坐标格式：删除"-"，用","分割
                let coordinate = rectMatch[1].replace('-', ',').replace(/\s+/g, ' ').trim();
                currentOrder['抢单坐标'] = coordinate;
                // 订单结束，保存
                orders.push(currentOrder);
                currentOrder = null;
                orderStarted = false;
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
    print(text)
    var nodes = szzlSelector().text(text).find();
    print(nodes)
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
            Click(cachedData.x, cachedData.y);
            return true;
        }
    }

    if (findMode == 0) {
        // 使用节点点击（不缓存）
        console.log('使用节点查找文本:', text);

        if (node) {
            let x = node.centerX();
            let y = node.centerY();

            Click(x, y)
            console.log('节点点击坐标:', { x: x, y: y });
            return true
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
                let x = (rect.left + 50)
                let y = (rect.top + rect.bottom) / 2;
                Click(x, y)
                // 保存到缓存
                ocrCache.put(cacheKey, { x: x, y: y, mode: 'ocr', text: ocrResult.label, addname: addname });
                console.log('OCR识别成功并缓存:', { x: x, y: y, text: ocrResult.label, cacheKey: cacheKey });
                return true;
            }
        }

        console.error('OCR未找到文本:', text);
    }
}


module.exports = zhixing; // 导出函数