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
var getDateTimeString = function () {
    var date = new Date();
    return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
}

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
    }

    onPortSelect(comName) {
        this.setState({
            com: comName
        })
        this.terminalJS.com = this.state.com;
        this.props.onCreateTerminal(this.terminalJS);
    }

    onConnectWS(terminalJS) {
        function connect(com) {
            try {

                var ws = new WebSocket("ws://127.0.0.1:3000/ws/client")

                terminalJS.ws = ws
                ws.onopen = (e) => {
                    console.log("Websocket尝试使用串口:", com)
                    ws.send(`closecom:${com}`)
                    ws.send(`opencom:${com}`)
                }
                ws.onmessage = function (e) {
                    var data = window.atob(e.data)
                    terminalJS.print(data)
                }

                ws.onerror = function (ws, e) {
                    console.log("连接到WebSocket服务器失败，3秒后重新尝试连接。")
                    setTimeout(() => {
                        connect();
                    }, 3000);
                }
                ws.onclose = function (e) {
                    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                    console.log(e)
                }
            } catch (ex) {
                console.log(ex)

            }
        }

        connect(terminalJS.com);
    }
    componentDidMount() {
        this.terminalJS = new TerminalJS("UDTerminal-machine")

        var terminalJS = this.terminalJS

        this.onConnectWS(terminalJS);

        document.getElementById(this.state.target).appendChild(terminalJS.html);
        terminalJS.print("欢迎使用UDBlock+！");
        terminalJS.setTextColor('lightgreen');

        this.props.onCreateTerminal(terminalJS);

        var selectPort = this.onPortSelect;
        var portSelect = document.getElementById("portSelect")

        portSelect.onchange = function (e) {
            console.log("change to " + e.target.value)
            console.log(e.target)
            selectPort(e.target.value)
            terminalJS.com = e.target.value

        }

        setInterval(() => {
            var comState = this.state.com;

            // if (this.state.com != null) {
            //     //console.log(this.state.com)
            // }

            var request = new XMLHttpRequest();

            request.open("GET", "http://127.0.0.1:3000/serialport", true);
            request.send();


            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {

                    var portSelect = document.getElementById("portSelect")
                    portSelect.innerHTML = ""


                    var serialportList = JSON.parse(request.responseText)
                    for (var index in serialportList) {
                        if (serialportList[index].isUSB == false) {
                            continue
                        }
                        var option = document.createElement("option");
                        var portName = `${serialportList[index].name} - [UDRobot ${serialportList[index].sn}]`;
                        option.text = portName;
                        option.value = serialportList[index].name;

                        portSelect.appendChild(option)
                    }
                    for (var i = 0; i < portSelect.children.length; i++) {
                        // console.log(portSelect.children.item(i).innerText)
                        console.log("state: " + comState + " value: " + portSelect.children.item(i).value)
                        if (portSelect.children.item(i).value == comState) {
                            console.log(`选中历史串口: ${portSelect.children.item(i).value}`);
                            portSelect.children.item(i).selected = true;
                            selectPort(portSelect.children.item(i).value);
                            return;
                        }

                    }

                    if ((portSelect.children.length == 1 || comState == null) && portSelect.children.item(0).value != null) {
                        console.log(`选中默认串口: ${portSelect.children.item(0).value}`);
                        portSelect.children.item(0).selected = true;
                        selectPort(portSelect.children.item(0).value);
                    }

                }
            }

        }, 1000);

        document.addEventListener("keydown", function (e) {
            var keyCode = e.keyCode || e.charCode;
            if (keyCode == 67 && e.ctrlKey) {
                terminalJS.ws.send(`intcom:${terminalJS.com}`)
            }

            return false;
        })


        document.getElementById("serialOpenBtn").onclick = function (e) {
            // 检查固件版本
            // var http = require('http')
            // http.get(`http://127.0.0.1:3000/check/firmware?com=${terminalJS.com}`, function (res) {
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
                var FVERSION = "0.5.4"
                console.log("打开串口:", terminalJS.com)
                if (terminalJS.ws == undefined && terminalJS.ws.readyState == terminalJS.ws.CLOSED) {
                    terminalJS.ws = new WebSocket("ws://127.0.0.1:3000/ws/client")
                    terminalJS.ws.onopen = (e) => {
                        terminalJS.ws.send(`closecom:${terminalJS.com}`)
                        terminalJS.ws.send(`opencom:${terminalJS.com}`)
                    }
                    terminalJS.ws.onmessage = function (e) {
                        
                        var data = window.atob(e.data)
                        terminalJS.print(`${getDateTimeString()} ${data}`)
                        if (String(data).indexOf("FVERSION") > -1) {
                            if (String(data).substring(FVERSION.length, String(data).length).indexOf(FVERSION) > -1) {
                                console.log("当前版本为最新")
                            } else {
                                console.log(`主板固件需要更新版本：${FVERSION}`)
                                console.log(`当前版本：${data}`)
                                terminalJS.print(`主板固件需要更新版本：${FVERSION}`)
                                alert(` 主板固件需要更新版本：${FVERSION}\n 当前版本：${data}`)
                                terminalJS.print(`当前版本：${data}`)
                            }
                        }
                    }
                }
                terminalJS.ws.send(`closecom:${terminalJS.com}`)
                terminalJS.ws.send(`opencom:${terminalJS.com}`)
                terminalJS.ws.onmessage = function (e) {
                    
                    var data = window.atob(e.data)
                    terminalJS.print(`${getDateTimeString()} ${data}`)
                    if (String(data).indexOf("FVERSION") > -1) {
                        if (String(data).substring(FVERSION.length, String(data).length).indexOf(FVERSION) > -1) {
                            console.log("当前版本为最新")
                        } else {
                            console.log(`主板固件需要更新版本：${FVERSION}`)
                            console.log(`当前版本：${data}`)
                            terminalJS.print(`主板固件需要更新版本：${FVERSION}`)
                            alert(` 主板固件需要更新版本：${FVERSION}\n 当前版本：${data}`)
                            terminalJS.print(`当前版本：${data}`)
                        }
                    }
                }
                terminalJS.ws.onclose = function (e) {
                    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                    console.log(e)
                }

                e.target.innerText = "关闭"
            } else {
                console.log("关闭串口:", terminalJS.com)
                if (terminalJS.ws != undefined && terminalJS.ws.readyState == terminalJS.ws.OPEN) {
                    terminalJS.ws.send(`closecom:${terminalJS.com}`)
                    e.target.innerText = "打开"
                }
            }



        }
        document.getElementById("serialInput").onkeydown = function (e) {
            if (e.keyCode == 13) {
                e.preventDefault()
                var text = document.getElementById("serialInput").value;
                if (terminalJS.ws.readyState == terminalJS.ws.CLOSED) {
                    terminalJS.ws = new WebSocket("ws://127.0.0.1:3000/ws/client")

                    terminalJS.ws.onopen = (e) => {
                        // terminalJS.ws.send("closecom:COM3")
                        // terminalJS.ws.send("opencom:COM3")
                    }
                    terminalJS.ws.onmessage = function (e) {
                        //terminalJS.print(e.data)
                    }
                }

                terminalJS.ws.send(`writecom:${terminalJS.com}:${text}\r\n`)
                document.getElementById("serialInput").value = ""
            }
        }
        document.getElementById("serialControlBtn").onclick = function (e) {
            e.preventDefault()
            var text = document.getElementById("serialInput").value;
            if (terminalJS.ws.readyState == terminalJS.ws.CLOSED) {
                terminalJS.ws = new WebSocket("ws://127.0.0.1:3000/ws/client")

                terminalJS.ws.onopen = (e) => {
                    // terminalJS.ws.send("closecom:COM3")
                    // terminalJS.ws.send("opencom:COM3")
                }
                terminalJS.ws.onmessage = function (e) {
                    //terminalJS.print(e.data)
                }
            }

            terminalJS.ws.send(`writecom:${terminalJS.com}:${text}\r\n`)
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