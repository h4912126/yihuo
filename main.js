'ui';
//var versionChecker = require('versioncheck.js');
// 执行版本检测
//versionChecker.checkVersion();
// 检查是否已经加载过fishhid.apk
if (!global.fishHidLoaded) {
    print("加载fishhid.apk")
    try{
        runtime.loadDex('fishhid.apk');
        importClass(com.fishhidpro.hid.HidBridge);
        global.fishHidLoaded = true;
        print("加载fishhid.apk成功")
    }
    catch(e){
        print("加载fishhid.apk失败")
        print(e)
    }
}
else{
    print("fishhid.apk已加载")
}   

var storage = storages.create('zhanguo');
// 加载zhixing.js文件
var zhixing = require('zhixing.js');
szzl()


function uiZhixing(){
    ui.layout(
        <vertical w="*" h="*" windowSoftInputMode="adjustPan">
            <vertical h="40" bg="#1E9FFF">
                <text text="战国" textColor="#ffffff" textSize="18sp" gravity="center" />
            </vertical>
    
            <horizontal h="40" bg="#ffffff">
                <button id="tab1" text="抢单大厅" w="0" layout_weight="1" h="40" textSize="15sp" textColor="#ffffff" bg="#1E9FFF" margin="8 4" cardCornerRadius="20" />
                <button id="tab2" text="本机信息" w="0" layout_weight="1" h="40" textSize="15sp" textColor="#64748b" bg="#ffffff" margin="4" cardCornerRadius="20" />
                <button id="tab3" text="教程方法" w="0" layout_weight="1" h="40" textSize="15sp" textColor="#64748b" bg="#ffffff" margin="4" cardCornerRadius="20" />
            </horizontal>
    
            <vertical id="pane1" visibility="visible">
                <vertical padding="16" bg="#ffffff" cardCornerRadius="16" marginBottom="16">
                    <text text="🚖 抢单类型" textSize="16sp" textColor="#1e293b" marginBottom="12" />
                    <horizontal w="*" marginBottom="8">
                        <checkbox id="didikuaiche" text="快车" w="0" layout_weight="1" />
                        <checkbox id="tehuikuaiche" text="特惠快车" w="0" layout_weight="1" />
                        <checkbox id="diditekuai" text="滴滴特快" w="0" layout_weight="1" />
                    </horizontal>
                    <horizontal w="*" marginBottom="12">
                        <checkbox id="suixinjie" text="随心接" w="0" layout_weight="1" />
                        <checkbox id="chenjipinche" text="城际拼车" w="0" layout_weight="1" />
                        <checkbox id="didipinche" text="滴滴拼车" w="0" layout_weight="1" />
                    </horizontal>
                    <horizontal w="*" padding="8" bg="#f0f9ff" cardCornerRadius="8">
                        <checkbox id="qitaleixing" text="其他类型" marginRight="8" />
                        <text text="均价" marginRight="4" />
                        <input id="qitajiage" w="60" h="40" inputType="number" hint="30" gravity="center_vertical" />
                        <text text="元以上" marginLeft="4" />
                    </horizontal>
                </vertical>
    
                <vertical padding="16" bg="#ffffff" cardCornerRadius="16" marginBottom="16">
                    <text text="⚙️ 抢单配置" textSize="16sp" textColor="#1e293b" marginBottom="12" />
                    <horizontal w="*" marginBottom="8">
                        <text text="刷新间隔" w="70" marginRight="8" />
                        <input id="jiange1" w="60" h="40" inputType="number" hint="500" gravity="center_vertical" />
                        <text text="~" margin="4" />
                        <input id="jiange2" w="60" h="40" inputType="number" hint="800" gravity="center_vertical" />
                        <text text="毫秒" marginLeft="4" />
                    </horizontal>
                    <horizontal w="*" marginBottom="8">
                        <text text="接人距离" w="70" marginRight="8" />
                        <input id="shezhijuli" w="60" h="40" inputType="number" hint="5" gravity="center_vertical" />
                        <text text="公里内" marginLeft="4" />
                    </horizontal>
                    <horizontal w="*">
                        <text text="抢单价格" w="70" marginRight="8" />
                        <input id="shezhijiage" w="60" h="40" inputType="number" hint="20" gravity="center_vertical" />
                        <text text="元以上" marginLeft="4" />
                    </horizontal>
                </vertical>
    
                <vertical padding="16" bg="#ffffff" cardCornerRadius="16" marginBottom="16">
                    <text text="📍 终点关键词" textSize="16sp" textColor="#1e293b" marginBottom="12" />
                    <horizontal w="*" marginBottom="8">
                        <checkbox id="bqzdbox" text="不抢终点" marginRight="8" />
                        <input id="zbjhs" w="*" h="40" hint="" hintColor="#94a3b8" gravity="center_vertical" />
                    </horizontal>
                    <horizontal w="*">
                        <checkbox id="zqzdbox" text="只抢终点" marginRight="8" />
                        <input id="zqzdwz" w="*" h="40" hint="" hintColor="#94a3b8" gravity="center_vertical" />
                    </horizontal>
                </vertical>
            </vertical>
    
            <vertical id="pane2" visibility="gone" padding="16" bg="#ffffff" cardCornerRadius="16" marginBottom="16">
                <text text="📟 本机信息" textSize="16sp" textColor="#1e293b" marginBottom="12" />
                <text text="本机IP" textColor="#64748b" marginBottom="4" />
                <text id="bjip" text="—" bg="#f1f5f9" padding="8" marginBottom="8" cardCornerRadius="8" />
                <text text="本机名称" textColor="#64748b" marginBottom="4" />
                <text id="bjmc" text="—" bg="#f1f5f9" padding="8" marginBottom="8" cardCornerRadius="8" />
                <text text="本机型号" textColor="#64748b" marginBottom="4" />
                <text id="bjxh" text="—" bg="#f1f5f9" padding="8" marginBottom="8" cardCornerRadius="8" />
                <text text="本机分辨率" textColor="#64748b" marginBottom="4" />
                <text id="bjfbl" text="—" bg="#f1f5f9" padding="8" cardCornerRadius="8" />
            </vertical>
    
            <vertical id="pane3" visibility="gone" padding="16" bg="#ffffff" cardCornerRadius="16" marginBottom="16">
                <text text="📘 教程方法" textSize="16sp" textColor="#1e293b" marginBottom="12" />
                <text text="本辅助已全分辨率适配，请确保HID连接。" bg="#e0f2fe" padding="12" cardCornerRadius="8" textColor="#0369a1" marginBottom="8" />
                <text text="详细教程请查看官方文档。如有问题请联系客服。" bg="#f1f5f9" padding="12" cardCornerRadius="8" textColor="#64748b" />
            </vertical>
    
            <horizontal h="54" bg="#ffffff" borderTop="1px #e2e8f0">
                <button id="guanbi" text="退出" w="0" layout_weight="1" h="*" bg="#ffffff" textColor="#1E9FFF" textSize="16sp" margin="8 0 4 8" />
                <button id="queding" text="运行" w="0" layout_weight="1" h="*" bg="#1E9FFF" textColor="#ffffff" textSize="16sp" margin="8 0 4 8" />
            </horizontal>
    
    
        </vertical>
    );
    ui.tab1.on("click", function () { switchTab("tab1"); });
ui.tab2.on("click", function () { switchTab("tab2"); });
ui.tab3.on("click", function () { switchTab("tab3"); });

ui.guanbi.on('click', function () {
    exit();
});

ui.queding.on('click', function () {
    saveData();
    console.show();
    console.setSize(device.width * 0.5, device.height * 0.4);
    console.setPosition(0, device.height * 0.4);
    threads.shutDownAll();
    // 启动线程并保存引用
    zhixingThread = threads.start(function () {
        zhixing.zhixing();
    });
    try{
        createFloatyButton();
    }catch(e){
        console.log( e);
    }

});
ui.statusBarColor("#1E9FFF");
loadData();
}

