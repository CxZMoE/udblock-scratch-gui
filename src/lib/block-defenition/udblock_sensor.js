function loadSensorDefinition(board = "") {
    console.log(board)
    // 读取风速传感器
    Blockly.Python[`${board}_readWindSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var adcPin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetWindSpeed(${adcPin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    Blockly.Python[`${board}_readRainDropSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetRainDrop(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readSoundSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetMicrophone(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readPyroelecticSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var threhold = Blockly.Python.valueToCode(block, "THREHOLD", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetPyroelectricResult(${pin}, threhold=${threhold})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readSmartGrayscaleSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetSmartGrayscale(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readColorSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var select = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);
        var code;
        if (select == "-1") {
            code = `udpi_sensor.GetColorDetector()`
        } else {
            code = `udpi_sensor.GetColorDetector()[${select}]`
        }
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_getColorSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var select = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetColorDetector('${select}')`
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_detectColorSensorColor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
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

        code += `${functionName}(udpi_sensor.GetColorDetector(), ${color})`
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python[`${board}_readAmbientLightSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetAmbientLight(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readSonicSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';

        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);

        var ps = String(port).split(",")
        var echo_pin = ps[0]
        var trig_pin = ps[1]

        var code = `udpi_sensor.GetSonicDistance(${trig_pin},${echo_pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readRouteFindingSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetRouteFinder(${parseInt(pin)})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readFlameSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetFlameSensor(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readFlameSensoADC`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetFlameSensorADC(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readGrayScaleSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetAnalogGrayScale(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readSmokeSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetSmoke(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readDirtHumiditySensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetDirtHuminity(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readDSTempSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetDSTempSensor(${String(pin).split(',')[1]})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readDHT11Temp`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetDHT11Temp(${String(pin).split(',')[1]})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readDHT11Humidity`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetDHT11Humidity(${String(pin).split(',')[1]})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readFourChannelInferredSensor`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var status = Blockly.Python.valueToCode(block, "STATUS", Blockly.Python.ORDER_ATOMIC);
        var code = `udpi_sensor.GetFourChannelInferredSensor(${status})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readFourChannelInferredSensorOffset`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.GetFourChannelIFSensorOffset()`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readFourChannelInferredSensorDirectionRight`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.GetFourChannelIFDirection('r')`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readFourChannelInferredSensorDirectionLeft`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.GetFourChannelIFDirection('l')`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    
    Blockly.Python[`${board}_readKeyboardModuleValue`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var code = `udpi_sensor.GetKeyboardModule()`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    
    // Blockly.Python[`${board}_initNFC`] = function (block) {
    //     Blockly.Python.definitions_['import_sensor_nfc'] = 'from udrobot.sensor.nfc import NFC';
    //     var code = `nfcSensor = NFC()\n`;
    //     return code;
    // };
    Blockly.Python[`${board}_startPolling`] = function (block) {
        Blockly.Python.definitions_['import_sensor_nfc'] = 'from udrobot.sensor.nfc import NFC';
        Blockly.Python.definitions_['import_init_nfc'] = 'nfcSensor = NFC()';
        var code = `nfcSensor.Start()\n`;
        return code;
    };
    Blockly.Python[`${board}_stopPolling`] = function (block) {
        Blockly.Python.definitions_['import_sensor_nfc'] = 'from udrobot.sensor.nfc import NFC';
        var code = `nfcSensor.Stop()\n`;
        return code;
    };
    Blockly.Python[`${board}_getUID`] = function (block) {
        Blockly.Python.definitions_['import_sensor_nfc'] = 'from udrobot.sensor.nfc import NFC';
        Blockly.Python.definitions_['import_init_nfc'] = 'nfcSensor = NFC()';
        var code = `nfcSensor.GetUID()`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_readText`] = function (block) {
        Blockly.Python.definitions_['import_sensor_nfc'] = 'from udrobot.sensor.nfc import NFC';
        Blockly.Python.definitions_['import_init_nfc'] = 'nfcSensor = NFC()';
        var code = `nfcSensor.ReadText()`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_writeText`] = function (block) {
        Blockly.Python.definitions_['import_sensor_nfc'] = 'from udrobot.sensor.nfc import NFC';
        Blockly.Python.definitions_['import_init_nfc'] = 'nfcSensor = NFC()';
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC);
        var code = `nfcSensor.WriteText(${text})\n`;
        return code;
    };
    
    
    /* 读传感器结束 */
}

module.exports = loadSensorDefinition;