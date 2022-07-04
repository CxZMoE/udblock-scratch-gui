import React from 'react'
import { connect } from 'react-redux'
import TerminalJS from '../../lib/terminaljs/terminal'
import PropTypes from 'prop-types'
import Box from '../box/box.jsx'
import classNames from 'classnames'
import styles from './terminal.css'

import { assignTerminal, removeTerminal } from '../../reducers/terminaljs'
import { bindAll } from 'lodash'
import { timeoutInitialState } from '../../reducers/timeout'

// 终端Terminal打印方法
var terminalJS = undefined
var getDateTimeString = function () {
    var date = new Date();
    return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
}
function wsOnMsg(e)  {
    console.log('comming  data')
    var data = e.data;
    terminalJS.print(`${getDateTimeString()} ${data}`)
    if (data.indexOf("OK") > -1) {
        console.log(`opencom:${terminalJS.com}`)
        Send(`opencom:${terminalJS.com}`)
    }
}
var Send = undefined
class TerminalComponent extends React.Component {
    constructor(props) {
        super(props);
        // TODO...
        bindAll(this, [
            'onPortSelect',
        ])

        this.state = {
            target: "UDTerminal",
            com: null
        }

        Send = this.Send
    }

    

    // 选择串口，并且更新串口的state
    onPortSelect(comName) {
        this.setState({
            com: comName
        })
        this.terminalJS.com = this.state.com;
        this.props.onCreateTerminal(this.terminalJS);
    }

    // 与服务端之间建立Websocket连接
    onConnectWS(terminalJS) {
        function connect(com) {
            try {
                var ws = new WebSocket("ws://127.0.0.1:12888/ws/client")
                // 为终端绑定一个Websocket对象
                terminalJS.ws = ws

                // 在Websocket连接建立的时候执行
                ws.onopen = (e) => {
                    console.log("Websocket尝试使用串口:", com)
                    Send(`closecom:${com}`)
                    Send(`opencom:${com}`)
                    setInterval(() => {
                        Send(`keep-alive>>`)
                    }, 2000);
                }
                ws.onmessage = wsOnMsg
                // 在Websocket连接建立失败后执行
                ws.onerror = function (ws, e) {
                    console.log("建立Websocket连接失败：" + String(e))
                    
                    // ws.close()
                }

                // 在Websocket连接关闭后执行
                ws.onclose = function (e) {
                    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                    console.log(e)

                    // Websocket连接必须保持在线，任何离线的情况都不应该发生
                    console.log("连接到WebSocket服务器失败，3秒后重新尝试连接。")
                    setTimeout(() => {
                        connect();
                    }, 3000);
                }
            } catch (ex) {
                console.log(ex)
            }
        }

        connect(terminalJS.com);
    }

