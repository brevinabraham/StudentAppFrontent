import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, FlatList, Dimensions  } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { details, logout, userFeedQuestions } from '../config/apiServiceUsers';
import loginscreencss from '../config/loginscreencss';
import colors from '../config/colors'

import { QuestionBox } from '../components/QuestionBox';
import { AddQuestions } from '../components/AddQuestion';
import axios from 'axios';
import { SearchBox } from '../components/SearchBox';

function Dashboard({ navigation }) {
    const [userfname, setUserFname] = useState('UserFirstName')
    const [alldetails, setalldetails] = useState({})
    const [allUserFeedQuestions, setAllUserFeedQuestions] = useState([])
    const [showAddQuestion, setShowAddQuestion] = useState(false)
    const dashboardBottomBannerRef = useRef()
    const [dashboardBottomBannerDims, setDashboardBottomBannerDims] = useState([])
    const [editQ, setEditQ] = useState({})
    const [openQuestionId, setOpenQuestionId] = useState(null);
    const [conversationMode, setConversationMode] = useState(false);
    const [selectedQConversation, setSelectedQConversation] = useState({})
    const {height, width} = Dimensions.get('window')

    const getAllQuestions = async () => {
        try {
            const response = await userFeedQuestions()
            setAllUserFeedQuestions(response.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)))
            for (let item in response) {
                await getImgs(response[item]['id'])
            }
        } catch (err) {
            throw err
        }
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreenWelcome' }],
                })
            );
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const getUserDetails = async () => {
        try {
            const user = await details();
            setUserFname(user.data.fname + " " + user.data.lname)
            setalldetails(user.data)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getUserDetails();
        getAllQuestions();
        getImgs()
    }, []);
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        //console.log(viewableItems);
    }, []);
    const [getPic, setGetPic] = useState({})
    const getImgs = async (id) => {
        const gotPic = await axios.get('https://picsum.photos/200/300')
        setGetPic(prevState => ({
            ...prevState, [id]: gotPic.request.responseURL
        }))
    }

    const addQuestionComponent = (editquestion) => {
        if (editquestion) {
            setEditQ(editquestion)
        }
        setShowAddQuestion(!showAddQuestion)
        setDashboardBottomBannerDims(height -
            dashboardBottomBannerRef.current.offsetHeight)
    }

    const handleAddQuestionClose = () => {
        setShowAddQuestion(false);
        setEditQ({})
        getAllQuestions();
    }

    const handleConversationPress = (item) => {
        setConversationMode(true);
        setSelectedQConversation(item)
    }

    return (
        <SafeAreaView id="dashboard-view"
            style={[{ backgroundColor: colors.black, display: 'flex', flex: 1, paddingHorizontal: '1%', width: '100%' }]}>
            
            <View id="dashboard-top-banner"
                style={{ flexDirection: 'row', flex: 0.5, paddingVertical: 5, paddingHorizontal: '5%', justifyContent: 'space-between' }}>
                <View
                    style={{ alignSelf: 'center' }}>
                    <Text style={{color: colors.white}}>
                        Hi {userfname},
                    </Text>
                </View>
                <TouchableOpacity onPress={handleLogout}
                    style={{ backgroundColor: colors.primarylightpurple, justifyContent: "center", borderRadius: 20 }}>
                    <Text style={[loginscreencss.EmptyBackgroundTextTitle, {paddingHorizontal: 50}]}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
            <View id="dashboard-mid-feed-questions"
                style={{ flex: 10, marginVertical: 5, paddingVertical: 5, borderRadius: 5 }} >
                <SearchBox/>
                {!conversationMode &&
                <FlatList
                    data={allUserFeedQuestions}
                    key={(item) => item['id']}
                    onViewableItemsChanged={onViewableItemsChanged}
                    renderItem={({ item }) => (
                        <View style={{ width: '100%', paddingHorizontal: '1%', alignSelf: 'center' }}
                            onPointerEnter={() => { getImgs(item['id']); }}>
                            <QuestionBox 
                                question={item} 
                                img={getPic[item['id']]} 
                                onClose={getAllQuestions} 
                                editQuestion={addQuestionComponent}
                                isOpen={openQuestionId === item.id}
                                setIsOpen={setOpenQuestionId}
                                onConversationPress={() => handleConversationPress(item)}
                                expanded={false}
                                user_id={userfname}
                            />
                        </View>
                    )}
                />}
                {conversationMode &&
                    <View style={{ width: '100%', height: '95%', paddingHorizontal: '1%', alignSelf: 'center' }}>
                        <QuestionBox 
                            question={selectedQConversation} 
                            img={getPic[selectedQConversation['id']]} 
                            onClose={getAllQuestions} 
                            editQuestion={addQuestionComponent}
                            isOpen={openQuestionId === selectedQConversation.id}
                            setIsOpen={setOpenQuestionId}
                            onConversationPress={() => setConversationMode(false)}
                            expanded={true}
                            user_id={userfname}
                        />
                    </View>
                }
            </View>
            {showAddQuestion && <AddQuestions dashboardBottomDims={dashboardBottomBannerDims} user_id={userfname} onClose={handleAddQuestionClose} Edit={editQ}/>}

            <View id="dashboard-bottom-banner" style={{ flex: 0.5, flexDirection: 'row', alignContent: 'space-between', justifyContent: 'center'}} ref={dashboardBottomBannerRef}>
                <TouchableOpacity onPress={() => {}}  style={{alignItems: 'center', justifyContent: 'center',backgroundColor: 'red', flex:1, borderRadius: 20 }}>   
                    <View  >
                        <Text style={{fontWeight: 'bold'}}>
                            Dasboard
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {JSON.stringify(editQ) === '{}' ? addQuestionComponent() : console.log("hi")}} style={{ backgroundColor: JSON.stringify(editQ) === '{}' ? 'blue': colors.grey, flex:1, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }} >     
                    <View >
                        <Text style={{fontWeight: 'bold'}}>
                            Add Question
                        </Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {}} style={{alignItems: 'center', justifyContent: 'center',backgroundColor: 'green', flex:1, borderRadius: 20  }} >     
                    <View >
                        <Text style={{fontWeight: 'bold'}}>
                            My Account
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Dashboard;
