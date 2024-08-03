import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../config/colors';



export default function InputBarChat() {


    return (
        <View style={{
            backgroundColor: colors.white,
            width: '97%',
            bottom: '2%',
            marginVertical: '2%',
            marginHorizontal: '1%',
            paddingHorizontal: '1%',
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
                    height: '30px',
                    borderColor: colors.lightgray,
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                }}
                multiline={true}
                placeholder="Type here..."
                value={''}
                onChangeText={null}
            />
            <TouchableOpacity onPress={null}>
                <Icon name="send" size={18} color={colors.primary} style={{ marginHorizontal: 5 }} />
            </TouchableOpacity>
        </View>
    );
}
