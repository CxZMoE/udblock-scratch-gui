import { extb_udpi_mini } from "scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from "./udblock_camera";
import loadSensorDefinition from "./udblock_sensor";

export default (Blockly) => {
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
    Blockly.Python['udblockUDPiMiniV1_feedWDT'] = function(block){
        var timeout = Blockly.Python.valueToCode(block, "TIMEOUT", Blockly.Python.ORDER_ATOMIC) || 20
        if (timeout < 15) {
            timeout = 15;
        }
        Blockly.Python.definitions_['enable_watchdog'] = `from machine import WDT;global_wdt=WDT(timeout=${timeout*1000})`;
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';
        
        return `global_wdt.feed()\n`
    }

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
    Blockly.Python['udblockUDPiMiniV1_whenButtonPressedIRQ'] = function (block) {
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
    Blockly.Python['udblockUDPiMiniV1_menu_buttons'] = function (block) {
        var btn = block.getFieldValue("buttons");
        // console.log(btn)
        return [`${btn}`, Blockly.Python.ORDER_ATOMIC]
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
        // console.log(rgb_board_index)
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

    // 控制主板蜂鸣器播放
    Blockly.Python['udblockUDPiMiniV1_setBuzzerPlay'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';

        var sound = Blockly.Python.valueToCode(block, 'SOUND', Blockly.Python.ORDER_ATOMIC).replaceAll("'","")
        // console.log(Blockly.Xml.blockToDom(block))
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
}