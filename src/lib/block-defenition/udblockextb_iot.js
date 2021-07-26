import { extb_iot } from "../../../../udblock-scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from "./udblock_camera";
import loadSensorDefinition from "./udblock_sensor";

const id = extb_iot.id

export default (Blockly) => {
    // 菜单
    loadMiscMenu(id)
    // 传感器
    loadCamaraDefinition(id)
    loadSensorDefinition(id)
    // 执行器
    loadActionDefinition(id)

    // 功能
    Blockly.Python['udblockEXTBIOT_initAiPlayer'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        var request = new XMLHttpRequest();
        var ip = "127.0.0.1"
        request.open("GET","http://127.0.0.1:3000/myIP",false)
        request.onreadystatechange = function(e){
            if (request.status == 200 && request.readyState == 4){
                ip = request.responseText;
                console.log(ip)
            }
        }
        request.send()
        var code = `aiplayer = AIPlayer('${ip}')\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_startRecording'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        Blockly.Python.definitions_['import_aiplayer'] = 'aiplayer = AIPlayer()';
        var duaration = Blockly.Python.valueToCode(block, "DUARATION", Blockly.Python.ORDER_ATOMIC)
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.Record(${duaration}, ${fname})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_startPlaying'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        Blockly.Python.definitions_['import_aiplayer'] = 'aiplayer = AIPlayer()';
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.Play(${fname})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_getSTTResult'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        Blockly.Python.definitions_['import_aiplayer'] = 'aiplayer = AIPlayer()';

        var code = `aiplayer._stt`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_startSTT'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        Blockly.Python.definitions_['import_aiplayer'] = 'aiplayer = AIPlayer()';
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.SST(${fname})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_startTTS'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        Blockly.Python.definitions_['import_aiplayer'] = 'aiplayer = AIPlayer()';
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.TTS(${text})\n`;
        return code;
    };

}