import React, { useRef, useState, useEffect } from 'react';
import { Animated, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';
import { getSingleQuestion, removeQuestion, addLike } from '../config/apiServiceFeeds';
import { AnswersSection } from './AnswersSection';



function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const formattedDate = date.toLocaleString('en-GB', options).replace(',', '');
    return formattedDate;
}

export function QuestionBox ({ question_passed, user_id,  img, onClose, editQuestion, isOpen, setIsOpen, onConversationPress, expanded  }) {
    const translateX = useRef(new Animated.Value(0)).current;
    const [isMoved, setIsMoved] = useState(false);
    const translate_U = useRef(new Animated.Value(0)).current;
    const translate_U_opacity = useRef(new Animated.Value(0)).current
    const [question, setQuestion] = useState(question_passed)


    const updateQuestionBox = async () => {
        console.log("Hi")
        const response = await getSingleQuestion(question.id)
        setQuestion({...response, "id": response["_id"]})

    }

    useEffect(() => {
        if (!isOpen) {
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false
                }),
                Animated.timing(translate_U, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false
                }),
                Animated.timing(translate_U_opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false
                })
            ]).start(() => setIsMoved(false));
        }
        updateQuestionBox(question.id)
    }, []);

    const editBtnPress = async () => {
        await editQuestion(question, updateQuestionBox)
    }
    
    const rmBtnPress = async () => {
        await removeQuestion(question.id)
        onClose()
    }

    const updateLike = async () => {
        await addLike(user_id,question.id )
        updateQuestionBox()
    }

    const handlePress = () => {
        setIsOpen(question.id);
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: isMoved ? 0 : -15,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(translate_U, {
                toValue: isMoved ? 0 : 25,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(translate_U_opacity, {
                toValue: isMoved ? 0 : 1,
                duration: 300,
                useNativeDriver: false
            })
        ]).start(() => setIsMoved(!isMoved));
    };

    return (
        <View style={{ margin: 10, flex: 1}}>
            <View>
                <TouchableOpacity onPress={handlePress}>
                    <Animated.View style={{ 
                        backgroundColor: colors.primaryblue, 
                        borderRadius: 15, 
                        padding: 10, 
                        transform: [{ translateX }],
                        display: 'flex' 
                        ,shadowColor: colors.primaryblue, shadowRadius: '2px', shadowRadius: 20
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start', width: '100%', paddingBottom: 5 }}>
                            <ImageBackground
                                style={{ flex: 1, padding: 20, borderRadius: 100, overflow: 'hidden', flexShrink: 1 }}
                                source={img}
                            />
                            <View style={{ flex: 9, alignSelf: 'center', padding: 20 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, flex: 1 }}>
                                    {question.title}
                                </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 10, flex: 1 }}>
                                    {question.user_id}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={updateLike}
                                style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
                                <Image source={require('../assets/like.png')}
                                    style={{ height: 15, width: 15, alignContent: "center", justifyContent: 'center', marginRight: 3 }}>
                                </Image>
                                <Text style={{ fontWeight: 'bold', fontSize: 10, flex: 1, alignContent: "center", justifyContent: 'center' }}>
                                    {question.like_count}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ flex: 1, paddingVertical: 10 }}>
                            {question.content}
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row', alignContent: "center", justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 10, flex: 1, alignContent: "center", justifyContent: 'center' }}>
                                {formatDate(question.updated_at)}
                            </Text>
                            <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center' }}>
                                <Image source={require('../assets/conversation.png')}
                                    style={{ height: 15, width: 15, alignContent: "center", justifyContent: 'center', marginRight: 3 }}>
                                </Image>
                                <Text style={{ fontWeight: 'bold', fontSize: 10, flex: 1, alignContent: "center", justifyContent: 'center' }}>
                                    {question.comments_count}
                                </Text>
                            </View>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
                <Animated.View style={{
                    position:'absolute',
                    zIndex:-1,
                    transform: [{ translateX: translate_U}],
                    right: 15, 
                    flexDirection: 'column',
                    height:'99%',
                    width: '5%',
                    opacity: translate_U_opacity
                }}>
                    <TouchableOpacity onPress={editBtnPress} style={{flex:1,alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', borderRadius: 15, height:'100%'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>^</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={rmBtnPress} style={{flex:1,alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', borderRadius: 15, height:'100%'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>-</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <AnswersSection style={{flex: 1}} question_id={question.id} user_id={user_id} onPress={onConversationPress} expansion={expanded} onClose={onClose} updateQuestionBox={updateQuestionBox}/>
        </View>
    );
}
