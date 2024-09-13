import React, {useState} from 'react';
import { FlatList, SafeAreaView ,StyleSheet, Platform, StatusBar, View } from 'react-native';
import Constants from 'expo-constants';

import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import ListItemSeperator from '../components/ListItemSeperator';
import ListItemDeleteAction from '../components/ListItemDeleteAction';


const intialMessages = [
    {
        id:1,
        title: 'T1hjvvhkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkknjjjnjkknhvftxcrdxfcgvhbjnklujuyftdrxdcgvhubjikjhyvc fgvbuhiouhgvghgjnkjnjbuhbi',
        description: 'D1',
        image: require('../assets/mosh.jpg')
    },
    {
        id:2,
        title: 'T2',
        description: 'D2jfffffffffffffffffffffffffffffffjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
        image: require('../assets/mosh.jpg')
    }
]
function MessageScreen(props) {

    const [messages, setMessages] = useState(intialMessages);
    const[refreshing,setRefreshing] = useState(false);


    const handleDelete = message => {
        setMessages(messages.filter((m) => m.id !== message.id));
    };
    const renderRightActions = (progress, dragX) => (
        <ListItemDeleteAction
            onPress={() => handleDelete(item)}
        />
    );

    return (
        <Screen>
            <FlatList
                data={messages}
                keyExtractor={message => message.id.toString()}
                renderItem={({item}) => (
                    <ListItem
                        title={item.title}
                        subtitle={item.description}
                        image={item.image}
                        onPress={() => console.log("Message selected",item)}
                        renderRightAction={renderRightActions}
                    />
                )} 
                ItemSeparatorComponent={ListItemSeperator}
                refreshing={refreshing}
                onRefresh={()=> 
                    setMessages([
                        {
                            id:2,
                            title: 'T2',
                            description: 'D2',
                            image: require('../assets/mosh.jpg')
                        },
                    ])
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        paddingTop: Constants.statusBarHeight
    }
})

export default MessageScreen;