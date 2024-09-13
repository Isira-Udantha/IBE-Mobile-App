import React, { useState } from 'react';
import { View , Platform,StyleSheet ,TextInput, Modal, Button,TouchableWithoutFeedback, FlatList} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Screen from './Screen';

import colors from '../config/colors';
import _defaultStyles from '../config/styles'
import AppText from './AppText';
import PickerItem from './PickerItem';


function AppPicker({icon, items, numberOfColumns=1 ,onSelectItem, PickerItemComponent = PickerItem , placeholder, selectedItem,width = "100%", ...otherProps }) {

    const[modalVisible, setModalVisible] = useState(false);

    return (
        

        <>    
            <TouchableWithoutFeedback onPress={()=> setModalVisible(true)}>
    
            <View style={[styles.container,{width}]}>
                {icon && <MaterialCommunityIcons name={icon} size={20} color={_defaultStyles.colors.medium} style={styles.icon}/>}
                {selectedItem ? <AppText style={styles.text}>{selectedItem.label}</AppText>: <AppText style={styles.placeholder}>{placeholder}</AppText>}
                {/* <AppText style={styles.text}>{selectedItem ? selectedItem.label : placeholder}</AppText> */} 
                <MaterialCommunityIcons name="chevron-down" size={20} color={_defaultStyles.colors.medium}/>
            </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType='slide'>
                <Screen>
                    <Button title='Close' onPress={() => setModalVisible(false)}/>
                        <FlatList 
                            data={items}
                            keyExtractor={item => item.value.toString()}
                            numColumns={numberOfColumns}
                            renderItem={({item }) => 
                                <PickerItemComponent
                                    item={item}
                                    label={item.label}
                                    onPress={() => {
                                        setModalVisible(false);
                                        onSelectItem(item);
                                    }}
                                />}
                        ></FlatList>
                </Screen>
                
            </Modal>
        </>
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
    placeholder:{
        color:_defaultStyles.colors.medium,
        flex: 1,
    },
    text:{
        flex: 1,

    }
})

export default AppPicker;