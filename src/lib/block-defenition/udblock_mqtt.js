import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from './udblock_camera'
import loadSensorDefinition from "./udblock_sensor";

export default (Blockly) => {
    Blockly.Python[`udblockMQTT_connectMQTT`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var server = Blockly.Python.valueToCode(block, "SERVER", Blockly.Python.ORDER_ATOMIC);
        var code = `mqttClient = MQTTClient(${username},${server}, ${port})\n`;
        return code;
    };
}