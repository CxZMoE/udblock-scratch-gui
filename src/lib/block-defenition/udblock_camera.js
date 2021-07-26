function loadCamaraDefinition(board=""){
    Blockly.Python[`${board}_initCamera`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC)
        var code = `myCamara = Camera(${port})\n`;
        return code;
    };
    Blockly.Python[`${board}_doFaceDectection`] = function (block) {
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
    Blockly.Python[`${board}_doObjectDectection`] = function (block) {
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
    Blockly.Python[`${board}_doModeObjectDectection`] = function (block) {
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
    
    Blockly.Python[`${board}_doImageDectection`] = function (block) {
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
    Blockly.Python[`${board}_doQrcodeDectection`] = function (block) {
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
    Blockly.Python[`${board}_doColorDectection`] = function (block) {
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
    Blockly.Python[`${board}_doCross`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.doCross()\n`;

        return code
    };
    Blockly.Python[`${board}_getColorDectectionResult`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var result = Blockly.Python.valueToCode(block, "RESULT", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.GetColorPosition()[${result}]`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_getFaceDectectionResult`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.GetIsFace()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_getQrcodeString`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.GetQrcodeStr()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_getObjectDectectionResult`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var code = ''
        code = `myCamara.GetObjectResult()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_getModeObjectDectectionResult`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var code = ''
        code = `myCamara.GetSelfLearningResult()`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_getCrossCount`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var result = Blockly.Python.valueToCode(block, "FVALUE", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.GetCrossCount(${result})`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_getCrossPixel`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var result = Blockly.Python.valueToCode(block, "FVALUE", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.GetIsCrossing(${result})`;

        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${board}_addFace`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.AddFace(${name})\n`;

        return code;
    };
    Blockly.Python[`${board}_delFace`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var name = Blockly.Python.valueToCode(block, "NAME", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.DelFace(${name})\n`;

        return code;
    };
    Blockly.Python[`${board}_delAllFace`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
    
        var code = ''
        code = `myCamara.DelAllFace()\n`;

        return code;
    };
    Blockly.Python[`${board}_switchMode`] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var mode = Blockly.Python.valueToCode(block, "MODE", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        code = `myCamara.ChangeMode("${mode}")\n`;

        return code;
    };
}

module.exports = loadCamaraDefinition;