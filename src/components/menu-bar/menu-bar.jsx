import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes, { resetWarningCache } from 'prop-types';
import bindAll from 'lodash.bindall';
import bowser from 'bowser';
import React from 'react';

import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import CommunityButton from './community-button.jsx';
import ShareButton from './share-button.jsx';
import { ComingSoonTooltip } from '../coming-soon/coming-soon.jsx';
import Divider from '../divider/divider.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import SaveStatus from './save-status.jsx';
import ProjectWatcher from '../../containers/project-watcher.jsx';
import MenuBarMenu from './menu-bar-menu.jsx';
import { MenuItem, MenuSection } from '../menu/menu.jsx';
import ProjectTitleInput from './project-title-input.jsx';
import AuthorInfo from './author-info.jsx';
import AccountNav from '../../containers/account-nav.jsx';
import LoginDropdown from './login-dropdown.jsx';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import DeletionRestorer from '../../containers/deletion-restorer.jsx';
import TurboMode from '../../containers/turbo-mode.jsx';
import MenuBarHOC from '../../containers/menu-bar-hoc.jsx';

import { openTipsLibrary } from '../../reducers/modals';
import { setPlayer } from '../../reducers/mode';
import {
    autoUpdateProject,
    getIsUpdating,
    getIsShowingProject,
    manualUpdateProject,
    requestNewProject,
    remixProject,
    saveProjectAsCopy,
    requestProjectUpload
} from '../../reducers/project-state';
import {
    openAboutMenu,
    closeAboutMenu,
    aboutMenuOpen,
    openAccountMenu,
    closeAccountMenu,
    accountMenuOpen,
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen,
    openLoginMenu,
    closeLoginMenu,
    loginMenuOpen,
    openToolMenu,
    closeToolMenu,
    openSystemMenu,
    closeSystemMenu,
    toolMenuOpen,
    systemMenuOpen,
} from '../../reducers/menus';

import collectMetadata from '../../lib/collect-metadata';

import styles from './menu-bar.css';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import mystuffIcon from './icon--mystuff.png';
import profileIcon from './icon--profile.png';
import remixIcon from './icon--remix.svg';
import dropdownCaret from './dropdown-caret.svg';
import languageIcon from '../language-selector/language-icon.svg';
import aboutIcon from './icon--about.svg';

import scratchLogo from './logo.png';

import sharedMessages from '../../lib/shared-messages';
import IconButton from '../icon-button/icon-button.jsx';

// 模式选择按钮
import ModeButton from './mode-select-button.jsx';
import arduinoIcon from './arduino-uno-board.svg'
import pythonIcon from './python-icon.svg'
import hideIcon from './bx-hide.svg'
import showIcon from './bx-show.svg'

import {
    editorToggleCode,
    editorToggleDefault,
} from '../../reducers/editor'

import {
    editorToggleShow,
    editorToggleHide,
} from '../../reducers/editorhide'

const ariaMessages = defineMessages({
    language: {
        id: 'gui.menuBar.LanguageSelector',
        defaultMessage: 'language selector',
        description: 'accessibility text for the language selection menu'
    },
    tutorials: {
        id: 'gui.menuBar.tutorialsLibrary',
        defaultMessage: 'Tutorials',
        description: 'accessibility text for the tutorials button'
    }
});

const MenuBarItemTooltip = ({
    children,
    className,
    enable,
    id,
    place = 'bottom'
}) => {
    if (enable) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
    return (
        <ComingSoonTooltip
            className={classNames(styles.comingSoon, className)}
            place={place}
            tooltipClassName={styles.comingSoonTooltip}
            tooltipId={id}
        >
            {children}
        </ComingSoonTooltip>
    );
};


MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    enable: PropTypes.bool,
    id: PropTypes.string,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const MenuItemTooltip = ({ id, isRtl, children, className }) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        isRtl={isRtl}
        place={isRtl ? 'left' : 'right'}
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    isRtl: PropTypes.bool
};

const AboutButton = props => (
    <Button
        className={classNames(styles.menuBarItem, styles.hoverable)}
        iconClassName={styles.aboutIcon}
        iconSrc={aboutIcon}
        onClick={props.onClick}
    />
);

AboutButton.propTypes = {
    onClick: PropTypes.func.isRequired
};



