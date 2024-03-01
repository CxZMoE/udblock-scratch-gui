import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import extensionLibraryContent from '../lib/libraries/extensions/index.jsx';

import LibraryComponent from '../components/library/library.jsx';
import extensionIcon from '../components/action-menu/icon--sprite.svg';
import Runtime from 'scratch-vm/src/engine/runtime.js';

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

class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    handleItemSelect (item) {
        this.props.vm.runtime.requestToolboxExtensionsUpdate()
        this.props.vm.emitWorkspaceUpdate();
        const id = item.extensionId;
        let url = item.extensionURL ? item.extensionURL : id;
        if (!item.disabled && !id) {
            // eslint-disable-next-line no-alert
            url = prompt(this.props.intl.formatMessage(messages.extensionUrl));
        }
        // this.props.vm.extensionManager.removeLoadedExtension(id)
        this.props.vm.extensionManager.refreshBlocks()
        this.props.vm.emitWorkspaceUpdate();
        
        
        // console.log(this.props.vm)
        // 防止重复添加同样的板子
        if (id && !item.disabled) {
            if (this.props.vm.extensionManager.isExtensionLoaded(url)) {
                this.props.onCategorySelected(id);
            } else {
                this.props.vm.extensionManager.loadExtensionURL(url).then(() => {
                    this.props.onCategorySelected(id);
                });
            }
        }
        
    }
    render () {
        const extensionLibraryThumbnailData = extensionLibraryContent().map(extension => ({
            rawURL: extension.iconURL || extensionIcon,
            ...extension
        }));

        // const MOTHERBOARD_TAG = {tag: '主板', intlLabel: messages.motherBoardLabel};
        // const EXTEND_BOARD_TAG = {tag: '拓展板', intlLabel: messages.extendBoardLabel};
        // const SENSOR_TAG = {tag: '传感器', intlLabel: messages.sensorLabel};
        // const ACTOR_TAG = {tag: '执行器', intlLabel: messages.actorLabel};
        // const MyTags = [MOTHERBOARD_TAG, EXTEND_BOARD_TAG, SENSOR_TAG, ACTOR_TAG];

        return (
            <LibraryComponent
                data={extensionLibraryThumbnailData}
                filterable={true}
                id="extensionLibrary"
                title={this.props.intl.formatMessage(messages.extensionTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
                tags = {[]}
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
