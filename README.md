# react-native-complete

## Components, styling and layout - Building Real Apps

### Intro

* Lets create a new project with  expo 

```js
expo init rn-guess
```

* Then remove the app.js text and it style

### Adding a Custom Header Component

* Then create a folder "components" 

*  views really are a bit more flexible regarding the styles you can assign and regarding how they behave and therefore, you always want to use a view for such a surrounding container and for this overall styling your component might have or parts of your component might have.

```js
//components/Header.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width : '100%',
        height : 90,
        paddingTop : 36,
        backgroundColor : '#f7287b',
        alignItems: 'center',
        justifyContent : 'center'
    },
    headerTitle : {
        color : "black",
        fontSize: 18
    }
});

export default Header;

```

* In app.js let add some style to the view 

* Now we can assign this here and flex one will ensure that this view takes all the space it can get and since it's the root view of our application, that means it will take all the width and height it can get, it will occupy the full screen and therefore since my header takes width 100%, since I'll add it directly inside of this view which is now configured to take the full width and height, this header will also take the full width.

```js
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header'

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen : {
    flex : 1
  }
});
```

###  Adding a Screen Component

* So now that we got a header,in the app.js file, below the header, I of course want to have the input area of the user.Now just as before, I'll handle this in a separate component and not here in app.js to keep all components relatively lean and we could create this component here in the components folder

```js
// components/screens/StartGameScreens

import React from 'react'; 
import { View, Text, StyleSheet} from 'react-native';

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text> Dummy Text</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding: 10,
        alignItems : 'center',
        // justifyContent : 'flex-start' // default even if you won't set i will take flex-start
    }
})

export default StartGameScreen;
```

* Here on style again we added screen property here to this stylesheet object which I can do, it will not clash with the one in app.js, we could have also chosen different names, these two are simply not related because these are independent Javascript objects in the end managed in independent files.

* Keep in mind that every view by default uses flexbox and by default uses flex direction column, align items it positions items along the cross axis, so since the default direction is column, the cross axis is left to right, so it's a horizontal axis, so this will align items in the center horizontally but not vertically.

* Now lets use the above component in app.js

```js
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header'
import StartGameScreen from './components/screens/StartGameScreen';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      <StartGameScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen : {
    flex : 1
  }
});
```

### Working on the Layout

* Now lets improve this SartGameScreen

```js
import React from 'react'; 
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}> Start a New Game! </Text>
            <View style={styles.inputContainer}>
                <Text> Select a Number </Text>
                <TextInput />
                <View style={styles.buttonContainer}>
                    <Button title="Reset" onPress={ () => {} }/>
                    <Button title="Confirm" onPress={ () => {} }/>
                </View>
            </View>
        </View>
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
        marginVertical : 10 //add some spacing on the vertical axis with marginVertical, always keep in mind, margin vertical basically replaces marginBottom and marginTop
    },
    inputContainer : {
        width : 300,
        maxWidth : '80%',
        alignItems : 'center',
    },
    buttonContainer : {
        flexDirection : 'row',
        // the button container will get a flex direction of row, the default is column but now I want to have items sit next to each other, so we need to use row here.
        width: '100%',
        justifyContent : 'space-between',
        paddingHorizontal : 15 // so that the buttons don't actually sit directly on the edges on the left and right but there is some spacing out on the left and right
    
    }
})

export default StartGameScreen;
```

### Styling a View as a "Card" Container (with Drop Shadows & Rounded Corners)

* it would be nice to have that card to look there and for that, we need some more exotic styles which sounds really fancy but simply some style rules we haven't used before.

* For example, I want to add a shadow, a slight drop shadow and you do this with four core properties which you can use. A color, an offset, an opacity and a radius.

* Now a shadow color should be clear, it's the color of your shadow. 

* Shadow offset is how much it's offset from your container and that actually takes the object which then in turn takes a width and a height, so you could say I want to offset the shadow by two pixels regarding the width and by two pixels regarding the height, that influences the three dimensional effect you're creating.

```js
```

* elevation simplytakes a number of let's say 5 and then uses the default Android material design elevation, so you have less control there but on the other hand, you get the default material design looks which your users might be used to anyways,

* On iOS, you will also notice that the shadow is visible on the left and right of the box as well even though I gave this a shadow offset of 0 for the width, that can be controlled with the shadow radius 

```js
const styles = StyleSheet.create({
    inputContainer : {
            width : 300,
            maxWidth : '80%',
            alignItems : 'center',
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
```

### React Native Styling vs CSS Styling

* Styling in React Native is inspired by CSS - but it's not equivalent!

* You must never forget that React Native in the end is all about translating React components (like <View> or <Text>) to native widgets (like UIView or widget.view - see section 1 of the course, I do dive into this there)!

* These native widgets don't understand CSS. They have nothing to do with the web, HTML or anything like that!

* What the React Native team does, is the following: They also provide "style translations" => CSS-inspired styling commands/ properties which also are translated to styling configurations those native widgets understand.

* Hence backgroundColor: 'black' works - it simply targets the platform-specific configurations for the native widget that will result in a black background to be drawn. Even if these native instructions look nothing like CSS. React Native does the heavy lifting behind the scenes.

* That's why many but absolutely not all CSS properties are supported in React Native. That's also why styling is done via JavaScript and not CSS. In addition, not all React Native components support all style properties.

* <Text> doesn't support flexbox-related properties for example - but I'll dive into this later...

### Extracting a Card Component (Presentational Component)

* we can split our application into multiple components. this input container look, this card look is probably something we want to use in other parts of the application as well. We might have different items which we want to present in such a card,

* Now to avoid repeating this style definition over and over again, we can outsource it into a separate component, a component that doesn't really have much logic in it but which controls the styling of its content,

