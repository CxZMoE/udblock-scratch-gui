import React from 'react';
import { FormattedMessage } from 'react-intl';

import musicIconURL from './music/music.png';
import musicInsetIconURL from './music/music-small.svg';

import penIconURL from './pen/pen.png';
import penInsetIconURL from './pen/pen-small.svg';

import videoSensingIconURL from './videoSensing/video-sensing.png';
import videoSensingInsetIconURL from './videoSensing/video-sensing-small.svg';

import text2speechIconURL from './text2speech/text2speech.png';
import text2speechInsetIconURL from './text2speech/text2speech-small.svg';

import translateIconURL from './translate/translate.png';
import translateInsetIconURL from './translate/translate-small.png';

import makeymakeyIconURL from './makeymakey/makeymakey.png';
import makeymakeyInsetIconURL from './makeymakey/makeymakey-small.svg';

import microbitIconURL from './microbit/microbit.png';
import microbitInsetIconURL from './microbit/microbit-small.svg';
import microbitConnectionIconURL from './microbit/microbit-illustration.svg';
import microbitConnectionSmallIconURL from './microbit/microbit-small.svg';

import ev3IconURL from './ev3/ev3.png';
import ev3InsetIconURL from './ev3/ev3-small.svg';
import ev3ConnectionIconURL from './ev3/ev3-hub-illustration.svg';
import ev3ConnectionSmallIconURL from './ev3/ev3-small.svg';

import wedo2IconURL from './wedo2/wedo.png'; // TODO: Rename file names to match variable/prop names?
import wedo2InsetIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionIconURL from './wedo2/wedo-illustration.svg';
import wedo2ConnectionSmallIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionTipIconURL from './wedo2/wedo-button-illustration.svg';

import boostIconURL from './boost/boost.png';
import boostInsetIconURL from './boost/boost-small.svg';
import boostConnectionIconURL from './boost/boost-illustration.svg';
import boostConnectionSmallIconURL from './boost/boost-small.svg';
import boostConnectionTipIconURL from './boost/boost-button-illustration.svg';

import gdxforIconURL from './gdxfor/gdxfor.png';
import gdxforInsetIconURL from './gdxfor/gdxfor-small.svg';
import gdxforConnectionIconURL from './gdxfor/gdxfor-illustration.svg';
import gdxforConnectionSmallIconURL from './gdxfor/gdxfor-small.svg';

import udpiIconURL from './udblock/udpi 开发板.png';
import udpiplusIconURL from './udblock/udpi plus开发板.png';
import udpiExtbMFIconURL from './udblock/udblock 多功能拓展版.png';
import udpiExtbSMIconURL from './udblock/udblock 电机拓展版.png';
import udpiExtbIOIconURL from './udblock/udblock IO拓展版.png';
import udpiExtbCarIconURL from './udblock/四驱小车主板.png';
import udpiExtbCar2WDIconURL from './udblock/双驱小车主板.png';
import udpiExtbIOTIconURL from './udblock/语音拓展版.png';
import udpiIconURLV2 from './udblock/udpi 开发板v2.png';
import udpiplusIconURLV2 from './udblock/udpi plus开发板v2.png';
import udpiExtbMFIconURLV2 from './udblock/udblock 多功能拓展版v2.png';
import udpiExtbSMIconURLV2 from './udblock/udblock 电机拓展版v2.png';
import udpiMiniIconURL from './udblock/ESP32核心板.png';
import udpiCarProIconURL from './udblock/四驱小车pro.png';
import rkNanoIconURL from './udblock/小凌派Nano.png';
import rkpiIconURL from './udblock/RKPi.png';
import rkExtbMFIconURL from './udblock/RK多功能拓展版.png';
import rkExtbIOTIconURL from './udblock/RK语音拓展版.png';
import utilToolClassIconURL from './udblock/工具类.png';

// import udpiInsetIconURL from './udblock-udpi/udpi-small.svg';
import udpiInsetIconURL from './bitmeta.svg';