class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleClickNew',
            'handleClickRemix',
            'handleClickSave',
            'handleClickSaveAsCopy',
            'handleClickSeeCommunity',
            'handleClickShare',
            'handleKeyPress',
            'handleLanguageMouseUp',
            'handleRestoreOption',
            'getSaveToComputerHandler',
            'restoreOptionMessage',
            'handleEditorModeSelect',
            'handleEditorHide',
            'onPortSelect'
        ]);
        this.state = {
            com: null
        }
    }
    handleEditorModeSelect() {
        switch (this.props.editorMode) {
            case "code":
                this.props.editorToggleDefault();
                this.handleClickNew();

                break;
            case "default":
                this.props.editorToggleCode();
                this.handleClickNew();
                break;
            default:
                this.props.editorToggleDefault();
                break;
        }

        console.log("blocks.jsx:", this.props.editorMode)
        //this.props.vm.emitWorkspaceUpdate();
    }
    handleEditorHide() {
        if (this.props.editorHide) {
            this.props.editorToggleShow();
            this.props.vm.refreshWorkspace();
        } else {
            this.props.editorToggleHide();
            this.props.vm.refreshWorkspace();
        }
        window.dispatchEvent(new Event('resize'));
        console.log("blocks.jsx:", this.props.editorHide)
    }


    onPortSelect(comName) {
        this.setState({
            com: comName
        })
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
        document.getElementById("MPython-btn").addEventListener("click", this.handleEditorModeSelect)
        document.getElementById("editorShow-btn").addEventListener("click", this.handleEditorHide)
        this.props.editorToggleCode();

        // 检测版本
        // fetch("https://update.udrobot.net/version_control/version.json", {
        //     method: "GET"
        // })
        //     .then(res => res.json())
        //     .then(

        //         (versionInfo) => {
        //             var versionCurrent = "0.6.5"
        //             if (versionCurrent != versionInfo.version) {
        //                 var updateConfirm = confirm(`发现新版本${versionInfo.version}是否更新？`)
        //                 if (updateConfirm) {
        //                     var ok = -1
        //                     fetch("http://127.0.0.1:3000/doUpdate?update=" + versionInfo.filename)
        //                         .then(res => res.body())
        //                         .then((status) => {
        //                             if (status == "ok") {
        //                                 terminal.print("下载更新成功")
        //                             } else {
        //                                 terminal.print("下载更新失败")
        //                             }
        //                         })
        //                     alert("正在下载更新，请耐心等待。")
        //                     var terminal = this.props.terminal
        //                     var downloading = "正在下载更新..."
        //                     terminal.print(downloading)

        //                 }
        //             }
        //         }
        //     )
        // var request = new XMLHttpRequest();
        // request.open("GET", "https://udrobot-update.oss-cn-hangzhou.aliyuncs.com/version_control/version.json", true);
        // request.send()
        // request.onreadystatechange = function (e) {
        //     if (request.readyState == 4 && request.status == 200) {
        //         var response = request.responseText;
        //         var versionInfo = JSON.parse(response)
        //         console.log(response)
        //         confirm(`发现新版本${versionInfo.version}是否更新？`)
        //     }
        // }


    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);

    }
    handleClickNew() {
        // if the project is dirty, and user owns the project, we will autosave.
        // but if they are not logged in and can't save, user should consider
        // downloading or logging in first.
        // Note that if user is logged in and editing someone else's project,
        // they'll lose their work.
        const readyToReplaceProject = this.props.confirmReadyToReplaceProject(
            this.props.intl.formatMessage(sharedMessages.replaceProjectWarning)
        );
        this.props.onRequestCloseFile();
        if (readyToReplaceProject) {
            this.props.onClickNew(this.props.canSave && this.props.canCreateNew);
        }
        this.props.onRequestCloseFile();
    }
    handleClickRemix() {
        this.props.onClickRemix();
        this.props.onRequestCloseFile();
    }
    handleClickSave() {
        this.props.onClickSave();
        this.props.onRequestCloseFile();
    }
    handleClickSaveAsCopy() {
        this.props.onClickSaveAsCopy();
        this.props.onRequestCloseFile();
    }
    handleClickSeeCommunity(waitForUpdate) {
        if (this.props.shouldSaveBeforeTransition()) {
            this.props.autoUpdateProject(); // save before transitioning to project page
            waitForUpdate(true); // queue the transition to project page
        } else {
            waitForUpdate(false); // immediately transition to project page
        }
    }
    handleClickShare(waitForUpdate) {
        if (!this.props.isShared) {
            if (this.props.canShare) { // save before transitioning to project page
                this.props.onShare();
            }
            if (this.props.canSave) { // save before transitioning to project page
                this.props.autoUpdateProject();
                waitForUpdate(true); // queue the transition to project page
            } else {
                waitForUpdate(false); // immediately transition to project page
            }
        }
    }
    handleRestoreOption(restoreFun) {
        return () => {
            restoreFun();
            this.props.onRequestCloseEdit();
        };
    }
    handleKeyPress(event) {
        const modifier = bowser.mac ? event.metaKey : event.ctrlKey;
        if (modifier && event.key === 's') {
            this.props.onClickSave();
            event.preventDefault();
        }
    }
    getSaveToComputerHandler(downloadProjectCallback) {
        return () => {
            this.props.onRequestCloseFile();
            downloadProjectCallback();
            if (this.props.onProjectTelemetryEvent) {
                const metadata = collectMetadata(this.props.vm, this.props.projectTitle, this.props.locale);
                this.props.onProjectTelemetryEvent('projectDidSave', metadata);
            }
        };
    }
    handleLanguageMouseUp(e) {
        if (!this.props.languageMenuOpen) {
            this.props.onClickLanguage(e);
        }
    }
    restoreOptionMessage(deletedItem) {
        switch (deletedItem) {
            case 'Sprite':
                return (<FormattedMessage
                    defaultMessage="Restore Sprite"
                    description="Menu bar item for restoring the last deleted sprite."
                    id="gui.menuBar.restoreSprite"
                />);
            case 'Sound':
                return (<FormattedMessage
                    defaultMessage="Restore Sound"
                    description="Menu bar item for restoring the last deleted sound."
                    id="gui.menuBar.restoreSound"
                />);
            case 'Costume':
                return (<FormattedMessage
                    defaultMessage="Restore Costume"
                    description="Menu bar item for restoring the last deleted costume."
                    id="gui.menuBar.restoreCostume"
                />);
            default: {
                return (<FormattedMessage
                    defaultMessage="Restore"
                    description="Menu bar item for restoring the last deleted item in its disabled state." /* eslint-disable-line max-len */
                    id="gui.menuBar.restore"
                />);
            }
        }
    }
    buildAboutMenu(onClickAbout) {
        if (!onClickAbout) {
            // hide the button
            return null;
        }
        if (typeof onClickAbout === 'function') {
            // make a button which calls a function
            return <AboutButton onClick={onClickAbout} />;
        }
        // assume it's an array of objects
        // each item must have a 'title' FormattedMessage and a 'handleClick' function
        // generate a menu with items for each object in the array
        return (
            <div
                className={classNames(styles.menuBarItem, styles.hoverable, {
                    [styles.active]: this.props.aboutMenuOpen
                })}
                onMouseUp={this.props.onRequestOpenAbout}
            >
                <img
                    className={styles.aboutIcon}
                    src={aboutIcon}
                />
                <MenuBarMenu
                    className={classNames(styles.menuBarMenu)}
                    open={this.props.aboutMenuOpen}
                    place={this.props.isRtl ? 'right' : 'left'}
                    onRequestClose={this.props.onRequestCloseAbout}
                >
                    {
                        onClickAbout.map(itemProps => (
                            <MenuItem
                                key={itemProps.title}
                                isRtl={this.props.isRtl}
                                onClick={this.wrapAboutMenuCallback(itemProps.onClick)}
                            >
                                {itemProps.title}
                            </MenuItem>
                        ))
                    }
                </MenuBarMenu>
            </div>
        );
    }
    wrapAboutMenuCallback(callback) {
        return () => {
            callback();
            this.props.onRequestCloseAbout();
        };
    }


    render() {

        const saveNowMessage = (
            <FormattedMessage
                defaultMessage="Save now"
                description="Menu bar item for saving now"
                id="gui.menuBar.saveNow"
            />
        );
        const createCopyMessage = (
            <FormattedMessage
                defaultMessage="Save as a copy"
                description="Menu bar item for saving as a copy"
                id="gui.menuBar.saveAsCopy"
            />
        );
        const remixMessage = (
            <FormattedMessage
                defaultMessage="Remix"
                description="Menu bar item for remixing"
                id="gui.menuBar.remix"
            />
        );
        const modeBtnMessage = (
            <FormattedMessage
                defaultMessage="模式选择"
                description="App mode selection, python/arduino"
                id="gui.menuBar.modeBtn"
            />
        )
        const newProjectMessage = (
            <FormattedMessage
                defaultMessage="New"
                description="Menu bar item for creating a new project"
                id="gui.menuBar.new"
            />
        );
        const remixButton = (
            <Button
                className={classNames(
                    styles.menuBarButton,
                    styles.remixButton
                )}
                iconClassName={styles.remixButtonIcon}
                iconSrc={remixIcon}
                onClick={this.handleClickRemix}
            >
                {remixMessage}
            </Button>
        );


        const modeButton = (
            <MenuSection>
                {/* 模式切换 */}
                <MenuItem>
                    <ModeButton
                        id={"MPython-btn"}
                        title={(this.props.editorMode == "code") ? "打开Scratch" : "打开MPython模式"}
                        img={pythonIcon}

                        className={classNames(
                            styles.menuBarItem
                        )}


                    />
                </MenuItem>
                {/* 代码生成模式切换 */}
                {/* <MenuItem>
                    <ModeButton
                        id={"Arduino-btn"}
                        title={"Arduino"}
                        img={arduinoIcon}
                        onclick={()=>{
                            this.props.editorToggle();
                        }}
                        className={classNames(
                            styles.menuBarItem
                        )}

                    />
                </MenuItem> */}
            </MenuSection>

        )

        const showHideButton = (
            <MenuSection>
                <MenuItem>
                    <ModeButton
                        id={"editorShow-btn"}
                        title={(this.props.editorHide == true) ? "隐藏右侧" : "显示右侧"}
                        img={this.props.editorHide ? hideIcon : showIcon}

                        className={classNames(
                            styles.menuBarItem
                        )}


                    />
                </MenuItem>
            </MenuSection>

        )
        // Show the About button only if we have a handler for it (like in the desktop app)
        const aboutButton = this.buildAboutMenu(this.props.onClickAbout);

        return (
            <Box
                className={classNames(
                    this.props.className,
                    styles.menuBar
                )}
            >
                <div className={styles.mainMenu}>
                    <div className={styles.fileGroup}>
                        <div className={classNames(styles.menuBarItem)}>
                            <img
                                alt="Scratch"
                                className={classNames(styles.scratchLogo, {
                                    [styles.clickable]: typeof this.props.onClickLogo !== 'undefined'
                                })}
                                draggable={false}
                                src={this.props.logo}
                                onClick={this.props.onClickLogo}
                            />
                        </div>
                        {(this.props.canChangeLanguage) && (<div
                            className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
                        >
                            <div>
                                <img
                                    className={styles.languageIcon}
                                    src={languageIcon}
                                />
                                <img
                                    className={styles.languageCaret}
                                    src={dropdownCaret}
                                />
                            </div>
                            <LanguageSelector label={this.props.intl.formatMessage(ariaMessages.language)} />
                        </div>)}
                        {(this.props.canManageFiles) && (
                            <div
                                className={classNames(styles.menuBarItem, styles.hoverable, {
                                    [styles.active]: this.props.fileMenuOpen
                                })}
                                onMouseUp={this.props.onClickFile}
                            >
                                <FormattedMessage
                                    defaultMessage="File"
                                    description="Text for file dropdown menu"
                                    id="gui.menuBar.file"
                                />
                                <MenuBarMenu
                                    className={classNames(styles.menuBarMenu)}
                                    open={this.props.fileMenuOpen}
                                    place={this.props.isRtl ? 'left' : 'right'}
                                    onRequestClose={this.props.onRequestCloseFile}
                                >
                                    <MenuSection>
                                        <MenuItem
                                            isRtl={this.props.isRtl}
                                            onClick={this.handleClickNew}
                                        >
                                            {newProjectMessage}
                                        </MenuItem>
                                    </MenuSection>
                                    {(this.props.canSave || this.props.canCreateCopy || this.props.canRemix) && (
                                        <MenuSection>
                                            {this.props.canSave && (
                                                <MenuItem onClick={this.handleClickSave}>
                                                    {saveNowMessage}
                                                </MenuItem>
                                            )}
                                            {this.props.canCreateCopy && (
                                                <MenuItem onClick={this.handleClickSaveAsCopy}>
                                                    {createCopyMessage}
                                                </MenuItem>
                                            )}
                                            {this.props.canRemix && (
                                                <MenuItem onClick={this.handleClickRemix}>
                                                    {remixMessage}
                                                </MenuItem>
                                            )}
                                        </MenuSection>
                                    )}
                                    <MenuSection>
                                        <MenuItem
                                            onClick={this.props.onStartSelectingFileUpload}
                                        >
                                            {this.props.intl.formatMessage(sharedMessages.loadFromComputerTitle)}
                                        </MenuItem>
                                        <SB3Downloader>{(className, downloadProjectCallback) => (
                                            <MenuItem
                                                className={className}
                                                onClick={this.getSaveToComputerHandler(downloadProjectCallback)}
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Save to your computer"
                                                    description="Menu bar item for downloading a project to your computer" // eslint-disable-line max-len
                                                    id="gui.menuBar.downloadToComputer"
                                                />
                                            </MenuItem>
                                        )}</SB3Downloader>
                                    </MenuSection>
                                </MenuBarMenu>
                            </div>
                        )}
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.editMenuOpen
                            })}
                            onMouseUp={this.props.onClickEdit}
                        >
                            <div className={classNames(styles.editMenu)}>
                                <FormattedMessage
                                    defaultMessage="Edit"
                                    description="Text for edit dropdown menu"
                                    id="gui.menuBar.edit"
                                />
                            </div>
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.editMenuOpen}
                                place={this.props.isRtl ? 'left' : 'right'}
                                onRequestClose={this.props.onRequestCloseEdit}
                            >
                                <DeletionRestorer>{(handleRestore, { restorable, deletedItem }) => (
                                    <MenuItem
                                        className={classNames({ [styles.disabled]: !restorable })}
                                        onClick={this.handleRestoreOption(handleRestore)}
                                    >
                                        {this.restoreOptionMessage(deletedItem)}
                                    </MenuItem>
                                )}</DeletionRestorer>
                                <MenuSection>
                                    <TurboMode>{(toggleTurboMode, { turboMode }) => (
                                        <MenuItem onClick={toggleTurboMode}>
                                            {turboMode ? (
                                                <FormattedMessage
                                                    defaultMessage="Turn off Turbo Mode"
                                                    description="Menu bar item for turning off turbo mode"
                                                    id="gui.menuBar.turboModeOff"
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    defaultMessage="Turn on Turbo Mode"
                                                    description="Menu bar item for turning on turbo mode"
                                                    id="gui.menuBar.turboModeOn"
                                                />
                                            )}
                                        </MenuItem>
                                    )}</TurboMode>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                        {this.props.editorMode == "code" ? (
                            <React.Fragment>
                                <div
                                    className={classNames(styles.menuBarItem, styles.hoverable, {
                                        [styles.active]: this.props.toolMenuOpen
                                    })}
                                    onMouseUp={this.props.onClickTool}
                                >
                                    <div className={classNames(styles.editMenu)}>
                                        <FormattedMessage
                                            defaultMessage="硬件工具"
                                            description=""
                                            id="gui.menuBar.tool"
                                        />
                                    </div>
                                    <MenuBarMenu
                                        className={classNames(styles.menuBarMenu)}
                                        open={this.props.toolMenuOpen}
                                        place={this.props.isRtl ? 'left' : 'right'}
                                        onRequestClose={this.props.onRequestCloseTool}
                                    >
                                        <MenuSection>
                                            <MenuItem onClick={() => {
                                                console.log(this.props.pycode)
                                                var terminal = this.props.terminal

                                                terminal.print("开始上传代码");
                                                this.props.onRequestCloseTool()
                                                terminal.ws.send(`closecom:${terminal.com}`)
                                                var request = new XMLHttpRequest();
                                                request.open("POST", "http://127.0.0.1:3000/ampy/upload", true);
                                                request.send(JSON.stringify({
                                                    sourceCode: this.props.pycode,
                                                    com: terminal.com
                                                }))

                                                request.onreadystatechange = function (e) {
                                                    if (request.readyState == 4 && request.status == 200) {
                                                        var response = request.responseText;
                                                        console.log(response)
                                                        // terminal.print("上传代码成功");
                                                        terminal.ws.send(`opencom:${terminal.com}`)
                                                    }
                                                }

                                            }}>
                                                <FormattedMessage
                                                    defaultMessage="上传代码"
                                                    description="Menu bar item for turning off turbo mode"
                                                    id="gui.menuBar.upload"
                                                />
                                            </MenuItem>
                                            {/* <MenuItem onClick={() => {
                                                var terminal = this.props.terminal


                                                this.props.onRequestCloseTool()
                                                terminal.print("开始热加载");
                                                var request = new XMLHttpRequest();
                                                request.open("POST", "http://127.0.0.1:3000/ampy/run", true);
                                                request.send(JSON.stringify({
                                                    sourceCode: this.props.pycode,
                                                    com: terminal.com
                                                }))
                                                request.onreadystatechange = function (e) {
                                                    if (request.readyState == 4 && request.status == 200) {
                                                        var response = request.responseText;
                                                        console.log(response)
                                                        terminal.print("运行代码成功");
                                                        terminal.ws.send(`opencom:${terminal.com}`)
                                                    }
                                                }

                                            }}>
                                                <FormattedMessage
                                                    defaultMessage="热加载代码"
                                                    description="Menu bar item for turning on turbo mode"
                                                    id="gui.menuBar.hotrun"
                                                />
                                            </MenuItem> */}

                                            <MenuItem onClick={() => {
                                                console.log(this.props.pycode)
                                                var terminal = this.props.terminal


                                                terminal.ws.send(`closecom:${terminal.com}`)
                                                if (confirm("请按住主板的A键同时按主板背面的白色按钮，然后松开白色按钮再松开A键进入下载模式！")){
                                                    terminal.ws.send(`firmware:${terminal.com}`)
                                                    this.props.onRequestCloseTool()
                                                    this.props.terminal.print("开始更新主板固件");
                                                }else{
                                                    this.props.onRequestCloseTool()
                                                    this.props.terminal.print("取消更新主板固件");
                                                }
                                                
                                            }}>
                                                <FormattedMessage
                                                    defaultMessage="主板固件更新"
                                                    description="Menu bar item for turning on turbo mode"
                                                    id="gui.menuBar.firmwareUpdate"
                                                />
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                console.log(this.props.pycode)
                                                var terminal = this.props.terminal


                                                terminal.ws.send(`closecom:${terminal.com}`)
                                                if (confirm("请按住主板的A键同时按主板背面的白色按钮，然后松开白色按钮再松开A键进入下载模式！")){
                                                    terminal.ws.send(`factory:${terminal.com}`)
                                                    this.props.onRequestCloseTool()
                                                    this.props.terminal.print("开始恢复出厂设置");
                                                }else{
                                                    this.props.onRequestCloseTool()
                                                    this.props.terminal.print("取消恢复出厂设置");
                                                }
                                                
                                            }}>
                                                <FormattedMessage
                                                    defaultMessage="恢复主板出厂设置"
                                                    description="Menu bar item for turning on turbo mode"
                                                    id="gui.menuBar.factoryUpdate"
                                                />
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                console.log(this.props.pycode)
                                                var terminal = this.props.terminal

                                                terminal.ws.send(`closecom:${terminal.com}`)


                                                terminal.ws.send(`carfirmware:${terminal.com}`)
                                                this.props.onRequestCloseTool()
                                                this.props.terminal.print("开始更新小车固件");
                                            }}>
                                                <FormattedMessage
                                                    defaultMessage="小车固件更新"
                                                    description="Menu bar item for turning on turbo mode"
                                                    id="gui.menuBar.carfirmwareUpdate"
                                                />
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                console.log(this.props.pycode)
                                                var terminal = this.props.terminal

                                                var request = new XMLHttpRequest();
                                                request.open("GET", "http://127.0.0.1:3000/installDriver", true);
                                                request.send()
                                                request.onreadystatechange = function (e) {
                                                    if (request.readyState == 4 && request.status == 200) {
                                                        var response = request.responseText;
                                                        console.log(response)
                                                        if (response == "ok") {
                                                            terminal.print("开始安装驱动");
                                                        } else {
                                                            terminal.print("安装驱动失败");
                                                        }

                                                        terminal.ws.send(`opencom:${terminal.com}`)
                                                    }
                                                }

                                                this.props.onRequestCloseTool()
                                                this.props.terminal.print("开始安装驱动");
                                            }}>
                                                <FormattedMessage
                                                    defaultMessage="安装驱动"
                                                    description="Menu bar item for turning on turbo mode"
                                                    id="gui.menuBar.driverInstallation"
                                                />
                                            </MenuItem>
                                        </MenuSection>
                                    </MenuBarMenu>
                                </div>
                                <React.Fragment>
                                    <div
                                        className={classNames(styles.menuBarItem, styles.hoverable, {
                                            [styles.active]: this.props.systemMenuOpen
                                        })}
                                        onMouseUp={this.props.onClickSystem}
                                    >
                                        <div className={classNames(styles.editMenu)}>
                                            <FormattedMessage
                                                defaultMessage="系统"
                                                description=""
                                                id="gui.menuBar.system"
                                            />
                                        </div>
                                        <MenuBarMenu
                                            className={classNames(styles.menuBarMenu)}
                                            open={this.props.systemMenuOpen}
                                            place={this.props.isRtl ? 'left' : 'right'}
                                            onRequestClose={this.props.onRequestCloseSystem}
                                        >
                                            <MenuSection>
                                                <MenuItem onClick={() => {
                                                    console.log(this.props.pycode)
                                                    var terminal = this.props.terminal
                                                    this.props.onRequestCloseSystem()
                                                    var request = new XMLHttpRequest();
                                                    request.open("GET", "http://127.0.0.1:3000/checkVersion", true);
                                                    request.send()
                                                    request.onreadystatechange = function (e) {
                                                        if (request.readyState == 4 && request.status == 200) {
                                                            var response = request.responseText;
                                                            console.log(response)
                                                            terminal.print(response)
                                                        }
                                                    }

                                                }}>
                                                    <FormattedMessage
                                                        defaultMessage="检查更新"
                                                        description="Menu bar item for turning off turbo mode"
                                                        id="gui.menuBar.checkUpdate"
                                                    />
                                                </MenuItem>
                                            </MenuSection>
                                        </MenuBarMenu>
                                    </div>
                                </React.Fragment>
                                <Divider className={classNames(styles.divider)} />
                                <div><select name="port" id="portSelect" style=
                                    {{
                                        outline: "none",
                                        color: "#FFF",
                                        marginRight: "10px",
                                        backgroundColor: "hsla(215, 100%, 65%, 1)",
                                        border: "1px solid #FFF",
                                        height: "35px",
                                        fontSize: "15px",
                                        borderRadius: "2px",
                                        fontWeight: "bold"
                                    }}></select>
                                </div>
                                <MenuSection>
                                    <MenuItem
                                        className={classNames(
                                            styles.menuBgDark
                                        )}
                                    >
                                        <ModeButton
                                            id={"serialOpenBtn"}
                                            title={"打开"}
                                            className={classNames(
                                                styles.menuBarItemSmall
                                            )}
                                        />
                                    </MenuItem>
                                </MenuSection>
                            </React.Fragment>
                        ) : ([])}


                    </div>

                    <Divider className={classNames(styles.divider)} />
                    <div
                        aria-label={this.props.intl.formatMessage(ariaMessages.tutorials)}
                        className={classNames(styles.menuBarItem, styles.hoverable)}
                        onClick={() => { window.open("https://forum.udrobot.net") }}
                    >
                        <img
                            className={styles.helpIcon}
                            src={helpIcon}
                        />
                        <FormattedMessage {...ariaMessages.tutorials} />
                    </div>
                    <Divider className={classNames(styles.divider)} />
                    {this.props.canEditTitle ? (
                        <div className={classNames(styles.menuBarItem, styles.growable)}>
                            <MenuBarItemTooltip
                                enable
                                id="title-field"
                            >
                                <ProjectTitleInput
                                    className={classNames(styles.titleFieldGrowable)}
                                />
                            </MenuBarItemTooltip>
                        </div>
                    ) : ((this.props.authorUsername && this.props.authorUsername !== this.props.username) ? (
                        <AuthorInfo
                            className={styles.authorInfo}
                            imageUrl={this.props.authorThumbnailUrl}
                            projectTitle={this.props.projectTitle}
                            userId={this.props.authorId}
                            username={this.props.authorUsername}
                        />
                    ) : null)}
                    <div className={classNames(styles.menuBarItem)}>
                        {this.props.canShare ? (
                            (this.props.isShowingProject || this.props.isUpdating) && (
                                <ProjectWatcher onDoneUpdating={this.props.onSeeCommunity}>
                                    {
                                        waitForUpdate => (
                                            <ShareButton
                                                className={styles.menuBarButton}
                                                isShared={this.props.isShared}
                                                /* eslint-disable react/jsx-no-bind */
                                                onClick={() => {
                                                    this.handleClickShare(waitForUpdate);
                                                }}
                                            /* eslint-enable react/jsx-no-bind */
                                            />
                                        )
                                    }
                                </ProjectWatcher>
                            )
                        ) : (
                            this.props.showComingSoon ? (
                                <MenuBarItemTooltip id="share-button">
                                    <ShareButton className={styles.menuBarButton} />
                                </MenuBarItemTooltip>
                            ) : []
                        )}
                        {this.props.canRemix ? remixButton : []}
                    </div>
                    <div className={classNames(styles.menuBarItem, styles.communityButtonWrapper)}>
                        {this.props.enableCommunity ? (
                            (this.props.isShowingProject || this.props.isUpdating) && (
                                <ProjectWatcher onDoneUpdating={this.props.onSeeCommunity}>
                                    {
                                        waitForUpdate => (
                                            <CommunityButton
                                                className={styles.menuBarButton}
                                                /* eslint-disable react/jsx-no-bind */
                                                onClick={() => {
                                                    this.handleClickSeeCommunity(waitForUpdate);
                                                }}
                                            /* eslint-enable react/jsx-no-bind */
                                            />
                                        )
                                    }
                                </ProjectWatcher>
                            )
                        ) : (this.props.showComingSoon ? (
                            <MenuBarItemTooltip id="community-button">
                                <CommunityButton className={styles.menuBarButton} />
                            </MenuBarItemTooltip>
                        ) : [])}
                    </div>
                    {/* 在这里添加菜单项目 */}
                </div>
                {modeButton}
                {showHideButton}
                {/* show the proper UI in the account menu, given whether the user is
                logged in, and whether a session is available to log in with */}
                <div className={styles.accountInfoGroup}>
                    <div className={styles.menuBarItem}>
                        {this.props.canSave && (
                            <SaveStatus />
                        )}
                    </div>
                    {this.props.sessionExists ? (
                        this.props.username ? (
                            // ************ user is logged in ************
                            <React.Fragment>
                                <a href="/mystuff/">
                                    <div
                                        className={classNames(
                                            styles.menuBarItem,
                                            styles.hoverable,
                                            styles.mystuffButton
                                        )}
                                    >
                                        <img
                                            className={styles.mystuffIcon}
                                            src={mystuffIcon}
                                        />
                                    </div>
                                </a>
                                <AccountNav
                                    className={classNames(
                                        styles.menuBarItem,
                                        styles.hoverable,
                                        { [styles.active]: this.props.accountMenuOpen }
                                    )}
                                    isOpen={this.props.accountMenuOpen}
                                    isRtl={this.props.isRtl}
                                    menuBarMenuClassName={classNames(styles.menuBarMenu)}
                                    onClick={this.props.onClickAccount}
                                    onClose={this.props.onRequestCloseAccount}
                                    onLogOut={this.props.onLogOut}
                                />
                            </React.Fragment>
                        ) : (
                            // ********* user not logged in, but a session exists
                            // ********* so they can choose to log in
                            <React.Fragment>
                                <div
                                    className={classNames(
                                        styles.menuBarItem,
                                        styles.hoverable
                                    )}
                                    key="join"
                                    onMouseUp={this.props.onOpenRegistration}
                                >
                                    <FormattedMessage
                                        defaultMessage="Join Scratch"
                                        description="Link for creating a Scratch account"
                                        id="gui.menuBar.joinScratch"
                                    />
                                </div>
                                <div
                                    className={classNames(
                                        styles.menuBarItem,
                                        styles.hoverable
                                    )}
                                    key="login"
                                    onMouseUp={this.props.onClickLogin}
                                >
                                    <FormattedMessage
                                        defaultMessage="Sign in"
                                        description="Link for signing in to your Scratch account"
                                        id="gui.menuBar.signIn"
                                    />
                                    <LoginDropdown
                                        className={classNames(styles.menuBarMenu)}
                                        isOpen={this.props.loginMenuOpen}
                                        isRtl={this.props.isRtl}
                                        renderLogin={this.props.renderLogin}
                                        onClose={this.props.onRequestCloseLogin}
                                    />
                                </div>
                            </React.Fragment>
                        )
                    ) : (
                        // ******** no login session is available, so don't show login stuff
                        <React.Fragment>
                            {this.props.showComingSoon ? (
                                <React.Fragment>
                                    <MenuBarItemTooltip id="mystuff">
                                        <div
                                            className={classNames(
                                                styles.menuBarItem,
                                                styles.hoverable,
                                                styles.mystuffButton
                                            )}
                                        >
                                            <img
                                                className={styles.mystuffIcon}
                                                src={mystuffIcon}
                                            />
                                        </div>
                                    </MenuBarItemTooltip>
                                    <MenuBarItemTooltip
                                        id="account-nav"
                                        place={this.props.isRtl ? 'right' : 'left'}
                                    >
                                        <div
                                            className={classNames(
                                                styles.menuBarItem,
                                                styles.hoverable,
                                                styles.accountNavMenu
                                            )}
                                        >
                                            <img
                                                className={styles.profileIcon}
                                                src={profileIcon}
                                            />
                                            <span>
                                            {'scratch-cat'}
                                            </span>
                                            <img
                                                className={styles.dropdownCaretIcon}
                                                src={dropdownCaret}
                                            />
                                        </div>
                                    </MenuBarItemTooltip>
                                </React.Fragment>
                            ) : []}
                        </React.Fragment>
                    )}
                </div>

                {aboutButton}
            </Box >
        );
    }
}

