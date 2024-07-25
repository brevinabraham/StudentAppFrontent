import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';
import { AnswerBox } from './AnswerBox';
import { InputBarAnswer } from './InputBarAnswer';
import { getAnswersID } from '../config/apiAnswers';

export function AnswersSection({ question_id, user_id, onPress, expansion, updateQuestionBox, onClose }) {
    const [answers, setAnswers] = useState([])

    const allAnswersID =  async () => {
        const getAnsID =  await getAnswersID(question_id)
        setAnswers(getAnsID)
    }

    useEffect(()=>{
        if (expansion){
            allAnswersID()
        }
    },[])

    if (!expansion){
        return (
            <TouchableOpacity style={{flex:1, marginVertical:'0.5%'}} onPress={onPress}>
                <View style={{ alignSelf: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: colors.logingreen, borderRadius: 20, display: 'flex', padding: 8 }}/>
        </TouchableOpacity>
        )
    }
    return (
        <View style={{flex:1, marginVertical:'0.5%'}} >
            <InputBarAnswer style={{zIndex: 1}} question_id={question_id} user_id={user_id} updateAnswerSection={allAnswersID} updateQuestionBox={updateQuestionBox}/>
            <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'flex-start', top: '10%', width: '100%', height: '87%', backgroundColor: colors.logingreen, borderRadius: 20, display: 'flex', padding: 8, overflow: 'scroll', paddingBottom: '2%',  }} onPress={onPress}>
                <FlatList
                    data={answers}
                    key={(answers)=> answers['id']}
                    renderItem={({item})=>(
                        <AnswerBox user={item.user_id} content={item.content} created_at={item.created_at} like_count={item.like_count}/>
                    )}
                />   
            </TouchableOpacity>
            
        </View>
    );
}