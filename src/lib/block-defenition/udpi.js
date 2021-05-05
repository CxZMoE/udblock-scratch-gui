export default (Blockly) => {
    // 当主板按钮按下时
    Blockly.Python['udblockUDPi_whenButtonPressed'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var btn = block.getFieldValue("btn")
        var statements = Blockly.Python.statementToCode(block, 'DO')
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
    // 读取环境光传感器
    Blockly.Python["udblockUDPi_readAmbientLightSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var code = `sensor.GetAmbientLight(${39})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    // 读取声音传感器
    Blockly.Python["udblockUDPi_readSoundSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var code = `sensor.GetMicrophone(${36})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    // 读取陀螺仪传感器
    Blockly.Python["udblockUDPi_readGryoSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var code = `imu.ICM20602.ICM_Get_Gyroscope()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }
    // 读取加速度传感器
    Blockly.Python["udblockUDPi_readAccelSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var code = `imu.ICM20602.ICM_Get_Accelerometer()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }

    // 控制启用主板RGB
    Blockly.Python['udblockUDPi_openOnBoardRGB'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        //Blockly.getMainWorkspace().createVariable("rgb");
        var RGB_PINS = ["19", "26", "25", "21", "18"];

        var code = `rgb_board_light = [`;
        for (var i = 0; i < 5; i++) {
            code += `RGB(${RGB_PINS[i]}, 5)${(i == 4) ? "" : ","}`
        }
        return `${code}]\n`
    }

    // 控制启用禁用RGB
    Blockly.Python['udblockUDPi_closeOnBoardRGB'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        //Blockly.getMainWorkspace().createVariable("rgb");
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
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.getMainWorkspace().createVariable("rgb");
        var rgb_board_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        // 修复WS2312B反转问题
        var rgb_board_reversed = rgb_board_color.split(",");
        rgb_board_reversed[0] = rgb_board_reversed[0].replace("(", "");
        rgb_board_reversed[2] = rgb_board_reversed[2].replace(")", "");
        rgb_board_reversed = `(${rgb_board_reversed[1]},${rgb_board_reversed[0]},${rgb_board_reversed[2]})`
        return `rgb_board_light[${0}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${1}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${2}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${3}].clear((${rgb_board_reversed}))\n` +
            `rgb_board_light[${4}].clear((${rgb_board_reversed}))\n`;
    }
    Blockly.Python['udblockUDPi_closeConnectToWiFi'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var statements = Blockly.Python.statementToCode(block, 'SUBSTACK')
        var code = "while True:\n"
        code += statements
        return code
    }
    Blockly.Python['udblockUDPi_setConnectToWiFi'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC);
        var password = Blockly.Python.valueToCode(block, 'PSK', Blockly.Python.ORDER_ATOMIC);
        var code = `WIFIConnect(${ssid}, ${password})\n`;
        return code;
    };

    // 控制主板蜂鸣器播放
    Blockly.Python['udblockUDPi_setBuzzerPlay'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';

        var sound = block.getFieldValue('sound');
        var mode = block.getFieldValue('mode');
        var code = `buzzer.play(Buzzer.${sound},"${mode}")\n`;
        return code;
    };
}