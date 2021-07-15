export default (Blockly) => {
    // 启动
    Blockly.Python['udblockUDPiPlus_espstart'] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        return '';
    }
    // 打印
    Blockly.Python['udblockUDPiPlus_print'] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)
        return 'print(' + text + ')\n';
    }

    // 系统资源
    Blockly.Python['udblockUDPiPlus_getStartTime'] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        return ["time.ticks_ms()", Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockUDPiPlus_delay_ms'] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep_ms(${time})\n`
    }
    Blockly.Python['udblockUDPiPlus_delay_us'] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep_us(${time})\n`
    }
    Blockly.Python['udblockUDPiPlus_delay_s'] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep(${time})\n`
    }
    
    // 当主板按钮按下时
    Blockly.Python['udblockUDPiPlus_whenButtonPressed'] = function (block) {
        console.log(Blockly.Xml.blockToDom(block))
        console.log(block.toString())
        console.log(block.nextConnection)

        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC)
        var statements = Blockly.Python.statementToCode(block, 'SUBSTACK')
        // var functionName = Blockly.Python.provideFunction_(
        //     `OnBtn${btn}PressedFunc`,
        //     ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(v):',
        //         '  hcsr04 = HCSR04(trigger_pin=trig_pin, echo_pin=echo_pin)',
        //         '  distance = hcsr04.distance_cm()',
        //         '  return distance']);
        var codeInit = `# 按钮${btn}点击事件\n`
        codeInit += 'def ' + `OnBtn${btn}PressedFunc` + '(v):\n'
        codeInit += `  time.sleep_ms(10)\n`
        codeInit += `  if (v.value()) == 1:\n`
        codeInit += `    pass\n`
        codeInit += `  else:\n  `
        statements = statements.replaceAll("\n", "\n  ")

        codeInit += statements
        Blockly.Python.definitions_[`btn_binding_${btn}`] = codeInit;
        var code = `\nBtnPressedEvent(${btn}, OnBtn${btn}PressedFunc)\n`
        return code
    }
    Blockly.Python['udblockUDPiPlus_menu_buttons'] = function (block) {
        var btn = block.getFieldValue("buttons");
        console.log(btn)
        return [`${btn}`, Blockly.Python.ORDER_ATOMIC]
    }


    // 读取环境光传感器
    Blockly.Python["udblockUDPiPlus_readAmbientLightSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var code = `sensor.GetAmbientLight(${39})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    // 读取声音传感器
    Blockly.Python["udblockUDPiPlus_readSoundSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var code = `sensor.GetMicrophone(${36})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    // 读取陀螺仪传感器
    Blockly.Python["udblockUDPiPlus_readGryoSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var code = `imu.ICM20602.ICM_Get_Gyroscope()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }
    // 读取加速度传感器
    Blockly.Python["udblockUDPiPlus_readAccelSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var code = `imu.ICM20602.ICM_Get_Accelerometer()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }

    // 控制启用主板RGB
    Blockly.Python['udblockUDPiPlus_openOnBoardRGB'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
       
        return `rgb_board_light = RGB(${17}, ${3})\n`;
    }

    // 控制启用禁用RGB
    Blockly.Python['udblockUDPiPlus_closeOnBoardRGB'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        //Blockly.getMainWorkspace().createVariable("rgb");
        // 修复WS2312B反转问题
        var rgb_board_reversed = "0, 0, 0"
        return `rgb_board_light.clear((${rgb_board_reversed}))\n`;
    }

    // 控制主板RGB显示颜色
    Blockly.Python["udblockUDPiPlus_setRGBDraw"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        if (rgb_board_color.length == 0){
            return '';
        }
        // 修复WS2312B反转问题
        var rgb_board_reversed = rgb_board_color.split(",");
        rgb_board_reversed[0] = rgb_board_reversed[0].replace("(", "");
        rgb_board_reversed[2] = rgb_board_reversed[2].replace(")", "");
        rgb_board_reversed = `(${rgb_board_reversed[1]},${rgb_board_reversed[0]},${rgb_board_reversed[2]})`
        return `rgb_board_light.clear((${rgb_board_reversed}))\n`
    }
    Blockly.Python["udblockUDPiPlus_setRGBLineSingleDraw"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        
        var rgb_board_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(rgb_board_index) <= 0 || parseInt(rgb_board_index) >=6){
            rgb_board_index = 1
        }
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        if (rgb_board_color.length == 0){
            return '';
        }
        // 修复WS2312B反转问题
        var rgb_board_reversed = rgb_board_color.split(",");
        rgb_board_reversed[0] = rgb_board_reversed[0].replace("(", "");
        rgb_board_reversed[2] = rgb_board_reversed[2].replace(")", "");
        rgb_board_reversed = `(${rgb_board_reversed[1]},${rgb_board_reversed[0]},${rgb_board_reversed[2]})`
        return `rgb_board_light.value(${rgb_board_index-1}, ${rgb_board_reversed})\n`;
    }
    Blockly.Python['udblockUDPiPlus_setRGBLineSingleOnlyDraw'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        
        var rgb_board_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        if (rgb_board_color.length == 0){
            return '';
        }

        if (parseInt(rgb_board_index) <= 0 || parseInt(rgb_board_index) >=6){
            rgb_board_index = 1
        }

        // 修复WS2312B反转问题
        var rgb_board_reversed = rgb_board_color.split(",");
        rgb_board_reversed[0] = rgb_board_reversed[0].replace("(","");
        rgb_board_reversed[2] = rgb_board_reversed[2].replace(")","");
        rgb_board_reversed = `(${rgb_board_reversed[1]},${rgb_board_reversed[0]},${rgb_board_reversed[2]})`
        return `rgb_board_light.switch_singal(${rgb_board_index-1}, ${rgb_board_reversed})\n`;
    }
    Blockly.Python['udblockUDPiPlus_getWiFiStatus'] = function () {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        return ['WIFIISConnected()', Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockUDPiPlus_closeConnectToWiFi'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var code = `WIFIDisconnect()\n`;
        return code;
    }
    Blockly.Python['udblockUDPiPlus_setConnectToWiFi'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC);
        var password = Blockly.Python.valueToCode(block, 'PSK', Blockly.Python.ORDER_ATOMIC);
        var code = `WIFIConnect(${ssid}, ${password})\n`;
        return code;
    };
    Blockly.Python['udblockUDPiPlus_openWiFiAP'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC);
        var psk = Blockly.Python.valueToCode(block, 'PSK', Blockly.Python.ORDER_ATOMIC);
        var code = `WIFISetModeAP(${ssid}, ${psk}, 13)\n`
        return code;
    }
    Blockly.Python['udblockUDPiPlus_udpClientSent'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC);
        return `UDPClientSendMsg(${msg})\n`
    }
    Blockly.Python['udblockUDPiPlus_udpClientReceiveEvent'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        //var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC);
        var statements = Blockly.Python.statementToCode(block, 'SUBSTACK')
        statements = "  " + statements.replaceAll("\n", "\n  ")

        var functionName = Blockly.Python.provideFunction_(
            'udpRecvFunc',
            ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(udp_socket, udp_msg, udp_remote):',
                statements,
            ]);
        var code = `UDPServerBind(${functionName})\n`;
        return code;
    }
    
    Blockly.Python['udblockUDPiPlus_udpClientReceivedText'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var code = `udp_msg`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    

    // 控制主板蜂鸣器播放
    Blockly.Python['udblockUDPiPlus_setBuzzerPlay'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';

        var sound = Blockly.Python.valueToCode(block, 'SOUND', Blockly.Python.ORDER_ATOMIC).replaceAll("'","")
        console.log(Blockly.Xml.blockToDom(block))
        var mode = Blockly.Python.valueToCode(block, 'PITCH', Blockly.Python.ORDER_ATOMIC);
        var code = `buzzer.play(Buzzer.${sound},${mode})\n`;
        return code;
    };
    Blockly.Python['udblockUDPiPlus_menu_buzzerSounds'] = function (block) {
        var code = Blockly.Python.quote_(block.getFieldValue("buzzerSounds"));
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockUDPiPlus_menu_buzzerPitches'] = function (block) {
        var code = Blockly.Python.quote_(block.getFieldValue("buzzerPitches"));
        return [code, Blockly.Python.ORDER_ATOMIC];
    };


    Blockly.Python['udblockUDPiPlus_setBuzzerStop'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';

        var code = `buzzer.stop()\n`;
        return code;
    };

    // 主板显示屏
    Blockly.Python["udblockUDPiPlus_displayWrite"] = function(block){
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['oled_enable'] = 'oled = OLED(i2c)';
        var line = parseInt(Blockly.Python.valueToCode(block, "LINE", Blockly.Python.ORDER_ATOMIC)) * 16 || 0

        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) || "Hello,World"

        var code = `oled.text(str(${text}), ${line}, 0)\n`;
        return code
    }
    Blockly.Python['udblockUDPiPlus_menu_displayLine'] = function(block){
        var text = block.getFieldValue("displayLine");
        return [text, Blockly.Python.ORDER_ATOMIC]
    }

    Blockly.Python['udblockUDPiPlus_displayShow'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['oled_enable'] = 'oled = OLED(i2c)';
        return `oled.show()\n`;
    }
    Blockly.Python['udblockUDPiPlus_displayClean'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['oled_enable'] = 'oled = OLED(i2c)';
        return `oled.clear()\n`;
    }



}