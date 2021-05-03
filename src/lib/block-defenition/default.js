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
        return [code, order];
    };

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
        var code = '('+ argument0 + ' + ' + argument1 + ')';
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

    Blockly.Python['math_random_int'] = function (block) {
        // Random integer between [X] and [Y].
        Blockly.Python.definitions_['import_random'] = 'import random';
        var argument0 = Blockly.Python.valueToCode(block, 'FROM',
            Blockly.Python.ORDER_NONE) || '0';
        var argument1 = Blockly.Python.valueToCode(block, 'TO',
            Blockly.Python.ORDER_NONE) || '0';
        var code = 'random.randint(' + argument0 + ', ' + argument1 + ')';
        return [code, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python['math_random_float'] = function (block) {
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
            Blockly.Python.ORDER_NONE) || '0';
        var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VARIABLE'),
            Blockly.VARIABLE_CATEGORY_NAME);

        return varName + ' = ' + argument0 + '\n';
    };
}