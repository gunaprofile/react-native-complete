## Native Features

### Navigation Setup in Next Lecture

* you will be using v4 if you install it via 

```js
npm install --save react-navigation
```
* That's fine, just keep in mind that you need to import createStackNavigator differently.

* Instead of
```js
import { createAppContainer, createStackNavigator } from 'react-navigation';
```
* you'll need to install an extra package:

```js
npm install --save react-navigation-stack
```
* and then import like this:
```js
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
```
### Screen & Navigation Setup

* So let's get started with the basics therefore. I'll add a new folder screens with the four screens I want to have and that would be the places list screen file, the place detail screen file, the new place screen file and also the map screen where we can then see this full screen map and I'll populate them with content throughout this module but these are the four basic screens which I'll need.

* So with that installed, now of course we can setup navigation here in the places navigator

```js
// navigation/PlacesNavigator.js
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(PlacesNavigator);

```
* Lets create basic screen MapScreen.js, NewPlaceScreen.js, PlaceDetailScreen.js, PlacesListScreen.js
```js
//MapScreen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapScreen = props => {
  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MapScreen;

```
* let's actually make sure that we have a plus button here in the header as well which takes us to the new place screen because that's then where we can get started with tapping into native device functionalities and with adding places. Now of course you know how to add a button to the header of your navigator, all you need to do is install a new package with

```js
npm install --save react-navigation header-buttons
```
* So I'll create a components folder in which I can set up my own header button component to have that preconfigured reusable button component and in that component

```js
// components/HeaderButton
import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
```
* Make sure we inpirted inonicons

```js
npm install --save @expo/vector-icons
```
* Now with that we could use in placesListScreen
```js
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const PlacesListScreen = props => {
  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
              navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
```
### Getting Started with the Form

* So in a new place screen, I want to be able to add a place and for that, I'll first of all add the text input component which of course has nothing to do with native device features but we simply also need that because in there, we can now add such a text input that allows the user to enter the title

```js
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');

  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
```
* I now want to make sure this place does get saved and for this, I'll again use Redux.

```js
npm install --save redux react-redux redux-thunk
```
### Redux & Adding Places

* Inside the store folder we will have "places-actions.js" and "places-reducer.js"

```js
//store/action/places-actions
export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = title => {
  return { type: ADD_PLACE, placeData: { title: title } };
};
```
* Lets add model for our reducer

```js
//models/place.js
class Place {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}

export default Place;
```
* Lets create reducer for the above model and action

```js
import { ADD_PLACE } from './places-actions';
import Place from '../models/place';

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(new Date().toString(), action.placeData.title); //new Date().toString() is temporary ID
      return {
        places: state.places.concat(newPlace)
      };
    default:
      return state;
  }
};
```
* Lets combineReducers and createStore in our app.js

```js
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
```
*  With Redux set up, we can go to the new place screen and make sure that here in the save place handler which is triggered when we click this button,

```js
// NewPlaceScreen
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
```
### Outputting a List of Places

* Let create PlaceListItem component

```js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const PlaceItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: '#666',
    fontSize: 16
  }
});

export default PlaceItem;
```
* Lets use this items in our place List 

```js
import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places); // state.places(check app.js).places(check reducer) 

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={null} // as of now we don't have an image
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
```
### Accessing the Device Camera

* Now this React Native application is built with the help of expo as you know. Now as I mentioned, this still is a regular React Native application, therefore expo just as an extra wrapper which provides a lot of convenience features out of the box that makes building this app easier and it's like a shell, an app in which our app runs which therefore makes tapping into a lot of native device functionalities easier and especially easier to set up.

* but actually, if you don't have a reason for not using expo, I would strongly recommend that you do use it because expo if you check their docs, has a lot of built-in features and a lot of built-in native modules you can use https://docs.expo.io/versions/latest/

* image picker - https://docs.expo.io/versions/v39.0.0/sdk/imagepicker/

```js
expo install expo-image-picker
```
* With that we can start using it and I want to start using it here on the new place screen where we have text input right, there I also want to now add a button which the user can press to open up the camera.

* For the camera, of course you can also follow along because we'll use it together here to take a picture. I'll actually create a new component, ImageSelector.js

