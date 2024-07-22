import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors'

const LoginScreenCSS = StyleSheet.create({
    LoginBackground: {
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        paddingTop: '5%',
    },
    LoginContainersEmptyColor: {
        width: "90%", 
        borderRadius: 55,
        alignItems: "center",
        alignContent: "center",
        alignContent: "center",
        flex: 1
    },
    EmptyBackgroundTextTitle: {
        fontSize: Dimensions.get('screen').fontScale*35,
        fontWeight: "bold",
        color: colors.white,
        marginTop: '10%', 
        marginBottom: '10%'
    },
    EmptyBackgroundText: {
        fontSize: Dimensions.get('screen').fontScale*20,
        fontWeight: "bold",
        color: colors.white, 
    }
})

export default LoginScreenCSS