```js
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
```
*  props children is that special prop in React which is basically the content you pass between the opening and closing tags of your custom component.

* Now there is just one thing, there are certain styles in here which probably should not be set from from inside of the card, not every card might have this width or max width and not every card should center its content.

* Besides the card styles, it would be nice if we could also assign our own styles from outside and maybe even override some of the card styles. We can do this by passing in a new object to the style prop and distributing all the properties, all the key-value pairs of our cards style here into this new object. This is the spread operator, a modern Javascript feature which pulls all the key-value pairs of an object out of that object and adds it to a new surrounding object.

* So we copy all the styles defined down there into this new object and I'm doing this so that I can also add another key-value pair here or another set of key-value pairs where I take all the styles defined in props styles, so in the style prop I passed to my own custom component, I take all the key-value pairs defined there and merge them into this object

```js
<View style={{...styles.card, ...props.style}}>{props.children}</View>
```
* and since I do this second,this will override any key-value pairs set up in styles card, so that we can override any styles set up in there from outside when we use our component and when we add additional styles outside of the component, it will also merge that in and consider it

* Now import this card component and use anywhere like below

```js
import React from 'react'; 
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import Card from '../Card'

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}> Start a New Game! </Text>
            <Card style={styles.inputContainer}>
                <Text> Select a Number </Text>
                <TextInput />
                <View style={styles.buttonContainer}>
                    <Button title="Reset" onPress={ () => {} }/>
                    <Button title="Confirm" onPress={ () => {} }/>
                </View>
            </Card>
        </View>
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
        marginVertical : 10 //add some spacing on the vertical axis with marginVertical, always keep in mind, margin vertical basically replaces marginBottom and marginTop
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
    
    }
})

export default StartGameScreen;
```
### Color Theming with Constants

* Next we have to fix the button,I want to make sure that the buttons have the equal size, they shouldn't take the full available width but they should have an equal size which makes sure that the text fits in there and that they're equally sized.

* Let's make sure the buttons have the same size and for wrap the buttons in a view. 

```js
<View style={styles.buttonContainer}>
    <View style={styles.button}><Button title="Reset" onPress={ () => {} }/></View>
    <View style={styles.button}><Button title="Confirm" onPress={ () => {} }/></View>
</View>
....
..
const styles = StyleSheet.create({
    button : {
        width : 100
    }
})
```
* I want to change their colors and one of the colors should be our main color and I also want to set up some accent, some secondary colors so to say which we can use.

* So for that back in the start game screen component, on the button itself, there is a color prop which you can set to control the color and for Android, that's the background color, for iOS that will be the text color

```js
<View style={styles.buttonContainer}>
    <View style={styles.button}><Button title="Reset" onPress={ () => {} } color="#c717fc"/></View>
    <View style={styles.button}><Button title="Confirm" onPress={ () => {} } color="#f7287b" /></View>
</View>
```
* Now one downside of this approach or one thing we can improve is that I'm using this hex code here, I'm using it in the header and chances are that later in the app we want to use the same color in other places too. So it would be nice if we could set this up as kind of a theme you could say, that we could easily use these colors without copying hex codes across our app and that we can also change the color in one place if we ever want to use a different color and we don't have to do that in dozens of components.

* And for that I'll use an approach where I'll add a new folder on the root level and I'll name it constants

```js
// constants/colors.js
export default {
    primary : "#f7287b",
    secondary : "#c717fc"
}
```

* Now these colors are defined here and we can now simply import them from this file and whenever we change them here, they're changing everywhere in this application and we can therefore easily swap this during development.

```js
import Colors from '../../constants/colors'

<View style={styles.buttonContainer}>
    <View style={styles.button}><Button title="Reset" onPress={ () => {} } color={Colors.secondary}/></View>
    <View style={styles.button}><Button title="Confirm" onPress={ () => {} } color={Colors.primary} /></View>
</View>
```
* Similarly in all other places too

```js
import Colors from '../constants/colors'

const styles = StyleSheet.create({
    header: {
        width : '100%',
        height : 90,
        paddingTop : 36,
        backgroundColor : Colors.primary,
        alignItems: 'center',
        justifyContent : 'center'
    }
});
```

* With this change we could manage our colors at one place

### Configuring & Styling a TextInput

* So step-by-step we're making progress, what we're not able to do is enter a number. it would be nicer if you could see it, wouldn't it? So therefore let's style that input field, that text input field and just as before actually, I went to do that in a separate component.

```js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return <TextInput style={{ ...styles.input, ...props.style }} />; // here we want both base input style and component specific input style

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;
```

* Then we have to use this input component 

```js
import Input from '../Input'
...
return(
    <Input />
)
```
*  we have some general styles which we always want in the input component, something like the height or the border but some specific styles, like how big should it be, so how broad should it be,

```js
import Input from '../Input'
...
return(
    <Input style={styles.input} />
)

const styles = StyleSheet.create({
    input: {
        width: 50,
        textAlign: 'center'
    }
})
```
* the text input, there is a lot of stuff we can configure there and actually the best resource is always of course the official documentation. 

* https://reactnative.dev/docs/textinput#docsNav

* The cool thing is React is You can take your props you're getting and spread them on your component like this.you could say we are forwarding the props to the component you are using in your custom component.

```js
 const Input = props => {
    return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};
```
* So here where we use input, we can now not only add the style but we can also add blurOnSubmit 

```js
 <Input 
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2} />
```

### Cleaning User Input & Controlling the Soft Keyboard

* we want to make sure that users can only enter numbers that are digits only and that we can't enter a dot here or a comma or paste in some non-numeric content and for that, we of course need to validate what the user entered here.