* For camera we need to use expo permissions, make sure you install expo-permission

```js
expo install expo-permissions
```

```js
import React from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // ImagePicker
import * as Permissions from 'expo-permissions'; // expo-permission

import Colors from '../constants/Colors';

// By the way if we call this function multiple times and the user did already grant permissions in the past,

// the user will not be presented with this prompt again, the same by the way if the user declined, in both cases the result is stored automatically by iOS and this function will just return true or false depending on whether the user denied or granted access in the past.

// So verify permissions is now simply a function which we need to call in the take image handler before we try to use the camera.

const ImgPicker = props => {
  // before we try launching the camera and opening the camera, we'll need to ask for permissions.
  const verifyPermissions = async () => {
    // Again, that's an async task which returns a promise because this will open up a prompt and before the user has chosen an answer, nothing will happen, so therefore we have a promise which resolves or is rejected once the user confirmed or declined.
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== 'granted') {
      // which means the user declined, the user did not grant permissions, in that case we can't continue.
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    // we need permissions to take the image without that camera doesn't open
    //before we try launching the camera and opening the camera, we'll need to ask for permissions.
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
        return;
    }

    ImagePicker.launchCameraAsync();

    // Now this will open up the device camera and the async part here kind of implies that this is an async operation.

   // Indeed this does return a promise, which makes sense because it opens the camera and we don't know when the user will be done taking the image,

   // so it will then just register a function which it should execute once the user is done and resolve the promise to execute that function once that happens, once the user is done or also of course once the user cancels. 
    
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet.</Text>
        <Image style={styles.image} />
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
```
*  We can handle all of that and the result and so on later, for now let's see whether that works and for that, let's include the image picker component in the new place screen.

```js
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker'; // Now we can use ImagePicker component

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker /> 
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
```

### Configuring the Camera Access

* So let's start with configuring camera , you can set and of course the official expo docs for the image picker are the place to go to learn all about these options.

* Now the default settings actually are quite fine but for example here, you could add allows editing and set it to true to get a basic editor which allows you to crop the image for example and that's actually something I will enable here.

```js
// component/ImagePicker
const image = await ImagePicker.launchCameraAsync({
      allowsEditing : true, 
      aspect : [16, 9], // You can also set a specific aspect ratio where you want to log in, like 16:9 which will be taken into account in your editing mode.
      // base64 : true , if you want a base64 string instead of a file or in addition to the file I should say,which means that you get a text string that represents your image, which is quite large though and
      quality : 0.5 // this should be a value between 0 and 1 where one is the highest possible value and of course this also impacts the image size thereafter.
      //So you want to pick a size or a quality that makes sense for your app.
    });

console.log(image);
```
* If you're only using the image as a thumbnail, you might not need super high res images.

* how do we get access to the image that was taken?

* Well remember that this is a promise or that this returns a promise. Well of course therefore we can await that promise and the result we get back after the promise resolved indeed is the image, so we can just store this image in a constant. An image is now an object with various pieces of information about the image that was taken.

```js
Object {
  "cancelled": false,
  "height": 540,
  "type": "image",
  "uri": "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Frn-native-9b924443-4033-42d2-b498-d6894564a197/ImagePicker/d855b83a-65fe-46fe-8b90-ce292d8aaba4.jpg",
  "width": 960,
}
```
* Now this is in a temporary directory which is cleaned up automatically periodically, so of course it's not the storage or the path where you want to permanently store that and we will actually move it later with the filesystem API but for now, this is something we can work with.

```js
import React, { useState } from 'react'; // import useState
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(image.uri); //  set picked Image state
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
    
        {!pickedImage ? (
          <Text>No image picked yet.</Text> // if No image picked yet
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} /> // use pickedImage here
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
```

### Using the Picked Image

* the more important thing of course is that we kind of pass this picked image on to our place, our new place screen right because that's where we need the image in the end, I don't just need it here as a preview, I also need it in that other screen.

```js
import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(image.uri);
    //  So I don't just store it here internally to have a preview, I also forward it to the parent component 
    props.onImageTaken(image.uri); // reach out to our props and then we can access onImageTaken in parent

  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
```
* From this image picker component we need to move this to NewPlaceScreen.js

