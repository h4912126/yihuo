'ui';

var storage = storages.create('zhanguo');
// 加载zhixing.js文件
var zhixing = require('zhixing.js');
var hid = require('hid.js')
szzl()

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

ui.tab1.on("click", function () { switchTab("tab1"); });
ui.tab2.on("click", function () { switchTab("tab2"); });
ui.tab3.on("click", function () { switchTab("tab3"); });

ui.guanbi.on('click', function () {
    exit();
});

ui.queding.on('click', function () {
    saveData();
    //ui.finish();
    console.show();
    //console.setSize(device.width * 0.5, device.height * 0.4);
    console.setPosition(0, device.height * 0.4);

    // 启动线程并保存引用
    zhixingThread = threads.start(function () {
        zhixing.zhixing(hid);
    });
    try{
        createFloatyButton();
    }catch(e){
        console.log( e);
    }

});

loadData();
ui.statusBarColor("#1E9FFF");

function createFloatyButton() {
    var window = floaty.window(
        <frame>
            <img id="stopButton" src="close2.png" w="40" h="40" />
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