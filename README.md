# react-native-complete

## State Management & Redux

###  What is State & What is Redux?

* State can be complex and it's important to understand which problems state management solutions like Redux actually solve.

* If we had an app like have two different areas, one where you manage your users, where users can sign in, where users can manage their dashboard, see their dashboard and so on 

* and one where you have products in a list which users can add to a cart, then these areas are actually not totally independent but in your app, they will be rendered on different screens, so pretty separated from each other.

* But the question whether a user is signed in which you need here might also be relevant in another part of your application and right now, you normally would have to pass that data around manually through props by passing it from component A to B to C to D all the way up to E where you then maybe need this, that's not really very convenient.

* Instead you want to have an application setup where something changes, for example a user signs in or in our meals app, you set a certain filter and you save that and then this information is kind of propagated to your app and automatically passed to the places where you need it but not through props but with some behind the scenes mechanism that helps you regarding this and that's where Redux is a common solution we use in React and React Native apps to manage that state.

* Now how does Redux work?

* First of all Redux is a third-party library which you can add to React Native to use it there and it's all about having a central store.

* Redux introduces a central store in memory, not a database but it's in memory, in Javascript memory so to say where your application state, so the data different parts of your app depend on can be stored in 

* and then when in one component, you have something that wants to manipulate that state, for example we're setting a filter or we're marking a meal as a favorite,we then dispatch a so-called "Action", that's a pre-defined information package you would say, having a certain schema which can be handled by Redux as configured by you. COMPONENT --DISPATCH--> ACTION

* This action reaches a so-called reducer and you will be the one writing that reducer as a developer, so you can control which kind of action a reducer accepts, so which kind of information package your reducer requires and that reducer then receives the action and derives a new state based on the old state which then updates this centrally stored state.COMPONENT --DISPATCH--> ACTION --REACHES--> REDUCERS --UPDATES--> CENTRAL STORE

* So the reducer is there to update the state in the end.

* And when that store changes, when the state in there changes, you can also have subscriptions to that store from other components, these subscriptions will be triggered when your store, when your state there changes and the updated state is then passed on to the places in your app, so to the components who are interested in these changes, COMPONENT --DISPATCH--> ACTION --REACHES--> REDUCERS --UPDATES--> CENTRAL STORE --(Automatic)TRIGGERS--> SUBSCRIPTION --PASSES UPDATES STATES AS PROPS--> COMPONENT.

* Componet will be informed about the update and get the new state through its props or also with React hooks as you will learn in this module. This is how Redux works and that's the idea behind Redux.(Refer image Redux1)

* Now one important note, if you're a bit further into React, you also probably know the React Context API which is built into React.

* This can also be used for some behind the scenes state and data management but it's not a good replacement for all use cases where you use Redux.

* Redux Vs Context API - https://academind.com/learn/react/redux-vs-context-api/

### Redux & Store Setup

