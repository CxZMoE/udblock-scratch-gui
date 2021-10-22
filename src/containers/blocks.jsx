import bindAll from 'lodash.bindall';
import debounce from 'lodash.debounce';
import defaultsDeep from 'lodash.defaultsdeep';
import makeToolboxXML from '../lib/make-toolbox-xml';
import makeCodeModeToolboxXML from '../lib/make-codemode-toolbox-xml';
import PropTypes from 'prop-types';
import React from 'react';
import VMScratchBlocks from '../lib/blocks';
import VM from 'scratch-vm';

import log from '../lib/log.js';
import Prompt from './prompt.jsx';
import BlocksComponent from '../components/blocks/blocks.jsx';
import ExtensionLibrary from './extension-library.jsx';
import extensionData from '../lib/libraries/extensions/index.jsx';
import CustomProcedures from './custom-procedures.jsx';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import { BLOCKS_DEFAULT_SCALE, STAGE_DISPLAY_SIZES } from '../lib/layout-constants';
import DropAreaHOC from '../lib/drop-area-hoc.jsx';
import DragConstants from '../lib/drag-constants';
import defineDynamicBlock from '../lib/define-dynamic-block';

import { connect } from 'react-redux';
import { updateToolbox } from '../reducers/toolbox';
import { activateColorPicker } from '../reducers/color-picker';
import { closeExtensionLibrary, openSoundRecorder, openConnectionModal } from '../reducers/modals';
import { activateCustomProcedures, deactivateCustomProcedures } from '../reducers/custom-procedures';
import { setConnectionModalExtensionId } from '../reducers/connection-modal';
import { updateMetrics } from '../reducers/workspace-metrics';
import { updatePyCode } from '../reducers/pycode';

import {
    activateTab,
    SOUNDS_TAB_INDEX
} from '../reducers/editor-tab';


// 生成器源文件
import initPythonGenerator from '../lib/block-generators/python'
import initArduinoGenerator from '../lib/block-generators/arduino'

// 方块定义文件
import initDefaultBlocks from '../lib/block-defenition/default'
import initUDPiBlocks from '../lib/block-defenition/udpi'
import initUDPiPlusBlocks from '../lib/block-defenition/udpi_plus'
import initUDBlockEXTBMFBlocks from '../lib/block-defenition/udblockextb_mf'
import initUDBlockEXTBSMBlocks from '../lib/block-defenition/udblockextb_sm'
import initUDBlockEXTBIOBlocks from '../lib/block-defenition/udblockextb_io'
import initUDBlockCarBlocks from '../lib/block-defenition/udblockextb_car'
import initUDBlockCamerabBlocks from '../lib/block-defenition/udblockcamerab'
import initUDBlockIOTBlocks from '../lib/block-defenition/udblockextb_iot'
import initUDBlockMicrobitBlocks from '../lib/block-defenition/udblock_microbit'
import initUDBlockMQTTBlocks from '../lib/block-defenition/udblock_mqtt'


import ModifyUDPi from '../lib/udrobot-modify/udpi'
import ModifyUDPiPlus from '../lib/udrobot-modify/udpi_plus'

const addFunctionListener = (object, property, callback) => {
    const oldFn = object[property];
    object[property] = function (...args) {
        const result = oldFn.apply(this, args);
        callback.apply(this, result);
        return result;
    };
};

const DroppableBlocks = DropAreaHOC([
    DragConstants.BACKPACK_CODE
])(BlocksComponent);