    Send(msg){
        try{
            var ws = terminalJS.ws
            ws.send(msg)
        }catch(ex){
            console.log(ex)
            this.onConnectWS(terminalJS)
        }
    }
    // 终端组件成功挂载后发生
    componentDidMount() {
        this.terminalJS = new TerminalJS("UDTerminal-machine")

        terminalJS = this.terminalJS
        terminalJS.Send = this.Send
        this.onConnectWS(terminalJS);
        
        document.getElementById(this.state.target).appendChild(terminalJS.html);

        // 打开软件后在终端里面显示的内容
        terminalJS.print("欢迎使用UDBlock智慧儿童编程！");
        terminalJS.print("请在顶部菜单栏选择要连接的设备串口并点击“打开”");
        terminalJS.print("如果插上主板后没有听见滴的一声，请按下重启主板按钮后再试。");
        terminalJS.print("如果遇到上传代码卡住的情况，请按下重启主板按钮后再试。");
        terminalJS.setTextColor('lightgreen');

        this.props.onCreateTerminal(terminalJS);
        var selectPort = this.onPortSelect;


        // 获取端口Option元素
        var portSelect = document.getElementById("portSelect")

        // 端口更改Debug信息
        portSelect.onchange = function (e) {
            console.log("change to " + e.target.value)
            console.log(e.target)
            selectPort(e.target.value)
            terminalJS.com = e.target.value

        }

        // 定期刷新串口Option元素的内容
        setInterval(() => {
            var comState = this.state.com;  // 串口状态（串口号）

            // 请求获取当前设备的串口列表

            fetch(
                "http://127.0.0.1:12888/serialport"
            ).then(res => {
                return res.json()
            }).then((data) => {
                var portSelect = document.getElementById("portSelect")
                portSelect.innerHTML = ""

                // 解析返回的数据并且将可用串口添加到下拉选项中
                var serialportList = data
                for (var index in serialportList) {
                    // 不是USB设备则过滤
                    if (serialportList[index].isUSB == false) {
                        continue
                    }

                    // 创建新的下拉选项
                    var option = document.createElement("option");
                    // 命名规范：${串口号} - [UDRobot ${序列号}]
                    var portName = `${serialportList[index].name} - [UDRobot ${serialportList[index].sn}]`;
                    option.text = portName; // 串口号
                    option.value = serialportList[index].name; // 串口名字（串口号）

                    portSelect.appendChild(option)
                }

                // 每次扫描串口后
                // 如果上次已经选中的串口还在列表中
                // 则需要选中上次选择的串口
                // 否则串口选择会乱套
                for (var i = 0; i < portSelect.children.length; i++) {
                    // console.log(portSelect.children.item(i).innerText)
                    //console.log("当前串口: " + comState + " 实际选中串口: " + portSelect.children.item(i).value)
                    // 找到历史选中串口
                    if (portSelect.children.item(i).value == comState) {
                        //console.log(`选中历史串口: ${portSelect.children.item(i).value}`);
                        portSelect.children.item(i).selected = true;
                        selectPort(portSelect.children.item(i).value);
                        return;
                    }

                }

                // 没有找到，或者只有一个串口设备
                if (portSelect.children.length > 0) {
                    if ((portSelect.children.length == 1 || comState == null) && portSelect.children.item(0).value != null) {
                        //console.log(`选中默认串口: ${portSelect.children.item(0).value}`);
                        portSelect.children.item(0).selected = true;
                        selectPort(portSelect.children.item(0).value);
                    }
                }


                // 没有串口设备，则清空选中的串口
                if (portSelect.children.length == 0) {
                    selectPort("")
                    document.getElementById("serialOpenBtn").innerText = "打开"
                }
            })

        }, 1000);

        // 获取软件版本
        var request = new XMLHttpRequest();

        request.open("GET", "http://127.0.0.1:12888/version", true);
        request.send();

        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                terminalJS.print("软件版本: " + request.responseText)
                terminalJS.print("---------------------------")
            }
        }


        // [热键绑定] Ctrl + C 停止代码执行
        // document.addEventListener("keydown", function (e) {
        //     var keyCode = e.keyCode || e.charCode;
        //     if (keyCode == 67 && e.ctrlKey) {
        //         Send(`intcom:${terminalJS.com}`)
        //     }

        //     return false;
        // })

        terminalJS.print("---------------------------")

        document.getElementById("serialOpenBtn").onclick = function (e) {
            // 检查固件版本
            // var http = require('http')
            // http.get(`http://127.0.0.1:12888/check/firmware?com=${terminalJS.com}`, function (res) {
            //     var str = ''
            //     console.log(res)
            //     res.on('data', function (chunk) {
            //         console.log(chunk)
            //         str += chunk
            //     })
            //     res.on('end', function () {
            //         console.log(str)

            //         console.log(terminalJS.ws.readyState)

            //     })
            // })

            if (e.target.innerText == "打开") {
                var FVERSION = "0.5.8"
                console.log("打开串口:", terminalJS.com)
                if (terminalJS.ws == undefined && terminalJS.ws.readyState == terminalJS.ws.CLOSED) {
                    terminalJS.ws = new WebSocket("ws://127.0.0.1:12888/ws/client")
                }
                Send(`opencom:${terminalJS.com}`)
                terminalJS.ws.onmessage = wsOnMsg

                terminalJS.ws.onclose = function (e) {
                    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                    console.log(e)
                }

                e.target.innerText = "关闭"
            } else {
                if (terminalJS.ws == undefined && terminalJS.ws.readyState == terminalJS.ws.CLOSED) {
                    terminalJS.ws = new WebSocket("ws://127.0.0.1:12888/ws/client")
                }
                console.log("关闭串口:", terminalJS.com)
                Send(`closecom:${terminalJS.com}`)
                e.target.innerText = "打开"
                terminalJS.ws.onclose = function (e) {
                    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                    console.log(e)
                }
            }



        }
        document.getElementById("serialInput").onkeydown = function (e) {
            if (e.keyCode == 13) {
                e.preventDefault()
                var text = document.getElementById("serialInput").value;
                if (terminalJS.ws.readyState == terminalJS.ws.CLOSED) {
                    terminalJS.ws = new WebSocket("ws://127.0.0.1:12888/ws/client")

                    terminalJS.ws.onopen = (e) => {
                        // Send("closecom:COM3")
                        // Send("opencom:COM3")
                    }
                    terminalJS.ws.onmessage = wsOnMsg
                }

                Send(`writecom:${terminalJS.com}:${text}\r\n`)
                document.getElementById("serialInput").value = ""
            }
            if (e.ctrlKey && e.keyCode == 67){
                Send(`intcom:${terminalJS.com}`)
            }
        }
        document.getElementById("serialControlBtn").onclick = function (e) {
            e.preventDefault()
            var text = document.getElementById("serialInput").value;
            if (terminalJS.ws.readyState == terminalJS.ws.CLOSED) {
                terminalJS.ws = new WebSocket("ws://127.0.0.1:12888/ws/client")

                terminalJS.ws.onopen = (e) => {
                    // Send("closecom:COM3")
                    // Send("opencom:COM3")
                }
                terminalJS.ws.onmessage = wsOnMsg
            }

            Send(`writecom:${terminalJS.com}:${text}\r\n`)
            document.getElementById("serialInput").value = ""
        }
    }


    render() {
        return (
            <div
                id="UDTerminal"
                className={
                    classNames(styles.UDTerminal)
                }
            >

            </div>
        );
    }
}


TerminalComponent.defaultProps = {
    terminalTarget: undefined,
    terminal: undefined,
}

TerminalComponent.propTypes = {
    terminalTarget: PropTypes.string,
    terminal: PropTypes.any,
}

const mapStateToProps = state => ({
    terminal: state.terminal.o,
});

const mapDispatchToProps = dispatch => ({
    onCreateTerminal: (terminalObj) => dispatch(assignTerminal(terminalObj)),
    onRemoveTerminal: () => dispatch(removeTerminal()),
});


const Terminal = connect(
    mapStateToProps,
    mapDispatchToProps
)(TerminalComponent);


export default Terminal;