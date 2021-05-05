import React from 'react'
import { connect } from 'react-redux'
import TerminalJS from '../../lib/terminaljs/terminal'
import PropTypes from 'prop-types'
import Box from '../box/box.jsx'
import classNames from 'classnames'
import styles from './terminal.css'

import { assignTerminal, removeTerminal } from '../../reducers/terminaljs'

class TerminalComponent extends React.Component {
    constructor(props) {
        super(props);
        // TODO...
        this.state = {
            target: "UDTerminal"
        }
    }

    componentDidMount() {
        let terminalJS = new TerminalJS("UDTerminal-machine");
        this.props.onCreateTerminal(terminalJS);
        terminalJS.scrollTop = terminalJS.scrollHeight;
        document.getElementById(this.state.target).appendChild(terminalJS.html);
        terminalJS.print("欢迎使用UDBlock+！");
        terminalJS.setTextColor('lightgreen');
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
    terminal: state.terminal.o
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