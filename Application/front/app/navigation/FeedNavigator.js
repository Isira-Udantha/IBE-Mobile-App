import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingsScreen from '../screens/ListingsScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import AccountScreen from '../screens/AccountScreen';
import FlightSearchScreen from '../screens/FlightSearchScreen';
import BookingScreen from '../screens/BookingScreen';

const Stack = createNativeStackNavigator();

const FeedNavigator =() => (
    <Stack.Navigator >
        <Stack.Screen name="FlightSearch" component={FlightSearchScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Flight Listing' component={ListingsScreen} 
        // options={(
        //     { route }) => ({
        //         title: `Flight Listing - ${route.params?.departureDate || 'No Date Selected'}`, // Display departureDate in header
        //     })} 
        />
        <Stack.Screen name="Account" component={AccountScreen}/>
        <Stack.Screen name='Bookings' component={BookingScreen}/>
    </Stack.Navigator>
);
export default FeedNavigator;
