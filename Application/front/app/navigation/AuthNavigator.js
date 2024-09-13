import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import FlightSearchScreen from '../screens/FlightSearchScreen';
import ListingsScreen from '../screens/ListingsScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name="FlightSearch" component={FlightSearchScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Flight Listing' component={ListingsScreen}/>
    </Stack.Navigator>
)

export default AuthNavigator;
