import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListingsScreen from "../screens/ListingsScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
import AccountScreen from "../screens/AccountScreen";
import FeedNavigator from './FeedNavigator';
import FlightSearchScreen from '../screens/FlightSearchScreen';
import {MaterialCommunityIcons} from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen 
            name="Account" 
            component={AccountScreen} 
            options={{
                headerShown:false,
                tabBarIcon:({color,size})=>
                    <MaterialCommunityIcons name='account' color={color} size={size}/>}}/>
        <Tab.Screen 
            name="Search Flight" 
            component={FeedNavigator} 
            options={{
                headerShown:false,
                tabBarIcon:({color,size})=>
                    <MaterialCommunityIcons name='airplane-search' color={color} size={size}/>}}/>
        {/* <Tab.Screen name='Flight Listings' component={ListingsScreen} /> */}
    </Tab.Navigator>
);

export default AppNavigator;

