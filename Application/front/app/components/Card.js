import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import colors from '../config/colors';
import AppText from './AppText';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function Card({ title, subtitle_1,  subtitle_2, subtitle_3, subtitle_4,from,to}) {
    return (
       
            <View style={styles.card}>
                <Image source={require('../assets/images.jpeg')} style={styles.image} />
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>Flight : {title}</AppText>
                    <View style={styles.insider1}>
                        <AppText style={styles.subtitle}>Departure Time - {subtitle_2}</AppText>
                        <AppText style={styles.subtitle}>Arrival Time - {subtitle_1}</AppText>
                    </View>

                    <View style={styles.insider2}>
                        <AppText style={styles.subtitle}>{subtitle_4}</AppText>
                        <AppText style={styles.subtitle}>{subtitle_3}</AppText>
                    </View>
                    <View>
                        <AppText style={styles.subtitle}>From : {from}</AppText>
                    </View>
                    <View>
                        <AppText style={styles.subtitle}>To : {to}</AppText>
                    </View>
                    
                </View>
            </View>

    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: '#fff',
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth:1

    },
    detailsContainer: {
        padding: 10,

    },
    image: {
        width: "100%",
        height: 30,
    },
    title:{
        marginBottom: 10,
        color:colors.dark,
        fontWeight:'800'
    },
    subtitle:{
        color: colors.medium,
        // fontWeight: 'bold',
    },
    insider1:{
        flexDirection:"row",
        gap:40
    },
    insider2:{
        flexDirection:"row",
        gap:120
    }
});

export default Card;