```js
npm install --save redux react-redux
```
* After install redux lets create a new store (any name redux doesn't care) folder, but this is the folder where I want to manage my Redux setup in because Redux is all about that central state store.

* Redux in the end is all about reducers, actions and then building a store based on these reducers and actions.

* Now for that here in that store folder, I'll add an actions folder and I'll add a reducers folder, actually we'll only have one action and one reducer file in this project but if you had more files than that, having separate subfolders might be a good idea to keep it organized and that's why I create them here, even though for this simple app, we wouldn't need that because we won't have that many files.

* Let's get started with the reducer. In the reducer folder here, I'll add my meals.js file and that's the file where I went to manage my meals reducer state updating logic.

* So that's in the end the file where we will write the logic for marking a meal as a favorite and for managing our filters.

```js
//store/reducer/meals.js
import { MEALS } from '../../data/dummy-data';

//initialState which initializes our state when this app launches

// we'll get started with that initial state, so that will then automatically load our initial state so to say because when Redux gets started and starts up, there will be one initial action dispatched which is used to run through the reducer once and that will then load our initial state.

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};
//  the state, the current state snapshot on which you can build up on and derive a new state because a reducer in the end will have to return a new state which is then taken by Redux and stored in its store.

const mealsReducer = (state = initialState, action) => {
  //  because the reducer function here is executed by Redux whenever a new action is dispatched and therefore we get access to the action here so that we can find out if we need to act and what we need to do.
    return state;
}

export default mealsReducer;
```
* now in app.js which is the file where our entire app starts, we need to setup our Redux store. 

```js
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useScreens } from 'react-native-screens';
//here we import createStore and combineReducers from Redux.
import { createStore, combineReducers } from 'redux'; 
// To provide store to our component we need react-redux
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';

useScreens();

//  you might have more than one reducer because you often have reducers for the different feature areas of your app you need to merge all these single reducers, these different reducers into one root reducer and that's what the combined reducers function does,

const rootReducer = combineReducers({
  meals: mealsReducer // here we connected mealsReducer with meals key
});

//Create store takes a root reducer in the end which you need to pass in.
const store = createStore(rootReducer); 

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
  //  We then wrap provider around our root app component in the end, so around the topmost component which holds all other components
  //  now provider takes one important property, one prop which you have to pass and that's the store prop and of course there, as a value we pass our store here.
  return (
    <Provider store={store}>  
      <MealsNavigator />
    </Provider>
  );
}
```
### Selecting State Slices

* How can we use our store?

* So one great task would be to go everywhere in our app where we are importing meals from the dummy data and get rid of that import and instead, get the data out of our store because the difference will be that we can later add logic to change the data in our store whereas our dummy data will never change. So we should import data from our store, so that we can thereafter add logic to manipulate that data,

* The category meals screen is a different story, there we are importing meals and now the goal is to get rid of that import and get the meals out of the Redux store and the question of course is, how do we do this?

* Again, the React Redux package helps us with that. 

```js
import React from 'react';

// Now I'm using the hook here because that allows us to use this in a functional component, you also might be aware of another approach where you actually import the connect function and wrap your export with that and use map state to props, map dispatch to props, that's something you can use as well, it will absolutely work but this is a bit leaner,so I'll go with use selector here.

import { useSelector } from 'react-redux'; //This allows us to select a slice of our state, of our globally managed state and use it in this component.

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = props => {
  
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector(state => state.meals.filteredMeals); //useSelector will retrieve me data out of the state and return it,

  // A function that gets the state as an argument automatically, React Redux which executes the function for us will provide the current state, the current Redux state to this function and it then is able to return any data we want from that state, from that global store

  // use selector takes a function, a function that will be executed for us by React Redux.

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
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

* In favorite screen

```js
import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';

const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals); // state from redux

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favorites',
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

export default FavoritesScreen;

