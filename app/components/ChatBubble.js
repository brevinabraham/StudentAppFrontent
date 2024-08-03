import React from 'react';
import { Image, Text, View } from 'react-native';
import colors from '../config/colors';




export function ChatBubble({mainuserid, user, userimg, content, time}) {

    return (
        
        <View style={{height: 'auto', margin: '1%', paddingVertical: '1%'}}>
            <View style={{flexDirection: mainuserid == user ? 'row-reverse' : 'row'}}>
                {/* <Image style={{flex: 1, height: '25%', width: '25%', marginHorizontal: '2%', borderRadius: 100}} source={userimg}/> */}
                <View style={{height: '40px', width: '40px', marginHorizontal: '2%', borderRadius: 100, backgroundColor: colors.primaryblue}}/>
                <View style={{flex: 11, flexDirection: 'column', height: '100%', padding: '2%', backgroundColor: colors.primaryblue
                    ,borderTopRightRadius: 20, borderTopLeftRadius: 20, borderBottomLeftRadius: mainuserid == user ? 20: 0, borderBottomRightRadius: mainuserid == user ? 0: 20
                }}>
                    {mainuserid != user ? <Text style={{flex: 1}}>
                        {user}
                    </Text> : <Text></Text> }
                    
                    <Text style={{flex: 1}}>
                        {content}
                    </Text>
                    <Text style={{flex: 1, alignSelf: mainuserid == user ? 'flex-end':'flex-start'}}>
                        {time}
                    </Text>
                </View>
                <View style={{flex: 1, padding: '4%'}}/>
            </View>
            
        </View>
    )
}