import React from 'react';
import { View ,Image ,StyleSheet} from 'react-native';
import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';

function ListingDetailsScreen(props) {
    return (
        <View>
            <Image style={styles.image} source={require('../assets/jacket.jpg')}/>

            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>Red jacket for sale</AppText>
                <AppText style={styles.price}>$100</AppText>
                <View style={styles.userContianer}>

                <ListItem
                    image={require("../assets/mosh.jpg")}
                    title="Mosh Hamedani"
                    subtitle="5 Listing"
                />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer:{
        padding: 20,

    },
    image: {
        width: '100%',
        height: 300
    },
    price:{
        color:colors.secondary,
        fontWeight:"bold",
        fontSize: 20,
        marginVerticle: 10,
    },
    title:{
        fontSize: 24,
        fontWeight: "500",
    },
    userContianer: {
        marginVertical:40,
    }
    

})

export default ListingDetailsScreen;