class Blocks extends React.Component {
    constructor(props) {
        super(props);

        this._firstInit = true;
        this._firstExtLoad = true;

        Blockly = VMScratchBlocks(props.vm);


        // 本地化
        Blockly.ScratchMsgs.locales["zh-cn"] =
        {
            "CONTROL_FOREVER": "重复执行",
            "CONTROL_REPEAT": "重复执行 %1 次",
            "CONTROL_IF": "如果 %1 那么",
            "CONTROL_ELSE": "否则",
            "CONTROL_STOP": "停止",
            "CONTROL_STOP_ALL": "全部脚本",
            "CONTROL_STOP_THIS": "这个脚本",
            "CONTROL_STOP_OTHER": "该角色的其他脚本",
            "CONTROL_WAIT": "等待 %1 秒",
            "CONTROL_WAITUNTIL": "等待 %1",
            "CONTROL_REPEATUNTIL": "重复执行直到 %1",
            "CONTROL_WHILE": "当 %1 重复执行",
            "CONTROL_FOREACH": "对于 %2 中的每个 %1",
            "CONTROL_STARTASCLONE": "当作为克隆体启动时",
            "CONTROL_CREATECLONEOF": "克隆 %1",
            "CONTROL_CREATECLONEOF_MYSELF": "自己",
            "CONTROL_DELETETHISCLONE": "删除此克隆体",
            "CONTROL_COUNTER": "计数器",
            "CONTROL_INCRCOUNTER": "计数器加一",
            "CONTROL_CLEARCOUNTER": "计数器归零",
            "CONTROL_ALLATONCE": "所有脚本",
            "DATA_SETVARIABLETO": "将 %1 设为 %2",
            "DATA_CHANGEVARIABLEBY": "将 %1 增加 %2",
            "DATA_SHOWVARIABLE": "调用全局变量 %1",
            "DATA_HIDEVARIABLE": "隐藏变量 %1",
            "DATA_ADDTOLIST": "将 %1 加入 %2",
            "DATA_DELETEOFLIST": "删除 %2 的第 %1 项",
            "DATA_DELETEALLOFLIST": "初始化列表 %1",
            "DATA_INSERTATLIST": "在 %3 的第 %2 项前插入 %1",
            "DATA_REPLACEITEMOFLIST": "将 %2 的第 %1 项替换为 %3",
            "DATA_ITEMOFLIST": "%2 的第 %1 项",
            "DATA_ITEMNUMOFLIST": "%2 中第一个 %1 的编号",
            "DATA_LENGTHOFLIST": "%1 的项目数",
            "DATA_LISTCONTAINSITEM": "%1 包含 %2 ?",
            "DATA_SHOWLIST": "显示列表 %1",
            "DATA_HIDELIST": "隐藏列表 %1",
            "DATA_INDEX_ALL": "全部",
            "DATA_INDEX_LAST": "末尾",
            "DATA_INDEX_RANDOM": "随机",
            "EVENT_WHENFLAGCLICKED": "当 %1 被点击",
            "EVENT_WHENTHISSPRITECLICKED": "当角色被点击",
            "EVENT_WHENSTAGECLICKED": "当舞台被点击",
            "EVENT_WHENTOUCHINGOBJECT": "当该角色碰到 %1",
            "EVENT_WHENBROADCASTRECEIVED": "当接收到 %1",
            "EVENT_WHENBACKDROPSWITCHESTO": "当背景换成 %1",
            "EVENT_WHENGREATERTHAN": "当 %1 > %2",
            "EVENT_WHENGREATERTHAN_TIMER": "计时器",
            "EVENT_WHENGREATERTHAN_LOUDNESS": "响度",
            "EVENT_BROADCAST": "广播 %1",
            "EVENT_BROADCASTANDWAIT": "广播 %1 并等待",
            "EVENT_WHENKEYPRESSED": "当按下 %1 键",
            "EVENT_WHENKEYPRESSED_SPACE": "空格",
            "EVENT_WHENKEYPRESSED_LEFT": "←",
            "EVENT_WHENKEYPRESSED_RIGHT": "→",
            "EVENT_WHENKEYPRESSED_DOWN": "↓",
            "EVENT_WHENKEYPRESSED_UP": "↑",
            "EVENT_WHENKEYPRESSED_ANY": "任意",
            "LOOKS_SAYFORSECS": "说 %1 %2 秒",
            "LOOKS_SAY": "说 %1",
            "LOOKS_HELLO": "你好！",
            "LOOKS_THINKFORSECS": "思考 %1 %2 秒",
            "LOOKS_THINK": "思考 %1",
            "LOOKS_HMM": "嗯……",
            "LOOKS_SHOW": "显示",
            "LOOKS_HIDE": "隐藏",
            "LOOKS_HIDEALLSPRITES": "隐藏所有角色",
            "LOOKS_EFFECT_COLOR": "颜色",
            "LOOKS_EFFECT_FISHEYE": "鱼眼",
            "LOOKS_EFFECT_WHIRL": "漩涡",
            "LOOKS_EFFECT_PIXELATE": "像素化",
            "LOOKS_EFFECT_MOSAIC": "马赛克",
            "LOOKS_EFFECT_BRIGHTNESS": "亮度",
            "LOOKS_EFFECT_GHOST": "虚像",
            "LOOKS_CHANGEEFFECTBY": "将 %1 特效增加 %2",
            "LOOKS_SETEFFECTTO": "将 %1 特效设定为 %2",
            "LOOKS_CLEARGRAPHICEFFECTS": "清除图形特效",
            "LOOKS_CHANGESIZEBY": "将大小增加 %1",
            "LOOKS_SETSIZETO": "将大小设为 %1",
            "LOOKS_SIZE": "大小",
            "LOOKS_CHANGESTRETCHBY": "伸缩%1",
            "LOOKS_SETSTRETCHTO": "设置伸缩为%1 %",
            "LOOKS_SWITCHCOSTUMETO": "换成 %1 造型",
            "LOOKS_NEXTCOSTUME": "下一个造型",
            "LOOKS_SWITCHBACKDROPTO": "换成 %1 背景",
            "LOOKS_GOTOFRONTBACK": "移到最 %1 ",
            "LOOKS_GOTOFRONTBACK_FRONT": "前面",
            "LOOKS_GOTOFRONTBACK_BACK": "后面",
            "LOOKS_GOFORWARDBACKWARDLAYERS": "%1 %2 层",
            "LOOKS_GOFORWARDBACKWARDLAYERS_FORWARD": "前移",
            "LOOKS_GOFORWARDBACKWARDLAYERS_BACKWARD": "后移",
            "LOOKS_BACKDROPNUMBERNAME": "背景 %1",
            "LOOKS_COSTUMENUMBERNAME": "造型 %1",
            "LOOKS_NUMBERNAME_NUMBER": "编号",
            "LOOKS_NUMBERNAME_NAME": "名称",
            "LOOKS_SWITCHBACKDROPTOANDWAIT": "换成 %1 背景并等待",
            "LOOKS_NEXTBACKDROP_BLOCK": "下一个背景",
            "LOOKS_NEXTBACKDROP": "下一个背景",
            "LOOKS_PREVIOUSBACKDROP": "上一个背景",
            "LOOKS_RANDOMBACKDROP": "随机背景",
            "MOTION_MOVESTEPS": "移动 %1 步",
            "MOTION_TURNLEFT": "左转 %1 %2 度",
            "MOTION_TURNRIGHT": "右转 %1 %2 度",
            "MOTION_POINTINDIRECTION": "面向 %1 方向",
            "MOTION_POINTTOWARDS": "面向 %1",
            "MOTION_POINTTOWARDS_POINTER": "鼠标指针",
            "MOTION_POINTTOWARDS_RANDOM": "随机方向",
            "MOTION_GOTO": "移到 %1",
            "MOTION_GOTO_POINTER": "鼠标指针",
            "MOTION_GOTO_RANDOM": "随机位置",
            "MOTION_GOTOXY": "移到 x: %1 y: %2",
            "MOTION_GLIDESECSTOXY": "在 %1 秒内滑行到 x: %2 y: %3",
            "MOTION_GLIDETO": "在 %1 秒内滑行到 %2",
            "MOTION_GLIDETO_POINTER": "鼠标指针",
            "MOTION_GLIDETO_RANDOM": "随机位置",
            "MOTION_CHANGEXBY": "将x坐标增加 %1",
            "MOTION_SETX": "将x坐标设为 %1",
            "MOTION_CHANGEYBY": "将y坐标增加 %1",
            "MOTION_SETY": "将y坐标设为 %1",
            "MOTION_IFONEDGEBOUNCE": "碰到边缘就反弹",
            "MOTION_SETROTATIONSTYLE": "将旋转方式设为 %1",
            "MOTION_SETROTATIONSTYLE_LEFTRIGHT": "左右翻转",
            "MOTION_SETROTATIONSTYLE_DONTROTATE": "不可旋转",
            "MOTION_SETROTATIONSTYLE_ALLAROUND": "任意旋转",
            "MOTION_XPOSITION": "x 坐标",
            "MOTION_YPOSITION": "y 坐标",
            "MOTION_DIRECTION": "方向",
            "MOTION_SCROLLRIGHT": "向右滚动 %1",
            "MOTION_SCROLLUP": "向上滚动 %1",
            "MOTION_ALIGNSCENE": "和场景 %1 对齐",
            "MOTION_ALIGNSCENE_BOTTOMLEFT": "左下角",
            "MOTION_ALIGNSCENE_BOTTOMRIGHT": "右下角",
            "MOTION_ALIGNSCENE_MIDDLE": "中间",
            "MOTION_ALIGNSCENE_TOPLEFT": "左上角",
            "MOTION_ALIGNSCENE_TOPRIGHT": "右上角",
            "MOTION_XSCROLL": "x滚动位置",
            "MOTION_YSCROLL": "y滚动位置",
            "MOTION_STAGE_SELECTED": "选中了舞台：不可使用运动类积木",
            "OPERATORS_ADD": "%1 + %2",
            "OPERATORS_SUBTRACT": "%1 - %2",
            "OPERATORS_MULTIPLY": "%1 * %2",
            "OPERATORS_DIVIDE": "%1 / %2",
            "OPERATORS_RANDOM": "在 %1 和 %2 之间取随机数",
            "OPERATORS_GT": "%1 > %2",
            "OPERATORS_LT": "%1 < %2",
            "OPERATORS_EQUALS": "%1 = %2",
            "OPERATORS_AND": "%1 与 %2",
            "OPERATORS_OR": "%1 或 %2",
            "OPERATORS_NOT": "%1 不成立",
            "OPERATORS_JOIN": "连接 %1 和 %2",
            "OPERATORS_JOIN_APPLE": "苹果",
            "OPERATORS_JOIN_BANANA": "香蕉",
            "OPERATORS_LETTEROF": "%2 的第 %1 个字符",
            "OPERATORS_LETTEROF_APPLE": "果",
            "OPERATORS_LENGTH": "%1 的字符数",
            "OPERATORS_CONTAINS": "%1 包含 %2 ?",
            "OPERATORS_MOD": "%1 除以 %2 的余数",
            "OPERATORS_ROUND": "四舍五入 %1",
            "OPERATORS_MATHOP": "%1 %2",
            "OPERATORS_MATHOP_ABS": "绝对值",
            "OPERATORS_MATHOP_FLOOR": "向下取整",
            "OPERATORS_MATHOP_CEILING": "向上取整",
            "OPERATORS_MATHOP_SQRT": "平方根",
            "OPERATORS_MATHOP_SIN": "sin",
            "OPERATORS_MATHOP_COS": "cos",
            "OPERATORS_MATHOP_TAN": "tan",
            "OPERATORS_MATHOP_ASIN": "asin",
            "OPERATORS_MATHOP_ACOS": "acos",
            "OPERATORS_MATHOP_ATAN": "atan",
            "OPERATORS_MATHOP_LN": "ln",
            "OPERATORS_MATHOP_LOG": "log",
            "OPERATORS_MATHOP_EEXP": "e ^",
            "OPERATORS_MATHOP_10EXP": "10 ^",
            "PROCEDURES_DEFINITION": "定义 %1",
            "SENSING_TOUCHINGOBJECT": "碰到 %1 ?",
            "SENSING_TOUCHINGOBJECT_POINTER": "鼠标指针",
            "SENSING_TOUCHINGOBJECT_EDGE": "舞台边缘",
            "SENSING_TOUCHINGCOLOR": "碰到颜色 %1 ?",
            "SENSING_COLORISTOUCHINGCOLOR": "颜色 %1 碰到 %2 ?",
            "SENSING_DISTANCETO": "到 %1 的距离",
            "SENSING_DISTANCETO_POINTER": "鼠标指针",
            "SENSING_ASKANDWAIT": "询问 %1 并等待",
            "SENSING_ASK_TEXT": "你叫什么名字？",
            "SENSING_ANSWER": "回答",
            "SENSING_KEYPRESSED": "按下 %1 键?",
            "SENSING_MOUSEDOWN": "按下鼠标?",
            "SENSING_MOUSEX": "鼠标的x坐标",
            "SENSING_MOUSEY": "鼠标的y坐标",
            "SENSING_SETDRAGMODE": "将拖动模式设为 %1",
            "SENSING_SETDRAGMODE_DRAGGABLE": "可拖动",
            "SENSING_SETDRAGMODE_NOTDRAGGABLE": "不可拖动",
            "SENSING_LOUDNESS": "响度",
            "SENSING_LOUD": "响声？",
            "SENSING_TIMER": "计时器",
            "SENSING_RESETTIMER": "计时器归零",
            "SENSING_OF": "%2 的 %1",
            "SENSING_OF_XPOSITION": "x 坐标",
            "SENSING_OF_YPOSITION": "y 坐标",
            "SENSING_OF_DIRECTION": "方向",
            "SENSING_OF_COSTUMENUMBER": "造型编号",
            "SENSING_OF_COSTUMENAME": "造型名称",
            "SENSING_OF_SIZE": "大小",
            "SENSING_OF_VOLUME": "音量",
            "SENSING_OF_BACKDROPNUMBER": "背景编号",
            "SENSING_OF_BACKDROPNAME": "背景名称",
            "SENSING_OF_STAGE": "舞台",
            "SENSING_CURRENT": "当前时间的 %1",
            "SENSING_CURRENT_YEAR": "年",
            "SENSING_CURRENT_MONTH": "月",
            "SENSING_CURRENT_DATE": "日",
            "SENSING_CURRENT_DAYOFWEEK": "星期",
            "SENSING_CURRENT_HOUR": "时",
            "SENSING_CURRENT_MINUTE": "分",
            "SENSING_CURRENT_SECOND": "秒",
            "SENSING_DAYSSINCE2000": "2000年至今的天数",
            "SENSING_USERNAME": "用户名",
            "SENSING_USERID": "用户id",
            "SOUND_PLAY": "播放声音 %1",
            "SOUND_PLAYUNTILDONE": "播放声音 %1 等待播完",
            "SOUND_STOPALLSOUNDS": "停止所有声音",
            "SOUND_SETEFFECTO": "将 %1 音效设为 %2",
            "SOUND_CHANGEEFFECTBY": "将 %1 音效增加 %2",
            "SOUND_CLEAREFFECTS": "清除音效",
            "SOUND_EFFECTS_PITCH": "音调",
            "SOUND_EFFECTS_PAN": "左右平衡",
            "SOUND_CHANGEVOLUMEBY": "将音量增加 %1",
            "SOUND_SETVOLUMETO": "将音量设为 %1%",
            "SOUND_VOLUME": "音量",
            "SOUND_RECORD": "录制…",
            "CATEGORY_MOTION": "运动",
            "CATEGORY_LOOKS": "外观",
            "CATEGORY_SOUND": "声音",
            "CATEGORY_EVENTS": "事件",
            "CATEGORY_CONTROL": "控制",
            "CATEGORY_SENSING": "侦测",
            "CATEGORY_OPERATORS": "运算",
            "CATEGORY_VARIABLES": "变量",
            "CATEGORY_MYBLOCKS": "自制积木",
            "DUPLICATE": "复制",
            "DELETE": "删除",
            "ADD_COMMENT": "添加注释",
            "REMOVE_COMMENT": "删除注释",
            "DELETE_BLOCK": "删除",
            "DELETE_X_BLOCKS": "删除 %1 积木",
            "DELETE_ALL_BLOCKS": "删除全部 %1 积木？",
            "CLEAN_UP": "整理积木",
            "HELP": "帮助",
            "UNDO": "撤销",
            "REDO": "重做",
            "EDIT_PROCEDURE": "编辑",
            "SHOW_PROCEDURE_DEFINITION": "查看定义",
            "WORKSPACE_COMMENT_DEFAULT_TEXT": "说些什么……",
            "COLOUR_HUE_LABEL": "颜色",
            "COLOUR_SATURATION_LABEL": "饱和度",
            "COLOUR_BRIGHTNESS_LABEL": "亮度",
            "CHANGE_VALUE_TITLE": "更改变量：",
            "RENAME_VARIABLE": "修改变量名",
            "RENAME_VARIABLE_TITLE": "将所有的「%1」变量名改为：",
            "RENAME_VARIABLE_MODAL_TITLE": "修改变量名",
            "NEW_VARIABLE": "建立一个变量",
            "NEW_VARIABLE_TITLE": "新变量名：",
            "VARIABLE_MODAL_TITLE": "新建变量",
            "VARIABLE_ALREADY_EXISTS": "已经存在名为「%1」的变量。",
            "VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE": "已经存在一个名为「%1」的变量，其类型为「%2」。",
            "DELETE_VARIABLE_CONFIRMATION": "删除%1处「%2」变量吗？",
            "CANNOT_DELETE_VARIABLE_PROCEDURE": "无法删除变量「%1」，因为函数「%2」的定义中用到了它",
            "DELETE_VARIABLE": "删除变量「%1」",
            "NEW_PROCEDURE": "制作新的积木",
            "PROCEDURE_ALREADY_EXISTS": "已经存在名为「%1」的程序。",
            "PROCEDURE_DEFAULT_NAME": "积木名称",
            "PROCEDURE_USED": "在删除一个积木定义前，请先把该积木从所有使用的地方删除。",
            "NEW_LIST": "建立一个列表",
            "NEW_LIST_TITLE": "新的列表名：",
            "LIST_MODAL_TITLE": "新建列表",
            "LIST_ALREADY_EXISTS": "名为 「%1」 的列表已存在。",
            "RENAME_LIST_TITLE": "将所有的「%1」列表改名为：",
            "RENAME_LIST_MODAL_TITLE": "修改列表名",
            "DEFAULT_LIST_ITEM": "'item'",
            "DELETE_LIST": "删除「%1」列表",
            "RENAME_LIST": "修改列表名",
            "NEW_BROADCAST_MESSAGE": "新消息",
            "NEW_BROADCAST_MESSAGE_TITLE": "新消息的名称：",
            "BROADCAST_MODAL_TITLE": "新消息",
            "DEFAULT_BROADCAST_MESSAGE_NAME": "消息1"
        };

        // 解决toLowerCase的问题
        Blockly.Names.prototype.getName = function (name, type) {
            if (name == null) {
                return ""
            }
            if (type == Blockly.Variables.NAME_TYPE) {
                var varName = this.getNameForUserVariable_(name);
                if (varName) {
                    name = varName;
                }
            }
            var normalized = name.toLowerCase() + '_' + type;

            var isVarType = type == Blockly.Variables.NAME_TYPE ||
                type == Blockly.Names.DEVELOPER_VARIABLE_TYPE;

            var prefix = isVarType ? this.variablePrefix_ : '';
            if (normalized in this.db_) {
                return prefix + this.db_[normalized];
            }
            var safeName = this.getDistinctName(name, type);
            this.db_[normalized] = safeName.substr(prefix.length);
            return safeName;
        };

        Blockly.VerticalFlyout.prototype.setMetrics_ = function (xyRatio) {
            var metrics = this.getMetrics_();
            // This is a fix to an apparent race condition.
            if (!metrics) {
                return;
            }
            function isNumber(obj) {
                return typeof obj === 'number' && isFinite(obj)
            }

            if (isNumber(xyRatio.y)) {
                this.workspace_.scrollY = -metrics.contentHeight * xyRatio.y;
            }
            this.workspace_.translate(this.workspace_.scrollX + metrics.absoluteLeft,
                this.workspace_.scrollY + metrics.absoluteTop);

            this.clipRect_.setAttribute('height', Math.max(0, metrics.viewHeight) + 'px');
            this.clipRect_.setAttribute('width', metrics.viewWidth + 100 + 'px');

            if (this.categoryScrollPositions) {
                this.selectCategoryByScrollPosition(-this.workspace_.scrollY);
            }
        };

        bindAll(this, [
            'attachVM',
            'detachVM',
            'getToolboxXML',
            'handleCategorySelected',
            'handleConnectionModalStart',
            'handleDrop',
            'handleStatusButtonUpdate',
            'handleOpenSoundRecorder',
            'handlePromptStart',
            'handlePromptCallback',
            'handlePromptClose',
            'handleCustomProceduresClose',
            'onScriptGlowOn',
            'onScriptGlowOff',
            'onBlockGlowOn',
            'onBlockGlowOff',
            'handleExtensionAdded',
            'handleBlocksInfoUpdate',
            'onTargetsUpdate',
            'onVisualReport',
            'onWorkspaceUpdate',
            'onWorkspaceMetricsChange',
            'setBlocks',
            'setLocale'
        ]);
        Blockly.prompt = this.handlePromptStart;
        Blockly.statusButtonCallback = this.handleConnectionModalStart;
        Blockly.recordSoundCallback = this.handleOpenSoundRecorder;

        // 初始化Python生成器
        initPythonGenerator();
        // 初始化Arduino生成器
        initArduinoGenerator();
        // 初始化默认方块
        initDefaultBlocks(Blockly);
        initUDPiBlocks(Blockly);
        initUDPiPlusBlocks(Blockly);
        initUDBlockEXTBMFBlocks(Blockly);
        initUDBlockEXTBSMBlocks(Blockly);
        initUDBlockEXTBIOBlocks(Blockly);
        initUDBlockCarBlocks(Blockly);
        initUDBlockCamerabBlocks(Blockly);
        initUDBlockIOTBlocks(Blockly);
        initUDBlockMicrobitBlocks(Blockly);
        initUDBlockMQTTBlocks(Blockly)

        // 回调函数
        Blockly.Python.Callbacks = {}
        Blockly.Python.hasLoop = false
        Blockly.Python.hasBtnCallback = false
        this.state = {
            prompt: null
        };
        this.onTargetsUpdate = debounce(this.onTargetsUpdate, 100);
        this.toolboxUpdateQueue = [];
    }

