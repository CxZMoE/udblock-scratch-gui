import { c } from "bowser";
import { extb_mf } from "../../../../udblock-scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from "./udblock_camera";
import loadSensorDefinition from "./udblock_sensor";

const id = extb_mf.id

// udblockMicrobit_menu_buttons


export default (Blockly) => {
    // 打印
    Blockly.Python['udblockMicrobit_print'] = function(block){
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)
        return 'print(' + text + ')\n';
    }
    // 检测按键按下
    Blockly.Python["udblockMicrobit_microbitStart"] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        return '';
    }

    Blockly.Python[`udblockMicrobit_menu_buttons`] = function (block) {
        var buttons = block.getFieldValue("buttons");
        return [`${buttons}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`udblockMicrobit_menu_ports`] = function (block) {
        var ports = block.getFieldValue("ports");
        return [`${ports}`, Blockly.Python.ORDER_ATOMIC]
    }

    Blockly.Python["udblockMicrobit_microbitBtnPressed"] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        Blockly.Python.definitions_['btn_callbacks'] = 'btn_callbacks = []';
        Blockly.Python.hasBtnCallback = true
        Blockly.Python.Callbacks['delete_' + block.id] = function(){
            // console.log("删除按钮方块循环")
            Blockly.Python.hasBtnCallback = false
        }

        var btn = Blockly.Python.valueToCode(block, "BTN", Blockly.Python.ORDER_ATOMIC)
        var statements = Blockly.Python.statementToCode(block, 'SUBSTACK')
        var codeInit = `# 按钮${btn}点击事件\n`
        codeInit += 'def ' + `On${btn}PressedFunc` + '():\n'+
                    `  if ${btn}.was_pressed():\n  `
        
        codeInit += statements.split('\n').join('\n  ')
        codeInit += `\nbtn_callbacks.append(On${btn}PressedFunc)`
        Blockly.Python.definitions_[`btn_binding_${btn}`] = codeInit;

        // ----------------
        return '';
    }
    Blockly.Python[`udblockMicrobit_playMusicPreset`] = function (block) {
        Blockly.Python.definitions_['import_microbit_music'] = 'import music';
        Blockly.Python[`udblockMicrobit_menu_music_preset`] = function (block) {
            var music_preset = block.getFieldValue("music_preset");
            return [`${music_preset}`, Blockly.Python.ORDER_ATOMIC]
        }
        var music_preset = Blockly.Python.valueToCode(block, "MUSIC", Blockly.Python.ORDER_ATOMIC)
        return `music.play(music.${music_preset})\n`
    }

    Blockly.Python[`udblockMicrobit_diaplayShowString`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';

        Blockly.Python[`udblockMicrobit_menu_builtin_images`] = function (block) {
            var builtin_images = block.getFieldValue("builtin_images");
            return [`${builtin_images}`, Blockly.Python.ORDER_ATOMIC]
        }
        var image_name = String(Blockly.Python.valueToCode(block, "IMAGENAME", Blockly.Python.ORDER_ATOMIC))
        var targetBlock = block.getInputTargetBlock('IMAGE');
        if (targetBlock != null){
            targetBlock.getField("MATRIX").setValue(image_name)
        }
        
        var code = `display.show(Image('`
        for (var i=0;i<5;i++){
            for (var j=0;j<5;j++){
                var c = image_name.charAt(i*5 + j)
                code += (c=='1')?'9':'0'
            }
            if (i != 4){
                code += ':'
            }
        }
        
        return code + '\'))\n'
    }

    Blockly.Python[`udblockMicrobit_displayShowProfile`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var image = String(Blockly.Python.valueToCode(block, "IMAGE", Blockly.Python.ORDER_ATOMIC))
        image = image.substr(1, image.length-1)
        
        var code = `display.show(Image('`
        for (var i=0;i<5;i++){
            for (var j=0;j<5;j++){
                var c = image.charAt(i*5 + j)
                code += (c=='1')?'9':'0'
            }
            if (i != 4){
                code += ':'
            }
        }
        
        return code + '\'))\n'
    }
    Blockly.Python[`udblockMicrobit_displayShowTextScroll`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var text = String(Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC))
        
        var code = `display.scroll(${text})\n`
        return code
    }

    Blockly.Python[`udblockMicrobit_displayGetPixel`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var y = SBlockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)
        var code = `display.get_pixel(${x}, ${y})`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }

    Blockly.Python[`udblockMicrobit_displaySetPixel`] = function (block) {
        Blockly.Python[`udblockMicrobit_menu_display_brightness`] = function (block) {
            var display_brightness = block.getFieldValue("display_brightness");
            return [`${display_brightness}`, Blockly.Python.ORDER_ATOMIC]
        }
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var x = Blockly.Python.valueToCode(block, "X", Blockly.Python.ORDER_ATOMIC)
        var y = Blockly.Python.valueToCode(block, "Y", Blockly.Python.ORDER_ATOMIC)
        var brightness = Blockly.Python.valueToCode(block, "BRIGHTNESS", Blockly.Python.ORDER_ATOMIC)
        var code = `display.set_pixel(${x}, ${y}, ${brightness})\n`
        return code
    }

    Blockly.Python[`udblockMicrobit_displayClear`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var code = `display.clear()\n`
        return code
    }

    Blockly.Python[`udblockMicrobit_displayOn`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var code = `display.on()\n`
        return code
    }

    Blockly.Python[`udblockMicrobit_displayOff`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var code = `display.off()\n`
        return code
    }
    Blockly.Python[`udblockMicrobit_displayIsOn`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var code = `display.is_on()\n`
        return code
    }

    // 无线电
    Blockly.Python[`udblockMicrobit_radioOn`] = function (block) {
        Blockly.Python.definitions_['import_microbit_radio'] = 'import radio';
        var code = `radio.on()\n`
        return code
    }

    Blockly.Python[`udblockMicrobit_radioOff`] = function (block) {
        Blockly.Python.definitions_['import_microbit_radio'] = 'import radio';
        var code = `radio.off()\n`
        return code
    }

    Blockly.Python[`udblockMicrobit_radioSetChannel`] = function (block) {
        Blockly.Python.definitions_['import_microbit_radio'] = 'import radio';
        var channel = Blockly.Python.valueToCode(block, 'CHANNEL', Blockly.Python.ORDER_ATOMIC)
        var code = `radio.config(channel=${channel})\n`
        return code
    }

    Blockly.Python[`udblockMicrobit_radioReveive`] = function (block) {
        Blockly.Python.definitions_['import_microbit_radio'] = 'import radio';
        var code = `radio.receive()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }

    Blockly.Python[`udblockMicrobit_radioSend`] = function (block) {
        Blockly.Python.definitions_['import_microbit_radio'] = 'import radio';
        var msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC)
        var code = `radio.send(${msg})\n`
        return code
    }

    // 加速度计
    Blockly.Python[`udblockMicrobit_accGetX`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var code = `accelerometer.get_x()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`udblockMicrobit_accGetY`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var code = `accelerometer.get_y()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`udblockMicrobit_accGetZ`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var code = `accelerometer.get_z()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`udblockMicrobit_accGetAll`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var code = `accelerometer.get_values()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`udblockMicrobit_accCurrentGesture`] = function (block) {
        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var code = `accelerometer.current_gesture()`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`udblockMicrobit_accIsGesture`] = function (block) {
        Blockly.Python[`udblockMicrobit_menu_gesture`] = function (block) {
            var gesture = block.getFieldValue("gesture");
            return [`${gesture}`, Blockly.Python.ORDER_ATOMIC]
        }

        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var gesture = Blockly.Python.valueToCode(block, 'GESTURE', Blockly.Python.ORDER_ATOMIC)
        var code = `accelerometer.is_gesture('${gesture}')`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`udblockMicrobit_accWasGesture`] = function (block) {
        Blockly.Python[`udblockMicrobit_menu_gesture`] = function (block) {
            var gesture = block.getFieldValue("gesture");
            return [`${gesture}`, Blockly.Python.ORDER_ATOMIC]
        }

        Blockly.Python.definitions_['import_microbit'] = 'from microbit import *';
        var gesture = Blockly.Python.valueToCode(block, 'GESTURE', Blockly.Python.ORDER_ATOMIC)
        var code = `accelerometer.was_gesture('${gesture}')`
        return [code, Blockly.Python.ORDER_ATOMIC]
    }

    
}