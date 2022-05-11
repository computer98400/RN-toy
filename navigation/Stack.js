import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ReceivedBox from '../screens/ReceivedBox';
import Login from '../screens/Login';
import Signin from '../screens/Signin';
import PhoneForm from '../screens/PhoneForm';
import MessagePerson from '../components/sendmessage/MessagePerson';
import MessageContent from '../components/sendmessage/MessageContent';
import MessageTime from '../components/sendmessage/MessageTime';
import MessageType from '../components/sendmessage/MessageType';
import MessagePlace from '../components/sendmessage/MessagePlace';
import Messagedetail from '../components/Messagedetail';
const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const AlarmStack = createStackNavigator();
const MessageStack = createStackNavigator();
const SendStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#867AE9',
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',

            }}>
            <HomeStack.Screen name="Home" component={Home} />
        </HomeStack.Navigator>
    )
}




function AccountStackScreen() {
    return (
        <AccountStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#867AE9',
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
            }}>
            <AccountStack.Screen name="login" component={Login} />
      <AccountStack.Screen name="signin" component={Signin} />
      <AccountStack.Screen name="phone" component={PhoneForm} />
        </AccountStack.Navigator>
    );
}



function AlarmStackScreen() {
    return (
        <AlarmStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#867AE9',
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',

            }}>
            <AlarmStack.Screen name="Alarm" component={ReceivedBox} />
        </AlarmStack.Navigator>
    )
}



function MessageStackScreen() {
    return (
        <MessageStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#867AE9',
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
            }}>
            
        </MessageStack.Navigator>
    )
}



function SendStackScreen() {
    return (
        <SendStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#867AE9',
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',

            }}>
            <SendStack.Screen name="Person" component={MessagePerson } />
            <SendStack.Screen name="Time" component={MessageTime } />
            <SendStack.Screen name="Place" component={MessagePlace } />
            <SendStack.Screen name="Content" component={MessageContent } />
            <SendStack.Screen name="Type" component={MessageType} />
            <SendStack.Screen name="Total" component={Messagedetail } />
        </SendStack.Navigator>
    )
}

export {
    HomeStackScreen,
    AlarmStackScreen,
    MessageStackScreen,
    AccountStackScreen,
    SendStackScreen,
}