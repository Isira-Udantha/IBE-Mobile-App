// import { StatusBar } from 'expo-status-bar';
import { View , StyleSheet, TextInput ,Text} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';

import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import AppText from './app/components/AppText';
import Card from './app/components/Card';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import MessageScreen from './app/screens/MessageScreen';
import Screen from './app/components/Screen';
import Icon from './app/components/Icon';
import ListItem from './app/components/ListItem';
import AccountScreen from './app/screens/AccountScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import AppTextInput from './app/components/AppTextInput';
import AppPicker from './app/components/AppPicker';
import LoginScreen from './app/screens/LoginScreen';
import ListingEditScreen from './app/screens/ListingEditScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import FlightSearchScreen from './app/screens/FlightSearchScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';

import AppLoading from 'expo-app-loading';


// const categories = [
//   {label:"Furniture", value: 1},
//   {label:"Clothing", value: 2},
//   {label:"Cameras", value: 3},
// ];

export default function App() {
  // const [firstName, setFirstName] = useState('');

  // const [Category,setCategory]=useState();

  const [user,setUser] = useState();                                    //For Auth

  const [isReady, setIsReady]= useState(false);

  // const restoreToken = async () => {
  //   const token = await authStorage.getToken();
  //   if(!token) return;
  //   setUser(jwtDecode(token));
  // };

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if(user) setUser(user);
  };

  // if(!isReady)
  //   return <AppLoading startAsync={restoreToken} onFinish={() => setIsReady(true)}/>;

  useEffect(() => {
    restoreUser();
  },[]);

  return (
    // <WelcomeScreen/>
  
    // <ListingDetailsScreen/>
  
    
    // <ViewImageScreen></ViewImageScreen>

    // <GestureHandlerRootView style={{ flex: 1 }}>
    /* //   <MessageScreen/> */
    /* </GestureHandlerRootView> */

    // <Screen>
    //   <Icon 
    //     name="email"
    //     size={50}
    //     backgroundColor= "red"
    //     iconColor = "white"
    //     />
    // </Screen>

    // <Screen>
    //   <ListItem 
    //     title="Mytitle" 
    //     // subtitle="My subtitle"
    //     ImageComponent={<Icon name="email"/>}
    //   />

    // </Screen>

    // <AccountScreen/><WelcomeScreen/>

    // <Screen>
    //     <Text>{firstName}</Text>
    //     <TextInput
    //       secureTextEntry
    //       keyboardType='numeric'
    //       clearButtonMode='always'
    //       onChangeText={(text) => setFirstName(text)}
    //       placeholder="First Name"
    //       style={{
    //         borderBottomColor: "#ccc",
    //         borderBottomWidth: 1,  
    //       }}
    //     />
    // </Screen>

    // <Screen>
    //   <AppTextInput placeholder="User Name" icon="email"/>
    // </Screen>

    // <Screen>  
    //   <AppPicker 
    //       selectedItem={Category}
    //       onSelectItem={item => setCategory(item)}
    //       items={categories} icon="apps" placeholder="Category"></AppPicker>
    //   <AppTextInput icon="email" placeholder="Email"></AppTextInput>
    // </Screen>


    // <Screen>
    //   <LoginScreen></LoginScreen>
    // </Screen>

    // <ListingEditScreen></ListingEditScreen>

    // <Screen>
    //   <RegisterScreen></RegisterScreen>
    // </Screen>

    // <Screen>
    //   <FlightSearchScreen></FlightSearchScreen>
    // </Screen>




<AuthContext.Provider value={{user,setUser}}>
    <NavigationContainer theme={navigationTheme}>
      {user ?  <AppNavigator/> : <AuthNavigator/>}
    </NavigationContainer>
</AuthContext.Provider>


  );
}