* Now for validating what the user entered, I want to, as I showed it before already, basically saved the value the user entered on every keystroke and feed it back into the input but after every keystroke, I also want to validate the input to make sure that we're having a valid value there, so basically a number.

* for that first of all, we need to manage some state here in the start game screen,

```js
import React, { useState } from 'react'; 
import Input from '../Input'

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    return (
            ....
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
            ....
    )
};
```

* on iOS, if we are in that input mode and we want to close that keyboard, right now that's not really doable. We can't click outside and close it and it would be nice if we could. Now to make sure that we can and that we close the keyboard if the user taps somewhere else, I will actually wrap the entire view here with a special component provided by React Native and that's the touchable without feedback component

```js
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard
  } from 'react-native';
  
...
...

return (
        <TouchableWithoutFeedback
        onPress={() => {
            Keyboard.dismiss(); // on ios dismiss keyboard
        }}
        >
        <View style={styles.screen}>
            <Text style={styles.title}> Start a New Game! </Text>
            <Card style={styles.inputContainer}>
                <Text> Select a Number </Text>
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
                    <View style={styles.button}><Button title="Reset" onPress={ () => {} } color={Colors.secondary}/></View>
                    <View style={styles.button}><Button title="Confirm" onPress={ () => {} } color={Colors.primary} /></View>
                </View>
            </Card>
        </View>
        </TouchableWithoutFeedback>
    )
```

### Resetting & Confirming User Input

*  Let's start with the reset button real quick because that will be a simple one. When you press it, I of course simply want to reset the entered value. 
```js
const [enteredValue, setEnteredValue] = useState('');

const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
};
const restInputHandler = () => {
    setEnteredValue('');
};

...
..

<View style={styles.button}><Button title="Reset" onPress={ restInputHandler } color={Colors.secondary}/></View>
```

* Next we need to add some logic to the confirm button and show our choosen number 

```js
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
    confirmedOutput = <Text>Choosed Number : {selectedNumber}</Text>
    }

    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredValue)
        if(choosenNumber==NaN || choosenNumber <=0 || choosenNumber >99){
            return;
        }
        setConfirmed(true);
        setSelectedNumber(choosenNumber)
        setEnteredValue('');
    };
    

    return (
        <TouchableWithoutFeedback
        onPress={() => {
            Keyboard.dismiss();
        }}
        >
        <View style={styles.screen}>
            <Text style={styles.title}> Start a New Game! </Text>
            <Card style={styles.inputContainer}>
                <Text> Select a Number </Text>
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
```
### Showing an Alert

* Now to shows such an alert, React Native has got us covered, from React Native we can import alert and that's also not a component we use but instead, an object where we can call a native API, where we can call a native feature.

```js
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
    confirmedOutput = <Text>Choosed Number : {selectedNumber}</Text>
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
    };
    

    return (
        <TouchableWithoutFeedback
        onPress={() => {
            Keyboard.dismiss();
        }}
        >
        <View style={styles.screen}>
            <Text style={styles.title}> Start a New Game! </Text>
            <Card style={styles.inputContainer}>
                <Text> Select a Number </Text>
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
```
### Time to Finish the "Confirmation Box"

* Lets add some styles to our confirmation Box

```js
if(confirmed){
    confirmedOutput = (<Card style={styles.summaryContainer}>
                            <Text>You Choosed</Text>
                            <View>
                                <Text>{selectedNumber} </Text>
                            </View>
                        </Card>
                        );
    }
...
....
const styles = StyleSheet.create({
    summaryContainer: {
        marginTop : 20
    }
}
```
* Lets add this as a new component 

```js
//NumberContainer.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../constants/colors'

const NumberContainer = props => {
    return <View style={styles.container}>
                <Text style={styles.number}>{props.children}</Text>
            </View>
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        borderColor : Color.primary,
        padding:10,
        borderRadius:10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number : {
        color:Color.primary,
        fontSize: 22
    }
});

export default NumberContainer;
```

* Now we can import this in our StartGameScreen componenet

```js
import NumberContainer from '../NumberContainer';

...
..
confirmedOutput = (<Card style={styles.summaryContainer}>
                            <Text>You Choosed</Text>
                            <NumberContainer>{selectedNumber}</NumberContainer>
                        </Card>
                        );


const styles = StyleSheet.create({
    summaryContainer: {
        marginTop : 20,
        alignItems : "center"
    }
})
```
### Adding Random Number Generation

* I want to make sure that this start game button works, lets add second screen.

```js
//Screen/GameScreen
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);// This concept of calling a function inside the same function is called recursion
  } else {
    return rndNum;
  }
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => {}} />
        <Button title="GREATER" onPress={() => {}} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1, //to take all the available space on the screen
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameScreen;

```
### Switching Between Multiple "Screens"

* Now we're using the start game screen in the app component, so we'll have to use the game screen there as well and manage the selected number in that app component because that's the only component which is on the screen all the time,

* the app component is also the component which will hold the start game screen and the game screen soon and therefore it is the component where we can also pass data down to the start games screen and to the game screen.

* we also have a way of only rendering one of these two screens right now already and for that, we need no special tool or anything like that, we can use normal React logic, we can render this content conditionally.

```js
//App.js
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './components/screens/StartGameScreen';
import GameScreen from './components/screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber) {
    content = <GameScreen userChoice={userNumber} />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
```
* We need to call startGameHandler from StartGameScreen component, when we press START GAME ..

```js
//StartGameScreen.js
  confirmedOutput = (<Card style={styles.summaryContainer}>
                        <Text>You Choosed</Text>
                        <NumberContainer>{selectedNumber}</NumberContainer>
                        <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
                    </Card>
                    );
```

* After passing selectedNumber to GameScreen component we need to give hits to the opponent.

###  Adding Game Features: Hints & Validation

