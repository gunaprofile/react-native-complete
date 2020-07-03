# react-native-complete

## Responsive & Adaptive User Interfaces and Apps

### Working with More Flexible Styling Rules

* we could already see that our two buttons - reset and confirm also weren't positioned that great in our button container.

* what we can see here is that we assign the width of 100% on the button container but what's this size referring to? Well this size on this view here, of course if we say 100%, in the end refers to the surrounding parent which in this case is this card, this input container and on this input container, we actually set a width of 300 and that simply is too small,

```js
//startGameScreen

inputContainer : {
      width : 300,
      maxWidth : '80%',
      alignItems : 'center'
  }
```

* So what do we want here? Well maybe we don't want the width of 300 (parent container for buttonContainer(width:100%)) but a more flexible width

```css
inputContainer : {
    width : "80%",
    // maxWidth : '80%',
    minWidth : 300,
    alignItems : 'center'
}
```
* Because now we have 80% as a default and prior to that, we had it as a max width. So now by setting it to a default, this ensures that this is not our limit, instead it's our default size but we also set up that we want to have a min width of 300. On this small device, this min width is overruling our default width because 80% would actually be less than 300 on this small device.

* Now of course, you could have an even smaller device where this rule however leads to an issue where min width of 300 basically means that your device is smaller than that, it's not wide enough and therefore, your container would go beyond the boundaries of our screen.

* So this still might not be the perfect rule but it's certainly better as we can see here because on the bigger screen, this still looks good here on the iPhone, on the smaller screen, this now also looks good.

* Now to ensure that we never leave our boundaries, we can also set a max width 

```css
inputContainer : {
    width : "80%",
    maxWidth : '95%',
    minWidth : 300,
    alignItems : 'center'
},
```

### Introducing the Dimensions API

* Sometimes however, you just can't get the layout right with percentage width and hardcoded pixels like above

```css
button : {
        width : 100
    }
```

* for example here on the buttons where we set a width of 100, we set 100 no matter what the device size is. Now actually, we know that we want to have two buttons sit next to each other. So what we can do is we can simply ensure that we take a button width that always fits on the screen no matter how small that is and for that.

* and for that, we need to find out how many pixels we have available in width and that's something we can find out with the help of React Native.There from React Native, you can import the dimensions object here, dimensions is the name.

```js
import { Dimensions} from 'react-native';
```
* Now this is now not a component which you use, instead this is an object that allows you to find out how much width you have available.

* we can set our width to dimensions and then there is a get method where you can get the dimensions of the window. You can also get it of the screen, the difference between window and screen only matters on Android where with window, the status bar height will be excluded from the calculation and therefore this will be really, well the part of the screen where your content will live in. So you should typically use window here because on iOS it doesn't matter, on Android is guaranteed to be the part of the screen your UI really sits in without that status bar at the top. So typically, you might want to use window here to get the real room you have available for your layout, the real dimensions you can use for your layout

```js
button : {
    // width : 100
    width : Dimensions.get('window').width/4
}
```

* Now what this gives you is an object where you can get a couple of properties, for to be precise - the font scale the user set up, so for example if users want to have a bigger fonts, then you could get the multiplier here with font scale but most importantly, you get the width and the height and if we get the width here, then we get the overall width of the device this app runs on.

* Now we know we want to squeeze at least two buttons into this device here, so we could simply divide this by two, so now that each button is half as wide as the device.

* Now if we save this, we don't really get the look we want because of course, that's too big but if we divide this by three for example, then this already looks better on the small screen, not on the big one though but how about four? If we take four, then we have plenty of space for all the other space we need like the spacing around our container and we ensure that our buttons always kind of respect the device size.

* Now of course here, you could have achieved something similar by setting width to a percentage, like 40% here but I also wanted to introduce the dimensions API here which we will use later as well. It's a great API for finding out how many pixels you have available on the width and on the height on the device or running on and that's important, where percentage here always refers to the direct parent view and not always to the available width of the device,

* Dimensions get window always gives you the dimensions for the entire device, no matter where you use it. So width here always is the width of our screen on the device and never of the parent or anything else.

* So this can be really useful if you want to style something in a certain way or size something in a certain way because this tells you how much width you have available.

### Using Dimensions in "if" Checks

* we want to calculate margin with if check

```js
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  }

   listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 350 ? '60%' : '80%'
  }

```
* we can use in our element too

```js
 <Card style={Dimensions.get('window').height > 600 ? styles.buttonContainer : styles.buttonContainerSmall}>
 ...
 </Card>
```
### Calculating Sizes Dynamically

