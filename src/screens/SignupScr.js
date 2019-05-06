/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
  import * as firebase from 'firebase';

  import { TouchableWithoutFeedback, Image,StyleSheet } from "react-native";
  import EStyleSheet from 'react-native-extended-stylesheet';
  
  import Spinner from "react-native-loading-spinner-overlay";

export default class SignupScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            f_name : "",
            l_name : "",
            address : "",
            email : "",
            mobile : "",
            password  : "",
            cpassword : "",
            visible: false


        }
        this.register = this.register.bind(this);
    }
  register(){
      if(this.state.email === "" ||
        this.state.f_name === "" ||
        this.state.l_name === "" ||
        this.state.mobile === "" ||
        this.state.address === "" ||
        this.state.password === "" ||
        this.state.cpassword === "" 
        )
        {
            alert("please fill all fields");
            return;
        }
        if(this.state.password.length < 8){
            alert("password must be 8 characters minimum");
            return;
        }
        if(this.state.password !== this.state.cpassword){
            alert("confirm password does not match with password");
            return;
        }

    var db = firebase.database();
    let {f_name,l_name,address,mobile,email,password} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).then((data)=>{
       
        let uid = data.user.uid;
        db.ref('users/'+uid).set({
            f_name ,
            l_name,
            address,
            mobile,
            email,
        })
        alert("Successfully created!!");
        console.log("data",data);
        this.props.navigation.navigate("Login")

    }).catch(function(error) {
        // Handle Errors here.
        alert(error.message)
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

  }
  render() {
    const { visible } = this.state;

    return (
    
        <Container style={{ backgroundColor: '#fff' }}>

        

        <View style={{ flex: 2, backgroundColor: '#fff' }}>

          <Content style={styles.content}>
           
            <Form>
              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-person" style={styles.white} />
                <Input placeholder="First Name"
                  // placeholderTextColor="white"
                  style={styles.white}
                  text={this.state.name}
                  onChangeText={text => {
                    this.setState({
                      f_name: text
                    });
                  }}
                />
              </Item>
              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-person" style={styles.white} />
                <Input placeholder="Last Name"
                  // placeholderTextColor="white"
                  style={styles.white}
                  text={this.state.name}
                  onChangeText={text => {
                    this.setState({
                      l_name: text
                    });
                  }}
                />
              </Item>
              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-person" style={styles.white} />
                <Input placeholder="Address"
                  // placeholderTextColor="white"
                  style={styles.white}
                  text={this.state.address}
                  onChangeText={text => {
                    this.setState({
                      address: text
                    });
                  }}
                />
              </Item>

              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-mail" style={styles.white} />
                <Input placeholder="Email ID"
                  // placeholderTextColor="white"/
                  text={this.state.email}
                  style={styles.white}
                  onChangeText={text => {
                    this.setState({
                      email: text
                    });
                  }} />
              </Item>
              <Item regular style={{ margin: 5 }}>
                <Icon style={styles.white} active name="ios-call" />
                <Input placeholder="Mobile #"
                  // placeholderTextColor="white"
                  text={this.state.mobile}
                  style={styles.white}
                  onChangeText={text => {
                    this.setState({
                      mobile: text
                    });
                  }}
                />
              </Item>
              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-lock" style={styles.white} />

                <Input placeholder="Password"
                  // placeholderTextColor="white"
                  style={styles.white}
                  secureTextEntry={true}
                  text={this.state.password}
                  onChangeText={text => {
                    this.setState({
                      password: text
                    });
                  }}
                />
              </Item>
              <Item regular style={{ margin: 5 }}>
                <Icon active name="ios-lock" style={styles.white} />
                <Input placeholder="Confirm Password"
                  // placeholderTextColor="white"
                  style={styles.white}
                  secureTextEntry={true}
                  text={this.state.password}
                  onChangeText={text => {
                    this.setState({
                      cpassword: text
                    });
                  }}
                />
              </Item>
              <Button iconLeft full
                disabled={this.state.onGoing}
                style={{ marginTop: 20, backgroundColor: '#0C1937' }}
                onPress={() => {
                  this.register();
                }}
              >
                <Icon active name="ios-lock" />
                <Text>Sign Up</Text>
              </Button>
              <CardItem footer style={{ backgroundColor: '#fff' }}>
                <Text style={styles.white}>Already have an account?</Text>
                <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  <Text
                    numberOfLines={1}
                    style={{ paddingLeft: 5, textDecorationLine: "underline", color: 'blue' }}
                  >
                    Sign in
                  </Text>
                </TouchableWithoutFeedback>
              </CardItem>

            </Form>
          </Content>
        </View>
        <Spinner visible={visible} />
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
