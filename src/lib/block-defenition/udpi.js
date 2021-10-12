import BlockUtility from "scratch-vm/src/engine/block-utility"

export default (Blockly) => {
    // 启动
    Blockly.Python['udblockUDPi_espstart'] = function(block){
        Blockly.Python.definitions_['import_udrobot_basic'] = 'from udrobot.basic import *';
        return '';
    }
    // 打印
    Blockly.Python['udblockUDPi_print'] = function(block){
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)
        return 'print(' + text + ')\n';
    }
    // 系统资源
    Blockly.Python['udblockUDPi_getStartTime'] = function(block){
        return ["time.ticks_ms()", Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockUDPi_delay_ms'] = function(block){
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep_ms(${time})\n`
    }
    Blockly.Python['udblockUDPi_delay_us'] = function(block){
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep_us(${time})\n`
    }
    Blockly.Python['udblockUDPi_delay_s'] = function(block){
        var time = Blockly.Python.valueToCode(block, "TIME", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(time) < 0){
            time = 0;
        }
        return `time.sleep(${time})\n`
    }


    // 当主板按钮按下时
    Blockly.Python['udblockUDPi_whenButtonPressed'] = function (block) {
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
    Blockly.Python['udblockUDPi_menu_buttons'] = function (block) {
        var btn = block.getFieldValue("buttons");
        console.log(btn)
        return [`${btn}`, Blockly.Python.ORDER_ATOMIC]
    }


    // // 读取环境光传感器
    // Blockly.Python["udblockUDPi_readAmbientLightSensor"] = function (block) {
    //     
    //     var code = `udpi_sensor.GetAmbientLight(${39})`;
    //     return [code, Blockly.Python.ORDER_ATOMIC];
    // }
    // // 读取声音传感器
    // Blockly.Python["udblockUDPi_readSoundSensor"] = function (block) {
    //     
    //     var code = `udpi_sensor.GetMicrophone(${36})`;
    //     return [code, Blockly.Python.ORDER_ATOMIC];
    // }
    // // 读取陀螺仪传感器
    // Blockly.Python["udblockUDPi_readGryoSensor"] = function (block) {
    //     
    //     var code = `imu.ICM20602.ICM_Get_Gyroscope()`
    //     return [code, Blockly.Python.ORDER_ATOMIC]
    // }
    // // 读取加速度传感器
    // Blockly.Python["udblockUDPi_readAccelSensor"] = function (block) {
    //     
    //     var code = `imu.ICM20602.ICM_Get_Accelerometer()`
    //     return [code, Blockly.Python.ORDER_ATOMIC]
    // }

    // 控制启用主板RGB
    Blockly.Python['udblockUDPi_openOnBoardRGB'] = function (block) {
        
        // 
        var RGB_PINS = ["19", "26", "25", "21", "18"];

        var code = `rgb_board_light = [`;
        for (var i = 0; i < 5; i++) {
            code += `RGB(${RGB_PINS[i]}, 5)${(i == 4) ? "" : ","}`
        }
        return `${code}]\n`
    }

    // 控制启用禁用RGB
    Blockly.Python['udblockUDPi_closeOnBoardRGB'] = function (block) {
        
        // 
        // 修复WS2312B反转问题
        var rgb_board_reversed = "0, 0, 0"
        return `rgb_board_light[${0}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${1}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${2}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${3}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${4}].clear((${rgb_board_reversed}))\n`;
    }

    // 控制主板RGB显示颜色
    Blockly.Python["udblockUDPi_setRGBDraw"] = function (block) {
        
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        // 修复WS2312B反转问题
        if (rgb_board_color.length == 0){
            return '';
        }
        var rgb_board_reversed = rgb_board_color.split(",");
        console.log(rgb_board_reversed)
        rgb_board_reversed[0] = rgb_board_reversed[0].replace("(", "");
        rgb_board_reversed[2] = rgb_board_reversed[2].replace(")", "");
        rgb_board_reversed = `(${rgb_board_reversed[1]},${rgb_board_reversed[0]},${rgb_board_reversed[2]})`
        return `rgb_board_light[${0}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${1}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${2}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${3}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${4}].clear((${rgb_board_reversed}))\n`;
    }
    Blockly.Python["udblockUDPi_setRGBLineDraw"] = function (block) {
        
        var line = Blockly.Python.valueToCode(block, "LINE", Blockly.Python.ORDER_ATOMIC)
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        if (rgb_board_color.length == 0){
            return '';
        }
        if (parseInt(line) <=0  || parseInt(line) >=6){
            line = 1
        }
        // 修复WS2312B反转问题
        var rgb_board_reversed = rgb_board_color.split(",");
        rgb_board_reversed[0] = rgb_board_reversed[0].replace("(", "");
        rgb_board_reversed[2] = rgb_board_reversed[2].replace(")", "");
        rgb_board_reversed = `(${rgb_board_reversed[1]},${rgb_board_reversed[0]},${rgb_board_reversed[2]})`
        return `rgb_board_light[${line}-1].clear((${rgb_board_reversed}))\n`
    }
    Blockly.Python["udblockUDPi_setRGBLineSingleDraw"] = function (block) {
        
        
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
        var rgb_line =  Blockly.Python.valueToCode(block, "LINE", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(rgb_line) <= 0 || parseInt(rgb_line) >=6){
            line = 0
        }
        return `rgb_board_light[${rgb_line}-1].value(${rgb_board_index}-1, ${rgb_board_reversed})\n`;
    }
    Blockly.Python['udblockUDPi_setRGBLineSingleOnlyDraw'] = function (block) {
        
        // 
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
        var rgb_line = Blockly.Python.valueToCode(block, "LINE", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(rgb_line) <= 0 || parseInt(rgb_line) >=6){
            line = 0
        }
        return `rgb_board_light[${rgb_line}-1].switch_singal(${rgb_board_index}-1, ${rgb_board_reversed})\n`;
    }
    Blockly.Python['udblockUDPi_getWiFiStatus'] = function () {
        
        return ['udpi_wifi.is_connected()', Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockUDPi_closeConnectToWiFi'] = function (block) {
        
        var code = `udpi_wifi.disconnect()\n`;
        return code;
    }
    Blockly.Python['udblockUDPi_setConnectToWiFi'] = function (block) {
        
        var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC);
        var password = Blockly.Python.valueToCode(block, 'PSK', Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_wifi.connect(${ssid}, ${password})\n`;
        return code;
    };
    Blockly.Python['udblockUDPi_openWiFiAP'] = function (block) {
        
        var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC);
        var psk = Blockly.Python.valueToCode(block, 'PSK', Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_wifi.set_mode_ap(${ssid}, ${psk}, 13)\n`
        return code;
    }
    Blockly.Python['udblockUDPi_udpClientSent'] = function (block) {
        
        var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC);
        return `udpi_wifi.broadcast(${msg})\n`
    }
    Blockly.Python['udblockUDPi_udpClientReceiveEvent'] = function (block) {
        
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
    Blockly.Python['udblockUDPi_udpClientReceivedText'] = function (block) {
        
        var code = `udp_msg`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    // 控制主板蜂鸣器播放
    Blockly.Python['udblockUDPi_setBuzzerPlay'] = function (block) {
        

        var sound = Blockly.Python.valueToCode(block, 'SOUND', Blockly.Python.ORDER_ATOMIC).replaceAll("'","")
        console.log(Blockly.Xml.blockToDom(block))
        var mode = Blockly.Python.valueToCode(block, 'PITCH', Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_buzzer.play(udpi_buzzer.${sound},${mode})\n`;
        return code;
    };
    Blockly.Python['udblockUDPi_setBuzzerPlayMidi'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot.basic import *';

        var sound = Blockly.Python.valueToCode(block, 'SOUND', Blockly.Python.ORDER_ATOMIC)
        if (String(sound).indexOf("demo") > -1){
            return `udpi_buzzer.play_midi(udpi_buzzer.demoSong)\n`;
        }
        return `udpi_buzzer.play_midi(${sound})\n`;
    };
    Blockly.Python['udblockUDPi_menu_buzzerSounds'] = function (block) {
        var code = Blockly.Python.quote_(block.getFieldValue("buzzerSounds"));
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockUDPi_menu_buzzerPitches'] = function (block) {
        var code = Blockly.Python.quote_(block.getFieldValue("buzzerPitches"));
        return [code, Blockly.Python.ORDER_ATOMIC];
    };


    Blockly.Python['udblockUDPi_setBuzzerStop'] = function (block) {
        

        var code = `udpi_buzzer.stop()\n`;
        return code;
    };



}