/**
 * 方块定义
 * @向前移动X步
 */

export default function (Blockly) {
    Blockly.Python['motion_movesteps'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var steps = Blockly.Python.valueToCode(block, "STEPS", Blockly.Python.ORDER_NONE);
        return 'move ' + steps + ' steps\n';
    };
    /**
     * @math
     */
    Blockly.Python['math_number'] = function (block) {
        // Numeric value.
        var code = Number(block.getFieldValue('NUM'));
        var order;
        if (code == Infinity) {
            code = 'float("inf")';
            order = Blockly.Python.ORDER_FUNCTION_CALL;
        } else if (code == -Infinity) {
            code = '-float("inf")';
            order = Blockly.Python.ORDER_UNARY_SIGN;
        } else {
            order = code < 0 ? Blockly.Python.ORDER_UNARY_SIGN :
                Blockly.Python.ORDER_ATOMIC;
        }
        console.log(code)
        return [code, order];
    };
    Blockly.Python['math_angle'] = Blockly.Python['math_number'];
    Blockly.Python['math_integer'] = Blockly.Python['math_number'];

    Blockly.Python['math_arithmetic'] = function (block) {
        // Basic arithmetic operators, and power.
        var OPERATORS = {
            'ADD': [' + ', Blockly.Python.ORDER_ADDITIVE],
            'MINUS': [' - ', Blockly.Python.ORDER_ADDITIVE],
            'MULTIPLY': [' * ', Blockly.Python.ORDER_MULTIPLICATIVE],
            'DIVIDE': [' / ', Blockly.Python.ORDER_MULTIPLICATIVE],
            'POWER': [' ** ', Blockly.Python.ORDER_EXPONENTIATION]
        };
        var tuple = OPERATORS[block.getFieldValue('OP')];
        var operator = tuple[0];
        var order = tuple[1];
        var argument0 = Blockly.Python.valueToCode(block, 'A', order) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'B', order) || '0';
        var code = argument0 + operator + argument1;
        return [code, order];
        // In case of 'DIVIDE', division between integers returns different results
        // in Python 2 and 3. However, is not an issue since Blockly does not
        // guarantee identical results in all languages.  To do otherwise would
        // require every operator to be wrapped in a function call.  This would kill
        // legibility of the generated code.
    };

    Blockly.Python['operator_add'] = function (block) {
        var order = Blockly.Python.ORDER_ADDITIVE;
        var argument0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
        var code = '(' + argument0 + ' + ' + argument1 + ')';
        return [code, order];
    }
    Blockly.Python['operator_subtract'] = function (block) {
        var order = Blockly.Python.ORDER_ADDITIVE;
        var argument0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
        var code = '(' + argument0 + ' - ' + argument1 + ')';
        return [code, order];
    }
    Blockly.Python['operator_multiply'] = function (block) {
        var order = Blockly.Python.ORDER_ADDITIVE;
        var argument0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
        var code = '(' + argument0 + ' * ' + argument1 + ')';
        return [code, order];
    }
    Blockly.Python['operator_divide'] = function (block) {
        var order = Blockly.Python.ORDER_ADDITIVE;
        var argument0 = Blockly.Python.valueToCode(block, 'NUM1', order) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'NUM2', order) || '0';
        var code = '(' + argument0 + ' / ' + argument1 + ')';
        return [code, order];
    }

    Blockly.Python['math_single'] = function (block) {
        // Math operators with single operand.
        var operator = block.getFieldValue('OP');
        var code;
        var arg;
        if (operator == 'NEG') {
            // Negation is a special case given its different operator precedence.
            code = Blockly.Python.valueToCode(block, 'NUM',
                Blockly.Python.ORDER_UNARY_SIGN) || '0';
            return ['-' + code, Blockly.Python.ORDER_UNARY_SIGN];
        }
        Blockly.Python.definitions_['import_math'] = 'import math';
        if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
            arg = Blockly.Python.valueToCode(block, 'NUM',
                Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
        } else {
            arg = Blockly.Python.valueToCode(block, 'NUM',
                Blockly.Python.ORDER_NONE) || '0';
        }
        // First, handle cases which generate values that don't need parentheses
        // wrapping the code.
        switch (operator) {
            case 'ABS':
                code = 'math.fabs(' + arg + ')';
                break;
            case 'ROOT':
                code = 'math.sqrt(' + arg + ')';
                break;
            case 'LN':
                code = 'math.log(' + arg + ')';
                break;
            case 'LOG10':
                code = 'math.log10(' + arg + ')';
                break;
            case 'EXP':
                code = 'math.exp(' + arg + ')';
                break;
            case 'POW10':
                code = 'math.pow(10,' + arg + ')';
                break;
            case 'ROUND':
                code = 'round(' + arg + ')';
                break;
            case 'ROUNDUP':
                code = 'math.ceil(' + arg + ')';
                break;
            case 'ROUNDDOWN':
                code = 'math.floor(' + arg + ')';
                break;
            case 'SIN':
                code = 'math.sin(' + arg + ' / 180.0 * math.pi)';
                break;
            case 'COS':
                code = 'math.cos(' + arg + ' / 180.0 * math.pi)';
                break;
            case 'TAN':
                code = 'math.tan(' + arg + ' / 180.0 * math.pi)';
                break;
        }
        if (code) {
            return [code, Blockly.Python.ORDER_FUNCTION_CALL];
        }
        // Second, handle cases which generate values that may need parentheses
        // wrapping the code.
        switch (operator) {
            case 'ASIN':
                code = 'math.asin(' + arg + ') / math.pi * 180';
                break;
            case 'ACOS':
                code = 'math.acos(' + arg + ') / math.pi * 180';
                break;
            case 'ATAN':
                code = 'math.atan(' + arg + ') / math.pi * 180';
                break;
            default:
                throw Error('Unknown math operator: ' + operator);
        }
        return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
    };

    Blockly.Python['math_constant'] = function (block) {
        // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
        var CONSTANTS = {
            'PI': ['math.pi', Blockly.Python.ORDER_MEMBER],
            'E': ['math.e', Blockly.Python.ORDER_MEMBER],
            'GOLDEN_RATIO': ['(1 + math.sqrt(5)) / 2',
                Blockly.Python.ORDER_MULTIPLICATIVE],
            'SQRT2': ['math.sqrt(2)', Blockly.Python.ORDER_MEMBER],
            'SQRT1_2': ['math.sqrt(1.0 / 2)', Blockly.Python.ORDER_MEMBER],
            'INFINITY': ['float(\'inf\')', Blockly.Python.ORDER_ATOMIC]
        };
        var constant = block.getFieldValue('CONSTANT');
        if (constant != 'INFINITY') {
            Blockly.Python.definitions_['import_math'] = 'import math';
        }
        return CONSTANTS[constant];
    };

    Blockly.Python['math_number_property'] = function (block) {
        // Check if a number is even, odd, prime, whole, positive, or negative
        // or if it is divisible by certain number. Returns true or false.
        var number_to_check = Blockly.Python.valueToCode(block, 'NUMBER_TO_CHECK',
            Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
        var dropdown_property = block.getFieldValue('PROPERTY');
        var code;
        if (dropdown_property == 'PRIME') {
            Blockly.Python.definitions_['import_math'] = 'import math';
            Blockly.Python.definitions_['from_numbers_import_Number'] =
                'from numbers import Number';
            var functionName = Blockly.Python.provideFunction_(
                'math_isPrime',
                ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(n):',
                    '  # https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
                    '  # If n is not a number but a string, try parsing it.',
                    '  if not isinstance(n, Number):',
                    '    try:',
                    '      n = float(n)',
                    '    except:',
                    '      return False',
                    '  if n == 2 or n == 3:',
                    '    return True',
                '  # False if n is negative, is 1, or not whole,' +
                ' or if n is divisible by 2 or 3.',
                    '  if n <= 1 or n % 1 != 0 or n % 2 == 0 or n % 3 == 0:',
                    '    return False',
                    '  # Check all the numbers of form 6k +/- 1, up to sqrt(n).',
                    '  for x in range(6, int(math.sqrt(n)) + 2, 6):',
                    '    if n % (x - 1) == 0 or n % (x + 1) == 0:',
                    '      return False',
                    '  return True']);
            code = functionName + '(' + number_to_check + ')';
            return [code, Blockly.Python.ORDER_FUNCTION_CALL];
        }
        switch (dropdown_property) {
            case 'EVEN':
                code = number_to_check + ' % 2 == 0';
                break;
            case 'ODD':
                code = number_to_check + ' % 2 == 1';
                break;
            case 'WHOLE':
                code = number_to_check + ' % 1 == 0';
                break;
            case 'POSITIVE':
                code = number_to_check + ' > 0';
                break;
            case 'NEGATIVE':
                code = number_to_check + ' < 0';
                break;
            case 'DIVISIBLE_BY':
                var divisor = Blockly.Python.valueToCode(block, 'DIVISOR',
                    Blockly.Python.ORDER_MULTIPLICATIVE);
                // If 'divisor' is some code that evals to 0, Python will raise an error.
                if (!divisor || divisor == '0') {
                    return ['False', Blockly.Python.ORDER_ATOMIC];
                }
                code = number_to_check + ' % ' + divisor + ' == 0';
                break;
        }
        return [code, Blockly.Python.ORDER_RELATIONAL];
    };

    Blockly.Python['math_change'] = function (block) {
        // Add to a variable in place.
        Blockly.Python.definitions_['from_numbers_import_Number'] =
            'from numbers import Number';
        var argument0 = Blockly.Python.valueToCode(block, 'DELTA',
            Blockly.Python.ORDER_ADDITIVE) || '0';
        var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
            Blockly.VARIABLE_CATEGORY_NAME);
        return varName + ' = (' + varName + ' if isinstance(' + varName +
            ', Number) else 0) + ' + argument0 + '\n';
    };

    // Rounding functions have a single operand.
    Blockly.Python['math_round'] = Blockly.Python['math_single'];
    // Trigonometry functions have a single operand.
    Blockly.Python['math_trig'] = Blockly.Python['math_single'];

    Blockly.Python['math_on_list'] = function (block) {
        // Math functions for lists.
        var func = block.getFieldValue('OP');
        var list = Blockly.Python.valueToCode(block, 'LIST',
            Blockly.Python.ORDER_NONE) || '[]';
        var code;
        switch (func) {
            case 'SUM':
                code = 'sum(' + list + ')';
                break;
            case 'MIN':
                code = 'min(' + list + ')';
                break;
            case 'MAX':
                code = 'max(' + list + ')';
                break;
            case 'AVERAGE':
                Blockly.Python.definitions_['from_numbers_import_Number'] =
                    'from numbers import Number';
                var functionName = Blockly.Python.provideFunction_(
                    'math_mean',
                    // This operation excludes null and values that aren't int or float:',
                    // math_mean([null, null, "aString", 1, 9]) == 5.0.',
                    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
                        '  localList = [e for e in myList if isinstance(e, Number)]',
                        '  if not localList: return',
                        '  return float(sum(localList)) / len(localList)']);
                code = functionName + '(' + list + ')';
                break;
            case 'MEDIAN':
                Blockly.Python.definitions_['from_numbers_import_Number'] =
                    'from numbers import Number';
                var functionName = Blockly.Python.provideFunction_(
                    'math_median',
                    // This operation excludes null values:
                    // math_median([null, null, 1, 3]) == 2.0.
                    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(myList):',
                        '  localList = sorted([e for e in myList if isinstance(e, Number)])',
                        '  if not localList: return',
                        '  if len(localList) % 2 == 0:',
                    '    return (localList[len(localList) // 2 - 1] + ' +
                    'localList[len(localList) // 2]) / 2.0',
                        '  else:',
                        '    return localList[(len(localList) - 1) // 2]']);
                code = functionName + '(' + list + ')';
                break;
            case 'MODE':
                var functionName = Blockly.Python.provideFunction_(
                    'math_modes',
                    // As a list of numbers can contain more than one mode,
                    // the returned result is provided as an array.
                    // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
                    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(some_list):',
                        '  modes = []',
                        '  # Using a lists of [item, count] to keep count rather than dict',
                    '  # to avoid "unhashable" errors when the counted item is ' +
                    'itself a list or dict.',
                        '  counts = []',
                        '  maxCount = 1',
                        '  for item in some_list:',
                        '    found = False',
                        '    for count in counts:',
                        '      if count[0] == item:',
                        '        count[1] += 1',
                        '        maxCount = max(maxCount, count[1])',
                        '        found = True',
                        '    if not found:',
                        '      counts.append([item, 1])',
                        '  for counted_item, item_count in counts:',
                        '    if item_count == maxCount:',
                        '      modes.append(counted_item)',
                        '  return modes']);
                code = functionName + '(' + list + ')';
                break;
            case 'STD_DEV':
                Blockly.Python.definitions_['import_math'] = 'import math';
                var functionName = Blockly.Python.provideFunction_(
                    'math_standard_deviation',
                    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(numbers):',
                        '  n = len(numbers)',
                        '  if n == 0: return',
                        '  mean = float(sum(numbers)) / n',
                        '  variance = sum((x - mean) ** 2 for x in numbers) / n',
                        '  return math.sqrt(variance)']);
                code = functionName + '(' + list + ')';
                break;
            case 'RANDOM':
                Blockly.Python.definitions_['import_random'] = 'import random';
                code = 'random.choice(' + list + ')';
                break;
            default:
                throw Error('Unknown operator: ' + func);
        }
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['math_modulo'] = function (block) {
        // Remainder computation.
        var argument0 = Blockly.Python.valueToCode(block, 'DIVIDEND',
            Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'DIVISOR',
            Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
        var code = argument0 + ' % ' + argument1;
        return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
    };

    Blockly.Python['math_constrain'] = function (block) {
        // Constrain a number between two limits.
        var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
            Blockly.Python.ORDER_NONE) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'LOW',
            Blockly.Python.ORDER_NONE) || '0';
        var argument2 = Blockly.Python.valueToCode(block, 'HIGH',
            Blockly.Python.ORDER_NONE) || 'float(\'inf\')';
        var code = 'min(max(' + argument0 + ', ' + argument1 + '), ' +
            argument2 + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['operator_random'] = function (block) {
        // Random integer between [X] and [Y].
        Blockly.Python.definitions_['import_random'] = 'import random';
        var argument0 = Blockly.Python.valueToCode(block, 'FROM',
            Blockly.Python.ORDER_NONE) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'TO',
            Blockly.Python.ORDER_NONE) || '0';
        var code = 'random.randint(' + argument0 + ', ' + argument1 + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['operator_random_float'] = function (block) {
        // Random fraction between 0 and 1.
        Blockly.Python.definitions_['import_random'] = 'import random';
        return ['random.random()', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['math_atan2'] = function (block) {
        // Arctangent of point (X, Y) in degrees from -180 to 180.
        Blockly.Python.definitions_['import_math'] = 'import math';
        var argument0 = Blockly.Python.valueToCode(block, 'X',
            Blockly.Python.ORDER_NONE) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'Y',
            Blockly.Python.ORDER_NONE) || '0';
        return ['math.atan2(' + argument1 + ', ' + argument0 + ') / math.pi * 180',
        Blockly.Python.ORDER_MULTIPLICATIVE];
    };

    /**
     * @text
     */
    Blockly.Python['text'] = function (block) {
        // Text value.
        var code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['text_multiline'] = function (block) {
        // Text value.
        var code = Blockly.Python.multiline_quote_(block.getFieldValue('TEXT'));
        var order = code.indexOf('+') != -1 ? Blockly.Python.ORDER_ADDITIVE :
            Blockly.Python.ORDER_ATOMIC;
        return [code, order];
    };

    /**
     * Enclose the provided value in 'str(...)' function.
     * Leave string literals alone.
     * @param {string} value Code evaluating to a value.
     * @return {[string, number]} Array containing code evaluating to a string and
     *    the order of the returned code.
     * @private
     */
    Blockly.Python.text.forceString_ = function (value) {
        if (Blockly.Python.text.forceString_.strRegExp.test(value)) {
            return [value, Blockly.Python.ORDER_ATOMIC];
        }
        return ['str(' + value + ')', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    /**
     * Regular expression to detect a single-quoted string literal.
     */
    Blockly.Python.text.forceString_.strRegExp = /^\s*'([^']|\\')*'\s*$/;

    Blockly.Python['text_join'] = function (block) {
        // Create a string made up of any number of elements of any type.
        //Should we allow joining by '-' or ',' or any other characters?
        switch (block.itemCount_) {
            case 0:
                return ['\'\'', Blockly.Python.ORDER_ATOMIC];
                break;
            case 1:
                var element = Blockly.Python.valueToCode(block, 'ADD0',
                    Blockly.Python.ORDER_NONE) || '\'\'';
                var codeAndOrder = Blockly.Python.text.forceString_(element);
                return codeAndOrder;
                break;
            case 2:
                var element0 = Blockly.Python.valueToCode(block, 'ADD0',
                    Blockly.Python.ORDER_NONE) || '\'\'';
                var element1 = Blockly.Python.valueToCode(block, 'ADD1',
                    Blockly.Python.ORDER_NONE) || '\'\'';
                var code = Blockly.Python.text.forceString_(element0)[0] + ' + ' +
                    Blockly.Python.text.forceString_(element1)[0];
                return [code, Blockly.Python.ORDER_ADDITIVE];
                break;
            default:
                var elements = [];
                for (var i = 0; i < block.itemCount_; i++) {
                    elements[i] = Blockly.Python.valueToCode(block, 'ADD' + i,
                        Blockly.Python.ORDER_NONE) || '\'\'';
                }
                var tempVar = Blockly.Python.variableDB_.getDistinctName('x',
                    Blockly.VARIABLE_CATEGORY_NAME);
                var code = '\'\'.join([str(' + tempVar + ') for ' + tempVar + ' in [' +
                    elements.join(', ') + ']])';
                return [code, Blockly.Python.ORDER_FUNCTION_CALL];
        }
    };

    Blockly.Python['text_append'] = function (block) {
        // Append to a variable in place.
        var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
            Blockly.VARIABLE_CATEGORY_NAME);
        var value = Blockly.Python.valueToCode(block, 'TEXT',
            Blockly.Python.ORDER_NONE) || '\'\'';
        return varName + ' = str(' + varName + ') + ' +
            Blockly.Python.text.forceString_(value)[0] + '\n';
    };

    Blockly.Python['text_length'] = function (block) {
        // Is the string null or array empty?
        var text = Blockly.Python.valueToCode(block, 'VALUE',
            Blockly.Python.ORDER_NONE) || '\'\'';
        return ['len(' + text + ')', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['text_isEmpty'] = function (block) {
        // Is the string null or array empty?
        var text = Blockly.Python.valueToCode(block, 'VALUE',
            Blockly.Python.ORDER_NONE) || '\'\'';
        var code = 'not len(' + text + ')';
        return [code, Blockly.Python.ORDER_LOGICAL_NOT];
    };

    Blockly.Python['text_indexOf'] = function (block) {
        // Search the text for a substring.
        // Should we allow for non-case sensitive???
        var operator = block.getFieldValue('END') == 'FIRST' ? 'find' : 'rfind';
        var substring = Blockly.Python.valueToCode(block, 'FIND',
            Blockly.Python.ORDER_NONE) || '\'\'';
        var text = Blockly.Python.valueToCode(block, 'VALUE',
            Blockly.Python.ORDER_MEMBER) || '\'\'';
        var code = text + '.' + operator + '(' + substring + ')';
        if (block.workspace.options.oneBasedIndex) {
            return [code + ' + 1', Blockly.Python.ORDER_ADDITIVE];
        }
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['text_charAt'] = function (block) {
        // Get letter at index.
        // Note: Until January 2013 this block did not have the WHERE input.
        var where = block.getFieldValue('WHERE') || 'FROM_START';
        var textOrder = (where == 'RANDOM') ? Blockly.Python.ORDER_NONE :
            Blockly.Python.ORDER_MEMBER;
        var text = Blockly.Python.valueToCode(block, 'VALUE', textOrder) || '\'\'';
        switch (where) {
            case 'FIRST':
                var code = text + '[0]';
                return [code, Blockly.Python.ORDER_MEMBER];
            case 'LAST':
                var code = text + '[-1]';
                return [code, Blockly.Python.ORDER_MEMBER];
            case 'FROM_START':
                var at = Blockly.Python.getAdjustedInt(block, 'AT');
                var code = text + '[' + at + ']';
                return [code, Blockly.Python.ORDER_MEMBER];
            case 'FROM_END':
                var at = Blockly.Python.getAdjustedInt(block, 'AT', 1, true);
                var code = text + '[' + at + ']';
                return [code, Blockly.Python.ORDER_MEMBER];
            case 'RANDOM':
                Blockly.Python.definitions_['import_random'] = 'import random';
                var functionName = Blockly.Python.provideFunction_(
                    'text_random_letter',
                    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(text):',
                        '  x = int(random.random() * len(text))',
                        '  return text[x];']);
                code = functionName + '(' + text + ')';
                return [code, Blockly.Python.ORDER_FUNCTION_CALL];
        }
        throw Error('Unhandled option (text_charAt).');
    };

    Blockly.Python['text_getSubstring'] = function (block) {
        // Get substring.
        var where1 = block.getFieldValue('WHERE1');
        var where2 = block.getFieldValue('WHERE2');
        var text = Blockly.Python.valueToCode(block, 'STRING',
            Blockly.Python.ORDER_MEMBER) || '\'\'';
        switch (where1) {
            case 'FROM_START':
                var at1 = Blockly.Python.getAdjustedInt(block, 'AT1');
                if (at1 == '0') {
                    at1 = '';
                }
                break;
            case 'FROM_END':
                var at1 = Blockly.Python.getAdjustedInt(block, 'AT1', 1, true);
                break;
            case 'FIRST':
                var at1 = '';
                break;
            default:
                throw Error('Unhandled option (text_getSubstring)');
        }
        switch (where2) {
            case 'FROM_START':
                var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 1);
                break;
            case 'FROM_END':
                var at2 = Blockly.Python.getAdjustedInt(block, 'AT2', 0, true);
                // Ensure that if the result calculated is 0 that sub-sequence will
                // include all elements as expected.
                if (!Blockly.isNumber(String(at2))) {
                    Blockly.Python.definitions_['import_sys'] = 'import sys';
                    at2 += ' or sys.maxsize';
                } else if (at2 == '0') {
                    at2 = '';
                }
                break;
            case 'LAST':
                var at2 = '';
                break;
            default:
                throw Error('Unhandled option (text_getSubstring)');
        }
        var code = text + '[' + at1 + ' : ' + at2 + ']';
        return [code, Blockly.Python.ORDER_MEMBER];
    };

    Blockly.Python['text_changeCase'] = function (block) {
        // Change capitalization.
        var OPERATORS = {
            'UPPERCASE': '.upper()',
            'LOWERCASE': '.lower()',
            'TITLECASE': '.title()'
        };
        var operator = OPERATORS[block.getFieldValue('CASE')];
        var text = Blockly.Python.valueToCode(block, 'TEXT',
            Blockly.Python.ORDER_MEMBER) || '\'\'';
        var code = text + operator;
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['text_trim'] = function (block) {
        // Trim spaces.
        var OPERATORS = {
            'LEFT': '.lstrip()',
            'RIGHT': '.rstrip()',
            'BOTH': '.strip()'
        };
        var operator = OPERATORS[block.getFieldValue('MODE')];
        var text = Blockly.Python.valueToCode(block, 'TEXT',
            Blockly.Python.ORDER_MEMBER) || '\'\'';
        var code = text + operator;
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['text_print'] = function (block) {
        // Print statement.
        var msg = Blockly.Python.valueToCode(block, 'TEXT',
            Blockly.Python.ORDER_NONE) || '\'\'';
        return 'print(' + msg + ')\n';
    };

    Blockly.Python['text_prompt_ext'] = function (block) {
        // Prompt function.
        var functionName = Blockly.Python.provideFunction_(
            'text_prompt',
            ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(msg):',
                '  try:',
                '    return raw_input(msg)',
                '  except NameError:',
                '    return input(msg)']);
        if (block.getField('TEXT')) {
            // Internal message.
            var msg = Blockly.Python.quote_(block.getFieldValue('TEXT'));
        } else {
            // External message.
            var msg = Blockly.Python.valueToCode(block, 'TEXT',
                Blockly.Python.ORDER_NONE) || '\'\'';
        }
        var code = functionName + '(' + msg + ')';
        var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
        if (toNumber) {
            code = 'float(' + code + ')';
        }
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['text_prompt'] = Blockly.Python['text_prompt_ext'];

    Blockly.Python['text_count'] = function (block) {
        var text = Blockly.Python.valueToCode(block, 'TEXT',
            Blockly.Python.ORDER_MEMBER) || '\'\'';
        var sub = Blockly.Python.valueToCode(block, 'SUB',
            Blockly.Python.ORDER_NONE) || '\'\'';
        var code = text + '.count(' + sub + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['text_replace'] = function (block) {
        var text = Blockly.Python.valueToCode(block, 'TEXT',
            Blockly.Python.ORDER_MEMBER) || '\'\'';
        var from = Blockly.Python.valueToCode(block, 'FROM',
            Blockly.Python.ORDER_NONE) || '\'\'';
        var to = Blockly.Python.valueToCode(block, 'TO',
            Blockly.Python.ORDER_NONE) || '\'\'';
        var code = text + '.replace(' + from + ', ' + to + ')';
        return [code, Blockly.Python.ORDER_MEMBER];
    };

    Blockly.Python['text_reverse'] = function (block) {
        var text = Blockly.Python.valueToCode(block, 'TEXT',
            Blockly.Python.ORDER_MEMBER) || '\'\'';
        var code = text + '[::-1]';
        return [code, Blockly.Python.ORDER_MEMBER];
    };

    Blockly.Python['data_variable'] = function (block) {
        // Variable getter.
        var code = Blockly.Python.variableDB_.getName(block.getFieldValue('VARIABLE'),
            Blockly.VARIABLE_CATEGORY_NAME);
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['data_setvariableto'] = function (block) {
        // Variable setter.
        var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
            Blockly.Python.ORDER_NONE).replaceAll("'", "");
        var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VARIABLE'),
            Blockly.VARIABLE_CATEGORY_NAME);

        return varName + ' = ' + argument0 + '\n';
    };
    Blockly.Python['data_changevariableby'] = function (block) {
        // Variable setter.
        var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
            Blockly.Python.ORDER_NONE).replaceAll("'", "");
        var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VARIABLE'),
            Blockly.VARIABLE_CATEGORY_NAME);

        return varName + ' += ' + argument0 + '\n';
    };
    Blockly.Python['data_hidevariable'] = function (block) {
        // Variable setter.
        return 'pass\n';
    };
    Blockly.Python['data_showvariable'] = function (block) {
        // Variable setter.
        return 'pass\n';
    };

    Blockly.Python['data_listcontents'] = function(block){
        //console.log(block)
        if (block.inputList.length == 0){
            return ['', Blockly.Python.ORDER_ATOMIC]
        }
        console.log(block.inputList[0].fieldRow[0].text_)
        return [block.inputList[0].fieldRow[0].text_, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['data_addtolist'] = function(block){
        console.log(Blockly.Xml.blockToDom(block))
        var list = Blockly.Xml.blockToDom(block).firstChild.innerText;
        var item = Blockly.Python.valueToCode(block, "ITEM", Blockly.Python.ORDER_ATOMIC).replaceAll("'","");;
        return `${list}.append(${item})\n`
    }
    Blockly.Python['data_deleteoflist'] = function(block){
        var index = parseInt(Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)) || 1;
        if (index >= 1) index -= 1;
        else index = 0;

        var list = Blockly.Xml.blockToDom(block).firstChild.innerText;
        console.log(Blockly.Xml.blockToDom(block))
        //return `${list} = ${list}[:${index}].append(${list}[${index+1}:])`
        return `del ${list}[${index}]\n`
    }

    Blockly.Python['data_deletealloflist'] = function(block){
        var list = Blockly.Xml.blockToDom(block).firstChild.innerText;
        return `${list} = []\n`
        
    }
    Blockly.Python['data_insertatlist'] = function(block){
        console.log(Blockly.Xml.blockToDom(block))

        var list = Blockly.Xml.blockToDom(block).firstChild.innerText;
        console.log(Blockly.Xml.blockToDom(block))

        var item = Blockly.Python.valueToCode(block, "ITEM", Blockly.Python.ORDER_ATOMIC).replaceAll("'","");;

        return `${list}.insert(0, ${item})\n`

    }
    Blockly.Python['data_replaceitemoflist'] = function(block){
        var index = parseInt(Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)) || 1;
        if (index >= 1) index -= 1;
        else index = 0;


        var list = Blockly.Xml.blockToDom(block).firstChild.innerText;
        console.log(Blockly.Xml.blockToDom(block))

        var item = Blockly.Python.valueToCode(block, "ITEM", Blockly.Python.ORDER_ATOMIC).replaceAll("'","");;

        return `${list}[${index}] = ${item}\n`
    }
    Blockly.Python['data_itemoflist'] = function(block){
        var index = parseInt(Blockly.Python.valueToCode(block, "INDEX", Blockly.Python.ORDER_ATOMIC)) || 1;
        if (index >= 1) index -= 1;
        else index = 0;


        var list = Blockly.Xml.blockToDom(block).firstChild.innerText;
        console.log(Blockly.Xml.blockToDom(block))
        return [`${list}[${index}]`,Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['data_itemnumoflist'] = function(block){
        var list = Blockly.Xml.blockToDom(block).firstChild.innerText;
        console.log(Blockly.Xml.blockToDom(block))

        var item = Blockly.Python.valueToCode(block, "ITEM", Blockly.Python.ORDER_ATOMIC).replaceAll("'","");;

        return [`${list}.index${item})`,Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['data_lengthoflist'] = function(block){
        var list = Blockly.Xml.blockToDom(block).firstChild.innerText;
        console.log(Blockly.Xml.blockToDom(block))
        return [`len(${list})`, Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['data_listcontainsitem'] = function(block){
        var item = Blockly.Python.valueToCode(block, "ITEM", Blockly.Python.ORDER_ATOMIC).replaceAll("'","");;


        var list = Blockly.Xml.blockToDom(block).firstChild.innerText;
        console.log(Blockly.Xml.blockToDom(block))
        return [`(${list}.count(${item}) >  0)`,Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['data_itemnumoflist'] = function(block){
        var item = Blockly.Python.valueToCode(block, "ITEM", Blockly.Python.ORDER_ATOMIC).replaceAll("'","");;


        var list = Blockly.Xml.blockToDom(block).firstChild.innerText;
        console.log(Blockly.Xml.blockToDom(block))
        return [`${list}.count(${item})`,Blockly.Python.ORDER_ATOMIC]
    }
    Blockly.Python['data_showlist'] = function(block){
        return ''
    }
    Blockly.Python['data_hidelist'] = function(block){
        return ''
    }
    
    


    // Color 颜色

    String.prototype.colorHex = function () {
        // RGB颜色值的正则
        var reg = /^(rgb|RGB)/;
        var color = this;
        if (reg.test(color)) {
            var strHex = "#";
            // 把RGB的3个数值变成数组
            var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            // 转成16进制
            for (var i = 0; i < colorArr.length; i++) {
                var hex = Number(colorArr[i]).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            return strHex;
        } else {
            return String(color);
        }
    };

    String.prototype.colorRgb = function () {
        // 16进制颜色值的正则
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 把颜色值变成小写
        var color = this.toLowerCase();
        if (reg.test(color)) {
            // 如果只有三位的值，需变成六位，如：#fff => #ffffff
            if (color.length === 4) {
                var colorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                }
                color = colorNew;
            }
            // 处理六位的颜色值，转为RGB
            var colorChange = [];
            for (var i = 1; i < 7; i += 2) {
                colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
            }
            return "(" + colorChange.join(",") + ")";
        } else {
            return color;
        }
    };

    Blockly.Python['colour_picker'] = function (block) {
        // Colour picker.
        var code = Blockly.Python.quote_(block.getFieldValue('COLOUR'));
        var code2 = String(code).slice(1, String(code).length - 1).colorRgb()
        return [code2, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['colour_random'] = function (block) {
        // Generate a random colour.
        Blockly.Python.definitions_['import_random'] = 'import random';
        var code = '\'#%06x\' % random.randint(0, 2**24 - 1)';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['colour_rgb'] = function (block) {
        // Compose a colour from RGB components expressed as percentages.
        var functionName = Blockly.Python.provideFunction_(
            'colour_rgb',
            ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(r, g, b):',
                '  r = round(min(100, max(0, r)) * 2.55)',
                '  g = round(min(100, max(0, g)) * 2.55)',
                '  b = round(min(100, max(0, b)) * 2.55)',
                '  return \'#%02x%02x%02x\' % (r, g, b)']);
        var r = Blockly.Python.valueToCode(block, 'RED',
            Blockly.Python.ORDER_NONE) || 0;
        var g = Blockly.Python.valueToCode(block, 'GREEN',
            Blockly.Python.ORDER_NONE) || 0;
        var b = Blockly.Python.valueToCode(block, 'BLUE',
            Blockly.Python.ORDER_NONE) || 0;
        var code = functionName + '(' + r + ', ' + g + ', ' + b + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['colour_blend'] = function (block) {
        // Blend two colours together.
        var functionName = Blockly.Python.provideFunction_(
            'colour_blend',
            ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
                '(colour1, colour2, ratio):',
                '  r1, r2 = int(colour1[1:3], 16), int(colour2[1:3], 16)',
                '  g1, g2 = int(colour1[3:5], 16), int(colour2[3:5], 16)',
                '  b1, b2 = int(colour1[5:7], 16), int(colour2[5:7], 16)',
                '  ratio = min(1, max(0, ratio))',
                '  r = round(r1 * (1 - ratio) + r2 * ratio)',
                '  g = round(g1 * (1 - ratio) + g2 * ratio)',
                '  b = round(b1 * (1 - ratio) + b2 * ratio)',
                '  return \'#%02x%02x%02x\' % (r, g, b)']);
        var colour1 = Blockly.Python.valueToCode(block, 'COLOUR1',
            Blockly.Python.ORDER_NONE) || '\'#000000\'';
        var colour2 = Blockly.Python.valueToCode(block, 'COLOUR2',
            Blockly.Python.ORDER_NONE) || '\'#000000\'';
        var ratio = Blockly.Python.valueToCode(block, 'RATIO',
            Blockly.Python.ORDER_NONE) || 0;
        var code = functionName + '(' + colour1 + ', ' + colour2 + ', ' + ratio + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    // 控制延时
    Blockly.Python['math_positive_number'] = Blockly.Python['math_number']
    Blockly.Python['math_whole_number'] = Blockly.Python['math_number']
    Blockly.Python['control_wait'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';

        var duration = Blockly.Python.valueToCode(block, "DURATION", Blockly.Python.ORDER_NONE);
        return `time.sleep(${duration})\n`;
    };
    // 控制循环
    Blockly.Python['control_repeat_ext'] = function (block) {
        // Repeat n times.
        var repeats = String(parseInt(Blockly.Python.valueToCode(block, "TIMES", Blockly.ORDER_ATOMIC)));
        if (Blockly.isNumber(repeats)) {
            repeats = parseInt(repeats, 10);
        } else {
            repeats = 'int(' + repeats + ')';
        }
        var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');

        var code = 'for count in range(' + repeats + '):\n' + branch;
        return code;
    };

    Blockly.Python['control_repeat'] = Blockly.Python['control_repeat_ext'];
    Blockly.Python['control_forever'] = function (block) {
        Blockly.Python.definitions_['import_udrobot'] = 'from udrobot import *';
        var statements = Blockly.Python.statementToCode(block, 'SUBSTACK')
        var code = "while True:\n"
        code += statements
        return code
    }
    Blockly.Python['control_repeat_until'] = function (block) {
        // Do while/until loop.
        var until = block.getFieldValue('MODE') == 'UNTIL';
        var argument0 = Blockly.Python.valueToCode(block, 'CONDITION',
            until ? Blockly.Python.ORDER_LOGICAL_NOT :
                Blockly.Python.ORDER_NONE) || 'True';
        var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
        if (until) {
            argument0 = 'not ' + argument0;
        }
        return 'while ' + argument0 + ':\n' + branch;
    };

    Blockly.Python['control_for'] = function (block) {
        // For loop.
        var variable0 = Blockly.Python.variableDB_.getName(
            block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
        var argument0 = Blockly.Python.valueToCode(block, 'FROM',
            Blockly.Python.ORDER_NONE) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'TO',
            Blockly.Python.ORDER_NONE) || '0';
        var increment = Blockly.Python.valueToCode(block, 'BY',
            Blockly.Python.ORDER_NONE) || '1';
        var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;

        var code = '';
        var range;

        // Helper functions.
        var defineUpRange = function () {
            return Blockly.Python.provideFunction_(
                'upRange',
                ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
                    '(start, stop, step):',
                    '  while start <= stop:',
                    '    yield start',
                    '    start += abs(step)']);
        };
        var defineDownRange = function () {
            return Blockly.Python.provideFunction_(
                'downRange',
                ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ +
                    '(start, stop, step):',
                    '  while start >= stop:',
                    '    yield start',
                    '    start -= abs(step)']);
        };
        // Arguments are legal Python code (numbers or strings returned by scrub()).
        var generateUpDownRange = function (start, end, inc) {
            return '(' + start + ' <= ' + end + ') and ' +
                defineUpRange() + '(' + start + ', ' + end + ', ' + inc + ') or ' +
                defineDownRange() + '(' + start + ', ' + end + ', ' + inc + ')';
        };

        if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
            Blockly.isNumber(increment)) {
            // All parameters are simple numbers.
            argument0 = Number(argument0);
            argument1 = Number(argument1);
            increment = Math.abs(Number(increment));
            if (argument0 % 1 === 0 && argument1 % 1 === 0 && increment % 1 === 0) {
                // All parameters are integers.
                if (argument0 <= argument1) {
                    // Count up.
                    argument1++;
                    if (argument0 == 0 && increment == 1) {
                        // If starting index is 0, omit it.
                        range = argument1;
                    } else {
                        range = argument0 + ', ' + argument1;
                    }
                    // If increment isn't 1, it must be explicit.
                    if (increment != 1) {
                        range += ', ' + increment;
                    }
                } else {
                    // Count down.
                    argument1--;
                    range = argument0 + ', ' + argument1 + ', -' + increment;
                }
                range = 'range(' + range + ')';
            } else {
                // At least one of the parameters is not an integer.
                if (argument0 < argument1) {
                    range = defineUpRange();
                } else {
                    range = defineDownRange();
                }
                range += '(' + argument0 + ', ' + argument1 + ', ' + increment + ')';
            }
        } else {
            // Cache non-trivial values to variables to prevent repeated look-ups.
            var scrub = function (arg, suffix) {
                if (Blockly.isNumber(arg)) {
                    // Simple number.
                    arg = Number(arg);
                } else if (arg.match(/^\w+$/)) {
                    // Variable.
                    arg = 'float(' + arg + ')';
                } else {
                    // It's complicated.
                    var varName = Blockly.Python.variableDB_.getDistinctName(
                        variable0 + suffix, Blockly.VARIABLE_CATEGORY_NAME);
                    code += varName + ' = float(' + arg + ')\n';
                    arg = varName;
                }
                return arg;
            };
            var startVar = scrub(argument0, '_start');
            var endVar = scrub(argument1, '_end');
            var incVar = scrub(increment, '_inc');

            if (typeof startVar == 'number' && typeof endVar == 'number') {
                if (startVar < endVar) {
                    range = defineUpRange();
                } else {
                    range = defineDownRange();
                }
                range += '(' + startVar + ', ' + endVar + ', ' + incVar + ')';
            } else {
                // We cannot determine direction statically.
                range = generateUpDownRange(startVar, endVar, incVar);
            }
        }
        code += 'for ' + variable0 + ' in ' + range + ':\n' + branch;
        return code;
    };

    Blockly.Python['control_forEach'] = function (block) {
        // For each loop.
        var variable0 = Blockly.Python.variableDB_.getName(
            block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
        var argument0 = Blockly.Python.valueToCode(block, 'LIST',
            Blockly.Python.ORDER_RELATIONAL) || '[]';
        var branch = Blockly.Python.statementToCode(block, 'SUBSTACK');
        branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
        var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;
        return code;
    };

    Blockly.Python['controls_flow_statements'] = function (block) {
        // Flow statements: continue, break.
        var xfix = '';
        if (Blockly.Python.STATEMENT_PREFIX) {
            // Automatic prefix insertion is switched off for this block.  Add manually.
            xfix += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
        }
        if (Blockly.Python.STATEMENT_SUFFIX) {
            // Inject any statement suffix here since the regular one at the end
            // will not get executed if the break/continue is triggered.
            xfix += Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block);
        }
        if (Blockly.Python.STATEMENT_PREFIX) {
            var loop = Blockly.Constants.Loops
                .CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(block);
            if (loop && !loop.suppressPrefixSuffix) {
                // Inject loop's statement prefix here since the regular one at the end
                // of the loop will not get executed if 'continue' is triggered.
                // In the case of 'break', a prefix is needed due to the loop's suffix.
                xfix += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, loop);
            }
        }
        switch (block.getFieldValue('FLOW')) {
            case 'BREAK':
                return xfix + 'break\n';
            case 'CONTINUE':
                return xfix + 'continue\n';
        }
        throw Error('Unknown flow statement.');
    };

    // 逻辑
    Blockly.Python['control_if'] = function (block) {
        // If/elseif/else condition.
        console.log(Blockly.Xml.blockToDom(block))
        var n = 0;
        var code = '', branchCode, conditionCode;
        if (Blockly.Python.STATEMENT_PREFIX) {
            // Automatic prefix insertion is switched off for this block.  Add manually.
            code += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
        }
        conditionCode = Blockly.Python.valueToCode(block, 'CONDITION',
            Blockly.Python.ORDER_NONE) || 'False';
        branchCode = Blockly.Python.statementToCode(block, 'SUBSTACK') ||
            Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += (n == 0 ? 'if ' : 'elif ') + conditionCode + ':\n' + branchCode;
        return code;
    };

    Blockly.Python['control_if_else'] = function (block) {
        var n = 0;
        var code = '', branchCode, conditionCode;
        if (Blockly.Python.STATEMENT_PREFIX) {
            // Automatic prefix insertion is switched off for this block.  Add manually.
            code += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
        }
        conditionCode = Blockly.Python.valueToCode(block, 'CONDITION',
            Blockly.Python.ORDER_NONE) || 'False';
        branchCode = Blockly.Python.statementToCode(block, 'SUBSTACK') ||
            Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += (n == 0 ? 'if ' : 'elif ') + conditionCode + ':\n' + branchCode;

        branchCode = Blockly.Python.statementToCode(block, 'SUBSTACK2') ||
            Blockly.Python.PASS;
        if (Blockly.Python.STATEMENT_SUFFIX) {
            branchCode = Blockly.Python.prefixLines(
                Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
                Blockly.Python.INDENT) + branchCode;
        }
        code += 'else:\n' + branchCode;
        return code;
    };

    function logicCompare(block, operator) {
        // Comparison operator.

    };

    Blockly.Python['operator_gt'] = function (block) {
        var order = Blockly.Python.ORDER_ATOMIC;
        var argument0 = Blockly.Python.valueToCode(block, 'OPERAND1', order);
        var argument1 = Blockly.Python.valueToCode(block, 'OPERAND2', order);
        var code = `${argument0} > ${argument1}`.replaceAll("'", "");;
        return [code, order];
    }
    Blockly.Python['operator_lt'] = function (block) {
        var order = Blockly.Python.ORDER_ATOMIC;
        var argument0 = Blockly.Python.valueToCode(block, 'OPERAND1', order);
        var argument1 = Blockly.Python.valueToCode(block, 'OPERAND2', order);
        var code = `${argument0} < ${argument1}`.replaceAll("'", "");
        return [code, order];
    }

    Blockly.Python['operator_equals'] = function (block) {
        var order = Blockly.Python.ORDER_ATOMIC;
        var argument0 = Blockly.Python.valueToCode(block, 'OPERAND1', order) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'OPERAND2', order) || '0';
        var code = `${argument0} == ${argument1}`.replaceAll("'", "");;
        return [code, order];
    }
    Blockly.Python['operator_and'] = function (block) {
        var order = Blockly.Python.ORDER_ATOMIC;
        var argument0 = Blockly.Python.valueToCode(block, 'OPERAND1', order) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'OPERAND2', order) || '0';
        var code = `${argument0} and ${argument1}`.replaceAll("'", "");;
        return [code, order];
    }
    Blockly.Python['operator_or'] = function (block) {
        var order = Blockly.Python.ORDER_ATOMIC;
        var argument0 = Blockly.Python.valueToCode(block, 'OPERAND1', order) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'OPERAND2', order) || '0';
        var code = `${argument0} or ${argument1}`.replaceAll("'", "");;
        return [code, order];
    }
    Blockly.Python['operator_not'] = function (block) {
        var order = Blockly.Python.ORDER_ATOMIC;
        var argument0 = Blockly.Python.valueToCode(block, 'OPERAND', order) || '0';
        var code = `not ${argument0}`.replaceAll("'", "");;
        return [code, order];
    }
    Blockly.Python['operator_join'] = function (block) {
        var element0 = Blockly.Python.valueToCode(block, 'STRING1',
            Blockly.Python.ORDER_NONE) || '\'\'';
        var element1 = Blockly.Python.valueToCode(block, 'STRING2',
            Blockly.Python.ORDER_NONE) || '\'\'';
        var code = Blockly.Python.text.forceString_(element0)[0] + ' + ' +
            Blockly.Python.text.forceString_(element1)[0];
        return [code, Blockly.Python.ORDER_ADDITIVE];
    }
    Blockly.Python['operator_letter_of'] = function (block) {
        // Get letter at index.
        // Note: Until January 2013 this block did not have the WHERE input.
        var text = Blockly.Python.valueToCode(block, 'STRING', Blockly.Python.ORDER_ATOMIC) || '\'\'';
        var at = Blockly.Python.getAdjustedInt(block, 'LETTER');
        var code = text + '[' + at + ']';
        return [code, Blockly.Python.ORDER_MEMBER];
    };
    Blockly.Python['operator_length'] = function (block) {
        // Is the string null or array empty?
        var text = Blockly.Python.valueToCode(block, 'STRING',
            Blockly.Python.ORDER_NONE) || '\'\'';
        return ['len(' + text + ')', Blockly.Python.ORDER_FUNCTION_CALL];
    };
    Blockly.Python['operator_contains'] = function (block) {
        // Is the string null or array empty?
        var text = Blockly.Python.valueToCode(block, 'STRING1',
            Blockly.Python.ORDER_NONE) || '\'\'';
        var content = Blockly.Python.valueToCode(block, 'STRING2',
            Blockly.Python.ORDER_NONE) || '\'\'';
        return ['(' + text + '.find(' + content + ') >= 0)', Blockly.Python.ORDER_FUNCTION_CALL];
    };
    Blockly.Python['operator_mod'] = function (block) {
        // Remainder computation.
        var argument0 = Blockly.Python.valueToCode(block, 'NUM1',
            Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'NUM2',
            Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
        var code = argument0 + ' % ' + argument1;
        return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
    };
    Blockly.Python['operator_round'] = function (block) {
        // Remainder computation.
        var argument0 = Blockly.Python.valueToCode(block, 'NUM',
            Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
        var code = 'round(' + argument0 + ')';
        return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
    };
    Blockly.Python['operator_mathop'] = function (block) {
        // Math operators with single operand.
        var operator = block.getFieldValue('OPERATOR');
        var code;
        var arg;
        if (operator == 'NEG') {
            // Negation is a special case given its different operator precedence.
            code = Blockly.Python.valueToCode(block, 'NUM',
                Blockly.Python.ORDER_UNARY_SIGN) || '0';
            return ['-' + code, Blockly.Python.ORDER_UNARY_SIGN];
        }
        Blockly.Python.definitions_['import_math'] = 'import math';
        if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
            arg = Blockly.Python.valueToCode(block, 'NUM',
                Blockly.Python.ORDER_MULTIPLICATIVE) || '0';
        } else {
            arg = Blockly.Python.valueToCode(block, 'NUM',
                Blockly.Python.ORDER_NONE) || '0';
        }
        // First, handle cases which generate values that don't need parentheses
        // wrapping the code.
        switch (operator) {
            case 'abs':
                code = 'math.fabs(' + arg + ')';
                break;
            case 'sqrt':
                code = 'math.sqrt(' + arg + ')';
                break;
            case 'log':
                code = 'math.log(' + arg + ')';
                break;
            case 'ln':
                code = 'math.log10(' + arg + ')';
                break;
            case 'e ^':
                code = 'math.exp(' + arg + ')';
                break;
            case '10 ^':
                code = 'math.pow(10,' + arg + ')';
                break;
            case 'round':
                code = 'round(' + arg + ')';
                break;
            case 'ceiling':
                code = 'math.ceil(' + arg + ')';
                break;
            case 'floor':
                code = 'math.floor(' + arg + ')';
                break;
            case 'sin':
                code = 'math.sin(' + arg + ' / 180.0 * math.pi)';
                break;
            case 'cos':
                code = 'math.cos(' + arg + ' / 180.0 * math.pi)';
                break;
            case 'tan':
                code = 'math.tan(' + arg + ' / 180.0 * math.pi)';
                break;
        }
        if (code) {
            return [code, Blockly.Python.ORDER_FUNCTION_CALL];
        }
        // Second, handle cases which generate values that may need parentheses
        // wrapping the code.
        switch (operator) {
            case 'asin':
                code = 'math.asin(' + arg + ') / math.pi * 180';
                break;
            case 'acos':
                code = 'math.acos(' + arg + ') / math.pi * 180';
                break;
            case 'atan':
                code = 'math.atan(' + arg + ') / math.pi * 180';
                break;
            default:
                throw Error('Unknown math operator: ' + operator);
        }
        return [code, Blockly.Python.ORDER_MULTIPLICATIVE];
    };

    Blockly.Python['logic_operation'] = function (block) {
        // Operations 'and', 'or'.
        var operator = (block.getFieldValue('OP') == 'AND') ? 'and' : 'or';
        var order = (operator == 'and') ? Blockly.Python.ORDER_LOGICAL_AND :
            Blockly.Python.ORDER_LOGICAL_OR;
        var argument0 = Blockly.Python.valueToCode(block, 'A', order);
        var argument1 = Blockly.Python.valueToCode(block, 'B', order);
        if (!argument0 && !argument1) {
            // If there are no arguments, then the return value is false.
            argument0 = 'False';
            argument1 = 'False';
        } else {
            // Single missing arguments have no effect on the return value.
            var defaultArgument = (operator == 'and') ? 'True' : 'False';
            if (!argument0) {
                argument0 = defaultArgument;
            }
            if (!argument1) {
                argument1 = defaultArgument;
            }
        }
        var code = argument0 + ' ' + operator + ' ' + argument1;
        return [code, order];
    };

    Blockly.Python['logic_negate'] = function (block) {
        // Negation.
        var argument0 = Blockly.Python.valueToCode(block, 'BOOL',
            Blockly.Python.ORDER_LOGICAL_NOT) || 'True';
        var code = 'not ' + argument0;
        return [code, Blockly.Python.ORDER_LOGICAL_NOT];
    };

    Blockly.Python['logic_boolean'] = function (block) {
        // Boolean values true and false.
        var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
        return [code, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['logic_null'] = function (block) {
        // Null data type.
        return ['None', Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python['logic_ternary'] = function (block) {
        // Ternary operator.
        var value_if = Blockly.Python.valueToCode(block, 'CONDITION',
            Blockly.Python.ORDER_CONDITIONAL) || 'False';
        var value_then = Blockly.Python.valueToCode(block, 'THEN',
            Blockly.Python.ORDER_CONDITIONAL) || 'None';
        var value_else = Blockly.Python.valueToCode(block, 'ELSE',
            Blockly.Python.ORDER_CONDITIONAL) || 'None';
        var code = value_then + ' if ' + value_if + ' else ' + value_else;
        return [code, Blockly.Python.ORDER_CONDITIONAL];
    };

    // 流程函数
    Blockly.Python['procedures_prototype'] = function (block) {
        console.log(block)
        //console.log(Blockly.Python.blockToCode(block))
        return '123'
    }
    Blockly.Python['procedures_call'] = function (block) {
        function getSpecifiedBlock(id){
            for (var i =0 ;i<block.inputList.length;i++){
                if (block.inputList[i].name == id){
                    if (block.inputList[i].connection.targetConnection != null)
                        return block.inputList[i].connection.targetConnection.sourceBlock_
                    else{
                        return ""
                    }
                }
            }
            return undefined
        }

        console.log("call:", block)
        
        var args = []
        console.log(block.childBlocks_)
        for (var i = 0; i < block.argumentIds_.length; i += 1) {

            console.log(Blockly.Python.blockToCode(getSpecifiedBlock(block.argumentIds_[i]))[0])
            args.push(String(Blockly.Python.blockToCode(getSpecifiedBlock(block.argumentIds_[i]))[0]).replaceAll("'", ""))

        }


        return `${String(block.procCode_).split(" ")[0]}(${args.join(",")})\n`
    }

    Blockly.Python['procedures_definition'] = function (block) {

        var code = ''
        if (block.childBlocks_.length > 1) {
            console.log(Blockly.Xml.blockToDom(block.childBlocks_[1]))
            for (var i = 1; i < block.childBlocks_.length; i++) {
                code += `${Blockly.Python.blockToCode(block.childBlocks_[i])}\n`
            }

        } else {
            code += "pass"
        }
        code = "  " + code.replaceAll("\n", "\n  ")
        Blockly.Python.provideFunction_(
            String(block.childBlocks_[0].procCode_).split(" ")[0],
            ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(' + block.childBlocks_[0].displayNames_.join(",") + '):',
                code
            ]);
        return null;
    }
    Blockly.Python['argument_reporter_string_number'] = function (block) {
        console.log(Blockly.Xml.blockToDom(block))
        return [block.getFieldValue("VALUE"), Blockly.Python.ORDER_ATOMIC]
    }

    Blockly.Python['argument_reporter_boolean'] = function (block) {
        console.log(Blockly.Xml.blockToDom(block))
        return [block.getFieldValue("VALUE"), Blockly.Python.ORDER_ATOMIC]
    }

    // Matrix UD
    Blockly.Python['matrixud'] = function (block) {
        // Text value.
        var code = Blockly.Python.quote_(block.getFieldValue('MATRIX'));
        return [code, Blockly.Python.ORDER_ATOMIC];
    };
}