```js
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const imageTakenHandler = imagePath => {
    //here we are setting SelectedImage
      setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    // Once after set and then after we click save Btn we are forwarding this selected image to placesActions
    dispatch(placesActions.addPlace(titleValue, selectedImage)); 
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} /> // here!!!!!
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;

```
* Since we are passing this to placesActions we need to do corresponding changes in placesAction too..


```js
// Places Action
export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
  return { type: ADD_PLACE, placeData: { title: title, image: image } };
};
```
* in the reducer, I now want to add the image to the place which is getting created but important, right now our place model!! expects no image, so it's time to change that as well,

```js
class Place {
    constructor(id, title, imageUri) {
        this.id = id;
        this.title = title;
        this.imageUri = imageUri;
    }
}
export default Place;
```
* Now we can use the same in our reducer too

```js
import { ADD_PLACE } from './places-actions';
import Place from '../models/place';

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
      new Date().toString(), 
      action.placeData.title, 
      action.placeData.image //action name not model name!!!
      ); 
      return {
        places: state.places.concat(newPlace)
      };
    default:
      return state;
  }
};

```
* Now we have image we can use in our PlaceListScreen

```js
import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
        // because here we're referring to a place object following our place model
          image={itemData.item.imageUri} // here imageUri is model!! name 
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
      )
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;

```

* Now one thing is important to understand.Thus far, we're only storing this image in the default path we get out of the box which is this temporary path and that's of course not where we want to have it stored because as I mentioned, this will be cleared periodically and therefore eventually we'll lose our image which of course is not the goal here.

### Storing the Image on the Filesystem

* To avoid that the image eventually gets removed, we need to store it in a more permanent path on our local device filesystem. Of course, we can also upload it to a server but we already talked about service and so on, here I want to focus on all the native device capabilities. Now to work with our native filesystem,

```js
expo install expo-file-system
```
* we have that installed, now we can move the image after we took it. Now there are various places in the app where we could do that, we could do it in the image picker right after we took the image but at this point of time, we don't know yet if we will actually submit the form, if we actually keep that image. So what if we just took an image here but then we discard this and we go back? I don't want to have the image moved to a permanent place in that case, it should definitely be cleaned up and that's the default behavior, so I don't want to move it at this point yet, instead I want to move it once we submitted the form.

* Hence we could do it here in the new place screen, in the save place handler but then we would add all this filesystem logic to this component which is possible but which adds a lot of logic into this component which I don't really want to have there, I want to keep this component relatively lean. A great place for this however is the action creator. We already used this in the past for having side effects, like sending HTTP requests. Now moving a file is basically the same category of thing we're doing, instead of sending a request to a server, we're moving a file, well it's not that different.

```js
import * as FileSystem from 'expo-file-system'; // expo-file-system

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
  // and I will add async here so that we can use async await because we're going to do some asynchronous work here.
  return async dispatch => { 
    //now use this alternative syntax of dispatching or of having an action creator which utilizes Redux Thunk,

    // Now moving the file actually involves a couple of things. First of all, we need to derive the new path of the file and that should of course be a more permanent directory.

      // So what this code here does is it takes a look at our image path, splits it by slashes which kind of makes up our full path there and by popping the last element,well what is the last element? That is our file name,
    const fileName = image.split('/').pop(); // pop gives last segment eg. myimage.jpg,

    const newPath = FileSystem.documentDirectory + fileName;

    // For that, we can use filesystem and there, you've got a couple of directories you can access.

    //You got the cache directory which is actually the directory where the file is already stored in out of the box, 

    //the bundle directory which is not!! really a good directory for storing files your app uses either 

    //but you also got the document directory, this is the main directory for any files that your app needs which are guaranteed to survive.

    // Now when you uninstall your app, this folder will also be erased, so then these files are lost but until then, they will persist across app restarts, across long pauses where people haven't used your app, so here the files will survive.

    try {
      //  moveAsync => moving that file can take a bit longer and therefore it will tell us when it's done.
      await FileSystem.moveAsync({ // this returns a promise that is why await here
        from: image,
        to: newPath
      });
    } catch (err) {
      // Now we should wrap this into a try catch block because this could fail because for example there is not enough space on the device or somehow we have a permissions error or anything else is wrong.
      console.log(err);
      throw err;
    }
    // so that in this internal function, we can dispatch this action by calling dispatch here and passing our action object 
    dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath } });
    // Now once it was moved, we know it'll be in the new path, so of course it's the new path which I now want to store here in my place data or in my Redux store.
  };
};

```
* this should store our image in a permanent directory but what we're not doing is we're not storing our data itself in a permanent place. We're of course using Redux here and that means it's stored in memory but whenever we close and restart our app, all our data will be lost because that's not stored on the device or on a server or in a database, it's just in memory which is active as long as our app runs and thereafter that's cleared.

