import React, { useState } from 'react';
import { ImageBackground, StyleSheet , View, Image,Text} from 'react-native';
import colors from '../config/colors';
import Screen from '../components/Screen';
import { AppForm ,AppFormField,AppFormPicker,SubmitButton} from '../components/forms';
import AppFormDatePicker from '../components/AppFormDatePicker'
import routes from '../navigation/routes';
import ListingsScreen from './ListingsScreen';
import listings from '../api/listings';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

const airports = [
    { label: "John F. Kennedy International Airport", value: "JFK"},
    { label: "Los Angeles International Airport", value: "LAX"},
    { label: "Dubai International Airport", value: "DXB"},
    { label: "Singapore Changi Airport", value: "SIN"},
    { label: "Sydney Kingsford Smith Airport", value: "SYD"},
    { label: "Heathrow Airport", value: "LHR"},
    { label: "Hong Kong International Airport", value: "HKG"},
    { label: "San Francisco International Airport", value: "SFO"},
    { label: "Charles de Gaulle Airport", value: "CDG"},
    { label: "Tokyo Narita International Airport", value: "NRT"},
    { label: "Frankfurt am Main International Airport", value: "FRA"},
    { label: "Amsterdam Schiphol Airport", value: "AMS"},
    { label: "Toronto Pearson International Airport", value: "YYZ"},
    { label: "Vancouver International Airport", value: "YVR"},
    { label: "Chicago O'Hare International Airport", value: "ORD"},
    { label: "Hartsfield-Jackson Atlanta International Airport", value: "ATL"},
    { label: "Beijing Capital International Airport", value: "PEK"},
    { label: "Incheon International Airport", value: "ICN"},
    { label: "Istanbul Airport", value: "IST"},
    { label: "Miami International Airport", value: "MIA"},
    { label: "Dallas/Fort Worth International Airport", value: "DFW"},
    { label: "Munich International Airport", value: "MUC"},
    { label: "Zurich Airport", value: "ZRH"},
    { label: "Melbourne Airport", value: "MEL"},
    { label: "Barcelona El Prat Airport", value: "BCN"},
    { label: "Rome Fiumicino International Airport", value: "FCO"},
    { label: "Doha Hamad International Airport", value: "DOH"},
    { label: "Newark Liberty International Airport", value: "EWR"},
    { label: "São Paulo-Guarulhos International Airport", value: "GRU"},
    { label: "Mexico City International Airport", value: "MEX"},
];


const P_class = [
    {label: "Buisness", value: 1},
    {label: "Economy", value:2},
]

function FlightSearchScreen({navigation}) {

    function transformData(values) {
        return {
            arrival: values.arrival?.value || null,
            departure: values.departure?.value || null,
            departure_date: values.departure_date || null,
            passengers: values.passengers || null,
            class: values.class?.value || null
        };
    }


    const handleSubmit = async (values) => {
        const transformedData = transformData(values);

        // Ensure all required fields are filled
        if (!transformedData.arrival || !transformedData.departure || !transformedData.departure_date || !transformedData.passengers || !transformedData.class) {
            Alert.alert("All fields must be filled");
            return;
        }
    

        console.log("transformedData : ",transformedData);
        try {
            const response = await listings.searchFlights(transformedData);
            if (response.ok) {
                console.log(response.data)
                navigation.navigate("Flight Listing", { data: response.data });
            } else {
                Alert.alert("Sorry! No Flights on that day");
            }
        } catch (error) {
            Alert.alert("Error fetching flights", error);
        }
    };

    return (
        <ImageBackground 
            blurRadius={20}
            style={styles.background}
            source={require('../assets/night.jpg')}
        >
            <Screen>

            <View style={styles.cicle}>
                    <Image 
                        style={styles.logo}
                        source={require("../assets/vector.png")}
                    />
            </View >
            <Text style={styles.tagline}>Search Your next trip</Text>


            <View style={styles.detailsContainer}>
                <AppForm initialValues={{
                    departure: null,
                    arrival: null,
                    departure_date: '',
                    passengers: '',
                    class: null,
                }} 
                    onSubmit={handleSubmit}
                >

                        <AppFormDatePicker
                            name="departure_date"
                            placeholder="Departure Date"
                        />
                        <View style={styles.airports}>
                          
                                <AppFormPicker icon="airplane-takeoff" items={airports} name="departure" placeholder="Departure" width="50%" numberOfColumns={1}  ></AppFormPicker>
                         
                                <AppFormPicker icon="airplane-landing" items={airports} name="arrival" placeholder="Arrival" width="50%" numberOfColumns={1}></AppFormPicker>
                 
                        
                        </View>
                        <View style={styles.airports}>
                            <AppFormField
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="human-queue"
                                keyboardType="phone-pad"
                                name="passengers"
                                placeholder=""
                                textContentType="none"
                                width={80}
                            />

                            <AppFormPicker icon="seat-passenger" items={P_class} name="class" placeholder="Class" width="50%" numberOfColumns={1}  ></AppFormPicker>


                        </View>
                    <SubmitButton style={styles.button} title="Search" color="secondary"/>

                    
                </AppForm>
                
            </View>

            </Screen>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1
    },
    cicle: {
        height: 70,
        width: 70,
        borderRadius: 45,
        justifyContent: 'center',
        marginBottom: 10,
        marginTop:20,
        borderWidth: 2,
        borderColor: colors.black,
        alignSelf:'center',
        backgroundColor:"#fff",
        
    },
    logo:{
        width: 70,
        height: 70,
        alignSelf: 'center',  
    },
    detailsContainer:{
        height : 430,
        width : 350,
        backgroundColor: colors.white,
        alignItems:'center',
        alignSelf:'center',
        borderRadius:15,
        overflow:'hidden',
        marginTop: 50,
        borderColor:colors.black,
        borderWidth: 2,
        padding:10,
    },
    airports:{
        flexDirection:"row",
        margin:14,
        gap: 15,
    },
    tagline:{
        fontSize: 25,
        fontWeight:"600",
        paddingVertical: 10,
        color: '#fff',
        alignSelf:'center',
        fontStyle:'italic'
    }
   
});

export default FlightSearchScreen;