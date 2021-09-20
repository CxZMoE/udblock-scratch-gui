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
        
        var duaration = Blockly.Python.valueToCode(block, "DUARATION", Blockly.Python.ORDER_ATOMIC)
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.Record(${duaration}, ${fname})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_startPlaying'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.Play(${fname})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_startPlayingAsync'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.Play_BG(${fname})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_getSTTResult'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        

        var code = `aiplayer._stt`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_startSTT'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.STT(${fname})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_startTTS'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.TTS(${text})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_getSTTResultContains'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)

        var code = `(aiplayer.contains(${text}))`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_getSTTResultEquals'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)

        var code = `(aiplayer.equals(${text}))`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_setVolume'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        
        var volume = Blockly.Python.valueToCode(block, "VOL", Blockly.Python.ORDER_ATOMIC)
        if (parseInt(volume) > 100){
            volume = 100;
        }
        if (parseInt(volume) < 0){
            volume = 0;
        }
        //var code = `aiplayer.Volume(${Math.round(((volume)/100)*63)})`;
        var code = `aiplayer.Volume(${volume})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_removeRecord'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        
        var filename = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)
        //var code = `aiplayer.Volume(${Math.round(((volume)/100)*63)})`;
        var code = `aiplayer.RemoveRecord(${filename})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_removeRecordAll'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        
        //var code = `aiplayer.Volume(${Math.round(((volume)/100)*63)})`;
        var code = `aiplayer.RemoveAll()\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_startTTSSave'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)
        var code = `aiplayer.TTS(${text},dst=${fname})\n`;
        return code;
    };

    // 指纹模块
    Blockly.Python['udblockEXTBIOT_initFingerprint'] = function (block) {
        Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import Fingerprint';
        var code = `fingerprintModule = Fingerprint()\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_enableFingerprint'] = function (block) {
        Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import Fingerprint';
        var code = `fingerprintModule.EnableModule()\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_disableFingerprint'] = function (block) {
        Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import Fingerprint';
        var code = `fingerprintModule.DisableModule()\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_disableFingerprint'] = function (block) {
        Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import Fingerprint';
        var code = `fingerprintModule.DisableModule()\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_recordFinger'] = function (block) {
        Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import Fingerprint';
        var code = `fingerprintModule.Record()\n`;
        return code;
    };
    
    Blockly.Python['udblockEXTBIOT_renameFingerprint'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import Fingerprint';
        var FID = Blockly.Python.valueToCode(block, "FID", Blockly.Python.ORDER_ATOMIC)
        var NFID = Blockly.Python.valueToCode(block, "NFID", Blockly.Python.ORDER_ATOMIC)
        var code = `fingerprintModule.RenameFinger(${FID},${NFID})\n`;
        return code;
    };
    Blockly.Python['udblockEXTBIOT_getFingerprintName'] = function (block) {
        Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import Fingerprint';
        var code = `fingerprintModule.GetCurrentIdName()\n`;
        return [code,Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_getFingerprintId'] = function (block) {
        Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import Fingerprint';
        var code = `fingerprintModule.GetCurrentId()\n`;
        return [code,Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python['udblockEXTBIOT_removeFingerprints'] = function (block) {
        Blockly.Python.definitions_['import_iot'] = 'from audio import AIPlayer';
        Blockly.Python.definitions_['import_fingerprint'] = 'from fingerprint import Fingerprint';
        var code = `fingerprintModule.RemoveRecords()\n`;
        return code;
    };
}