* So as a next step, I want to show you how to use SQLite which is an on device database, both available on iOS and Android, to store more than just files but to also store our data, like the title and the image path and so on.

### Diving into SQLite for Permanent Data Storage

* So let's dive into SQLite. Again we got a module for that supported by expo which we install just as we installed the other native modules

* now just some quick words about SQLite. SQLite is a database system you could say which is available on both iOS and Android, so you can quickly set up such a database there, it'll be super easy with this module and you can then use some SQL syntax, some basic SQL syntax to run queries against that database. 

Refer : https://docs.expo.io/versions/latest/sdk/sqlite/
Refer : https://snack.expo.io/@git/github.com/expo/sqlite-example

```js
expo install expo-sqlite
```

* Now working with the database involves a couple of things, for example you need to open a connection to the database and if no database exists yet which is the case when you first access it in the lifetime of your app, it will also create that database and after you have that connection to that created database, you can of course run queries against it.

* So for that, I'll actually add a helpers folder with a db.js file in there which you don't need to do but I want to have my database logic in there to keep my other files lean and so that I have one file where we can see all the database logic.

```js
//helpers/db.js

import { SQLite } from 'expo-sqlite';

// Now what this will do is it will connect to this database or create the database if it can't find it,

// so when we first launched the app and you don't need to do anything else to get access to the database, so that's very trivial.

const db = SQLite.openDatabase('places.db'); // Now this code line will be executed whenever we execute this file which effectively happens when we first import this file anywhere. 

// Now I also want to add an init function here stored in a constant which I do to initialize this database and I'll export this function as a named export.

// Now in this function, I want to make sure that we create a basic table because SQL databases work

// with tables which hold your records and records are basically the rows of data you add to your table.

// Now initially when we create the database, it's empty but in order to store places, we need a table that can hold these places.

// So I want to have an initialization function here which will actually create that table if it doesn't exist yet.

export const init = () => {

  const promise = new Promise((resolve, reject) => {

    // Now transaction is a method offered by the SQLite package on the database 

    // transaction method takes a function as an argument which gives you access to the transaction object it creates for you.

    // The concept of transactions simply is a concept where this package in the end then guarantees that your query is always executed as a whole 
    
    // and that if some part of the query should fail, the entire query is rolled back so that you can't end up with corrupted data in your database, that's why you actually wrap every query into such a transaction.

    db.transaction(tx => {
      // So in here, we can now use this transaction object to execute a SQL query with the help of the execute SQL method, again that's also documented here


      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',

        [], // Now the execute SQL method also takes a second argument which is an array of arguments which will come into play later which we don't need yet,

          //these would be dynamic arguments you can inject into this query but we don't need that here

          // and then we have two functions here as argument number three and four

        () => {  // The first function which we pass in is a success function, this executes if this command succeeded.
          resolve(); // if success,
        },

        (_, err) => { // The second argument is an error function which executes if this failed.

          // Now the first argument to each function here and these functions are executed on your behalf by the SQL package of course,

          // so these functions always as a first argument get basically the query you executed and by adding an underscore as a name here, I signal that I don't care about this but I'm interested in the second argument and here, this would be my error

          reject(err);  // if failed,
        }

      );
    });
  }); 
  // now to make this usable in an easy way, I will actually wrap this into a custom promise.
  return promise;
};

```
* So with this, we're still not storing anything in the database but we're setting up the database. So now let's make sure we call init and of course the place to call it is the app.js file because we want to initialize the database as soon as possible when our app starts up.

* Now we can initialize the database in our App.js

```js
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';
import { init } from './helpers/db'; // import db helper file

// executed db init function
init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
```
### Storing Data in the Local Database

