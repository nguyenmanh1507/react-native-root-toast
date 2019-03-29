import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer, { positions, durations } from './ToastContainer';

let styles = StyleSheet.create({
    defaultStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerStyle: {
        padding: 10,
        backgroundColor: '#000',
        opacity: 0.8,
        borderRadius: 5
    },
    textStyle: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'
    }
});

class Toast extends Component {
    static displayName = 'Toast';
    static propTypes = ToastContainer.propTypes;
    static positions = positions;
    static durations = durations;

    static show = (
        message,
        options = { position: positions.BOTTOM, duration: durations.SHORT }
    ) => {
        return new RootSiblings(
            (
                <ToastContainer {...options} visible={true}>
                    {typeof message === 'string' ? (
                        <Text
                            style={[
                                styles.textStyle,
                                options.textStyle,
                                options.textColor && {
                                    color: options.textColor
                                }
                            ]}
                        >
                            {message}
                        </Text>
                    ) : (
                        message()
                    )}
                </ToastContainer>
            )
        );
    };

    static hide = toast => {
        if (toast instanceof RootSiblings) {
            toast.destroy();
        } else {
            console.warn(
                `Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`
            );
        }
    };

    _toast = null;

    componentWillMount = () => {
        this._toast = new RootSiblings(
            <ToastContainer {...this.props} duration={0} />
        );
    };

    componentWillReceiveProps = nextProps => {
        this._toast.update(<ToastContainer {...nextProps} duration={0} />);
    };

    componentWillUnmount = () => {
        this._toast.destroy();
    };

    render() {
        return null;
    }
}

export { RootSiblings as Manager };
export default Toast;
