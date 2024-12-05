package me.tutu.mytoast;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class MyToast extends CordovaPlugin {

    /**
     * 執行方法
     * 如果執行的動作（action）是 coolMethod，就會取這個參數 args.getString(0)
     * 然後執行 coolMethod 函數
     * 
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("coolMethod")) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }
        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            // 回調中成功的方法
            callbackContext.success(message);
        } else {
            // 回調中失敗的方法
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
