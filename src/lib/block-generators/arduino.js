import Blockly from 'scratch-blocks'

const initPythonGenerator = () => {
    Blockly.Arduino = new Blockly.Generator('Arduino');

    Blockly.Arduino.ORDER_ATOMIC = 0; // 0 "" ...
    Blockly.Arduino.ORDER_MEMBER = 1; // . []
    Blockly.Arduino.ORDER_FUNCTION_CALL = 2; // ()
    Blockly.Arduino.ORDER_INCREMENT = 3; // ++
    Blockly.Arduino.ORDER_DECREMENT = 3; // --
    Blockly.Arduino.ORDER_BITWISE_NOT = 4.1; // ~
    Blockly.Arduino.ORDER_UNARY_PLUS = 4.2; // +
    Blockly.Arduino.ORDER_UNARY_NEGATION = 4.3; // -
    Blockly.Arduino.ORDER_LOGICAL_NOT = 4.4; // !
    Blockly.Arduino.ORDER_SIZEOF = 4.5; // sizeof
    Blockly.Arduino.ORDER_NEW = 4.6; // new
    Blockly.Arduino.ORDER_DELETE = 4.7; // delete
    Blockly.Arduino.ORDER_DIVISION = 5.1; // /
    Blockly.Arduino.ORDER_MULTIPLICATION = 5.2; // *
    Blockly.Arduino.ORDER_MODULUS = 5.3; // %
    Blockly.Arduino.ORDER_SUBTRACTION = 6.1; // -
    Blockly.Arduino.ORDER_ADDITION = 6.2; // +
    Blockly.Arduino.ORDER_BITWISE_SHIFT = 7; // << >> >>>
    Blockly.Arduino.ORDER_RELATIONAL = 8; // < <= > >=
    Blockly.Arduino.ORDER_EQUALITY = 9; // == != === !==
    Blockly.Arduino.ORDER_BITWISE_AND = 10; // &
    Blockly.Arduino.ORDER_BITWISE_XOR = 11; // ^
    Blockly.Arduino.ORDER_BITWISE_OR = 12; // |
    Blockly.Arduino.ORDER_LOGICAL_AND = 13; // &&
    Blockly.Arduino.ORDER_LOGICAL_OR = 14; // ||
    Blockly.Arduino.ORDER_CONDITIONAL = 15; // ?:
    Blockly.Arduino.ORDER_ASSIGNMENT = 16; // = += -= *= /= %= <<= >>= ...
    Blockly.Arduino.ORDER_COMMA = 17; // ,
    Blockly.Arduino.ORDER_NONE = 99; // (...)

    Blockly.Arduino.ORDER_OVERRIDES = [

        [Blockly.Arduino.ORDER_FUNCTION_CALL, Blockly.Arduino.ORDER_MEMBER],

        [Blockly.Arduino.ORDER_FUNCTION_CALL, Blockly.Arduino.ORDER_FUNCTION_CALL],

        [Blockly.Arduino.ORDER_MEMBER, Blockly.Arduino.ORDER_MEMBER],

        [Blockly.Arduino.ORDER_MEMBER, Blockly.Arduino.ORDER_FUNCTION_CALL],

        [Blockly.Arduino.ORDER_LOGICAL_NOT, Blockly.Arduino.ORDER_LOGICAL_NOT],

        [Blockly.Arduino.ORDER_MULTIPLICATION, Blockly.Arduino.ORDER_MULTIPLICATION],

        [Blockly.Arduino.ORDER_ADDITION, Blockly.Arduino.ORDER_ADDITION],

        [Blockly.Arduino.ORDER_LOGICAL_AND, Blockly.Arduino.ORDER_LOGICAL_AND],

        [Blockly.Arduino.ORDER_LOGICAL_OR, Blockly.Arduino.ORDER_LOGICAL_OR]
    ];

    Blockly.Arduino.init = function (workspace) {
        Blockly.Arduino.definitions_ = Object.create(null);
        Blockly.Arduino.variables_ = Object.create(null);
        Blockly.Arduino.functions_ = Object.create(null);
        Blockly.Arduino.setups_ = Object.create(null);
    };

    Blockly.Arduino.finish = function (code) {
        var imports = [];
        var definitions = [];
        for (var name in Blockly.Arduino.definitions_) {
            var def = Blockly.Arduino.definitions_[name];
            if (def.match(/^#include/)) {
                imports.push(def);
            } else {
                definitions.push(def);
            }
        }

        var variables = [];
        for (var name in Blockly.Arduino.variables_) {
            variables.push(Blockly.Arduino.variables_[name]);
        }

        var functions = [];
        for (var name in Blockly.Arduino.functions_) {
            functions.push(Blockly.Arduino.functions_[name]);
        }

        var setups = [];
        for (var name in Blockly.Arduino.setups_) {
            setups.push(Blockly.Arduino.setups_[name]);
        }

        delete Blockly.Arduino.definitions_;
        delete Blockly.Arduino.variables_;
        delete Blockly.Arduino.functions_;
        delete Blockly.Arduino.setups_;

        var allCodes =
            imports.join('\n') +
            '\n\n' +
            definitions.join('\n') +
            '\n' +
            variables.join('\n') +
            '\n' +
            functions.join('\n') +
            '\n' +
            'void setup() {\n' +
            setups.join('\n') +
            '\n}\n\n' +
            'void loop() {\n' +
            code +
            '\n}\n\n';

        return allCodes.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n');
    };

    Blockly.Arduino.scrubNakedValue = function (line) {
        return line + ';\n';
    };

    Blockly.Arduino.quote_ = function (string) {
        // Can't use goog.string.quote since % must also be escaped.
        string = string.replace(/\\/g, '\\\\').replace(/\n/g, '\\\n');

        // Follow the CPython behaviour of repr() for a non-byte string.
        var quote = "'";
        if (string.indexOf("'") !== -1) {
            if (string.indexOf('"') === -1) {
                quote = '"';
            } else {
                string = string.replace(/'/g, "\\'");
            }
        }
        return quote + string + quote;
    };

    Blockly.Arduino.scrub_ = function (block, code) {
        var commentCode = '';
        if (!block.outputConnection || !block.outputConnection.targetConnection) {
            var comment = block.getCommentText();
            comment = Blockly.utils.wrap(comment, Blockly.Arduino.COMMENT_WRAP - 3);
            if (comment) {
                if (block.getProcedureDef) {
                    commentCode += '/**\n' + Blockly.Arduino.prefixLines(comment + '\n', ' * ') + ' */\n';
                } else {
                    commentCode += Blockly.Arduino.prefixLines(comment + '\n', '// ');
                }
            }
            for (var i = 0; i < block.inputList.length; i++) {
                if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                    var childBlock = block.inputList[i].connection.targetBlock();
                    if (childBlock) {
                        var comment = Blockly.Arduino.allNestedComments(childBlock);
                        if (comment) {
                            commentCode += Blockly.Arduino.prefixLines(comment, '// ');
                        }
                    }
                }
            }
        }
        var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        var nextCode = Blockly.Arduino.blockToCode(nextBlock);
        return commentCode + code + nextCode;
    };

    Blockly.Arduino.base_setup = function () {
        var branch = Blockly.Arduino.statementToCode(this, 'DO');
        branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
        if (branch) {
            Blockly.Arduino.setups_['setup_setup'] = branch;
        }
        return '';
    };

    // 如果 那么
    Blockly.Arduino["control_if"] = function () {

        var n = 0;
        var argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'false';

        var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
        // console.log("statementToCode", Blockly.Arduino.statementToCode);
        // console.log(branch);

        var code = 'if (' + argument + ') {\n' + branch + '\n}';

        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'false';
            branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
            code += ' else if (' + argument + ') {\n' + branch + '}';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'ELSE');
            code += ' else {\n' + branch + '\n}';
        }
        return code + '\n';
    };

    // 重复循环
    Blockly.Arduino["control_forever"] = function () {

        var logic = Blockly.Arduino.valueToCode(this, 'logic',
            Blockly.Arduino.ORDER_NONE) || 'false';

        var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
        var code = '';
        code += 'while(!(' + logic + ')) {\n';
        code += branch + '\n';
        code += '}\n';
        return code;
    };

    Blockly.Arduino.controls_switch_case = function () {
        var n = 0;
        var argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
            Blockly.Arduino.ORDER_NONE) || 'NULL';
        var branch = '';
        var code = 'switch (' + argument + ') {\n';
        for (n = 1; n <= this.elseifCount_; n++) {
            argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
                Blockly.Arduino.ORDER_NONE) || 'NULL';
            branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
            code += ' case ' + argument + ': \n' + branch + '  break;\n';
        }
        if (this.elseCount_) {
            branch = Blockly.Arduino.statementToCode(this, 'ELSE');
            code += ' default:\n' + branch + '  break;\n';
        }
        code += '}';
        return code + '\n';
    };
}

export default initPythonGenerator;