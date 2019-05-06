import {createAppContainer,createSwitchNavigator,createStackNavigator,createBottomTabNavigator} from 'react-navigation';
import LoginScreen from '../screens/LoginScr.js';
import SignupScreen from '../screens/SignupScr.js';
import MainScreen from '../screens/MainScr.js';


const AuthScreen = createStackNavigator({
    Login : {screen:LoginScreen},
    Signup: {screen:SignupScreen}
},{
    initialRouteName:"Login"
})

const Auth = createSwitchNavigator({
    AuthScr:AuthScreen,
    Main:{screen:MainScreen}
})

export default NavigatorScreen = createAppContainer(Auth)