function uigengxing(){
    ui.layout(
        <vertical w="*" h="*" windowSoftInputMode="adjustPan">
        <vertical h="40" bg="#1E9FFF">
            <text text="检测更新" textColor="#ffffff" textSize="18sp" gravity="center" />
        </vertical>
    </vertical>
    );
    ui.statusBarColor("#1E9FFF");
}

function uikami(){
    ui.layout(
        <vertical w="*" h="*" windowSoftInputMode="adjustPan">
            <vertical w="*" h="180" bg="#ffffff" cardCornerRadius="12" padding="20">
                <text text="请输入卡密" textSize="16sp" textColor="#1e293b" marginBottom="20"/>
                <input id="kamInput" w="*" h="40" hint="请输入卡密" hintColor="#94a3b8"/>
                <horizontal w="*" marginTop="20">
                    <button id="cancel" text="取消" w="0" layout_weight="1" h="40" bg="#f1f5f9" textColor="#64748b" marginRight="10"/>
                    <button id="confirm" text="确定" w="0" layout_weight="1" h="40" bg="#1E9FFF" textColor="#ffffff"/>
                </horizontal>
            </vertical>
        </vertical>
    );
    
    // 添加事件监听
    ui.cancel.on('click', function() {
        ui.finish();
    });
    
    ui.confirm.on('click', function() {
        var kam = ui.kamInput.text();
        if (kam) {
            toast('卡密已输入: ' + kam);
            // 这里可以添加卡密验证逻辑
            uiZhixing()
        } else {
            toast('请输入卡密');
        }
    });
}

function switchTab(tabId) {
    ui.pane1.setVisibility(8); // GONE
    ui.pane2.setVisibility(8); // GONE
    ui.pane3.setVisibility(8); // GONE
    if (tabId === "tab1") {
        ui.pane1.setVisibility(0); // VISIBLE
        ui.tab1.setTextColor(colors.parseColor("#ffffff"));
        ui.tab1.setBackgroundColor(colors.parseColor("#1E9FFF"));
        ui.tab2.setTextColor(colors.parseColor("#64748b"));
        ui.tab2.setBackgroundColor(colors.parseColor("#ffffff"));
        ui.tab3.setTextColor(colors.parseColor("#64748b"));
        ui.tab3.setBackgroundColor(colors.parseColor("#ffffff"));
    } else if (tabId === "tab2") {
        ui.pane2.setVisibility(0); // VISIBLE
        ui.tab2.setTextColor(colors.parseColor("#ffffff"));
        ui.tab2.setBackgroundColor(colors.parseColor("#1E9FFF"));
        ui.tab1.setTextColor(colors.parseColor("#64748b"));
        ui.tab1.setBackgroundColor(colors.parseColor("#ffffff"));
        ui.tab3.setTextColor(colors.parseColor("#64748b"));
        ui.tab3.setBackgroundColor(colors.parseColor("#ffffff"));
    } else if (tabId === "tab3") {
        ui.pane3.setVisibility(0); // VISIBLE
        ui.tab3.setTextColor(colors.parseColor("#ffffff"));
        ui.tab3.setBackgroundColor(colors.parseColor("#1E9FFF"));
        ui.tab1.setTextColor(colors.parseColor("#64748b"));
        ui.tab1.setBackgroundColor(colors.parseColor("#ffffff"));
        ui.tab2.setTextColor(colors.parseColor("#64748b"));
        ui.tab2.setBackgroundColor(colors.parseColor("#ffffff"));
    }
}

function loadData() {
    var checkboxes = ['didikuaiche', 'tehuikuaiche', 'diditekuai', 'suixinjie', 'chenjipinche', 'didipinche', 'qitaleixing', 'bqzdbox', 'zqzdbox'];
    for (var i = 0; i < checkboxes.length; i++) {
        var key = checkboxes[i];
        if (ui[key]) {
            ui[key].checked = storage.get(key, false);
        }
    }
    var inputs = {
        qitajiage: '30',
        jiange1: '500',
        jiange2: '800',
        shezhijuli: '5',
        shezhijiage: '20',
        zbjhs: '',
        zqzdwz: ''
    };
    for (var key in inputs) {
        if (ui[key]) {
            ui[key].text(storage.get(key, inputs[key]));
        }
    }
    updateDeviceInfo();
}

