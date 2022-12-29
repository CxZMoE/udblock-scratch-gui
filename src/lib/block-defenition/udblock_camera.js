function loadCamaraDefinition(board=""){
    Blockly.Python[`${board}_initCameraI2C`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var pins = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",");
        Blockly.Python.definitions_['import_camera_i2c'] = `cam_i2c = I2C(1,scl=Pin(${pins[1]}),sda=Pin(${pins[0]}),freq=100000)`;
        var code = `myCamera = Camera(cam_i2c)\n`;
        
        return code;
    };
    Blockly.Python[`${board}_switchMode`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var mode = Blockly.Python.valueToCode(block, "MODE", Blockly.Python.ORDER_ATOMIC);
        var code = `myCamera.SwitchMode('${mode}', 'start', None)\n`;
        return code;
    };
    /* 物体识别 */
    Blockly.Python[`${board}_getObjResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        var code
        switch (result_type) {
            case "id":
                code = `myCamera.GetObjName()`
                break
            case "x":
                code = `myCamera.GetObjAxis('x')`
                break
            case "y":
                code = `myCamera.GetObjAxis('y')`
                break
            case "w":
                code = `myCamera.GetObjAxis('w')`
                break
            case "h":
                code = `myCamera.GetObjAxis('h')`
                break
            case "count":
                code = `myCamera.GetObjCount()`
                break
        }
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    /* 分类识别 */
    Blockly.Python[`${board}_enterClassifierTraining`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_ATOMIC);
        return `myCamera.UpdateClassName(${name})\n`;
    };
    Blockly.Python[`${board}_loadClassifier`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_ATOMIC);
        return `myCamera.LoadClassName(${name})\n`;
    };
    Blockly.Python[`${board}_getClassifierResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        var code
        switch (result_type) {
            case "id":
                code = `myCamera.GetClassifierID()`
                break
            case "color":
                code = `myCamera.GetClassifierColor()`
                break
            case "score":
                code = `myCamera.GetClassifierTrust()`
                break
        }
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    /* 人脸识别 */
    Blockly.Python[`${board}_getFaceResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        var code
        switch (result_type) {
            case "id":
                code = `myCamera.GetFaceID()`
                break
            case "x":
                code = `myCamera.GetFaceAxis('x')`
                break
            case "y":
                code = `myCamera.GetFaceAxis('y')`
                break
            case "w":
                code = `myCamera.GetFaceAxis('w')`
                break
            case "h":
                code = `myCamera.GetFaceAxis('h')`
                break
            case "score":
                code = `myCamera.GetFaceScore()`
                break
        }
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_addFaceByName`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_ATOMIC);
        return `myCamera.AddFaceId(${name})\n`;
    };
    Blockly.Python[`${board}_delFaceSample`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        return `myCamera.DelFaceSample()\n`;
    };

    /* 二维码识别 */
    Blockly.Python[`${board}_getQRCodeResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        var code
        switch (result_type) {
            case "text":
                code = `myCamera.GetQRCodeText()`
                break
        }
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    /* 条形码识别 */
    Blockly.Python[`${board}_getBarCodeResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        var code
        switch (result_type) {
            case "text":
                code = `myCamera.GetQRCodeText()`
                break
        }
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    /* 标签识别 */
    Blockly.Python[`${board}_getAprilTagResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        var code
        switch (result_type) {
            case "x":
                code = `myCamera.GetAprilTagAxis('x')`
                break
            case "y":
                code = `myCamera.GetAprilTagAxis('y')`
                break
            case "w":
                code = `myCamera.GetAprilTagAxis('w')`
                break
            case "h":
                code = `myCamera.GetAprilTagAxis('h')`
                break
            case "rotation":
                code = `myCamera.GetAprilTagRotation()`
                break
            case "tag_family":
                code = `myCamera.GetAprilTagFamily()`
                break
            case "tag_id":
                code = `myCamera.GetAprilTagID()`
                break
            case "translation_3d":
                code = `myCamera.GetAprilTagTransform3D()`
                break
            case "rotation_3d":
                code = `myCamera.GetAprilTagRotation3D()`
                break
        }
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    /* 颜色识别 */
    Blockly.Python[`${board}_getColorResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        var code
        switch (result_type) {
            case "rgb":
                code = `myCamera.GetColorRGB()`
                break
            case "color":
                code = `myCamera.GetColorGuess()`
                break
        }
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    /* 循迹识别 */
    Blockly.Python[`${board}_getRouteResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        var code
        switch (result_type) {
            case "cross_x":
                code = `myCamera.GetRouteCrossAxis('cross_x')`
                break
            case "cross_y":
                code = `myCamera.GetRouteCrossAxis('cross_y')`
                break
            case "type":
                code = `myCamera.GetRouteCrossType()`
                break
            case "offset_x":
                code = `myCamera.GetRouteCenterOffset()`
                break
        }
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
}

module.exports = loadCamaraDefinition;