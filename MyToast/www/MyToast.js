var exec = require('cordova/exec');

// 這個對應的就是 src/android/myToast 的方法
// 流程： 在 src/android/myToast 原生層寫了 java 函數 ---> 通過調用 cordova 下的 exec，把 java 函數轉成 js 函數
// 使用時就可以用 js 的方式，去調用 java 中的內容
exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'MyToast', 'coolMethod', [arg0]);
};
