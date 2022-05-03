export default (Blockly) => {
    var board = 'udblockUtils';

    // 菜单
    Blockly.Python[`${board}_getI2CFromMem`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var addr = Blockly.Python.valueToCode(block, "ADDR", Blockly.Python.ORDER_ATOMIC);
        var num = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_ATOMIC);
        var PERI = Blockly.Python.valueToCode(block, "PERI", Blockly.Python.ORDER_ATOMIC);

        var code = `udpi_i2c.readfrom_mem(${PERI}, ${addr}, ${num})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    Blockly.Python[`${board}_getI2CFromAddr`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var addr = Blockly.Python.valueToCode(block, "ADDR", Blockly.Python.ORDER_ATOMIC);
        var num = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_ATOMIC);

        var code = `udpi_i2c.readfrom(${addr}, ${num})`;
        return [code, Blockly.Python.ORDER_ATOMIC];
    }
    Blockly.Python[`${board}_writeI2CAddr`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var addr = Blockly.Python.valueToCode(block, "ADDR", Blockly.Python.ORDER_ATOMIC);
        var content = Blockly.Python.valueToCode(block, "CONTENT", Blockly.Python.ORDER_ATOMIC);
        content = String(content).replaceAll("'","");

        var code = `udpi_i2c.writeto(${addr}, bytearray([${content}]))\n`;
        return code
    }
    Blockly.Python[`${board}_writeI2CToMem`] = function (block) {
        Blockly.Python.definitions_['import_sensor'] = 'from udrobot.basic import *';
        var addr = Blockly.Python.valueToCode(block, "ADDR", Blockly.Python.ORDER_ATOMIC);
        var num = Blockly.Python.valueToCode(block, "NUM", Blockly.Python.ORDER_ATOMIC);
        var content = Blockly.Python.valueToCode(block, "CONTENT", Blockly.Python.ORDER_ATOMIC);
        content = String(content).replaceAll("'","");
        var code = `udpi_i2c.writeto_mem(${addr}, ${num}, bytearray([${content}]))\n`;
        return code
    }

    // MQTT类
    Blockly.Python[`${board}_initMQTT`] = function (block) {
        Blockly.Python.definitions_['import_mqttclient'] = 'from tools.mqtt import MQTTClient';
        var client_id = Blockly.Python.valueToCode(block, "ID", Blockly.Python.ORDER_ATOMIC);
        var server_ip = Blockly.Python.valueToCode(block, "SERVER", Blockly.Python.ORDER_ATOMIC);
        var server_port = Blockly.Python.valueToCode(block, "PORT", Blockly.Python.ORDER_ATOMIC);
        var username = Blockly.Python.valueToCode(block, "USER", Blockly.Python.ORDER_ATOMIC);
        var password = Blockly.Python.valueToCode(block, "PASSWD", Blockly.Python.ORDER_ATOMIC);
        // content = String(content).replaceAll("'","");
        Blockly.Python.definitions_['init_mqttclint'] = `mqttClient = MQTTClient(${client_id}, ${server_ip}, ${server_port}, ${username}, ${password})`;
        //var code = `udpi_i2c.writeto_mem(${addr}, ${num}, bytearray([${content}]))\n`;
        return ''
    }
    Blockly.Python[`${board}_connectMQTT`] = function (block) {
        Blockly.Python.definitions_['import_mqttclient'] = 'from tools.mqtt import MQTTClient';
        var code = `mqttClient.connect()\n`;
        return code
    }
    Blockly.Python[`${board}_disconnectMQTT`] = function (block) {
        Blockly.Python.definitions_['import_mqttclient'] = 'from tools.mqtt import MQTTClient';
        var code = `mqttClient.disconnect()\n`;
        return code
    }
    Blockly.Python[`${board}_publishMQTT`] = function (block) {
        Blockly.Python.definitions_['import_mqttclient'] = 'from tools.mqtt import MQTTClient';
        var topic = Blockly.Python.valueToCode(block, "TOPIC", Blockly.Python.ORDER_ATOMIC);
        var payload = Blockly.Python.valueToCode(block, "MSG", Blockly.Python.ORDER_ATOMIC);
        var qos = Blockly.Python.valueToCode(block, "QOS", Blockly.Python.ORDER_ATOMIC);
        var code = `mqttClient.publish(${topic}, ${payload}, qos=${qos})\n`;
        return code
    }
    Blockly.Python[`${board}_subscribeMQTT`] = function (block) {
        Blockly.Python.definitions_['import_mqttclient'] = 'from tools.mqtt import MQTTClient';
        var topic = Blockly.Python.valueToCode(block, "TOPIC", Blockly.Python.ORDER_ATOMIC);
        var qos = Blockly.Python.valueToCode(block, "QOS", Blockly.Python.ORDER_ATOMIC);
        var code = `mqttClient.subscribe(${topic}, qos=${qos})\n`;
        return code
    }
    Blockly.Python[`${board}_waitMQTT`] = function (block) {
        Blockly.Python.definitions_['import_mqttclient'] = 'from tools.mqtt import MQTTClient';
        var code = `mqttClient.wait_msg()\n`;
        return code
    }
    Blockly.Python[`${board}_setcallbackMQTT`] = function (block) {
        var statements = Blockly.Python.statementToCode(block, 'SUBSTACK')
        // var functionName = Blockly.Python.provideFunction_(
        //     `OnBtn${btn}PressedFunc`,
        //     ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(v):',
        //         '  hcsr04 = HCSR04(trigger_pin=trig_pin, echo_pin=echo_pin)',
        //         '  distance = hcsr04.distance_cm()',
        //         '  return distance']);
        var codeInit = `# MQTT客户端回调\n`
        codeInit += 'def ' + `myMQTTCallback` + '(topic, msg, retained, duplicate):\n'
        codeInit += statements
        Blockly.Python.definitions_[`mqtt_bind_callback`] = codeInit;
        var code = `mqttClient.set_callback(callback=myMQTTCallback)\n`
        return code
    }
    Blockly.Python[`${board}_mqttValueTopic`] = function (block) {
        Blockly.Python.definitions_['import_mqttclient'] = 'from tools.mqtt import MQTTClient';
        return ['(topic)',Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python[`${board}_mqttValueMsg`] = function (block) {
        Blockly.Python.definitions_['import_mqttclient'] = 'from tools.mqtt import MQTTClient';
        return ['(msg)',Blockly.Python.ORDER_ATOMIC]
    }
}