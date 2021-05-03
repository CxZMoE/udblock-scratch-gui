export default (Blockly) => {
    Blockly.Python['udblockUDPi_closeConnectToWiFi'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var statements = Blockly.Python.statementToCode(block, 'SUBSTACK')
        var code = "while True:\n"
        code += statements
        return code
    }
}