* we can reach that game screen now and the computer is guessing a number here, a random number which excludes our real number for the first initial guess. Now we need to make sure that subsequent guesses can be made when we press the lower or greater button here in the game screen. 

```js
<Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
<Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
```
* On clicking this lower and greater button we are calling a funtion.

```js
import React, { useState, useRef } from 'react';

const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

// And again, these reference constants here are not regenerated when this component is created again,

// instead if they have been initialized once, a bit like the state actually, then they're stored detached

// from that component and React recognizes that they have been initialized already and it will not regenerate

// them but instead, initialize currentHigh with the previously stored value.

// So it's a bit like if you were managing this in a state, the difference to the state instead if you change

// the value stored in there, the component doesn't re-render because we don't want that here.

// I don't want to re-render it component just because I'm saving a new high, that has no impact on my

// view, on my jsx code,it just has an impact on my logic but for that, I don't need to re-render the component, that's why I use a reference here instead of a state.

const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess; // we can set currentHigh.current, because the references generated by React are objects that have a current property where the actual value is stored in
    } else {
      currentLow.current = currentGuess; // because the references generated by React are objects that have a current property where the actual value is stored in
    }
    // And now the goal is or the trick is to generate a new random number which takes these boundaries into account, so where we use the current low with our ref and then .current as a minimum and currentHigh.current as a maximum and I want to exclude the current guess so we can't guess the same number again here, so that for the next role, we'll definitely get a different number.

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber); // updating current guess number, And now next number is the next number we want to use, so now what we can simply do as we can call set current guess and add next number, now the component will be re-rendered and it will output the next guess
  };
```
* we can use another hook provided by React and that is the useRef hook. Now you might know that hook as a hook that allows you to create an object which you can bind to inputs, so to your input elements in jsx to get access to them in your code and that's one way of using it but useRef also allows you to do something else which is pretty cool.

* It allows you to define a value which survives component re-renders, so which survives that this component is rebuilt 

* and that's exactly what we need here because we want to log in a minimum and maximum which we can change but which isn't regenerated just because the component is rendered again.

### Checking the "Win" Condition with useEffect()

* we need to check what the computer guessed and then kind of end the game if it's the number we entered. For that, we can use another React hook and that's the useEffect hook.

* useEffect allows you to run side effects or in general, allows you to run logic after every render cycle

* so useEffect takes a function and this function by default runs after every render cycle for this component. So every time it has been rendered, this function is executed, after it has been rendered, that's also important, not before, not simultaneously, after.

```js
useEffect(() => {
    if (currentGuess === props.userChoice) {
      // Logic to be called after game finished
    }
  });
```

* So in there, I then want to kind of fire a the game is over message and send that to app.js so that we can swap the game screen for a game over screen. Now we don't have that screen yet, so let's add it,

```js
// GameOverScreen
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;

```
* Now we have the game over screen and we want to render this instead of the game screen if the game is over. So let's go back to the app.js file 

* and the question now of course is, what's our condition for rendering this?

* Well in the end, we'll need one additional piece of information anyways and that's the number of rounds it took the computer to finish the game. So one thing I want to store here in the app component is another state I manage and that is the number of rounds it took to finish which is zero initially because we haven't started the game yet and I'll name this guess rounds and set guess rounds and you can name this whatever you want. Now the goal is to set this when the game is over.

```js
//App.js 
import GameOverScreen from './components/screens/GameOverScreen';
...
....
const [guessRounds, setGuessRounds] = useState(0);

const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

//update numOfRounds state
const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
    // By the way if we start a new game, I also want to reset my guess rounds to zero because if a new game starts, we want to reset the number of rounds the computer took to 0.
  };

// Now the game over handler should be triggered from inside the game screen obviously.
...
..
if (userNumber && guessRounds <= 0) {
    // if guess rounds is smaller or equal than zero, smaller is not possible but still, we can check for that.
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  }else if (guessRounds > 0) {
      //So we want to show the game over screen if guess rounds is greater than zero.
    content = (
      <GameOverScreen
      />
    );
  }
```
* So now we have a condition where we render the game over screen, all we now need to do, we need to use the onGameOver Prop here in our game screen to in the end call this function and forward the number of rounds to the app component.

* So back in the game screen, if useEffect here determines that the right choice was made, the right guess was made and therefore the game is over, then in here, I want to call props onGameOver as a function and forward the amount of rounds it took the computer to guess our result or our choice and that's therefore another state we have to manage here in the game screen.

```js
//***GameScreen.js

// Set initial round as zero
const [rounds, setRounds] = useState(0);

useEffect(() => {
    if (currentGuess === props.userChoice) {
      // Logic to be called after game finished
      props.onGameOver(rounds)
    }
  });

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // Here we are increment the no. of rounds ****
    setRounds(curRounds => curRounds + 1);
  };

```
* Let pass parameter to to useEffect in more cleaner way

```js
//  I'll use a modern Javascript syntax where I use object destructuring to destructure my props and get user choice and onGameOver out of them,

 const { userChoice, onGameOver } = props;

  useEffect(() => {
      // since we destructured we can just use userChoice instead of props.userChoice
    if (currentGuess === userChoice) {
      onGameOver(rounds); // here also we can just use onGameOver instead of props.onGameOver
    }
  }, [currentGuess, userChoice, onGameOver]);  // otherwise we would have to add props here and that actually changes whenever the parent component changes and therefore it's not a good check.
  //and whenever such a value (currentGuess, userChoice, onGameOver) changes, this effect will rerun,
  // so whenever a task changed after a render cycle, the effect will rerun I should say. If a render cycle occurred and the values you specified here are still the same as for the previous render cycle, then the effect will not rerun,so the effect will now only rerun if one of our dependencies changed.
```

### Finishing the Game Logic

