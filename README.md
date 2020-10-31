## Updating to React Navigation 5+

### Intro

* The important thing is with the release of React navigation 5 so off we're in 5 of this third party library the way we set up navigation in react apps and React Native apps I should say changed.

### What Changed between V3 and V4?

* In older versions of React Navigation we have this (Refer image : V5+) way of setting up routes aware of setting up screens we could go to we set up such a registry like configuration in a file where we basically mapped our different screens to identifiers and then we could work with these identifiers from anywhere in the application to go to a specific screen.

* Now when it came to configuring these different screens we could do that directly in the screen component or also globally on the stack Navigator for example with the default navigation options.Now this approach of navigating around works just fine and there isn't necessarily something wrong with it though we also had some occasions where we definitely saw that it could be tricky at times right if you wanted to update header buttons in the header of a component dynamically.You had to abuse params to do that and that was not ideal and definitely a bit tricky to wrap your head around.Nonetheless you can definitely use react navigation v3 and V4 

* and V5 things changed a bit. we now set up roots and we navigate around a bit differently 

* now there basically is one super big change between Version 4 and 5 , We now don't set up our different round so where our different screen name mappings in this registry like way we see on the left (Refer image : V5+). But now instead we set everything up as a component tree.

* You could say so now we have a component based configuration of our different routes. We can go to all of our different parts of the app we can go to 

* this certainly is a big change and a big mental models which we have to make because we set up our navigation configuration in a totally different way now it offers some nice advantages as you will see it's actually closer to the react way of building apps 

* where you basically want to use components everywhere to express what the result should look like and you then let react figure out a way to get there.And if we set up our screen configuration in such a component based way then we actually justifying our end result and we let react and react navigation figure out the way to get there.

* So that's actually a good mental model to have.

* However there still is one thing I want to say react navigation this package with the turns V3 and V4 is still super important of course react navigation version 5 and so on is the future of React navigation but the vast majority of project you will find out there of React Native projects will use react navigation in v3 and v4 so you have to know those words as well

### Prepare Project

* the first thing I'll actually do is I will run Expo upgrades to install the latest version of the Expo toolkit and make sure that Expo also updates everything in the way it needs to be updated so that it installs all packages it needs and so on.

```jsnv
expo upgrade
```
* and then install "npm install" then run "expo start"

### More Information & Updating the Project Dependencies

* Refer : https://reactnavigation.org/docs/upgrading-from-4.x

* You also find a link to an upgrade document in there and upgrading guide which gives you detailed steps on how to migrate your react navigation for application to react navigation 5.

* What we will do now is we will install react navigation 5. Install the required packages in your React Native project:

```js
npm install --save @react-navigation/native
```

* This is new by the way. Prior to work and 5 the package name was just react navigation not at react navigation slash something. So now let's installed this new package here.

* Installing dependencies into an Expo managed project

```js
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```
* And once this is done we should be able to restart this application with NPM start,then again launch it on Android and Iow to see the updated application dear. Now what you'll see now is that it's broken. It's not working anymore.Just because we installed these new packages and now it's time to migrate our set up to this new component based setup.

### Moving from the "Registry-like" to the "Component-based" Navigation Config

* The majority of our files don't need to change. What we will need to change though is what's happening in the navigation files and the navigation folder in app J.S. 

* you might remember rendering the navigation container here and the navigation container is just a custom component.

```js
// app.js old version 4!!!!!!!!!!!!!!!!!!!!!!!
import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
```
* Old NavigationContainer!!! here where we in the end have our logic for checking whether the user is authenticated and then we render a shop Navigator which is our route navigator created here with react navigation and that is where things have to change now.

```js
// Old Verion 4+ NavigationContainer
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ShopNavigator from './ShopNavigator';

const NavigationContainer = props => {
    const navRef = useRef();
    const isAuth = useSelector(state => !!state.auth.token);

    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(
                NavigationActions.navigate({ routeName: 'Auth' })
            );
        }
    }, [isAuth]);

    return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
```

* Now let's start with the navigation container.