* let's make sure we can store data in there.

```js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
// insertPlace ...
export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {

        db.transaction(tx => {
          // Now you need to specify the table and that's places and then between parentheses, the fields you want to target in there and of course I want to target all fields except for the ID because as I mentioned, that will be autogenerated which is very convenient

          tx.executeSql(
            `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
            [title, imageUri, address, lat, lng], // to avoid Sql injection attack
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );

        });

      });
      return promise;
};

```
* So now we can call insert place and of course the place where I want to call it again is my places actions file.

```js
import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
import { insertPlace } from '../helpers/db'; // import insertPlace

export const addPlace = (title, image) => {
  return async dispatch => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      // insertPlace query
      const dbResult = await insertPlace(
        title,
        newPath,
        'Dummy address',
        15.6,
        12.3
      );
      console.log(dbResult);
      // now we can dispatch with dbResult insertId
      dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: newPath } });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
```
### Fetching Data from the Local Database

* Fetching data from our local database is not that different from fetching it from a web server, instead of reaching out to a web server, we just reach out to our local database but that's it.

* So let's start by writing a function in the db helper file that allows us to fetch data from the database.

```js
//helper/db.js
export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM places',
            [],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};
```
* and now we just need to go to our actions and make sure we have an action for this.

```js
import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../helpers/db'; // fetchPlaces

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {
  return async dispatch => {
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        'Dummy address',
        15.6,
        12.3
      );
      console.log(dbResult);
      dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: newPath } });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces(); //fetchPlaces
            console.log(dbResult);
            dispatch({ type: SET_PLACES, places: dbResult.rows._array }); // Places
        } catch (err) {
            throw err;
        }
    };
};
```
* now I want to execute load places in my places list screen because that is where I need all the places, right?

```js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch(); // we need to dispatch an action

  // now when this component loads, which we can in the end find out with the help of use effect, I want to dispatch this data loading action.
  useEffect(() => {
    dispatch(placesActions.loadPlaces()); // loadPlaces action
  }, [dispatch]); // we have one dependency, that's the dispatch action which should never change,
  
  // so therefore this should only run once when the component is created, which is exactly the behavior I want here.


  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={null}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;

```
* Now of course, that then triggers the set places actions, so now in the places reducer, we need to care about this,

```js
import { ADD_PLACE, SET_PLACES } from './places-actions';
import Place from '../models/place';

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      // here we are returning state 
      return {
        places: action.places.map(
          pl => new Place(pl.id.toString(), pl.title, pl.imageUri)
        )
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image
      );
      // here we are returning state 
      return {
        places: state.places.concat(newPlace)
      };
    default:
      return state;
  }
};
```

### Getting the User Location

* Refer : https://docs.expo.io/versions/latest/sdk/location/

* For the user location, we got another package built into expo which we can easily use and that's location package.

```js
expo install expo-location
```

```js
// component /LocationPicker
import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location'; // import Location
import * as Permissions from 'expo-permissions'; // Permissions

import Colors from '../constants/Colors';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  // verifyPermissions
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION); // askAsync Permissions
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    // call verifyPermissions
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      // once after verifyPermissions getCurrentPositionAsync
      const location = await Location.getCurrentPositionAsync({
        // set this to five seconds to make sure that if we couldn't fetch a location for five seconds, we stop trying and we throw an error,
        timeout: 5000
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </View>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LocationPicker;

```
* Now we can use the location in our new screen.

```js
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker'; // LocationPicker

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
  };

  const imageTakenHandler = imagePath => {
      setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };
  // we used LocationPicker here..
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker /> 
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
```
### Showing a Map Preview of the Location

* So now I also want to display a little map preview here and there are different ways of doing that of course and later we'll also add an interactive map to this app. For now, I just want to have a static image, so like a map snapshot and the cool thing is Google has an API for us which generates such snapshots.

Refer : https://developers.google.com/maps/documentation/maps-static/overview

* I now want to output an image here which points at that URL because as I mentioned, this is how you can get this image, this URL returns an image. Now what I'll do therefore is I'll create a new component here which I'll name MapPreview.js

* Before that let's create a environment file using env.js

```js
// env.js
const vars = {
    googleApiKey: 'AIzaSyCjv8HXdnCEPt1Y26z3im0RP27UpfvB4yg'
};

export default vars;
```
* Now we can use this googleApiKey in our MapPreview component as below

```js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import ENV from '../env';

const MapPreview = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location.lat
    },${
      props.location.lng
    }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      props.location.lat
    },${props.location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children // we will pass this children from this component// ActivityIndicator and fallback content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;
```
Now we can use this MapPreview component in our Location preview component

```js
// componenet/LocationPicker
import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  }
});

