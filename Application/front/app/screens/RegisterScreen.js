import React, { useState } from 'react';
import { StyleSheet, Image, ImageBackground, View, ScrollView ,Text} from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';
import * as Yup from 'yup';
import { AppForm, AppFormField, AppFormPicker, SubmitButton} from '../components/forms';
import AppFormDatePicker from '../components/AppFormDatePicker';  // Import the custom component
import useAuth from '../auth/useAuth';
import register from '../api/users';
import users from '../api/users';
import authApi from '../api/auth';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';
import { useContext } from 'react';
import AppText from '../components/AppText';

const validationSchema = Yup.object().shape({
    userEmail: Yup.string()
        .required('Email is required')
        .email('Invalid email format')
        .label("Email"),
    
    userPassword: Yup.string()
        .required('Password is required')
        .min(4, 'Password must be at least 4 characters long')
        .label("Password"),

    userName: Yup.string()
        .required('User Name is required')
        .label("User Name"),

    userBirthDay: Yup.date()
        .required('Date of Birth is required')
        .nullable()
        .label("Date of Birth"),

    userGender: Yup.string()
        .required('Gender is required')
        .oneOf(['Male', 'male' , 'female' ,'Female', 'Other'], 'Invalid gender')
        .label("Gender"),

    userPassport: Yup.string()
        .required('Passport Number is required')
        .matches(/^[A-Z0-9]+$/, 'Invalid passport number')
        .label("Passport Number"),

    userCountry: Yup.string()
        .required('Country is required')
        .label("Country"),  
    
    contactNumbers: Yup.string()
        .required('Contact Number is required')
        .matches(/^\+?[0-9]{10,15}$/, 'Invalid contact number')
        .label("Contact Number"),

    userAddress: Yup.string()
        .required('Address is required')
        .label("Address"),
    
    // userNationality: Yup.object().shape({
    //     label: Yup.string().required("Nationality is required"),
    //     value: Yup.number().required(),
    // }).nullable().required('Nationality is required'),
    
});

const nationality = [
    { label: "Sri Lanka", value: 1 },
    { label: "India", value: 2 },
    { label: "Pakistan", value: 3 },
    { label: "United States", value: 4 },
    { label: "Canada", value: 5 },
    { label: "United Kingdom", value: 6 },
    { label: "Australia", value: 7 },
    { label: "Germany", value: 8 },
    { label: "France", value: 9 },
    { label: "Japan", value: 10 },
    { label: "China", value: 11 },
    { label: "South Korea", value: 12 },
    { label: "Brazil", value: 13 },
    { label: "South Africa", value: 14 },
    { label: "Russia", value: 15 },
    { label: "Mexico", value: 16 },
    { label: "Italy", value: 17 },
    { label: "Spain", value: 18 },
    { label: "Nigeria", value: 19 },
    { label: "Argentina", value: 20 },
    { label: "Bangladesh", value: 21 },
    { label: "Indonesia", value: 22 },
    { label: "Turkey", value: 23 },
    { label: "Egypt", value: 24 },
    { label: "Saudi Arabia", value: 25 },
];