MenuBar.propTypes = {
    aboutMenuOpen: PropTypes.bool,
    accountMenuOpen: PropTypes.bool,
    authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    authorThumbnailUrl: PropTypes.string,
    authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoUpdateProject: PropTypes.func,
    canChangeLanguage: PropTypes.bool,
    canCreateCopy: PropTypes.bool,
    canCreateNew: PropTypes.bool,
    canEditTitle: PropTypes.bool,
    canManageFiles: PropTypes.bool,
    canRemix: PropTypes.bool,
    canSave: PropTypes.bool,
    canShare: PropTypes.bool,
    className: PropTypes.string,
    confirmReadyToReplaceProject: PropTypes.func,
    editMenuOpen: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    fileMenuOpen: PropTypes.bool,
    intl: intlShape,
    isRtl: PropTypes.bool,
    isShared: PropTypes.bool,
    isShowingProject: PropTypes.bool,
    isUpdating: PropTypes.bool,
    languageMenuOpen: PropTypes.bool,
    locale: PropTypes.string.isRequired,
    loginMenuOpen: PropTypes.bool,
    logo: PropTypes.string,
    onClickAbout: PropTypes.oneOfType([
        PropTypes.func, // button mode: call this callback when the About button is clicked
        PropTypes.arrayOf( // menu mode: list of items in the About menu
            PropTypes.shape({
                title: PropTypes.string, // text for the menu item
                onClick: PropTypes.func // call this callback when the menu item is clicked
            })
        )
    ]),
    onClickAccount: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickFile: PropTypes.func,
    onClickLanguage: PropTypes.func,
    onClickLogin: PropTypes.func,
    onClickLogo: PropTypes.func,
    onClickNew: PropTypes.func,
    onClickRemix: PropTypes.func,
    onClickSave: PropTypes.func,
    onClickSaveAsCopy: PropTypes.func,
    onLogOut: PropTypes.func,
    onOpenRegistration: PropTypes.func,
    onOpenTipLibrary: PropTypes.func,
    onProjectTelemetryEvent: PropTypes.func,
    onRequestOpenAbout: PropTypes.func,
    onRequestCloseAbout: PropTypes.func,
    onRequestCloseAccount: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onRequestCloseLanguage: PropTypes.func,
    onRequestCloseLogin: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onShare: PropTypes.func,
    onStartSelectingFileUpload: PropTypes.func,
    onToggleLoginOpen: PropTypes.func,
    projectTitle: PropTypes.string,
    renderLogin: PropTypes.func,
    sessionExists: PropTypes.bool,
    shouldSaveBeforeTransition: PropTypes.func,
    showComingSoon: PropTypes.bool,
    userOwnsProject: PropTypes.bool,
    username: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired,
    editorMode: PropTypes.string,
    editorToggle: PropTypes.func,
};

