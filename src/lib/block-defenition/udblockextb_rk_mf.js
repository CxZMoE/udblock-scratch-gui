import { extb_rk_mf } from "../../../../udblock-scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from "./udblock_camera";
import loadSensorDefinition from "./udblock_sensor";

const id = extb_rk_mf.id

export default (Blockly) => {
    // 菜单
    loadMiscMenu(id)
    Blockly.Python[`${id}_menu_touchMenu`] = function (block) {
        var touchMenu = block.getFieldValue("touchMenu");
        return [`${touchMenu}`, Blockly.Python.ORDER_ATOMIC]
    }

    // 传感器
    loadSensorDefinition(id)
    loadCamaraDefinition(id)

    // 检测按键按下
    Blockly.Python["udblockEXTBRKMF_readTouchPressed"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `(udpi_sensor.GetTouch(${pin}) < 120)`
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    Blockly.Python["udblockEXTBRKMF_readTouchValue"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetTouch(${btn})`;


        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    // 执行器
    loadActionDefinition(id)
}