import React, { useRef, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Animated } from 'react-native';
import { enGB, registerTranslation, DatePickerInput } from 'react-native-paper-dates';
import axios from 'axios';

import colors from '../config/colors'
import loginScreenCSS from '../config/loginscreencss';

registerTranslation('en-GB', enGB)
const BASE_URL = 'http://192.168.0.14:8000'
function StudentRegister({prop,navigation}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const translationYvalue = useRef(new Animated.Value(0)).current
    const fadeout = useRef(new Animated.Value(100)).current
    const [Questions, setQuestions] = useState([])
    const [regUser, setRegUser] = useState({});

    useEffect(() => {
        axios.get(`${BASE_URL}/api/user/questions/`)
            .then(response => setQuestions(response.data))
            .catch(err => console.error('Error fetching questions:', err))
    },[setQuestions])

    useEffect(() => {(currentQuestionIndex >0 ) && (
        Animated.timing(translationYvalue,{
            toValue: 50,
            useNativeDriver: true
        })).start()
    },[])

    const handleNextQuestion = () => {
        Animated.parallel([
            Animated.timing(translationYvalue, {
            toValue: 500,
            duration: 125,
            useNativeDriver: true,
            }),
            Animated.timing(fadeout, {
            toValue: 0,
            useNativeDriver: true,
            })]
        ).start(() => {
            setCurrentQuestionIndex((prevIndex) => prevIndex == Questions.length-1 ? Questions.length-1 : prevIndex + 1 );
            Animated.parallel([
                Animated.timing(translationYvalue, {
                toValue: '0',
                duration: 125,
                useNativeDriver: true,
                }),
                Animated.timing(fadeout, {
                toValue: 100,
                useNativeDriver: true,
                })
            ]).start()})
    }

    const handlePrevQuestion = () => {
        Animated.parallel([
            Animated.timing(translationYvalue, {
            toValue: 500,
            duration: 125,
            useNativeDriver: true,
            }),
            Animated.timing(fadeout, {
            toValue: 0,
            useNativeDriver: true,
            })]
        ).start(() => {
            setCurrentQuestionIndex((prevIndex) => prevIndex == 0 ? 0 : prevIndex- 1);
            Animated.parallel([
                Animated.timing(translationYvalue, {
                toValue: '0',
                duration: 125,
                useNativeDriver: true,
                }),
                Animated.timing(fadeout, {
                toValue: 100,
                useNativeDriver: true,
                })
            ]).start()})
    }

    function authenticateRegUserInputs () {
        console.log("auth started")
        console.log(regUser)
        for (let item in regUser) {
            console.log(item, regUser[item])
        }
        console.log("auth started")

        return true
    }

    const postUser = async () => {
        await axios.post(`${BASE_URL}/api/user`, {
                ...regUser
                , "dob":regUser["dob"].toLocaleDateString()
                , "roles": ["1"]})
                .then(response => {
                    console.log(response)
                    navigation.replace('LoginScreenWelcome')
                })//need to encrypt this data to be sent to the backend
                .catch (err => console.log(err))

        // let authUserIn = authenticateRegUserInputs()
        // let authUser = false
        // let userRoles = []
        // let userID = ''
        // await axios.get(`${BASE_URL}/api/user/${regUser["email"]}`)
        //     .then(response => {
        //         authUser = response.data["bool"]
        //         userRoles = response.data["userRole"]
        //         userID = response.data["userID"]
        //     })
        
        // if (authUser && !('Student' in userRoles)) {
        //     await axios.put(`${BASE_URL}/api/user/${userID}`,{
        //         ...regUser
        //         , "dob":regUser["dob"].toLocaleDateString()
        //         , "role": [...userRoles, "1"]
        //         })
        //         .then(() => {
        //             console.log("user updated")
        //             navigation.navigate('LoginScreenWelcome')
        //         })
            
        // } else if (!authUser){
            
        
        // }
        
    }
    

    return (
        <SafeAreaView style={{flex: 1, alignContent: "center" }}>
            <KeyboardAvoidingView behavior='padding' style ={{flex: 1}}>
            <ScrollView contentContainerStyle = {{alignItems: "center", flexGrow: 1}}>
                <View style={[loginScreenCSS.LoginContainersEmptyColor,{flex:8}]}>
                    <ImageBackground source={require('../assets/StudentRegister.jpg')}
                        style = {{
                        width: "100%", height: "100%", alignContent: "stretch"
                        , overflow: 'hidden', borderRadius: 55}}>
                    </ImageBackground>
                </View>
                <View style={[loginScreenCSS.LoginContainersEmptyColor, {flex: 1}]}>            
                    <Text style ={[loginScreenCSS.EmptyBackgroundTextTitle,
                        {flex: 1, color: colors.primarylightpurple,fontSize: 40,margin: 0}]}> 
                        Register a Student
                    </Text>
                    <Text style ={[loginScreenCSS.EmptyBackgroundText, 
                        {flex: 1, color: colors.primarylightpurple, margin: 0, padding:0}]}> 
                        Register and ask questions today!
                    </Text>
                </View>
                 <Animated.View
                style={[
                    loginScreenCSS.LoginContainersEmptyColor,
                    {
                        backgroundColor: colors.primarylightpurple,
                        flex: 1,
                        borderRadius: 20,
                        paddingTop: '4%',
                        paddingBottom: '4%',
                        transform: [
                            {translateY: translationYvalue}
                        ],
                        opacity: fadeout
                    },
                    ]}
                >
                    {Questions.map((question, index) => (
                    index === currentQuestionIndex && (
                    <View key={question.var_id} style={[loginScreenCSS.LoginContainersEmptyColor
                        , { backgroundColor: colors.white, flex: 1, borderRadius: 20, paddingTop: '4%'
                            , paddingBottom: '4%', alignItems: "flex-start", paddingLeft: "5%" }]}>
                        <Text style={{ color: colors.black, flex: 1 }}>
                            {question.title}:
                        </Text>
                        <View style={[loginScreenCSS.LoginContainersEmptyColor
                            , { backgroundColor: colors.primarylightpurple, flex: 1, borderRadius: 20, paddingTop: '4%'
                            , paddingBottom: '4%', alignItems: "center", alignContent: "center"
                            , justifyContent: "center" }]}>
                            {question.title.toLowerCase().includes("date") ? (
                                <DatePickerInput
                                    autoFocus
                                    locale="en-GB"
                                    mode = "single"
                                    value={regUser[question.var_id] || ''}
                                    onChange={(d) => setRegUser({...regUser, [question.var_id]: d})}
                                    inputMode = "start"
                                    presentationStyle = "pageSheet"
                                    autoComplete={question.autocomplete} 
                                    style = {{ color: colors.white, borderRadius: 20}}
                                    focusable = {true}
                                    />
                            ) : (
                                <TextInput 
                                    autoFocus
                                    key={question.var_id} 
                                    placeholder={question.question}
                                    value={regUser[question.var_id] || ''}
                                    onChangeText={(d) => setRegUser({...regUser, [question.var_id]: d})}
                                    keyboardType={question.keyboardtype} 
                                    autoComplete={question.autocomplete} 
                                    placeholderTextColor={colors.white} 
                                    focusable = {true}
                                    secureTextEntry = {question.secure}
                                    />
                            )}
                        </View>
                        </View>
                    )
                    ))}
                </Animated.View>
                <View style={[loginScreenCSS.LoginContainersEmptyColor,{flex:1, flexDirection: "row"}]}>
                    <TouchableOpacity onPress={handlePrevQuestion}
                        style = {[loginScreenCSS.LoginContainersEmptyColor,
                        { backgroundColor: colors.primarylightpurple, alignItems: "center", alignContent: "center"
                        , justifyContent: "center"}]}
                        focusable = {true}      
                        >
                        <Text style ={[loginScreenCSS.EmptyBackgroundText, 
                        {color: colors.white, paddingTop: '2%', paddingBottom: '2%', fontSize: 30}]}> 
                            {'<'}
                        </Text>      
                    </TouchableOpacity>
                    {currentQuestionIndex == Questions.length-1 ? 
                            (
                                <TouchableOpacity onPress={postUser}
                                    style = {[loginScreenCSS.LoginContainersEmptyColor,
                                    { backgroundColor: colors.primarylightpurple, alignItems: "center", alignContent: "center"
                                    , justifyContent: "center"}]}
                                    focusable = {true}      
                                    >
                                    <Text style ={[loginScreenCSS.EmptyBackgroundText, 
                                        {color: colors.white, paddingTop: '2%', paddingBottom: '2%', fontSize: 30}]}> 
                                        {'Submit'}
                                    </Text> 
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={handleNextQuestion}
                                    style = {[loginScreenCSS.LoginContainersEmptyColor,
                                    { backgroundColor: colors.primarylightpurple, alignItems: "center", alignContent: "center"
                                    , justifyContent: "center"}]}
                                    focusable = {true}      
                                    >
                                    <Text style ={[loginScreenCSS.EmptyBackgroundText, 
                                        {color: colors.white, paddingTop: '2%', paddingBottom: '2%', fontSize: 30}]}> 
                                        {'>'}
                                    </Text> 
                                </TouchableOpacity>
                            )}
                             
                </View>


            </ScrollView>
            
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default StudentRegister;

