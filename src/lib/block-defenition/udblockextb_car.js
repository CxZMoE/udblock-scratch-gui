import { extb_car } from "../../../../udblock-scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from './udblock_camera'
import loadSensorDefinition from "./udblock_sensor";

const id = extb_car.id;

export default (Blockly) => {
    // 菜单
    loadMiscMenu(id)
    // 摄像头
    loadCamaraDefinition(id)
    // 传感器
    loadSensorDefinition(id)
    // 执行器
    loadActionDefinition(id)

    // 小车功能
    Blockly.Python[`${id}_moveForward`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.forward(${speed})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveBack`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.back(${speed})\n`;
        return code
    };
    Blockly.Python[`${id}_turnLeft`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.turnLeft(${speed})\n`;
        return code
    };
    Blockly.Python[`${id}_turnRight`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.turnRight(${speed})\n`;
        return code
    };
    Blockly.Python[`${id}_shiftLeft`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.shiftLeft(${speed})\n`;
        return code
    };
    Blockly.Python[`${id}_shiftRight`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.shiftRight(${speed})\n`;
        return code
    };
    Blockly.Python[`${id}_stopCar`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.stop()\n`;
        return code
    };
    Blockly.Python[`${id}_startServer`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var ssid = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_ATOMIC);
        var psk = Blockly.Python.valueToCode(block, "PSK", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.startServer(${ssid},${psk})\n`;
        return code
    };
    Blockly.Python[`${id}_stopServer`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.stopServer()\n`;
        return code
    };
    Blockly.Python[`${id}_servoTurn`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var degree = Blockly.Python.valueToCode(block, "DEGREE", Blockly.Python.ORDER_ATOMIC);
        var index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.servoTurn(${index},${degree})\n`;
        return code
    };
    Blockly.Python[`${id}_startRouteFront`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.findRoute(0x01,${speed})\n`;
        return code
    };
    Blockly.Python[`${id}_startRouteBack`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.findRoute(0x02,${speed})\n`;
        return code
    };
    Blockly.Python[`${id}_startRoute`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.startRoute()\n`;
        return code
    };
    Blockly.Python[`${id}_endRoute`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.endRoute()\n`;
        return code
    };
    Blockly.Python[`${id}_getFrontInferredValueIndex`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC);
        var code = `(myCar.GetInfredValueByIndex("front", ${index}))`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getBackInferredValueIndex`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC);
        var code = `(myCar.GetInfredValueByIndex("back", ${index}))`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getInferredDirection`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var direction = Blockly.Python.valueToCode(block, "DIRECTION", Blockly.Python.ORDER_ATOMIC);
        var code = `(myCar.GetDirectionUpon("${direction}"))`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getCross`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `(myCar.GetCarIsInferredCross())`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getForwardSpd`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.GetCarForwardSpeed()`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getBackwardSpd`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.GetCarBackwardSpeed()`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getLeftSpd`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.GetCarLeftTurnSpeed()`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getRightSpd`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.GetCarRightTurnSpeed()`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    // PS2 遥控
    Blockly.Python[`${id}_ps2ControlEnable`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.Start_PS2_Car_Controller()\n`;
        return code
    };
    Blockly.Python[`${id}_ps2ControlDisable`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.Stop_PS2_Car_Controller()\n`;
        return code
    };
    Blockly.Python[`${id}_ps2GetButtonStatus`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        // 定义菜单
        Blockly.Python[`${id}_menu_ps2BtnMenu`] = function (block) {
            var remote = block.getFieldValue("ps2BtnMenu");
            return [`${remote}`, Blockly.Python.ORDER_ATOMIC]
        }

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.ps2.Get_PS2_Button()[${btn}]`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_ps2GetRemote`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        // 定义菜单
        Blockly.Python[`${id}_menu_ps2RemoteMenu`] = function (block) {
            var remote = block.getFieldValue("ps2RemoteMenu");
            return [`${remote}`, Blockly.Python.ORDER_ATOMIC]
        }
        

        var remote = Blockly.Python.valueToCode(block, "POS", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.ps2.Get_PS2_Remote()[${remote}]`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };

    Blockly.Python[`${id}_ps2SetForwardSpd`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.forwardSpd = ${speed}\n`;
        return code
    };
    Blockly.Python[`${id}_ps2SetTurnSpd`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.turnSpd = ${speed}\n`;
        return code
    };
    Blockly.Python[`${id}_ps2SetServoSpd`] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from udrobot.extend_board.car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.servoSpd = ${speed}\n`;
        return code
    };
}