    // 更新代码方块
    updateCodeBox(workspace) {
        //Blockly.Msg.console.println("hello")
        //console.log(Blockly)
        let codeText = Blockly.Python.workspaceToCode(this.workspace);
        Blockly.Python._content = codeText;
        if (!Blockly.Python.hasLoop && Blockly.Python.hasBtnCallback){
            Blockly.Python._content += '\nwhile True:\n' +
            '  for c in btn_callbacks:c()\n'
        }
        let codeSplit = Blockly.Python._content.split("_E6_88_91_E7_9A_84_E5_8F_98_E9_87_8F = None");
        Blockly.Python._content = codeSplit.join("")
        //console.log(codeText)
        this.props.updatePyCode('# UDRobot MicroPython Code\n' + Blockly.Python._content)
        //console.log(this.props.pycode)

        if (this.props.editor != undefined) {
            console.log("editor undifined")
            this.props.editor.setValue(this.props.pycode);
        }


        //document.getElementById("UDCodeArea").firstChild.innerText = codeText
        //alert(codeText)
    }

    componentDidMount() {
        Blockly.FieldColourSlider.activateEyedropper_ = this.props.onActivateColorPicker;
        Blockly.Procedures.externalProcedureDefCallback = this.props.onActivateCustomProcedures;
        Blockly.ScratchMsgs.setLocale(this.props.locale);

        const workspaceConfig = defaultsDeep({},
            Blocks.defaultOptions,
            this.props.options,
            { rtl: this.props.isRtl, toolbox: this.props.toolboxXMLz}
        );
        this.workspace = Blockly.inject(this.blocks, workspaceConfig);
        this.workspace.addChangeListener(() => {
            if (this.props.editorMode == "code") {
                this.updateCodeBox(this.workspace)
            }
        })
        // Register buttons under new callback keys for creating variables,
        // lists, and procedures from extensions.

        const toolboxWorkspace = this.workspace.getFlyout().getWorkspace();

        const varListButtonCallback = type =>
            (() => Blockly.Variables.createVariable(this.workspace, null, type));
        const procButtonCallback = () => {
            Blockly.Procedures.createProcedureDefCallback_(this.workspace);
        };

        toolboxWorkspace.registerButtonCallback('MAKE_A_VARIABLE', varListButtonCallback(''));
        toolboxWorkspace.registerButtonCallback('MAKE_A_LIST', varListButtonCallback('list'));
        toolboxWorkspace.registerButtonCallback('MAKE_A_PROCEDURE', procButtonCallback);

        // Store the xml of the toolbox that is actually rendered.
        // This is used in componentDidUpdate instead of prevProps, because
        // the xml can change while e.g. on the costumes tab.
        this._renderedToolboxXML = this.props.toolboxXML;

        // we actually never want the workspace to enable "refresh toolbox" - this basically re-renders the
        // entire toolbox every time we reset the workspace.  We call updateToolbox as a part of
        // componentDidUpdate so the toolbox will still correctly be updated
        this.setToolboxRefreshEnabled = this.workspace.setToolboxRefreshEnabled.bind(this.workspace);
        this.workspace.setToolboxRefreshEnabled = () => {
            this.setToolboxRefreshEnabled(false);
        };

        // @todo change this when blockly supports UI events
        addFunctionListener(this.workspace, 'translate', this.onWorkspaceMetricsChange);
        addFunctionListener(this.workspace, 'zoom', this.onWorkspaceMetricsChange);

        this.attachVM();
        // Only update blocks/vm locale when visible to avoid sizing issues
        // If locale changes while not visible it will get handled in didUpdate
        if (this.props.isVisible) {
            this.setLocale();
        }


    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.state.prompt !== nextState.prompt ||
            this.props.isVisible !== nextProps.isVisible ||
            this._renderedToolboxXML !== nextProps.toolboxXML ||
            this.props.extensionLibraryVisible !== nextProps.extensionLibraryVisible ||
            this.props.customProceduresVisible !== nextProps.customProceduresVisible ||
            this.props.locale !== nextProps.locale ||
            this.props.anyModalVisible !== nextProps.anyModalVisible ||
            this.props.stageSize !== nextProps.stageSize
        );
    }
    componentDidUpdate(prevProps) {
        // If any modals are open, call hideChaff to close z-indexed field editors
        if (this.props.anyModalVisible && !prevProps.anyModalVisible) {
            Blockly.hideChaff();
        }

        // Only rerender the toolbox when the blocks are visible and the xml is
        // different from the previously rendered toolbox xml.
        // Do not check against prevProps.toolboxXML because that may not have been rendered.
        if (this.props.isVisible && this.props.toolboxXML !== this._renderedToolboxXML) {
            this.requestToolboxUpdate();
        }

        if (this.props.isVisible === prevProps.isVisible) {
            if (this.props.stageSize !== prevProps.stageSize) {
                // force workspace to redraw for the new stage size
                window.dispatchEvent(new Event('resize'));
            }
            return;
        }
        // @todo hack to resize blockly manually in case resize happened while hidden
        // @todo hack to reload the workspace due to gui bug #413
        if (this.props.isVisible) { // Scripts tab
            this.workspace.setVisible(true);
            if (prevProps.locale !== this.props.locale || this.props.locale !== this.props.vm.getLocale()) {
                // call setLocale if the locale has changed, or changed while the blocks were hidden.
                // vm.getLocale() will be out of sync if locale was changed while not visible
                this.setLocale();
            } else {
                this.props.vm.refreshWorkspace();
                this.requestToolboxUpdate();
            }

            window.dispatchEvent(new Event('resize'));
        } else {
            this.workspace.setVisible(false);
        }
    }
    componentWillUnmount() {
        this.detachVM();
        this.workspace.dispose();
        clearTimeout(this.toolboxUpdateTimeout);


    }
    requestToolboxUpdate() {
        clearTimeout(this.toolboxUpdateTimeout);
        this.toolboxUpdateTimeout = setTimeout(() => {
            this.updateToolbox();
        }, 0);
    }
    setLocale() {
        Blockly.ScratchMsgs.setLocale(this.props.locale);
        this.props.vm.setLocale(this.props.locale, this.props.messages)
            .then(() => {
                this.workspace.getFlyout().setRecyclingEnabled(false);
                this.props.vm.refreshWorkspace();
                this.requestToolboxUpdate();
                this.withToolboxUpdates(() => {
                    this.workspace.getFlyout().setRecyclingEnabled(true);
                });
            });
    }

    updateToolbox() {
        this.toolboxUpdateTimeout = false;

        const categoryId = this.workspace.toolbox_.getSelectedCategoryId();
        const offset = this.workspace.toolbox_.getCategoryScrollOffset();
        this.workspace.updateToolbox(this.props.toolboxXML);
        this._renderedToolboxXML = this.props.toolboxXML;

        // In order to catch any changes that mutate the toolbox during "normal runtime"
        // (variable changes/etc), re-enable toolbox refresh.
        // Using the setter function will rerender the entire toolbox which we just rendered.
        this.workspace.toolboxRefreshEnabled_ = true;

        const currentCategoryPos = this.workspace.toolbox_.getCategoryPositionById(categoryId);
        const currentCategoryLen = this.workspace.toolbox_.getCategoryLengthById(categoryId);
        if (offset < currentCategoryLen) {
            this.workspace.toolbox_.setFlyoutScrollPos(currentCategoryPos + offset);
        } else {
            this.workspace.toolbox_.setFlyoutScrollPos(currentCategoryPos);
        }

        const queue = this.toolboxUpdateQueue;
        this.toolboxUpdateQueue = [];
        queue.forEach(fn => fn());
    }

    withToolboxUpdates(fn) {
        // if there is a queued toolbox update, we need to wait
        if (this.toolboxUpdateTimeout) {
            this.toolboxUpdateQueue.push(fn);
        } else {
            fn();
        }
    }

    attachVM() {
        this.workspace.addChangeListener(this.props.vm.blockListener);
        this.flyoutWorkspace = this.workspace
            .getFlyout()
            .getWorkspace();
        this.flyoutWorkspace.addChangeListener(this.props.vm.flyoutBlockListener);
        this.flyoutWorkspace.addChangeListener(this.props.vm.monitorBlockListener);
        this.props.vm.addListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.addListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.addListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.addListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.addListener('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.addListener('workspaceUpdate', this.onWorkspaceUpdate);
        this.props.vm.addListener('targetsUpdate', this.onTargetsUpdate);
        this.props.vm.addListener('EXTENSION_ADDED', this.handleExtensionAdded);
        this.props.vm.addListener('BLOCKSINFO_UPDATE', this.handleBlocksInfoUpdate);
        this.props.vm.addListener('PERIPHERAL_CONNECTED', this.handleStatusButtonUpdate);
        this.props.vm.addListener('PERIPHERAL_DISCONNECTED', this.handleStatusButtonUpdate);
    }
    detachVM() {
        this.props.vm.removeListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.removeListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);
        this.props.vm.removeListener('BLOCK_GLOW_ON', this.onBlockGlowOn);
        this.props.vm.removeListener('BLOCK_GLOW_OFF', this.onBlockGlowOff);
        this.props.vm.removeListener('VISUAL_REPORT', this.onVisualReport);
        this.props.vm.removeListener('workspaceUpdate', this.onWorkspaceUpdate);
        this.props.vm.removeListener('targetsUpdate', this.onTargetsUpdate);
        this.props.vm.removeListener('EXTENSION_ADDED', this.handleExtensionAdded);
        this.props.vm.removeListener('BLOCKSINFO_UPDATE', this.handleBlocksInfoUpdate);
        this.props.vm.removeListener('PERIPHERAL_CONNECTED', this.handleStatusButtonUpdate);
        this.props.vm.removeListener('PERIPHERAL_DISCONNECTED', this.handleStatusButtonUpdate);
    }

    updateToolboxBlockValue(id, value) {
        this.withToolboxUpdates(() => {
            const block = this.workspace
                .getFlyout()
                .getWorkspace()
                .getBlockById(id);
            if (block) {
                block.inputList[0].fieldRow[0].setValue(value);
            }
        });
    }

    onTargetsUpdate() {
        if (this.props.vm.editingTarget && this.workspace.getFlyout()) {
            ['glide', 'move', 'set'].forEach(prefix => {
                this.updateToolboxBlockValue(`${prefix}x`, Math.round(this.props.vm.editingTarget.x).toString());
                this.updateToolboxBlockValue(`${prefix}y`, Math.round(this.props.vm.editingTarget.y).toString());
            });
        }
    }
    onWorkspaceMetricsChange() {
        const target = this.props.vm.editingTarget;
        if (target && target.id) {
            // Dispatch updateMetrics later, since onWorkspaceMetricsChange may be (very indirectly)
            // called from a reducer, i.e. when you create a custom procedure.
            // TODO: Is this a vehement hack?
            setTimeout(() => {
                this.props.updateMetrics({
                    targetID: target.id,
                    scrollX: this.workspace.scrollX,
                    scrollY: this.workspace.scrollY,
                    scale: this.workspace.scale
                });
            }, 0);
        }
    }
    onScriptGlowOn(data) {
        this.workspace.glowStack(data.id, true);
    }
    onScriptGlowOff(data) {
        this.workspace.glowStack(data.id, false);
    }
    onBlockGlowOn(data) {
        this.workspace.glowBlock(data.id, true);
    }
    onBlockGlowOff(data) {
        this.workspace.glowBlock(data.id, false);
    }
    onVisualReport(data) {
        this.workspace.reportValue(data.id, data.value);
    }
    getToolboxXML(isExtLoad) {
        // Use try/catch because this requires digging pretty deep into the VM
        // Code inside intentionally ignores several error situations (no stage, etc.)
        // Because they would get caught by this try/catch
        try {
            let { editingTarget: target, runtime } = this.props.vm;
            const stage = runtime.getTargetForStage();
            if (!target) target = stage; // If no editingTarget, use the stage

            const stageCostumes = stage.getCostumes();
            const targetCostumes = target.getCostumes();
            const targetSounds = target.getSounds();
            const dynamicBlocksXML = this.props.vm.runtime.getBlocksXML(target);
            console.log("blocks.jsx:", this.props.editorMode)

            switch (this.props.editorMode) {
                case "default":
                    return makeToolboxXML(false, target.isStage, target.id, dynamicBlocksXML,
                        targetCostumes[targetCostumes.length - 1].name,
                        stageCostumes[stageCostumes.length - 1].name,
                        targetSounds.length > 0 ? targetSounds[targetSounds.length - 1].name : ''
                    );
                case "code":
                    return makeCodeModeToolboxXML(false, target.isStage, target.id, dynamicBlocksXML,
                        targetCostumes[targetCostumes.length - 1].name,
                        stageCostumes[stageCostumes.length - 1].name,
                        targetSounds.length > 0 ? targetSounds[targetSounds.length - 1].name : ''
                    );

            }

        } catch {
            return null;
        }
    }
    onWorkspaceUpdate(data) {
        // When we change sprites, update the toolbox to have the new sprite's blocks
        const toolboxXML = this.getToolboxXML();
        if (toolboxXML) {
            this.props.updateToolboxState(toolboxXML);
        }

        if (this.props.vm.editingTarget && !this.props.workspaceMetrics.targets[this.props.vm.editingTarget.id]) {
            this.onWorkspaceMetricsChange();
        }

        // Remove and reattach the workspace listener (but allow flyout events)
        this.workspace.removeChangeListener(this.props.vm.blockListener);
        const dom = Blockly.Xml.textToDom(data.xml);
        try {
            Blockly.Xml.clearWorkspaceAndLoadFromXml(dom, this.workspace);
        } catch (error) {
            // The workspace is likely incomplete. What did update should be
            // functional.
            //
            // Instead of throwing the error, by logging it and continuing as
            // normal lets the other workspace update processes complete in the
            // gui and vm, which lets the vm run even if the workspace is
            // incomplete. Throwing the error would keep things like setting the
            // correct editing target from happening which can interfere with
            // some blocks and processes in the vm.
            if (error.message) {
                error.message = `Workspace Update Error: ${error.message}`;
            }
            log.error(error);
        }
        this.workspace.addChangeListener(this.props.vm.blockListener);

        if (this.props.vm.editingTarget && this.props.workspaceMetrics.targets[this.props.vm.editingTarget.id]) {
            const { scrollX, scrollY, scale } = this.props.workspaceMetrics.targets[this.props.vm.editingTarget.id];
            this.workspace.scrollX = scrollX;
            this.workspace.scrollY = scrollY;
            this.workspace.scale = scale;
            this.workspace.resize();
        }

        // Clear the undo state of the workspace since this is a
        // fresh workspace and we don't want any changes made to another sprites
        // workspace to be 'undone' here.
        this.workspace.clearUndo();
    }

    removeExtendBoards(a) {
        for (var i = 0; i < a.children.length; i++) {
            var category = a.children.item(i);
            // 找到motion分类，打印他的所有block
            if (String(category.getAttribute("id")).startsWith("udblockEXTB")) {
                category.remove();
            }
        }
    }

    getExtbCatogories(a) {
        var collect = []
        for (var i = 0; i < a.children.length; i++) {
            var category = a.children.item(i);
            // 找到motion分类，打印他的所有block
            if (String(category.getAttribute("id")).startsWith("udblockEXTB")) {
                collect.push(category)
            }
        }
        return collect;
    }

    getMotherBoardCatogories(a) {
        var collect = []
        for (var i = 0; i < a.children.length; i++) {
            var category = a.children.item(i);
            // 找到motion分类，打印他的所有block
            if (String(category.getAttribute("id")).startsWith("udblockUDPi")) {
                collect.push(category)
            }
        }
        return collect;
    }

    getCategory(a, id) {
        {
            for (var i = 0; i < a.children.length; i++) {
                var category = a.children.item(i);
                // 找到motion分类，打印他的所有block
                if (category.getAttribute("id") == id) {
                    return category;

                }
            }
            return null
        }
    }

    getCategoryBlocks(category) {
        // 收集插件方块
        var blockCollection = []
        for (var j = 0; j < category.children.length; j++) {
            var block = category.children.item(j);
            blockCollection.push(block);
        }
        console.log("收集到的方块: ", blockCollection)
        return blockCollection;
    }

    handleExtensionAdded(categoryInfo) {
        console.log("插件信息：", categoryInfo)
        const defineBlocks = blockInfoArray => {
            //console.log("blockInfoArray:", JSON.stringify(blockInfoArray))
            if (blockInfoArray && blockInfoArray.length > 0) {
                const staticBlocksJson = [];
                const dynamicBlocksInfo = [];
                dynamicBlocksInfo.push()
                blockInfoArray.forEach(blockInfo => {
                    if (blockInfo.info && blockInfo.info.isDynamic) {
                        dynamicBlocksInfo.push(blockInfo);
                    } else if (blockInfo.json) {
                        staticBlocksJson.push(blockInfo.json);
                    }
                    // otherwise it's a non-block entry such as '---'
                });

                Blockly.defineBlocksWithJsonArray(staticBlocksJson);
                dynamicBlocksInfo.forEach(blockInfo => {
                    // This is creating the block factory / constructor -- NOT a specific instance of the block.
                    // The factory should only know static info about the block: the category info and the opcode.
                    // Anything else will be picked up from the XML attached to the block instance.
                    const extendedOpcode = `${categoryInfo.id}_${blockInfo.info.opcode}`;
                    const blockDefinition =
                        defineDynamicBlock(Blockly, categoryInfo, blockInfo, extendedOpcode);
                    Blockly.Blocks[extendedOpcode] = blockDefinition;
                });


                // 修改工具箱的方块央样式
                ModifyUDPi(Blockly)
                ModifyUDPiPlus(Blockly)
                //this.updateToolbox()

                //this.handleBlocksInfoUpdate(categoryInfo);
            }
        };

        // scratch-blocks implements a menu or custom field as a special kind of block ("shadow" block)
        // these actually define blocks and MUST run regardless of the UI state
        defineBlocks(
            Object.getOwnPropertyNames(categoryInfo.customFieldTypes)
                .map(fieldTypeName => categoryInfo.customFieldTypes[fieldTypeName].scratchBlocksDefinition));
        defineBlocks(categoryInfo.menus);
        defineBlocks(categoryInfo.blocks);



        // Update the toolbox with new blocks if possible
        var toolboxXML = this.getToolboxXML(true);

        // if (toolboxXML) {
        //     // 创建新的XML
        //     var a = Blockly.Xml.textToDom(toolboxXML);
        //     var motherBoardCategories = this.getCategory(a, "udblockUDPi");

        //     if (motherBoardCategories.length <= 1) {
        //         // 判断插件类型，如果是拓展类型则判断主板是否添加，如果主板已经添加，则在主板的XML中添加拓展的XML
        //         if (String(categoryInfo.id).startsWith("udblockEXTB")) {// 是插件类型
        //             // 检查主板存在
        //             motherBoardCategory = motherBoardCategories[0]

        //             if (motherBoardCategory != null) {
        //                 motherBoardCategory = motherBoardCategories[0]
        //                 // 从XML中获取到插件
        //                 var extCategory = this.getCategory(a, categoryInfo.id);
        //                 var blockCollection = this.getCategoryBlocks(extCategory);

        //                 // 移除插件分类
        //                 console.log(blockCollection)
        //                 //extCategory.remove();
        //                 this.removeExtendBoards(a);

        //                 console.log(blockCollection)

        //                 // 先在主板分类里面添加一个标签
        //                 var label = document.createElement("label")
        //                 label.setAttribute("text", '子拓展 ' + categoryInfo.name)
        //                 motherBoardCategory.appendChild(label)

        //                 // 主板分类添加东西
        //                 for (var index in blockCollection) {
        //                     motherBoardCategory.appendChild(blockCollection[index]);
        //                 }

        //                 toolboxXML = Blockly.Xml.domToText(a);
        //                 console.log("新的工具箱XML：", toolboxXML)


        //             } else {
        //                 // var ext = this.getCategory(a, categoryInfo.id)
        //                 // if (ext != null) {
        //                 //     ext.remove();
        //                 // }
        //                 this.removeExtendBoards(a);
        //                 console.log("删除之前添加的拓展")
        //                 this.props.vm.deleteExtension(categoryInfo.id)

        //                 console.log("请先添加主板")
        //             }
        //         } else {
        //             if (String(categoryInfo.id).startsWith("udblockUDPi")) {
        //                 var mc = this.getMotherBoardCatogories(a)

        //                 // 是主板
        //                 this.removeExtendBoards(a);

        //             }
        //         }
        //     }

        //     toolboxXML = Blockly.Xml.domToText(a);
        this.props.updateToolboxState(toolboxXML);

    }
    handleBlocksInfoUpdate(categoryInfo) {
        // @todo Later we should replace this to avoid all the warnings from redefining blocks.
        this.handleExtensionAdded(categoryInfo);
    }
    handleCategorySelected(categoryId) {
        const extension = extensionData.find(ext => ext.extensionId === categoryId);
        if (extension && extension.launchPeripheralConnectionFlow) {
            this.handleConnectionModalStart(categoryId);
        }

        this.withToolboxUpdates(() => {
            this.workspace.toolbox_.setSelectedCategoryById(categoryId);
        });
    }
    setBlocks(blocks) {
        this.blocks = blocks;
    }
    handlePromptStart(message, defaultValue, callback, optTitle, optVarType) {
        const p = { prompt: { callback, message, defaultValue } };
        p.prompt.title = optTitle ? optTitle :
            Blockly.Msg.VARIABLE_MODAL_TITLE;
        p.prompt.varType = typeof optVarType === 'string' ?
            optVarType : Blockly.SCALAR_VARIABLE_TYPE;
        p.prompt.showVariableOptions = // This flag means that we should show variable/list options about scope
            optVarType !== Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE &&
            p.prompt.title !== Blockly.Msg.RENAME_VARIABLE_MODAL_TITLE &&
            p.prompt.title !== Blockly.Msg.RENAME_LIST_MODAL_TITLE;
        p.prompt.showCloudOption = (optVarType === Blockly.SCALAR_VARIABLE_TYPE) && this.props.canUseCloud;
        this.setState(p);
    }
    handleConnectionModalStart(extensionId) {
        this.props.onOpenConnectionModal(extensionId);
    }
    handleStatusButtonUpdate() {
        Blockly.refreshStatusButtons(this.workspace);
    }
    handleOpenSoundRecorder() {
        this.props.onOpenSoundRecorder();
    }

    /*
     * Pass along information about proposed name and variable options (scope and isCloud)
     * and additional potentially conflicting variable names from the VM
     * to the variable validation prompt callback used in scratch-blocks.
     */
    handlePromptCallback(input, variableOptions) {
        this.state.prompt.callback(
            input,
            this.props.vm.runtime.getAllVarNamesOfType(this.state.prompt.varType),
            variableOptions);
        this.handlePromptClose();
    }
    handlePromptClose() {
        this.setState({ prompt: null });
    }
    handleCustomProceduresClose(data) {
        this.props.onRequestCloseCustomProcedures(data);
        const ws = this.workspace;
        ws.refreshToolboxSelection_();
        ws.toolbox_.scrollToCategoryById('myBlocks');
    }
    handleDrop(dragInfo) {
        fetch(dragInfo.payload.bodyUrl)
            .then(response => response.json())
            .then(blocks => this.props.vm.shareBlocksToTarget(blocks, this.props.vm.editingTarget.id))
            .then(() => {
                this.props.vm.refreshWorkspace();
                this.updateToolbox(); // To show new variables/custom blocks
            });
    }
    render() {
        /* eslint-disable no-unused-vars */
        const {
            anyModalVisible,
            canUseCloud,
            customProceduresVisible,
            extensionLibraryVisible,
            options,
            stageSize,
            vm,
            isRtl,
            isVisible,
            onActivateColorPicker,
            onOpenConnectionModal,
            onOpenSoundRecorder,
            updateToolboxState,
            onActivateCustomProcedures,
            onRequestCloseExtensionLibrary,
            onRequestCloseCustomProcedures,
            toolboxXML,
            updateMetrics: updateMetricsProp,
            workspaceMetrics,
            editor,
            editorMode,
            ...props
        } = this.props;
        /* eslint-enable no-unused-vars */
        return (
            <React.Fragment>
                <DroppableBlocks
                    componentRef={this.setBlocks}
                    onDrop={this.handleDrop}
                    {...props}
                />
                {this.state.prompt ? (
                    <Prompt
                        defaultValue={this.state.prompt.defaultValue}
                        isStage={vm.runtime.getEditingTarget().isStage}
                        label={this.state.prompt.message}
                        showCloudOption={this.state.prompt.showCloudOption}
                        showVariableOptions={this.state.prompt.showVariableOptions}
                        title={this.state.prompt.title}
                        vm={vm}
                        onCancel={this.handlePromptClose}
                        onOk={this.handlePromptCallback}
                    />
                ) : null}
                {extensionLibraryVisible ? (
                    <ExtensionLibrary
                        vm={vm}
                        onCategorySelected={this.handleCategorySelected}
                        onRequestClose={onRequestCloseExtensionLibrary}
                    />
                ) : null}
                {customProceduresVisible ? (
                    <CustomProcedures
                        options={{
                            media: options.media
                        }}
                        onRequestClose={this.handleCustomProceduresClose}
                    />
                ) : null}
            </React.Fragment>
        );
    }
}

