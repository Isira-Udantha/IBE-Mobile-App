import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';

// const data = [
// {
//     flightId: 1,
//     flightDesignator: 'Airbus A220',
//     arrivalTime: "16:25",
    
//     departureTime: "12:25"
// },
// {
//     flightId: 2,
//     flightDesignator: 'Airbus A221',
//     arrivalTime: "16:25",
    
//     departureTime: "13:35"
// },
// {
//     flightId: 3,
//     flightDesignator: 'Airbus A222',
//     arrivalTime: "16:25",
    
//     departureTime: "14:15"
// },
// {
//     flightId: 4,
//     flightDesignator: 'Airbus A223',
//     arrivalTime: "16:25",
    
//     departureTime: "16:15"
// },
// ];

function ListingsScreen({route}) {
    const { data = {} } = route.params;
    const flightData = data.data || []; // Ensure flightData is an array

    console.log('Received data in ListingsScreen:', flightData);

    // Transform the data to match the required format
    const transformData = (flights) => {
        return flights.map(flight => ({
            flightId: flight.flightId,
            flightDesignator: flight.flightDesignator,
            arrivalTime: flight.arrivalTime.slice(0, 5), 
            departureTime: flight.departureTime.slice(0, 5),
            departureDate: flight.departureDate,
            arrivalDate: flight.arrivalDate,
            from: flight.arrivalAirport,
            to:flight.departureAirport,
        }));
    };

    const flights = transformData(flightData);




    return (
        <Screen style={styles.screen}>
            {/* <View>
                <AppText>{flights.departureDate}</AppText>
            </View> */}
            <FlatList 
                data={flights}
                keyExtractor={(item) => item.flightId.toString()}
                renderItem={({item}) => 
                    <Card 
                        title={item.flightDesignator}
                        subtitle_1={item.arrivalTime}
                        subtitle_2={item.departureTime}
                        subtitle_3={item.arrivalDate}
                        subtitle_4={item.departureDate}
                        from={item.from}
                        to={item.to}
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

export default ListingsScreen;