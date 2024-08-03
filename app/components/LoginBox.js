import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity,TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';


import colors from '../config/colors'
import { login } from '../config/apiServiceUsers';
import Dashboard from '../screens/Dashboard';
import { StyleSheet,  } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';



export function LoginBox () {
    const [loginform, setloginform] = useState({})
    const [isFormValid, setIsFormValid] = useState(false);
    const navigation = useNavigation()

    const checkFormValidity = () => {
        if (loginform.email.length >0 && loginform.password.length >0) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };
    const handleInputChange = (key, value) => {
        setloginform({ ...loginform, [key]: value });
        try {
            checkFormValidity()
        } catch (error) {
        }
    };
    const hanndlelogin = async () => {
        const success = await login(loginform.email, loginform.password)
        if (success) {
            navigation.reset({
                index: 0,
                routes: [{name: 'Dashboard'}]
            })
        } else {
            console.log("unfortunate")
        }
    }

    const loginboxcss = StyleSheet.create({
        mainbox:{flex: 2, flexDirection:"column", backgroundColor: colors.logingreen, borderRadius: 20, width: "90%"
        , padding: "10px", alignItems: "center", alignContent: "center", justifyContent: "center"}
    })
    return (
        
            <KeyboardAvoidingView behavior='padding' style = {[loginboxcss.mainbox, {width: "90%"}]}>
                <View style = {[loginboxcss.mainbox]}>
                    <View style = {{width: "100%", margin: "2px", flex: 3, paddingTop: "10px", paddingBottom: "10px"}}>
                        <TextInput
                            label = "email"
                            placeholder="email"
                            onChangeText = {(d) => handleInputChange("email",d)}
                            //focusable ={true}
                            style = {{color: colors.grey, backgroundColor: colors.white, borderRadius: 20, height: "100%", textAlign: "center"}}
                            />
                    </View>
                    <View style = {{width: "100%", margin: "2px", flex: 3, paddingTop: "10px", paddingBottom: "10px"}}>
                        <TextInput
                            label = "password"
                            placeholder="password"
                            onChangeText = {(d) => handleInputChange("password",d)}
                            //focusable = {true}
                            secureTextEntry = {true}
                            style = {{color: colors.grey, backgroundColor: colors.white, borderRadius: 20, height: "100%", textAlign: "center"}}
                            />
                    </View>
                    {isFormValid && 
                        <TouchableOpacity style = {{width: "100%", margin: "5px"
                        , backgroundColor: colors.green, borderRadius: 20, height: "25%", flex: 2, alignContent: "center", justifyContent: "center"
                        , paddingTop: "10px", paddingBottom: "10px"}}
                        onPress={hanndlelogin}
                        >
                            <Text style = {{fontWeight: "bold", textAlign: "center"}}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </KeyboardAvoidingView>
        
        
    )
}


