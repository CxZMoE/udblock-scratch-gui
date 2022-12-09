function loadCamaraDefinition(board=""){
    Blockly.Python[`${board}_initCameraI2C`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var code = `myCamera = Camera(udpi_i2c)\n`;
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
        return [`myCamera.GetItem('obj', '${result_type}')`, Blockly.Python.ORDER_ATOMIC];
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
        return [`myCamera.GetItem('self_learning', '${result_type}')`, Blockly.Python.ORDER_ATOMIC];
    };

    /* 人脸识别 */
    Blockly.Python[`${board}_getFaceResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        return [`myCamera.GetItem('face', '${result_type}')`, Blockly.Python.ORDER_ATOMIC];
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
        return [`myCamera.GetItem('qrcode', '${result_type}')`, Blockly.Python.ORDER_ATOMIC];
    };
    /* 条形码识别 */
    Blockly.Python[`${board}_getBarCodeResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        return [`myCamera.GetItem('barcode', '${result_type}')`, Blockly.Python.ORDER_ATOMIC];
    };

    /* 标签识别 */
    Blockly.Python[`${board}_getAprilTagResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        return [`myCamera.GetItem('april_tag', '${result_type}')`, Blockly.Python.ORDER_ATOMIC];
    };

    /* 颜色识别 */
    Blockly.Python[`${board}_getColorResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        return [`myCamera.GetItem('color', '${result_type}')`, Blockly.Python.ORDER_ATOMIC];
    };

    /* 循迹识别 */
    Blockly.Python[`${board}_getRouteResult`] = function (block) {
        Blockly.Python.definitions_['import_camera'] = 'from udrobot.sensor.camera.camera import Camera';
        var result_type = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC);
        return [`myCamera.GetItem('route', '${result_type}')`, Blockly.Python.ORDER_ATOMIC];
    };
}

module.exports = loadCamaraDefinition;