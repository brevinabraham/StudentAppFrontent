import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import { debounce } from 'lodash';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../config/colors';
import { retrieveQuestionTemplate, postQuestion, editQuestion } from '../config/apiServiceFeeds';
import { useNavigation } from '@react-navigation/native';

export function AddQuestions({ dashboardBottomDims, user_id, onClose, Edit,  editOnClose}) {
    const initialPickerItems = {
        status_id: { items: ['test', 'test2'], selected: [] },
        tags_id: { items: [], selected: [] },
        topic_id: { items: [], selected: [] },
        subtopic_id: { items: [], selected: [] },
    };

    const [questionTemplate, setQuestionTemplate] = useState([]);
    const [inputHeights, setInputHeights] = useState({});
    const [pickerItems, setPickerItems] = useState(initialPickerItems);
    const [question, setQuestion] = useState({
        user_id: JSON.stringify(Edit) === '{}' ? user_id : Edit.user_id,
        title: JSON.stringify(Edit) === '{}' ? '' : Edit.title,
        content: JSON.stringify(Edit) === '{}' ? '' : Edit.content,
        status_id: JSON.stringify(Edit) === '{}' ? initialPickerItems.status_id.selected : Edit.status_id,
        tags_id: JSON.stringify(Edit) === '{}' ? initialPickerItems.tags_id.selected : Edit.tags_id,
        topic_id: JSON.stringify(Edit) === '{}' ? initialPickerItems.topic_id.selected : Edit.topic_id,
        subtopic_id: JSON.stringify(Edit) === '{}' ? initialPickerItems.subtopic_id.selected : Edit.subtopic_id,
        comments_count: JSON.stringify(Edit) === '{}' ? 0 : Edit.comments_count,
    });
    const [openStates, setOpenStates] = useState({});

    const navigation = useNavigation();

    const getquestions = async () => {
        const response = await retrieveQuestionTemplate();
        setQuestionTemplate(response);
    };

    const addQuestion = async () => {
        question['user_id'] = user_id;
        if (JSON.stringify(Edit) !== '{}') {
            question['created_at'] = Edit.created_at;
            await editQuestion(Edit.id, question);
        } else {
            await postQuestion(question);
            
        }
        onClose();
    };

    useEffect(() => {
        getquestions();
        if (JSON.stringify(Edit) !== '{}') {
            const updatedPickerItems = { ...initialPickerItems };
            if (Edit.status_id) {
                updatedPickerItems.status_id.selected = Edit.status_id;
            }
            if (Edit.tags_id) {
                updatedPickerItems.tags_id = {
                    items: [...initialPickerItems.tags_id.items, ...Edit.tags_id],
                    selected: Edit.tags_id
                };
            }
            if (Edit.topic_id) {
                updatedPickerItems.topic_id = {
                    items: [...initialPickerItems.topic_id.items, ...Edit.topic_id],
                    selected: Edit.topic_id
                };
            }
            if (Edit.subtopic_id) {
                updatedPickerItems.subtopic_id = {
                    items: [...initialPickerItems.subtopic_id.items, ...Edit.subtopic_id],
                    selected: Edit.subtopic_id
                };
            }
            setPickerItems(updatedPickerItems);
        }
    }, []);

    const handleContentSizeChangeDebounced = useCallback(
        debounce((id, newHeight) => {
            setInputHeights((prevHeights) => ({
                ...prevHeights,
                [id]: newHeight
            }));
        }, 0),
        []
    );

    const handleContentSizeChange = (id, event) => {
        const newHeight = event.nativeEvent.contentSize.height;
        if (inputHeights[id] !== newHeight) {
            handleContentSizeChangeDebounced(id, newHeight);
        }
    };

    const handleNewItemChange = (id, newValue) => {
        
        setPickerItems(prevItems => ({
            ...prevItems,
            [id]: {
                ...prevItems[id],
                selected: newValue
            }
        }));
        setQuestion(prevQuestions => ({
            ...prevQuestions,
            [id]: newValue
        }));
    };

    const handleInputChange = (title, value) => {
        setQuestion(prevQuestions => ({
            ...prevQuestions,
            [title]: value
        }));
    };


    const handleOpen = (id) => {
        setOpenStates((prevOpenStates) => ({
            ...prevOpenStates,
            [id]: !prevOpenStates[id]
        }));
    };

    return (
        <BlurView intensity={75}
            style={{height: '95%',width: '100%',position: 'absolute',top: 0,left: 0,display: 'flex',alignItems: 'center',justifyContent: 'center',zIndex: 1}}>
            <View >
                <Text style={{fontSize: 25,fontWeight: 'bold',alignItems: 'center',paddingTop: '25%'}}>
                    {JSON.stringify(Edit) === '{}' ? "Add your question below!" : "Edit your Question"}
                </Text>
            </View>
            <View style={{
                flex: 15,width: '90%',backgroundColor: 'rgba(186,85,255,0.7)',marginTop: '25%',marginBottom: '5%',borderRadius: 20,padding: '2%',}}>
                <FlatList
                    scrollEnabled={true}
                    data={questionTemplate}
                    keyExtractor={(item) => item['id']}
                    renderItem={({ item }) => (
                        <View key={item.id} style={{ alignItems: 'center', marginBottom: 20 }}>
                            <View style={{backgroundColor: colors.primaryblue,width: '100%',alignItems: 'center',borderRadius: 20,padding: 15}}>
                                <Text>
                                    {item.title + (item.required === 1 ? "*" : "")}
                                </Text>
                            </View>
                            {item.inputType === 'string' ? (
                                <View style={{flex: 1,width: '100%',marginVertical: 10,alignItems: 'center'}}>
                                    <TextInput
                                        style={{height: inputHeights[item.id] ? Math.max(40, inputHeights[item.id]) : 40,
                                            width: '90%',borderWidth: 1,borderRadius: 20,padding: 10,}}
                                        multiline={item.multiline}
                                        onContentSizeChange={(event) => handleContentSizeChange(item.id, event)}
                                        placeholder="Enter text"
                                        defaultValue={JSON.stringify(Edit) !== '{}' ? Edit[item.question_field] : ''}
                                        onChangeText={(value) => handleInputChange(item.question_field, value)}
                                    />
                                </View>
                            ) : (
                                <View style={{flex: 1,width: '90%',marginVertical: 10,alignItems: 'center',borderRadius: 20,
                                    paddingBottom: 60,}}>
                                    <DropDownPicker
                                        multiple={true}
                                        mode="BADGE"
                                        placeholder="Select or create an option"
                                        badgeColors={colors.primaryblue}
                                        badgeDotColors={colors.white}
                                        badgeTextStyle={{ color: colors.white}}
                                        badgeStyle={{ padding: 10 }}
                                        open={openStates[item.question_field] || false}
                                        setOpen={() => handleOpen(item.question_field)}
                                        value={pickerItems[item.question_field]?.selected || []}
                                        setValue={(callback) => handleNewItemChange(item.question_field, callback(pickerItems[item.question_field]?.selected))}
                                        items={pickerItems[item.question_field]?.items.map((item, idx) => ({ label: item, value: item, key: idx }))}
                                        setItems={(newItems) => {
                                            setPickerItems(prevItems => ({
                                                ...prevItems,
                                                [item.question_field]: {
                                                    ...prevItems[item.question_field],
                                                    items: newItems
                                                }
                                            }));
                                        }}
                                        style={{borderColor: colors.primaryblue,borderRadius: 20}}
                                        containerStyle={{backgroundColor: colors.white,borderColor: colors.primaryblue,borderRadius: 20,}}
                                        listMode='SCROLLVIEW'
                                        maxHeight={80}
                                        scrollViewProps={{
                                            nestedScrollEnabled: true,
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    )}
                />
                <TouchableOpacity style={{backgroundColor: colors.green, alignItems: 'center', borderRadius: 20,margin: '1%', padding: 10,}} 
                    onPress={addQuestion}>
                    <Text>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </BlurView>
    );
}
