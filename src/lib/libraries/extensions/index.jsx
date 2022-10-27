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


export default [
    // {
    //     name: 'RKPi主板',
    //     extensionId: 'udblockRKPi',
    //     collaborator: 'UDRobot',
    //     iconURL: rkpiIconURL,
    //     insetIconURL: udpiInsetIconURL,
    //     description: "基于RK2206定制的多功能主板",
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: false,
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
    //     helpLink: '#'
    // },
    // {
    //     name: 'RK2206 Nano',
    //     extensionId: 'udblockRKNano',
    //     collaborator: 'UDRobot',
    //     iconURL: rkNanoIconURL,
    //     insetIconURL: udpiInsetIconURL,
    //     description: "小凌派Nano",
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: false,
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
    //     helpLink: '#'
    // },
    // {
    //     name: 'RK多功能拓展板',
    //     extensionId: 'udblockEXTBRKMF',
    //     collaborator: 'UDRobot',
    //     iconURL: rkExtbMFIconURL,
    //     insetIconURL: udpiInsetIconURL,
    //     description: (
    //         "支持外接6个RJ11设备以及自带2个电机和4个舵机接口，含有7个触摸按键，支持外接电源供电。"
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: false,
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
    //     helpLink: '#'
    // },
    // {
    //     name: 'RK智能语音拓展板',
    //     extensionId: 'udblockEXTBRKIOT',
    //     collaborator: 'UDRobot',
    //     iconURL: rkExtbIOTIconURL,
    //     insetIconURL: udpiInsetIconURL,
    //     description: (
    //         "支持外接4个RJ11设备，支持外接指纹模块和SD卡，支持在线、离线的语音识别以及在线语音听写，电池供电。"
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: false,
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
    //     helpLink: '#'
    // },
    {
        name: 'UDPi 开发板 V2',
        extensionId: 'udblockUDPiV2',
        collaborator: 'UDRobot',
        iconURL: udpiIconURLV2,
        insetIconURL: udpiInsetIconURL,
        description: "板载5x5 RGB 矩阵，可以连接多种外设。",
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
    },
    {
        name: 'UDPi Plus开发板 V2',
        extensionId: 'udblockUDPiPlusV2',
        collaborator: 'UDRobot',
        iconURL: udpiplusIconURLV2,
        insetIconURL: udpiInsetIconURL,
        description: "一个集成了1.3寸的OLED屏幕、多种传感器、执行器的AI智慧型主板。",
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
    },
    {
        name: 'UDPi 开发板',
        extensionId: 'udblockUDPi',
        collaborator: 'UDRobot',
        iconURL: udpiIconURL,
        insetIconURL: udpiInsetIconURL,
        description: "板载5x5 RGB 矩阵，可以连接多种外设。",
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
    },
    {
        name: 'UDPi Plus开发板',
        extensionId: 'udblockUDPiPlus',
        collaborator: 'UDRobot',
        iconURL: udpiplusIconURL,
        insetIconURL: udpiInsetIconURL,
        description: "一个集成了1.3寸的OLED屏幕、多种传感器、执行器的AI智慧型主板。",
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
    },
    {
        name: 'UDBlock 多功能拓展板',
        extensionId: 'udblockEXTBMF',
        collaborator: 'UDRobot',
        iconURL: udpiExtbMFIconURL,
        insetIconURL: udpiInsetIconURL,
        description: (
            "支持外接6个RJ11设备以及自带2个电机和4个舵机接口，含有7个触摸按键，支持外接电源供电。"
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
    },
    // {
    //     name: 'UDBlock 电机拓展板 V2',
    //     extensionId: 'udblockEXTBSMV2',
    //     collaborator: 'UDRobot',
    //     iconURL: udpiExtbSMIconURLV2,
    //     insetIconURL: udpiInsetIconURL,
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
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: false,
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
    //     helpLink: '#'
    // },
    // {
    //     name: 'UDBlock 多功能拓展板 V2',
    //     extensionId: 'udblockEXTBMFV2',
    //     collaborator: 'UDRobot',
    //     iconURL: udpiExtbMFIconURLV2,
    //     insetIconURL: udpiInsetIconURL,
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
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: false,
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
    //     helpLink: '#'
    // },
    {
        name: 'UDBlock 电机拓展板',
        extensionId: 'udblockEXTBSM',
        collaborator: 'UDRobot',
        iconURL: udpiExtbSMIconURL,
        insetIconURL: udpiInsetIconURL,
        description: (
            "RJ11和外接电机特别优化的拓展版，支持外接供电"
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
    },
    {
        name: 'UDBlock IO拓展板',
        extensionId: 'udblockEXTBIO',
        collaborator: 'UDRobot',
        iconURL: udpiExtbIOIconURL,
        insetIconURL: udpiInsetIconURL,
        description: (
            "支持外接8个RJ11设备，支持外接电源供电。"
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
    },
    {
        name: 'UDPi+最小系统板V1',
        extensionId: 'udblockUDPiMiniV1',
        collaborator: 'UDRobot',
        // iconURL: udpiplusIconURLV2,
        // insetIconURL: udpiInsetIconURL,
        iconURL: udpiMiniIconURL,
        insetIconURL: udpiInsetIconURL,
        description: "集了UDPI基本功能和拓展版特性的为一体的最小系统板，支持外接8个RJ11设备，支持外接电源供电。",
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
    },
    {
        name: 'UDBlock 小车拓展板Pro',
        extensionId: 'udblockEXTBCarPro',
        collaborator: 'UDRobot',
        iconURL: udpiCarProIconURL,
        insetIconURL: udpiInsetIconURL,
        description: (
            "四驱小车拓展版升级版，集成多种精密传感器，可以精确的控制移动的距离和速度。支持遥控控制，电池供电"
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
    },
    {
        name: 'UDBlock 小车拓展板',
        extensionId: 'udblockEXTBCar',
        collaborator: 'UDRobot',
        iconURL: udpiExtbCarIconURL,
        insetIconURL: udpiInsetIconURL,
        description: (
            "四驱小车拓展版，支持外接6个RJ11设备，以及遥控控制，电池供电。"
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
    },
    {
        name: 'UDBlock 双驱小车拓展板',
        extensionId: 'udblockEXTBCar2D',
        collaborator: 'UDRobot',
        iconURL: udpiExtbCar2WDIconURL,
        insetIconURL: udpiInsetIconURL,
        description: (
            "双驱小车拓展版，支持外接6个RJ11设备，2个电机，以及遥控控制，电池供电。"
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
    },
    {
        name: 'UDBlock 智能语音拓展板',
        extensionId: 'udblockEXTBIOT',
        collaborator: 'UDRobot',
        iconURL: udpiExtbIOTIconURL,
        insetIconURL: udpiInsetIconURL,
        description: (
            "支持外接4个RJ11设备，支持外接指纹模块和SD卡，支持在线、离线的语音识别以及在线语音听写，电池供电。"
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
    },
    {
        name: 'UDBlock 拓展类',
        extensionId: 'udblockUtils',
        collaborator: 'UDRobot',
        iconURL: utilToolClassIconURL,
        insetIconURL: udpiInsetIconURL,
        description: (
            "工具类，目前支持JSON格式文件处理、MQTT联网功能、I2C数据传输以及创建多线程。"
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
    },
    // {
    //     name: 'UDBlock MQTT拓展库',
    //     extensionId: 'udblockMQTT',
    //     collaborator: 'UDRobot',
    //     iconURL: udpiExtbSMIconURL,
    //     insetIconURL: udpiInsetIconURL,
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
    //     internetConnectionRequired: false,
    //     launchPeripheralConnectionFlow: false,
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
    //     helpLink: '#'
    // },
    {
        name: 'micro:bit主板',
        extensionId: 'udblockMicrobit',
        collaborator: 'micro:bit UDRobot',
        iconURL: microbitIconURL,
        insetIconURL: microbitInsetIconURL,
        description: (
            "Micro-Bit主板适配MicroPython"
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: false,
        launchPeripheralConnectionFlow: false,
        useAutoScan: false,
        connectionIconURL: microbitConnectionIconURL,
        connectionSmallIconURL: microbitConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their micro:bit."
                id="gui.extension.microbit.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/microbit'
    },
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
