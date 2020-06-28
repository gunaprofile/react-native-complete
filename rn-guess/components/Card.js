import React from 'react';
import { View, StyleSheet} from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    )
}
const styles = StyleSheet.create({
    card : {
        shadowColor : 'black', // shadowColor of inputContainer - only works on IOS
        shadowOffset : {    width: 0,
                            height: 2
                        }, // as I said, offset here takes an object. only works on IOS
        shadowRadius : 6, // only works on IOS
        shadowOpacity : 0.26, // only works on IOS
        backgroundColor:'white', // backgroundColor of inputContainer 
        elevation : 8, // only works on Android
        padding : 20,
        borderRadius : 10               
    }
})

export default Card;