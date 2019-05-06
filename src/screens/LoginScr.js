/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import * as firebase from 'firebase';

import { removeUser, updateUser } from '../Redux/action/authAction';
import { connect } from 'react-redux'

import React, {Component} from 'react';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Button,
    Text,
    Icon,
    Header,
    H3,
    Card,
    CardItem,
    Body,
    H2, View
  } from "native-base";
  import { TouchableWithoutFeedback, Image } from "react-native";
  import EStyleSheet from 'react-native-extended-stylesheet';
  
  import Spinner from "react-native-loading-spinner-overlay";
  

 class LoginScreen extends Component {
  constructor(props){
      super(props);
      this.state = {
          email : "",
          password : "",
          visible: true

      }
      this.login = this.login.bind(this);
  }
  login(){
    let {email,password} = this.state ;
    if(email === "" || password === ""){
        alert("please write username and password");
        return;
    }
    let that = this ; 
    firebase.auth().signInWithEmailAndPassword(email, password).then((user)=>{
        console.log(user);
        that.props.updateUser(user);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        alert(error.message);
        // ...
      });
      
  }
   componentWillMount(){
    let that = this;
    if(this.props.user && this.props.user !== undefined){
        that.setState({visible:false});
        that.props.navigation.navigate("Main");
    }
    else{
         firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         that.props.updateUser(user);
         that.setState({visible:false});
          that.props.navigation.navigate("Main");
        } else {
          // No user is signed in.
          that.setState({visible:false});
        }
      });

    }
   
      }
  render() {
    const { visible } = this.state;

    return (
        <Container style={{ backgroundColor: '#fff' }}>
        <Content>
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <Card style={{ backgroundColor: '#fff', elevation: 0, borderColor: '#fff' }}>
              <Form>
                <CardItem style={{ backgroundColor: '#fff' }}>
                  <Body>
                    <Item regular>
                      <Icon active name="ios-mail" style={styles.white} />
                      {/* <Label style={styles.white} >Email Id / Mobile Number</Label> */}
                      <Input
                        placeholder="Email Id"
                        // placeholderTextColor="white"
                        autoCapitalize="none"
                        text={this.state.email}
                        onChangeText={text => {
                          this.setState({
                            email: text
                          });
                        }}
                        style={styles.white}
                      />
                    </Item>
                  </Body>
                </CardItem>
                <CardItem style={{ backgroundColor: '#fff' }}>
                  <Body>
                    <Item regular>
                      <Icon active name="ios-lock" style={styles.white} />
                      {/* <Label style={styles.white} >Password</Label> */}
                      <Input
                        placeholder="Password"
                        // placeholderTextColor="white"
                        secureTextEntry={true}
                        text={this.state.password}
                        onChangeText={text => {
                          this.setState({
                            password: text
                          });
                        }}
                        style={styles.white}
                      />
                    </Item>
                  </Body>
                </CardItem>
                <CardItem style={{ backgroundColor: '#fff' }}>
                  <Content>
                    <Button
                      block
                      style={{ backgroundColor: '#0C1937' }}
                      onPress={() => {
                         // this.props.navigation.navigate("Main");
                        // this.signIn()
                        this.login();
                      }}
                    >
                      <Text>Sign In</Text>
                    </Button>
                  </Content>
                </CardItem>
              </Form>
              <CardItem footer style={{ backgroundColor: '#fff' }}>
                <Text style={styles.white} >Don't have an account?</Text>
                <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.navigate("Signup")}
                >
                  <Text
                    numberOfLines={1}
                    style={{ paddingLeft: 5, textDecorationLine: "underline", color: 'blue' }}
                  >
                    Sign up
                  </Text>
                </TouchableWithoutFeedback>
              </CardItem>
            </Card>
          </View>

        </Content>

        <Spinner visible={visible} cancelable/>
      </Container>
    
      );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
const mapStateToProps = (state) => {
    return {
       
        user: state.authReducers.user
   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
        removeUser: (user) => dispatch(removeUser(user)),
        updateUser: (user) => dispatch(updateUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);