import React, { useState } from 'react'; 
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
  } from 'react-native';
  
import Card from '../Card';
import Colors from '../../constants/colors'
import Input from '../Input'
import NumberContainer from '../NumberContainer';
import BodyText from '../BodyText';
import TitleText from '../TitleText';
import MainButton from '../MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };
    const restInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    let confirmedOutput;

    if(confirmed){
    confirmedOutput = (<Card style={styles.summaryContainer}>
                            <BodyText>You selected</BodyText>
                            <NumberContainer>{selectedNumber}</NumberContainer>
                            <MainButton onPress={() => props.onStartGame(selectedNumber)} > START GAME </MainButton>
                        </Card>
                        );
    }

    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredValue)
        if(isNaN(choosenNumber) || choosenNumber <=0 || choosenNumber >99){
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99.', [{text : 'Okay', style:'destructive', onPress: restInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(choosenNumber)
        setEnteredValue('');
        Keyboard.dismiss();
    };
    

    return (
        <TouchableWithoutFeedback
        onPress={() => {
            Keyboard.dismiss();
        }}
        >
        <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText>Select a Number</BodyText>
                <Input 
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2} 
                onChangeText={numberInputHandler}
                value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Reset" onPress={ restInputHandler } color={Colors.secondary}/></View>
                    <View style={styles.button}><Button title="Confirm" onPress={ confirmInputHandler } color={Colors.primary} /></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding: 10,
        alignItems : 'center',
        // justifyContent : 'flex-start' // default even if you won't set i will take flex-start
    },
    title : {
        fontSize : 20,
        marginVertical : 10, //add some spacing on the vertical axis with marginVertical, always keep in mind, margin vertical basically replaces marginBottom and marginTop
        fontFamily: 'open-sans-bold'
    },
    inputContainer : {
        width : 300,
        maxWidth : '80%',
        alignItems : 'center'
    },
    buttonContainer : {
        flexDirection : 'row',
        // the button container will get a flex direction of row, the default is column but now I want to have items sit next to each other, so we need to use row here.
        width: '100%',
        justifyContent : 'space-between',
        paddingHorizontal : 15 // so that the buttons don't actually sit directly on the edges on the left and right but there is some spacing out on the left and right
    
    },
    button : {
        width : 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop : 20,
        alignItems : "center"
    }
})

export default StartGameScreen;