```
###  Redux Data & Navigation Options

* How can we solve that problem that we here need to find a specific meal and we can't really use our useselector here in the navigation options? (MealDetailScreen)

* Now there are two possible fixes - fix number one is that we again use the good old params to communicate between component and navigation options as we already saw in the navigation module

```js
// Option 1 - Set param to navigation to using useEffect
import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
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
  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  // We can't use useSelector in navigationOptions, 
  useEffect(() => {
    // Now this means that I sent these params to my header when this component renders in the end.
    // Now since this will change props, we would typically end up in an infinite loop, so to break this, we'll use useEffect here
    props.navigation.setParams({ mealTitle: selectedMeal.title });
  }, [selectedMeal]); 
  // when selectedMeal changes i want to forward the new information to the header.

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
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
  const mealTitle = navigationData.navigation.getParam('mealTitle'); // Get title which is set above

  return {
    headerTitle: mealTitle, // we can set headerTitle like this 
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
* Let's save this and go to the detail page and whilst this works, you'll see a problem. When this loads, initially there is no title and this only pops in after a while. So only after this is fully loaded, we see that title pop in which isn't too beautiful and the reason for that simply is that our logic here works but since use effect runs after the component has been rendered for the first time, we wait for the component to render for the first time until we send the params to the title and that means that when this transition is still playing and the rendering hasn't been fully finished, we're not really showing that title.

* A better solution is that you simply forward the title which we'll need here from inside the component you're coming from, so that you load it when you are in the component that will go to this component and you send it to this component before it's loaded.

* So let's send the data in advance and we're coming from either the favorites screen or the category meal screen.

* There, we're in the end tapping an item in the meal list and in both items, in both components, favorite screen and category meal screen, we are using meal list which is good because that means we can go to meal list here and there, we have this navigate action and now simply besides passing the meal ID, it would be good if we here already pass the meal title 
```js
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
          props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title, // here By simply supplying it here, we solve all the problems we have on the other screen, so that's definitely the approach we want to use here.
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
* Since we are forwarding title from here we can comment off the useEffect in mealDetail screen
```js
import React, { useEffect } from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

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
  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  // useEffect(() => {
  //   props.navigation.setParams({ mealTitle: selectedMeal.title });
  // }, [selectedMeal]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
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
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: mealTitle, // Now we are getting it from mealDetail component
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
* So by setting that param here on the component where we trigger that navigation action to the meal detail page, we fixed this issue because now you see the title is there right from the start and we have no problem at all

### Dispatching Actions & Reducer Logic

* I want to make sure that when I'm in a recipe, I can click that star and that adds this as a favorite and shows it here in the favorite screen 

* in actions and meals.js in reducers and in the actions meals.js file, I will set up some Redux actions

```js
//actions 
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = (id) => {
    return { type: TOGGLE_FAVORITE, mealId: id };
};
```
* Now in the reducer, I want to act when I get such a toggle favorite action and for this, I'll use a pattern which you probably have seen if you worked with Redux before, I'll use a switch statement here and switch on my action type because keep in mind that action will be an object with a type property which identifies the action that occurred. So I switch on that action type and then I handle different cases for the different actions I might have.

```js
import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE } from '../actions/meals'; // here we imported TOGGLE_FAVORITE from actions  that's why I'm storing this in the separate constant because now I don't have to manually type toggle favorites where I might have a typo in there

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId // here we are comparing the meal id from actions
      );
      if (existingIndex >= 0) { // if that meal is already part of favorite meals, if yes I want to remove it, 
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) }; // if it's not, I want to add it.
      }
    default: // default state will initialised when app starts and the redux store is initialised
      return state;
  }
};

export default mealsReducer;
```
* Now we need to make sure that we actually dispatch this action whenever we click that star icon in our header.To dispatch the action, let's go to the meal detail screen because that's where we have our star icon 

```js
import React, { useEffect, useCallback } from 'react'; // to avoid infinite loops, I'll again use use callback 
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux'; // useDispatch which in the end gives us an easy way of firing a function.

// The bad news is that this of course can only be used in the component body here, in our functional component and not in the navigation options.

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch(); // I'll simply start by calling use dispatch and what this does is it gives us a dispatch function, a function we can call to dispatch new actions 

  const toggleFavoriteHandler = useCallback(() => {
    // which is a function which in the end should dispatch this action. So here I want to call dispatch 
    // now to dispatch, I need to forward the action which I want to dispatch and for this, I'll use this action creator toggle favorite here.
    dispatch(toggleFavorite(mealId)); // now here we need to forward the ID and that of course is the mealId which we're already extracting up there
  }, [dispatch, mealId]); // here we specified dependency for useCallback

  // Now we can reactivate use effect to communicate to our header, not with this line though but instead with props navigation set params 
  useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavoriteHandler}); // here we setParams toggleFav to navigation
  }, [toggleFavoriteHandler]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
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
  // const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav'); // here we are getting the params set in above useEffect function
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={toggleFavorite}
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
### Switching the Favorites Icon

* Let's start by changing that star icon based on whether this currently is a favorite or not, I want to have that filled star only if it is a favorite and an empty star if it's not.

* So in the end in the meal detail screen, we need to swap that icon based on the favorite status of this meal we loaded

* problem here is we can find out whether that meal is a favorite or not in a very easy way in the component function but not really in the navigation options.So again, we'll need params to communicate between these two but overall, that's not too difficult.

```js
import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {
  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  
  const currentMealIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId) // I simply want to check if that meal is part of the favorite meals, 
    // we call some which is also a built-in method which returns true if the condition which we're about to specify is true for at least one item in that array and there, I check for every meal that's in there, if the meal ID is equal to the meal ID I retrieve here and hence I have to swap lines.
  );

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    // props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite }); // Now we need to pass currentMealIsFavorite flag to navigationOption
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
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
  // const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav'); // here we receive isFavorite we set at the top
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} //  based on the flag we show icon here
          onPress={toggleFavorite}
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
* here its taking some time to load the icon status ... We don't want to wait for the first render to finish, instead we should pass this initial data into this component when we navigate to it.

