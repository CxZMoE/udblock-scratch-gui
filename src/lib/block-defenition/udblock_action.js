function loadActionDefinition(board = "") {
    /* 执行器开始 */
    Blockly.Python[`${board}_digitalDisplayShow`] = function (block) {
        Blockly.Python.definitions_['import_driver_fdd'] = 'from drivers.FourDigitDisplay import FourDigitDisplay';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(udpi_i2c)';
        //console.log("arduino:"+Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC))
        var num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC)
        return `fdd.shownum(${num})\n`;
    }
    Blockly.Python[`${board}_digitalDisplayClear`] = function (block) {
        Blockly.Python.definitions_['import_driver_fdd'] = 'from drivers.FourDigitDisplay import FourDigitDisplay';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(udpi_i2c)';
        return `fdd.clear()\n`;
    }
    Blockly.Python[`${board}_digitalDisplayOpen`] = function (block) {
        Blockly.Python.definitions_['import_driver_fdd'] = 'from drivers.FourDigitDisplay import FourDigitDisplay';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(udpi_i2c)';
        return `fdd.on()\n`;
    }
    Blockly.Python[`${board}_digitalDisplayClose`] = function (block) {
        Blockly.Python.definitions_['import_driver_fdd'] = 'from drivers.FourDigitDisplay import FourDigitDisplay';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(udpi_i2c)';
        return `fdd.off()\n`;
    }


    Blockly.Python[`${board}_digitalDisplayIntensity`] = function (block) {
        Blockly.Python.definitions_['import_driver_fdd'] = 'from drivers.FourDigitDisplay import FourDigitDisplay';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(udpi_i2c)';
        var intensity = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC);
        return `fdd.intensity(${intensity})\n`;
    }

    // 灯带
    Blockly.Python[`${board}_openRGBStrip`] = function (block) {
        Blockly.Python.definitions_['import_driver_rgb'] = 'from udrobot.udpi import RGB';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        var rgb_count = Blockly.Python.valueToCode(block, "COUNT", Blockly.Python.ORDER_ATOMIC)
        if (!rgb_count) {
            return `rgb_light_${rgb_pin} = RGB(${rgb_pin}, 15)\n`;
        }
        return `rgb_light_${rgb_pin} = RGB(${rgb_pin}, ${rgb_count})\n`;
    }
    Blockly.Python[`${board}_setRGBStripLuminance`] = function (block) {
        Blockly.Python.definitions_['import_driver_rgb'] = 'from udrobot.udpi import RGB';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        var rgb_intensity = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.intensity(${rgb_intensity})\n`;
    }
    Blockly.Python[`${board}_setRGBStripIndexColor`] = function (block) {
        Blockly.Python.definitions_['import_driver_rgb'] = 'from udrobot.udpi import RGB';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        var rgb_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var rgb_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.value(${rgb_index}, ${rgb_color})\n`;
    }

    Blockly.Python[`${board}_setRGBStripIndexOnlyColor`] = function (block) {
        Blockly.Python.definitions_['import_driver_rgb'] = 'from udrobot.udpi import RGB';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        var rgb_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var rgb_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.switch_singal(${rgb_index}, ${rgb_color})\n`;
    }

    Blockly.Python[`${board}_setRGBStripClear`] = function (block) {
        Blockly.Python.definitions_['import_driver_rgb'] = 'from udrobot.udpi import RGB';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        var rgb_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.clear((${rgb_color}))\n`;
    }
    // 继电器
    Blockly.Python[`${board}_openReplay`] = function (block) {
        Blockly.Python.definitions_['import_driver_relay'] = 'from drivers.relay import Relay';
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_${relay_pin} = Relay(${relay_pin})`;

        return `relay_control_${relay_pin}.on()\n`;
    }
    Blockly.Python[`${board}_closeReplay`] = function (block) {
        Blockly.Python.definitions_['import_driver_relay'] = 'from drivers.relay import Relay';
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_${relay_pin} = Relay(${relay_pin})`;
        return `relay_control_${relay_pin}.off()\n`;
    }
    Blockly.Python[`${board}_switchReplay`] = function (block) {
        Blockly.Python.definitions_['import_driver_relay'] = 'from drivers.relay import Relay';
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_${relay_pin} = Relay(${relay_pin})`;
        return `relay_control_${relay_pin}.toggle()\n`;
    }

    // 电机
    Blockly.Python[`${board}_turnMotorClock`] = function (block) {
        Blockly.Python.definitions_['import_driver_motor'] = 'from drivers.motor import Motor';
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        Blockly.Python.definitions_[`motor_${port}`] = `myMotor${port.split(",")[0]} = Motor(${port})`;
        var intensity = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC)
        if (intensity > 100) {
            intensity = 100;
        }
        if (intensity < 0) {
            intensity = 0
        }
        return `myMotor${port.split(",")[0]}.clock(${intensity} / 100)\n`;
    }
    Blockly.Python[`${board}_turnMotorAnticlock`] = function (block) {
        Blockly.Python.definitions_['import_driver_motor'] = 'from drivers.motor import Motor';
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        Blockly.Python.definitions_[`motor_${port}`] = `myMotor${port.split(",")[0]} = Motor(${port})`;
        var intensity = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC)
        if (intensity > 100) {
            intensity = 100;
        }
        if (intensity < 0) {
            intensity = 0
        }
        return `myMotor${port.split(",")[0]}.anticlock(${intensity} / 100)\n`;
    }
    Blockly.Python[`${board}_closeMotor`] = function (block) {
        Blockly.Python.definitions_['import_driver_motor'] = 'from drivers.motor import Motor';
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        Blockly.Python.definitions_[`motor_${port}`] = `myMotor${port.split(",")[0]} = Motor(${port})`;
        // var intensity = Math.abs(Number(Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC)))
        // if (intensity > 100) {
        //     intensity = 100;
        // }
        // intensity = Math.floor(intensity / 100 * 1023);
        return `myMotor${port.split(",")[0]}.stop()\n`;
    }

    // 舵机
    Blockly.Python[`${board}_turnServoDegree`] = function (block) {

        Blockly.Python.definitions_['import_driver_servo'] = 'from drivers.servo import Servo';
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        Blockly.Python.definitions_[`servo_${port}`] = `myServo${port} = Servo(${port})`;
        var angle = Math.abs(Blockly.Python.valueToCode(block, "DEGREE", Blockly.Python.ORDER_ATOMIC))
        if (angle > 180) {
            angle = 180;
        }
        return `myServo${port}.turn(${angle})\n`;
    }

    // 表情面板
    Blockly.Python[`${board}_setFacePanelPreset`] = function (block) {
        Blockly.Python.definitions_['import_face_panel'] = 'from udrobot.action_module.face_panel import *';
        var face = Blockly.Python.valueToCode(block, "FACE", Blockly.Python.ORDER_ATOMIC);
        var color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);
        return `express_panel_do(i2c, ${face}, color=${color})\n`;
    }
    Blockly.Python[`${board}_setFacePanelCustomized`] = function (block) {
        var color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);

        var getPixelArray = function (box) {
            //console.log(box.length)
            var output = []
            for (var i = 0; i < 16; i++) {
                var linePixel = []
                for (var j = i * 8; j < i * 8 + 8; j++) {
                    if (String(box[j]) == "1") {
                        linePixel.push(JSON.parse(color
                            .replace(/\(/g, '[')
                            .replace(/\)/g, ']')
                        ))
                    } else {
                        linePixel.push((0, 0, 0))
                    }
                }
                output.push(linePixel)
            }
            //console.log(output)

            var output2 = []
            // R
            for (var i = 0; i < output.length; i++) {
                var linePixel = output[i]
                var lineHex = 0x00
                for (var j = 0; j < linePixel.length; j++) {
                    if (linePixel[j][0] > 100) {
                        lineHex |= 0x80 >> j
                    }
                }
                output2.push(lineHex)
            }
            // B
            for (var i = 0; i < output.length; i++) {
                var linePixel = output[i]
                var lineHex = 0x00
                for (var j = 0; j < linePixel.length; j++) {
                    if (linePixel[j][2] > 100) {
                        lineHex |= 0x80 >> j
                    }
                }
                output2.push(lineHex)
            }
            // G
            for (var i = 0; i < output.length; i++) {
                var linePixel = output[i]
                var lineHex = 0x00
                for (var j = 0; j < linePixel.length; j++) {
                    if (linePixel[j][1] > 100) {
                        lineHex |= 0x80 >> j
                    }
                }
                output2.push(lineHex)
            }

            //console.log(output2);
            var arrayStr = `bytearray([0x02,${String(output2)}])`
            //console.log(arrayStr)
            return arrayStr
        }

        //console.log(Blockly.Xml.blockToDom(block))
        Blockly.Python.definitions_['import_face_panel'] = 'from udrobot.action_module.face_panel import *';
        var action = Blockly.Python.valueToCode(block, "FACE", Blockly.Python.ORDER_ATOMIC);




        return `express_panel_do(i2c, ${getPixelArray(action)}, mode=FACE_MODE_DIY)\n`;
        // 每种颜色16行，每行8个， 行用16进制表示即： 0x00
        //                          R                                  B                                   G
        //bytearray([0x02,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0//,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0//,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    }
}

module.exports = loadActionDefinition