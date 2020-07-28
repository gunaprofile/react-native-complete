# react-native-complete

## Meals App

### Adding Screens

* So I'll start in the categories screen

```js
//CategoriesScreen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoriesScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Categories Screen!</Text>
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

export default CategoriesScreen;

```
* Same template for CategoryMealScreen, FavoriteScreen, FilterScreen, MealDetailScreen

### Adding Fonts

* Add your font file to the fonts , Now adding the files alone won't do much as you of course know, instead we have to load these fonts and we do that in the app.js file which is our starting file that starts the entire app,  this might not be available in your project yet, so therefore you might want to run npm install

```js
npm install --save expo-font
```

* I also want to import the app loading component from expo, that's the component that will prolong the splash screen when the app starts until our fonts are loaded so that we only see something on the screen when all our assets, and in this case these are the fonts, are really available and are really there.

```js
import { StatusBar } from 'expo-status-bar';
import React  { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Fonts from 'expo-font';
import {AppLoading} from 'expo';

// Now we need to return this because load async returns a promise and I want to return this in my fetch fonts function because with this, we can use it together with the app loading component

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

// So now we can use fetch fonts with app loading and we do this inside of our app component, in there, I will manage some state and I do this with the help of the useState hook which we import from React and I'll name this state font loaded and set font loaded and call useState and initially, that's false because initially, the font hasn't been loaded and then here, we can check if the font has not been loaded which initially is the case, then I want toreturn the app loading component instead of my normal app content

  const [fontLoaded, setFontLoaded] = useState(false); // initail fontLoaded state is false

  if (!fontLoaded) {
// because in the app loading component,we can add the start async property and point at fetch fonts which kicks off this font fetching function and once this is done, the function we pass to onFinish will be called and in this function, I'll simply set font loaded to true,
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
    
  }
  // Once  font loaded this below JSx will load 
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```
### React Navigation Docs