* on the game over screen, I also want to have a button that allows the user to restart the game.

```js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
            <Text>Number of rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;

```
* roundsNumber and userNumber So these are two props we now need to set on the game over screen,So back in the app component on the game over screen, we set rounds number and user number,

```js
//App.js

const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };


...
....
 <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
```

###  Adding Custom Fonts

* you rarely want to stick to the default system fonts and rarely do you have an app without any images. So therefore let's get started with custom fonts and in a React Native expo, adding fonts is super trivial.

* Lets create fonts folder inside assets folder You can store that anywhere though but I like to keep it in the assets folder to keep my assets like fonts and images organized.

* we have OpenSans-Bold.ttf and OpenSans-Regular.ttf inside fonts folder.

* so to use them. For that in the app.js file and I'm using the app.js file because that's the first file which is loaded or which is executed so to say when the app starts and you want to load your fonts when the app starts, in there, you need to add an import 

```js
//App.js
import * as Font from 'expo-font';
```

* This package should be included by default, but run "expo install expo-font" to be sure

* So expo-font is a package which gives you font utilities, so utilities that allow you to load fonts and you import everything from that package and bundle it together in this "Font" object, that's what we're doing here.

*  Now to load fonts, I'll add a new function outside of the functional component because this function doesn't need to be recreated for every component rerender cycle.

* Now this is a loadAsync function that or a method on the font package which we're importing here that allows you to load fonts and what you pass to load async is an object where you tell Expo and therefore React Native about all the fonts you want to load. You do this by using a key where you pick any name of your choice, like open-sans and you'll later be able to use these fonts by these names,

```js
//App.js
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};
// before export default
```
* So with that, we're telling React Native in the end where our fonts live, where these font files live and to which names we want to map them and we can later use these names to assign these fonts to text. 

* Now load async actually returns a promise, which means that this will take a bit longer, not super long but it will not load these instantaneously and I will return this promise here inside of fetch fonts so that whenever we call fetch fonts, we can wait for this promise to resolve before we continue.

* Now where do we want to fetch our fonts though?

* Well we could manually load our fonts here, we could for example call fetch fonts like this 

```js
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  fetchFonts();
  ....
  ...
}
```

* and it would go ahead and fetch our fonts but the problem is, we would continue rendering and we would eventually render our content and if anywhere in the content, we use text that tries to use such a font, if the font hasn't been loaded yet and as I said, it will take only a couple of milliseconds but still for the first render cycle, the font might not have been loaded, then we would get an error. So loading our fonts like this is not recommended,it will very likely not work.

* Instead there is a special component which you can use, it helps you load your fonts. You import this component from expo and the name of that component is AppLoading.

```js
import { AppLoading } from 'expo';
```
* Now that's a component which will basically prolong the default loading screen, the splash screen users see anyways when the app is launching, it will prolong this screen to stay active until a certain task of your choice is done, like for example until fetching fonts is done.

* So AppLoading it is, in the app component, we just have to make sure now that we render this component instead of our actual content as long as we haven't loaded our fonts yet or as long as we're not done with loading whatever we wanted to load.

* Now the cool thing is, we can use state for that and start with an initial value of false because the state I want to manage here is data loaded or whatever you want to call it and set data loaded.

```js
const [dataLoaded, setDataLoaded] = useState(false);
//I don't want to render any other content if we're still loading our data. untill our data loaded we will show this AppLoading component.
if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)} // in case loading failed
      />
    );
}
```
* Now AppLoading is a component coming from Expo which takes a startAsync prop where we point at the operation we want to start when this is first rendered and that's of course our fetch fonts function.

* Now important, a) this has to be a function which you pass here and 

* b) it has to be a function that returns a promise because expo will automatically listen to that promise for you and when the promise resolves, it will know that the loading is done and it will then call whatever you pass here to onFinish.

* So this function here (setDataLoaded) will be executed for you when this operation (fetchFonts) is done and for expo to find out when this is done, this should return a promise.

* So now these two props will work together and we're updating data loaded, this state to be true and therefore to not render this content but to proceed with executing this code and eventually rendering other component

* But now we loaded the fonts, how can we now use them?

* Well let's say we want to change our start a new game title here to use our font. Now for that, we need to go to the start game screen which is where this title lives in the end, here, start a new game, it does have the title style and therefore down in the stylesheet here on title, we can now set font family to change the font family and set this to open-sans-bold

```js
const styles = StyleSheet.create({
    title : {
        fontSize : 20,
        marginVertical : 10,
        fontFamily: 'open-sans-bold'
    }
})
```
### Installing expo-font

* Depending on the version of Expo you're using, you very likely need to install the expo-font package.

* You can do this in two different ways and it's important to understand the difference:
    * 1) npm install --save expo-font
    * 2) expo install expo-font

* 2) is recommended - but what is the difference?

* npm install installs a packages a dependency into the project - we use this command for most packages which we do install.

* Some packages (typically all expo-* packages) can break the app if you install the wrong version though - because they closely work together with Expo itself.

* To get the right package version for the specific version of Expo your app relies on, expo install is the right "tool". It also just executes npm install behind the scenes but it picks a specific (i.e. the correct) version of the package to be installed.

* Hence for all expo-* packages, npm install can be used but expo install is the preferred command to avoid errors. Of course you could always try npm install first and only run expo install if you thereafter do face any errors.

###  A Synthetic Style "Cascade": Custom Wrapper Components & Global Styles

* and for all other text in this application, I actually want to use my open sans font.

* So we would have to style this text individually but again, recreating that style over and over again in all the different places might not be what you want to do in the end.

* There are two ways of handling this in a more elegant way.

#### Option 1 : One is that you create a separate component

