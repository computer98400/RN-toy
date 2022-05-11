import * as React from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';

import { createStore } from 'redux';
import rootReducer from './reducer';
import { Provider } from 'react-redux';
import Tabs from './navigation/Tabs';
import { positionContain } from './reducer';
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

const App = () => {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </Provider>
    );
};

export default App;
