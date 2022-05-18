import React from "react";
import PropTypes, { func } from 'prop-types';
import styles from './monica-editor.css';
//import Terminal from 'terminal-in-react';
import Box from '../../components/box/box.jsx';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { getStageDimensions } from '../../lib/screen-utils.js';

// Monaco 编辑器 Loader
import loader from "@monaco-editor/loader";
import { editorCreate, editorDelete } from "../../reducers/editor-ref";
// 文件系统
import pseudoFileSystemPlugin from 'terminal-in-react-pseudo-file-system-plugin';
const FileSystemPlugin = pseudoFileSystemPlugin();

// TerminalJS
import Terminal from '../terminal/terminal.jsx'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-xcode";

import { updatePyCode } from '../../reducers/pycode'

import VMScratchBlocks from '../../lib/blocks';

class MonicaEditor extends React.Component {
    constructor(props) {
        super(props)

    }
    //

    loadMonaco() {
        try {
            console.log("加载编辑器")
            loader.init().then(monaco => {
                console.log("加载Monaco编辑器")
                const wrapper = document.getElementById("monaco-editor-dom");
                const properties = {
                    value: "# UDRobot MicroPython Code",
                    language: "python",
                    minimap: {
                        enabled: false
                    }
                }
                var editor = monaco.editor.create(wrapper, properties);
                this.props.onEditorCreate(editor);
                window.onresize = function () {
                    if (editor) {
                        editor.layout();

                    }
                };

            })
        } catch (ex) {
            console.log(ex)

            var monacoDom = document.getElementById("monaco-editor-dom");
            var textArea = document.createElement("textarea")

            textArea.setValue = (text) => { textArea.innerText = text };
            monacoDom.appendChild(textArea)
            this.props.onEditorCreate(textArea);
        }
    }




    componentDidMount() {
        //this.loadMonaco();

    }

    render() {
        const stageSize = this.props.stageSize;
        const stageDimensions = getStageDimensions(stageSize, false);

        return (
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexGrow: "1",
                    borderRadius: "5px",
                    border: "1px solid hsla(0, 0%, 0%, 0.15)",
                    marginTop: "45px",
                    backgroundColor: "#fff",
                    padding: "10px",
                    overflow: "hidden",
                    flexGrow: "1",
                    flexWrap: "nowrap"
                }}
            >
                <Box
                    style={{
                        borderRadius: "5px",
                        // border: "1px solid hsla(0, 0%, 0%, 0.15)",
                        height: "50%",
                        maxHeight: "50%",
                        width: "100%",
                    }}
                >
                    <div
                        id="monaco-editor-dom"
                        style={{
                            height: "100%"
                        }}

                    >

                        <AceEditor
                            mode="python"
                            theme="xcode"
                            onChange={(newText)=>{
                                console.log("change", newText);
                                if (Blockly != undefined){
                                    Blockly.Python._content = newText;
                                }
                                if (this.props.updatePyCode){
                                    this.props.updatePyCode(newText)
                                }
                                

                            }}
                            name="ace_editor"
                            editorProps={{ $blockScrolling: true }}
                            value={this.props.pycode}
                            height={'100%'}
                            width={'100%'}
                            // setOptions={{
                            //     enableBasicAutocompletion: true,
                            //     enableLiveAutocompletion: true,
                            //     enableSnippets: true
                            // }}
                        />
                    </div>
                </Box>


                <Box
                    style={{
                        position: "relative",
                        fontWeight: "bold",
                        alignSelf: "center",
                        height: "50%",
                        maxHeight: "50%",
                        width: "100%",
                        marginTop: "10px",
                        // marginBottom: "20px",
                        borderRadius: "5px",
                        // border: "1px solid hsla(0, 0%, 0%, 0.15)",
                        padding: "5px",
                        flexGrow: "1",
                    }}
                >
                    {/* <Terminal
                        color='green'
                        backgroundColor='black'
                        barColor='black'
                        hideTopBar={true}
                        style={{
                            maxHeight: "calc(50% - 20px)",
                        }}
                        commands={{
                            blog: () => window.open("https://forum.udrobot.net/", "_blank"),
                            popup: () => alert('Terminal Program'),
                            run: {
                                method: (args, print, aa) => {
                                    print(`command: run`);
                                },
                            },
                            upload: () => { },
                        }}
                        descriptions={{
                            'show': '显示消息',
                            'help': '显示帮助信息',
                            'clear': '清屏',
                            'blog': '打开UDRobot论坛首页',
                            'upload': "上传固件",
                            "run": "运行代码",
                            popup: '显示弹出框'
                        }}
                        msg='输入 "help" 查看指令 '
                        plugins={[
                            FileSystemPlugin
                        ]}
                    /> */}
                    <Terminal
                        style={{
                            height: "100%",
                        }}
                    >

                    </Terminal>

                </Box>
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "35px"
                    }}
                >
                    {/* <input id="serialInput" className={classNames(styles.serialInput)} type="text" placeholder="输入要发送的消息"></input> */}
                    
                    {/* <span id="serialControlBtn" className={classNames(styles.serialBtn)}>发送</span> */}
                </Box>

            </Box>
        )
    }
}

MonicaEditor.propTypes = {
    stageSize: PropTypes.any,
    updatePyCode: PropTypes.func
};

const mapStateToProps = state => ({
    pycode: state.pycode.value
})

const mapDispatchToProps = dispatch => ({
    onEditorCreate: (editor) => dispatch(editorCreate(editor)),
    onEditorDelete: (editor) => dispatch(editorDelete(editor)),
    updatePyCode: (code) => dispatch(updatePyCode(code))
});

const MonicaEditorWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonicaEditor)


export default MonicaEditorWrapper