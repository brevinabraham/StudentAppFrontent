import React, { useEffect, useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../config/colors';
import { addAnswer } from '../config/apiAnswers';

export function InputBarAnswer({question_id, user_id, updateAnswerSection, updateQuestionBox}) {
    const [inputHeight, setInputHeight] = useState(50);
    const [answerValue, setAnswerValue] = useState('')


    const updateAnswer = async () => {
        console.log("Hi")
        await addAnswer({question_id,user_id,"content": answerValue})
        setAnswerValue('')
        updateAnswerSection()
        updateQuestionBox(question_id)
    }
    useEffect(()=>{

    },[question_id])

    return (
        <View style={{
            backgroundColor: colors.white,
            width: '100%',
            marginVertical: '2%',
            borderRadius: 20,
            padding: 5,
            position: 'absolute',
            zIndex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <TextInput
                style={{
                    flex: 1,
                    height: inputHeight,
                    borderColor: colors.lightgray,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                }}
                multiline={true}
                placeholder="Type here..."
                onContentSizeChange={(event) => {
                    setInputHeight(event.nativeEvent.contentSize.height);
                }}
                value={answerValue}
                onChangeText={(item)=>setAnswerValue(item)}
            />
            <TouchableOpacity onPress={() => updateAnswer()}>
                <Icon name="send" size={18} color={colors.primary} style={{ marginHorizontal: 5 }} />
            </TouchableOpacity>
        </View>
    );
}
