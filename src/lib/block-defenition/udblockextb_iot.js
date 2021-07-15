export default (Blockly) => {
    
    Blockly.Python['udblockEXTBIOT_startSST'] = function (block) {
        var code = `\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_endSST'] = function (block) {
        var code = `\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_startTTS'] = function (block) {
        var code = `\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_endTTS'] = function (block) {
        var code = `\n`;
        return code;
    };
    

    /* 摄像头 */
    // 菜单
    Blockly.Python["udblockEXTBIOT_menu_RJMenu"] = function (block) {
        return [block.getFieldValue("RJMenu"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockEXTBIOT_menu_actions'] = function (block) {
        var action = block.getFieldValue("actions");
        return [`${action}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockEXTBIOT_menu_color'] = function (block) {
        var color = block.getFieldValue("color");
        return [`${color}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockEXTBIOT_menu_imageMethods'] = function (block) {
        var imageMethod = block.getFieldValue("imageMethods");
        return [`${imageMethod}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBIOT_menu_colorResult"] = function (block) {
        return [block.getFieldValue("colorResult"), Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python["udblockEXTBIOT_menu_faceModes"] = function (block) {
        return [block.getFieldValue("faceModes"), Blockly.Python.ORDER_ATOMIC]
    }


    Blockly.Python['udblockEXTBIOT_initCamera'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC)
        var code = `myCamara = Camera(${port})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_doFaceDectection'] = function (block) {
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
    Blockly.Python['udblockEXTBIOT_doObjectDectection'] = function (block) {
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
    Blockly.Python['udblockEXTBIOT_doModeObjectDectection'] = function (block) {
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
    Blockly.Python['udblockEXTBIOT_doImageDectection'] = function (block) {
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
    Blockly.Python['udblockEXTBIOT_doQrcodeDectection'] = function (block) {
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
    Blockly.Python['udblockEXTBIOT_doColorDectection'] = function (block) {
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
    Blockly.Python['udblockEXTBIOT_getColorDectectionResult'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var result = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.GetColorPosition()[${result}]`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_getFaceDectectionResult'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.GetIsFace()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_getQrcodeString'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.GetQrcodeStr()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_getObjectDectectionResult'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.GetObjectResult()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_getModeObjectDectectionResult'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.GetSelfLearningResult()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_addFace'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.AddFace(${name})\n`;

        return code;
    };
    Blockly.Python['udblockEXTBIOT_delFace'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.DelFace(${name})\n`;

        return code;
    };
    Blockly.Python['udblockEXTBIOT_delAllFace'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
    
        var code = ''
        code = `myCamara.DelAllFace()\n`;

        return code;
    };
    Blockly.Python['udblockEXTBIOT_switchMode'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var mode = Blockly.Python.valueToCode(block, "MODE", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.ChangeMode("${mode}")\n`;

        return code;
    };
}