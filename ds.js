
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
    attributes["className"] = className() ?: ""
        attributes["text"] = text() ?: ""
        attributes["desc"] = desc() ?: ""
        attributes["id"] = id() ?: ""
        attributes["packageName"] = packageName() ?: ""
        attributes["bounds"] = bounds()
        attributes["boundsInParent"] = boundsInParent()
        attributes["depth"] = depth()
        attributes["childCount"] = childCount()
        attributes["clickable"] = clickable()
        attributes["longClickable"] = longClickable()
        attributes["checkable"] = checkable()
        attributes["checked"] = checked()
        attributes["focusable"] = focusable()
        attributes["focused"] = focused()
        attributes["selected"] = selected()
        attributes["enabled"] = enabled()
        attributes["scrollable"] = scrollable()
        attributes["editable"] = editable()
        attributes["visibleToUser"] = visibleToUser()
        return attributes
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
wakeUp()
sleep(100)
// 计算Rect中心点的函数
function getRectCenter(rectStr) {
    // 解析Rect字符串，格式如 "Rect(934, 216 - 1186, 510)"
    var match = rectStr.match(/Rect\((\d+),\s*(\d+)\s*-\s*(\d+),\s*(\d+)\)/);
    if (!match) {
        print("Rect格式解析失败:", rectStr);
        return null;
    }
    
    var x1 = parseInt(match[1]);
    var y1 = parseInt(match[2]);
    var x2 = parseInt(match[3]);
    var y2 = parseInt(match[4]);
    
    // 计算中心点
    var centerX = (x1 + x2) / 2;
    var centerY = (y1 + y2) / 2;
    
    return {
        x: Math.round(centerX),
        y: Math.round(centerY),
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    };
}

print(dumpNodes())

   // 是否为默认数字助理
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