* Hence it's time for the meal list again where we have this navigation action to also forward this is fav key already, so this key which I tried to extract here in the meal detail screen down there, get param is fav. I want to pass the current value when we load this component, when we load this screen here from inside the meal list which is the component which triggers that navigation to meal detail

```js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from './MealItem';

const MealList = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals); //get favoriteMeals from state

  const renderMealItem = itemData => {
    const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
    return (
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
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: isFavorite 
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
### Rendering a Fallback Text

* where I say no favorite meals found, start adding some and now let's actually be clear about the casing here. So that's the text I could render as a fallback.

```js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);
  // fallback text if no data found
  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    );
  }

  return <MealList listData={favMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favorites',
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavoritesScreen;

```
### Adding Filtering Logic

* now it's time to make sure that we actually filter our recipes because keep in mind in category meals screen, we're actually retrieving our filtered meals from our state and right now of course in our state, that filtered meals property always holds all meals and never changes and that's something I want to change as a next step.

```js
// actions
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS'; // setFilters

export const toggleFavorite = (id) => {
    return { type: TOGGLE_FAVORITE, mealId: id };
};

export const setFilters = filterSettings => {
    return { type: SET_FILTERS, filters: filterSettings };
};
```
* what shall we do in the reducer? In the reducer, we now need to handle that new case, so here before default, I'll add the case where I handle set filters

```js
import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals'; // we need to import SET_FILTERS identifiers

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter(meal => { // here we apply javascript filter method with appliedFIlter
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true; // I return true which means I want to keep that meal in my filtered meals constant, which is my new array
      });
      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;

```
### Dispatching Filter Actions

* We want to dispatch this action on the filters screen of course because that is where we do set all these filters.

```js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux'; //to useDispatch first of all import dispatch hook

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals'; // import setFilters actions

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = props => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch(); // useDispatch hook

  const saveFilters = useCallback(() => {
    const appliedFilters = { // Keys which we used here should match with the reducers
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    };

    dispatch(setFilters(appliedFilters)); // we are dispatching the filter action on click save
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]); // useCallback dependency to avoid infinite loop

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={newValue => setIsVegetarian(newValue)}
      />
    </View>
  );
};

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
* Now it would be nice to have a nice little fallback message here if we have no data because of our filters and therefore in the category meals screen, I also want to check here if displayed meals length is zero, which means I have no meals to display and then I want to return a view here with my default text in there actually and that means we need to import both,
we need to import a view and we'll also need the stylesheet from React Native and import the default text component from components default text and then add a style 

### Debugging Redux in React Native Apps

* You can debug Redux in React Native apps with help of the React Native Debugger

* tool: https://github.com/jhen0409/react-native-debugger/blob/master/docs/redux-devtools-integration.md

* 1) Make sure you got the React Native Debugger installed (https://github.com/jhen0409/react-native-debugger)

* 2) Enable JS Debugging in the running app (open development overlay via CTRL + M / CMD + M on Android devices, CMD + D on iOS devices)

* 3) Install the redux-devtools-extension package via npm install --save-dev redux-devtools-extension (https://www.npmjs.com/package/redux-devtools-extension)

* 4) Enable Redux debugging in your code:

```js
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
 
const store = createStore(reducer, composeWithDevTools());
```
* !!!! Important: Make sure you remove this code when building your app for production!