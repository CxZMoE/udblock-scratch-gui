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
                    terminalJS.print(e.data)
                }

                ws.onerror = function (ws, e) {
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

                        if (portSelect.children.item(i).innerText == comState) {
                            console.log(`选中历史串口: ${portSelect.children.item(i).value}`);
                            portSelect.children.item(i).selected = true;
                            selectPort(portSelect.children.item(i).value);
                            return;
                        }

                    }

                    if (portSelect.children.length > 0) {
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
            console.log(terminalJS.ws.readyState)
            if (e.target.innerText == "打开串口") {
                console.log("打开串口:", terminalJS.com)
                if (terminalJS.ws == undefined && terminalJS.ws.readyState == terminalJS.ws.CLOSED) {
                    terminalJS.ws = new WebSocket("ws://127.0.0.1:3000/ws/client")
                    terminalJS.ws.onopen = (e) => {
                        terminalJS.ws.send(`closecom:${terminalJS.com}`)
                        terminalJS.ws.send(`opencom:${terminalJS.com}`)
                    }
                    terminalJS.ws.onmessage = function (e) {
                        terminalJS.print(e.data)
                    }
                }
                terminalJS.ws.send(`closecom:${terminalJS.com}`)
                terminalJS.ws.send(`opencom:${terminalJS.com}`)
                terminalJS.ws.onmessage = function (e) {
                    terminalJS.print(e.data)
                }


                e.target.innerText = "关闭串口"
            } else {
                console.log("关闭串口:", terminalJS.com)
                if (terminalJS.ws != undefined && terminalJS.ws.readyState == terminalJS.ws.OPEN) {
                    terminalJS.ws.send(`closecom:${terminalJS.com}`)
                    e.target.innerText = "打开串口"
                }
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

            // terminal.ws.send("closecom:COM3")

            //terminalJS.print(text);
            terminalJS.ws.send(`writecom:${terminalJS.com}:${text}\r\n`)
            // var request = new XMLHttpRequest();
            // request.open("POST", "http://127.0.0.1:3000/ampy/upload", true);
            // request.send(JSON.stringify({
            //     sourceCode: this.props.editor.getModel().getValue(),
            //     com: terminal.com
            // }))
            // request.onreadystatechange = function (e) {
            //     if (request.readyState == 4 && request.status == 200) {
            //         var response = request.responseText;
            //         console.log(response)
            //         terminal.print("上传代码成功");
            //         terminal.ws.send("opencom:COM3")
            //     }
            // }
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