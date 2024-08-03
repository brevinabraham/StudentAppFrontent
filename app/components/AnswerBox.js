import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import colors from '../config/colors';

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

export function AnswerBox({user, userimg, content, created_at, like_count}) {
    return (
        <View style={{ gap: '10px', backgroundColor: colors.primarylightpurple, width: '100%', borderRadius: 20, marginVertical: '1%', padding: '2%' }}>
            <View style={{flex: 1}}>
                <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-start', width: '100%', paddingBottom: 5 }}>
                    <Image
                        style={{ flex: 1, padding: 20, borderRadius: 100, overflow: 'hidden', flexShrink: 1 }}
                        source={userimg}
                    />
                    <View style={{ flex: 9, alignSelf: 'center', padding: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, flex: 1 }}>
                            {user}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
                        <Image source={require('../assets/like.png')}
                            style={{ height: 15, width: 15, alignContent: "center", justifyContent: 'center', marginRight: 3 }}>
                        </Image>
                        <Text style={{ fontWeight: 'bold', fontSize: 10, flex: 1, alignContent: "center", justifyContent: 'center' }}>
                            {like_count}
                        </Text>
                    </View>
                </View>
                <View  style={{flex: 1, padding: '1%'}}>
                    <Text>
                        {content}
                    </Text>
                </View>
            </View>
        </View>
    )
}