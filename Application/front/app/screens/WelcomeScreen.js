import React from 'react';
import { Image, ImageBackground,StyleSheet, View ,Text} from 'react-native';

import AppButton from '../components/AppButton';
import colors from '../config/colors';

function WelcomeScreen({navigation}) {
    return (
        <ImageBackground 
            blurRadius={5}
            style={styles.background}
            source={require('../assets/best6.jpg')}>
            <View style={styles.logoContainer}>
                <View style={styles.cicle}>
                    <Image style={styles.logo} source={require('../assets/vector.png')}></Image>
                </View>
                <View style={styles.taglincontainer}>

                    <Text style={styles.tagline}>Your wings to the world !</Text>
                </View>
            </View>

            <View style={{padding:5 , width:300}}>
                <AppButton title="Search  Flights" onPress={() => navigation.navigate("FlightSearch")} color='coral'></AppButton>
            </View>

            <View style={styles.buttonsContainer}>
            
            <AppButton title="Login" onPress={() => navigation.navigate("Login")}></AppButton>
            <AppButton title="Register" onPress={() => navigation.navigate("Register")} color='secondary'></AppButton>        
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent:'flex-end',
        alignItems:'center',
        padding:5,
    },
    buttonsContainer: {
        width: "100%",
        backgroundColor:"#c0c0c0",
        backgroundColor:colors.white,
        borderWidth:3,
        borderColor:colors.black,
        paddingRight:20,
        paddingLeft:20,
        paddingBottom:10,
        paddingTop:10,
        borderRadius:15,
        marginBottom:1,
        marginTop:20
    },
    cicle:{
        height:78,
        width:78,
        borderRadius:45,
        backgroundColor:colors.light,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderColor:colors.black,
        marginTop:20,
    },
 
    logo: {
        width:80,
        height:80,
        
        
    },
    logoContainer:{
        
        position: 'absolute',
        top:80,
        alignItems:'center'
    },

    tagline:{
        fontSize: 25,
        fontWeight:"800",
        // paddingVertical: 1,
        paddingHorizontal:10,
        color: '#000',
        fontStyle:'italic'
    },
    taglincontainer:{
        // backgroundColor:colors.white,
        borderColor:colors.black,
        // borderWidth:2,
        borderRadius:15,
        marginTop:20,
    }
})
export default WelcomeScreen;