export default LocationPicker;
```
### More on Environment Variables

* In the previous lecture, we created a basic environment variables file (env.js).

* This basic file just exports a JS object - but you could get more fancy and for example export different environment variables for your development flow (i.e. for testing/ developing your app) and for production (i.e. for when you publish your app).

* The special __DEV__ global variable offered by Expo helps you - it's a variable which you can always access anywhere in your Expo-driven React Native project to determine whether you're running this app in development mode or not.

* Therefore, you could create a more elaborate environment variables file like this one:

```js
const variables = {
    development: {
        googleApiKey: 'abc'
    },
    production: {
        googleApiKey: 'xyz'
    }
};
 
const getEnvVariables = () => {
    if (__DEV__) {
        return variables.development; // return this if in development mode
    }
    return variables.production; // otherwise, return this
};
 
export default getEnvVariables; // export a reference to the function
```
* You would use that file like this:

```js
// someOtherFile.js
import ENV from './env';
...
const apiKey = ENV().googleApiKey;
```
### Displaying an Interactive Map

* To display this on a map, we have this map screen component which currently just has some dummy content and now we need to be able to render an interactive map and for this, expo again has got us covered.

* Refer : https://docs.expo.io/versions/latest/sdk/map-view/

```js
expo install react-native-maps
```
* this will then allow us to use various components that render interactive maps. So let's wait for that to finish and with that finished, in the map screen component, we can start using that map.

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps'; // import  MapView

const MapScreen = props => {
  // it needs a region props which tells it where it should be focused on when it loads,
  // so which map part or which part of the world it should focus on when it loads.
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
    // The deltas basically set the zoom factor because this describes how much space you can see around the center which you describe with these two points.
  };
  return <MapView style={styles.map} region={mapRegion} />;
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default MapScreen;
```
* Now this should render a map on the screen, now we just need to be able to reach it and for that let me go back to the location picker and I want to reach it in two different ways - one is with the help of a button 

```js
import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    // Now the pick on map handler should simply go to the map screen right,
    props.navigation.navigate('Map');
    // So now if I click on the plus here and then pick on map, I get an error,
  //now why is that? Well that's totally unrelated to native modules. You might remember that the navigation prop
  // is only available on components which are directly loaded as screens which the location picker of course isn't
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler} //MapPreview onPress
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          // here this button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default LocationPicker;

```
* now we need to make sure that we can also tap the map preview and for that, let me go to map preview and add TouchableOpacity

```js
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import ENV from '../env';

const MapPreview = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location.lat
    },${
      props.location.lng
    }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      props.location.lat
    },${props.location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
    // TouchableOpacity here 
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;
```

* So now if I click on the plus here and then pick on map, I get an error, now why is that? Well that's totally unrelated to native modules. You might remember that the navigation prop is only available on components which are directly loaded as screens which the location picker of course isn't

* Now there are various workarounds, there would be a higher order component we can use, we can also install a React navigation specific hooks package

* but here I'll take a simple approach and just make sure that I have a navigation prop on location picker by going to the new place screen which is where I do use the location picker and there I'll set this navigation prop

```js
//screens/NewPlaceScreen
 <LocationPicker navigation={props.navigation} />
 // which I here do have available because this is a component directly loaded through a navigator, so now I'm just forwarding access to my navigation props.
```
### Adding a Marker

* How can we make sure that we can pick a place?

* Well on map view, in your map screen, you can add an onPress handler and this fires whenever you tap somewhere on the map and with that I don't mean taps when you scroll but when you tap there without scrolling, so if you really want to select something.

