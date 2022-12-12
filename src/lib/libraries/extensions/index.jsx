import React from 'react';
import { FormattedMessage } from 'react-intl';

import gdxforConnectionIconURL from './gdxfor/gdxfor-illustration.svg';
import gdxforConnectionSmallIconURL from './gdxfor/gdxfor-small.svg';


import rkNanoIconURL from './udblock/小凌派Nano.png';
// import rkpiIconURL from './udblock/RKPi.png';
import rkExtbMFIconURL from './udblock/RK多功能拓展版.png';
import rkExtbIOTIconURL from './udblock/RK语音拓展版.png';
import utilToolClassIconURL from './udblock/拓展工具类.png';
import udpiInsetIconURL from './lzdz.png';


export default [
    {
        name: 'RK2206 Nano',
        extensionId: 'udblockRKNano',
        collaborator: '比特元科技',
        iconURL: rkNanoIconURL,
        insetIconURL: udpiInsetIconURL,
        description: "基于RK2206芯片组，使用开源鸿蒙系统开发，支持MicroPython编程。可与多种拓展板自由组合，尽情发挥创作的激情。",
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
        name: 'RK多功能拓展板',
        extensionId: 'udblockEXTBRKMF',
        collaborator: '比特元科技',
        iconURL: rkExtbMFIconURL,
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
    {
        name: 'RK智能语音拓展板',
        extensionId: 'udblockEXTBRKIOT',
        collaborator: '比特元科技',
        iconURL: rkExtbIOTIconURL,
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
        name: '拓展工具类',
        extensionId: 'udblockUtils',
        collaborator: '比特元科技',
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
];