* In case you want to dive into the official docs as well (we'll go through the installation in the next lectures, together), you can find the official docs here: https://reactnavigation.org/docs/4.x/getting-started 

### Installing React Navigation & Adding Navigation to the App(3.x)

* It's important to understand how navigation works it's important to understand how it differs from navigating between screens and the web because in the web you actually enter a URL and if you're building a react app you use a tool like to
react router to then load the users component.

* And if you click a link that goes to https://mysites.com/products again the react router which is extra library you installed kicks in sees that you change the path in your URL and loads a different react component. That's how navigation works in the web.

* So do URL is your source of truth and changing that URL might be picked up by libraries like react router which then rendered different components onto the screen. That's how I react for web works.

* Now there is one important difference to that when we think about native apps.We have no you are ell users don't go around in your app by entering some URL instead you are pressing buttons your pressing taps and you're going forth and back You have back buttons you have side drawers that's how you navigate on mobile apps to be precise. As I mentioned having taps is one common pattern you see there.

* The average common pattern is that you navigate in a stack of pages and that simply means that you go to some page you click on some item you're taken to a new screen and then automatically you get a back button it top or on Android you have one built into the device of course. And when you press that your navigated back to the page you were on before and you get a smooth transition for that.

* So there you could navigate around for example load a users component by pressing the tab or by pressing a special item and being navigated there and the navigation simply looks and feels a bit different to the users. Now of course we want to bring that look and feel to our React native app too. And thankfully that's very easy. With the help of a third party library

```js
npm install --save react-navigation 
```
* react navigation it's actually a navigation library that's built for react native.Now you can also kind of use it in web apps but its main focus is native apps built with React Native. So even though it's called the react navigation it's for React Native not just for react for the web.

* Installing dependencies into an Expo managed project

```js
expo install react-native-gesture-handler react-native-reanimated react-native-screens 
```
* Expo install though the only difference is that Expo installed behind the scenes will run npm install but it will pick the specific versions of these packages that work with your specific Expo version. So it's a safer version of npm install you could say and therefore it's recommended that you use that here.

* Lets create a folder navigation/MealsNavigator.js, where I want to set up my well navigation configuration I want to tell react navigation that library we installed which different screens we have how they are connected and how we want to be able to move between them.Now it's easier to simply see that than to just talk about them.

### Installing Different Navigators
* We're not using whereas in 5 right now because version 5 uses a slightly different syntax which we for the moment won't cover.

* If you're using React Navigation v4 or higher, everything works as shown in this module but there is one important difference: You need to install the different navigators which we'll use in this module (StackNavigator, DrawerNavigator, TabsNavigator) separately.

* So when we use the StackNavigator (= next lecture), run 

```js
npm install --save react-navigation-stack
```
* Also add this import in the file where you are using createStackNavigator:

```js
import { createStackNavigator } from 'react-navigation-stack';
```
* Same for TabsNavigator 

```js
npm install --save react-navigation-tabs
import { createBottomTabNavigator } from 'react-navigation-tabs';

```
* And also for DrawerNavigator
```js
npm install --save react-navigation-drawer
import { createDrawerNavigator } from 'react-navigation-drawer';
```
### Creating a StackNavigator

* I want to get started with the most basic form of navigation and also the most common form of navigation you have in any mobile app and that's how to go back and forth between screens and for this will set up a so-called stack and navigator.

* And whenever you go to a new screen it will be pushed on top of that stack at the topmost screen on a stack is always the screen which is visible. And when you then click the back button is popped off this screen you were on is popped off. And since you always see on the app the topmost screen you will see the screen below that which is the screen you came from. That's why it's called Stack navigator.

* Now one important note this syntax is correct if you're using react navigation version free if you're using react navigation aversion for it changed slightly then you need to install an extra package like mentioned earlier.

```js
npm install --save react-navigation-stack
```
* So that's how react navigation this library works you create so-called navigators which are in the end just you could say objects actually react components as it will turn out which hold all the navigation configuration which hold all the information which different screens you have and which will do the heavy lifting off loading different screens and playing nice smooth transitions for going from A to B for you.

* So we need to import create stack navigator and then we can simply call that now create stack navigator takes at least one argument and that is a javascript object where we configure the different screens we want to be able to move between

* I want to start on the categories screen and if I tap on a category there I want to go to the category meals screen and if I then tap on a recipe there on a meal I want to go to the meal detail screen so we'll need these three screens in our stack navigator

* so that these are the three screens you can move between by using this stack pattern by pushing you pages and popping them off and why don't we need favorites and filters because filters will later be added with the help of a sidebar it will be an alternative to this stack here and favorites also as an alternative to this stack we will be able to go there with taps later but not right now.

* we inform react navigation about these three screens by registering them as key value pairs you take any identifier any name of your choice

* So you use any identifier you want as a property name in this object you're passing to create stack navigator and now the value in its simplest form simply is a pointer at de react component you want to load as a screen for this screen.

```js
//navigation/MealsNavigator.js
import { createStackNavigator, createAppContainer } from 'react-navigation-stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';

// So with that basic configuration we're telling react navigation.Hey these are the screens will be able to move between right now however data alone won't do much.Why.

// Because we're creating that stack navigator but we're not doing anything with it so let's change this create stack navigator actually returns a navigation container and that turns out to be a react component.It's all named as meals navigator.

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen, // this is shorter form.. you can add longer form like below "CategoryMeals"
    CategoryMeals: {
        // This is longer form of telling reactNative about screen both above "Categories" and this are same
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
});

// You also need to create an app container in this app container you need to wrap your route.So your main navigator in this case we only have one we only have to stack Navigator.So let's wrap this with it.

export default createAppContainer(MealsNavigator);

```
* You should use in your Jsx code because this now has all the metadata about the navigation in general about react navigation and so on. So this is simply a pattern you need wrap your route your most important navigator with that and use this return react component in your J is X code then does basically the set up you'll always have when working with react navigation later you will also learn how to use multiple navigators in one app.

* Now as I mentioned meals navigator is now just a react component so in the end what we can do is wemcan simply return this instead of returning our view with our text in app.js

```js
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MealsNavigator from './navigation/MealsNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
    // here we can return MealsNavigator
  return <MealsNavigator />;
}
```

* You should see the categories screen once in reloaded and this of course is huge because this means that this works.

* Now please also note that you all by default get a nice header which has the default platform look for IO s it's clean flat has this thin line below it for android it's more free dimensional because it all has a slight drop shadow.

* Now of course it's missing a title and you will learn how we can add one in this module but we get this out of the box and this automatically all respects any notches you might have to stay this far you have here so it automatically uses such a safe area view

* for example when building an app with react navigation react navigation already wraps your views into a safe area view at least it will do a lot of the work you would have to do otherwise it will make sure that your header looks good and that is a big thing because manually creating a header that looks good on all devices is actually quite some work.

### Navigating Between Screens

* Well to reach our other screens, we need something which we can click, which we can tap. Later we'll have our grid of categories here and we will work on this in this module too but just to get started with navigation, I will add a button, so on the categories screen where I have this text, I want to add a button which I can tap to go to the category meals screen.

* but how can we now go to it? Well for this, it's important to know that any component you loaded with the help of React navigation gets a special prop passed in automatically, so any component mapped to one of your screen identifiers here, so in this case these three components(navigation/MealsNavigator.js), will get the special prop.

* Nested components in there don't automatically get it, just the top level components you mapped to identifiers in your navigators.

```js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CategoriesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Categories Screen!</Text>
            <Button title="Go to Meals!" onPress={() => {
                // Navigate takes an object as an argument and in this object, you can set up the route name to which you want to navigate.
                props.navigation.navigate({routeName: 'CategoryMeals'});
            }} />
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

export default CategoriesScreen;

```
*  please also notice that navigate of course doesn't say anything about the direction we want to go, it doesn't tell React navigation whether it should play that forward animation or that backward animation. React navigation automatically detects this because under the hood, it manages this stack of pages I was talking about, this stack of screens and in this stack, right now when we start the app, we only have the category screen but when I press this button, navigate in the end tells React navigation that since we're doing this inside of a component which was loaded with a stack navigator, that we want to navigate to a different screen which should be pushed on top of the stack. This is simply the default behavior and hence, it knows that it wants to go forward because a new route was pushed, which means it's added to the stack, we want to go forward and when we click the back button which it adds automatically, it pops this screen off the stack and since it removes something from the stack, it knows that it should play the back animation. So that's what's happening behind the scenes,

### Alternative Navigation Syntax

* But instead of
```js
props.navigation.navigate({routeName: 'SomeIdentifier'});
```
* you can also use
```js
props.navigation.navigate('SomeIdentifier');
```
### Navigation to the "Meal Details" Screen

```js
<Button title="Go to Details!" onPress={() => {
                props.navigation.navigate({routeName: 'MealDetail'});
            }} />
```
### Pushing, Popping & Replacing

* Now we had a look at basic navigation with navigate and navigate is your most important tool but actually when being inside of a screen, of a component loaded with the help of a stack navigator, you have alternatives to navigate.

* You also can use push instead of navigate, though that doesn't take a Javascript object but instead takes just the route name here, in this case category meals as a first argument and with that, you'll get the same behavior as before.

```js
//Push!!!!
<Button title="Go to Meals!" onPress={() => {
    props.navigation.push('CategoryMeals');
}} />
```
* The question of course is why would you then use this.??

* Number one it's a bit shorter than navigate because you're not passing an object but that's not the primary reason, instead using push here can be useful if you want to go to let's say a page where you already are on.

* in Categories screen if you try to navigate to Categories nothing will happen but at the same time if you navigate.push Categories Screen from the same Categories screen, it's pushed to the same stack over and over again.!!!

* Now of course, you might wonder why would I want to push the screen I'm already on onto this again.

* Now in many apps you might not need this but let's say you're building an app like Dropbox where you have folders between which your users can navigate, if you're in a folder, you want to go to another folder. Now each folder is the same folder screen technically, just with different content loaded into it. In such a case, you might want to go from folder A to B which uses the same component, the same screen in the end but with different content, in such a case you could use push to still be able to push that new screen which is the same screen onto the stack and load the same screen with different content,this would be one scenario where you could need this. 

* In this app we no need push.

* now you also have other explicit navigation options,

* let's say from the category meal screen, you want to be able to go back. Well of course, we are able to go back with the help of this back button but it's also not that untypical that in some apps, you have some other thing your users can do where you want to take them back then, for example let's say you're on a page where you can set up some configuration and when you click the save button, you want to save that configuration and you also want to leave the screen.

```js
<Button title="Go Back" onPress={() => {
          props.navigation.goBack();
      }} />
```
* Technically, this pops off the screen we're on and goes back to the previous screen in the stack therefore.

* As an alternative to go back, if you're in a stack navigator, you also have pop which does what the name implies, it pops off the current screen on the stack and since you always see the topmost screen on your device, this also plays the back navigation, so this is an alternative to going back.

* Difference is that pop can only be used if you're in a stack navigator, go back is also available in other navigators too

* Sometimes, you'll also want to go back all the way to your parent component, let's say here in the MealDetailScreen. 

```js
<Button title="Go Back to Categories" onPress={() => {
          props.navigation.popToTop();
      }} />
```

* Now with that, there's only one last possible navigation action you might sometimes need. Let's say on the categories screen, you want to go to category meals but you don't want to add it to the stack but you want to instead replace your current component in the stack with it, so that there is still only one screen in the stack but that screen is then a new page, that also means that you won't be able to go back on the new page because the stack would be empty thereafter which means your app closes.

```js
<Button title="Go to Meals!" onPress={() => {
    props.navigation.replace({routeName: 'CategoryMeals'});
}} />
```
* Replace also just like push takes just an identifier like this and replace also takes you to the new screen, it plays no forward animation though, instead it instantly jumps there and you get no back button automatically because the stack is empty otherwise, this is the only screen.

* This could be used for example on a login screen where a user did sign in and once signed in, the user shouldn't be able to go back to the login screen, well then you could simply replace the login screen with your you are logged in screen with the user profile or anything like that.

### Outputting a Grid of Categories

* Let's replace the categories dummy screen content here with a grid of categories, Now for that, we can use a component we used before and that's the FlatList.

* Thus far, we used that for normal lists, you can actually also render grids with it and that's exactly what we'll do here.

```js
// CategoriesScreen
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = props => {
    return (
        <FlatList
            numColumns={2} // this defines how many columns we want to have, The default is 1 which is a normal list but you can have more than one column
        />
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoriesScreen;

```
* Now with that, we could render a grid but of course we need some data for that, otherwise it's hard to render a grid right?

* For that, I'll add a new folder which I'll name data and in there, I'll add a dummy-data.js

* I want to have a bunch of categories in there and for this, I'll add yet another folder which I name models which is in the end a folder where I want to define how my data is shaped in this app, how it looks like.

```js
//models/category.js
class Category {
  constructor(id, title, color) {
    this.id = id;
    this.title = title;
    this.color = color;
  }
}

export default Category;
```
* Now why did I create this? Because now I can import my category class from the models folder, from the category.js file into the dummy data file and then use it to create some dummy data.Now you find that dummy data attached, attached you find Javascript file with these dummy categories which I store in a constant which I then export as a named export here.

```js
import Category from '../models/category';

export const CATEGORIES = [
  new Category('c1', 'Italian', '#f5428d'),
  new Category('c2', 'Quick & Easy', '#f54242'),
  new Category('c3', 'Hamburgers', '#f5a442'),
  new Category('c4', 'German', '#f5d142'),
  new Category('c5', 'Light & Lovely', '#368dff'),
  new Category('c6', 'Exotic', '#41d95d'),
  new Category('c7', 'Breakfast', '#9eecff'),
  new Category('c8', 'Asian', '#b9ffb0'),
  new Category('c9', 'French', '#ffc7ff'),
  new Category('c10', 'Summer', '#47fced')
];

```
* This is some dummy category data for the categories in this app, in these categories I want to have in this app.
* Now we can importa and use this category

```js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';

const renderGridItem = itemData => {
    return (
        <View style={styles.gridItem}>
            <Text>{itemData.item.title}</Text>
        </View>
    );
};

const CategoriesScreen = props => {
    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2}
        />
    );
};

// Now in new versions of React Native, you also don't need to inform React Native that your ID is not named key but is actually named ID because newer versions of React Native accept ID as an ID on list data as well. If you would follow along in a older version, you would need to add a key extractor here which is a function that gets the item and the index and needs to return the value that should be used as a key,so in this case that would be item.id,

// again newer versions of React Native don't need this but just for reference and for older versions, I'll still add this here.

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    }
});

export default CategoriesScreen;
```
### Configuring the Header with Navigation Options

* On the categories screen, we want to make sure that our item can be touched there, so I will import touchable opacity here to have a slight opacity effect

* Onclick TouchableOpacity We want to go to the category meals screen which is kind of the detail page for a chosen category to show all recipes for that category, we have no recipes yet but I still want to go to the page already.

```js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals'
          });
        }}
      >
        <View>
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

// Now Javascript functions are just objects, that's Javascript, functions are objects and on objects, we can add properties. So categories screen is just a Javascript object, hence we can add a property after creating it.

//So here, after defining our categories screen function and therefore this object, we can access it and we can add a property

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories',

  // Now you also can style the header here with the help of the header style property,

  // You of course might also want a different look for Android and iOS, you might want to look where this looks more iOS-ish which means you don't have a colored background but just a text is colored and you can achieve

this with the good old platform API 
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150
  }
});

export default CategoriesScreen;

```

* The more interesting question is, how we can actually set our header title? Now for that, we get a couple of options 

* let's have a look at option number one. On every React component which you'll load as a screen,Which means what you map to such a screen name in for example the stack navigator, you can add a property.

* You of course might also want a different look for Android and iOS, you might want to look where this looks more iOS-ish which means you don't have a colored background but just a text is colored and you can achieve this with the good old platform API 

### Passing & Reading Params Upon Navigation

* So how can we get information about the category we clicked on, we selected from this category screen to the category meals screen? 

* Well on the categories screen where we navigate to category meals, for this navigation action besides the route name, we can also pass the params.

* That's another key this object you passed to navigate accepts and this takes itself an object of key-value pairs, of any key-value pairs and as many key-value pairs as you want.

```js
const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      >
        <View>
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};
```
* So these are simply parameters, extra data you're passing to the new screen which is being loaded.

* that of course is the important thing here, this allows us to then use that data in that new screen. 

* Now we need to access this param in categoryMeals file .. how can we now get access to it?

```js
import React from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';

const CategoryMealScreen = props => {
  const catId = props.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
// here we show category name inside the screen
  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen!</Text>
      <Text>{selectedCategory.title}</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          props.navigation.navigate({
            routeName: 'MealDetail'
          });
        }}
      />
      <Button
        title="Go Back"
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </View>
  );
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
// here we show category name in navigation header title
// if it is a function, should of course return an object with your navigation options.
  return {
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoryMealScreen;

```
* if we load this , Please note that you also by default get a back button text which is the previous screens title, that's
another default feature React navigation gives you.

* In the place of back button it will show "Meal categories" Note: that depends on navigation title.. if longer title it will show "Back" else "Meal categories".

* What you don't typically want however is that you have to copy the same configuration to every screen because in this app, we don't have that many screens, we can certainly do that but in bigger apps where you have more screens, that would be super annoying and super cumbersome, so it's definitely not the way to go there.

### Default Navigation Options & Config

* setting the same detailed look over and over again is really annoying and definitely not what you want.

* Fist of all lets remove all the platform specific changes from Categories and CategoryMealsScreen

* And now let's go to the meals navigator because besides setting up navigation options right next to your components which is the right place for any options that are specific to that component you can also set up options here directly on the navigator.

```js
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
      // Specific navigation options to that screen
      // navigationOptions: {
      //   headerStyle: {
      //   backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      //   },
      //   headerTintColor:
      //     Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      //   headerTitle: 'A Screen'
      // }
    },
    MealDetail: MealDetailScreen
  },
  {
    // Default global options for all screens.

    //you could specify initial starting  route name
    // initialRouteName: 'MealDetail',     

    // Now typically the defaults are just fine but there for example you can set up the mode and you could set this to modal default as card if you set this you'll get a modal like transition
    // mode: 'modal',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      headerTitle: 'A Screen'
    }
  }
);

export default createAppContainer(MealsNavigator);

```
* If we have specific option and default options, navigation will merge both but always specific wins if we have any option in both.

* So if I would set up a default header title here like a screen which is of course very generic then you would still see meal categories here. Italian here but on the detailed screen where I said no specific header title you would see "a screen"
so your default navigation options are overwritten.

* If we setup both in Meals Navigation and screen.. navigation always wins... than screen.. 

* So with that we had a brief look at some options you can configure and most importantly add navigation options and default navigation options which is super important to build nice looking and efficient applications without repeating yourselves over and over again which you of course don't want

* speaking of efficiency there is one other thing you want to do when working with react navigation

* installed one extra package which is react native screens which an expo apps should be included by default.

```js
npm install --save react-native-screens
```
* But still it doesn't hurt to explicitly install it which allows you to actually ensure that under the hood react navigation uses native optimized screen components provided by Android & IOS.

* on Android it uses the fragment in case you're into Android development and on IOS it uses the UI view controller and that simply improves performance a little bit more.Here in this simple app you won't feel it but it's good practice to use this special package 

* Now to use that you should go to a place that runs before you render your first screen which is App.js 

```js
import { enableScreens } from 'react-native-screens';

enableScreens();
```
* simply called at after your imports before you do anything else. So before you render any JSX

### Grid Styling & Some Refactoring

* Lets create a new component folder under that CategoryGridTile.js

```js
//CategoryGridTile.js
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
} from 'react-native';

const CategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: props.color } }}
        >
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10
  },
  container: {
    flex: 1,
    borderRadius: 10,
    // shadow property only affect IOS
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    // elevation for andorid, shadow won't apply
    elevation: 3,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right'
  }
});

export default CategoryGridTile;

```
* Now we could include this CategoryGridTile component  in our category screen

```js
//CategoryScreen.js
import React from 'react';
import {
  FlatList,
  TouchableOpacity
} from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories'
};

export default CategoriesScreen;
```
### Adding Meal Models & Data

* Now the recipes of course should be rendered on the category meals screen 

* we need recipes for meals as I also call them here and I will start by adding a new model, meal.js

```js
class Meal {
  constructor(
    id,
    categoryIds,
    title,
    affordability,
    complexity,
    imageUrl,
    duration,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.steps = steps;
    this.duration = duration;
    this.complexity = complexity;
    this.affordability = affordability;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
  }
}

export default Meal;
```
* Add data from dummy json

* we're not really interested in the selected category but we're highly interested in the meals that belong to that category.

* Now for that, we can first of all import our meals array because that holds all possible meals we have and now we want to filter out those which actually have the category ID 

```js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';

const CategoryMealScreen = props => {
  // for time being we added simple text a render meal item design
  const renderMealItem = itemData => {
    return (
      <View><Text>{itemData.item.title}</Text></View>
    );
  };

  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default CategoryMealScreen;

```
###  Rendering a Meals List

* To style the separate items, I'll again create a separate component and I'll name it mealitem.js,

```js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

const MealItem = props => {

  //ImageBackground .....
  // numberOfLines={1} means show text in single line for long title show dots....
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
            
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <Text>{props.duration}m</Text>
            <Text>{props.complexity.toUpperCase()}</Text>
            <Text>{props.affordability.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    // to move title to the bottom of the image
    justifyContent: 'flex-end',
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%'
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});

export default MealItem;

```
* Now we could use this MealItem componen inside category Meals Screen.

```js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';

const CategoryMealScreen = props => {
  const renderMealItem = itemData => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {}}
      />
    );
  };

  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default CategoryMealScreen;

```
### Passing Data to the Meal Detail Screen

* Now you know how we can go to the detail page of course, it's something we did before when we went from the categories page to the category meals page.

```js
<MealItem
  title={itemData.item.title}
  image={itemData.item.imageUrl}
  duration={itemData.item.duration}
  complexity={itemData.item.complexity}
  affordability={itemData.item.affordability}
  onSelectMeal={() => {
    props.navigation.navigate({
      routeName: 'MealDetail',
      params: {
        mealId: itemData.item.id
      }
    });
  }}
/>
```
* we already have onpress selecyed Meals in Meal Item component.

```js
 <TouchableOpacity onPress={props.onSelectMeal}>
```

* So on the MealDetailScreen, we should receive this props,

```js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummy-data';

const MealDetailScreen = props => {
  //mealId is the param name
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>{selectedMeal.title}</Text>
      <Button
        title="Go Back to Categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MealDetailScreen;

```
### Adding Header Buttons

* Adding a button to the header as I want it here, such a navigation button, requires a bit of extra work initially but thereafter is very straightforward.

* We have first of all need to install an extra package to make that easier because theoretically, you have a lot of power here.

* You can add such buttons with the help of the navigation options, so here on the MealDetailScreen, beside setting a header title, you can set headerLeft and headerRight to add buttons on the left and the right of the title.

* Typically you want to use right because the left is reserved for the back button

```js
npm install --save react-navigation-header-buttons
```
* which is a package that helps you, surprisingly if you have a look at the name, with setting up some buttons in your header, so in that top toolbar.This is a package which then will make it really easy to add such buttons

* now I'll create a new helper component myself in the components folder which I'll name helper, a header button

* Before that make sure you installed 
```js
npm install --save @expo/vector-icons 
```
* the thing we need to import from that package is ionicons. Of course, you can use any icon set you want refer "https://icons.expo.fyi/"

```js
import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
  return (
    // will first of all receive all ...props we're getting with this nice little trick we can use in React where we forward all props with this shortcut by pulling out all the key-value pairs and passing them to this object which this component in the end

    // So that's the first thing, we need to forward all the props and that's super important,don't forget thisotherwise it will not work correctly.

    // The second step is that we add the Icon component prop with a capital I, that's a prop the header button we're getting from this package expects and there I pass in ionicons

    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
```
* So now we have that preconfigured header button, now we can use that in the place, in the component where we want to add it to our header 

* so from react-navigation-header-buttons, from this package, here we have to install or import header buttons, so not header button which we use in the other file but header buttons, plural. We add this here because now down there where we set up the navigation options for this component, instead of using our text component there, I want to use header buttons,

```js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'; // HeaderButtons, Item -> another component to use between HeaderButtons (plural)

import { MEALS } from '../data/dummy-data';
import CustomHeaderButton from '../components/HeaderButton'; // Helper CustomHeaderButton componentent

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>{selectedMeal.title}</Text>
      <Button
        title="Go Back to Categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  //
  return {
    headerTitle: selectedMeal.title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}> 
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log('Mark as favorite!');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MealDetailScreen;

```
* Important thing here of course is that we have our header button, this icon and this is how you can add buttons or icons items here to your header and of course, you can add more than one. Here in the meal detail screen, you can have multiple such items between the header buttons here which you set up on headerRight on the navigation options. This is how you add items here,

### Fixing the Shadows

* In category screen we applied shadow(ios), elevation(android) but visible .. Why

```css
// CategoryGridTile
gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden' // becaus of this overflow hidden 
  }
container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
```
* if I remove that here, then we have the shadow back and it makes sense that we get it because with overflow hidden, we basically say the grid item which is this view around everything else here, that basically defines what we can see, the shape of this defines what we can see and this simply crops the shadow as well and that's of course something I don't necessarily want here.

* Now of course, overflow hidden is important though to make sure that the ripple effect works correctly

* and the solution therefore is very simple, we can move our elevation here onto this grid item view, which is this extra view we added to restrict the ripple effect

```js
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3 // we moved elevation here
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right'
  }
});
```
* What we can instead do is, we can leverage the platform and make sure that we only set overflow hidden if we're on Android because we really only need it there, we really only need it there to crop this shape for the ripple effect.

```js
gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
    elevation: 3
  }
```
### Adding Tabs-based Navigation

* So now we work with navigation quite a bit we're able to move forward and backward. You learn how to add icons and action buttons here to this header how to style and control the header in general how to pass data around and these are all crucial things for mobile apps you are building with React Native Of course these are things you'll do over and over again when working with React Native to build apps.

* Now this is not the only form of navigation we can implement though we can also at taps at the bottom

* I want to have two taps in his app one for all our meals or in this case all our categories and one for just our favorite meals the meals we marked as a favorite.

* Let's go to our meals navigator James file which is where we set up navigation and there we created a stack navigator.You need a stack navigator whenever you have screens pages in your app that are connected with such a forward backward flow.That's the typical stack navigation. What we're using here it of course will still need that even if we now all the add taps.

* The good thing is you can simply have multiple navigators in your application and that's exactly well

```js
import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator, // we imported this for tab navigator 
  createAppContainer
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      headerTitle: 'A Screen'
    }
  }
);

/* createBottomTabNavigator starts here*/
// So create bottom tab navigator it is and we can simply create that additional navigator next to our meals navigator let's say

// Now how do we configure that tab navigator then just like the stack navigator the tab navigator all the takes the object where we have to inform it about the different taps so to say the different sections to different screens you want to load when we click to different taps

// the good thing is you can use a stack or any other Navigator as a screen in this Navigator.



const MealsFavTabNavigator = createBottomTabNavigator(
  {
    //Meals here will be showed as label in mobile below the icon
    Meals: {
      screen: MealsNavigator, // MealsNavigator we want to load  Let's maybe name it meals.
      // We could add these navigationOptions in your Meals component too just as we did before..
      // navigationOptions in the config of the navigator only matters if the navigators used inside of another navigator

      //  on this object you pass as a second argument to create stack navigator where you configure the overall navigator to give this navigator itself some navigation options because the navigation options we assign to the meals navigator, so to the stack navigator are now the options which are taken into account by the tab navigator which uses this meals navigator as a nested navigator and the navigation options we can set here include a tab bar icon.
      navigationOptions: {
        //icon and color fir tab menu
        tabBarIcon: tabInfo => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        }
      }
    },
    //Favorites here will be showed as label in mobile below the icon
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        tabBarLabel: 'Favorites!',// tabBarLabel will overwritten the above mentioned default label here we have ! mark
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        }
      }
    }
  },
  {
// one of the more important settings here are the tab bar options. This is another object and in there, you can in detail control how the tab bar appears, how it's styled. You can set up an inactive tint color which is the color the tab has which is currently not active. You can set up an active tint color and that's what we actually need here, you can set up an active background color and an inactive background color as well of course to also change the background of the tabs here if you want to and therefore you have a lot of possibilities to really fine tune this to your requirements.
    tabBarOptions: {
      activeTintColor: Colors.accentColor
    }
  }
);

export default createAppContainer(MealsFavTabNavigator); // finially in the end we want to load this hold both stack and tap navigations
```
### navigationOptions inside of a Navigator

* When defining a navigator, you can also add navigationOptions to it:
```js
const SomeNavigator = createStackNavigator({
    ScreenIdentifier: SomeScreen
}, {
    navigationOptions: {
        // You can set options here!
        // Please note: This is NOT defaultNavigationOptions!
    }
});
```
* Don't mistake this for the defaultNavigationOptions which you could also set there (i.e. in the second argument you pass to createWhateverNavigator()).

* The navigationOptions you set on the navigator will NOT be used in its screens! That's the difference to defaultNavigationOptions - those option WILL be merged with the screens.

* So what's the use of navigationOptions in that place then?

* The options become important once you use the navigator itself as a screen in some other navigator - for example if you use some stack navigator (created via createStackNavigator()) in a tab navigator (e.g. created via createBottomTabNavigator()).

* In such a case, the navigationOptions configure the "nested navigator" (which is used as a screen) for that "parent navigator". For example, you can use navigationOptions on the nested navigator that's used in a tab navigator to configure the tab icons.

### Adding MaterialBottomTabs

* let's work on the tabs a bit more because right now, we have tabs on Android that don't really look like we would expect Android tabs to look like, this looks more like iOS tabs if you ask me.

* we have a separate navigator we can create, though we have to install an extra package for this first of all, so let's do that

```js
npm install --save react-navigation-material-bottom-tabs
```
* by the way there also is react-navigation-material-top-tabs,we will see that later Refer : https://reactnavigation.org/docs/material-top-tab-navigator/

* So let's wait for that installation to finish and thereafter, let's install one other package which we'll also need

```js
npm install --save react-native-paper
```
* Then we have to import bottom tabs navigator Item

```js
import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'; // Imported material-bottom-tabs

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      headerTitle: 'A Screen'
    }
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor // this color will apply when you change tab
    }
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor // this color will apply when you change tab
    }
  }
};
// Based on the platform specific we could apply either of the tabs
// There are some details you can configure on the tab navigator itself, so for example which color to assume, when and so on that differs but regarding how you set up your tabs and match screens and set up icons, that's exactly the same

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, { // tabScreenConfig is previous old config in new constant with that we are adding below specific config.
        activeColor: 'white', // for material its activeColor not activeTintColor!!
        shifting: true, // this shifting effect , that the label only exists on the tab which is active
        barStyle: {
          backgroundColor: Colors.primaryColor // this color will apply always applied to tabs even if shifting false ..
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor
        }
      });

export default createAppContainer(MealsFavTabNavigator);

```
### Adding a Favorites Stack

* favorites tab is not a single screen but another stack, a stack for our favorites feature in this application, that's what we need here,this will then by the way also give us a header which we're currently also missing. Of course, that's not too hard to implement,

* we can simply create another stack navigator above our tabScreenConfig maybe

```js
import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);
// Here we created new favorite navigator stack
const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavNavigator, // we called above created FavNavigator instead of favorite screen, so inside favorite cscreen we called FavNavigator stack
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor
        }
      });

export default createAppContainer(MealsFavTabNavigator);

```

* Now to display favorite screen details

* So for now, I just want to display some dummy meals here, let's say the meals with the ID M1 and M2, simply two dummy meals and for that, we can go to the favorite screen and instead of displaying this view here, in the end I want to display the same as in the category meals screen, right, I want to render a FlatList which then renders my meal items here.The only difference is which meals I render, that logic will not be the same because that's different for my favorite screen. This however will be the same and since I will reuse that list creation logic and the only thing that differs is the data which I render, it would make sense to outsource this list into a separate component, so that we can reuse the component in the category meals screen and in the favorites screen.

```jsx
// MealList Component
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import MealItem from './MealItem';

const MealList = props => {
  const renderMealItem = itemData => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          // meal list will not have access to props navigation, only the directly loaded component has access
          props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id
            }
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default MealList;

```
* Now we can use this component in category meals and Favorite screens
```jsx
//CategoryMeals Screens
import React from 'react';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = props => {
  
  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  return <MealList listData={displayedMeals} navigation={props.navigation} />; // we should pass navigation prop because the navigation prop is only available in components that are loaded
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

export default CategoryMealScreen;

```
* In favorite screens also 

```jsx
//favorite screens !!
import React from 'react';

import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';

const FavoritesScreen = props => {
  const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');
  return <MealList listData={favMeals} navigation={props.navigation} />; // we should pass navigation prop because the navigation prop is only available in components that are loaded
};

FavoritesScreen.navigationOptions = {
  headerTitle: 'Your Favorites'
};

export default FavoritesScreen;

```
* So these two stacks work separate from each other, totally independent and that's how it should be and this is how we can reuse some logic and how we can have different stacks merged into one and the same tab navigator

### Adding a Menu Button & Drawer Navigation

* So let's add this last main navigation pattern you see in mobile apps and that's having a side drawer,you can import create draw and Navigator which does just what it sounds like. It makes it easy for us to create this draw based navigation pattern and it gives us such a draw and all the functionality we need to control the straw out of the box which is of course very convenient.

```jsx
import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor
        }
      });

// FiltersNavigator using StackNavigator so we also have headers here..
const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen // Filters is label name
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters!!!!'
    // },
    defaultNavigationOptions: defaultStackNavOptions
  }
);

// Side Drawer Navigation 
// This will be our main Navigator which combile above stack and tab navigator, so the stack-> tab-> drawer => exported container 
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {  // MealsFavs is default label name
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals' // MealsFavs is updated label name
      }
    },
    Filters: FiltersNavigator // Filters is label name
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);

export default createAppContainer(MainNavigator);

```
* Since you added StackNavigator make sure you added navigation options in filter screen

* the draw navigator would manage all logic for opening it ends on the thing it does not do for us automatically is show a menu icon so it doesn't show a hamburger button for us.

* And of course that would be the category screen because that's the root screen for the meals tab and the favorite screen because that's the root screen for his favorites tab. So in these two screens I want to add that menu icon and I add it in my navigation options as you learned

```js
// FiltersScreen
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const FiltersScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Filters Screen!</Text>
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter Meals',
    // the draw navigator would manage all logic for opening it ends on the thing it does not do for us automatically is show a menu icon so it doesn't show a hamburger button for us.

    // How do we now opened a draw though well for this we need access to the navigation prop and we don't have that access in the navigation options like this. But of course we learned earlier that you can use the function form here where you then get your navData.

    headerLeft: ( 
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FiltersScreen;

```
* same for category screen also

```jsx
CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};
```
### More Navigation Config & Styling

```js
const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold' 
  },
  headerBackTitleStyle: { // Back button title text
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen'
};
```
* In Tab Navigator also we could apply styles 

```js
const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: // here we applied android custom font style
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
        ) : (
          'Meals'
        )
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: // here we applied android custom font style
        Platform.OS === 'android' ? (
          <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
        ) : (
          'Favorites'
        )
    }
  }
};
```
### Adding a DefaultText Component
* Lets create a new component default Text 

```js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = props => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans'
  }
});

export default DefaultText;
```
* We can import and use this in our mealIteam component

```js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import DefaultText from './DefaultText';

const MealItem = props => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <DefaultText>{props.duration}m</DefaultText>
            <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%'
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});

export default MealItem;
```
###  Adding the MealDetail Screen Content

```js
import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      // ***  selectedMeal.ingredients is array
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log('Mark as favorite!');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;

```
### Time for the "Filters" Screen Content! and Passing Data Between Component & Navigation Options (Header)


```js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

// and now, we can make sure that this switch actually works and that it doesn't jump back when we trigger it. For that, you need to know that for switches, you manually need to manage their state and that's actually not new, in React it's often the case that for these input components, you need to store what the user enters and feed that back into the component to reflect that in the updated UI and we do this with state management.

const FilterSwitch = props => {
  //React Native's Switch component
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
        value={props.state}
        onValueChange={props.onChange} // onValueChange call
      />
    </View>
  );
};

const FiltersScreen = props => {

  // props also is a dependency. Now actually to avoid unnecessary re-renders whenever anything in the param component changes, I'll use a different way of extracting my navigation prop, I'll use destructuring here, like this, navigation

  // This is a syntax which uses object destructuring which means props is an object and this pulls out the navigation key and stores this in a brand new constant of the same name, so of the same navigation. It stores the value in the navigation prop in that navigation constant now, that's what the syntax does and the advantages that we now have a navigation constant here which we can use in use effect without props because we have this stored in a separate constant now and now we can add this as a dependency which means when this changes, this wil rebuildbut if anything else in the props changes, this will not unnecessarily rerun the effect.

  const { navigation } = props;
  // So we import to use state hook from React so that we can manage state here in this functional component
  const [isGlutenFree, setIsGlutenFree] = useState(false); // initial state
  const [isLactoseFree, setIsLactoseFree] = useState(false);// initial state
  const [isVegan, setIsVegan] = useState(false);// initial state
  const [isVegetarian, setIsVegetarian] = useState(false);// initial state
  // communicating between your navigation options and your component.So in the navigation options, you need information about data that changed in your component.

  //Now to make sure that save filters only updates when our state changes, we can import the use callback hook from React, another hook built into React and this allows us to wrap a function so that this function is actually cached by React and is only recreated if its dependencies changed.
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      isVegetarian: isVegetarian
    };

    console.log(appliedFilters);
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

   // I would like to give access to this function which is part of my component to my navigation options so that I can trigger this function from inside the navigation options and for this, we can use params.

  //Let's add useEffect so that we have a way of executing code whenever our state changes because that's when I want to forward this updated function which basically captures my current state to my navigation options.


  //use effect right now runs whenever this component updates. In the end, it should only run when save filters hold a new value.So I'll add the second argument "[saveFilters]" to use effect which is this array of dependencies and there, save filters,

  useEffect(() => {
    // We haven't used set params before, we only worked with get param. We didn't use set params because before we only set params when we navigated to a new screen,we can use set params to update the params values for the currently loaded screen.
    // Site Note : If you had existing params,you would still use setParam(), your new param get merged with existing params.

    //  I don't execute the function, I don't add parentheses, I just point at it, I just use this variable which holds a pointer at this function in the end and forward this value, so forward this pointer or store this pointer to that function in that save key, in that object which I now set as params in this screen, in the filters screen

    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)} // Onchange set state
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)} // Onchange set state
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={newValue => setIsVegan(newValue)} // Onchange set state
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)} // Onchange set state
      />
    </View>
  );
};

//headerLeft and headerRight button
FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          // communicating between your navigation options and your component.So in the navigation options, you need information about data that changed in your component.

          //I can retrieve that save parameter which I'm setting in useEffect
          // so this calls save -> saveFilters (which gets already updated whenever state changes with the help of useEffect)
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15
  }
});

export default FiltersScreen;

```

### [React Refresher] useEffect() & useCallback()

* useEffect(): https://reactjs.org/docs/hooks-reference.html#useeffect

* useCallback(): https://reactjs.org/docs/hooks-reference.html#usecallback

#### useEffect()

* useEffect() is a so called React Hook (learn more) which allows you to handle side effects in your functional (!) React components.

* You can use it to do anything that doesn't directly impact your UI/ JSX code (it might eventually impact it, for example if you're fetching data from some server, but for the current render cycle, it will not).