```js
import React from 'react'; // we don't need { useEffect, useRef } hooks here
import { useSelector } from 'react-redux';
// import { NavigationActions } from 'react-navigation'; this is also not need anymore

import ShopNavigator from './ShopNavigator';

const NavigationContainer = props => {
    // const navRef = useRef();
    const isAuth = useSelector(state => !!state.auth.token);

    // We won't need this code here anymore where we manually navigate somewhere else if the user is authenticated
    //because you will see later that this will now be handled differently with this component based configuration so you can delete useEffect

    // useEffect(() => {
    //     if (!isAuth) {
    //         navRef.current.dispatch(
    //             NavigationActions.navigate({ routeName: 'Auth' })
    //         );
    //     }
    // }, [isAuth]);

    return <ShopNavigator />; // here we removed ref={navRef}
};

export default NavigationContainer;
```

* So we just have the shop navigator left and that's also not really something we need here anymore. We're not adding a shop Navigator as a component like this where we then refer to the overall configuration from the shop navigator file because that overall configuration is of course all set up with that old logic of having that global registry like configuration which is simply not working anymore with react navigation 5.

* Instead we now need to migrate all of that to the new approach and to do that. to this component based approach I want to start quite simple in the navigation container. I will setup a new stack Navigator which is just a dummy Navigator for now.

* So did you see how it generally works before we then later will actually well apply this to our real application for that.

```js
import React from 'react'; 
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; // lets import NavigationContainer

// Now that can be confusing because our own component here is all the named navigation container.

// So to avoid confusion here I will rename our own component here to app navigator or whatever you want

// to name it like so I will rename it here and all the to avoid confusion even though it's not technically required 

const AppNavigator = props => {

    const isAuth = useSelector(state => !!state.auth.token);

    return ;
};

export default AppNavigator; // we will import the same name in app.js also but still not technically required 
```
* Now we're importing navigation container from React Native. But dad will be a different component than what we built in the past. It just shared the same name which is why I renamed it more important than this navigation container.

```js
import React from 'react'; 
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; // lets import NavigationContainer -> this is react-navigation/native component not our custom component 

const AppNavigator = props => {

    const isAuth = useSelector(state => !!state.auth.token);

    return ;
};

export default AppNavigator;  
```
* Now we can use this AppNavigator in our app.js
* Now let us install stack and drawer navigation

```js
npm install --save @react-navigation/stack @react-navigation/drawer
```
* Now we can use stack navigation

```js
import React from 'react'; 
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; //Now create stack Navigator is a function we we already know
// Now we used create stack navigator to create our configuration setup our navigation registry
// earlier in shop app we put together into one stack and then we had multiple such stacks to compose them to
// gather in our draw Navigator which we ultimately then combined with the off screen in the switch navigator.

// what do we do with create stack navigator here.??? It now works differently.

// Now we use it to create a new component with it and I will name it my stack.

const MyStack = createStackNavigator(); // You now don't pass any object to create stack navigator to configure it.Instead it is a function that doesn't want an object.

const AppNavigator = props => {

    const isAuth = useSelector(state => !!state.auth.token);

    return ;
};

export default AppNavigator;  
```
* It is a function that needs no object so what does it do then. What is my stack ?? my stack is now a react component and we use it as such here in the app navigator to be precise.

* We need to wrap all navigation logic with the navigation container component which we're importing from react navigation native.

* You can think of that navigation container component basically as the component version of the app container which we created with create app container in the old setup.Right there we had to wrap our finished navigator with create app container.

* Now we have to wrap our navigation setup with navigation container.So in here we now setup our logic when it comes to which pages we want to be able to load. And here we now use my stack as a react component 

```js
import React from 'react'; 
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 

const MyStack = createStackNavigator(); 

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    // So what my stack actually is is it's an object with a navigator property and the values stored in that property is now a component.
    //MyStack screen property also holds a react component and hence we can render it like this.
    return <NavigationContainer>
            <MyStack.Navigator> 
              <MyStack.Screen />
            </MyStack.Navigator>
          </NavigationContainer>;
};

export default AppNavigator;  
```
* This is now a component which allows us to define a screen that should be part of that stack navigator here 
* we configure it with the help of props now because we're working with a component here so configuration works with props just as it's always the case when we work with components to give this screen a name we add a name prop 