* This will of course not gurantee that everything fits on the screen, you would need to use .height* <some factor> on both.

```js
    import React from 'react';
    import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';

    import BodyText from '../BodyText';
    import TitleText from '../TitleText';
    import Colors from '../../constants/colors';
    import MainButton from '../MainButton';

    const GameOverScreen = props => {
        return (
        <ScrollView>
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
        
                <MainButton onPress={props.onRestart}> NEW GAME </MainButton>
            </View>
        </ScrollView>
        );
    };
    
    const styles = StyleSheet.create({
        screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        },
        imageContainer: {
            width: Dimensions.get('window').width * 0.7, // image width of 70% of the window size
            height: Dimensions.get('window').width * 0.7, 
            borderRadius: Dimensions.get('window').width * 0.7 / 2,
            borderWidth: 3,
            borderColor: 'black',
            overflow: 'hidden',
            marginVertical: Dimensions.get('window').height / 30 // This effectively sets the vertical margin to 5% of the device height(!). 
            // .height / 40 would set it to 2.5% etc
        },
        image: {
        width: '100%',
        height: '100%'
        },
        resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
        },
        resultText: {
        textAlign: 'center', // text align to the center
        fontSize:  Dimensions.get('window').height < 400 ? 16 : 20
        },
        highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
        }
    });
    
    export default GameOverScreen;        
```
* We wrapped the entire view with scroll view to scroll if the content larger

* So that's the dimensions API here and the dimensions API really helps us build user interfaces that look good on different device sizes and as you learned, there are different ways of using it - to dynamically calculate sizes, be that for width or height or margins and also of course in if statements to simply render different content, attach different styles or different style objects based on the width or height conditions you're setting up here but that's not all because users might also change the device orientation while the app runs and that also sometimes means that we need to change the styling and/or layout.

### Problems with Different Device Orientations

* If you rotate the device what you'll see is that your screen doesn't rotate and that happens because in expo apps, you can easily lock the device orientation in your app.json file. 

```json
{
    "expo": {
        "orientation": "portrait",
    }
}
```
* The one thing we're interested in right now is this orientation property you see here, it's set to portrait here and that means that this app can only be used in portrait mode.

* Now that's a useful feature to have because some apps really need to be locked, some apps make no sense in landscape mode and you have a lot of apps out there in the wild which actually are locked.

* So if you have an app or you know it only works in portrait mode, you can set this to portrait here to lock it to that.You can also set it to landscape to make sure that your app can only be used in landscape mode,

* You can also set this to default and default means that it can be rotated, that both orientations are supported,

```json
{
    "expo": {
        "orientation": "default",
    }
}
```
* Now what you'll of course see is that when you rotate, it might be broken again, for example here in Android, we can't really reach our start game button and on iOS, it's the same. There we also have the additional issue that our soft keyboard is overlapping this input if we open it. That's of course not ideal, I also can't close it anymore, so here I'm basically stuck now.

### Controlling Orientation & Using the KeyboardAvoidingView

* Let's start by making this usable again because that's the most important thing. The fix here of course is to make this scrollable because if we can scroll this view, then we can reach this button down there again.

* So back on the start game screen, we need the good old scroll view again which we import from React Native and now we can use that to wrap our view which surrounds our screen, this touchable without feedback button in this case, with the scroll view. So let's use scroll view to surround our entire screen here, our entire component in the end and with this, this is now scrollable. The advantage is that we're now the keyboard is open on iOS,We can scroll a little bit but we still have the problem that it bounces back,we have a similar problem on the small Android device, we have such little height available that we can't even see our log, we can scroll it but yes that's not too convenient

* To fix that keyboard issue, there's another component you can import from React Native and that's the keyboard avoiding view.
```js
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
}
....
..
const StartGameScreen = props => {
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position'>
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
            </KeyboardAvoidingView>
        </ScrollView>
    )
};
```
* That's a view, a component you can use to wrap your component with, in this case inside of that scroll view and that's important, use it inside of the scroll view and then wrap your entire touchable without feedback component with it to make sure that your keyboard, your soft keyboard when it opens up never overlays the input you're typing in and for that you can also configure the keyboard avoiding view,

* you can set a behavior there and that accepts different values and set this to position

* With that added here on iOS, you'll now see that this slides a little bit when we open the soft keyboard, when we start typing. Doesn't slide enough but for that we can also go back here and set the keyboard vertical offset to a number, for example to 30, this is the amount of pixels it slides it up

* Now setting this to behavior position simply means that it repositions the entire screen by 30 pixels basically,