function updateDeviceInfo() {
    try {
        ui.bjip.text(device.ip || '获取失败');
    } catch (e) {
        ui.bjip.text('获取失败');
    }
    ui.bjmc.text(device.model || '—');
    ui.bjxh.text(device.brand + ' ' + device.model || '—');
    ui.bjfbl.text(device.width + 'x' + device.height || '—');
}

function saveData() {
    var checkboxes = ['didikuaiche', 'tehuikuaiche', 'diditekuai', 'suixinjie', 'chenjipinche', 'didipinche', 'qitaleixing', 'bqzdbox', 'zqzdbox'];
    for (var i = 0; i < checkboxes.length; i++) {
        var key = checkboxes[i];
        if (ui[key]) {
            storage.put(key, ui[key].checked);
        }
    }
    var inputKeys = ['qitajiage', 'jiange1', 'jiange2', 'shezhijuli', 'shezhijiage', 'zbjhs', 'zqzdwz'];
    for (var i = 0; i < inputKeys.length; i++) {
        var key = inputKeys[i];
        if (ui[key]) {
            storage.put(key, ui[key].text());
        }
    }
}

function createFloatyButton() {
    var window = floaty.window(
        <frame>
            <button id="stopButton" text="停止" w="80" h="40" />
        </frame>
    );
    window.setPosition(0, 0);
    ui.layout.visibility = "gone"
    // 记录按键被按下时的触摸坐标
    var x = 0, y = 0;
    // 记录按键被按下时的悬浮窗位置
    var windowX, windowY;

    window.stopButton.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                return true;
            case event.ACTION_MOVE:
                // 移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                return true;
            case event.ACTION_UP:
                // 手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    // 停止线程
                    if (zhixingThread && zhixingThread.isAlive()) {
                        zhixingThread.interrupt();
                        toast('脚本已停止');
                    } else {
                        toast('脚本已停止');
                    }
                    // 关闭悬浮窗口
                    console.hide();
                    window.close();
                    exit()
                }
                return true;
        }
        return true;
    
    });
}
function main() {
    // 显示更新检测界面

    uigengxing();
    
    // 执行版本检测
    threads.start(function() {
        // 模拟版本检测过程
        var versionUrl = 'http://47.109.196.181/qdwversion.txt';
        var localVersion = '1.0.3';
        // 下载版本信息
        var response = http.get(versionUrl);
        if (response && response.statusCode === 200) {
            var serverVersion = response.body.string().trim();
            console.log('本地版本:', localVersion);
            console.log('服务器版本:', serverVersion);
            
            // 对比版本号
            if (compareVersions(localVersion, serverVersion) < 0) {
                // 不是最新版本，需要下载
                console.log('发现新版本，开始下载...');
                toast('发现新版本，正在下载...');
                
                // 下载APK
                var apkUrl = 'http://47.109.196.181/qdw.apk';
                
                // 直接使用系统浏览器打开下载链接，避免使用网络库
                app.startActivity({
                    action: 'android.intent.action.VIEW',
                    data: apkUrl
                });
                console.log('已启动系统浏览器下载');
                toast('已启动浏览器下载，请完成下载后安装');
                exit();
            } else {
                console.log('当前已是最新版本');
                ui.run(function() {
                    uikami();
                });
            }
        
        }
        else{
            ui.finish();
            exit();
        }
    });
}
function compareVersions(version1, version2) {
    var arr1 = version1.split('.');
    var arr2 = version2.split('.');
    var length1 = arr1.length;
    var length2 = arr2.length;
    var minlength = Math.min(length1, length2);
    var i = 0;
    
    for (; i < minlength; i++) {
        var a = parseInt(arr1[i]);
        var b = parseInt(arr2[i]);
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
    }
    
    if (length1 > length2) {
        for (var j = i; j < length1; j++) {
            if (parseInt(arr1[j]) != 0) {
                return 1;
            }
        }
        return 0;
    } else if (length1 < length2) {
        for (var j = i; j < length2; j++) {
            if (parseInt(arr2[j]) != 0) {
                return -1;
            }
        }
        return 0;
    }
    
    return 0;
}
main()