import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Colours } from '../components/styles';
const {primary, tertiary} = Colours;
import Login from './../screens/Login';
import SignUp from './../screens/SignUp';
import Welcome from './../screens/Welcome';

const Stack = createNativeStackNavigator();

const RootStack = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle:{
                        backgroundColor: 'transparent'
                    },
                    headerTextColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerContainerStyle:{
                        padding: 20
                    }

                }}
                initialRouteName='Login'
            >
                <Stack.Screen name="Login" component={Login} options={{headerTintColor: primary}}/>
                <Stack.Screen name="SignUp" component={SignUp} options={{headerTintColor: primary}}/>
                <Stack.Screen name="Welcome" component={Welcome} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;