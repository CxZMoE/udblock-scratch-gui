import { extb_mf } from "../../../../udblock-scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from "./udblock_camera";
import loadSensorDefinition from "./udblock_sensor";

const id = extb_mf.id

export default (Blockly) => {
    // 菜单
    loadMiscMenu(id)

    // 传感器
    loadSensorDefinition(id)
    loadCamaraDefinition(id)

    // 检测按键按下
    Blockly.Python["udblockEXTBMF_readTouchPressed"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `(sensor.GetTouch(${pin}) < 280)`
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    // 执行器
    loadActionDefinition(id)
}