* useEffect() allows you to register a function which executes AFTER the current render cycle.

* In the previous lecture, we use that to set new navigation params for this screen (= for this component).

* useEffect() runs after every render cycle (i.e. whenever your functional component re-runs/ re-renders), unless you pass a second argument to useEffect(): An array of dependencies of the effect.

* With such a dependency array provided, useEffect() will only re-run the function you passed as a first argument, whenever one of the dependencies changed.

#### useCallback()

* useCallback() often is used in conjunction with useEffect() because it allows you to prevent the re-creation of a function. For this, it's important to understand that functions are just objects in JavaScript.

* Therefore, if you have a function (A) inside of a function (B), the inner function (=A) will be recreated (i.e. a brand-new object is created) whenever the outer function (B) runs.

* That means that in a functional component, any function you define inside of it is re-created whenever the component rebuilds.

```js
const MyComponent = props => {
    const innerFunction = () => {
        // a function in a function!
        // this function object (stored in the 'innerFunction' constant) is constantly re-built
        // to be precise: It's re-built when MyComponent is re-built 
        // MyComponent is re-built whenever its 'props' or 'state' changes
    };
};
```
* Normally, it's no problem, that innerFunction is re-created for every render cycle.

* But it becomes a problem if innerFunction is a dependency of useEffect():

```js
const MyComponent = props => {
    const innerFunction = () => {
        // do something!
    };
 
    useEffect(() => {
        innerFunction();
        // The effect calls innerFunction, hence it should declare it as a dependency
        // Otherwise, if something about innerFunction changes (e.g. the data it uses), the effect would run the outdated version of innerFunction
    }, [innerFunction]);
};
```
* Why is this code problematic?

* The effect re-runs whenever innerFunction changes. As stated, it is re-created whenever MyComponent re-builds.

* Because functions are objects and objects are reference types (see: https://academind.com/learn/javascript/reference-vs-primitive-values/), that means that the effect will re-run for every render cycle.

* That might still not be a huge problem but it definitely is, if innerFunction does something that causes MyComponent to re-build (i.e. if it either does something that changes the props or the state).

* Now, you would have an infinite loop!, useCallback() helps you prevent this.

* By wrapping it around a function declaration and defining the dependencies of the function, it ensures that the function is only re-created if its dependencies changed.

* Hence the function is NOT re-built on every render cycle anymore => You break out of the infinite loop!