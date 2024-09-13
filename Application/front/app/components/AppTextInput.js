import React from 'react';
import { View , Platform,StyleSheet ,TextInput} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import colors from '../config/colors';
import _defaultStyles from '../config/styles'

function AppTextInput({icon,width = "100%", ...otherProps }) {
    return (
        <View style={[styles.container,{width}]}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={_defaultStyles.colors.medium} style={styles.icon}/>}
            <TextInput 
                placeholderTextColor={_defaultStyles.colors.medium}
                style={_defaultStyles.text} {...otherProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.light,
        borderRadius: 25,
        flexDirection: "row",
        // width: "100%",
        padding: 15,
        marginVertical: 10

    },
    icon:{
        marginRight: 10,
    },
})

export default AppTextInput;