* we could also set this to padding so that a padding gets added at the bottom to slide everything up and last but not least, you can also change the overall height of the screen a little bit. Now typically on iOS, it works best if you use position and on Android it works best if you get use padding and later in this module, you learned how to find out on which platform you're running on, for now I'll use position here.

### Listening to Orientation Changes

* Now what about the styling, what about these buttons? Not looking good, you might notice that you now have a strange behavior if you wrote it back to portrait mode, also here on Android. On the other hand if we change something and undo that just so that the app restarts and we start in portrait mode, you'll see it looks good but now if we go to landscape mode, it looks bad again.

* So basically, the width of our buttons gets logged in when the app starts and doesn't adjust when our screen size changes and of course it changes when we rotate the device because width and height get swapped,so we have more width available if we're in landscape mode than we have in portrait mode.

* The problem is that currently on the start game screen when we set the width of our buttons which we do down there, we use dimensions get and this and that's very important to keep in mind, this is only calculated when your app starts.

* Dimenstions API here simply only runs once in our app lifecycle, Now of course you would want this to recalculate and there is a simple fix for that.

* If you have a width or height, anything you get from dimensions which should respect orientation changes, so which should recalculate when the orientation changes, then you should not use dimensions width down there in your stylesheet but instead, you need to manage the width or whatever property it is that can change dynamically and that should re-render the UI when it changes with state.

* So here in the start game string, we already have useState, we can now also manage our button width here, set button width with useState

```js
const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);
```

* Now you can set up a listener here on dimensions, instead of using get by calling add event listener and listen to the change event which fires whenever the dimensions change which typically is the case when the user rotates the device.

```js
const updateLayout = () => {
    setButtonWidth(Dimensions.get('window').width / 4)
};

Dimensions.addEventListener('change', updateLayout)
```
* when we rotate it and it's this function which I want to call here, so it's update layout which I want to call here without parentheses here because we just want to point at this function so that it's called for us when the dimensions change and this will make sure that this re-runs whenever our dimensions change and therefore this component will re-render.

* Now we don't need class based style like below

```js
// !!!! NOT needed this kind of style, now we managed below code with useState, so I'll just comment this out 
// button : {
//     width : Dimensions.get('window').width/4
// },
```
* and you could then merge that with some inline styles. I'll just replace this stylesheet object we're pointing at with an inline style object 

```js
<View style={{width : buttonWidth}}><Button title="Reset" onPress={ restInputHandler } color={Colors.secondary}/></View>
<View style={{width : buttonWidth}}><Button title="Confirm" onPress={ confirmInputHandler } color={Colors.primary} /></View>
```
* Now one important note here though, right now at the moment I'm setting up a bunch of event listeners here, I always add a new event listener whenever this component re-renders and that's not what I want to do

* we can use use effect that we run whenever our component re-renders.So now I can use use effect here and the function which I want to run on every re-render is a function which in the end creates this update layout function here and adds my event listener,

```js
import React, { useState, useEffect } from 'react'; 

useEffect(() => {
    const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width / 4)
    };
    Dimensions.addEventListener('change', updateLayout)
    //we then return something here in use effect, that's our clean up function which runs right before use effect runs in and there, I want to clean up my listener
    return () => {
        Dimensions.removeEventListener('change', updateLayout);
    }
});
```
* So now we clean this up and set up a new one when our component re-renders, clean up the old one, set up a new one and therefore we always only have one running event listener.

* If we do it like this, that's simply cleaner and therefore if we now save this and we go back, we have the same behavior as before but now in a clean way by utilizing useState and use effect and most importantly, the event listening capabilities of the dimensions API which allow us to not only set dimensions once but recalculate them when they change.

### Rendering Different Layouts

* Alternatively, we render a totally different layout based on the available space, both would be options you have. You could for example try to render this side-by-side by simply adding an if check here in your game screen where you return totally different jsx code and maybe also with totally different styling and therefore layouting based on the available width or height and then you would just need to setup a listener that re-renders your component, so with set stage just as we did it here in the start game screen to re-render your component whenever that's the case

* What I'll do is I want to render my buttons here to the left and the right of the number container if we only have a limited height available and render it like we always did if that's not the case.So I want to render totally different jsx code based on my dimensions.

```js
if(Dimensions.get('window').height > 500){
    return (<View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View tyle={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>)
  }
....
...
  ///CSS

  controls : {
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems: 'center',
    width : '80%'
  }
```
* Now of course the problem is this layout doesn't change if we rotate, not the end of the world but we might want to change back to that old layout and you learned how that works, we just need to manage this with state and set up a listener.

* we need to do in our game screen component is start by setting up that state here and in the end what we want to manage here is our device width which changes over time, maybe name this available device width to make it clear that we're not setting the device width here, we're just setting the detected device width, you could therefore also name this detected device width.

* As we already did with useState and useEffect we need to apply listener logic

```js
const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width )
      setAvailableDeviceHeight(Dimensions.get('window').height )
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
        Dimensions.removeEventListener('change', updateLayout);
    }
});
```

* Now we can use available availableDeviceWidth and availableDeviceHeight 

```js
let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={listContainerStyle}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView> */}
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

```

* If we now save this, we should have a layout where if we start a game, we have this look but if we then rotate into landscape mode, this changes and of course also changes back it if it needs to. 

### Expo's ScreenOrientation API

* One important note the dimensions API is by far most important API you have and React Native when it comes to dynamically working with the way lable width and height.It's part of React Native and does not depend on export or anything like that.

* Expo however also gives you an API you can use you can

```js
//If this import doesn't work : expo install expo-screen-orientation
// import * as ScreenOrientation from 'expo-screen-orientation';

import { ScreenOrientation } from 'expo'
```
* The screen orientation API has a couple of functionalities and I want to quickly walk you through them.You can of course play around with them to learn more about them.

* For example you have to lock async method this locks the orientation in the end and you set the lock.

```js
//GameScreen.js
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
```

* now I'm calling this in the game screen. This means that I can freely rotate this as long as I'm configuring the game but as soon as the game Starts you'll see that the orientation doesn't change anymore so that can be useful if you need to lock this down. When your app reaches a certain point

* in addition to that discrete orientation API here also gives you a function to get the current orientation and async simply means that this gives you a promise that doesn't immediately do that.It gives you a promise where you eventually get the result but the result will be there very quick. Just not in the next code line immediately

* and you can also set up a orientation change listener for example and this orientation change listener will do what it sounds like.It fires a function whenever you orientation changes that can be useful if you have different layouts that only depend on the question whether you're in portrait or landscape mode and not so much on the dimensions because of course it's important to keep in mind that with the code we wrote here with use effect where we listen to changes in the dimensions we technically don't just react to orientation changes though that typically is what changes the available width and height.

* So they offered you dimensions API is the important API but I didn't want to hide the screen orientation API Expo exposes from you especially because it can also be used for locking and unlocking of course the orientation at runtime which can be useful at times.

### Introducing the Platform API

* Let's now have a look at how you can actually render different styles or layouts or whatever you want based on the platform you're running on.

* Right now we have basically an identical app on both iOS and Android with one exception and that's our button here. The buttons look different because the button component which we're using is a component baked into React Native and it's one of the very rare, actually the only component React Native offers that automatically adjusts based on the platform your app is running on, no other component really does that but of course, you can write code to adjust your styles, layout logic whatever you want based on the platform you're running on. 

* let's go to our header component and there,let's work on the way we present this header. On Android and IOS we will different header style

* Now to find out on which platform you're running, React Native has you covered, it has the platform object where dimensions helps you find out the dimensions of the device you're running on, platform helps you find out the platform of the device you're running on.

```js
// Header.js
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors'
import TitleText from './TitleText';

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width : '100%',
        height : 90,
        paddingTop : 36,
        backgroundColor : Platform.OS === "android" ? Colors.primary : 'white' ,
        alignItems: 'center',
        justifyContent : 'center',
        borderBottomColor : Platform.OS === "ios" ? #ccc : 'transparent',
        borderBottomWidth : Platform.OS === "ios" ? 1 : 0
    },
    title : {
        color : Platform.OS === "ios" ? Colors.primary : 'white'
    }
});


export default Header;
```
* Now of course you don't need to set up any listener on platform and it also doesn't offer such a functionality because the platform can't change whilst the app is running, it's the same operating system all the time of course.

### Working with Platform.select() and Platform in "if" Checks

* Now sometimes it can be cumbersome to add a bunch of such checks and here we already have three checks on the header for example, certainly something we can add but maybe not optimal. Instead to keep our style objects cleaner, we could set up a base header here,

```js
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors'
import TitleText from './TitleText';

const Header = props => {
    return (
        // with that we're telling React Native please merge in the properties of the value, in this case, an object we're selecting for iOS and for Android. So you'll always have to pass an object to platform select and then you have different values for iOS and Android 
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width : '100%',
        height : 90,
        paddingTop : 36,
        backgroundColor : Platform.OS === "android" ? Colors.primary : 'white' ,
        alignItems: 'center',
        justifyContent : 'center',
        borderBottomColor : Platform.OS === "ios" ? #ccc : 'transparent',
        borderBottomWidth : Platform.OS === "ios" ? 1 : 0
    },
    headerIOS: {
        backgroundColor : 'white' ,
        borderBottomColor : #ccc,
        borderBottomWidth : 1 
    },
    headerAndroid: {
        backgroundColor : Colors.primary ,
        borderBottomColor : 'transparent',
        borderBottomWidth : 0
    },
    title : {
        color : Platform.OS === "ios" ? Colors.primary : 'white'
    }
});


export default Header;
```
*  we have code with a base style where we then use platform select to dynamically pick different styles based on the platform we're running on and therefore now, we have the same look as before but now in a more elegant way.

