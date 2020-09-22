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

```js
//action/signup

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {

  // now we have that API key thing. Now that's something we can get from Firebase by clicking on the gear icon here, project settings. There you'll find the web API key and that's exactly what you need,

    return async dispatch => {
        const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=API_KEY...',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
            })
        }
        );

        if (!response.ok) {
        throw new Error('Something went wrong!');
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({ type: SIGNUP });
    };
};

export const login = (email, password) => {
    return async dispatch => {
    const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJQHLtZNX66ruzSlbIcNXsO84MUusp8kk',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        })
        }
    );

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    const resData = await response.json();
        console.log(resData);
        dispatch({ type: LOGIN });
    };
};
```
* we should be able to dispatch this and therefore send such a sign up request. So now we can go back to the auth screen

```js
import React, { useState, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux'; // make sure you imported useDispatch

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// form reducer here which manages our entire form related validity and the values.
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isSignup, setIsSignup] = useState(false); //initially isSignup false means initially i want to be in login mode
  const dispatch = useDispatch();
  // we initialize that with use reducer,
  // make sure we imported useReducer
  const [formState, dispatchFormState] = useReducer(formReducer, { // note formState !!!!
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const authHandler = () => {
    let action;
    if (isSignup) { // if sighup page
      // here we are dispatching signup with email and password as payload
      action = authActions.signup(
        formState.inputValues.email, // formState.inputValues.email retriving from formState
        formState.inputValues.password
      );
    } else { // if login page
       // here we are dispatching login with email and password as payload
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password // formState.inputValues.email retriving from formState
      );
    }
    dispatch(action);
  };

  // grab this with use callback to make sure that this doesn't rerender when it shouldn't.
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      // now with that, we're storing our form values or our input values in our form state which we handled with use reducer and so on.
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

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
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler} // onInputChange call inputChangeHandler
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
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler} // onInputChange call inputChangeHandler
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
               // when we click this button i want to dispatch Sign Up/Login
                title={isSignup ? 'Sign Up' : 'Login'} // title based on state
                color={Colors.primary}
                onPress={authHandler} // here we called authHandler
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState); // switch setIsSignup state ...
                }}
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

### Managing the Loading State & Errors

```js
import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator, //ActivityIndicator
  Alert // alert error
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(); // initial error state
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    // we used  useEffect here, because useEffect will react to the changes in ther error message 
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

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
    setError(null); // initial setError null
    setIsLoading(true); // initial setIsLoading true, we start loading before we loading 
    try {
      await dispatch(action); // if dispatched successfully then it will redirect to shop screen so need to update setIsLoading
    } catch (err) {
      setError(err.message); // setError error message state , which is received form auth action
      setIsLoading(false); // initial setIsLoading false, we stop loading after error message 
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

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
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
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
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              
              {isLoading ? (
                // if isLoading show ActivityIndicator
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                // else show Button
                <Button
                  title={isSignup ? 'Sign Up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
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
* instaed of showing general error messages lets add some specific error message here

```js
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
        // Here we throwing specific error message
        // from here we are throwing error message to auth screen
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_EXISTS') {
          message = 'This email exists already!';
        }
        throw new Error(message);
      }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGNUP });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      // Here we throwing specific error message
      // from here we are throwing error message to auth screen
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: LOGIN });
  };
};
```

* Refer : https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password

### Using the Token

* How can we leave login screen if we done signup/login

```js
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
      props.navigation.navigate('Shop'); // navigate to Shop navigation which we have in our navigation config
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
```
* Now we're still of course not utilizing the token, so let's make sure we do that as well and for that let's go to the auth reducer

```js
//auth reducer
import { LOGIN, SIGNUP } from '../actions/auth';

const initialState = {
    token: null,
    userId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
        return {
            // So if we do login, I want to return a new state
            token: action.token,
            userId: action.userId
        };
        case SIGNUP:
        return {
            // So if we do signup, I want to return a new state
            token: action.token,
            userId: action.userId
        };
        default:
        return state;
    }
};
```

* Now of course we need to make sure that our action carries token and userId, so in the action creator in the end of sign up here when I dispatch the sign up action, we need to add a token field and we need to add a userId field.

```js
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    // here our action dispatch response with token and userID
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    // here our action dispatch response with token and userID
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
```

* we can just copy that and use the same, almost the same for logging in, the only thing that needs to change is this identifier and you could even unite login and sign up to one combined authenticate identifier let's say because in a reducer, we're doing the same thing anyways. So I just have it split up here to be clear that we have two different things in the end but the update is the same, so we could definitely combine these two action types.

* So with that, we're now storing the token and that's nice but what do we need this token for again?

* We need that token which we are now storing to access our API and for that, let's go to Firebase and to database. Keep in mind that when we set up this database, I mentioned that you should start in this test mode if you remember. What this did is that it set up certain rules and you can check those if you click on the rules tab. This controls who can read and write to your database and right now this is both set to true which means everyone can read everything and everyone can write everything. That's of course typically not what you want, instead here I'll set both to auth unequal to null

```js
// firebase rules
{
  "rules": {
    ".read": true,  
    ".write": "auth != null",
  }
}
```
* What this tells Firebase is that only authenticated users, so only users who send the request with a valid token should be able to write and reading always allowed.

* So now for writing, we need a token, otherwise we'll face a problem. If we login here and we're storing the token but we're not appending it to requests right now,

* you see we can load all data, that's fine but you'll also notice that if I try to edit this in the end I get an error and that error is thrown because I'm not allowed to write and Firebase therefore blocks the access and returns an error response.

* So now we need to leverage the token which is stored in a reducer and actually append it to our outgoing requests.

* Now for that first of all, we need to register this reducer in our root reducer, so in the app.js file

```js
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
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer // authReducer
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
      <ShopNavigator />
    </Provider>
  );
}

```
* That will allow us to then leverage this and access this token but now we need to attach it to the outgoing requests, for example for products we need to attach it to the request we send for updating products,

* Now the way you append a request in Firebase can be found in the official Firebase docs Refer : https://firebase.google.com/docs/reference/rest/auth

* you can append a token to your outgoing request simply by adding that auth query parameter at the end of your request URL.

* Now how can we get access to the token here? We're in the action creator which means we have no easy access to the store here, to the Redux store or do we? Redux Thunk, that nice package which allows us to write this syntax with that function that receives the dispatch function, that actually gives us something sweet.

```js
import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(
        'https://rn-complete-guide.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  // We can also change this function a little bit and not just get dispatch but get a second argument as well which is another function which gives us access to the Redux state, so we get access to the current state of our Redux store. 
  return async (dispatch, getState) => {
    const token = getState().auth.token; // here we access auth token with the help of redux thunk
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token; // here we access auth token with the help of redux thunk
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;  // here we access auth token with the help of redux thunk
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  };
};
```
### Mapping Orders to Users

* We're adding tokens everywhere which is important but for orders, we don't just want to append the token, we also want to make sure that orders really belong to the logged in user.

* Now the good thing is we're storing the userId which Firebase generated in our Redux store. So mapping our orders to users isn't too hard,

```js
// order action
import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
     // order userId
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://rn-complete-guide.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    // order userId and token
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });
  };
};
```

* Similarly for orders also we need to...

```js
import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://rn-complete-guide.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId // ownerId now we start mapping products to user
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId // ownerId  we will use this in reducer
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  };
};
```
* In will use ownerID in reducer

```js
import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from '../actions/products';
import Product from '../../models/product';

const initialState = {
  availableProducts: [], // initialState empty state
  userProducts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products, // fetch products from action.products db
        userProducts: action.userProducts // we will filter and fetch from action dispatch soon below
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId, // instead of hardcoded ownerId we get ownerId from action dispatch
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,  // instead of hardcoded ownerId we get ownerId from action dispatch
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid
        )
      };
  }
  return state;
};
```

* Lets send userProducts from product action

```js
import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://rn-complete-guide.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        // we will receive this userProducts in product reducer
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl
      }
    });
  };
};

```
* Make sure if we don't have user product it should show appropriate  message and

```js
// UserProductsScreen
if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found, maybe start creating some?</Text>
      </View>
    );
  }
```

###  Implementing "Auto Login"

* One thing we're not doing right now is we're not persisting our sessions so to say. If I reload, I always have to login again and that's not really what I want,it would be nice if we could automatically login if we do have a valid token

* and for this we need to do two things - we need to store the token somewhere on the device, not in Redux because Redux is in memory and this will be lost whenever the app restarts.

* So it needs to be somewhere on the hard drive of the device so to say and in addition, we need to check that storage whenever our app starts and automatically set the token in Redux and redirect the user if we do find a valid token there.

* Now let's start with storing because that's a logical first step. in the Auth action creator, there you need to import async storage from React Native.

```js
// action/Auth.js 

import { AsyncStorage } from 'react-native';

// With that imported, we can use that to then save data to the device, AsyncStorage is a React Native API that in the end uses a key value storage on the device which is available both on iOS and Android where we can store data that persists across app relaunches, so which we can use to save data that is not lost when the app launches or restarts.

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken)); // called the similar authenticate which is above
     
     
    // We need to know how long the token is valid because you must not forget that eventually
    // it will expire which is why for logging in and signing up, you get that expiresIn key in the response which tells you in seconds how long it takes until your token is invalid and Firebase won't accept it anymore.


    // We need to store that information as well because if we later come back, if we restart the app afterthree hours, our token is probably invalid,

    // so we need to know when the token will invalidate so that we when we check that, when the app restarts, when we check whether we do have a token, we know whether that token we might find is actually still relevant or whether it's invalid already and 

    // we need a new token anyways in which case we shouldn't auto login the user. So I want to store the expiration date 

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000 //multiply this with 1000 to convert it from seconds to milliseconds 
    );
    // we are calling saveDataToStorage after dispatch signup
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    // we are calling saveDataToStorage after dispatch login
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  // AsyncStorage.setItem
  AsyncStorage.setItem(
    'userData', // we need this key later to reterive our data

    // here we used JSON.stringify to convert object into string
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString() // toISOString - because this will convert it to a string in a standardized format which I want to save.
    })
  );
};

```
* Now we're saving that to storage which is nice but now we also need to check this when we're logging in. A nice way of doing that is to create a new screen and I'll actually create this outside of my existing folders in the screens folder but neither in shop nor in user and I'll name this startup screen and you can name it however you want.

* The idea is that I show this screen whilst my app is booting up and I'm figuring out whether the user is authenticated or not and this will be super fast, chances are we won't even see that screen when the app starts.

```js
// screen/StartupScreen
import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage // async storage because here I also want to access async storage to find out whether we do have a valid token or not.
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();

  // this is where we now need to check the async storage for a valid token

  //  I can do this with the help of use effect which allows me to run some logic here when this component mounted
  useEffect(() => {
    //  I use the separate function because here I want to use async await which I can do by creating that inner function which I can now call here,

    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        // if no userData redirect to Auth
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      props.navigation.navigate('Shop');
      // we will have this authenticate in action/auth
      dispatch(authActions.authenticate(userId, token));
    };
    // 
    tryLogin();
  }, [dispatch]); // here we can add dispatch as a dependency but this will never change, so the effect will never rerun

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
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

export default StartupScreen;
```
* Make sure we added this new screen in our shop navigation config

```js
import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
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
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
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

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen, // Startup screen
  Auth: AuthNavigator,
  Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
```

* important, I need to log the user in and for that, we need a new action because I don't want to send a request now, I just want to change some data in Redux. So we added new action creator above in action/auth,

```js
export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};
```
* We could the same action after login and signup too

```js
dispatch(authenticate(resData.localId, resData.idToken));
```
* We can use the same action in auth reducer also

```js
//import { LOGIN, SIGNUP } from '../actions/auth';
import { AUTHENTICATE } from '../actions/auth';

const initialState = {
    token: null,
    userId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        // case LOGIN:
        case AUTHENTICATE:
        return {
            token: action.token,
            userId: action.userId
        };

        case LOGOUT:
        return initialState;
        // get rid of sign up because same happening in AUTHENTICATE also

        // case SIGNUP:
        // return {
        //     token: action.token,
        //     userId: action.userId
        // };
        default:
        return state;
    }
};
```
### Adding Logout

* Now to logout, we need a new action which we can dispatch.

```js
import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT'; // LOGOUT

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime)); // setLogoutTimer
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
            })
        }
        );

        if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_EXISTS') {
            message = 'This email exists already!';
        }
        throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch(
        authenticate(
            resData.localId,
            resData.idToken,
            parseInt(resData.expiresIn) * 1000
        )
        );
        const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBY8UJq_xLD0nEe1HZHuvEOUfYIS9gg4pA',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
            })
        }
        );

        if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_NOT_FOUND') {
            message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
            message = 'This password is not valid!';
        }
        throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch(
        authenticate(
            resData.localId,
            resData.idToken,
            parseInt(resData.expiresIn) * 1000
        )
        );
        const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

//logout 
export const logout = () => {
    clearLogoutTimer(); // whenever logout getrid of timer
    AsyncStorage.removeItem('userData'); // removeItem
    return { type: LOGOUT }; // return LOGOUT action
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer); // clear timeout is a built-in function built into Javascript to get rid of that timer.
    }
};

//  I want to dispatch logout here, right?

// So therefore set logout timer should probably not be a normal function but actually here, I will have a function which takes advantage of Redux Thunk, so where we have this function in a function where this inner function gets dispatch as an argument and therefore once this async task finished, once this timer expired, we can dispatch logout, so we can dispatch the result of this action creator

// which is this action in the end, so that happens when the timer is done.

const setLogoutTimer = expirationTime => {
  return dispatch => {
    // I will set the result of set timeout to timer or store the result of that in timer which is a pointer at this timer
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
```

* Now we can use that and I want to be able to logout with the help of the side drawer, in the side drawer, I want to have this logout button.

* That means that we need to do something which we haven't done before, we need to add a new button to the side drawer. Thus far, we only add the automatically created buttons but adding your own content isn't too hard. For that, let's go to the shop navigator file where we set up the drawer, here it is and then here besides my content options, we can also add a content component here.

```js
import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
  DrawerItems // import DrawerItems
} from 'react-navigation';
import { Platform, SafeAreaView, Button, View } from 'react-native'; // SafeAreaView, Button, View
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
import * as authActions from '../store/actions/auth'; // auth actions

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
    },
    // This allows you to add your own content for the side drawer instead of the default content.
    contentComponent: props => { // contentComponent here
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          //  make sure you add force inset equal to top always horizontal never and this just controls how this is laid out and in that save area view, you should now add the drawer items and important, pass props to those because these are the default drawer items which are rendered and that should still be the case and in order for them to be configured correctly, you need to pass in props

            <DrawerItems {...props} />

            // Well this is a React component right, so in the end, we can simply use dispatch here.
           
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // we don't need to navigate here because if we trigger logout, if we dispatch this action, we clear the token in Redux and therefore this should automatically trigger our navigation thanks to this navigation container

                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
```
* Now we also have one other place where we need to do that and that's the startup screen because there we also dispatch authenticate and here we need to calculate the remaining time because this kicks in whenever we restart the app, so here we don't know how long it will take for the token to expire and we need to calculate this. So here I can calculate the expiration time by basically taking the expiration date which is a date object and calling get time on it which gives me its timestamp in milliseconds since the beginning of time and from that I have to deduct the current timestamp get time,

```js
import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate('Shop');
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
```

* I should be logged out after 3.6 seconds but I'm not. I can navigate around but if I reload indeed now I'm logged out. So it kind of cleaned up the data but it didn't navigate us back to the auth screen and the reason for that is that we never instruct React Native to navigate us back to the auth screen, so that's the missing piece.

* Clearing our Redux store is nice but in reaction to that clearance, we need to make sure we're taken back to the auth screen

* To make sure that this happens, we need one place which is always rendered which wraps our entire app where we can listen to our Redux store and find out when our token is reset to null so that if that happens, we can navigate back to the auth screen. Now that would be the app.js file

* So Redux in my store is only available inside of here, so in nested child components and that's already my navigator component to which I have no direct access.

* The solution is to simply wrap this with another component. I'll create that in the navigation folder because I'll name it navigation container.

```js
//NavigationContainer.js
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ShopNavigator from './ShopNavigator';

const NavigationContainer = props => {
    // references in React which is basically a way for you to directly access an element you render in jsx and now we can add the ref property to the shop navigator and assign this to nav ref or the other way around.
    const navRef = useRef();
    // useSelector which give access to redux state
    const isAuth = useSelector(state => !!state.auth.token); 

    //  double bang operator to basically force this to be true or false and if we have no token, this will be false so isAuth will be false in that case, if we have a token it will be true,

    useEffect(() => {
        // here we are checking isAuth if not redirect
        if (!isAuth) {
        //  Now we can use effect here to react to changes in that. So here in use effect, my dependency array includes isAuth, so when isAuth changes, this effect function should run and therefore here, I can then check if we're not authenticated because that's what I'm caring about, if isAuth is not true

        // Dispatch is a method made available by the shop navigator or by this app container which it is in the end because shop container is nothing else than what ShopNavigator.js

        // exports which is such an app container component and this component has a dispatch method which we can use to dispatch a navigation action

            navRef.current.dispatch(
                NavigationActions.navigate({ routeName: 'Auth' })
            );
        }
    }, [isAuth]);

    // The navigator is here and only in components that are rendered with the help of the navigator we have access to props.navigation.navigate but thankfully, React navigation gives us an escape hatch. We can use a ref to get access to the navigation functionality with the help of this component when we use it in our jsx code. 

    return <ShopNavigator ref={navRef} />; // here we are returning the same ShopNavigator
};

export default NavigationContainer;

```
* now in app.js instead of using ShopNavigator we will use NavigationContainer

```js
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
### Auto-Logout & Android (Warning)

* With the "Auto Logout" approach implemented in the previous lecture, you'll very likely get a warning like this on Android:

* Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981

### What's the problem?

* Using setTimeout() with a big timeout duration (as we're setting it => 1 hour), can't be handled in the most efficient way by Android. Unfortunately, there is no perfect solution available though but you can browse the referenced issue thread for possible workarounds: https://github.com/facebook/react-native/issues/12981