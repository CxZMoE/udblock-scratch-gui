import { extb_car_2d_new } from "scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from './udblock_camera'
import loadSensorDefinition from "./udblock_sensor";

const id = extb_car_2d_new.id;

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


    // 读取环境光传感器
    Blockly.Python[`${id}_readAmbientLightSensor`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.GetAmbientLight(${39})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    // 读取声音传感器
    Blockly.Python[`${id}_readSoundSensor`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.GetMicrophone(${36})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    // 读取陀螺仪传感器
    Blockly.Python[`${id}_readGryoSensor`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.ICM_Get_Gyroscope()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }
    // 读取加速度传感器
    Blockly.Python[`${id}_readAccelSensor`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.ICM_Get_Accelerometer()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }

    // 读取手势传感器
    Blockly.Python[`${id}_readGestureSensor`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';

        Blockly.Python[`udblockUDPiMiniV1_menu_gesture_sensor`] = function (block) {
            var imageMethod = block.getFieldValue("gesture_sensor");
            return [`${imageMethod}`, Blockly.Python.ORDER_ATOMIC]
        }

        var direction = Blockly.Python.valueToCode(block, 'GESTURE', Blockly.Python.ORDER_ATOMIC);
        var code = `(udpi_sensor.GetGestureSensor() == '${direction}')`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    // 控制启用主板RGB
    Blockly.Python[`${id}_openOnBoardRGB`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
       
        return `udpi_rgb = RGB(${17}, ${6})\n`;
    }

    // 控制启用禁用RGB
    Blockly.Python[`${id}_closeOnBoardRGB`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        //Blockly.getMainWorkspace().createVariable("rgb");
        // 修复WS2312B反转问题
        var rgb_board_reversed = "0, 0, 0"
        return `udpi_rgb.clear((${rgb_board_reversed}))\n`;
    }

    // 控制主板RGB显示颜色
    Blockly.Python[`${id}_setRGBDraw`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        if (rgb_board_color.length == 0){
            return '';
        }
        
        return `udpi_rgb.clear(${rgb_board_color})\n`
    }
    Blockly.Python[`${id}_setRGBLineSingleDraw`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        
        var rgb_board_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        if (rgb_board_color.length == 0){
            return '';
        }
        if (parseInt(rgb_board_index) <= 0 || parseInt(rgb_board_index) >=7){
            rgb_board_index = 1
        }
        // console.log(rgb_board_index)
        return `udpi_rgb.value(${rgb_board_index}-1, ${rgb_board_color})\n`;
    }
    Blockly.Python[`${id}_setRGBLineSingleOnlyDraw`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        
        var rgb_board_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        if (rgb_board_color.length == 0){
            return '';
        }
        if (parseInt(rgb_board_index) <= 0 || parseInt(rgb_board_index) >=7){
            rgb_board_index = 1
        }

        return `udpi_rgb.switch_singal(${rgb_board_index}-1, ${rgb_board_color})\n`;
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

    // 主板显示屏
    Blockly.Python[`${id}_displayWrite`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var line = parseInt(Blockly.Python.valueToCode(block, "LINE", Blockly.Python.ORDER_ATOMIC)) * 16 || 0

        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) || "Hello,World"

        var code = `udpi_screen.text(str(${text}), ${line}, 0)\n`;
        return code
    }
    Blockly.Python[`${id}_displayDrawLabel`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var col = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)
        var row = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var text = Blockly.Python.valueToCode(block, "STR", Blockly.Python.ORDER_ATOMIC) || "Hello,World"

        var code = `udpi_screen.label(${col}, ${row}, str(${text}))\n`;
        return code
    }
    Blockly.Python[`${id}_displayDrawPoint`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)

        var code = `udpi_screen.draw_point(${x}, ${y})\n`;
        return code
    }
    Blockly.Python[`${id}_displayDrawLine`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var ex = Blockly.Python.valueToCode(block, "EX", Blockly.Python.ORDER_ATOMIC)
        var ey = Blockly.Python.valueToCode(block, "EY", Blockly.Python.ORDER_ATOMIC)

        var code = `udpi_screen.draw_line(${sx}, ${sy}, ${ex}, ${ey})\n`;
        return code
    }
    Blockly.Python[`${id}_displayDrawRect`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var length = Blockly.Python.valueToCode(block, "LENGTH", Blockly.Python.ORDER_ATOMIC)
        var width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_ATOMIC)

        var code = `udpi_screen.draw_rect(${sx}, ${sy}, ${length}, ${width})\n`;
        return code
    }
    Blockly.Python[`${id}_displayDrawRectFill`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var length = Blockly.Python.valueToCode(block, "LENGTH", Blockly.Python.ORDER_ATOMIC)
        var width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_ATOMIC)

        var code = `udpi_screen.draw_rect_fill(${sx}, ${sy}, ${length}, ${width})\n`;
        return code
    }
    Blockly.Python[`${id}_displayDrawCircle`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var radius = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC)
        var code = `udpi_screen.draw_circle(${sx}, ${sy}, ${radius})\n`;
        return code
    }
    Blockly.Python[`${id}_displayDrawCircleFill`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var radius = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC)
        var code = `udpi_screen.draw_circle_fill(${sx}, ${sy}, ${radius})\n`;
        return code
    }
    Blockly.Python[`${id}_displayDrawTriangle`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var x1 = Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_ATOMIC)
        var y1 = Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_ATOMIC)
        var x2 = Blockly.Python.valueToCode(block, "X2", Blockly.Python.ORDER_ATOMIC)
        var y2 = Blockly.Python.valueToCode(block, "Y2", Blockly.Python.ORDER_ATOMIC)
        var x3 = Blockly.Python.valueToCode(block, "X3", Blockly.Python.ORDER_ATOMIC)
        var y3 = Blockly.Python.valueToCode(block, "Y3", Blockly.Python.ORDER_ATOMIC)

        var code = `udpi_screen.draw_triangle(${x1}, ${y1}, ${x2}, ${y2}, ${x3}, ${y3})\n`;
        return code
    }
    Blockly.Python[`${id}_displayDrawTriangleFill`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var x1 = Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_ATOMIC)
        var y1 = Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_ATOMIC)
        var x2 = Blockly.Python.valueToCode(block, "X2", Blockly.Python.ORDER_ATOMIC)
        var y2 = Blockly.Python.valueToCode(block, "Y2", Blockly.Python.ORDER_ATOMIC)
        var x3 = Blockly.Python.valueToCode(block, "X3", Blockly.Python.ORDER_ATOMIC)
        var y3 = Blockly.Python.valueToCode(block, "Y3", Blockly.Python.ORDER_ATOMIC)

        var code = `udpi_screen.draw_triangle_fill(${x1}, ${y1}, ${x2}, ${y2}, ${x3}, ${y3})\n`;
        return code
    }
    Blockly.Python[`${id}_displayScroll`] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)


        var code = `udpi_screen.scroll(${x}, ${y})\n`;
        return code
    }
    Blockly.Python[`${id}_menu_displayLine`] = function(block){
        var text = block.getFieldValue("displayLine");
        return [text, Blockly.Python.ORDER_ATOMIC]
    }

    Blockly.Python[`${id}_displayShow`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        return `udpi_screen.show()\n`;
    }
    Blockly.Python[`${id}_displayClean`] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        return `udpi_screen.clear()\n`;
    }

    // 小车功能
    Blockly.Python[`${id}_moveForward`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }

        var code = `car2WDNew.forward(${speed})\n`;
        return code;
    };
    Blockly.Python[`${id}_moveBack`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }
        
        var code = `car2WDNew.back(${speed})\n`;
        return code
    };
    Blockly.Python[`${id}_turnLeft`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }

        var code = `car2WDNew.left(${speed})\n`;
        return code
    };
    Blockly.Python[`${id}_turnRight`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }

        var code = `car2WDNew.right(${speed})\n`;
        return code
    };
    Blockly.Python[`${id}_stopCar`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var code = `car2WDNew.initPWM()\n`;
        return code
    };
    
    Blockly.Python[`${id}_turnCustomize`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';

        Blockly.Python[`${id}_menu_carServoMode`] = function (block) {
            var mode = block.getFieldValue("carServoMode");
            return [`${mode}`, Blockly.Python.ORDER_ATOMIC]
        }

        var speedLeft = Blockly.Python.valueToCode(block, "SPDL", Blockly.Python.ORDER_ATOMIC);
        var speedRight = Blockly.Python.valueToCode(block, "SPDR", Blockly.Python.ORDER_ATOMIC);

        var modeLeft = Blockly.Python.valueToCode(block, "MODEL", Blockly.Python.ORDER_ATOMIC);
        var modeRight = Blockly.Python.valueToCode(block, "MODER", Blockly.Python.ORDER_ATOMIC);

        speedLeft =  modeLeft=="clock"?(speedLeft):(-speedLeft)
        speedRight = modeRight=="clock"?(speedRight):(-speedRight)
        var code = `car2WDNew.turn(${speedLeft}, ${speedRight})\n`;
        return code
    };
    Blockly.Python[`${id}_getRedLeft`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var threhold = Blockly.Python.valueToCode(block, "THREHOLD", Blockly.Python.ORDER_ATOMIC);

        var code = `car2WDNew.GetInfRedTrigd_L(${threhold})`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };

    Blockly.Python[`${id}_getRedRight`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var threhold = Blockly.Python.valueToCode(block, "THREHOLD", Blockly.Python.ORDER_ATOMIC);

        var code = `car2WDNew.GetInfRedTrigd_R(${threhold})`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };

    Blockly.Python[`${id}_getRedLeftValue`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var code = `car2WDNew.inf_red_value_left()`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };

    Blockly.Python[`${id}_getRedRightValue`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var code = `car2WDNew.inf_red_value_right()`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };

    Blockly.Python[`${id}_ps2SetServoSpd`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        if (speed > 100) { speed = 100 }
        if (speed < 0) { speed = 0 }

        speed = Math.round((speed) * 4096)
        var code = `car2WDNew.servoSpd = ${speed}\n`;
        return code
    };

    Blockly.Python[`${id}_startServer`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var ssid = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_ATOMIC);
        var psk = Blockly.Python.valueToCode(block, "PSK", Blockly.Python.ORDER_ATOMIC);
        var code = `car2WDNew.startServer(${ssid},${psk})\n`;
        return code
    };
    Blockly.Python[`${id}_stopServer`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        var code = `car2WDNew.stopServer()\n`;
        return code
    };
    Blockly.Python[`${id}_appGetButtonStatus`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        // 定义菜单
        Blockly.Python[`${id}_menu_appBtnMenu`] = function (block) {
            var remote = block.getFieldValue("appBtnMenu");
            return [`${remote}`, Blockly.Python.ORDER_ATOMIC]
        }

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `car2WDNew.btn_pressed[${btn}]`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python[`${id}_appGetButtonUP`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
        // 定义菜单
        Blockly.Python[`${id}_menu_appBtnMenu`] = function (block) {
            var remote = block.getFieldValue("appBtnMenu");
            return [`${remote}`, Blockly.Python.ORDER_ATOMIC]
        }

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `car2WDNew.ButtonUP(${btn})`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    
    Blockly.Python[`${id}_appGetRemote`] = function (block) {
        Blockly.Python.definitions_['import_car_2wd_new'] = 'from drivers.motor import Car2D';
        Blockly.Python.definitions_['get_car_2wd_new'] = 'car2WDNew = Car2D()';
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
        var code = `car2WDNew.${variable}`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
}