MenuBar.defaultProps = {
    logo: scratchLogo,
    onShare: () => { },
};

const mapStateToProps = (state, ownProps) => {
    const loadingState = state.scratchGui.projectState.loadingState;
    const user = state.session && state.session.session && state.session.session.user;

    return {
        aboutMenuOpen: aboutMenuOpen(state),
        accountMenuOpen: accountMenuOpen(state),
        fileMenuOpen: fileMenuOpen(state),
        editMenuOpen: editMenuOpen(state),
        toolMenuOpen: toolMenuOpen(state),
        systemMenuOpen: systemMenuOpen(state),
        isRtl: state.locales.isRtl,
        isUpdating: getIsUpdating(loadingState),
        isShowingProject: getIsShowingProject(loadingState),
        languageMenuOpen: languageMenuOpen(state),
        locale: state.locales.locale,
        loginMenuOpen: loginMenuOpen(state),
        projectTitle: state.scratchGui.projectTitle,
        sessionExists: state.session && typeof state.session.session !== 'undefined',
        username: user ? user.username : null,
        userOwnsProject: ownProps.authorUsername && user &&
            (ownProps.authorUsername === user.username),
        vm: state.scratchGui.vm,
        terminal: state.terminal.o,
        toolboxXML: state.scratchGui.toolbox.toolboxXML,
        editor: state.editorRef.o,
        pycode: state.pycode.value,
        editorHide: state.editorHide.editorHide
    };
};