```js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = props => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    // here we are storing selected places
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  let markerCoordinates;

  if (selectedLocation) { // if we selected lat and long we create markerCoordinates
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        // if we have markerCoordinates we can show Marker here
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default MapScreen;

```
### Making the Picked Location "Saveable"

* So I want to have a save button in my header and for that of course, we need to add map screen navigation options

```js
// MapScreen
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const MapScreen = props => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  //  I want to trigger a function that should be defined in the component
  // how you can communicate between your component and also your navigation options

  // this function or a reference to this function should be passed to the navigation options and for that, we can use the good old use effect hook and use callback to avoid this infinite loop 

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      return;
    }
    // here we are passing location details to NewPlace 
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  
  // and then use effect here to tell our navigation options about this by using props navigation set params and then I want to set my save location param here to the save picked location handler, so pass a reference to this function, to this param or with this param to my headers

  useEffect(() => {
    // we will extract this save location param in our header.
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });

    // I can navigate to my new place screen with the new place identifier as set up here in my places navigator and since I'm already on a screen ahead of that new place screen,

    // don't forget that this is a stack of screens and I'm on a screen on top of the new place screen, his will actually not push this new place screen on top of the existing screen,

    // we could force this with push but I don't want to, instead it will go back but now by using navigate, I can append some params here. I can add my picked location and there, point at my selected location prop which hopefully holds my picked location.
  
    // Now since I use selected location in here and since this changes, I'll add this as a dependency to use callback so that this function is recreated when we have a new location picked 

  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  // So with that, we can extract this save location param in our header.
  const saveFn = navData.navigation.getParam('saveLocation');
  // So now we have the save button, when we press the save button, I want to trigger a function that should be defined in the component
  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
```
* now we can use the data we're passing back from map screen in our location picker ultimately to update the map preview there,

### Storing Picked Places

* So to use the data we're getting back from the map screen, we can go directly to the location picker component because there, I do have access to props navigation since I feed this in there from the new place screen, so I can directly listen to changes in my params there 

```js
import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  // Now of course, pickedLocation will not always be set,

  // for example if we go to the new place screen from our places list screen, there in this navigation action,

  // I'm not setting any param so therefore of course this is not always available but in that case picked location will just be undefined.

  const mapPickedLocation = props.navigation.getParam('pickedLocation'); // here we are receiving pickedLocation which we sent from  

  useEffect(() => {
    // whenever we pick new location i want to setInternal state with new location.
    // So this is now an elegant way of storing the location we picked on the map and which we passed around with props in our internal location picker state here.

    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation); 
    }

  }, [mapPickedLocation]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default LocationPicker;
```
### Updating the Location Screen When the Location Changes

* So whenever our location changes here in the location picker, I want to inform the new place screen.

* when I picked a place on the map or also here if I got the user location, in both cases I want to trigger a method or a function which I expect to get from my new place screen.

* So the same thing as we're doing it on the image picker in the end. There once I took an image, I call props on image taken to call a function that the parent component, so the new place screen, can pass to the image picker and I want to do the same here, I want to use the same pattern here in the location picker.

```js
import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.navigation.getParam('pickedLocation');

  const { onLocationPicked } = props; // here we destructed onLocationPicked from props

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);  // like below here after picking a location, I want to trigger props on location picked.
      // props.onLocationPicked(mapPickedLocation); if we didn't destructed we should like this 
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      // So here after picking a location with the please locate me button, I want to trigger props on location picked and forward this location in the end,
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });


    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

export default LocationPicker;
```
* So onLocationPicked is now a prop we can set on the location so I'll do that here in the NewPlaceScreen and this should now point to a function which will receive the picked location. 

```js
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
  };

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback(location => {
    // wrap use callback around my location picked handler, to avoid that this gets recreated with every re-render cycle and I therefore get into an infinite loop
    setSelectedLocation(location); // here we setSelectedLocation 
  }, []);

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation)); // now we got our selected location here. We can now use this in the save place handler
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler} //here  we used onLocationPicked props and assign that to a method 
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place'
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;
```
* And therefore the next thing we'll do is work on our Redux logic to take that location into account and that's one thing that's missing right now, also make sure we translate this coordinate pair we get into a human readable address as well.

### Storing the Address

* Let's go to Redux, to the places actions which now receives a location object as well