* to let react navigation know which component to load when we target this name when we do that with an immigration action for example we add a second prop the component prop and this should hold a pointer at the component we want to load when we want to go to this screen with this name.

```js
// AppNavigator
import React from 'react'; 
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import { ProductsOverviewScreen } from '../screens/shop/ProductsOverviewScreen' // imported ProductsOverviewScreen component

const MyStack = createStackNavigator(); 

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    return <NavigationContainer>
            <MyStack.Navigator> 
              <MyStack.Screen name="ProductsOverview" component={ProductsOverviewScreen}/>
            </MyStack.Navigator>
          </NavigationContainer>;
};

export default AppNavigator;  
```
* Now important we don't create the component here. We just point at it we just use its name which is exported from that file.

* Let's save everything and launched his on Android let's say. And when you do that it builds the javascript bundle and opens up on the Android device. And what you'll see is our products overview screen. Of course it looks a bit different.

### First Migration Steps


* Now it's up to you where you do that configuration but since we did it basically in the shop navigator file before. I will also keep on doing it there. Even with that new logic.

* So what I'll do is an app navigator.I'll actually get rid of that my stack here and I'll get rid of this import and I'll get rid of this here I'll leave the navigation container of though and I'll reset this import though ultimately will change this a bit.

```js
import React from 'react'; 
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 


const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    return <NavigationContainer>
    
          </NavigationContainer>;
};

export default AppNavigator;  
```
* Now in shop Navigation

```js

import React from 'react';
// No need to import like this
// import {
//   createStackNavigator,
//   createDrawerNavigator,
//   createSwitchNavigator,
//   createAppContainer,
//   DrawerItems
// } from 'react-navigation';

import { createStackNavigator } from '@react-navigation/stack'; 
import {
  createDrawerNavigator,
  DrawerItemList
} from '@react-navigation/drawer';

import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

// Now we can scroll down and we can leave the default nav options here actually.
// Thankfully the name rings and how you generally configure things and what you can configure did not really change just how you apply the configuration changed

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};



// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen
//   },
//   {
//     navigationOptions: {
//       drawerIcon: drawerConfig => (
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       )
//     },
//     defaultNavigationOptions: defaultNavOptions
//   }
// );


const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator>
      <ProductsStackNavigator.Screen
        name="ProductsOverview" // ProductsOverview ==> name
        component={ProductsOverviewScreen} // component
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
      />
    </ProductsStackNavigator.Navigator>
  );
};
// Above ..... So now we set up this navigation stack with this new component based logic.
...
......
........
```

* Now we could import this ProductsNavigator in our AppNavigator

```js
// AppNavigator
import React from 'react'; 
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 
import { ProductsNavigator } from './ShopNavigator';


const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    // we can now add the product navigator like this
    return <NavigationContainer>
            <ProductsNavigator/> 
          </NavigationContainer>;
};

export default AppNavigator;  
```

* Now back to the shop navigator. Let's have a look at those options. Next the navigation options we had here on this stack What do we do with that.

* Well we actually have two options here on our products navigator on the old navigator with the old logic one is the icon This stack should have in the drawer which we will add later

* the second are our default navigation options which should be applied to all screens that are part of this navigator.

* And actually there then also is a third place where we configure things in the past. And that was in some of the screens.

* Let's have a look at our product overview screen what's in the shop folder there if we scroll down. We had this navigation options property we added to the products overview screen functional object and that was a function where we configure things like the header title but also what's on the left and the right set of the header now with this new logic.