```js
//Component/BodyText

import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = props => <Text style={styles.body}>{props.children}</Text>;

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans'
  }
});

export default BodyText;

```
* Now we can use this component like below
```js
import BodyText from '../BodyText';
...
..

<BodyText>Select a Number</BodyText>
```
* So this is option one of passing text style around or a font family around, you simply create your own text component which always has this font family and if you have multiple different font families, like a title and a heading, you create separate components.

* Similarly for TitleText component

```js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = props => (
  <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text> // props.style is style forward as props and here we are combining both styles
);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
});

export default TitleText;

```

* we can use this component like below

```js
import TitleText from '../TitleText';

<TitleText style={styles.title}>Start a New Game!</TitleText> // already TitleText component have style but still we want to overwrite this props title 

const styles = StyleSheet.create({
    title : {
        fontSize : 20,
        marginVertical : 10, 
        fontFamily: 'open-sans-bold'
    }
})
```
#### Option 2 

* The alternative to that would be that for example in the constants folder, you have your default-styles.js

```js
// constants/default-styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
});

```

* Now we can use this constant whereever we need 

```js
import DefaultStyles from '../../constants/default-styles'


<Text style={DefaultStyles.title}>Opponent's Guess</Text>
```
* So any styles that you want to share across components can be managed in such a global stylesheet,

* I personally preferred the component-driven approach because in the end React is all about components and therefore I think we stay a bit closer to the default React world by doing it like this but it's also not a decision where you always have to follow path A or path B, you can mix and match these concepts, maybe you sometimes have something where a separate component doesn't really make a lot of sense, manage it in a global style then and in other cases, maybe a custom component makes more sense than having a global style setup.

### Adding Local Images

* when a game is over, not only do I want to use our custom font here on this game over page but I also want to show an image, a game over image here,

```js
import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../BodyText';
import TitleText from '../TitleText';

const GameOverScreen = props => {
return (
    <View style={styles.screen}>
    <TitleText>The Game is Over!</TitleText>
    <View style={styles.imageContainer}>
        <Image
        source={require('../assets/success.png')}
        style={styles.image}
        resizeMode="cover"
        />
    </View>
    <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
    <BodyText>Number was: {props.userNumber}</BodyText>
    <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
);
};

const styles = StyleSheet.create({
screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
imageContainer: {
  // <view> could not use width of its child (ie the <image>) even though child had a relative width of 80%,
  // We should set seperate width for  image container
    width: 300,
    height: 300,
    borderRadius: 150, // border radius should be half of your width and height otherwise it won't be perfect circle
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden', // Restrict out of the container 
    marginVertical: 30 // Spacing around image top and bottom
},
image: {
    width: '100%',
    height: '100%'
}
});

export default GameOverScreen;
```
* so if your width to height aspect ratio isn't the same as the image file and chances are that you have a different aspect ratio,well then you can set a resize mode here

* for example "cover" is an option where you will resize the image to keep its aspect ratio and fit it into this box here

*  For contain, it's similar but for "contain", it will not necessarily take the entire box as you can see here,here it contains the image and simply shrinks it so that it doesn't exceed the width and height of the box we reserve for it.

*  For cover, it also keeps the aspect ratio but doesn't necessarily shrink the image to fit into this box, instead
it just the crops the image beyond the boundaries of the access it would exceed otherwise.So we can simply play around with these different settings to get the setup you want, cover is the default but in case you want to keep the whole image and you don't want to crop it on any axis, then you could set this to contain and you can play around with the other values too.

### Working with Network (Web) Images

* Let add image from Google(Web) without storing in local folder.

```js
 <View style={styles.imageContainer}>
    <Image
    fadeDuration={1000} // here 1000 is millisec ie 1 sec
    // source={require('../assets/success.png')}
    source={{
        uri:'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'
    }}
    style={styles.image}
    resizeMode="cover"
    />
</View>
```
* there is one important thing you have to know. For the image that was loaded locally, I mentioned that React Native is able to determine its width and height and uses that as a default. Therefore for a locally loaded image, you don't have to set a width and height on the image, but still we are setting width and height  because we want to override the default width and height but if you had an image that is already perfectly sized, you wouldn't have to set width and height.

* Therefore for network images, so for images you are fetching with a link, you always have to set a width and a height on the image

* For local images added with require, you can do that as we're doing it to override it but you don't have to, that's an important differentiation.

* After the first load, the image is cached and therefore subsequent usages of the same image happened pretty much instantly because it already was downloaded.

### A Closer Look at the "Text" Component (and what you can do with it)

* Lets add some styling to the bottom text

```js
const GameOverScreen = props => {
        return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
            <Image
                source={require('../../assets/success.png')}
                // source={{
                //   uri:
                //     'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'
                // }}
                style={styles.image}
                resizeMode="cover"
            />
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>
                Your phone needed{' '}
                <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
                guess the number{' '}
                <Text style={styles.highlight}>{props.userNumber}</Text>.
            </BodyText>
            </View>
    
            <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
        );
    };
    
    const styles = StyleSheet.create({
        screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        },
        imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
        },
        image: {
        width: '100%',
        height: '100%'
        },
        resultContainer: {
        marginHorizontal: 30, // space between left and right
        marginVertical: 15  // space between top and bottom
        },
        resultText: {
        textAlign: 'center',
        fontSize: 20
        },
        highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
        }
    });
    
    export default GameOverScreen;       
```
* Now that's really important to understand, you can nest text components into other text components and keep in mind that body text in the end is just a text component, body text is a component that simply returns the build-in text component,

* we can theoretically also have nested views in there but there are some caveats to that and therefore if you don't absolutely have a strong reason for why you would need a view in there, you shouldn't really nest views into text and there rarely is a reason to do that

* Here it outlines potential issues with <views>s inside of <text>s : https://github.com/facebook/react-native/commit/a2a03bc68ba062a96a6971d3791d291f49794dfd

