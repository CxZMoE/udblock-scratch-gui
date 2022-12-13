import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
// import VMScratchBlocks from '../lib/blocks';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import extensionLibraryContent from '../lib/libraries/extensions/index.jsx';

import LibraryComponent from '../components/library/library.jsx';
import extensionIcon from '../components/action-menu/icon--sprite.svg';
// 方块定义文件


// import initUDBlockMQTTBlocks from '../lib/block-defenition/udblock_mqtt'
// import initUDBlockUtils from '../lib/block-defenition/udblock-utils'
// import initRKNanoBlocks from '../lib/block-defenition/rk_nano'
// import initUDBlockEXTBRKMFBlocks from '../lib/block-defenition/udblockextb_rk_mf'
// import initUDBlockEXTBRKIOTBlocks from '../lib/block-defenition/udblockextb_rk_iot'

const messages = defineMessages({
    extensionTitle: {
        defaultMessage: 'Choose an Extension',
        description: 'Heading for the extension library',
        id: 'gui.extensionLibrary.chooseAnExtension'
    },
    extensionUrl: {
        defaultMessage: 'Enter the URL of the extension',
        description: 'Prompt for unoffical extension url',
        id: 'gui.extensionLibrary.extensionUrl'
    }
});

// var Blockly = null
// var initBlockMap = {
//     "udblockMQTT": initUDBlockMQTTBlocks,
//     'udblockUtils': initUDBlockUtils,
//     'udblockRKNano': initRKNanoBlocks,
//     'udblockEXTBRKMF': initUDBlockEXTBRKMFBlocks,
//     'udblockEXTBRKIOT': initUDBlockEXTBRKIOTBlocks
// }
class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        // Blockly = VMScratchBlocks(props.vm);

        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    // 点击加载拓展
    handleItemSelect (item) {
        // {
        //     initDefaultBlocks(Blockly); // 默认Blockly方块
        //     initUDBlockMQTTBlocks(Blockly)      // MQTT
        //     initUDBlockUtils(Blockly);          // 工具类
        //     initRKNanoBlocks(Blockly); // RK2206 Nano
        //     initUDBlockEXTBRKMFBlocks(Blockly); // RK多功能拓展板
        //     initUDBlockEXTBRKIOTBlocks(Blockly); // RK语音拓展板
        // }
        const id = item.extensionId;
        let url = item.extensionURL ? item.extensionURL : id;
        if (!item.disabled && !id) {
            // eslint-disable-next-line no-alert
            url = prompt(this.props.intl.formatMessage(messages.extensionUrl));
        }
        if (id && !item.disabled) {
            if (this.props.vm.extensionManager.isExtensionLoaded(url)) {
                this.props.onCategorySelected(id);
            } else {
                console.log(url)
                // initBlockMap[url](Blockly);
                this.props.vm.extensionManager.loadExtensionURL(url).then(() => {
                    this.props.onCategorySelected(id);
                });
            }
        }
    }
    render () {
        const extensionLibraryThumbnailData = extensionLibraryContent.map(extension => ({
            rawURL: extension.iconURL || extensionIcon,
            ...extension
        }));
        return (
            <LibraryComponent
                data={extensionLibraryThumbnailData}
                filterable={false}
                id="extensionLibrary"
                title={this.props.intl.formatMessage(messages.extensionTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExtensionLibrary.propTypes = {
    intl: intlShape.isRequired,
    onCategorySelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

export default injectIntl(ExtensionLibrary);
