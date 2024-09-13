import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';

const data = [
{
    flightId: 1,
    flightDesignator: `Airbus A220\n\n20/10/2024                             21/10/2024`,
    arrivalTime: "16:25",
    
    departureTime: "12:25",
    to: "Sydney Kingsford Smith Airport",
    from: "San Francisco International Airport",
},
{
    flightId: 2,
    flightDesignator: 'Airbus A221\n\n29/11/2024                             30/11/2024',
    arrivalTime: "16:25",
    
    departureTime: "13:35",
    to: "Istanbul Airport",
    from: "Zurich Airport",
},
{
    flightId: 3,
    flightDesignator: 'Airbus A222\n\n30/12/2024                             01/01/2025',
    arrivalTime: "16:25",
    
    departureTime: "14:15",
    to: "Newark Liberty International Airport",
    from: "Miami International Airport",
},
{
    flightId: 4,
    flightDesignator: 'Airbus A223\n\n01/01/2025                             02/01/2025',
    arrivalTime: "16:25",
    
    departureTime: "16:15",
    from: "Chicago O'Hare International Airport",
    to: "Istanbul Airport   ",
    
},
];

function BookingScreen(params) {

    return (
        <Screen style={styles.screen}>
            <FlatList 
                data={data}
                keyExtractor={(item) => item.flightId.toString()}
                renderItem={({item}) => 
                    <Card 
                        title={item.flightDesignator}
                        subtitle_1={item.arrivalTime}
                        subtitle_2={item.departureTime}
                        to={item.to}
                        from={item.from}
                    />
            }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen:{
        padding:20,
        backgroundColor: colors.light
    }
})

export default BookingScreen;