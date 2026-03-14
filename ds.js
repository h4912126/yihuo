
/*// 启用数字助理（打开设置页面）
szzl();

// 检查服务状态
szzl.exists();      // 是否为默认数字助理
szzl.isRunning();   // 服务是否运行

// 获取控件
szzl.root;          // 获取根节点
szzl.roots;         // 获取所有窗口的根节点
szzl.structure;     // 获取原始 AssistStructure

// 使用选择器
szzlSelector().text("确定").clickable().find();
szzlText("确定").findOne();
szzlId("button_ok").find();
szzlClassName("Button").enabled().find();
szzlTextContains("设置").find();
szzlDescContains("返回").findOne();

// SzzlViewNode 方法
var node = szzlText("确定").findOne();
node.text();        // 获取文本
node.id();          // 获取 ID
node.desc();        // 获取描述
node.bounds();      // 获取边界
node.clickable();   // 是否可点击
node.children();    // 获取子节点
node.parent();      // 获取父节点
node.findByText("子文本");  // 在子树中查找*/
//szzl();
//szzl.wakeUp()
//a = szzl.dumpNodes()
//print(a)
/*
        ::isRunning.name,
        ::exists.name,
        ::hasSession.name,
        ::isSessionShowing.name,
        ::launchSettings.name,
        ::wakeUp.name,
        ::wakeUpAndWait.name,
        ::dismiss.name,
        ::capture.name,
        ::getStructure.name,
        ::getWindowNodes.name,
        ::getViewNodes.name,
        ::getRoots.name,
        ::requestAssist.name,
        ::clearStructure.name,
        ::debugInfo.name,
        ::dumpNodes.name,
        ::printNodes.name,
    )
    
    override val globalAssignmentFunctions = listOf(
        ::szzlSelector.name,
        ::szzlText.name,
        ::szzlTextContains.name,
        ::szzlTextStartsWith.name,
        ::szzlTextEndsWith.name,
        ::szzlTextMatches.name,
        ::szzlId.name,
        ::szzlIdContains.name,
        ::szzlIdStartsWith.name,
        ::szzlIdEndsWith.name,
        ::szzlIdMatches.name,
        ::szzlDesc.name,
        ::szzlDescContains.name,
        ::szzlDescStartsWith.name,
        ::szzlDescEndsWith.name,
        ::szzlDescMatches.name,
        ::szzlClassName.name,
        ::szzlClassNameContains.name,
        ::szzlClassNameStartsWith.name,
        ::szzlClassNameEndsWith.name,
        ::szzlClassNameMatches.name,
        ::szzlPackageName.name,
        ::szzlPackageNameContains.name,
        ::szzlClickable.name,
        ::szzlLongClickable.name,
        ::szzlCheckable.name,
        ::szzlChecked.name,
        ::szzlFocusable.name,
        ::szzlFocused.name,
        ::szzlSelected.name,
        ::szzlEnabled.name,
        ::szzlScrollable.name,
        ::szzlEditable.name,
        ::szzlVisibleToUser.name,
        ::szzlDepth.name,
        ::szzlMinDepth.name,
        ::szzlMaxDepth.name,
        ::szzlBoundsInside.name,
        ::szzlBoundsContains.name,
*/
//var nodes = szzlSelector().desc("Play 商店").text("Play 商店").clickable(true).find();

//print(nodes)

szzl()

// 检查服务状态
if (szzl.exists()) {

}
else {
    exit()
}     // 是否为默认数字助理

if (szzl.isRunning()) {

}
else {
    exit()
}     // 是否为默认数字助理
/*szzl.isRunning();   // 服务是否运行

// 开始计时
var startTime = new Date().getTime();
szzl.wakeUp()
sleep(500)
//a = szzl.dumpNodes()
       node2 = szzlSelector().text("规则").findOne()
        node3 = szzlSelector().text("抢单大厅").findOne()
// 结束计时
var endTime = new Date().getTime();
var executionTime = endTime - startTime;
print(node2)
print(node3)
console.log("执行时间: " + executionTime + " 毫秒");*/
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

