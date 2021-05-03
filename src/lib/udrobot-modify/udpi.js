export default function (Blockly) {
    Blockly.Blocks['udblockUDPi_closeConnectToWiFi'] = {
        /**
         * Block for repeat n times (external number).
         * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5eke39
         * @this Blockly.Block
         */
        init: function () {
            this.jsonInit({
                "id": "udblockUDPi_closeConnectToWiFi",
                "message0": Blockly.Msg.CONTROL_FOREVER,
                "message1": "%1", // Statement
                "message2": "%1", // Icon
                "lastDummyAlign2": "RIGHT",
                "args1": [
                    {
                        "type": "input_statement",
                        "name": "SUBSTACK"
                    }
                ],
                "args2": [
                    {
                        "type": "field_image",
                        "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
                        "width": 24,
                        "height": 24,
                        "alt": "*",
                        "flip_rtl": true
                    }
                ],
                "category": Blockly.Categories.udblockUDPi,
                "extensions": ["colours_control", "shape_hat"]
            });
        }
    };
    

}