export default (Blockly) => {
    // 菜单
    Blockly.Python["udblockEXTBCar_menu_RJMenu"] = function (block) {
        return [block.getFieldValue("RJMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockEXTBCar_menu_actions'] = function (block) {
        var action = block.getFieldValue("actions");
        return [`${action}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockEXTBCar_menu_color'] = function (block) {
        var color = block.getFieldValue("color");
        return [`${color}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockEXTBCar_menu_imageMethods'] = function (block) {
        var imageMethod = block.getFieldValue("imageMethods");
        return [`${imageMethod}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_colorResult"] = function (block) {
        return [block.getFieldValue("colorResult"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_faceModes"] = function (block) {
        return [block.getFieldValue("faceModes"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_servoMenu"] = function (block) {
        return [block.getFieldValue("servoMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_RJADCMenu"] = function (block) {
        return [block.getFieldValue("RJADCMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_RJDigiMenu"] = function (block) {
        return [block.getFieldValue("RJDigiMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_colorDetectMenu"] = function (block) {
        return [block.getFieldValue("colorDetectMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_colorDetectResultMenu"] = function (block) {
        return [block.getFieldValue("colorDetectResultMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_digitalDisplayIntensityMenu"] = function (block) {
        return [block.getFieldValue("digitalDisplayIntensityMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_faceMenu"] = function (block) {
        return [block.getFieldValue("faceMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_faceColorMenu"] = function (block) {
        return [block.getFieldValue("faceColorMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_inferedIndexMenu"] = function (block) {
        return [block.getFieldValue("inferedIndexMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBCar_menu_inferedDirectionMenu"] = function (block) {
        return [block.getFieldValue("inferedDirectionMenu"), Blockly.Python.ORDER_ATOMIC]
    }


    Blockly.Python['udblockEXTBCar_moveForward'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.forward(${speed})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBCar_moveBack'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.back(${speed})\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_turnLeft'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.turnLeft(${speed})\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_turnRight'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.turnRight(${speed})\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_shiftLeft'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.shiftLeft(${speed})\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_shiftRight'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPEED", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.shiftRight(${speed})\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_stopCar'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.stop()\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_startServer'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var ssid = Blockly.Python.valueToCode(block, "SSID", Blockly.Python.ORDER_ATOMIC);
        var psk = Blockly.Python.valueToCode(block, "PSK", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.startServer(${ssid},${psk})\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_stopServer'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.stopServer()\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_servoTurn'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var degree = Blockly.Python.valueToCode(block, "DEGREE", Blockly.Python.ORDER_ATOMIC);
        var index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.servoTurn(${index},${degree})\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_startRouteFront'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.findRoute(0x01,${speed})\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_startRouteBack'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var speed = Blockly.Python.valueToCode(block, "SPD", Blockly.Python.ORDER_ATOMIC);
        var code = `myCar.findRoute(0x02,${speed})\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_startRoute'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.startRoute()\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_endRoute'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.endRoute()\n`;
        return code
    };
    Blockly.Python['udblockEXTBCar_getFrontInferredValueIndex'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC);
        var code = `(myCar.GetInfredValueByIndex("front", ${index}))`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python['udblockEXTBCar_getBackInferredValueIndex'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC);
        var code = `(myCar.GetInfredValueByIndex("back", ${index}))`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python['udblockEXTBCar_getInferredDirection'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var direction = Blockly.Python.valueToCode(block, "DIRECTION", Blockly.Python.ORDER_ATOMIC);
        var code = `(myCar.GetDirectionUpon("${direction}"))`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python['udblockEXTBCar_getCross'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `(myCar.GetCarIsInferredCross())`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python['udblockEXTBCar_getForwardSpd'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.GetCarForwardSpeed()`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python['udblockEXTBCar_getBackwardSpd'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.GetCarBackwardSpeed()`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python['udblockEXTBCar_getLeftSpd'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.GetCarLeftTurnSpeed()`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };
    Blockly.Python['udblockEXTBCar_getRightSpd'] = function (block) {
        Blockly.Python.definitions_['import_car'] = 'from car import Car';
        Blockly.Python.definitions_['get_car'] = 'myCar = Car()';
        var code = `myCar.GetCarRightTurnSpeed()`;
        return [code, Blockly.Python.ORDER_ATOMIC]
    };

    /* 摄像头 */
    


    Blockly.Python['udblockEXTBCar_initCamera'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC)
        var code = `myCamara = Camera(${port})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBCar_doFaceDectection'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var action = Blockly.Python.valueToCode(block, "ACTION", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        if (action == "START"){
            code =`myCamara.start_face()\n`;
        }else if (action == "SWITCH"){
            code = `myCamara.switch_face()\n`;
        }

        return code;
    };
    Blockly.Python['udblockEXTBCar_doObjectDectection'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var action = Blockly.Python.valueToCode(block, "ACTION", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        if (action == "START"){
            code =`myCamara.start_object()\n`;
        }else if (action == "SWITCH"){
            code = `myCamara.switch_object()\n`;
        }

        return code;
    };
    Blockly.Python['udblockEXTBCar_doModeObjectDectection'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var action = Blockly.Python.valueToCode(block, "ACTION", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        if (action == "START"){
            code =`myCamara.start_selfobject()\n`;
        }else if (action == "SWITCH"){
            code = `myCamara.switch_selfobject()\n`;
        }

        return code;
    };
    
    Blockly.Python['udblockEXTBCar_doImageDectection'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var action = Blockly.Python.valueToCode(block, "ACTION", Blockly.Python.ORDER_ATOMIC)
        var method = Blockly.Python.valueToCode(block, "IMGMETHOD", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        if (action == "START"){
            code =`myCamara.start_image('${method}')\n`;
        }else if (action == "SWITCH"){
            code = `myCamara.switch_image('${method}')\n`;
        }

        return code;
    };
    Blockly.Python['udblockEXTBCar_doQrcodeDectection'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var action = Blockly.Python.valueToCode(block, "ACTION", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        if (action == "START"){
            code =`myCamara.start_qrcode()\n`;
        }else if (action == "SWITCH"){
            code = `myCamara.switch_qrcode()\n`;
        }

        return code;
    };
    Blockly.Python['udblockEXTBCar_doColorDectection'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var action = Blockly.Python.valueToCode(block, "ACTION", Blockly.Python.ORDER_ATOMIC)
        var color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        if (action == "START"){
            code =`myCamara.start_color('${color}')\n`;
        }else if (action == "SWITCH"){
            code = `myCamara.switch_color('${color}')\n`;
        }

        return code;
    };
    Blockly.Python['udblockEXTBCar_doCross'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.doCross()\n`;

        return code
    };
    Blockly.Python['udblockEXTBCar_getColorDectectionResult'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var result = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.GetColorPosition()[${result}]`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_getFaceDectectionResult'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.GetIsFace()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_getQrcodeString'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.GetQrcodeStr()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_getObjectDectectionResult'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var code = ''
        code = `myCamara.GetObjectResult()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_getModeObjectDectectionResult'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.GetSelfLearningResult()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_getCrossCount'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var result = Blockly.Python.valueToCode(block, "FVALUE", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.GetCrossCount(${result})`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_getCrossPixel'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var result = Blockly.Python.valueToCode(block, "FVALUE", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.GetIsCrossing(${result})`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_addFace'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.AddFace(${name})\n`;

        return code;
    };
    Blockly.Python['udblockEXTBCar_delFace'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.DelFace(${name})\n`;

        return code;
    };
    Blockly.Python['udblockEXTBCar_delAllFace'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
    
        var code = ''
        code = `myCamara.DelAllFace()\n`;

        return code;
    };
    Blockly.Python['udblockEXTBCar_switchMode'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var mode = Blockly.Python.valueToCode(block, "MODE", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.ChangeMode("${mode}")\n`;

        return code;
    };

    
    // 检测按键按下
    Blockly.Python["udblockEXTBCar_readTouchPressed"] = function (block) {

        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC);
        var code = `(sensor.GetTouch(${pin}) < 280)`
        return [code, Blockly.Python.ORDER_ATOMIC];
    }

    // 读取风速传感器
    Blockly.Python["udblockEXTBCar_readWindSensor"] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var adcPin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetWindSpeed(${adcPin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    Blockly.Python['udblockEXTBCar_readRainDropSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetRainDrop(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_readSoundSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetMicrophone(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_readSmartGrayscaleSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetSmartGrayscale(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_readColorSensor'] = function (block) {
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
    Blockly.Python['udblockEXTBCar_detectColorSensorColor'] = function (block) {
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

    Blockly.Python['udblockEXTBCar_readAmbientLightSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetAmbientLight(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_readSonicSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';

        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);

        var ps = String(port).split(",")
        var echo_pin = ps[0]
        var trig_pin = ps[1]

        var code = `sensor.GetSonicDistance(${trig_pin},${echo_pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_readRouteFindingSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetRouteFinder(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_readGrayScaleSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetAnalogGrayScale(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_readSmokeSensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetSmoke(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBCar_readDirtHumiditySensor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var code = `sensor.GetDirtHuminity(${pin})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    /* 读传感器结束 */

    /* 执行器开始 */
    Blockly.Python['udblockEXTBCar_'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';

        return `fdd = FourDigitDisplay(i2c)\n`;

    }
    Blockly.Python['udblockEXTBCar_digitalDisplayShow'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(i2c)';
        var num = Blockly.Python.valueToCode(block, 'NUM', Blockly.Python.ORDER_ATOMIC)
        return `fdd.shownum(${num})\n`;
    }
    Blockly.Python['udblockEXTBCar_digitalDisplayClear'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(i2c)';
        return `fdd.clear()\n`;
    }
    Blockly.Python['udblockEXTBCar_digitalDisplayOpen'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(i2c)';
        return `fdd.on()\n`;
    }
    Blockly.Python['udblockEXTBCar_digitalDisplayClose'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(i2c)';
        return `fdd.off()\n`;
    }


    Blockly.Python['udblockEXTBCar_digitalDisplayIntensity'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        Blockly.Python.definitions_['use_tm1650'] = 'fdd = FourDigitDisplay(i2c)';
        var intensity = Blockly.Python.valueToCode(block, "VALUE", Blockly.Python.ORDER_ATOMIC);
        return `fdd.intensity(${intensity})\n`;
    }

    // 灯带
    Blockly.Python['udblockEXTBCar_openRGBStrip'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        var rgb_count = Blockly.Python.valueToCode(block, "COUNT", Blockly.Python.ORDER_ATOMIC)
        if (!rgb_count) {
            return `rgb_light_${rgb_pin} = RGB(${rgb_pin}, 15)\n`;
        }
        return `rgb_light_${rgb_pin} = RGB(${rgb_pin}, ${rgb_count})\n`;
    }
    Blockly.Python['udblockEXTBCar_setRGBStripLuminance'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        var rgb_intensity = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.intensity(${rgb_intensity})\n`;
    }
    Blockly.Python['udblockEXTBCar_setRGBStripIndexColor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        var rgb_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var rgb_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.value(${rgb_index}, ${rgb_color})\n`;
    }

    Blockly.Python['udblockEXTBCar_setRGBStripIndexOnlyColor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        var rgb_index = Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)
        var rgb_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.switch_singal(${rgb_index}, ${rgb_color})\n`;
    }

    Blockly.Python['udblockEXTBCar_setRGBStripClear'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var rgb_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        var rgb_color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        return `rgb_light_${rgb_pin}.clear((${rgb_color}))\n`;
    }
    // 继电器
    Blockly.Python['udblockEXTBCar_openReplay'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_${relay_pin} = Relay(${relay_pin})`;

        return `relay_control_${relay_pin}.on()\n`;
    }
    Blockly.Python['udblockEXTBCar_closeReplay'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_${relay_pin} = Relay(${relay_pin})`;
        return `relay_control_${relay_pin}.off()\n`;
    }
    Blockly.Python['udblockEXTBCar_switchReplay'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var relay_pin = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC).split(",")[1];
        Blockly.Python.definitions_[`relay_pin_${relay_pin}`] = `relay_control_${relay_pin} = Relay(${relay_pin})`;
        return `relay_control_${relay_pin}.toggle()\n`;
    }

    // 电机
    Blockly.Python['udblockEXTBCar_turnMotorClock'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
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
    Blockly.Python['udblockEXTBCar_turnMotorAnticlock'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
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
    Blockly.Python['udblockEXTBCar_closeMotor'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
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
    Blockly.Python['udblockEXTBCar_turnServoDegree'] = function (block) {

        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        Blockly.Python.definitions_[`servo_${port}`] = `myServo${port} = Servo(${port})`;
        var angle = Math.abs(Blockly.Python.valueToCode(block, "DEGREE", Blockly.Python.ORDER_ATOMIC))
        if (angle > 180) {
            angle = 180;
        }
        return `myServo${port}.turn(${angle})\n`;
    }

    // 表情面板
    Blockly.Python['udblockEXTBCar_setFacePanelPreset'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var face = Blockly.Python.valueToCode(block, "FACE", Blockly.Python.ORDER_ATOMIC);
        var color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC);
        return `express_panel_do(i2c, ${face}, color=${color})\n`;
    }
    Blockly.Python['udblockEXTBCar_setFacePanelCustomized'] = function (block) {
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