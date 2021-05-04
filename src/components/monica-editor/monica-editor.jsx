import React from "react";
import PropTypes from 'prop-types';
import styles from './monica-editor.css';
//import Terminal from 'terminal-in-react';
import Box from '../../components/box/box.jsx';
import { connect } from 'react-redux';


import { getStageDimensions } from '../../lib/screen-utils.js';

// Monaco 编辑器 Loader
import loader from "@monaco-editor/loader";
import { editorCreate, editorDelete } from "../../reducers/editor-ref";
// 文件系统
import pseudoFileSystemPlugin from 'terminal-in-react-pseudo-file-system-plugin';
const FileSystemPlugin = pseudoFileSystemPlugin();

// TerminalJS
import Terminal from '../terminal/terminal.jsx'

class MonicaEditor extends React.Component {
    constructor(props) {
        super(props)

    }
    //

    loadMonaco() {
        loader.init().then(monaco => {
            console.log("加载Monaco编辑器")
            const wrapper = document.getElementById("monaco-editor-dom");
            const properties = {
                value: "# UDRobot 儿童指挥编程",
                language: "python",
            }
            let editor = monaco.editor.create(wrapper, properties);
            this.props.onEditorCreate(editor);
            window.onresize = function () {
                if (editor) {
                    editor.layout();

                }
            };
        })
    }

    componentDidMount() {
        this.loadMonaco();
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
                    height: "100%",
                    width: stageDimensions.width,
                    borderRadius: "5px",
                    border: "1px solid hsla(0, 0%, 0%, 0.15)",
                    marginTop: "45px",
                    backgroundColor: "#FFF",
                    padding: "10px"
                }}
            >
                <Box
                    style={{
                        borderRadius: "5px",
                        border: "1px solid hsla(0, 0%, 0%, 0.15)",
                        minHeight: "50%",
                        width: (stageDimensions.width - 10) + "px",
                    }}
                >
                    <div
                        id="monaco-editor-dom"
                        style={{
                            height: "100%"
                        }}
                    ></div>
                </Box>


                <Box
                    style={{
                        position: "relative",
                        fontWeight: "bold",
                        alignSelf: "center",
                        height: "100%",
                        width: (stageDimensions.width - 10) + "px",
                        marginTop: "10px",
                        marginBottom: "20px",
                        borderRadius: "5px",
                        border: "1px solid hsla(0, 0%, 0%, 0.15)",
                        padding: "5px"
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
                            height: "100%"
                        }}
                    >

                    </Terminal>

                </Box>

            </Box>
        )
    }
}

MonicaEditor.propTypes = {
    stageSize: PropTypes.any
};

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    onEditorCreate: (editor) => dispatch(editorCreate(editor)),
    onEditorDelete: (editor) => dispatch(editorDelete(editor))
});

const MonicaEditorWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonicaEditor)


export default MonicaEditorWrapper