```js
// old  ProductsOverviewScreen navigationOptions XXXXXXXXX 

// ProductsOverviewScreen.navigationOptions = navData => {
//   return {
//     headerTitle: 'All Products',
//     headerLeft: (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Menu"
//           iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     ),
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Cart"
//           iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           onPress={() => {
//             navData.navigation.navigate('Cart');
//           }}
//         />
//       </HeaderButtons>
//     )
//   };
// };
```
* now with this new logic. You don't do that like this anymore!!!  

* Now on the screen(Shop Navigation) we want to have those options, to You can pass exactly what you had in the component before.

* so you pass of function Which receives the navData parameter which then returns a configuration object the concrete value for this parameter will be fed in by react navigation and the configuration names we can set here the things we can configure haven't changed.So we still can set up a header title ahead or left. So this all is exactly the same as you learned. It works in exactly the same way.

* now we could do that here and shop navigator. But this of course would quickly become very very large if we had all the different screen specific configurations in here.So it's actually not what I will do here.

* Instead I see two options.

* One is that we actually do our set up off the products stack navigator screen in the screen component.

* The second is that we just keep our options there and that's the approach we will follow. Let us uncomment navigation option

* So back in product overview I'll comment this back in but now in here we no longer set is functioning as a value for the navigation options prop but we simply export it as a constant 

```js
// new  ProductsOverviewScreen navigationOptions XXXXXXXXX 

// ProductsOverviewScreen.navigationOptions = navData => {

export const screenOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

// this screen options no screen options holds this function and we export it by its name.

// It does not clash with the component export because we do that with the default here.

export default ProductsOverviewScreen;
```

* Since we export screen option here in our ProductsOverviewScreen we can import and use this in our shopNavigator component

```js

//Shop  Navigator 

import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions
} from '../screens/shop/ProductsOverviewScreen';


export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions} // here we can use this options
        // I just pass a pointer at this function don't execute it just pointed it. Let's react navigation executed for you 
      />
      ...
      ....
    </ProductsStackNavigator.Navigator>
  );
};
```
* For the default navigation options. The good news are we can still apply those we don't have to set up everything on a screen level. If we have a shared configuration that affects all screens of a navigator.

* And how would you think we can set up such general options for all these three screens here. Well we set them up directly on the navigator there. We also have a little screen options property so not named options but screen options.

```js
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  // here defaultNavOptions added to screenOptions
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}> // g
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};
```
* But these are the options which will be applied to every screen here and screen specific options will be merged with these general options just as we saw earlier.

* Well there is one thing we actually need to adjust and the product overview component in our screen option steer header left. This now needs to be function here which returns our JSX

```js
ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    //headerLeft: (props) => (  // we can also receive props here 
    headerLeft: () => (  // here
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (   // here
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};
```
* So we need to convert both into functions and you can simply do that by adding an empty parameter list and then the arrow here. Side note you could accept the parameter here if you wanted to and that would be props because this actually is now a react component defining here a concrete value for props will be defined react navigation and the values you can get from there can be found in the official docs.

* with that we learned how we can configure our components our screens and the overall stack navigator with that new logic with that done.

### Converting More Stack Navigators to the New Config

* Lets do the similar screenOptions for productDetailScreen also...

```js
export const screenOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};
```
* Same we do in our cart scree too

```js
export const screenOptions = {
  headerTitle: 'Your Cart'
};
// And here you see it's now actually not a function but just an object. This however should also work.
```
* with that back in the shop navigator. Let's add that here on this detail screen with the options prop

```js
import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions // to avoid name collisions
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions
} from '../screens/shop/ProductDetailScreen';
import CartScreen, {
  screenOptions as cartScreenOptions
} from '../screens/shop/CartScreen';


export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};
```
* Do similar way of stack navigation for order also

```js
import OrdersScreen, {
  screenOptions as ordersScreenOptions
} from '../screens/shop/OrdersScreen';

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};
```
* now for the screen specific options let's check out the orders screen

```js
// we already imported and used in appNavigation above
export const screenOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};
```
* Similarly to admin navigator also

```js
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions
} from '../screens/user/UserProductsScreen';
import EditProductScreen, {
  screenOptions as editProductScreenOptions
} from '../screens/user/EditProductScreen';

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};
```
### Migrating the Drawer Navigation

