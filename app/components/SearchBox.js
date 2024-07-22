import React from 'react';
import { Text, TextInput, View } from 'react-native';
import colors from '../config/colors';

export function SearchBox() {


    return (
        <View style={{ alignSelf: 'center', justifyContent: 'center', width: '95%', backgroundColor: colors.logingreen, borderRadius: 20, display: 'flex', padding: 8, marginVertical: 5}}>
            <TextInput
                style={{padding: '0.5%'}}
                placeholder='Search here ..'
            />
        </View>
    )
}