runtime.loadDex('hidv3.apk')
//importClass(com.rainbl.HID);
const Hid = com.rainbl.HID()
print(Hid)
var hid = {}
// 适用于 Android 12+
if (context.checkSelfPermission(android.Manifest.permission.BLUETOOTH_CONNECT) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
    context.requestPermissions([android.Manifest.permission.BLUETOOTH_CONNECT, android.Manifest.permission.BLUETOOTH_SCAN], 1);
}
hid.HID_connect = function () {
    //初始化
    if (!Hid.initBluetooth(context)) {
        console.error("蓝牙未打开!")
        return false
    }
    //开始链接设备
    if (!Hid.connect(false, 0)) {
        console.error("蓝牙未配对!")
        return false
    }
    for (i = 1; i < 100; i++) {
        let constate = Hid.getConnectState()
        
        if (constate) {
            console.info("链接设备成功!!")
            return true
        }else{
            log("连接蓝牙中:", constate)
        }
        if (!constate && i == 99) {
            console.error("没有成功链接到蓝牙设备!")
            return false
        }
        sleep(100)
    }
    
    return false
}
hid.HID_reg = function(key,wait){
    //认证密钥
    for (i = 1; i < 10; i++) {
        Hid.reg(key)
        sleep(100)
        for (j = 1; j < 10; j++) {
            let regResult = Hid.getData(1)
            //log(regResult);
            if (regResult.indexOf("fail") > -1) {
                console.error("!!!!!!!HID密钥错误!!!!!!")
                return null
            } else if (regResult.indexOf("success") > -1) {
                console.info("[认证成功!HID初始化完成]")
                return true
            }else if (regResult.indexOf("time") > -1 && i>=5 ) {
                console.error("未知认证状态")
                return false
            }  
             sleep(100) 
        }
        
    }
    return false
}
 hid.HID_close = function(){
    if(Hid.BLEGatt!=null){
        console.info("完全关闭连接")
        Hid.BLEGatt.disconnect();
        Hid.BLEGatt.close();
        Hid.disconnect()
        
    }        
}
hid.HID_init = function(key,times){
    times = times || 1000
    if(!Hid.getConnectState()){
        if(hid.HID_connect()){
            log("蓝牙名:",Hid.getName())
        }else{
            console.error("----->蓝牙初始化失败")
            exit()
        }
    }
    let errCount = 0
    for(let i=0;i<100;i++){
        Hid.setXY(device.width,device.height)
        let result = Hid.waitFor(times)
        if(result == "0|ok"){
            log("----->HID:初始化已成功!!")
            return true
        }else if(result.indexOf("error init")>-1){
            //需要注册
            console.info("----->蓝牙设备需要注册!!!")
            key = Hid.getHidZcm()
            let regResult = HID_reg(key)
            if(regResult==null){
                console.error("----->蓝牙HID认证失败")
                exit()
            }
        }else if(result.indexOf("error disconnect")>-1){
            console.error("----->蓝牙还未连接!!")
            HID_close();
            sleep(100)
            if(HID_connect()){
                log("蓝牙名:",Hid.getName())
            }else{
                console.error("----->蓝牙初始化失败")
                exit()
            }
        }else if(result == "timeout"){
            errCount ++
            if(errCount>=10){
                HID_close();
                console.error("----->初始化过久,重新连接")
                HID_connect();
                times = 1500

            }
        
        }
        //log("设置坐标中",result)
        sleep(100)
    }
    console.error("----->HID可能初始化失败!!")
}
function getRnd(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
//HID滑动函数封装例子
 hid.HidSwipe = function(startX, startY, endX, endY, duration,按下时间,松开时间) {
    duration  = duration || 500
    var steps = Math.ceil(duration / 10);
    var delay = duration / steps;

    Hid.touchDown(startX, startY);
    sleep(按下时间 || 100);

    for (let i = 0; i < steps; i++) {
        let x = startX + (endX - startX) * (i + 1) / steps;
        let y = startY + (endY - startY) * (i + 1) / steps;
        Hid.touchMove(x, y);
        sleep(delay);
        //log("滑动轨迹",x,y,delay)

    }
    sleep(松开时间 || 200);
    Hid.touchUp(endX, endY);
    sleep(100);
}
 hid.HidSwipeRnd = function(startX, startY, endX, endY,duration) {
    var steps = Math.ceil(duration / 10);
    var delay = duration / steps;

    Hid.touchDown(startX, startY);
    sleep(100);
    for (let i = 0; i < steps; i++) {
        let x = startX + (endX - startX) * (i + 1) / steps;
        let y = startY + (endY - startY) * (i + 1) / steps;
        Hid.touchMove(x+getRnd(-10,10), y+getRnd(-10,10));
        let rndtime = delay+getRnd(-10,20)
        if(rndtime <=0) rndtime = getRnd(5,20)
        sleep(rndtime);
        //log("滑动轨迹",x,y,delay)
    }
    sleep(200);
    Hid.touchUp(endX, endY);
    sleep(100);
}
//封装一个Home键
hid.HidHome = function(){
    intent = new android.content.Intent(android.content.Intent.ACTION_MAIN);
    intent.addCategory(android.content.Intent.CATEGORY_HOME);
    intent.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
    context.startActivity(intent);

}


//调用例子/逻辑
hid.onClick = function(x_1,y_1){
    // 添加-5到5范围内的随机值
    var randomX = Math.round(Math.random() * 11 - 5);
    var randomY = Math.round(Math.random() * 11 - 5);
    var finalX = x_1 + randomX;
    var finalY = y_1 + randomY;
    Hid.tap(finalX, finalY);
    console.log("点击坐标: (" + finalX + ", " + finalY + ") (原始: (" + x_1 + ", " + y_1 + "), 随机偏移: (" + randomX + ", " + randomY + "))");
}

module.exports = hid; // 导出函数

//main()//执行main




//以下是横屏参考,横屏模式时坐标依然使用竖屏的




//****关键,一定要设置竖屏分辨率,也就是x比y小,不想在这里设置找到Rain_HID.js  Hid.setXY(screen.getScreenWidth(),screen.getScreenHeight()) */
//以横屏初始化坐标,即便是横屏模式也设置竖屏模式 1080*1920这种
/*  
    if(device.width>device.height){
        printl("需要设置竖屏模式")
        for(let i=0;i<10;i++){
            Hid.setXY(device.width,device.height)
            sleep(100)
        }
    }


    //滑动转换

    xy = scale(起点x, 起点y)
    xy1 = scale(终点x, 终点y)
    HidSwipe(xy[0],xy[1],xy1[0],xy1[1])
    //HidSwipe(起点x, 起点y, 终点x, 终点y, 滑动时间(可选),按下时间(可选),抬起时间(可选))


    //tap(2253,532)//横屏点击
    //sleep(1000)
*/

//横屏坐标点击
/*
function tap(x,y){
    let xy = scale(x, y)
    Hid.touchDown(xy[0],xy[1])
    sleep.millisecond(100)
    Hid.touchUp2()
    sleep.millisecond(100)
}

//横屏坐标转竖屏坐标
function scale(x, y) {
    //AIwork横屏会自动改变分辨率
    let scx = screen.getScreenWidth()
    let scy = screen.getScreenHeight()
    let scn = 0;
    if(scx<scy){
        scn = scx
        scx = scy
        scy = scn
    }

    let offsetX = x - scx / 2;
    let offsetY = y - scy / 2;
    let newX = scy / 2 - offsetY;
    let newY = scx / 2 + offsetX;
    let rotatedX = Math.round(newX);
    let rotatedY = Math.round(newY);
    return [rotatedX, rotatedY];
}
*/