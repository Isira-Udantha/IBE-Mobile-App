import React, { useContext, useState } from 'react';
import { StyleSheet ,Image, ImageBackground, View, Text} from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { Formik } from 'formik';
import colors from '../config/colors';
import * as Yup from 'yup';
import AppText from '../components/AppText';
import { jwtDecode } from 'jwt-decode';

import {AppForm,AppFormField,ErrorMessage,SubmitButton} from '../components/forms';
import authApi from '../api/auth';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';



const validationSchema = Yup.object().shape({
    userName: Yup.string().required().label("User Name"),
    userPassword: Yup.string().required().min(4).label("Password")
});

function LoginScreen({navigation}) {
    const authContext = useContext(AuthContext);
    // const[email,setEmail] = useState();                      //With Formik it handles the state
    // const[password,setPassword] = useState();
    const[loginFailed, setLoginFailed] = useState(false);

    const handleSubmit = async ({userName, userPassword}) => {
        const result = await authApi.login(userName, userPassword);
        if(!result.ok) return setLoginFailed(true);
        setLoginFailed(false);
        // console.log(result.data);

        // const user = jwtDecode(result.data);                 when uncommenting this line it gives an error
        const { jwtToken, user } = result.data;
        // console.log("JWT Token:", jwtToken);
        // console.log(user);
        authContext.setUser(user);
        authStorage.storeToken(jwtToken);
    };

    return (
        <ImageBackground 
            blurRadius={3}
            style={styles.background}
            source={require('../assets/skywindow.jpg')}>
        <Screen style={styles.container}>
            <View style={styles.cicle}>
            <Image 
                style={styles.logo}
                source={require("../assets/vector.png")}/>
            </View>
            <Text style={styles.tagline}>Your wings to the world!</Text>
            <AppForm
                initialValues={{userName:'',userPassword:''}}
                onSubmit={handleSubmit}
                // onSubmit={(values) => console.log(values)}
                validationSchema={validationSchema}
            >
                <View style={styles.frame}>

                {/* {({handleChange,handleSubmit,errors, setFieldTouched, touched}) => (
                    <> */}
                        <ErrorMessage error="Invalid user name and password." visible={loginFailed}/>
                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="account"
                            keyboardType="default"
                            name="userName"
                            // onBlur={() => setFieldTouched("email")}
                            // onChangeText={handleChange("email")}
                            placeholder="User Name"
                            textContentType="name"
                            width={300}
                        />
                        {/* <AppText style={{color: 'red' }}>{errors.email}</AppText> */}
                        {/* <ErrorMessage error={errors.email} visible={touched.email} /> */}
                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            name="userPassword"
                            // onBlur={()=> setFieldTouched("password")}
                            // onChangeText={handleChange("password")}
                            placeholder="Password"
                            secureTextEntry
                            textContentType="password"
                            width={300}
                        />
                        {/* <AppText style={{color: 'red' }}>{errors.password}</AppText> */}
                        {/* <ErrorMessage error={errors.password} visible={touched.password}/>  */}
                        </View>
                        
                        <SubmitButton title="Login"/>

                        <AppText onPress={()=>navigation.navigate("Register")} style={{color:colors.secondary}} >Not Registered Yet ?</AppText>
                        {/* <AppButton title="Login" onPress={handleSubmit}/> */}
                    {/* </>
                )} */}
                
            </AppForm>
            

        </Screen>
     </ImageBackground>
    );
}

const styles = StyleSheet.create({
    cicle:{
        height:78,
        width:78,
        borderRadius:45,
        backgroundColor:colors.white,
        justifyContent:'center',
        marginBottom:10,
        borderWidth:1.5,
        borderColor:colors.black,
        blurRadius:40,
    },
    container: {
        marginTop:40,
        padding:20,
        alignItems:'center'
    },
    background: {
        flex: 1,
        // justifyContent:'flex-end',
        // alignItems:'center'
    },
    logo:{
        width:80,
        height: 80,
        alignSelf:'center',
        marginTop: 50,
        marginBottom: 50,
        
    },
    frame:{
        backgroundColor:colors.white,
        padding:25,
        borderRadius:15,
        borderColor:colors.primary,
        borderWidth:1,
        marginBottom:115,
        marginTop:35
    },
    tagline:{
        fontSize: 25,
        fontWeight:"800",
        marginBottom:50,
        paddingHorizontal:0,
        color: '#000',
        fontStyle:'italic'
    },
    
})



export default LoginScreen;