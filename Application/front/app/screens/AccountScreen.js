import React, { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import { StyleSheet, View, FlatList } from 'react-native';
import colors from '../config/colors';
import Icon from '../components/Icon';
import ListItemSeperator from '../components/ListItemSeperator';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';
import useAuth from '../auth/useAuth';
import FeedNavigator from '../navigation/FeedNavigator';


const menuItems = [
    {
        title: "My Bookings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary
        },
        onPress: (navigation) => {
            console.log("Navigating to My Bookings...");
            navigation.navigate('Bookings');  // Navigate to 'Booking' screen
        }
    },
    {
        title: "Notifications",
        icon: {
            name: "email",
            backgroundColor: colors.secondary
        },
        // onPress: () => {
        //     console.log("Navigating to Notifications...");
        // }
    },
];

function AccountScreen({navigation}) {
    const {user,setUser} = useAuth();
    
    const handleLogOut = () => {
        setUser(null);
        authStorage.removeToken();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Screen style={styles.screen}>
                <View style={styles.container}>
                    <ListItem
                        title={user.userName}
                        subtitle={user.userEmail}
                        image={require('../assets/user.jpg')}
                    />
                </View>

                <View style={styles.container}>
                    <FlatList
                        data={menuItems}
                        keyExtractor={menuItems => menuItems.title}
                        ItemSeparatorComponent={ListItemSeperator}
                        renderItem={({ item }) =>
                            <ListItem
                                title={item.title}
                                IconComponent={
                                    <Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />
                                }
                                onPress={() => item.onPress(navigation)}
                            />
                        }
                    />
                </View>
                <ListItem
                    title="Log Out"
                    IconComponent={
                        <Icon name="logout" backgroundColor="#ffe66d" />
                    }
                    onPress={handleLogOut}
                />
            </Screen>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    screen: {
        backgroundColor: colors.light,
    },
});

export default AccountScreen;
