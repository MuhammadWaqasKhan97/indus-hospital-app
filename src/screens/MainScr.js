import React, { Component } from 'react';
import { Container } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import TabScreen from '../navigations/TabNavigator'
export default class MainScreen extends Component {

  render() {
    return (
      <Container>
        <TabScreen />
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1
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