* Text inside of text however can make a lot of sense because it allows you to style parts of a text differently than the rest of the text.

*  I mentioned that your styles wouldn't inherit, so that if you for example in the game over screen set a font family here on your screen style which is applied to the view that wraps everything, that font family would not be passed down to components nested inside of that view.

* and yet it's different for the text. There, this text here, the highlighted text which is nested inside of the body text also gets this bold family if we change it on the body text and that is simply an important difference React Native has.

* For text components, if you add style there, the style is passed down to nested text components, that's one exception React Native has. Text inside of text receives the style defined on the outer text, so any style you set up on the body text here is automatically received by the nested text components.

* There is one additional important behavior regarding the text component in React Native and that is that it's not using flexbox.

* The view uses flexbox, the text component of course doesn't and I mentioned this before, that the view component uses flexbox not text or other components but text uses its own positioning system where it automatically wraps itself into a new line if it doesn't fit into one line

* Not only does it parse styles down to nested text, it also has its own positioning system or its own layout system where text automatically wraps itself into a new line if it doesn't fit in and the same line and that of course makes a lot of sense, it typically is what you want on your text, you want it to wrap into new lines.

### <View> vs <Text> - A Summary

* <Text> and <View> are probably THE most important/ most-used components built into React Native.

* <View> is your #1 component if you need to group and structure content (= provide a layout) and/ or if you want to style something as a container (e.g. the <Card> look we built in our custom <Card> component).

* <View> uses Flexbox to organize its children

* A <View> can hold as many child components as you need and it also works with any kind of child component - it can hold <Text> components, other <View>s (for nested containers/ layouts), <Image>s, custom components etc.

* If you need scrolling, you should consider using a <ScrollView> - you could wrap your <View> with it or replace your <View> (that depends on your layout and styling). Please note, that due to its scrollable nature, Flexbox works a bit differently on a <ScrollView>: https://stackoverflow.com/questions/46805135/scrollview-with-flex-1-makes-it-un-scrollable

* <Text> is also super important. As its name suggests, you use it for outputting text (of any length). You can also nest other <Text> components into a <Text>. Actually, you can also have nested <View>s inside of a <Text> but that comes with certain caveats you should watch out for: https://github.com/facebook/react-native/commit/a2a03bc68ba062a96a6971d3791d291f49794dfd

* Unlike <View>, <Text> does NOT use Flexbox for organizing its content (i.e. the text or nested components). Instead, text inside of <Text> automatically fills a line as you would expect it and wraps into a new line if the text is too long for the available <Text> width.

* You can avoid wrapping by setting the numberOfLines prop, possibly combined with ellipsizeMode.

```js
// example
<Text numberOfLines={1} ellipsizeMode="tail">
  This text will never wrap into a new line, instead it will be cut off like this if it is too lon...
</Text>
```

* Also important: When adding styles to a <Text> (no matter if that happens via inline styles or a StyleSheet object), the styles will actually be shared with any nested <Text> components.

* This differs from the behavior of <View> (or actually any other component - <Text> is the exception): There, any styles are only applied to the component to which you add them. Styles are never shared with any child component!

### Building a Custom Button Component

* We're using the normal button here which of course is something you can do but sometimes you also want to create your own button, you want to have full control over how your button looks like and for this, you can of course create your own button and that's exactly what we're going to do now.

```js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const MainButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.children}</Text> 
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default MainButton;
```
* Your own button is also just a combination of view and text and very important, also a touchable component, like touchable highlight or touchable opacity or touchable native feedback or even touchable without feedback if you don't want to give any visual feedback. So here I'll go with touchable opacity and we need that to give the user feedback regarding the fact that the button was pressed and to register an onPress event and other than that, we'll just build our button with a view which we styled in a certain way and a text in there.

* you can change this opacity effect by going to the touchable opacity component and there, you can set the active opacity to the level of opacity you want to have when it's pressed

* Now we can import and use the custom button component.
```js
import MainButton from '../../components/MainButton';
...
..
<MainButton onPress={() => props.onStartGame(selectedNumber)} > START GAME </MainButton> // here we are passing button text as children because our component expecting text as props.children  
```

### Adding Icons

* Adding icons is super straightforward in a React Native app that uses expo.

```js
import { Ionicons } from '@expo/vector-icons';

<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
  <Ionicons name="md-remove" size={24} color="white" />
</MainButton>
<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
  <Ionicons name="md-add" size={24} color="white" />
</MainButton>
```
* List of expo icons : https://icons.expo.fyi/,  https://docs.expo.io/guides/icons/

* it's part of the expo toolkit so to say, it's automatically included in any React Native project you created with expo and there you can import components that help you render icons

* Ionicons is one set of icons managed by the team behind ionic in the end, so the icons which are included in that set are managed by that ionic team and I'm really just talking about the icons here, this has nothing to do with us adding anything from ionic to the React Native app, we're just using their icons.

* You can use different component like Ionicons, FontAwesome, MaterialIcons etc..

* you can output an icon component in that text component as well, so that will work.

* You don't have to stick to one icon package only, you can mix and match them as you want,

### Exploring UI Libraries

* what's typical for React Native apps is that you have to style a lot on your own.

* The button is a rare exception, the built-in button I mean, which automatically gives you some base styling and even adjusts itself to the underlying platform but other than that, you really have to style everything on your own,

* Now React Native also actually has an active community and there, some nice third-party packages have been created which are essentially collections of pre-built components that sometimes even change their look depending on the platform they're running on, sometimes not but which always give you some prestyled components you can use and therefore, you might want to look into those if you're building an app in cases where you want to avoid setting up all these styles on your own,

