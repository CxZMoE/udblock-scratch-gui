import { extb_car_2d } from "scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from './udblock_camera'
import loadSensorDefinition from "./udblock_sensor";

const id = extb_car_2d.id;

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
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }

        var code = `myCar2WD.forward(${speed}/100)\n`;
        return code;
    };
    Blockly.Python[`${id}_moveBack`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }
        
        var code = `myCar2WD.back(${speed}/100)\n`;
        return code
    };
    Blockly.Python[`${id}_turnLeft`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }

        var code = `myCar2WD.turnLeft(${speed}/100)\n`;
        return code
    };
    Blockly.Python[`${id}_turnRight`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }

        var code = `myCar2WD.turnRight(${speed}/100)\n`;
        return code
    };
    Blockly.Python[`${id}_stopCar`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var code = `myCar2WD.stop()\n`;
        return code
    };
    Blockly.Python[`${id}_startServer`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var ssid = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_ATOMIC);
        var psk = Blockly.Python.valueToCode(block, "PSK", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar2WD.startServer(${ssid},${psk})\n`;
        return code
    };
    Blockly.Python[`${id}_stopServer`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var code = `myCar2WD.stopServer()\n`;
        return code
    };
    Blockly.Python[`${id}_servoTurn`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var degree = Blockly.Python.valueToCode(block, "DEGREE", Blockly.Python.ORDER_ATOMIC);
        var index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar2WD.servoTurn(${index},${degree})\n`;
        return code
    };
    // PS2 遥控
    Blockly.Python[`${id}_ps2Init`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar2WD = Car()';
        var code = `myCar2WD.initPS2()\n`;
        return code
    };
    Blockly.Python[`${id}_ps2ControlEnable`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var code = `myCar2WD.Start_PS2_Car_Controller()\n`;
        return code
    };
    Blockly.Python[`${id}_ps2ControlDisable`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var code = `myCar2WD.Stop_PS2_Car_Controller()\n`;
        return code
    };
    Blockly.Python[`${id}_ps2GetButtonStatus`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        // 定义菜单
        Blockly.Python[`${id}_menu_ps2BtnMenu`] = function (block) {
            var remote = block.getFieldValue("ps2BtnMenu");
            return [`${remote}`, Blockly.Python.ORDER_ATOMIC]
        }

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar2WD.btn_pressed[${btn}]`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_ps2GetRemote`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        // 定义菜单
        Blockly.Python[`${id}_menu_ps2RemoteMenu`] = function (block) {
            var remote = block.getFieldValue("ps2RemoteMenu");
            return [`${remote}`, Blockly.Python.ORDER_ATOMIC]
        }
        

        var remote = Blockly.Python.valueToCode(block, "POS", Blockly.Python.ORDER_ATOMIC);
        var variable = 'ly'
        switch (remote){
            case "0":
                variable = 'ly'
                break
            case "1":
                variable = "lx"
                break
            case "2":
                variable = "ry"
                break
            case "3":
                variable = "rx"
                break
            default:
                break
        }
        var code = `myCar2WD.${variable}`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_ps2SetForwardSpd`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }

        speed = Math.round((speed/100) * 4096)
        var code = `myCar2WD.forwardSpd = ${speed}\n`;
        return code
    };
    Blockly.Python[`${id}_ps2SetTurnSpd`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }

        speed = Math.round((speed/100) * 4096)
        var code = `myCar2WD.turnSpd = ${speed}\n`;
        return code
    };
    Blockly.Python[`${id}_turnCustomize`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';

        Blockly.Python[`${id}_menu_carServoMode`] = function (block) {
            var mode = block.getFieldValue("carServoMode");
            return [`${mode}`, Blockly.Python.ORDER_ATOMIC]
        }

        var speedLeft = Blockly.Python.valueToCode(block, "SPDL", Blockly.Python.ORDER_ATOMIC);
        if (speedLeft > 100) { speedLeft = 100 }
        if (speedLeft < 0) { speedLeft = 0 }
        var speedRight = Blockly.Python.valueToCode(block, "SPDR", Blockly.Python.ORDER_ATOMIC);
        if (speedRight > 100) { speedRight = 100 }
        if (speedRight < 0) { speedRight = 0 }

        var modeLeft = Blockly.Python.valueToCode(block, "MODEL", Blockly.Python.ORDER_ATOMIC);
        var modeRight = Blockly.Python.valueToCode(block, "MODER", Blockly.Python.ORDER_ATOMIC);

        speedLeft = (speedLeft/100)
        speedRight = (speedRight/100)
        var code = `myCar2WD.motorLeft.${modeLeft=="clock"?"clock":"anticlock"}(${speedLeft});myCar2WD.motorRight.${modeRight=="clock"?"clock":"anticlock"}(${speedRight});\n`;
        return code
    };
    
    Blockly.Python[`${id}_ps2SetServoSpd`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd'] = 'from udrobot.extend_board.car_2wd import Car';
        Blockly.Python.definitions_['get_car_2wd'] = 'myCar2WD = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }

        speed = Math.round((speed/100) * 4096)
        var code = `myCar2WD.servoSpd = ${speed}\n`;
        return code
    };
}