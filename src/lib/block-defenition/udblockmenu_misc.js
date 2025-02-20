function loadMiscMenu(board=""){
    Blockly.Python[`${board}_menu_RJMenu`] = function (block) {
        return [block.getFieldValue("RJMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_RJMenuDup`] = function (block) {
        return [block.getFieldValue("RJMenuDup"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_dblRelayPinYellow`] = function (block) {
        return [block.getFieldValue("dblRelayPinYellow"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_dblRelayPinBlue`] = function (block) {
        return [block.getFieldValue("dblRelayPinBlue"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_actions`] = function (block) {
        var action = block.getFieldValue("actions");
        return [`${action}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_color`] = function (block) {
        var color = block.getFieldValue("color");
        return [`${color}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_colorRGBMenu`] = function (block) {
        var color = block.getFieldValue("colorRGBMenu");
        return [`${color}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_imageMethods`] = function (block) {
        var imageMethod = block.getFieldValue("imageMethods");
        return [`${imageMethod}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_motorMenu`] = function (block) {
        var motorMenu = block.getFieldValue("motorMenu");
        return [`${motorMenu}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_colorResult`] = function (block) {
        return [block.getFieldValue("colorResult"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_faceModes`] = function (block) {
        return [block.getFieldValue("faceModes"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_servoMenu`] = function (block) {
        return [block.getFieldValue("servoMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_axisMenu`] = function (block) {
        return [block.getFieldValue("axisMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_dataTypeMenu`] = function (block) {
        return [block.getFieldValue("dataTypeMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_RJADCMenu`] = function (block) {
        return [block.getFieldValue("RJADCMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_RJADCMenuFull`] = function (block) {
        return [block.getFieldValue("RJADCMenuFull"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_RJDigiMenu`] = function (block) {
        return [block.getFieldValue("RJDigiMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_colorDetectMenu`] = function (block) {
        return [block.getFieldValue("colorDetectMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_colorDetectResultMenu`] = function (block) {
        return [block.getFieldValue("colorDetectResultMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_digitalDisplayIntensityMenu`] = function (block) {
        return [block.getFieldValue("digitalDisplayIntensityMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_faceMenu`] = function (block) {
        return [block.getFieldValue("faceMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_faceColorMenu`] = function (block) {
        return [block.getFieldValue("faceColorMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_inferedIndexMenu`] = function (block) {
        return [block.getFieldValue("inferedIndexMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_inferedDirectionMenu`] = function (block) {
        return [block.getFieldValue("inferedDirectionMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_FourInferredMap`] = function (block) {
        return [block.getFieldValue("FourInferredMap"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_channel`] = function (block) {
        return [block.getFieldValue("channel"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_motor_module_motor_menu`] = function (block) {
        return [block.getFieldValue("motor_module_motor_menu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_menu_motor_module_servo_menu`] = function (block) {
        return [block.getFieldValue("motor_module_servo_menu"), Blockly.Python.ORDER_ATOMIC]
    }
}



module.exports = loadMiscMenu