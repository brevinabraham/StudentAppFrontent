import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import colors from '../config/colors';
import { ChatBubble } from '../components/ChatBubble';
import InputBarChat from '../components/InputBarChat';


function GlobalChat() {





    return(

        <SafeAreaView style={{ width:'100%', display: 'flex', flex: 1, backgroundColor: colors.black}}>
            <View style={{overflow: 'scroll' }}>
                <ChatBubble mainuserid={"User"} user={"User"} userimg={"Content"} content={"test\ncont\n\n\n\n"} time={"12:00"}/>
                <ChatBubble mainuserid={"User"} user={"User"} userimg={"Content"} content={"test\ncont\n\n\n\n"} time={"12:00"}/>
                <ChatBubble mainuserid={"test"} user={"User"} userimg={"Content"} content={"test\ncont\n\n\n\n"} time={"12:00"}/>
            </View>
            <View>
                <InputBarChat/>
            </View>
            
        </SafeAreaView>
    )

}

export default GlobalChat