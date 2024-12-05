/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

// deviceready - 設備就緒：它是設備 API 準備好，並可以訪問的信號（相當於onload）
// pause - 應用掛起：切換到後台
// resume - 應用回來：切換到前台
// backbutton - 點機回退按鈕
// menubutton - 按下菜單按鈕
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    alert('設備就緒');
    // 其他事件寫入在 deviceready 的回調函數中
    document.addEventListener('pause', function () {
        alert('應用掛起');
    })

    document.addEventListener('resume', function () {
        alert('應用恢復');
    })

    document.addEventListener('backbutton', function () {
        alert('應用回退');
    })

    // 官網：https://cordova.apache.org/docs/en/12.x/cordova/events/events.html#deviceready

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    // 添加獲取位置的單擊事件
    document.getElementById('getPosition').addEventListener('click', getPosition);

    // 拍照
    document.getElementById('takePic').addEventListener('click', takePic);

    // 獲取設備信息
    document.getElementById('deviceInfo').addEventListener('click', deviceInfo);

    // 自定義插件的監聽事件
    document.getElementById('myToast').addEventListener('click', myToast);
}

/**
 * cordova-plugin-geolocation 插件
 * https://github.com/apache/cordova?tab=readme-ov-file
 * https://github.com/apache/cordova-plugin-geolocation
 * https://www.npmjs.com/package/cordova-plugin-geolocation
 */
function getPosition() {
    var options = {
        enableHighAccuracy: true,
        maximumAge: 10000,
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {
        alert('經度：' + position.coords.longitude + "\n" +
              '緯度：' + position.coords.latitude + "\n" +
              '高度：' + position.coords.altitude + "\n" +
              '精確度：' + position.coords.accuracy + "\n" +
              '高精確度：' + position.coords.altitudeAccuracy + "\n" +
              '方向：' + position.coords.heading + "\n" +
              '速度：' + position.coords.speed + "\n" +
              'Timestamp：' + position.timestamp)
    }

    function onError(error) {
        alert('錯誤Code：' + error.code + "\n 信息Message:" +
              error.message)
    }
}

/**
 * 拍照：cordova-plugin-camera
 * https://github.com/apache/cordova-plugin-camera
 * https://www.npmjs.com/package/cordova-plugin-camera
 * https://cordova.apache.org/plugins/
 */

function takePic() {
    navigator.camera.getPicture(onSuccess, onError, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    })

    function onSuccess(imageURI) {
        // var image = document.getElementById('myImage');
        // image.src = imageURI;
        
        /**
         * 如果使用 FILE_URI ，就需要使用 resolveLocalFileSystemURL 獲取兼容的 URI
         * resolveLocalFileSystemURL 是 Cordova 提供的一個 API，用於解析本地文件系統的 URI，並返回一個可以通過 Cordova File API 操作的 FileEntry 或 DirectoryEntry 對象
         */
        window.resolveLocalFileSystemURL(
            imageURI,
            function (fileEntry) {
                var image = document.getElementById('myImage');
                image.src = fileEntry.toURL();
            },
            function (error) {
                console.error("文件解析失敗: ", error);
            }
        );
    }

    function onError(message) {
        alert("拍照失敗, Message: " + message);
    }
}

/**
 * 獲取設備信息
 * https://github.com/apache/cordova-plugin-device
 * https://www.npmjs.com/package/cordova-plugin-device
 */
function deviceInfo() {
    alert("Cordova 版本：" + device.cordova + "\n"
        + "Device model：" + device.model + "\n"
        + "操作系統：" + device.platform + "\n"
        + "UUID：" + device.uuid + "\n"
        + "是否在模擬器上：" + device.isVirtual + "\n"
        + "設備序列號：" + device.serial + "\n"
        + "操作系統版本號：" + device.version + "\n"
        + "終端製造商：" + device.manufacturer)
}

/**
 * 自定義插件
 * https://www.bilibili.com/video/BV17q4y1T7sd?spm_id_from=333.788.player.switch&vd_source=9b83a5b5056d62d809846a8d58b7b92b&p=12
 * 
 */
function myToast() {
    // 注意這裡的 MyToast 名字要注意大小寫
    cordova.plugins.MyToast.coolMethod("hello", onSuccess, onError);

    function onSuccess(message) {
        alert("MyToast success " + message);
    }

    function onError() {
        alert("MyToast Error");
    }
}