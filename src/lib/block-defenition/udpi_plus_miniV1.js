import { extb_udpi_mini } from "scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from "./udblock_camera";
import loadSensorDefinition from "./udblock_sensor";

export default (Blockly) => {
    // 启动
    Blockly.Python['udblockUDPiMiniV1_espstart'] = function(block){
        Blockly.Python.definitions_['import_udrobot_basic'] = 'from udrobot.basic import *';
        return '';
    }
    // 打印
    Blockly.Python['udblockUDPiMiniV1_print'] = function(block){
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)
        return 'print(' + text + ')\n';
    }

    // 系统资源
    Blockly.Python['udblockUDPiMiniV1_getStartTime'] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        return ["time.ticks_ms()", Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockUDPiMiniV1_delay_ms'] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep_ms(${time})\n`
    }
    Blockly.Python['udblockUDPiMiniV1_delay_us'] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep_us(${time})\n`
    }
    Blockly.Python['udblockUDPiMiniV1_delay_s'] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep(${time})\n`
    }
    
    // 当主板按钮按下时
    Blockly.Python['udblockUDPiMiniV1_whenButtonPressed'] = function (block) {
        console.log(Blockly.Xml.blockToDom(block))
        console.log(block.toString())
        console.log(block.nextConnection)

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
    Blockly.Python['udblockUDPiMiniV1_menu_buttons'] = function (block) {
        var btn = block.getFieldValue("buttons");
        console.log(btn)
        return [`${btn}`, Blockly.Python.ORDER_ATOMIC]
    }


    // 读取环境光传感器
    Blockly.Python["udblockUDPiMiniV1_readAmbientLightSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.GetAmbientLight(${39})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    // 读取声音传感器
    Blockly.Python["udblockUDPiMiniV1_readSoundSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.GetMicrophone(${36})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    // 读取陀螺仪传感器
    Blockly.Python["udblockUDPiMiniV1_readGryoSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.ICM_Get_Gyroscope()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }
    // 读取加速度传感器
    Blockly.Python["udblockUDPiMiniV1_readAccelSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.ICM_Get_Accelerometer()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }

    // 读取手势传感器
    Blockly.Python["udblockUDPiMiniV1_readGestureSensor"] = function (block) {
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
    Blockly.Python['udblockUDPiMiniV1_openOnBoardRGB'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
       
        return `udpi_rgb = RGB(${17}, ${6})\n`;
    }

    // 控制启用禁用RGB
    Blockly.Python['udblockUDPiMiniV1_closeOnBoardRGB'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        //Blockly.getMainWorkspace().createVariable("rgb");
        // 修复WS2312B反转问题
        var rgb_board_reversed = "0, 0, 0"
        return `udpi_rgb.clear((${rgb_board_reversed}))\n`;
    }

    // 控制主板RGB显示颜色
    Blockly.Python["udblockUDPiMiniV1_setRGBDraw"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        if (rgb_board_color.length == 0){
            return '';
        }
        
        return `udpi_rgb.clear(${rgb_board_color})\n`
    }
    Blockly.Python["udblockUDPiMiniV1_setRGBLineSingleDraw"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        
        var rgb_board_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        if (rgb_board_color.length == 0){
            return '';
        }
        if (parseInt(rgb_board_index) <= 0 || parseInt(rgb_board_index) >=7){
            rgb_board_index = 1
        }
        console.log(rgb_board_index)
        return `udpi_rgb.value(${rgb_board_index}-1, ${rgb_board_color})\n`;
    }
    Blockly.Python['udblockUDPiMiniV1_setRGBLineSingleOnlyDraw'] = function (block) {
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
    Blockly.Python['udblockUDPiMiniV1_getWiFiStatus'] = function () {
        
        return ['udpi_wifi.is_connected()', Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockUDPiMiniV1_closeConnectToWiFi'] = function (block) {
        
        var code = `udpi_wifi.disconnect()\n`;
        return code;
    }
    Blockly.Python['udblockUDPiMiniV1_setConnectToWiFi'] = function (block) {
        
        var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC);
        var password = Blockly.Python.valueToCode(block, 'PSK', Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_wifi.connect(${ssid}, ${password})\n`;
        return code;
    };
    Blockly.Python['udblockUDPiMiniV1_openWiFiAP'] = function (block) {
        
        var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC);
        var psk = Blockly.Python.valueToCode(block, 'PSK', Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_wifi.set_mode_ap(${ssid}, ${psk}, 13)\n`
        return code;
    }
    Blockly.Python['udblockUDPiMiniV1_udpClientSent'] = function (block) {
        
        var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC);
        return `udpi_wifi.broadcast(${msg})\n`
    }
    Blockly.Python['udblockUDPiMiniV1_udpClientReceiveEvent'] = function (block) {
        
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
    Blockly.Python['udblockUDPiMiniV1_udpClientReceivedText'] = function (block) {
        
        var code = `udp_msg`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    
    Blockly.Python['udblockUDPiMiniV1_udpClientReceivedText'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var code = `udp_msg`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    Blockly.Python['udblockUDPiMiniV1_urequestsAddItemMap'] = function (block) {
        Blockly.Python.definitions_['import_urequests'] = 'from tools import urequests';
        var name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC).replaceAll("'", "");
        var code = `${name} = {}\n`
        return code;
    }
    Blockly.Python['udblockUDPiMiniV1_urequestsSetItem'] = function (block) {
        Blockly.Python.definitions_['import_urequests'] = 'from tools import urequests';
        var name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC).replaceAll("'", "");
        var key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC).replaceAll("'", "");
        var code = `${name}[${key}] = ${value}\n`
        return code;
    }
    Blockly.Python['udblockUDPiMiniV1_urequestsDelItem'] = function (block) {
        Blockly.Python.definitions_['import_urequests'] = 'from tools import urequests';
        var name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC).replaceAll("'", "");
        var key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
        var code = `${name}.pop(${key})\n`
        return code;
    }
    Blockly.Python['udblockUDPiMiniV1_urequestsGetItem'] = function (block) {
        Blockly.Python.definitions_['import_urequests'] = 'from tools import urequests';
        var addr = Blockly.Python.valueToCode(block, 'ADDR', Blockly.Python.ORDER_ATOMIC);
        var code = `urequests.request('GET', ${addr})\n`
        return code;
    }
    Blockly.Python['udblockUDPiMiniV1_urequestsPostItem'] = function (block) {
        Blockly.Python.definitions_['import_urequests'] = 'from tools import urequests';
        Blockly.Python.definitions_['import_json'] = 'import json';
        var name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC).replaceAll("'", "");
        var addr = Blockly.Python.valueToCode(block, 'ADDR', Blockly.Python.ORDER_ATOMIC);
        var code = `urequests.request('POST', ${addr}, data=json.dumps(${name}).encode('utf-8'), headers={'Content-Type':'application/json'})\n`
        return code;
    }

    // 控制主板蜂鸣器播放
    Blockly.Python['udblockUDPiMiniV1_setBuzzerPlay'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';

        var sound = Blockly.Python.valueToCode(block, 'SOUND', Blockly.Python.ORDER_ATOMIC).replaceAll("'","")
        console.log(Blockly.Xml.blockToDom(block))
        var mode = Blockly.Python.valueToCode(block, 'PITCH', Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_buzzer.play(Buzzer.${sound},${mode})\n`;
        return code;
    };
    Blockly.Python['udblockUDPiMiniV1_setBuzzerPlayMidi'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';

        var sound = Blockly.Python.valueToCode(block, 'SOUND', Blockly.Python.ORDER_ATOMIC)
        if (String(sound).indexOf("demo") > -1){
            return `udpi_buzzer.play_midi(udpi_buzzer.demoSong)\n`;
        }
        return `udpi_buzzer.play_midi(${sound})\n`;
    };
    Blockly.Python['udblockUDPiMiniV1_menu_buzzerSounds'] = function (block) {
        var code = Blockly.Python.quote_(block.getFieldValue("buzzerSounds"));
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockUDPiMiniV1_menu_buzzerPitches'] = function (block) {
        var code = Blockly.Python.quote_(block.getFieldValue("buzzerPitches"));
        return [code, Blockly.Python.ORDER_ATOMIC];
    };


    Blockly.Python['udblockUDPiMiniV1_setBuzzerStop'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';

        var code = `udpi_buzzer.stop()\n`;
        return code;
    };

    // 主板显示屏
    Blockly.Python["udblockUDPiMiniV1_displayWrite"] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var line = parseInt(Blockly.Python.valueToCode(block, "LINE", Blockly.Python.ORDER_ATOMIC)) * 16 || 0

        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) || "Hello,World"

        var code = `udpi_screen.text(str(${text}), ${line}, 0)\n`;
        return code
    }
    Blockly.Python["udblockUDPiMiniV1_displayDrawLabel"] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var col = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)
        var row = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var text = Blockly.Python.valueToCode(block, "STR", Blockly.Python.ORDER_ATOMIC) || "Hello,World"

        var code = `udpi_screen.label(${col}, ${row}, str(${text}))\n`;
        return code
    }
    Blockly.Python["udblockUDPiMiniV1_displayDrawPoint"] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)

        var code = `udpi_screen.draw_point(${x}, ${y})\n`;
        return code
    }
    Blockly.Python["udblockUDPiMiniV1_displayDrawLine"] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var ex = Blockly.Python.valueToCode(block, "EX", Blockly.Python.ORDER_ATOMIC)
        var ey = Blockly.Python.valueToCode(block, "EY", Blockly.Python.ORDER_ATOMIC)

        var code = `udpi_screen.draw_line(${sx}, ${sy}, ${ex}, ${ey})\n`;
        return code
    }
    Blockly.Python["udblockUDPiMiniV1_displayDrawRect"] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var length = Blockly.Python.valueToCode(block, "LENGTH", Blockly.Python.ORDER_ATOMIC)
        var width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_ATOMIC)

        var code = `udpi_screen.draw_rect(${sx}, ${sy}, ${length}, ${width})\n`;
        return code
    }
    Blockly.Python["udblockUDPiMiniV1_displayDrawRectFill"] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var length = Blockly.Python.valueToCode(block, "LENGTH", Blockly.Python.ORDER_ATOMIC)
        var width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_ATOMIC)

        var code = `udpi_screen.draw_rect_fill(${sx}, ${sy}, ${length}, ${width})\n`;
        return code
    }
    Blockly.Python["udblockUDPiMiniV1_displayDrawCircle"] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var radius = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC)
        var code = `udpi_screen.draw_circle(${sx}, ${sy}, ${radius})\n`;
        return code
    }
    Blockly.Python["udblockUDPiMiniV1_displayDrawCircleFill"] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var radius = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC)
        var code = `udpi_screen.draw_circle_fill(${sx}, ${sy}, ${radius})\n`;
        return code
    }
    Blockly.Python["udblockUDPiMiniV1_displayDrawTriangle"] = function(block){
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
    Blockly.Python["udblockUDPiMiniV1_displayDrawTriangleFill"] = function(block){
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
    Blockly.Python["udblockUDPiMiniV1_displayScroll"] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        var x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)


        var code = `udpi_screen.scroll(${x}, ${y})\n`;
        return code
    }
    Blockly.Python['udblockUDPiMiniV1_menu_displayLine'] = function(block){
        var text = block.getFieldValue("displayLine");
        return [text, Blockly.Python.ORDER_ATOMIC]
    }

    Blockly.Python['udblockUDPiMiniV1_displayShow'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        return `udpi_screen.show()\n`;
    }
    Blockly.Python['udblockUDPiMiniV1_displayClean'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        return `udpi_screen.clear()\n`;
    }

    // 拓展版部分
    // 菜单
    var id = extb_udpi_mini.id;
    loadMiscMenu(id)
    Blockly.Python[`${id}_menu_touchMenu`] = function (block) {
        var touchMenu = block.getFieldValue("touchMenu");
        return [`${touchMenu}`, Blockly.Python.ORDER_ATOMIC]
    }

    // 传感器
    loadSensorDefinition(id)
    loadCamaraDefinition(id)
    // 执行器
    loadActionDefinition(id)

}