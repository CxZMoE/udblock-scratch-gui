export default (Blockly) => {
    Blockly.Python["udblockEXTBIO_menu_touchMenu"] = function (block) {
        return [block.getFieldValue("touchMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBIO_menu_RJMenu"] = function (block) {
        return [block.getFieldValue("RJMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBIO_menu_RJADCMenu"] = function (block) {
        return [block.getFieldValue("RJADCMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBIO_menu_RJDigiMenu"] = function (block) {
        return [block.getFieldValue("RJDigiMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBIO_menu_colorDetectMenu"] = function (block) {
        return [block.getFieldValue("colorDetectMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBIO_menu_colorDetectResultMenu"] = function (block) {
        return [block.getFieldValue("colorDetectResultMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBIO_menu_digitalDisplayIntensityMenu"] = function (block) {
        return [block.getFieldValue("digitalDisplayIntensityMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBIO_menu_faceMenu"] = function (block) {
        return [block.getFieldValue("faceMenu"), Blockly.Python.ORDER_ATOMIC]
    }

    // 读取风速传感器
    Blockly.Python["udblockEXTBIO_readWindSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var adcPin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetWindSpeed(${adcPin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    Blockly.Python['udblockEXTBIO_readRainDropSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetRainDrop(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIO_readSoundSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetMicrophone(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIO_readSmartGrayscaleSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetSmartGrayscale(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIO_readColorSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var select = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);
        var code;
        if (select == "-1") {
            code = `sensor.GetColorDetector()`
        } else {
            code = `sensor.GetColorDetector()[${select}]`
        }
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIO_detectColorSensorColor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);
        var code = "";
        var functionName = Blockly.Python.provideFunction_(
            'checkSensorColor',
            ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(sensor_color, cmp_color):',
                '  if(cmp_color[0] == 0 and cmp_color[1] == 0 and cmp_color[2] == 0):',    // 判断黑色
                '    if (max(sensor_color) == 0):',
                '      return True',
                '    else:',
                '      return False',
                '  elif(cmp_color[0] == 1 and cmp_color[1] == 1 and cmp_color[2] == 1):',  // 判断白色
                '    if(abs(sensor_color[0] - sensor_color[1])<15 and abs(sensor_color[0] - sensor_color[2])<15 and abs(sensor_color[1] - sensor_color[2])<15):',
                '      return True',
                '    else:',
                '      return False',
                '  elif(cmp_color[0] == 1 and cmp_color[1] == 1 and cmp_color[2] <10):',   // 判断黄色
                '    if(sensor_color[0] == sensor_color[1] and sensor_color[2] < 15):',
                '      return True',
                '    else:',
                '      return False',
                '  elif(cmp_color[0] == 1 and cmp_color[1] == 0 and cmp_color[2] == 1):',   // 判断紫色
                '    if(sensor_color[0] == sensor_color[2] and sensor_color[1] < 15):',
                '      return True',
                '    else:',
                '      return False',
                '  elif(cmp_color[0] == 0 and cmp_color[1] == 1 and cmp_color[2] == 1):',   // 判断天蓝色
                '    if(sensor_color[1] == sensor_color[2] and sensor_color[0] < 15):',
                '      return True',
                '    else:',
                '      return False',
                '  elif(cmp_color[0] == 1 and cmp_color[1] == 0 and cmp_color[2] == 0):',   // 判断红色
                '    if(sensor_color.index(max(sensor_color)) == 0 and sensor_color[1] < sensor_color[0] * 0.3):',
                '      return True',
                '    else:',
                '      return False',
                '  elif(cmp_color[0] == 0 and cmp_color[1] == 1 and cmp_color[2] == 0):',   // 判断绿色
                '    if(sensor_color.index(max(sensor_color)) == 1 and sensor_color[0] < sensor_color[1] * 0.3):',
                '      return True',
                '    else:',
                '      return False',
                '  elif(cmp_color[0] == 0 and cmp_color[1] == 0 and cmp_color[2] == 1):',   // 判断蓝色
                '    if(sensor_color.index(max(sensor_color)) == 2 and sensor_color[0] < sensor_color[2] * 0.3):',
                '      return True',
                '    else:',
                '      return False',
                '  else:',
                '    return False']);

        code += `${functionName}(sensor.GetColorDetector(), ${color})`
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['udblockEXTBIO_readAmbientLightSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetAmbientLight(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIO_readSonicSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';

        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);

        var ps = String(port).split(",")
        var echo_pin = ps[0]
        var trig_pin = ps[1]

        var code = `sensor.GetSonicDistance(${trig_pin},${echo_pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIO_readRouteFindingSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetRouteFinder(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIO_readGrayScaleSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetAnalogGrayScale(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIO_readSmokeSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetSmoke(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIO_readDirtHumiditySensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetDirtHuminity(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    /* 读传感器结束 */

    /* 执行器开始 */
    Blockly.Python['udblockEXTBIO_'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';

        return `fdd = FourDigitDisplay(i2c)\n`;

    }
    Blockly.Python['udblockEXTBIO_digitalDisplayShow'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(i2c)';
        var num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC)
        return `fdd.shownum(${num})\n`;
    }
    Blockly.Python['udblockEXTBIO_digitalDisplayClear'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(i2c)';
        return `fdd.clear()\n`;
    }
    Blockly.Python['udblockEXTBIO_digitalDisplayOpen'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(i2c)';
        return `fdd.on()\n`;
    }
    Blockly.Python['udblockEXTBIO_digitalDisplayClose'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(i2c)';
        return `fdd.off()\n`;
    }


    Blockly.Python['udblockEXTBIO_digitalDisplayIntensity'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(i2c)';
        var intensity = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC);
        return `fdd.intensity(${intensity})\n`;
    }

    // 灯带
    Blockly.Python['udblockEXTBIO_openRGBStrip'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var rgb_count = Blockly.Python.valueToCode(block, "COUNT", Blockly.Python.ORDER_ATOMIC)
        if (!rgb_count) {
            return `rgb_light_${rgb_pin} = RGB(${rgb_pin}, 15)\n`;
        }
        return `rgb_light_${rgb_pin} = RGB(${rgb_pin}, ${rgb_count})\n`;
    }
    Blockly.Python['udblockEXTBIO_setRGBStripLuminance'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var rgb_intensity = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.intensity(${rgb_intensity})\n`;
    }
    Blockly.Python['udblockEXTBIO_setRGBStripIndexColor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var rgb_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var rgb_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.value(${rgb_index}, ${rgb_color})\n`;
    }

    Blockly.Python['udblockEXTBIO_setRGBStripIndexOnlyColor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var rgb_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var rgb_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.switch_singal(${rgb_index}, ${rgb_color})\n`;
    }

    Blockly.Python['udblockEXTBIO_setRGBStripClear'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var rgb_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.clear((${rgb_color}))\n`;
    }
    // 继电器
    Blockly.Python['udblockEXTBIO_openReplay'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_${relay_pin} = Relay(${relay_pin})`;

        return `relay_control_${relay_pin}.on()\n`;
    }
    Blockly.Python['udblockEXTBIO_closeReplay'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_${relay_pin} = Relay(${relay_pin})`;
        return `relay_control_${relay_pin}.off()\n`;
    }
    Blockly.Python['udblockEXTBIO_switchReplay'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_${relay_pin} = Relay(${relay_pin})`;
        return `relay_control_${relay_pin}.toggle()\n`;
    }


    // 表情面板
    Blockly.Python['udblockEXTBIO_setFacePanelPreset'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var face = Blockly.Python.valueToCode(block, "FACE", Blockly.Python.ORDER_ATOMIC);
        var color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);
        return `express_panel_do(i2c, ${face}, color=${color})\n`;
    }
    Blockly.Python['udblockEXTBIO_setFacePanelCustomized'] = function (block) {
        var color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);

        var getPixelArray = function(box){
            //console.log(box.length)
            var output = []
            for (var i=0;i<16;i++){
                var linePixel = []
                for(var j=i*8;j<i*8+8;j++){
                    if (String(box[j]) == "1"){
                        linePixel.push(JSON.parse(color
                            .replace(/\(/g, '[')
                            .replace(/\)/g, ']')
                          ))
                    }else{
                        linePixel.push((0,0,0))
                    }
                }
                output.push(linePixel)
            }
            //console.log(output)
        
            var output2 = []
            // R
            for (var i=0;i<output.length;i++){
                var linePixel = output[i]
                var lineHex = 0x00
                for (var j=0;j<linePixel.length;j++){
                    if (linePixel[j][0] > 100){
                        lineHex |= 0x80 >> j
                    }
                }
                output2.push(lineHex)
            }
            // B
            for (var i=0;i<output.length;i++){
                var linePixel = output[i]
                var lineHex = 0x00
                for (var j=0;j<linePixel.length;j++){
                    if (linePixel[j][2] > 100){
                        lineHex |= 0x80 >> j
                    }
                }
                output2.push(lineHex)
            }
            // G
            for (var i=0;i<output.length;i++){
                var linePixel = output[i]
                var lineHex = 0x00
                for (var j=0;j<linePixel.length;j++){
                    if (linePixel[j][1] > 100){
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
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var action = Blockly.Python.valueToCode(block, "FACE", Blockly.Python.ORDER_ATOMIC);
        
        
        

        return `express_panel_do(i2c, ${getPixelArray(action)}, mode=FACE_MODE_DIY)\n`;
        // 每种颜色16行，每行8个， 行用16进制表示即： 0x00
        //                          R                                  B                                   G
        //bytearray([0x02,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0//,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0//,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
    }
}