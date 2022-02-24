/* 自定义 - 判断是否点击过快 */

/* 自定义 - 全局提示消息,type为类型，1为绿色（成功），2为红色（失败） */
window._tips = function(type,txt){
    $(".tips").remove();
    let el =
        $('<div class="tips"></div>')
            .addClass("type_"+type)
            .text(txt)
            .prependTo("body")
            .fadeIn(300)
            .delay(1500)
            .fadeOut(100,function () {
                $(this).remove();
            });
};

/* 自定义 - 加载图标 */
window._loading = {
    // 添加
    add:function ( type ) {
        $(".loading").remove();
        let el =
            $('<div class="loading"></div>')
                .addClass("type_"+type)
                .appendTo("body");
    },
    // 移除
    remove:function () {
        $(".loading").remove();
    },
};

/* 自定义 - 字体大小 */
window._rootSize = function (){
    function responsive() { html.style.fontSize = innerWidth / 375 * 100 + "px"; }
    window.onresize = function () { responsive(); };
    let html = document.querySelector("html");
    responsive();
};

/* 自定义 - 编译数据 */
window._encode = function (data){
    let res = '';
    for (let key in data) { res += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&' }
    return res;
};

/* 自定义 - 获取剪切板内容 */
window._getClip = function(){
    if( window.plus ){
        let Context = plus.android.importClass("android.content.Context");
        let main = plus.android.runtimeMainActivity();
        let clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
        return plus.android.invoke(clip, "getText");
    }
};

/* 自定义 - 转换日期 */
window._transferDate = function ( type,value ) {

    /*
        value是毫秒数，
        type用来选择类型，
        "年月日" 或 "年月日时分秒"
    */

    // 自动补个‘0’
    function normalize(number) { return number < 10 ? ( "0" + number ) : number; }
    // 获取初始毫秒数
    let t = value ? new Date(value) : new Date();
    // 年,月,日,时,分,秒
    let year = t.getFullYear();
    let month = normalize(t.getMonth() + 1);
    let date = normalize(t.getDate());
    let hour = normalize(t.getHours());
    let minute = normalize(t.getMinutes());
    let second = normalize(t.getSeconds());
    // 判断类型,默认显示年月日
    if( type === '年月日' || !type ){
        return year + ' - ' + month + ' - ' + date;
    }else if( type === '年月日时分秒' ){
        return year + ' - ' + month + ' - ' + date + ' ' + ' ' + hour + ':' + minute + ':' + second;
    }

};

/* 自定义 - 复制input内容至剪切板 */
window._getClipText = function(target){
    target.select();
    document.execCommand("copy");
    window._tips(1,"已复制到剪切板");
};

/* 自定义 - 获取设备类型 */
window._getDeviceType = function () {
    let device_type = '';
    let ua = navigator.userAgent.toLowerCase();
    // 判断设备类型，先判断是不是pc端web，如果不是，则继续判断是app还是web
    if( window.navigator.platform === "Win32" ){
        device_type = "pc";
    }else{
        // 判断是不是微信里面打开
        if( ua.indexOf("MicroMessenger") !== -1 ){
            device_type = "wxapp";
        }else{
            // 判断是不是app里面
            if( ua.indexOf("plus") !== -1 ){
                if( ua.indexOf("android") !== -1 ){
                    device_type = "android";
                }else if( ua.indexOf("iphone") !== -1 ){
                    device_type = "iphone";
                }else if( ua.indexOf("ipad") !== -1 ){
                    device_type = "ipad";
                }
            }
            // 否则统一处理为web
            else{
                device_type = "web";
            }
        }
    }
    return device_type;
};

/* 自定义 - 获取token值 */
window._getToken = function(){
    let token = localStorage.getItem("token");
    return token && JSON.parse( token );
};

/* 图片转base64格式 */
window._imageToBase64 = function (img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas.toDataURL("image/" + ext);
};

/* 压缩图片 */
window._compressImage = function ( img,config ) {
    // 创建canvas
    let can = document.createElement('canvas');
    let ctx = can.getContext('2d');
    // 画布宽高
    can.width = config.width;
    can.height = config.width * (img.height / img.width);
    // 绘制
    ctx.drawImage(img, 0, 0, can.width, can.height);
    // 如果图片本身的宽度就已经小于设定宽度，则质量调整为1
    let quality = img.width > can.width ? config.quality : 1;
    // 返回图片地址
    return can.toDataURL("image/jpeg",  quality );
};

/* 验证表单 */
window.validate = {
    // 验证手机号
    tel:function (tel) {
        if (tel === '') {
            window._tips(2, "手机号不能为空哦~");
            return false;
        } else {
            // 验证手机格式
            if (!(/^1[345678]\d{9}$/.test(tel))) {
                window._tips(2, "手机号有误，请检查是否正确哦~");
                return false;
            }else{
                return true;
            }
        }
    }
};

export default {

}