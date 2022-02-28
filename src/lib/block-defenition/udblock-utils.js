export default (Blockly) => {
    var board = 'udblockUtils';

    // 菜单
    Blockly.Python[`${board}_getI2CFromMem`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var addr = Blockly.Python.valueToCode(block, "ADDR", Blockly.Python.ORDER_ATOMIC);
        var num = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_ATOMIC);
        var PERI = Blockly.Python.valueToCode(block, "PERI", Blockly.Python.ORDER_ATOMIC);

        var code = `udpi_i2c.readfrom_mem(${PERI},${addr},${num})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    Blockly.Python[`${board}_getI2CFromAddr`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var addr = Blockly.Python.valueToCode(block, "ADDR", Blockly.Python.ORDER_ATOMIC);
        var num = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_ATOMIC);

        var code = `udpi_i2c.readfrom(${addr},${num})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
}