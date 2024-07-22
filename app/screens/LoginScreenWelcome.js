import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity,TextInput, KeyboardAvoidingView } from 'react-native';
import loginscreencss from '../config/loginscreencss';
import colors from '../config/colors'
import { CommonActions } from '@react-navigation/native'; // Ensure this import
import { LoginBox } from '../components/LoginBox';
import Dashboard from './Dashboard';
import { isLoggedIn } from '../config/apiServiceUsers';


function LoginScreen({prop,navigation}) {
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [loginBackText, setLoginBackText] = useState("login")

    useEffect(() => {
        checkAuthStatus();
    }, []);


    const checkAuthStatus = async () => {
        try {
            const signedIn = await isLoggedIn();
            if (signedIn) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }],
                    })
                );
            }
        } catch (error) {
            console.error('Error checking authentication status:', error);
        }
    };

    return (
        <SafeAreaView style = {[loginscreencss.LoginBackground, {backgroundColor: colors.white}]}>
            <View style = {loginscreencss.LoginContainersEmptyColor}>
                <Text style = {[loginscreencss.EmptyBackgroundTextTitle,
                    {fontSize: 40,marginTop: '5%', marginBottom: '5%', color:colors.black}]}>
                    Connect with experts
                </Text>               
            </View>
            <View style = {loginscreencss.LoginContainersEmptyColor}>
                <Text style = {[loginscreencss.EmptyBackgroundText,{color:colors.black}]}>
                    Get answers to your academic questions instantly
                </Text>               
            </View>
            <View style = {[loginscreencss.LoginContainersEmptyColor,
                {flex: 5, backgroundColor: colors.white}]}>
                <ImageBackground 
                    style = {{
                        width: "100%", height: "100%", alignContent: "center"
                        ,paddingTop: '5%', paddingBottom: '5%'
                    }}
                    source = {require('../assets/WelcomeMainPicture.jpg')}>
                </ImageBackground>            
            </View>
            {!showLoginForm &&
            <View style = {[loginscreencss.LoginContainersEmptyColor,
                {flexDirection: "row", display: 'flex'}]}>
                <TouchableOpacity onPress={() => navigation.navigate('StudentRegister')}
                    style = {[loginscreencss.LoginContainersEmptyColor,
                    {flex:1, backgroundColor: colors.primarylightpurple}]}>
                    <Text style = {{color: colors.white, padding: 20, fontSize: 30, fontWeight:'bold'}}>
                        Register
                    </Text>      
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate('TeacherRegister')}
                    style = {[loginscreencss.LoginContainersEmptyColor,
                    {flex:1, backgroundColor: colors.primaryblue}]}>
                    <Text style = {[loginscreencss.EmptyBackgroundTextTitle, 
                        {color: colors.white}]}>
                        Teacher
                    </Text>      
                </TouchableOpacity> */}
            </View>}
            
            {showLoginForm && 
                <LoginBox/>
            }
           
            <TouchableOpacity style = {[loginscreencss.LoginContainersEmptyColor, 
                {flex: 0.5}]} onPress={() => {setShowLoginForm(!showLoginForm); (showLoginForm === true ?setLoginBackText("login"):setLoginBackText("back"))}}>
                <Text style = {[loginscreencss.EmptyBackgroundText,{color:colors.black}]}>
                    {loginBackText}
                </Text>               
            </TouchableOpacity>
            <TouchableOpacity style = {[loginscreencss.LoginContainersEmptyColor]}
                onPress={() => {console.log("needhelp pressed")}}>
                <ImageBackground style = {{width: '100%', height: '100%', borderRadius: 55, overflow: 'hidden'}}
                    source = {require('../assets/WelcomeMainBottomBar.jpg')}>
                <Text style = {[loginscreencss.EmptyBackgroundText,
                    {color:colors.black,alignSelf: "center", paddingTop: '3%' }]}>
                    Need help?
                </Text>             
                
                </ImageBackground>   
            </TouchableOpacity>
        </SafeAreaView>
    );
}


export default LoginScreen;