* So we work with the stack navigator. Now what about the draw. The logic is exactly the same.

* Again you could have that in a separate file.

```js
const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {

  return (
    <ShopDrawerNavigator.Navigator >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator} // here we used ProductsNavigator(Stack Navigator) as componet for drawer navigator as we did before..

        // And second we want to configure our different screens like the product's navigator or the order's navigator to have your own icons in the drawer.

        //Well let's start with the icons. Previously we set up that I can directly in the configuration of the stack Navigator which we wanted to use in a draw

        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color} //So this all works justice before one small adjustment however we now get props here as well fed in by react navigation and these props will have a color key 
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};
```
* So now we have our screen specific configuration here. You could say now what about the draw overall because previously in the app with the old react navigation wherein we actually had our draw and we configure the active tint color and also the content of the draw.Well you can still do that with that new approach. We go to our draw navigator so where we set up the overall navigator and we configure it via props just as before.

```js
import {
  createDrawerNavigator,
  DrawerItemList
} from '@react-navigation/drawer';

const ShopDrawerNavigator = createDrawerNavigator();
export const ShopNavigator = () => {    
const dispatch = useDispatch(); // we can't use useDispatch inside ShopDrawerNavigator

    return ( 
      <ShopDrawerNavigator.Navigator
            // here we added drawerContent
            drawerContent={props => {
              // since we are using DrawerItemList!!!! here, make sure you have already imported
              return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                  <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItemList {...props} /> 
                    <Button
                      title="Logout"
                      color={Colors.primary}
                      onPress={() => {
                        dispatch(authActions.logout()); //onPress dispacth logout
                      }}
                    />
                  </SafeAreaView>
                </View>
              );
            }}
            // here we added drawerContent
            drawerContentOptions={{
              activeTintColor: Colors.primary
            }}
          >
            <ShopDrawerNavigator.Screen
              name="Products"
              component={ProductsNavigator}
              options={{
                drawerIcon: props => (
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={23}
                    color={props.color}
                  />
                )
              }}
            />
            <ShopDrawerNavigator.Screen
              name="Orders"
              component={OrdersNavigator}
              options={{
                drawerIcon: props => (
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23}
                    color={props.color}
                  />
                )
              }}
            />
            <ShopDrawerNavigator.Screen
              name="Admin"
              component={AdminNavigator}
              options={{
                drawerIcon: props => (
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    size={23}
                    color={props.color}
                  />
                )
              }}
            />
      </ShopDrawerNavigator.Navigator>
    );
```
###  Replacing the "Switch" Navigator & Auth Flow

* Well what about the switch navigator. Well we won't need to switch navigator anymore. There is no @reactnavigation/switch package or anything like that. But I'll come back to that when we need it. So for now let's create our auth stack navigator

```js
const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
```

* Now we also got these Startup screen but if we have a closer look in the past we just pointed at that directly from inside our switch Navigator which leaves us with just one question. What about this switch navigator.

```js
// Old Navigator!!!!!!!!

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);
```
* Now in the past this would have been the first screen you see once the apple loaded because it's the topmost first screen in this configuration.

* And then we had logic in that old navigation container we built earlier where we checked whether we are authenticated and if that was not true if we were not authenticated we would redirect the user to that authscreen. 

* Now when would we reach the shop's screen.Well for that let's have a look at the start up screen. There we see that we tried authenticating and here we would go to the shops screen eventually when automatically logging us in succeeded.That was the logic we wrote there(in startupScreen)

* Now that's still some logic that makes a lot of sense. We just need to adjust it for the new navigation package. in the end what we can see here is that in the start of screen we're trying to lock the user in and if we can't find user data stored on the device we go to the Auth page. If we find data about the token is expired or not there we go to the auth page.

* If we do succeed with everything though and we have a valid token then we instead go to the shop page and we dispatch an action where we authenticate the user which changes state and our redux store which sets the tokens and so on.

* initially that token in our store is "null" now we can use that.

