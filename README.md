## User Authentication

### Introduction

* we will thoroughly walk through everything that's included with signing users up, signing them in, logging them out, giving them access to the backend so that they can send data to protected resources there and so that only authenticated users can interact with the back-end and so on. We will do all of that in this module and you will learn how authentication works in native apps like this and how you can implement it in this React Native app.

### How Authentication Works

* Now it's important to understand how authentication works because if you're having a web development background, you might be used to authentication working a bit differently.

* So we have a server, Firebase in our case but that can be any server to which we talk from our React Native mobile app

* and this is the server which typically also authenticates us, so where we can send the email and the password the user entered to create a new user or to log a user in, so we send that auth data to the server.

* Now the server responds with something, for example with an error if the credentials are wrong or with a success response if they're correct and in a traditional web application, a server would then also store a so-called session on the server and return a session key to the front-end,

* so to the browser for example that basically allows the browser to find out that the user using this app in this browser is authenticated.

* Now this works a bit differently for mobile apps because there, you communicate with servers which are stateless, for example RESTful APIs or GraphQL APIs and there you don't really have a session because the server doesn't care about the individual clients, it doesn't save any data about whether you are authenticated or not, instead you work with so-called tokens.

* The idea is not too far away from the session idea.

* When you login and the server checks the e-mail and the password and determines that both is correct, the server creates a token, it uses a certain algorithm for that and it uses a key, a private key which only the server knows.

* This token is then returned to you, so to your app, for example to React Native mobile app and there you can store the token in some storage, for example in the Redux storage, so in memory, manage it with Redux in memory whilst your app is running.

* Now why do we need that token? For one, as long as we have that token, we can determine in the mobile app that the user is probably logged in and therefore forward the user from the authentication screen to our main app screen and so on and when the user clicks logout, we would simply delete that token

* but we also need that token for something else. On the server, as I mentioned we typically have certain resources, certain URLs which are only exposed to logged in users, so for example in our app, creating products is probably not something every user should be able to do and therefore if you want to send the request to such a protected resource, you need to attach that token to the request so that the server which created the token and which therefore can check with that private key whether the token is valid, so that the server can determine whether you have access or not.

* If you send a wrong token or an invalid token or no token at all, access will be denied and you get back an error. If you have a valid token and again the server is able to check whether the token is valid or not, you will be granted access and you can therefore then access the resources, write data, whatever it is. This is how authentication works

* Now the good thing is Firebase which we're using as a dummy backend already has all the token creation user management stuff built-in, so we don't need to worry about that, we just need to send the right requests and then manage that token and we're good to go. Refer : auth/auth1

### Implementing a Basic Login Screen

* So let's get started with implementing authentication and one very important step towards that is that we add a new screen, the auth screen which is the screen that should present a login or sign up form which the user can use to login or sign up

```js
// AuthScreen
import React from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; //  LinearGradient make sure you installed this.

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const AuthScreen = props => {
  // for the background, well of course we could give our view here which holds everything a background color
 // but I actually want to show you a new component which we haven't used thus far and for this, we need to install a brand new package

 // npm install --save expo-linear-gradient
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
  
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address."
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid password."
              onInputChange={() => {}}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button title="Login" color={Colors.primary} onPress={() => {}} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to Sign Up"
                color={Colors.accent}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;

```

* Now obviously the question now also is, how do we present this auth screen? How do we make sure that we see this if we're not logged in?

* we can go to the navigator and make sure that when the app launches, we see that auth screen and for this we can use a special new navigator which we haven't used before which is specifically built for, you could almost say for this authentication use case and that the create switch navigator

* The special thing about this navigator is that it always displays exactly one screen and you can't go back to another screen if you then navigate to a different one. So going back is explicitly not allowed which is exactly what we want because you shouldn't be able to go back to the login screen if you did just login.

```js
import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator, // createSwitchNavigator
  createAppContainer
} from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen'; // import AuthScreen
import Colors from '../constants/Colors';

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

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

// createStackNavigator AuthNavigator

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions // defaultNavOptions
  }
);

// export default createAppContainer(ShopNavigator);  // instead of this we will create MainNavigator below one

//we will actually render the auth screen as the first screen

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
```
### Adding User Signup

*  Firebase has authentication built-in, wWe just need to go to the authentication area there and then click on setup sign in method and there choose password and email or e-mail password here. Enable this and click save and with that, we have it enabled.

* Now we can send requests to a Firebase API to create users or to log them in. Refer : https://firebase.google.com/docs/reference/rest/auth#section-create-email-password

* So what we need to do is send a HTTP request and since I also will manage this all with Redux, I will create a new action creator for this and I'll name it auth.

* I will also already create a reducer because we will also manage some auth related stuff there, for example the token and the userId.