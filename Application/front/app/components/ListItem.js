import React from 'react';
import { View,StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';



import AppText from './AppText';
import colors from '../config/colors';


function ListItem({title, subtitle, image, onPress, IconComponent, renderRightActions}) {
    return (
        <Swipeable renderRightActions={renderRightActions}>

            <TouchableHighlight 
                underlayColor={colors.light}
                onPress={onPress}>

            <View style={styles.container}>
                {IconComponent}
                {image && <Image style={styles.image} source={image}></Image>}

                <View style={styles.detailsContainer}>
                    <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
                    {subtitle && <AppText style={styles.subtitle} numberOfLines={2}>{subtitle}</AppText>}
                </View>
                <MaterialCommunityIcons color={colors.medium} name='chevron-right' size={25} />
            </View>
            </TouchableHighlight>
         </Swipeable>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        flexDirection: "row",
        padding:15,
        backgroundColor: colors.white,

    },
    detailsContainer: {
        flex:1,
        marginLeft:10,
        justifyContent:'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },

    subtitle:{
        color: colors.medium,
    },
    title:{
        fontWeight:'500'
    }
})
export default ListItem;