* So in places actions, in add place, we'll get this location object and here,I of course want to store it in my database,I want to store it in my Redux store and as I mentioned, I want to get this human readable address,and for that we can use another Google Maps geocoding API.

* and this is an API which allows you to translate addresses into coordinates or coordinates into addresses.Coordinates into addresses is called a reverse look up, so we can click on reverse geocoding

* Refer : https://developers.google.com/maps/documentation/geocoding/start#reverse

```js
import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
  return async dispatch => {
    // here we are requesting with fetch API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        location.lat
      },${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json(); // which extracts the body of the response and converts it to normal Javascript 
    if (!resData.results) {
      throw new Error('Something went wrong!');
    }

    const address = resData.results[0].formatted_address; // formatted_address!!

    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address, //now we can save actual address not dummy!! 
        location.lat, // now we can save actual lat and lng not dummy!!
        location.lng
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address, // address
          // coords
          coords: {
            lat: location.lat,
            lng: location.lng
          }
        }
      });
      // now all that data is passed on with our action object and therefore reaches our reducer.
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

```
* So in the reducer, we now need to make sure we use the new address and coords fields we get. So in the places reducer, we want to initialize our place here with that extra data and for that we first of all need to tweak the place model to expect that data.

```js
// models
class Place {
    constructor(id, title, imageUri, address, lat, lng) {
        this.id = id;
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
    }
}
export default Place;
```
* in Reducer

```js
import { ADD_PLACE, SET_PLACES } from './places-actions';
import Place from '../models/place';

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      // Now when we load them from the database, when we set our places, we should therefore also initialize our

      // place model correctly and take the data which is in the database already,

      // so keep the address, keep the latitude and keep the longitude,

      // so that's pretty straightforward and therefore now, we hopefully have all the data and use all the data.
      return {
        places: action.places.map(
          pl =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        )
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        places: state.places.concat(newPlace)
      };
    default:
      return state;
  }
};
```
#### Displaying the "Details" Screen

* when I use the place item, instead of passing null for the address, of course we should pass itemData.item.address in there because we should have the address stored.

```js
<PlaceItem
  image={itemData.item.imageUri}
  title={itemData.item.title}
  address={itemData.item.address}
  onSelect={() => {
    props.navigation.navigate('PlaceDetail', {
      placeTitle: itemData.item.title,
      placeId: itemData.item.id
    });
  }}
/>
```

* Let's make sure that on the detail page, we also see a bit more about this and for that on the place detail screen here, we of course can tweak this and add a scroll view so that we ensure that we can always see everything, we don't need a flat list here because we'll not have an infinite amount of items, maybe just a little bit of scrolling that is required based on the device size

```js
// Place details screen
import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const PlaceDetailScreen = props => {
  const placeId = props.navigation.getParam('placeId'); // we are already passing placeId here..
  const selectedPlace = useSelector(state =>
    state.places.places.find(place => place.id === placeId)
  );

  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

  const showMapHandler = () => {
    props.navigation.navigate('Map', {
      readonly: true, // So we need to use the read only prop or param to make sure we can't select a new place
      initialLocation: selectedLocation //  an initial location to still have a marker in there right from the start.
    });
  };
  // I want to pass in my location. Good thing is my map preview of course takes a location,
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={showMapHandler} // So when we click the map preview, onPress, I want to navigate to the different screen right.
        />
      </View>
    </ScrollView>
  );
};

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

export default PlaceDetailScreen;

```

* And in Mapscreen we could receive this params

```js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const MapScreen = props => {
  const initialLocation = props.navigation.getParam('initialLocation'); // here we receiving initialLocation props
  const readonly = props.navigation.getParam('readonly'); // here we receiving readonly props

  const [selectedLocation, setSelectedLocation] = useState(initialLocation); // will be loaded with initialLocation

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78, // here if we have co-ordinates we will show marker or else dummy co-ordinates
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    if (readonly) {
      // if readonly just return don't allow user to pick location
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      return;
    }
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  // Now I also want to get rid of the save button if we have nothing to save,
  const saveFn = navData.navigation.getParam('saveLocation');
  const readonly = navData.navigation.getParam('readonly');
  if (readonly) {
    return {};
  }
  return {
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
```