* What if we get rid of all these navigate calls ie "props.navigation.navigate('Auth');" well this function will stops in the end. we definitely don't dispatch does action. So we definitely don't set the token to anything. It's still "null"

```js
const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        // props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAL());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      // props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};
```

* So that token which we manage with redux is even "null" or it holds a value. Now I want to adjust the redux store a bit.

* In the auth I'll add a new piece of data to this state  ie didTryAutoLogin

```js
// reducer/auth.js
const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false
};
```

* I want to store whether we tried logging the user in or not. Now if we authenticate. So if we dispatch an action with that identifier then I will set did try auto log in to true.

```js
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true // here..
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true // here..
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true // here..
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
```

* I will also add a new action here in actions auth 

```js
//actions/auth

export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};
```
* Now why am I doing that ? Let's go back to the reducer to your auth reducer and handle this new case.

```js
import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth'; // make sure you import SET_DID_TRY_AL in actions

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true
      };
    case SET_DID_TRY_AL: //here 
      return {
        ...state, // where I copy the old state 
        didTryAutoLogin: true // I said did try auto log into true so the token might still be null i set this to true
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true
      };
    default:
      return state;
  }
};

```
* Now my idea is that I dispatch this action here in the startup screen. In all scenarios where we previously went to the auth screen so where we tried logging in but where we didn't succeed.

```js
const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        // props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAL()); //here we dispatch setDidTryAL action
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      // props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};
```
* So now we have this new field and redux and why am I doing that. Why is this helpful. Well because with react navigation 5 there is no switch navigator anymore because we don't need it anymore since we now manage our entire route setup via components we can just dynamically render components to have them have an effect or not render them 

* so in the shop navigator (Drawer Navigator) where I render my products navigator (Stack Navigator). It's now time to add all these navigators be configured and then decide which navigator should be rendered when so from the shop navigator.

* In App navigator i import our drawer navigator (shop navigator)

```js
// AppNavigator
import React from 'react'; 
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 
import { ShopNavigator } from './ShopNavigator';


const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    // we can now add the ShopNavigator like this
    return <NavigationContainer>
            <ShopNavigator/> 
          </NavigationContainer>;
};

export default AppNavigator;  
```
* So this is basically what I want to render if we are locked in that's our shop right 

* Now we all need the auth navigator and the startup screen. so in AppNavigator i will import auth navigator also

* but what will also need to import into app navigator is the start up screen now.

```js
// AppNavigator
import React from 'react'; 
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; 
import { ShopNavigator, AuthNavigator } from './ShopNavigator'; //ShopNavigator, AuthNavigator
import StartupScreen from '../screens/StartupScreen'; // StartupScreen 

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token);
    // we can now add the ShopNavigator like this
    return <NavigationContainer>
            <ShopNavigator/> 
            <AuthNavigator />
            <StartupScreen />
          </NavigationContainer>;
};

export default AppNavigator;  
```
* Now it will render one of the three componenet and this is where we need to use redux

```js
import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { ShopNavigator, AuthNavigator } from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
  // ShopNavigator  --> if we are authenticated.I always render to shop I don't care about anything else.
  // AuthNavigator  --> if we are not authenticated and also did Try to AutoLogin
  // StartupScreen  --> if we are not authenticated and if we haven't tried logging in automatically Well then we don't know whether the user might be a authenticator or not. then I actually want to render the startup screen
  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />} 
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
```
* why we're now using this instead of the switch navigator.

* Now first of all there is no switch navigator anymore in react navigation 5.

* But why was it removed? Well since we now configure everything with components we can use regular react tools to either render a component or not.

* If you're not thinking about navigation but a normal screen where you maybe have a text which you only want to show conditionally then you would use some state and then in JSX you would only sometimes rendered a text with a ternary expression for example.

* And we're doing the same here with our route configuration with our screen configurations here 

* react navigation behind the scenes dusty heavy lifting off interpreting our configuration and making sure that the correct component gets rendered on the screen.

