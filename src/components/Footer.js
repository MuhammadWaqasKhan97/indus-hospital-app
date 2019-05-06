import React, { Component } from 'react';

import { Text, Button, Icon, Footer, FooterTab } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet'

export default class PreviousToken extends Component {
    render() {
        return (
            <Footer>
                <FooterTab style={{
                    backgroundColor: '#F8F8F8',
                    borderTopWidth: 1,
                    borderTopColor: '#20000021'
                }}>
                    <Button
                        onPress={() => this.props.navigation.navigate("MyToken")}>
                        <Icon name='ios-home' style={this.props.active !== 'MyToken' ? { color: '#727272' } : { color: '#3498db' }} />
                        <Text style={this.props.active !== 'MyToken' ? { color: '#727272' } : { color: '#3498db' }}>Home</Text>
                    </Button>
                    <Button
                        onPress={() => this.props.navigation.navigate("PreviousToken")}>
                        <Icon name='history' type="FontAwesome" style={this.props.active !== 'PreviousToken' ? { color: '#727272' } : { color: '#3498db' }} />
                        <Text style={this.props.active !== 'PreviousToken' ? { color: '#727272' } : { color: '#3498db' }}>History</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

const styles = EStyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