text = `
 === 控件树 ===
窗口数量: 1

【窗口 0】com.sdu.didi.gsui/com.didichuxing.driver.sdk.hybrid.HybridActivity
FrameLayout Rect(0, 0 - 1080, 2412)
  LinearLayout Rect(0, 0 - 1080, 2364)
    View id="action_mode_bar_stub" Rect(0, 0 - 0, 0)
    FrameLayout Rect(0, 0 - 1080, 2364)
      LinearLayout id="action_bar_root" Rect(0, 0 - 1080, 2364)
        View id="action_mode_bar_stub" Rect(0, 0 - 0, 0)
        FrameLayout id="content" Rect(0, 0 - 1080, 2364)
          FrameLayout id="root_view" Rect(0, 0 - 1080, 2364)
            RelativeLayout Rect(0, 0 - 1080, 2364)
              RelativeLayout id="driver_sdk_activity_fusion_root" Rect(0, 240 - 1080, 2364)
                FrameLayout id="driver_sdk_activity_fusion_video_full" Rect(0, 240 - 0, 240)
                FrameLayout id="web_parent" Rect(0, 240 - 1080, 2364)
                  FrameLayout Rect(0, 240 - 1080, 2364)
                    WebView [可点击] Rect(0, 240 - 1080, 2364)
                      WebView text="抢单大厅" Rect(0, 240 - 1080, 2364)
                        View Rect(0, 240 - 1080, 2364)
                          View Rect(0, 240 - 1080, 2364)
                            View Rect(0, 240 - 1080, 2364)
                              View Rect(0, 240 - 1080, 2364)
                                View Rect(0, 240 - 1080, 2364)
                                  View Rect(0, 240 - 1080, 2170)
                                    View Rect(30, 285 - 1050, 681)
                                      View Rect(30, 285 - 1050, 465)
                                        TextView text="附近2单" Rect(45, 353 - 270, 426)
                                        View Rect(781, 345 - 1026, 435)
                                          TextView text="综合排序" Rect(781, 361 - 972, 418)
                                        View Rect(592, 345 - 743, 435)
                                          TextView text="筛选" Rect(592, 361 - 689, 418)
                                          View Rect(757, 364 - 757, 416)
                                      View Rect(33, 483 - 234, 633)
                                        Image text="H5hrRRXWdyBur_bnpiEQX" Rect(69, 483 - 219, 633)
                                      View Rect(234, 513 - 1038, 603)
                                        View Rect(234, 513 - 1038, 603)
                                          TextView text="滴滴拼车自选单规则说明" Rect(234, 531 - 727, 584)
                                        View Rect(972, 534 - 993, 579)
                                          Image text="vYPTD+uM4YYHgQAAAAASUVORK5CYII" Rect(972, 535 - 993, 572)
                                    View Rect(30, 711 - 1050, 1352)
                                      View Rect(30, 783 - 1050, 951)
                                        TextView text="出发时间" Rect(90, 786 - 234, 828)
                                        TextView text="现在出发" Rect(90, 841 - 305, 904)
                                        View Rect(90, 846 - 375, 900)
                                        View Rect(374, 783 - 660, 900)
                                          TextView text="距您" Rect(434, 786 - 507, 828)
                                          TextView text="1.92" Rect(434, 843 - 519, 903)
                                          View Rect(518, 846 - 582, 899)
                                            TextView text="km" Rect(518, 846 - 582, 899)
                                        View Rect(659, 783 - 1020, 900)
                                          TextView text="价格" Rect(728, 786 - 800, 828)
                                          View Rect(728, 846 - 774, 899)
                                            TextView text="约" Rect(728, 846 - 774, 899)
                                          TextView text="12.9" Rect(773, 843 - 857, 903)
                                          View Rect(856, 846 - 902, 899)
                                            TextView text="元" Rect(856, 846 - 902, 899)
                                      View Rect(90, 951 - 1050, 1143)
                                        View Rect(90, 951 - 990, 1023)
                                          TextView text="牌坊路二街二巷|双喜照明" Rect(135, 950 - 605, 999)
                                        View Rect(90, 1023 - 990, 1095)
                                          TextView text="中山市|华信公寓" Rect(135, 1022 - 438, 1071)
                                        View Rect(90, 1095 - 990, 1143)
                                          TextView text="预计全程5.26km" Rect(135, 1094 - 442, 1143)
                                      View Rect(30, 1143 - 1050, 1277)
                                        View Rect(90, 1185 - 1050, 1277)
                                          TextView text="特惠快车" Rect(108, 1200 - 264, 1246)
                                        View Rect(723, 1143 - 990, 1263)
                                          TextView text="抢单" Rect(811, 1176 - 902, 1229)
                                    View Rect(30, 1381 - 1050, 2023)
                                      View Rect(30, 1453 - 1050, 1622)
                                        TextView text="出发时间" Rect(90, 1456 - 234, 1499)
                                        TextView text="现在出发" Rect(90, 1511 - 305, 1575)
                                        View Rect(90, 1516 - 375, 1571)
                                        View Rect(374, 1453 - 660, 1571)
                                          TextView text="距您" Rect(434, 1456 - 507, 1499)
                                          TextView text="2.47" Rect(434, 1513 - 528, 1574)
                                          View Rect(527, 1516 - 591, 1570)
                                            TextView text="km" Rect(527, 1516 - 591, 1570)
                                        View Rect(659, 1453 - 1020, 1571)
                                          TextView text="价格" Rect(728, 1456 - 800, 1499)
                                          View Rect(728, 1516 - 774, 1570)
                                            TextView text="约" Rect(728, 1516 - 774, 1570)
                                          TextView text="8" Rect(773, 1513 - 800, 1574)
                                          View Rect(799, 1516 - 844, 1570)
                                            TextView text="元" Rect(799, 1516 - 844, 1570)
                                      View Rect(90, 1621 - 1050, 1814)
                                        View Rect(90, 1621 - 990, 1694)
                                          TextView text="横栏镇|惠胜超市" Rect(135, 1620 - 438, 1670)
                                        View Rect(90, 1693 - 990, 1766)
                                          TextView text="中山市|梦想公寓民宿(中山古镇站店)" Rect(135, 1692 - 801, 1742)
                                        View Rect(90, 1765 - 990, 1814)
                                          TextView text="预计全程5.40km" Rect(135, 1764 - 442, 1814)
                                      View Rect(30, 1813 - 1050, 1948)
                                        View Rect(90, 1855 - 1050, 1948)
                                          TextView text="随心接实时单" Rect(108, 1870 - 341, 1917)
                                        View Rect(723, 1813 - 990, 1934)
                                          TextView text="抢单" Rect(811, 1846 - 902, 1900)
                                    TextView text="没有更多了～" Rect(414, 2078 - 666, 2128)
                                View Rect(0, 240 - 1080, 241)
                                  View Rect(0, 240 - 1080, 241)
                                    TextView text="下拉刷新" Rect(456, 240 - 624, 241)
                        View Rect(0, 2363 - 1080, 2364)
                    ProgressBar Rect(0, 240 - 1080, 246)
                ImageView id="driver_sdk_activity_fusion_error" Rect(0, 240 - 0, 240)
                TextView text="返回" id="driver_sdk_activity_fusion_return_full" Rect(0, 240 - 0, 240)
                View id="driver_sdk_activity_fusion_extension_stub" Rect(0, 240 - 0, 240)
                View id="driver_sdk_mask" Rect(0, 240 - 0, 240)
              RelativeLayout Rect(0, 0 - 1080, 240)
                RelativeLayout id="main_layout" Rect(0, 0 - 1080, 240)
                  LinearLayout id="layout_top_back" [可点击] Rect(0, 96 - 204, 240)
                    FrameLayout Rect(0, 96 - 204, 240)
                      RelativeLayout Rect(0, 96 - 204, 240)
                        View id="titlebar_left_back" Rect(42, 108 - 162, 228)
                  LinearLayout id="layout_top_middle" Rect(432, 96 - 648, 240)
                    FrameLayout Rect(432, 96 - 648, 240)
                      LinearLayout Rect(432, 96 - 648, 240)
                        TextView text="抢单大厅" id="title_bar_name" Rect(432, 131 - 648, 204)
                  LinearLayout id="layout_top_right" [可点击] Rect(936, 96 - 1080, 240)
                    FrameLayout Rect(936, 96 - 1080, 240)
                      LinearLayout Rect(936, 96 - 1080, 240)
                        TextView text="规则" id="titlebar_right_btn" Rect(960, 135 - 1056, 200)
                  TextView id="txt_debug" Rect(0, 0 - 0, 0)
                  View id="v_divide_line" Rect(0, 0 - 0, 0)
          RelativeLayout Rect(0, 0 - 0, 0)
  View id="navigationBarBackground" Rect(0, 2364 - 1080, 2412)
  ViewGroup Rect(0, 0 - 1080, 2412)
    ImageView Rect(0, 0 - 1080, 300)
    ImageView Rect(0, 300 - 1080, 600)
    ImageView Rect(0, 600 - 1080, 900)
    ImageView Rect(0, 900 - 1080, 1200)
    ImageView Rect(0, 1200 - 1080, 1500)
    ImageView Rect(0, 1500 - 1080, 1800)
    ImageView Rect(0, 1800 - 1080, 2100)
    ImageView Rect(0, 2100 - 1080, 2400)
    ImageView Rect(0, 2400 - 1080, 2412)
`

    var storage = storages.create('zhanguo');
// 测试配置，确保能够找到符合条件的订单
var config = {
        // 抢单类型配置
        didikuaiche: true,  // 开启快车
        tehuikuaiche: true, // 开启特惠快车
        diditekuai: true,   // 开启特快
        suixinjie: true,    // 开启随心接
        chenjipinche: true, // 开启城际拼车
        didipinche: true,   // 开启滴滴拼车
        qitaleixing: true,  // 开启其他类型

        // 抢单配置
        qitajiage: 5,        // 其他类型均价
        jiange1: '500',      // 刷新间隔
        jiange2: '800',      // 刷新间隔
        shezhijuli: 10,      // 接人距离10公里内
        shezhijiage: 5,      // 抢单价格5元以上

        // 终点关键词配置
        bqzdbox: false,      // 不开启不抢终点
        zbjhs: [],           // 不抢终点关键词
        zqzdbox: false,      // 不开启只抢终点
        zqzdwz: []           // 只抢终点关键词
    };


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
let orders = jiexi(text);
console.log('解析到的订单:', orders.length, '个');
console.log(orders)

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
}