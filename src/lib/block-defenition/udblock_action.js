import { extb_mf } from "../../../../udblock-scratch-vm/src/util/extb-definitions";

export default (board = "") => {
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

    // 双路继电器
    Blockly.Python[`${board}_openReplayDbl`] = function (block) {
        Blockly.Python.definitions_['import_driver_relay'] = 'from drivers.relay import Relay';
        var channel = Blockly.Python.valueToCode(block, "CH", Blockly.Python.ORDER_ATOMIC);
        if (channel == '') { channel = 0 }
        console.log("channel: " + String(channel))
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[channel];
        if (relay_pin >= 34 && relay_pin <= 39) {

            console.log(block)
            for (var i in extb_mf.RJ11) {
                for (var j in extb_mf.RJ11[i].value) {
                    if (String(relay_pin) == extb_mf.RJ11[i].value[j]) {
                        fetch('http://127.0.0.1:3000/broadcast?msg=' + `${extb_mf.RJ11[i].name}口不支持继电器${channel == 0 ? '黄路' : '蓝路'}功能`)

                    }
                }
            }
            block.dispose(true);
        }
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_dbl_${relay_pin} = Relay(${relay_pin})`;

        return `relay_control_dbl_${relay_pin}.on()\n`;
    }
    Blockly.Python[`${board}_closeReplayDbl`] = function (block) {
        Blockly.Python.definitions_['import_driver_relay'] = 'from drivers.relay import Relay';
        var channel = Blockly.Python.valueToCode(block, "CH", Blockly.Python.ORDER_ATOMIC);
        if (channel == '') { channel = 0 }
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[channel];
        if (relay_pin >= 34 && relay_pin <= 39) {

            console.log(block)
            for (var i in extb_mf.RJ11) {
                for (var j in extb_mf.RJ11[i].value) {
                    if (String(relay_pin) == extb_mf.RJ11[i].value[j]) {
                        fetch('http://127.0.0.1:3000/broadcast?msg=' + `${extb_mf.RJ11[i].name}口不支持继电器${channel == 0 ? '黄路' : '蓝路'}功能`)

                    }
                }
            }
            block.dispose(true)
        }
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_dbl_${relay_pin} = Relay(${relay_pin})`;
        return `relay_control_dbl_${relay_pin}.off()\n`;
    }
    Blockly.Python[`${board}_switchReplayDbl`] = function (block) {
        Blockly.Python.definitions_['import_driver_relay'] = 'from drivers.relay import Relay';
        var channel = Blockly.Python.valueToCode(block, "CH", Blockly.Python.ORDER_ATOMIC);
        if (channel == '') { channel = 0 }
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[channel];
        if (relay_pin >= 34 && relay_pin <= 39) {

            console.log(block)
            for (var i in extb_mf.RJ11) {
                for (var j in extb_mf.RJ11[i].value) {
                    if (String(relay_pin) == extb_mf.RJ11[i].value[j]) {
                        fetch('http://127.0.0.1:3000/broadcast?msg=' + `${extb_mf.RJ11[i].name}口不支持继电器${channel == 0 ? '黄路' : '蓝路'}功能`)

                    }
                }
            }
            block.dispose(true)
        }

        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_dbl_${relay_pin} = Relay(${relay_pin})`;
        return `relay_control_dbl_${relay_pin}.toggle()\n`;
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
        var name = port.split(',').join('')
        Blockly.Python.definitions_[`motor_${name}`] = `myMotor${port.split(",")[0]} = Motor(${port})`;
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
        var name = port.split(',').join('')
        Blockly.Python.definitions_[`motor_${name}`] = `myMotor${port.split(",")[0]} = Motor(${port})`;
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
        Blockly.Python.definitions_[`servo_${port.split(',')[0]}`] = `myServo${port.split(',')[0]} = Servo(${port})`;

        var angle = Blockly.Python.valueToCode(block, "DEGREE", Blockly.Python.ORDER_ATOMIC)
        console.log(typeof (angle))
        return `myServo${port.split(',')[0]}.turn(abs(${angle}))\n`;
    }

    // 舵机
    Blockly.Python[`${board}_turnStepper`] = function (block) {

        Blockly.Python.definitions_['import_driver_stepper'] = 'from drivers.stepper import Stepper';
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        Blockly.Python.definitions_[`stepper_${port.split(',')[0]}`] = `myStepper${port.split(',')[0]} = Stepper(${port})`;
        Blockly.Python[`${board}_menu_StepperDirectionMenu`] = function (block) {
            var text = block.getFieldValue("StepperDirectionMenu");
            return [text, Blockly.Python.ORDER_ATOMIC]
        }

        var direction = Blockly.Python.valueToCode(block, "DIRECTION", Blockly.Python.ORDER_ATOMIC)
        var period = Blockly.Python.valueToCode(block, "PERIOD", Blockly.Python.ORDER_ATOMIC)
        var rounds = Blockly.Python.valueToCode(block, "ROUNDS", Blockly.Python.ORDER_ATOMIC)

        return `myStepper${port.split(',')[0]}.Turn(${direction}, ${period}, ${rounds})\n`;
    }

    // 表情面板
    Blockly.Python[`${board}_setFacePanelPreset`] = function (block) {
        Blockly.Python.definitions_['import_face_panel'] = 'from udrobot.action_module.face_panel import *';
        var face = Blockly.Python.valueToCode(block, "FACE", Blockly.Python.ORDER_ATOMIC);
        var color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);
        return `express_panel_do(udpi_i2c, ${face}, color=${color})\n`;
    }
    Blockly.Python[`${board}_setFacePanelCustomized`] = function (block) {
        var color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);

        var getPixelArray = function (box) {
            //console.log(box.length)
            console.log(box)
            box = String(box)
            box = box.substring(1, box.length - 1)
            var output = []
            for (var i = 0; i < 16; i++) {
                var linePixel = []
                for (var j = i * 8; j < i * 8 + 8; j++) {
                    if (String(box[j]).indexOf("1") > -1) {
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
                console.log(linePixel)
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
        console.log(action)



        return `express_panel_do(udpi_i2c, ${getPixelArray(action)}, mode=FACE_MODE_DIY)\n`;
        // 每种颜色16行，每行8个， 行用16进制表示即： 0x00
        //                          R                                  B                                   G
        //bytearray([0x02,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0//,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0//,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    }

    // OLED显示屏模组
    // 主板显示屏
    Blockly.Python[`${board}_displayWrite`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var line = Blockly.Python.valueToCode(block, "LINE", Blockly.Python.ORDER_ATOMIC)

        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC) || "Hello,World"

        var code = `oled_module.text(str(${text}), ${line}, 0)\n`;
        return code
    }
    Blockly.Python[`${board}_displayDrawLabel`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var col = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)
        var row = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var text = Blockly.Python.valueToCode(block, "STR", Blockly.Python.ORDER_ATOMIC) || "Hello,World"

        var code = `oled_module.label( ${col}, ${row}, ${text})\n`;
        return code
    }
    Blockly.Python[`${board}_displayDrawPoint`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)

        var code = `oled_module.draw_point(${x}, ${y})\n`;
        return code
    }
    Blockly.Python[`${board}_displayDrawLine`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var ex = Blockly.Python.valueToCode(block, "EX", Blockly.Python.ORDER_ATOMIC)
        var ey = Blockly.Python.valueToCode(block, "EY", Blockly.Python.ORDER_ATOMIC)

        var code = `oled_module.draw_line(${sx}, ${sy}, ${ex}, ${ey})\n`;
        return code
    }
    Blockly.Python[`${board}_displayDrawRect`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var length = Blockly.Python.valueToCode(block, "LENGTH", Blockly.Python.ORDER_ATOMIC)
        var width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_ATOMIC)

        var code = `oled_module.draw_rect(${sx}, ${sy}, ${length}, ${width})\n`;
        return code
    }
    Blockly.Python[`${board}_displayDrawRectFill`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var length = Blockly.Python.valueToCode(block, "LENGTH", Blockly.Python.ORDER_ATOMIC)
        var width = Blockly.Python.valueToCode(block, "WIDTH", Blockly.Python.ORDER_ATOMIC)

        var code = `oled_module.draw_rect_fill(${sx}, ${sy}, ${length}, ${width})\n`;
        return code
    }
    Blockly.Python[`${board}_displayDrawCircle`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var radius = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC)
        var code = `oled_module.draw_circle(${sx}, ${sy}, ${radius})\n`;
        return code
    }
    Blockly.Python[`${board}_displayDrawCircleFill`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var sx = Blockly.Python.valueToCode(block, "SX", Blockly.Python.ORDER_ATOMIC)
        var sy = Blockly.Python.valueToCode(block, "SY", Blockly.Python.ORDER_ATOMIC)

        var radius = Blockly.Python.valueToCode(block, "R", Blockly.Python.ORDER_ATOMIC)
        var code = `oled_module.draw_circle_fill(${sx}, ${sy}, ${radius})\n`;
        return code
    }
    Blockly.Python[`${board}_displayDrawTriangle`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var x1 = Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_ATOMIC)
        var y1 = Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_ATOMIC)
        var x2 = Blockly.Python.valueToCode(block, "X2", Blockly.Python.ORDER_ATOMIC)
        var y2 = Blockly.Python.valueToCode(block, "Y2", Blockly.Python.ORDER_ATOMIC)
        var x3 = Blockly.Python.valueToCode(block, "X3", Blockly.Python.ORDER_ATOMIC)
        var y3 = Blockly.Python.valueToCode(block, "Y3", Blockly.Python.ORDER_ATOMIC)

        var code = `oled_module.draw_triangle(${x1}, ${y1}, ${x2}, ${y2}, ${x3}, ${y3})\n`;
        return code
    }
    Blockly.Python[`${board}_displayDrawTriangleFill`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var x1 = Blockly.Python.valueToCode(block, "X1", Blockly.Python.ORDER_ATOMIC)
        var y1 = Blockly.Python.valueToCode(block, "Y1", Blockly.Python.ORDER_ATOMIC)
        var x2 = Blockly.Python.valueToCode(block, "X2", Blockly.Python.ORDER_ATOMIC)
        var y2 = Blockly.Python.valueToCode(block, "Y2", Blockly.Python.ORDER_ATOMIC)
        var x3 = Blockly.Python.valueToCode(block, "X3", Blockly.Python.ORDER_ATOMIC)
        var y3 = Blockly.Python.valueToCode(block, "Y3", Blockly.Python.ORDER_ATOMIC)

        var code = `oled_module.draw_triangle_fill(${x1}, ${y1}, ${x2}, ${y2}, ${x3}, ${y3})\n`;
        return code
    }
    Blockly.Python[`${board}_displayScroll`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        var x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)


        var code = `oled_module.scroll(${x}, ${y})\n`;
        return code
    }
    Blockly.Python[`${board}_menu_displayLine`] = function (block) {
        var text = block.getFieldValue("displayLine");
        return [text, Blockly.Python.ORDER_ATOMIC]
    }

    Blockly.Python[`${board}_displayShow`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        return `oled_module.show()\n`;
    }
    Blockly.Python[`${board}_displayClean`] = function (block) {
        Blockly.Python.definitions_['make_oled'] = 'oled_module = OLED(3)';
        return `oled_module.clear()\n`;
    }
}