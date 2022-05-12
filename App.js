import * as React from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';

import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';

import { createStore } from 'redux';
import rootReducer from './reducer';
import { Provider } from 'react-redux';
import Tabs from './navigation/Tabs';
import { positionContain } from './reducer';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Signin from './screens/Signin';
import PhoneForm from './screens/PhoneForm';

const store = createStore(rootReducer);

async function requestCameraPermission() {
  //Calling the permission function
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'AndoridPermissionExample App Camera Permission',
      message: 'AndoridPermissionExample App needs access to your camera ',
    }
  );
}
requestCameraPermission();
Geolocation.watchPosition(
  position => {
    store.dispatch(positionContain(position.coords.latitude, position.coords.longitude));
  },
  error => {
    console.log(error.code, error.message);
  },
  {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  let message_body = remoteMessage.notification.body;
  let message_title = remoteMessage.notification.title;
  Alert.alert(message_title, message_body);
});

messaging().onMessage(async remoteMessage => {
  let message_body = remoteMessage.notification.body;
  let message_title = remoteMessage.notification.title;
  Alert.alert(message_title, message_body);
});

const Stack = createStackNavigator();
const Stacks = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  AsyncStorage.getItem('user')
    .then(info => {
      if (info !== null) {
        setIsLogin(true);
      }
    })
    .catch(err => {
      console.log("err", err)
    });

  return (
    <Stack.Navigator
      initialRouteName={isLogin ? 'home' : 'login'}
      screenOptions={{ headerShown: false}}>
      <Stack.Screen name="home" component={Tabs} />
      <Stack.Screen name="login" component={loginProcess} />
    </Stack.Navigator>
  )
}
const init = createStackNavigator();

const loginProcess = () => {
  return (
    <init.Navigator initialRouteName='login'>
      <init.Screen name="login" component={Login} />
      <init.Screen name="signin" component={Signin} />
      <init.Screen name="phone" component={PhoneForm} />
    </init.Navigator>
  )
}


const App = () => {

  //login process
 
  
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stacks />
        </NavigationContainer>
      </Provider>
    );
};

export default App;
