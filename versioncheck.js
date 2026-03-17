// 版本检测功能
// 版本检测功能
function checkVersion() {
    console.log('开始检测版本...');
    
    // 创建一个信号量，用于等待子线程完成

    var shouldContinue = 0;

    // 在子线程中执行网络操作
    threads.start(function() {
        var localVersion = '1.0.4'; // 这里可以从本地文件或存储中读取
            
        // 服务器版本信息URL
        var versionUrl = 'http://47.109.196.181/qdwversion.txt';
        
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
                // 版本一致，设置shouldContinue为true
                shouldContinue = 1;
            }
        
        }
        else{
            shouldContinue = 2;
            exit();
        }
    });
    

    // 返回检测结果
    return shouldContinue;
}

// 请求网络权限
function requestNetwork() {
    try {
        // 检查网络权限
        if (!context.checkSelfPermission('android.permission.INTERNET')) {
            console.log('请求网络权限...');
            // 请求网络权限
            app.requestPermissions(['android.permission.INTERNET']);
            sleep(1000); // 等待权限请求完成
        }
        // 检查网络权限是否已授予
        return context.checkSelfPermission('android.permission.INTERNET') === 0;
    } catch (e) {
        console.error('请求网络权限失败:', e);
        // 权限请求失败时，默认返回true，继续执行
        return true;
    }
}

// 版本号对比函数
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

// 导出函数
module.exports = {
    checkVersion: checkVersion,
    compareVersions: compareVersions
};