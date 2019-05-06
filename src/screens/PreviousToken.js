import React, { Component } from 'react';
import { Container, Text, Card, CardItem, H3, Spinner,  } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet'
import Footer from '../components/Footer'
import * as firebase from 'firebase';
import {View} from 'react-native'
export default class PreviousToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null
        }
    }
    static navigationOptions = {
        title: 'My Token',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    componentWillMount() {
        let db = firebase.database();
        let v = new Date();
        let d = v.getDate(),
            m = parseInt(v.getMonth() + 1),
            y = v.getFullYear();
        date = d + "-" + m + "-" + y;
        let { user_id } = this.state;
        let that = this;
        db.ref('tokens/' + date).on('value', (resp) => {
            let data = resp.val();
            that.setState({ content: data });
        })
    }
    render() {
        const { content } = this.state;
        return (
            <Container style={styles.container}>
                <Container>
                   <Text>Comming Soon</Text>
                </Container>
                <Footer active={'PreviousToken'} {...this.props} />
            </Container>
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
    cardText: {
        fontSize: '1.2rem',
        fontWeight: '900'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