* Refer : https://docs.expo.io/guides/userinterface/, https://github.com/react-native-training/react-native-elements, https://github.com/GeekyAnts/NativeBase

### Managing Past Guesses as a List

* let's go back to some lists and to some scrollable content because in this application, we have no such content at all and actually, it's crucial for you to understand how to work with lists and what some of the special quirks are when it comes to lists

* For that, we of course need to register any guess made by the computer and then output it in the list.

* So in the game screen, let's start with registering that. Currently we're just counting rounds here, the goal however has to be that we don't just count rounds but that we also saved the rounds, so we saved a guess that was made in each round and to achieve that here in our rounds state, we can simply manage an array instead of a number

```js
const initialGuess = generateRandomBetween(1, 100, props.userChoice);
const [currentGuess, setCurrentGuess] = useState(initialGuess);
const [pastGusses, setPastGusses] = useState([initialGuess]);
```
* onclick nextGuessHandler we need to update setPastGusses

```js
setPastGusses(curPastGuesses =>[nextNumber, ...curPastGuesses]) // here we pushing latest guess to the top of the list 
```
* Now don't forget that use state as all this code here of course reruns whenever this component re-renders but the way use state works is such that React detects that a state for this component has already been initialized,so it will only set the state to this initial guess for the very first time this component renders and not for subsequent renders

* So with that, we're initializing this, we're initializing our guess here in that list as well and we're adding a new guess to the list at the bottom here. With all of that, we should have some past guesses which we can output in a list

* and now here we have two ways of outputting this, with a FlatList or with the scroll view and I'll again start with a scroll view for that.

```js
//GameScreen.js
import { ScrollView } from 'react-native';

const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

<View style={styles.list}>
  <ScrollView>
    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
  </ScrollView>
</View>

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  },
  list: {
    flex: 1, // This will allow android to scroll without android won't scroll
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row', // to make two text element sitting next to each other
    justifyContent: 'space-between', // to apply space between rounds and guess value
  }
});

```
* this list is not scrollable there. So what's wrong on Android? Now whilst it does scroll fine on iOS, for the scroll view nested in a view to scroll fine on Android as well, make sure that the surrounding view actually uses flex one, so add this to the list style here which is the style applied to the view which is wrapped around the scroll view. With that added, if we now try this again on Android, you'll now notice that now this is scrollable as soon as you exceeds the boundaries of the screen

### ScrollView & Flexbox (Yes, that works!)
* Now let's say we had a different width here on the list item, let's say the width of a list item should be just 60% of the list, so it's not 100% which is the default but just 60%. If we do that and we get started, you see now this sits on the left which makes sense, the default positioning here if you set a width on an item which is inside of a flexbox

```js
listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '60%'// here we added 60%
  }
```

* since we set a width, the default of stretching child items along the cross axis and the cross axis would be the horizontal axis because we have flex direction column as a default but the default stretching is overridden because we have a width on our list item,

* Now we still might want to center these items in the list though and for this, you can go to the scroll view and assign a style there,

* you can go to the scroll view and assign a style there, though not through the style prop which you can use but which doesn't allow you to style everything but to style the content in a scroll view and apply for example flex settings for the content, you need to use the content container style

```js
<View style={styles.listContainer}>
  <ScrollView contentContainerStyle={styles.list}>
    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
  </ScrollView>
</View>

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '80%'
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end' // Move list end (bottom) of the screen 
  }
});
```
* Now flex grow also make sure that the item to which you add this grows and takes up as much space as it can, just like flex one, the difference is that flex grow works a bit differently internally, it's more flexible than flex. Flex simply says take all the available space in all directions you can get, flex grow basically instructs the container to be able to grow, to be able to take as much space as it can get and it will but it keeps the other behavior it has normally, in this case of the scroll view, where this is scrollable and can exceed the boundaries of the screen as well.

* So it's a bit more flexible and you probably don't need it that often on a normal view but on a scroll view, it's exactly what we need and I'm just showing this here because this is a special case which you just have to know !!!!!!!

### Using FlatList Instead of ScrollView

* Now of course here I'm using a scroll view and you learned that a FlatList is better if you have a list where you don't know how many items you'll have in there.

```js
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
<FlatList
          keyExtractor={item => item} // Key 
          data={pastGuesses} // list array 
          renderItem={renderListItem.bind(this, pastGuesses.length)} // Item to be rendered,here we are binding datalength with the default item data argument, and bind expects "this" as first argument but anyway we will use this .. you can even give "null" in place of "this", The second argument we add here then will be the first argument received by that function
          contentContainerStyle={styles.list} // style
        />
```

* key extractor takes a function which gets our item in the end and then we have to tell FlatList where to find our key and by default, it looks for item.key or for item.id, here we want to tell it the item itself is key.

* Now FlatList however wants a key which is a string and not a number, otherwise it'll get a warning.

* So the next thing we have to do is the past guesses we're managing should be strings and that's no problem because we're only using them for printing them to the screen anyways, so we don't really care if they're technically stored as a number or as a string and hence here when we add a new guess, we can simply call toString which is a built-in Javascript method on the number to convert it to a string type and do the same for the initial value of course

```js
// initial state
const [pastGuesses, setPastGusses] = useState([initialGuess.toString()]);

// Render List Item 
const renderListItem = (listLength, itemData) => ( // since we bind we need to get length as first argument and defult data ie itemData as second data

// This default argument will also be passed in by React and the default argument automatically is passed  to last argument. So the first arguments will be the arguments you set up in bind,!!!!


  <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
// We now also no longer have to add a key here because that keying will be done by React Native thanks to the FlatList.


// Update state
setPastGusses(curPastGuesses =>[nextNumber.toString(), ...curPastGuesses])
```
* Core component & styling - Refer : ReferImage/basic/basic3