* Now if we use isAuth and didTryAutoLogin to control which navigator is actually rendererable by react by using such a ternary expression then we ensure that if for example isAuth is not true then there is no way that shop navigator screens can be brought to the screen.

* Why. Because the shop navigator component which holds our shop related root configuration our screen configuration that component is only rendered if isAuth is true.

* So there is no way for a shop related screen to be rendered to the screen if isAuth is false.Really make that comparison to normal text elements or normal boxes on a screen which you render conditionally.We're doing the same here but not with boxes and text but instead with our entire navigation stack.

* Now if I do try to log in here I now actually get a problem here. I get an error that navigate with a payload of shop was not handled .

* This now makes sense if you think about it. We got no switch navigator anymore. Instead we just control which navigator we want to render under which circumstances. So why are we getting this.

### Logout & Further Fixes/ Adjustments

* in the past year in our switch navigator. There we had the shop screen but now we have a different logic for rendering this navigator and all the screens and sup navigators that belong to it.

```js
// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator
// });
```

* So let's actually go to the place where we triggered does navigation action and that's actually on the off screen there if I search for navigate you'll see here's our navigation action. I dispatch my action but I also navigate we shouldn't navigate anymore dispatching is enough because this will set a token set us to authenticate it.

```js
// screens/user/AuthScreen.js
const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      // props.navigation.navigate('Shop'); This is not required in 5+
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
```
* And if we are authenticated well then we render the proper Navigator. 

* With This if we reload login works and then if we logout here I get an error. So we should fix data as well. And for this let's actually go to our shop navigator again and there to the drawer where we render it at logout button and there we're dispatching does logout action

```js
// in auth reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true
      };
    case LOGOUT:
      // return initialState;  // here we should not just set initialState we should add didTryAutoLogin also
      return {
        ...initialState,
        didTryAutoLogin: true // like this 
      };

    default:
      return state;
  }
};
```
* We didn't really try it but since we locked out deliberately we know that trying it won't make any sense. Right. Because we can't log in automatically we just locked out.

* and let's try logging out and we're getting that regarding the will focus remove function in the products overview screen indeed I am checking whether this screen is getting focused or not 

* There is no will focus event anymore. There is just focus and blur. There isn't a will focus did focus will blur did blur just focus and blur.

```js
// useEffect(() => {
//     const willFocusSub = props.navigation.addListener(
//       'willFocus',
//       loadProducts
//     );

//     return () => {
//       willFocusSub.remove();
//     };
//   }, [loadProducts]);

useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadProducts);

    return () => {
      unsubscribe();
    };
  }, [loadProducts]);
```
### Extracting Screen Params

* We get this error that get param is not a function.And indeed with react navigation 5+ get param days function you would use to get the parameters for a given navigation action was removed.So let's see what else we can do for that.

* Let's go to these added product screen which is the screen we're trying to visit which fails here and we certainly use get param here but also here in the main added product screen component. Now with reactivation 5 there is no get param function anymore.

```js
// const prodId = props.navigation.getParam('productId');

const prodId = props.route.params ? props.route.params.productId : null; // this will work in 5+

```
* similarly we can use in screenOptions also
```js
export const screenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParams.productId ? 'Edit Product' : 'Add Product'
  };
};
```
* Now depending on your application you might not always be getting a value for this parameter. So sometimes it might be undefined and for that reason you could of course all check whether this is null or whether this is undefined before you try to use it.

* Now when it comes to set param which were also using here in this component that does not change  we can still use it same way

* So that's important to keep in mind. param itself will be undefined if there are no param. And if we're opening this screen in order to add a product indeed there are no param initially this submit param isn't set initially because that's only done from inside the component. So after the screen has been loaded and product I.D. definitely isn't set because we're not editing but adding. So there is no product I.D. fed into this screen when we navigate to it.

* So how do we make sure we're not getting an error then we could check and the the get params like above using ternary operator 

### Setting Screen Options Dynamically

* Previously we needed to abuse param to get data from our component. So that changed in our component into the navigation options with react navigation5+ that's no longer needed in this scenario here we have to submit function and we want to pass a different submit function to our options. Now we did this by setting params here and setting the submit param to our submit handler