function RegisterScreen({navigation}) {
    const authContext = useContext(AuthContext);
    const [error,setError] = useState();

    function transformData(values) {
        return {
            userName: values.userName,
            userNumber: 19,  // Replace with actual logic if necessary
            userGender: values.userGender.charAt(0).toUpperCase() + values.userGender.slice(1).toLowerCase(),  // Capitalize gender
            userNationality: values.userNationality.label,  // Convert object to string
            userBirthDay: values.userBirthDay,
            userPassport: values.userPassport,
            userCountry: values.userCountry,
            contactNumbers: [values.contactNumbers],  // Convert to array
            userEmail: values.userEmail,
            userAddress: values.userAddress,
            userPassword: values.userPassword,
            role: "User"  // Static role field
        };
    }


    const handleSubmit = async (values) => {
        const userInfo = transformData(values);
        console.log(userInfo);

        const result = await users.register(userInfo);

        if(!result.ok){
            if(result.data) setError(result.data);
            else{
                setError("An unexpected error occured.");
                console.log(result);
            }
            return;
        }

        const output = await authApi.login(
            userInfo.userName,
            userInfo.userPassword,
        );
        const {jwtToken, user} = output.data;
        authContext.setUser(user);
        authStorage.storeToken(jwtToken);
    };

    return (
        <ScrollView>
            <ImageBackground 
                blurRadius={10}
                style={styles.background}
                source={require('../assets/skywindow.jpg')}>
                <Screen style={styles.container}>
                    
                    <View style={styles.cicle}>
                        <Image 
                            style={styles.logo}
                            source={require("../assets/vector.png")}
                        />
                    </View>
                    <Text style={styles.tagline}>Your wings to the world!</Text>

                    

                    <AppForm
                        initialValues={{userEmail:'', userPassword:'', userBirthDay: '', userName: '', userNationality:'', userGender:'', userPassport:'', userCountry:'', contactNumbers:'',userAddress:''}}
                        onSubmit={handleSubmit}
                        // onSubmit={(values) => console.log(values)}
                        validationSchema={validationSchema}
                    >
                    <View style={styles.frame}>
                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="userEmail"
                            placeholder="Email"
                            textContentType="emailAddress"
                            width={270}
                            
                        />

                        <AppFormField
                            autoCapitalize="words"
                            autoCorrect={false}
                            icon="account"
                            keyboardType="default"
                            name="userName"
                            placeholder="User Name"
                            textContentType="name"
                            width={300}
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="gender-male-female"
                            keyboardType="default"
                            name="userGender"
                            placeholder="Gender"
                            textContentType="none"
                            width={150}
                        />

                        <AppFormPicker 
                            icon="flag" 
                            items={nationality} 
                            name="userNationality" 
                            placeholder="Nationality" 
                            width="60%" numberOfColumns={1} >
                        </AppFormPicker>

                        <AppFormDatePicker
                            name="userBirthDay"
                            placeholder="Date of Birth"
                        />

                        <AppFormField
                            autoCapitalize="characters"
                            autoCorrect={false}
                            icon="passport"
                            keyboardType="default"
                            name="userPassport"
                            placeholder="Passport Number"
                            textContentType="none"
                   
                        />

                        <AppFormField
                            autoCapitalize="words"
                            autoCorrect={false}
                            icon="earth"
                            keyboardType="default"
                            name="userCountry"
                            placeholder="Country"
                            textContentType="addressCountry"
                            width={250}
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="phone"
                            keyboardType="phone-pad"
                            name="contactNumbers"
                            placeholder="Contact Number"
                            textContentType="telephoneNumber"
                            width={250}
                        />

                        <AppFormField                                
                            autoCapitalize="words"
                            autoCorrect={false}
                            icon="home"
                            keyboardType="default"
                            name="userAddress"
                            placeholder="Address"
                            textContentType="fullStreetAddress"
                            width={300}
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            name="userPassword"
                            keyboardType="default"
                            placeholder="Password"
                            secureTextEntry
                            textContentType="password"
                            width={300}
                        />
                    </View>    
                        <SubmitButton title="Register" color="secondary"/>        
                    </AppForm>

                    <AppText onPress={()=>navigation.navigate("Login")} style={{color:colors.primary}} >Already Registered ?</AppText>
                    
                </Screen>
            </ImageBackground>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    cicle: {
        height: 75,
        width: 75,
        borderRadius: 45,
        justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: colors.black,
        backgroundColor:colors.white,
        marginTop:20,
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    background: {
        flex: 1,
    },
    logo: {
        width: 76,
        height: 76,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 50,      
    },
    frame: {
        borderWidth:3,
        padding:25,
        backgroundColor:"#fff",
        borderRadius:25,
        borderColor:colors.secondary,
        marginTop:15
    },
    tagline:{
        fontSize: 25,
        fontWeight:"800",
        marginBottom:10,
        color: '#000',
        fontStyle:'italic'
    },
});

export default RegisterScreen;
