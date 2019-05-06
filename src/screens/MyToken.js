import React, { Component } from 'react';
import { Container, Text, Card, Item, Icon, Input, Button, CardItem, H1, Spinner, H3 } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet'
import Footer from '../components/Footer';
import * as firebase from 'firebase';
import { removeUser, updateUser } from '../Redux/action/authAction';
import { removeTokens, updateTokens } from '../Redux/action/tokensAction';
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

class MyToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            p_name: "",
            p_mobile: "",
            remarks: "",
            user_id: props.user.uid,
            tokenExist: false,
            token: null,
            loading: true
        }
        // alert(this.state.user_id);
        this.getToken = this.getToken.bind(this);
    }
    static navigationOptions = {
        title: 'Indus Hospital',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: (
            <Button
                onPress={() => {props.removeUser()}}
                title="+1"
                danger
                style={{ margin: 5 }}
            ><Icon style={{ fontSize: 14 }} name="logout" type="AntDesign" /></Button>
        ),

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

            data.forEach((d) => {
                if (d.user_id === user_id) {
                    that.setState({ token: d, tokenExist: true });

                }

            })
            that.setState({ content: data, loading: false });
        })
    };


    getToken() {
        let { p_name, p_mobile, remarks, user_id } = this.state;
        if (p_name === "" || p_mobile === "" || remarks === "") {
            alert("please fill all fields!");
            return;
        }


        if (this.state.content === null) {
            let arr = [{
                user_id: user_id,
                token: 1,
                patient_name: p_name,
                patient_mobile: p_mobile,
                remarks: remarks,
                date: new Date()
            }]
            db.ref('tokens/' + date).set(arr).then((data) => {
                alert("Your Token number is 1")
            })
        }
        else {
            // alert(data.length);
            let token_num = this.state.content.length + 1;
            let old_arr = this.state.content;
            let found = false;
            old_arr.forEach((t) => {
                if (t.user_id === user_id) {
                    found = true;
                }
            })
            if (!found) {
                old_arr.push({
                    user_id: user_id,
                    token: token_num,
                    patient_name: p_name,
                    patient_mobile: p_mobile,
                    remarks: remarks,
                });
                db.ref('tokens/' + date).set(old_arr).then((data) => {
                    alert("Your Token number is " + token_num);
                })
            }
            else {
                alert("you have already applied for todays token!!");
            }


            // alert("ohk")
        }
    }
    render() {
        const { tokenExist, token, loading } = this.state;
        return (
            <Container style={styles.container}>
                <Container>
                    {
                        loading ?
                            <Spinner />
                            :

                            !tokenExist && !token ?
                                <Container>
                                    <Card style={{ margin: 10, padding: 10 }}>
                                        <View style={styles.image}>
                                            <Image source={require('../../assets/logo.jpg')} style={{ width: 240, height: 80 }} />
                                        </View>
                                        <Item regular style={{ marginLeft: 2, marginRight: 2, marginBottom: 5 }}>
                                            <Icon active name="ios-person" style={styles.white} />
                                            <Input placeholder="Patient Name"
                                                // placeholderTextColor="white"
                                                style={styles.white}
                                                text={this.state.p_name}
                                                onChangeText={text => {
                                                    this.setState({
                                                        p_name: text
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item regular style={{ marginLeft: 2, marginRight: 2, marginBottom: 5 }}>
                                            <Icon active name="ios-person" style={styles.white} />
                                            <Input placeholder="Patient Contact #"
                                                // placeholderTextColor="white"
                                                style={styles.white}
                                                text={this.state.p_mobile}
                                                onChangeText={text => {
                                                    this.setState({
                                                        p_mobile: text
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Item regular style={{ marginLeft: 2, marginRight: 2, marginBottom: 5 }}>
                                            <Icon active name="ios-person" style={styles.white} />
                                            <Input placeholder="Remarks"
                                                // placeholderTextColor="white"
                                                style={styles.white}
                                                text={this.state.remarks}
                                                onChangeText={text => {
                                                    this.setState({
                                                        remarks: text
                                                    });
                                                }}
                                            />
                                        </Item>
                                        <Button
                                            block
                                            style={{ backgroundColor: '#0C1937' }}
                                            onPress={() => {

                                                this.getToken();
                                            }}
                                        >
                                            <Text>Get A Token</Text>
                                        </Button>



                                    </Card>
                                </Container>
                                :
                                <Container>
                                    <Card style={{ margin: 10, padding: 10 }}>
                                        <CardItem style={{justifyContent: 'center', alignContent: 'center'}}>
                                            <TouchableOpacity style={{padding:40,paddingRight:45,paddingLeft:45, borderRadius: 50 , backgroundColor: 'pink'}}>
                                                <H1 style={[styles.tokenNo, {color: 'white'}] }>{token.token}</H1>
                                            </TouchableOpacity>
                                        </CardItem>
                                            <H3 style={{textAlign: 'center'}}>Name: {token.patient_name}</H3>
                                            <Text style={{textAlign: 'center', fontSize: 18}}> Contact #: {token.patient_mobile}</Text>
                                            <Text style={{textAlign: 'center'}}>Details: {token.remarks}</Text>
                                    </Card>
                                </Container>

                    }
                </Container>
                <Footer active={'MyToken'} {...this.props} />
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    headerIcon: {
        fontSize: '1.2rem'
    },
    image: {
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    tokenNo: {
        fontSize: 40
    }
});
const mapStateToProps = (state) => {
    return {

        user: state.authReducers.user,
        tokens: state.tokensReducer.tokens


    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        removeUser: (user) => dispatch(removeUser(user)),
        updateUser: (user) => dispatch(updateUser(user)),
        removeTokens: (tokens) => dispatch(removeTokens(tokens)),
        updateTokens: (tokens) => dispatch(updateTokens(tokens)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyToken);