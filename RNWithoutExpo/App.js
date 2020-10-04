/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const App = () => {


  // onPress, I want to open the image picker. Now how can we add this?
  // Now since this is a React Native project without expo in any way, we can't easily use the expo APIs here.
  // There actually is a way of using them and I'll come back to that later in this module

  //  if you're working with a vanilla React Native app,

  // we search for React Native image picker for example to find a package that helps us with that, for example this one, the React Native image picker package

  // Refer : https://www.npmjs.com/package/react-native-image-picker

  // and now we can install this because now we can bring any third-party package, no matter if it adds native functionalities or not into your app.
  //Previously with expo, this was not really possible, there you could only bring third-party packages that did not tap into native device features, now you got no restrictions.

  // "npm install --save react-native-image-picker"

  // and then this "react-native link react-native-image-picker"

  // Now I will say there are third-party packages that take more effort, it really depends on the package. For expo,

  // it obviously was very easy, you just ran expo install, that was very fast, didn't take that long and you didn't need to do anything else.

  // Here you need to run one extra command but of course that's also not too bad but again, I will say not all packages support this command,

 // some packages require way more manual wire up work, manual work where you then actually need to dive into the Android and iOS folders to start working on some configuration files there.

  // That's what the React Native link command did for you, for example on Android if you dive into the app

  // folder and there, source and then in the source folder into build gradle, you will see that there, this line was added.

  // This wasn't there from the beginning, this was added by the React Native link command

  // some packages even support autolinking where this linking will be done automatically once installation

  // finished but not all packages have that support, so that's something to be aware of. Behind the scenes, a lot of configuration was changed.
  const pickImage = () => {
    // copied from package
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.uri)
      }
    });
  }
  return (
    <View>
      <Button title="Take Image" onPress={pickImage}></Button> 
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex : 1,
    justifyContent : 'center',
    alignItems: 'center'
  }
});

export default App;