```js
// useEffect(() => {
//     props.navigation.setParams({ submit: submitHandler });
//   }, [submitHandler]);
```
* Instead what we can now do is we can use a new function called set options still on the navigation prop that does not change but this set options function here is new and this allows us to set new options dynamically from inside the component.

```js
useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
    });
  }, [submitHandler]);
```
* So now I set my header right screen option here from inside the component. And since this is in use of fact whenever that handler changes we'll reset that option.

* this now works and using params now works and we now don't have to use params for things that don't really have something to do with params. Right.

* params should only be for transporting data from screen A to B when navigating and not from inside a screen with set options.We can now update our options dynamically without abusing params.

### A Summary Of All Important Changes

* So we spent quite some time on migrating this to react navigation five now and maybe it looks a bit overwhelming right now. So let me sum up the key changes we made here and the key changes the key differences react navigation five introduced

* the biggest change is how we set up our screen configuration instead of having this registry like approach we now use components to set up our configuration but the pattern here is actually quite simple.the biggest change is how we set up our screen configuration instead of having this registry like approach we now use components to set up our configuration but the pattern here is actually quite simple.

* You always create a navigator that could be a stack Navigator a draw navigator or also a tap navigator and then you use that navigator does Navigator a component here as a route component for this set of screens that belongs to this Navigator.

* The screens are the nested components in there and there you provide a name and a component that should be loaded for that screen.

* Now when it comes to navigating you still navigate with the navigation prop and then the navigate function by identifying the screen by name.So that does not change at all. You also still pass params as before.
```js
// like this
const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };
```
* The only important thing here or the one thing you should keep in mind is that the name you use here of course should be the name you also use here. When you set up your screens.

* So that's the biggest change that you set up your configuration as components.Ultimately you then can still nest your different navigators into each other as we're doing it here where we have to draw a Navigator which also has stack navigators as screens. That also doesn't change 

* And what changed is where you configure things screen wide configuration options so options that affect all screens of a navigator are set up directly on the Navigator a component with the screen options prop

* and screen specific configuration is set up with the options prop on the screen component. Now where you manage that configuration if you do it all in one big file or as we're doing it here if you're doing it in the screen and you then just export it.

* One thing that did change because of that is how you handle authentication or related cases. You don't have to switch navigator anymore.

* Instead you control which navigators should be rendered by react and what's not rendered can't be effective can't do anything. So if we don't render to shop navigator because we're not authenticated then there is no way a shop screen can be loaded.

```js
<NavigationContainer>
  {isAuth && <ShopNavigator />}
  {!isAuth && didTryAutoLogin && <AuthNavigator />}
  {!isAuth && !didTryAutoLogin && <StartupScreen />}
</NavigationContainer>
```
* That's how we now control which screens are accessible 

* And then we have one other big or important change and that is how we extract params

* we extract params on this new route prop with the params key the params key can be undefined if there are no params received and this component and params should now really only be used to get data from component A to component B. So from screen A to screen B

* if you needed to use parents to get data from insight to component into your screen options you don't need to do that anymore.Instead what you do now is you used the new set options Function which you can call directly on your navigation prop

```js
useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
    });
  }, [submitHandler]);
```
* So we call set options on this navigation prop and then we can dynamically adjust the navigation options from inside the component.

* Refer : https://reactnavigation.org/blog/2020/02/06/react-navigation-5.0/

* And with that it's up to you whether you want to use react navigation 3 or 4 or if you want to switch to 5 or later.The majority of projects out there in the wild will certainly still use Version three and four because these versions have been around for so long.New projects might switch to Where's in five but might also still use the older version.

* Official Docs: https://reactnavigation.org/docs/getting-started

* React Navigation v5 Announcement Blog Post: https://reactnavigation.org/blog/2020/02/06/react-navigation-5.0/

* Official Upgrading Guide: https://reactnavigation.org/docs/getting-started/en/upgrading-from-4.x.html