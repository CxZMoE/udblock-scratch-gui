//udblockCameraB_doColorDectection
export default (Blockly) => {
    // 菜单
    Blockly.Python['udblockCameraB_menu_actions'] = function (block) {
        var action = block.getFieldValue("actions");
        return [`${action}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['udblockCameraB_menu_color'] = function (block) {
        var color = block.getFieldValue("color");
        return [`${color}`, Blockly.Python.ORDER_ATOMIC]
    }


    Blockly.Python['udblockCameraB_initCamera'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        var port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC) 
        var code = `myCamara = Camera(${port})\n`;
        return code;
    };
    Blockly.Python['udblockCameraB_doFaceDectection'] = function (block) {
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
    Blockly.Python['udblockCameraB_doObjectDectection'] = function (block) {
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
    Blockly.Python['udblockCameraB_doImageDectection'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var action = Blockly.Python.valueToCode(block, "ACTION", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        if (action == "START"){
            code =`myCamara.start_image()\n`;
        }else if (action == "SWITCH"){
            code = `myCamara.switch_image()\n`;
        }

        return code;
    };
    Blockly.Python['udblockCameraB_doQrcodeDectection'] = function (block) {
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
    Blockly.Python['udblockCameraB_doColorDectection'] = function (block) {
        Blockly.Python.definitions_['import_carmera'] = 'from camerab import Camera';
        
        var action = Blockly.Python.valueToCode(block, "ACTION", Blockly.Python.ORDER_ATOMIC)
        var color = Blockly.Python.valueToCode(block, "COLOR", Blockly.Python.ORDER_ATOMIC)
        var code = ''
        if (action == "START"){
            code =`myCamara.start_color(${color})\n`;
        }else if (action == "SWITCH"){
            code = `myCamara.switch_color(${color})\n`;
        }

        return code;
    };
    // 菜单
    Blockly.Python["udblockCameraB_menu_RJMenu"] = function (block) {
        return [block.getFieldValue("RJMenu"), Blockly.Python.ORDER_ATOMIC]
    }
}