function NewExtensionConfig(name, id, tags, description, iconUrl,collaborator="UDRobot"){
    return {
        name: name,
        tags: tags,
        extensionId: `${id}`,
        collaborator: 'UDRobot',
        iconURL: iconUrl,
        insetIconURL: udpiInsetIconURL,
        description: (
            description
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: false,
        useAutoScan: false,
        connectionIconURL: gdxforConnectionIconURL,
        connectionSmallIconURL: gdxforConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their force and acceleration sensor."
                id="gui.extension.gdxfor.connectingMessage"
            />
        ),
        helpLink: '#'
    }
}

export default [
    NewExtensionConfig('UDPi 主板 V2', 'udblockUDPiV2', ["主板"], "板载5x5 RGB 矩阵，可以连接多种外设。", udpiIconURLV2),
    NewExtensionConfig('UDPi Plus 主板 V2', 'udblockUDPiPlusV2', ["主板"], "一个集成了1.3寸的OLED屏幕、多种传感器、执行器的AI智慧型主板。", udpiplusIconURLV2),
    NewExtensionConfig('UDPi 主板', 'udblockUDPi', ["主板"], "板载5x5 RGB 矩阵，可以连接多种外设。", udpiIconURL),
    NewExtensionConfig('UDPi Plus 主板', 'udblockUDPiPlus', ["主板"], "一个集成了1.3寸的OLED屏幕、多种传感器、执行器的AI智慧型主板。", udpiplusIconURL),
    NewExtensionConfig('UDBlock 多功能拓展板', 'udblockEXTBMF', ["拓展板"], "支持外接6个RJ11设备以及自带2个电机和4个舵机接口，含有7个触摸按键，支持外接电源供电。", udpiExtbMFIconURL),
    NewExtensionConfig('UDBlock 电机拓展板', 'udblockEXTBSM', ["拓展板"], "RJ11和外接电机特别优化的拓展版，支持外接供电", udpiExtbSMIconURL),
    NewExtensionConfig('UDBlock IO拓展板', 'udblockEXTBIO', ["拓展板"], "支持外接8个RJ11设备，支持外接电源供电。", udpiExtbIOIconURL),
    NewExtensionConfig('UDPi+最小系统板V1', 'udblockUDPiMiniV1', ["主板"], "集了UDPI基本功能和拓展版特性的为一体的最小系统板，支持外接8个RJ11设备，支持外接电源供电。", udpiMiniIconURL),
    NewExtensionConfig('UDBlock 小车拓展板Pro', 'udblockEXTBCarPro', ["拓展板"], "四驱小车拓展版升级版，集成多种精密传感器，可以精确的控制移动的距离和速度。支持遥控控制，电池供电", udpiCarProIconURL),
    NewExtensionConfig('UDBlock 小车拓展板', 'udblockEXTBCar', ["拓展板"], "四驱小车拓展版，支持外接6个RJ11设备，以及遥控控制，电池供电。", udpiExtbCarIconURL),
    NewExtensionConfig('UDBlock 双驱小车拓展板', 'udblockEXTBCar2D', ["拓展板"], "双驱小车拓展版，支持外接6个RJ11设备，2个电机，以及遥控控制，电池供电。", udpiExtbCar2WDIconURL),
    NewExtensionConfig('UDBlock 智能语音拓展板','smart_speech', ["拓展板"], "支持外接4个RJ11设备，支持外接指纹模块和SD卡，支持在线、离线的语音识别以及在线语音听写，电池供电。", udpiExtbIOTIconURL),
    NewExtensionConfig('micro:bit主板', 'udblockMicrobit', ["主板"], "Micro-Bit主板支持MicroPython编程", microbitIconURL),

    // 传感器
    NewExtensionConfig('NFC传感器', 'nfcSensor', ["传感器"], "用于检测雨滴，或者水珠的出现。", utilToolClassIconURL),
    NewExtensionConfig('雨滴传感器', 'raindropSensor', ["传感器"], "用于检测雨滴，或者水珠的出现。", utilToolClassIconURL),
    NewExtensionConfig('声音传感器', 'soundSensor', ["传感器"], "检测声音的大小以及变化，返回声音大小的模拟量(0~4095)", utilToolClassIconURL),
    NewExtensionConfig('热释电传感器', 'rypoelectricSensor', ["传感器"], "检测人体和生物的靠近，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('智能灰度传感器', 'smartGrayscaleSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('颜色识别传感器', 'colorDetectSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('环境光传感器', 'lightAmpSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('超声波传感器', 'sonicSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('巡线传感器', 'routeFindingSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('火焰传感器', 'flameDetectSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('模拟灰度传感器', 'simGraySensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('烟雾传感器', 'smokeSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('风速传感器', 'windSpeedSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('土壤湿度传感器', 'dirtHumiditySensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('防水温度传感器', 'waterProofTempSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('DHT11传感器', 'dht11Sensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('四路红外巡线传感器', 'foutChanRouteFinderSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('八路按键模块', 'eightChnKeyboardSensor', ["传感器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),

    // 执行器
    NewExtensionConfig('I2C电机模块', 'i2cMotorModule', ["执行器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('四位数码管', 'digitalTube', ["执行器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('RGB灯带(15灯珠)', 'rgbStript15', ["执行器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('步进电机模块', 'stepperModule', ["执行器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('继电器模块(单路)', 'relayOneChn', ["执行器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('继电器模块(双路)', 'relayTwoChn', ["执行器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('I2C表情面板', 'i2cFacePanel', ["执行器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('OLED显示模组(128x64)', 'oledModuleSSD1306Of128M64', ["执行器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),
    NewExtensionConfig('比比智慧摄像头', 'bibiCamK210', ["执行器"], "支持学习和检测对象的灰度值，返回数字量(0/1)", utilToolClassIconURL),

    // 工具类
    NewExtensionConfig('UDBlock 拓展类', 'udblockUtils', ["工具"], "工具类，目前支持JSON格式文件处理、MQTT联网功能、I2C数据传输以及创建多线程。", utilToolClassIconURL),
    // {
    //     name: (
    //         <FormattedMessage
    //             defaultMessage="Music"
    //             description="Name for the 'Music' extension"
    //             id="gui.extension.music.name"
    //         />
    //     ),
    //     extensionId: 'music',
    //     iconURL: musicIconURL,
    //     insetIconURL: musicInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Play instruments and drums."
    //             description="Description for the 'Music' extension"
    //             id="gui.extension.music.description"
    //         />
    //     ),
    //     featured: true
    // },
    // {
    //     name: (
    //         <FormattedMessage
    //             defaultMessage="Pen"
    //             description="Name for the 'Pen' extension"
    //             id="gui.extension.pen.name"
    //         />
    //     ),
    //     extensionId: 'pen',
    //     iconURL: penIconURL,
    //     insetIconURL: penInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Draw with your sprites."
    //             description="Description for the 'Pen' extension"
    //             id="gui.extension.pen.description"
    //         />
    //     ),
    //     featured: true
    // },
    // {
    //     name: (
    //         <FormattedMessage
    //             defaultMessage="Video Sensing"
    //             description="Name for the 'Video Sensing' extension"
    //             id="gui.extension.videosensing.name"
    //         />
    //     ),
    //     extensionId: 'videoSensing',
    //     iconURL: videoSensingIconURL,
    //     insetIconURL: videoSensingInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Sense motion with the camera."
    //             description="Description for the 'Video Sensing' extension"
    //             id="gui.extension.videosensing.description"
    //         />
    //     ),
    //     featured: true
    // },
    // {
    //     name: (
    //         <FormattedMessage
    //             defaultMessage="Text to Speech"
    //             description="Name for the Text to Speech extension"
    //             id="gui.extension.text2speech.name"
    //         />
    //     ),
    //     extensionId: 'text2speech',
    //     collaborator: 'Amazon Web Services',
    //     iconURL: text2speechIconURL,
    //     insetIconURL: text2speechInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Make your projects talk."
    //             description="Description for the Text to speech extension"
    //             id="gui.extension.text2speech.description"
    //         />
    //     ),
    //     featured: true,
    //     internetConnectionRequired: true
    // },
    // {
    //     name: (
    //         <FormattedMessage
    //             defaultMessage="Translate"
    //             description="Name for the Translate extension"
    //             id="gui.extension.translate.name"
    //         />
    //     ),
    //     extensionId: 'translate',
    //     collaborator: 'Google',
    //     iconURL: translateIconURL,
    //     insetIconURL: translateInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Translate text into many languages."
    //             description="Description for the Translate extension"
    //             id="gui.extension.translate.description"
    //         />
    //     ),
    //     featured: true,
    //     internetConnectionRequired: true
    // },
    // {
    //     name: 'Makey Makey',
    //     extensionId: 'makeymakey',
    //     collaborator: 'JoyLabz',
    //     iconURL: makeymakeyIconURL,
    //     insetIconURL: makeymakeyInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Make anything into a key."
    //             description="Description for the 'Makey Makey' extension"
    //             id="gui.extension.makeymakey.description"
    //         />
    //     ),
    //     featured: true
    // },
    // {
    //     name: 'micro:bit',
    //     extensionId: 'microbit',
    //     collaborator: 'micro:bit',
    //     iconURL: microbitIconURL,
    //     insetIconURL: microbitInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Connect your projects with the world."
    //             description="Description for the 'micro:bit' extension"
    //             id="gui.extension.microbit.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: microbitConnectionIconURL,
    //     connectionSmallIconURL: microbitConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their micro:bit."
    //             id="gui.extension.microbit.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/microbit'
    // },
    // {
    //     name: 'LEGO MINDSTORMS EV3',
    //     extensionId: 'ev3',
    //     collaborator: 'LEGO',
    //     iconURL: ev3IconURL,
    //     insetIconURL: ev3InsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Build interactive robots and more."
    //             description="Description for the 'LEGO MINDSTORMS EV3' extension"
    //             id="gui.extension.ev3.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: ev3ConnectionIconURL,
    //     connectionSmallIconURL: ev3ConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
    //             description="Message to help people connect to their EV3. Must note the PIN should be 1234."
    //             id="gui.extension.ev3.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/ev3'
    // },
    // {
    //     name: 'LEGO BOOST',
    //     extensionId: 'boost',
    //     collaborator: 'LEGO',
    //     iconURL: boostIconURL,
    //     insetIconURL: boostInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Bring robotic creations to life."
    //             description="Description for the 'LEGO BOOST' extension"
    //             id="gui.extension.boost.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: true,
    //     connectionIconURL: boostConnectionIconURL,
    //     connectionSmallIconURL: boostConnectionSmallIconURL,
    //     connectionTipIconURL: boostConnectionTipIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their BOOST."
    //             id="gui.extension.boost.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/boost'
    // },
    // {
    //     name: 'LEGO Education WeDo 2.0',
    //     extensionId: 'wedo2',
    //     collaborator: 'LEGO',
    //     iconURL: wedo2IconURL,
    //     insetIconURL: wedo2InsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Build with motors and sensors."
    //             description="Description for the 'LEGO WeDo 2.0' extension"
    //             id="gui.extension.wedo2.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: true,
    //     connectionIconURL: wedo2ConnectionIconURL,
    //     connectionSmallIconURL: wedo2ConnectionSmallIconURL,
    //     connectionTipIconURL: wedo2ConnectionTipIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their WeDo."
    //             id="gui.extension.wedo2.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/wedo'
    // },
    // {
    //     name: 'Go Direct Force & Acceleration',
    //     extensionId: 'gdxfor',
    //     collaborator: 'Vernier',
    //     iconURL: gdxforIconURL,
    //     insetIconURL: gdxforInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Sense push, pull, motion, and spin."
    //             description="Description for the Vernier Go Direct Force and Acceleration sensor extension"
    //             id="gui.extension.gdxfor.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: gdxforConnectionIconURL,
    //     connectionSmallIconURL: gdxforConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their force and acceleration sensor."
    //             id="gui.extension.gdxfor.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/vernier'
    // },

];