Blocks.propTypes = {
    anyModalVisible: PropTypes.bool,
    canUseCloud: PropTypes.bool,
    customProceduresVisible: PropTypes.bool,
    extensionLibraryVisible: PropTypes.bool,
    isRtl: PropTypes.bool,
    isVisible: PropTypes.bool,
    locale: PropTypes.string.isRequired,
    messages: PropTypes.objectOf(PropTypes.string),
    onActivateColorPicker: PropTypes.func,
    onActivateCustomProcedures: PropTypes.func,
    onOpenConnectionModal: PropTypes.func,
    onOpenSoundRecorder: PropTypes.func,
    onRequestCloseCustomProcedures: PropTypes.func,
    onRequestCloseExtensionLibrary: PropTypes.func,
    options: PropTypes.shape({
        media: PropTypes.string,
        zoom: PropTypes.shape({
            controls: PropTypes.bool,
            wheel: PropTypes.bool,
            startScale: PropTypes.number
        }),
        colours: PropTypes.shape({
            workspace: PropTypes.string,
            flyout: PropTypes.string,
            toolbox: PropTypes.string,
            toolboxSelected: PropTypes.string,
            scrollbar: PropTypes.string,
            scrollbarHover: PropTypes.string,
            insertionMarker: PropTypes.string,
            insertionMarkerOpacity: PropTypes.number,
            fieldShadow: PropTypes.string,
            dragShadowOpacity: PropTypes.number
        }),
        comments: PropTypes.bool,
        collapse: PropTypes.bool
    }),
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    toolboxXML: PropTypes.string,
    updateMetrics: PropTypes.func,
    updateToolboxState: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired,
    workspaceMetrics: PropTypes.shape({
        targets: PropTypes.objectOf(PropTypes.object)
    }),
    editorMode: PropTypes.string,
    editor: PropTypes.any,
    updatePyCode: PropTypes.func
};

