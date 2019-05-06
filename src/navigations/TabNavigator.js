import { createAppContainer, createStackNavigator, TabNavigator } from 'react-navigation';

import MyToken from '../screens/MyToken';
import PreviousToken from '../screens/PreviousToken';

const navigator = createStackNavigator({
    MyToken : {screen:MyToken},
    PreviousToken: {screen:PreviousToken}
})

export default TabScreen = createAppContainer(navigator)