import {StyleSheet,} from 'react-native';
import Constants from 'expo-constants';
import {Colors} from '../themes/ColorTheme';

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.bgColor,
        padding: 8,
        borderWidth:2,
        borderRadius:3,
    },
    ClickCounter: {
        flex: 1,
        padding:5,
        justifyContent: 'flex-end',
        fontSize:26,
        textAlign: 'right',
        margin:3,
        fontFamily: 'serif',
        color: Colors.counterFontColor,
        fontWeight:'bold',
    },
    EggClick: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5,
    },
    Egg: {
        height: 100,
        maxHeight: 200,
        width: 100,
        maxWidth: 150,
        justifyContent: 'center',
        alignItems: 'center',
        margin:3,
        elevation: 5,
    },
    ClickSpeed: {
        flex: 1,
        padding:10,
        justifyContent: 'center',
        fontSize:24,
        textAlign: 'center',
        margin:3,
        fontFamily: 'serif',
        fontWeight: 'bold',
         color: Colors.speedFontColor,
    },
    ClickBoostMessageHeader: {
        flex: 0.35,
        justifyContent: 'center',
        fontSize:20,
        textAlign: 'center',
        margin:3,
        fontFamily: 'serif',
      //  color: Colors.speedFontColor,
    },
    ClickBoostMessage: {
        flex: 0.35,
        padding:3,
        justifyContent: 'center',
        marginBottom:10,
        textAlign: 'center',       
    //    color: Colors.speedFontColor,
    },
    ClickSpeedButton: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        margin: 3,
        borderRadius: 20,
        borderColor: Colors.buttonColor,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    ClickSpeedButtonText: {
        flex: 1,
        padding:15,
        margin:5,
        justifyContent: 'center',
        fontSize:18,
        fontFamily: 'serif',
        color: Colors.buttonFontColor,
        borderRadius:1,
        borderColor: Colors.buttonPressedColor
    },
      DisabledSpeedButtonText: {
        flex: 1,
        padding:15,
        margin:5,
        justifyContent: 'center',
        fontSize:18,
        fontFamily: 'serif',
        color: Colors.disabledButtonFontColor,
    },
    DisabledButton : {
        backgroundColor: Colors.disabledButtonColor,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        margin: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderColor: Colors.disabledButtonColor,
    },
    ModalView: {
        margin: 20,
        backgroundColor: Colors.bgColor,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    ModalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: 'white',
    },
    ModalText: {
        marginBottom: 15,
        textAlign: 'center',
        padding:5,
        justifyContent: 'flex-end',
        fontSize:26,
        margin:3,
        fontFamily: 'serif',
        color: Colors.counterFontColor,
        fontWeight:'bold'
    },
    CenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    RedoButton: {
        height: 50,
        maxHeight: 75,
        width: 50,
        maxWidth: 75,
        justifyContent: 'center',
        alignItems: 'center',
        margin:3,
        elevation: 5,
    },
});


export default styles;
