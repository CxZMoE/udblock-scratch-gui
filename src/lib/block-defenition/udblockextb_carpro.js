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

    // 启动
    Blockly.Python[`${id}_espstart`] = function(block){
        Blockly.Python.definitions_['import_udrobot_basic'] = 'from udrobot.basic import *';
        return '';
    }
    // 打印
    Blockly.Python[`${id}_print`] = function(block){
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)
        return 'print(' + text + ')\n';
    }

    // 系统资源
    Blockly.Python[`${id}_getStartTime`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        return ["time.ticks_ms()", Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${id}_delay_ms`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep_ms(${time})\n`
    }
    Blockly.Python[`${id}_delay_us`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep_us(${time})\n`
    }
    Blockly.Python[`${id}_delay_s`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep(${time})\n`
    }
    
    // 当主板按钮按下时
    Blockly.Python[`${id}_whenButtonPressed`] = function (block) {
        // console.log(Blockly.Xml.blockToDom(block))
        // console.log(block.toString())
        // console.log(block.nextConnection)

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC)
        var statements = Blockly.Python.statementToCode(block, 'SUBSTACK')
        // var functionName = Blockly.Python.provideFunction_(
        //     `OnBtn${btn}PressedFunc`,
        //     ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(v):',
        //         '  hcsr04 = HCSR04(trigger_pin=trig_pin, echo_pin=echo_pin)',
        //         '  distance = hcsr04.distance_cm()',
        //         '  return distance']);
        var codeInit = `# 按钮${btn}点击事件\n`
        codeInit += 'def ' + `OnBtn${btn}PressedFunc` + '():\n'
        codeInit += statements
        Blockly.Python.definitions_[`btn_binding_${btn}`] = codeInit;

        var code = ''
        if (btn == 0){
            code = `\nudpi_button.set_callback_no_irq(btn='A', callback=OnBtn${btn}PressedFunc)\n`
        }
        if (btn == 2){
            code = `\nudpi_button.set_callback_no_irq(btn='B', callback=OnBtn${btn}PressedFunc)\n`
        }
        return code
    }
    Blockly.Python[`${id}_whenButtonPressedIRQ`] = function (block) {
        // console.log(Blockly.Xml.blockToDom(block))
        // console.log(block.toString())
        // console.log(block.nextConnection)

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC)
        var statements = Blockly.Python.statementToCode(block, 'SUBSTACK')
        // var functionName = Blockly.Python.provideFunction_(
        //     `OnBtn${btn}PressedFunc`,
        //     ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(v):',
        //         '  hcsr04 = HCSR04(trigger_pin=trig_pin, echo_pin=echo_pin)',
        //         '  distance = hcsr04.distance_cm()',
        //         '  return distance']);
        var codeInit = `# 按钮${btn}点击事件\n`
        codeInit += 'def ' + `OnBtn${btn}PressedFuncIRQ` + '(pin):\n'
        codeInit += statements
        Blockly.Python.definitions_[`btn_binding_${btn}`] = codeInit;

        var code = ''
        if (btn == 0){
            code = `\nudpi_button.set_callback(btn='A', callback=OnBtn${btn}PressedFuncIRQ)\n`
        }
        if (btn == 2){
            code = `\nudpi_button.set_callback(btn='B', callback=OnBtn${btn}PressedFuncIRQ)\n`
        }
        return code
    }
    Blockly.Python[`${id}_menu_buttons`] = function (block) {
        var btn = block.getFieldValue("buttons");
        // console.log(btn)
        return [`${btn}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${id}_getWiFiStatus`] = function () {
        
        return ['udpi_wifi.is_connected()', Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${id}_closeConnectToWiFi`] = function (block) {
        
        var code = `udpi_wifi.disconnect()\n`;
        return code;
    }
    Blockly.Python[`${id}_setConnectToWiFi`] = function (block) {
        
        var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC);
        var password = Blockly.Python.valueToCode(block, 'PSK', Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_wifi.connect(${ssid}, ${password})\n`;
        return code;
    };
    Blockly.Python[`${id}_openWiFiAP`] = function (block) {
        
        var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC);
        var psk = Blockly.Python.valueToCode(block, 'PSK', Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_wifi.set_mode_ap(${ssid}, ${psk}, 13)\n`
        return code;
    }
    Blockly.Python[`${id}_udpClientSent`] = function (block) {
        
        var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC);
        return `udpi_wifi.broadcast(${msg})\n`
    }
    Blockly.Python[`${id}_udpClientReceiveEvent`] = function (block) {
        
        //var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC);
        var statements = Blockly.Python.statementToCode(block, 'SUBSTACK')
        statements = "  " + statements.replaceAll("\n", "\n  ")

        var functionName = Blockly.Python.provideFunction_(
            'udpRecvFunc',
            ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(udp_socket, udp_msg, udp_remote):',
                statements,
            ]);
        var code = `udpi_wifi.start_udp_server(${functionName})\n`;
        return code;
    }
    Blockly.Python[`${id}_udpClientReceivedText`] = function (block) {
        
        var code = `udp_msg`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    
    Blockly.Python[`${id}_udpClientReceivedText`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var code = `udp_msg`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    // 控制主板蜂鸣器播放
    Blockly.Python[`${id}_setBuzzerPlay`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';

        var sound = Blockly.Python.valueToCode(block, 'SOUND', Blockly.Python.ORDER_ATOMIC).replaceAll("'","")
        // console.log(Blockly.Xml.blockToDom(block))
        var mode = Blockly.Python.valueToCode(block, 'PITCH', Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_buzzer.play(Buzzer.${sound},${mode})\n`;
        return code;
    };
    Blockly.Python[`${id}_setBuzzerPlayMidi`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';

        var sound = Blockly.Python.valueToCode(block, 'SOUND', Blockly.Python.ORDER_ATOMIC)
        if (String(sound).indexOf("demo") > -1){
            return `udpi_buzzer.play_midi(udpi_buzzer.demoSong)\n`;
        }
        return `udpi_buzzer.play_midi(${sound})\n`;
    };
    Blockly.Python[`${id}_menu_buzzerSounds`] = function (block) {
        var code = Blockly.Python.quote_(block.getFieldValue("buzzerSounds"));
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${id}_menu_buzzerPitches`] = function (block) {
        var code = Blockly.Python.quote_(block.getFieldValue("buzzerPitches"));
        return [code, Blockly.Python.ORDER_ATOMIC];
    };


    Blockly.Python[`${id}_setBuzzerStop`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';

        var code = `udpi_buzzer.stop()\n`;
        return code;
    };

    // 小车功能
    Blockly.Python[`${id}_moveFrontSpdDis`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('y', ${distance}, ${speed}, ${speed}*2)\n`;
        return code;
    };
    Blockly.Python[`${id}_moveBackSpdDis`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('y', -${distance}, -${speed},${speed}*2)\n`;
        return code;
    };
    Blockly.Python[`${id}_moveLeftSpdDis`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('x', ${distance}, ${speed},${speed}*2)\n`;
        return code;
    };
    Blockly.Python[`${id}_moveRightSpdDis`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var distance = Blockly.Python.valueToCode(block, "DIS", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('x', -${distance}, -${speed},${speed}*2)\n`;
        return code;
    };

    // 小车功能
    Blockly.Python[`${id}_moveFrontSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('y', ${0}, ${speed}, ${speed}*2)\n`;
        
        return code;
    };
    Blockly.Python[`${id}_moveBackSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('y', -${0}, -${speed}, ${speed}*2)\n`;
        return code;
    };
    Blockly.Python[`${id}_moveLeftSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('x', ${0}, ${speed},${speed}*2)\n`;
        return code;
    };
    Blockly.Python[`${id}_moveRightSpd`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.move('x', -${0}, -${speed},${speed}*2)\n`;
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
        // var accel = Blockly.Python.valueToCode(block, "ACCEL", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.SetServo(${index}, ${degree}, ${speed}, 5)\n`;
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
    Blockly.Python[`${id}_getRunningStatus`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var axis = Blockly.Python.valueToCode(block, "AXIS", Blockly.Python.ORDER_ATOMIC);
        var status = Blockly.Python.valueToCode(block, "STATUS", Blockly.Python.ORDER_ATOMIC);
        var code = `(myCarPro.GetRunningStatus()[${axis}]==${status})`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_getAccelData`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.GetAcclData()`;
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
    Blockly.Python[`${id}_startServer`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var ssid = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_ATOMIC);
        var psk = Blockly.Python.valueToCode(block, "PSK", Blockly.Python.ORDER_ATOMIC);
        var port = Blockly.Python.valueToCode(block, "SOCKET_PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.startServer(${ssid},${psk},${port})\n`;
        return code
    };
    Blockly.Python[`${id}_stopServer`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.stopServer()\n`;
        return code
    };
    Blockly.Python[`${id}_appGetButtonStatus`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        // 定义菜单
        Blockly.Python[`${id}_menu_appBtnMenu`] = function (block) {
            var remote = block.getFieldValue("appBtnMenu");
            return [`${remote}`, Blockly.Python.ORDER_ATOMIC]
        }

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.btn_pressed[${btn}]`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_appGetButtonUP`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        // 定义菜单
        Blockly.Python[`${id}_menu_appBtnMenu`] = function (block) {
            var remote = block.getFieldValue("appBtnMenu");
            return [`${remote}`, Blockly.Python.ORDER_ATOMIC]
        }

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.ButtonUP(${btn})`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    
    Blockly.Python[`${id}_appGetRemote`] = function (block) {
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
    


    // 比赛
    Blockly.Python[`${id}_initUDPClient`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var uid = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_ATOMIC);
        var addr = Blockly.Python.valueToCode(block, "ADDR", Blockly.Python.ORDER_ATOMIC);
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `myCarPro.initComClient(${uid}, ${addr}, ${port})\n`;
        return code
    };
    Blockly.Python[`${id}_startUDPClient`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.startClient()\n`;
        return code
    };
    Blockly.Python[`${id}_startArmUp`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.armUp()\n`;
        return code
    };
    Blockly.Python[`${id}_startArmDown`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        var code = `myCarPro.armDown()\n`;
        return code
    };
    Blockly.Python[`${id}_sendMsg`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        // var car_id = Blockly.Python.valueToCode(block, "CAR_ID", Blockly.Python.ORDER_ATOMIC);
        var msg = Blockly.Python.valueToCode(block, "MSG", Blockly.Python.ORDER_ATOMIC);

        // mqttClient = MQTTClient('CAR', '10.255.15.194', '1883', ' ', ' ')
        // mqttClient.subscribe('mars/A1', qos=0)
        // mqttClient.subscribe('mars/A1/status', qos=0)
        // mqttClient.set_callback(myMQTTCallback)
        // mqttClient.publish('mars/A1', (json.dumps(data)).encode('utf-8'), qos=0)
        // mqttClient.check_msg()
        var code = `myCarPro.sendComMsg(${msg})\n`;
        return code
    };

    Blockly.Python[`${id}_whenRecvComStatus`] = function (block) {
        Blockly.Python.definitions_['import_carpro'] = 'from udrobot.extend_board.car_pro import CarPro';
        Blockly.Python.definitions_['get_carpro'] = 'myCarPro = CarPro()';
        // var car_id = Blockly.Python.valueToCode(block, "CAR_ID", Blockly.Python.ORDER_ATOMIC);
        var status = Blockly.Python.valueToCode(block, "STATUS", Blockly.Python.ORDER_ATOMIC);

        return [`(myCarPro.getComStatus()=="${status}")`];
    };


    

}