* Another place in our app where we could take advantage of this is our main button here. Our main button looks and feels the same on both platforms which isn't horrible but which also might not be what we want.

* If we go to our MainButton.js file, we see we always use touchable opacity here but actually on Android, we might want to use the ripple effect.

* Now thankfully, React Native has the touchable native feedback component built in which actually gives us a touchable object which has a built-in ripple effect, so we want to use that on Android and touchable opacity on iOS.

```js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../constants/colors';

const MainButton = props => {
    let ButtonComponent = TouchableOpacity

    if(Platform.OS==='android' && Platform.Version>=21){
        ButtonComponent = TouchableNativeFeedback
    }
    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
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
    },
    buttonContainer : {
        borderRadius: 25,
        overflow: 'hidden'
    }
});

export default MainButton;
```

### Using Platform-specific Code Files

* Now in rare cases, you also might want to switch way more than just some styles and a component and therefore in your component file, you would have a lot of if checks, a lot of platform selects. In such cases, you can also work with multiple files,

* you can create a MainButton.android.js file and another MainButton.ios.js file and then React Native will automatically load the Android component here for Android and iOS for iOS

* Important though, in the places where you use your button, you shouldn't adjust your imports. So here my IDE automatically adjusted this, you should still import main button as if the file would be named MainButton.js,don't import from .android or .ios, import from just main button, so make sure you have all these imports fixed because React Native will automatically rename this behind the scenes and load the correct file based on the platform you're running on.

```js
//MainButton.android.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import Colors from '../constants/colors';

const MainButton = props => {
    let ButtonComponent = TouchableOpacity

    if(Platform.Version>=21){
        ButtonComponent = TouchableNativeFeedback
    }
    return (
        <View style={styles.buttonContainer}>
            <TouchableNativeFeedback activeOpacity={0.6} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
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
    },
    buttonContainer : {
        borderRadius: 25,
        overflow: 'hidden'
    }
});

export default MainButton;

```
* iOS

```js
//MainButton.ios.js
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
* and of course these names have to be correct, .android.js and .ios.js, then these files will be loaded for different platforms your app is running on. Use that if you have a lot of different logic in the files and you would have a lot of if checks in there, a lot of platform selects in there and therefore you have cleaner code by having different files.

### Using the SafeAreaView

* Now there is one extra thing when building mobile apps for modern phones we can kind of see this here on the iPhone which I rotated it has this notch here. Right. And this notch can sometimes overlap your content. The same is true for this home screen Task Manager indicator bar here at the bottom on the iPhone. You see it's overlapping our new game button and yes I can scroll up but it bounces back and it always is above that button. So these are elements which are part of the wise which kind of can distort our interface.And of course that's not just the case on iPhones. You could have a similar issue on Android devices. There you also have devices with a notch or with anything like that.

* Now to make sure that your app always looks good on all different devices React Native has a special component you can use a component which automatically adjusts your your content to fit onto the screen of your device and respect notches and other things.

* where I have this issue here on the iPhone we can import this special component React Native offers and that's the safe area view.

```js
//App.js
    import { StyleSheet, SafeAreaView } from 'react-native';
    ...
    ..
    <SafeAreaView style={styles.screen}>
        <Header title="Guess a Number" />
        {content}
    </SafeAreaView>
```
* Safe Area views should always wrap your topmost view. So in this case this scroll view here so now is that safe.

* Now that does not mean that you need to wrap all your content or your entire app in a safe area view all the time as you will see in the next module when we all to talk about navigation in a lot of apps you'll actually use a library that takes care about this in a lot of cases for you the navigation library will use there. So in a lot of apps because most of your apps will have navigation you will not have to manage just manually. But if you're building an app where you have no other library that's taking care about this like this app here you mind when I consider wrapping your content with a save area view if otherwise content is overlapped.

* Useful Resources & Links 
    * Dimensions API - Official Docs: https://facebook.github.io/react-native/docs/dimensions#docsNav
    * Platform-specific Code - Official: https://facebook.github.io/react-native/docs/platform-specific-code