const mapDispatchToProps = dispatch => ({
    autoUpdateProject: () => dispatch(autoUpdateProject()),
    onOpenTipLibrary: () => dispatch(openTipsLibrary()),
    onClickAccount: () => dispatch(openAccountMenu()),
    onRequestCloseAccount: () => dispatch(closeAccountMenu()),
    onClickFile: () => dispatch(openFileMenu()),
    onRequestCloseFile: () => dispatch(closeFileMenu()),
    onClickEdit: () => dispatch(openEditMenu()),
    onRequestCloseEdit: () => dispatch(closeEditMenu()),
    onClickTool: () => dispatch(openToolMenu()),
    onRequestCloseTool: () => dispatch(closeToolMenu()),
    onClickSystem: () => dispatch(openSystemMenu()),
    onRequestCloseSystem: () => dispatch(closeSystemMenu()),
    onClickLanguage: () => dispatch(openLanguageMenu()),
    onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
    onClickLogin: () => dispatch(openLoginMenu()),
    onRequestCloseLogin: () => dispatch(closeLoginMenu()),
    onRequestOpenAbout: () => dispatch(openAboutMenu()),
    onRequestCloseAbout: () => dispatch(closeAboutMenu()),
    onClickNew: needSave => dispatch(requestNewProject(needSave)),
    onClickRemix: () => dispatch(remixProject()),
    onClickSave: () => dispatch(manualUpdateProject()),
    onClickSaveAsCopy: () => dispatch(saveProjectAsCopy()),
    onSeeCommunity: () => dispatch(setPlayer(true)),
    editorToggleCode: () => dispatch(editorToggleCode()),
    editorToggleDefault: () => dispatch(editorToggleDefault()),
    editorToggleHide: () => dispatch(editorToggleHide()),
    editorToggleShow: () => dispatch(editorToggleShow()),
});



export default compose(
    injectIntl,
    MenuBarHOC,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MenuBar);
