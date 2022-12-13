import { extb_rk_iot } from "scratch-vm/src/util/extb-definitions";
import loadMiscMenu from "./udblockmenu_misc";
import loadActionDefinition from "./udblock_action";
import loadCamaraDefinition from "./udblock_camera";
import loadSensorDefinition from "./udblock_sensor";

const id = extb_rk_iot.id

export default (Blockly) => {
    // 菜单
    loadMiscMenu(id)
    // 传感器
    loadCamaraDefinition(id)
    loadSensorDefinition(id)
    // 执行器
    loadActionDefinition(id)

    // 功能
    Blockly.Python[`${id}_initAiPlayer`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        var request = new XMLHttpRequest();
        var ip = "127.0.0.1"
        request.open("GET","http://127.0.0.1:12888/myIP",false)
        request.onreadystatechange = function(e){
            if (request.status == 200 && request.readyState == 4){
                ip = request.responseText;
                // console.log(ip)
            }
        }
        request.send()
        var code = `aiplayer = AIPlayer('${ip}')\n`;
        return code;
    };
    Blockly.Python[`${id}_initAiPlayerWithIP`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        var ip = Blockly.Python.valueToCode(block, "IP", Blockly.Python.ORDER_ATOMIC)
        var code = `aiplayer = AIPlayer(${ip})\n`;
        return code;
    };
    Blockly.Python[`${id}_enableSD`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        var code = `aiplayer.useSD = True\n`;
        return code;
    };
    Blockly.Python[`${id}_disableSD`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        var code = `aiplayer.useSD = False\n`;
        return code;
    };
    Blockly.Python[`${id}_startRecording`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
        var duaration = Blockly.Python.valueToCode(block, "DUARATION", Blockly.Python.ORDER_ATOMIC)
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.Record(${duaration}, ${fname})\n`;
        return code;
    };
    Blockly.Python[`${id}_startPlaying`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.Play(${fname})\n`;
        return code;
    };
    Blockly.Python[`${id}_startPlayingAsync`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.Play_BG(${fname})\n`;
        return code;
    };
    Blockly.Python[`${id}_getSTTResult`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        

        var code = `aiplayer._stt`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${id}_startSTT`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.STT(${fname})\n`;
        return code;
    };
    Blockly.Python[`${id}_startTTS`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)

        var code = `aiplayer.TTS(${text})\n`;
        return code;
    };
    Blockly.Python[`${id}_getSTTResultContains`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)

        var code = `(aiplayer.contains(${text}))`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${id}_getSTTResultEquals`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)

        var code = `(aiplayer.equals(${text}))`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${id}_setVolume`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
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
    Blockly.Python[`${id}_removeRecord`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
        var filename = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)
        //var code = `aiplayer.Volume(${Math.round(((volume)/100)*63)})`;
        var code = `aiplayer.RemoveRecord(${filename})\n`;
        return code;
    };
    Blockly.Python[`${id}_removeRecordAll`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
        //var code = `aiplayer.Volume(${Math.round(((volume)/100)*63)})`;
        var code = `aiplayer.RemoveAll()\n`;
        return code;
    };
    Blockly.Python[`${id}_startTTSSave`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        
        var text = Blockly.Python.valueToCode(block, "TEXT", Blockly.Python.ORDER_ATOMIC)
        var fname = Blockly.Python.valueToCode(block, "FNAME", Blockly.Python.ORDER_ATOMIC)
        var code = `aiplayer.TTS(${text},dst=${fname})\n`;
        return code;
    };

    // ASR语音模块
    Blockly.Python[`${id}_startASRMode`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        var code = `aiplayer.StartWakeupMode()\n`;
        return code;
    };
    Blockly.Python[`udblockEXTBRKIOT_menu_asrmenu`] = function (block) {
        var asrmenu = block.getFieldValue("asrmenu");
        return [`${asrmenu}`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${id}_getASRResultBL`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        var menuValue = Blockly.Python.valueToCode(block, 'RESULT', Blockly.Python.ORDER_ATOMIC)
        var code = `(aiplayer.GetASRCommandID() == ${menuValue})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${id}_getASRResult`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        var code = `aiplayer.GetASRCommandID()`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${id}_asrResult`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        var menuValue = Blockly.Python.valueToCode(block, 'RESULT', Blockly.Python.ORDER_ATOMIC)
        return [menuValue, Blockly.Python.ORDER_ATOMIC];
    };

    // 指纹模块
    Blockly.Python[`${id}_initFingerprint`] = function (block) {
        Blockly.Python.definitions_[`import_fingerprint`] = 'from udrobot.sensor.fingerprint import Fingerprint';
        var code = `fingerprintModule = Fingerprint()\n`;
        return code;
    };
    Blockly.Python[`${id}_enableFingerprint`] = function (block) {
        Blockly.Python.definitions_[`import_fingerprint`] = 'from udrobot.sensor.fingerprint import Fingerprint';
        var code = `fingerprintModule.EnableModule()\n`;
        return code;
    };
    Blockly.Python[`${id}_disableFingerprint`] = function (block) {
        Blockly.Python.definitions_[`import_fingerprint`] = 'from udrobot.sensor.fingerprint import Fingerprint';
        var code = `fingerprintModule.DisableModule()\n`;
        return code;
    };
    Blockly.Python[`${id}_disableFingerprint`] = function (block) {
        Blockly.Python.definitions_[`import_fingerprint`] = 'from udrobot.sensor.fingerprint import Fingerprint';
        var code = `fingerprintModule.DisableModule()\n`;
        return code;
    };
    Blockly.Python[`${id}_recordFinger`] = function (block) {
        Blockly.Python.definitions_[`import_fingerprint`] = 'from udrobot.sensor.fingerprint import Fingerprint';
        var code = `fingerprintModule.Record()\n`;
        return code;
    };
    
    Blockly.Python[`${id}_renameFingerprint`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        Blockly.Python.definitions_[`import_fingerprint`] = 'from udrobot.sensor.fingerprint import Fingerprint';
        var FID = Blockly.Python.valueToCode(block, "FID", Blockly.Python.ORDER_ATOMIC)
        var NFID = Blockly.Python.valueToCode(block, "NFID", Blockly.Python.ORDER_ATOMIC)
        var code = `fingerprintModule.RenameFinger(${FID},${NFID})\n`;
        return code;
    };
    Blockly.Python[`${id}_getFingerprintName`] = function (block) {
        Blockly.Python.definitions_[`import_fingerprint`] = 'from udrobot.sensor.fingerprint import Fingerprint';
        var code = `fingerprintModule.GetCurrentIdName()\n`;
        return [code,Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${id}_getFingerprintId`] = function (block) {
        Blockly.Python.definitions_[`import_fingerprint`] = 'from udrobot.sensor.fingerprint import Fingerprint';
        var code = `fingerprintModule.GetCurrentId()\n`;
        return [code,Blockly.Python.ORDER_ATOMIC];
    };
    Blockly.Python[`${id}_removeFingerprints`] = function (block) {
        Blockly.Python.definitions_[`import_iot`] = 'from udrobot.extend_board.iot import AIPlayer';
        Blockly.Python.definitions_[`import_fingerprint`] = 'from udrobot.sensor.fingerprint import Fingerprint';
        var code = `fingerprintModule.RemoveRecords()\n`;
        return code;
    };
}