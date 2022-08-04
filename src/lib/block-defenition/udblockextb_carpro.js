import { extb_car_pro } from "scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from './udblock_camera'
import loadSensorDefinition from "./udblock_sensor";

const id = extb_car_pro.id;

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
    Blockly.Python[`${id}_moveFrontSpdDis`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('y', ${distance}, ${speed}, ${speed*2})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveBackSpdDis`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('y', -${distance}, -${speed}, ${speed*2})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveLeftSpdDis`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('x', ${distance}, ${speed}, ${speed*2})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveRightSpdDis`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('x', -${distance}, -${speed}, ${speed*2})\n`;
        return code;
    };

    // 小车功能
    Blockly.Python[`${id}_moveFrontSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('y', ${0}, ${speed}, ${speed*2})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveBackSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('y', -${0}, -${speed}, ${speed*2})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveLeftSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('x', ${0}, ${speed}, ${speed*2})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveRightSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('x', -${0}, -${speed}, ${speed*2})\n`;
        return code;
    };
    Blockly.Python[`${id}_rotateSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('yaw', ${distance}, ${180}, ${360})\n`;
        return code;
    };

    // 小车功能
    Blockly.Python[`${id}_moveFront`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        
        var axis = Blockly.Python.valueToCode(block, "AXIS", Blockly.Python.ORDER_ATOMIC);
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var accel = Blockly.Python.valueToCode(block, "ACCEL", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('y', ${distance}, ${speed}, ${accel})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveBack`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        
        var axis = Blockly.Python.valueToCode(block, "AXIS", Blockly.Python.ORDER_ATOMIC);
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var accel = Blockly.Python.valueToCode(block, "ACCEL", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('y', -${distance}, -${speed}, ${accel})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveLeft`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        
        var axis = Blockly.Python.valueToCode(block, "AXIS", Blockly.Python.ORDER_ATOMIC);
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var accel = Blockly.Python.valueToCode(block, "ACCEL", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('x', ${distance}, ${speed}, ${accel})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveRight`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        
        var axis = Blockly.Python.valueToCode(block, "AXIS", Blockly.Python.ORDER_ATOMIC);
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var accel = Blockly.Python.valueToCode(block, "ACCEL", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('x', -${distance}, -${speed}, ${accel})\n`;
        return code;
    };
    Blockly.Python[`${id}_rotate`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var accel = Blockly.Python.valueToCode(block, "ACCEL", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('yaw', ${distance}, ${speed}, ${accel})\n`;
        return code;
    };
    Blockly.Python[`${id}_stopCar`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.move('x', 0, 0, 900);`;
        code += `myCarPro.move('y', 0, 0, 900);`;
        code += `myCarPro.move('yaw', 0, 0, 900)\n`;
        return code
    };
    Blockly.Python[`${id}_servoTurn`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC);
        var degree = Blockly.Python.valueToCode(block, "DEGREE", Blockly.Python.ORDER_ATOMIC);
        var accel = Blockly.Python.valueToCode(block, "ACCEL", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.SetServo(${index}, ${degree}, ${speed}, ${accel})\n`;
        return code
    };
    // 信息获取
    Blockly.Python[`${id}_getMovementData`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var axis = Blockly.Python.valueToCode(block, "AXIS", Blockly.Python.ORDER_ATOMIC);
        var dtype = Blockly.Python.valueToCode(block, "DTYPE", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.GetMovementData('${axis}')[${dtype}]`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getServoData`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var code = `myCarPro.GetServoData(${index})`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getVersion`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.GetFirmwareInfo(0x02)`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getBootVersion`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.GetFirmwareInfo(0x01)`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    
    
    // PS2 遥控
    Blockly.Python[`${id}_ps2Init`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.initPS2()\n`;
        return code
    };
    Blockly.Python[`${id}_ps2ControlEnable`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.Start_PS2_Car_Controller()\n`;
        return code
    };
    Blockly.Python[`${id}_ps2ControlDisable`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.Stop_PS2_Car_Controller()\n`;
        return code
    };
    Blockly.Python[`${id}_ps2GetButtonStatus`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        // 定义菜单
        Blockly.Python[`${id}_menu_ps2BtnMenu`] = function (block) {
            var remote = block.getFieldValue("ps2BtnMenu");
            return [`${remote}`, Blockly.Python.ORDER_ATOMIC]
        }

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.btn_pressed[${btn}]`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_ps2GetButtonUP`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        // 定义菜单
        Blockly.Python[`${id}_menu_ps2BtnMenu`] = function (block) {
            var remote = block.getFieldValue("ps2BtnMenu");
            return [`${remote}`, Blockly.Python.ORDER_ATOMIC]
        }

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.ButtonUP(${btn})`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    
    Blockly.Python[`${id}_ps2GetRemote`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
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
        var code = `myCarPro.${variable}`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };

    Blockly.Python[`${id}_ps2SetForwardSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.forwardSpd = ${speed}\n`;
        return code
    };
    Blockly.Python[`${id}_ps2SetTurnSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.turnSpd = ${speed}\n`;
        return code
    };
    Blockly.Python[`${id}_ps2SetServoSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.servoSpd = ${speed}\n`;
        return code
    };
    Blockly.Python[`${id}_startServer`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var ssid = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_ATOMIC);
        var psk = Blockly.Python.valueToCode(block, "PSK", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.startServer(${ssid},${psk})\n`;
        return code
    };
    Blockly.Python[`${id}_stopServer`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.stopServer()\n`;
        return code
    };
}