Blocks.defaultOptions = {
    zoom: {
        controls: true,
        wheel: true,
        startScale: BLOCKS_DEFAULT_SCALE
    },
    grid: {
        spacing: 40,
        length: 2,
        colour: '#ddd'
    },
    colours: {
        workspace: '#F9F9F9',
        flyout: '#F9F9F9',
        toolbox: '#FFFFFF',
        toolboxSelected: '#E9EEF2',
        scrollbar: '#CECDCE',
        scrollbarHover: '#CECDCE',
        insertionMarker: '#000000',
        insertionMarkerOpacity: 0.2,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    },
    comments: true,
    collapse: false,
    sounds: false
};

Blocks.defaultProps = {
    isVisible: true,
    options: Blocks.defaultOptions,
};

const mapStateToProps = state => ({
    anyModalVisible: (
        Object.keys(state.scratchGui.modals).some(key => state.scratchGui.modals[key]) ||
        state.scratchGui.mode.isFullScreen
    ),
    extensionLibraryVisible: state.scratchGui.modals.extensionLibrary,
    isRtl: state.locales.isRtl,
    locale: state.locales.locale,
    messages: state.locales.messages,
    toolboxXML: state.scratchGui.toolbox.toolboxXML,
    customProceduresVisible: state.scratchGui.customProcedures.active,
    workspaceMetrics: state.scratchGui.workspaceMetrics,
    editor: state.editorRef.o,
    editorMode: state.editorMode.editorMode,
    pycode: state.pycode.value
});

const mapDispatchToProps = dispatch => ({
    onActivateColorPicker: callback => dispatch(activateColorPicker(callback)),
    onActivateCustomProcedures: (data, callback) => dispatch(activateCustomProcedures(data, callback)),
    onOpenConnectionModal: id => {
        dispatch(setConnectionModalExtensionId(id));
        dispatch(openConnectionModal());
    },
    onOpenSoundRecorder: () => {
        dispatch(activateTab(SOUNDS_TAB_INDEX));
        dispatch(openSoundRecorder());
    },
    onRequestCloseExtensionLibrary: () => {
        dispatch(closeExtensionLibrary());
    },
    onRequestCloseCustomProcedures: data => {
        dispatch(deactivateCustomProcedures(data));
    },
    updateToolboxState: toolboxXML => {
        dispatch(updateToolbox(toolboxXML));
    },
    updateMetrics: metrics => {
        dispatch(updateMetrics(metrics));
    },
    updatePyCode : code => {
        dispatch(updatePyCode(code));
    }

});

export default errorBoundaryHOC('Blocks')(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Blocks)
);
