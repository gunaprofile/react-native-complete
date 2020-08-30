## Http Requests & Adding a Web Server + Database

###  Setup & How To Send Requests

* Firebase : https://console.firebase.google.com you can go to that console and there create a new Firebase project. Simply click on add project there and give it any name you want

* Firebase sounds like it's a database which we connect to our app.

* Actually you never directly connect a cloud database to your application, instead your application will always communicate with an API, typically a REST API which then in turn talks to a database because directly setting up a connection would be insecure. So that's how we'll do it

* Lets click creare database and then choose "start in test mode" which makes sure that the rules, the security rules are set up such that no authentication is required, we'll change that later to require authentication but for now, we have no users so we will start like this.

* Now this is later where you will see your data which you write to Firebase and its database and this is the URL or a part of the URL you need to send requests to to store data there or to fetch data from there "https://react-native-d033f.firebaseio.com/"

* And the cool thing about Firebase real time database is that it kind of gives you a database hidden behind the REST API where you can target dynamic REST API endpoints which will then automatically be translated to write or update requests on your database.

* So it looks like you're directly talking to a database but you always will talk to a REST API and then your incoming requests are kind of automatically translated to database queries you could say.

* when I submit a new product, we don't just save it here in memory but we actually send a request to Firebase to store it on its servers.

### Installing Redux Thunk

* for that we need to install redux thunk 

```js
npm install --save redux-thunk
```

* That's a so-called Redux middleware which we can call, which allows us to change our action creators here in the actions folder such that we can actually do asynchronous stuff there, that we can handle side effects there so that we can for example send HTTP requests in such an action creator and only once that HTTP requests is done, we're actually dispatching an action to the Redux store because that's important, your Redux flow in general needs to be synchronous.

* So you can't wait for some action to complete before you update your state. With Redux Thunk, that changes, your reducer still needs to be synchronous, so no async code must be in here but your action creator can now be asynchronous, this means that you now can send a request as part of your action creator and only once you're done with that, you actually dispatch the action to the reducer 

* However to use this new feature, we have to enable Redux Thunk and we do this in the app.js file.

```js
import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'; //import applyMiddleware
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk'; // ReduxThunk imported

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

// Now you use that in create store, there you can parse a second argument and there, you should call apply middleware as a function and to that function, pass Redux Thunk.
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
//This will now basically enable that package 

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
### Storing Products on a Server

* So in the create product action creator which currently is a function that just returns an action, we can now tweak this a little bit. Instead of returning an action, we can now return another function in there thanks to Redux Thunk, thanks to this package we can do this now and this will be a function which receives the dispatch function as an argument and then in turn needs to dispatch an action.


```js
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  // So in the create product action creator which currently is a function that just returns an action, we can now tweak this a little bit. Instead of returning an action, we can now return another function in there thanks to Redux Thunk,

   return async dispatch => { // async keyword here

     // where this action creator function does not immediately return an action object but instead, where it returns a function and if it does, Redux Thunk will step in and make sure that everything still works and if it returns a function, then this is a function which has to receive an argument, the dispatch function which will be passed in automatically by Redux Thunk, so Redux Thunk will in the end call this function for you


     // and then therefore you can then dispatch a new action and here, dispatch the actual action object which we previously wanted to dispatch but before you do that, you can now execute any async code you want and that will be allowed and will not break your Redux flow because Redux Thunk will take care about this


     // So now here we can send a HTTP request and in React Native, we can use the fetch API which is built-in and fetch here works basically like the fetch API in the browser where this also is available.

     // firebase will create products db and  store your data here Important and that's just a Firebase specific thing, you need to add .json here.


      // When you use async await by the way, this function here always will automatically return a promise, therefore this entire create product function now returns a promise.

      const response = await fetch('https://react-native-d033f.firebaseio.com/products.json', {
      //By default, this would send a get request but to store data Firebase wants a post request
      method: 'POST',
      // we need to set a header, we need to add the content type header 
      headers: {
        'Content-Type': 'application/json'
      },
      // We need to add a body with the data we want to append to this request and the data should be in the JSON format.
      body: JSON.stringify({
        // We won't ID as party of payload because actually Firebase will generate an ID for us here which is really convenient.
        title,
        description,
        imageUrl,
        price
      })
    });

    // React Native also supports the more modern async await syntax instead of then and catch. To use that, you add async here in front of your function, this async keyword

    // this response now can be kind of unpacked to get the data in there, so the response data, that's done by calling response.json, that's a method which is available on that response object we're getting.

    const resData = await response.json();
    
    // this will only be dispatched once above operations here are done.
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name, // then we are passing server resData.name as id 
        title,
        description,
        imageUrl,
        price
      }
    });
  }
    // So in here, in this return function, I now simply need to not return this but dispatch this action, that's the important difference 
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    }
  };
};

```
* So now in the products reducer, we can actually not use this dummy ID here but instead, expect that on our product data. There we now get an ID field which is the server-side generated ID

```js
switch (action.type) {
    case CREATE_PRODUCT:
    const newProduct = new Product(
        action.productData.id , //instead of dummy ID new Date().toString(),
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
    );
```
* So this adds a product but of course as soon as we reload the app, it's gone because in the app, it was only stored in memory. Now we also store it on a server but we're never fetching it from a server, so let's make sure we do that as well.

###  Fetching Products from the Server

* I want to make sure that when we for example visit the products overview screen, we simply reach out to the server and get all products from there, so that on this screen, whenever we visit it, we load the latest products.

```js
import Product from '../../models/products';

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    // any async code you want!
    const response = await fetch(
      'https://react-native-d033f.firebaseio.com/products.json'
    );
    // we didn't give GET method because its default fetch
    // no need headers also..
    const resData = await response.json();
    // We don't get back in array, we get back an object with unique IDs as keys and the values for these keys is then my object data and we just need to know that for handling it correctly.

    // So back in our action, this is how the response data looks like, of course in my app I work with an array though, so I need to transform this.\

    const loadedProducts = [];

    for (const key in resData) {
      loadedProducts.push(
        // what I add here in the end is just a new product, using the product model which you therefore need to import,
        // so make sure you have that import here pointing at your models folder and there at the product file and I create a new product here
        new Product( // here Product is model...
          key, // id
          'u1', //user
          resData[key].title, //title
          resData[key].imageUrl, //imageUrl
          resData[key].description, //description
          resData[key].price //price
        )
      );
    }
    
    dispatch({ type: SET_PRODUCTS, products: loadedProducts }); // we will receive this in our reducer
    // we are dispatching SET_PRODUCTS action with populated array loadedProducts
  };
};
```

*  let's now go to the products overview screen and make sure that there, we dispatch this fetch products action. 
* Now thankfully, I already get access to the Redux dispatch function there in products overview, so now I just need to add use effect so that I can fire this whenever this component loads.

```js
// store/actions/product
import React, { useEffect } from 'react';
import * as productsActions from '../../store/actions/products';

useEffect(() => {
    dispatch(productsActions.fetchProducts());
  }, [dispatch]);

// this effect should run whenever my component is loaded. So I can add an empty array and actually add my only dependency

// which I have which is dispatch, here that's the only dependency we define inside of our component, so that this will actually never rerun.

// The only time it will run is when this component is loaded and that's exactly what should be the case, whenever I will visit the screen, I want to fire this effect here.
```

* So the only missing thing is that we now go to the reducer and there, we can handle SET_PRODUCTS,

```js
import PRODUCTS from '../../data/dummy-data';
import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    SET_PRODUCTS // SET_PRODUCTS
} from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: //set products...
        return {
            availableProducts: action.products, //here action.products is product from action...
            userProducts: action.products.filter(prod => prod.ownerId === 'u1')
        };
        case CREATE_PRODUCT:
        const newProduct = new Product(
            action.productData.id,
            'u1',
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
            state.userProducts[productIndex].ownerId,
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
###  Displaying a Loading Spinner & Handling Errors

* Before we continue with updating or editing the data or deleting it, let's also make sure however that we don't see the dummy data here initially but that we actually see a loading spinner and maybe also a message if there is no data to be loaded or an error message if we have an error and for that, let's start with the loading spinner. 

* I want to show a loading spinner whilst we're waiting for data to arrive. For that we first of all need to know whether we're loading or not and we can control that with use state, so with an internal state in this component.

```js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator, // react-native spinner automatically look good for IOS and android
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false); // isLoading is false
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    // to use  asyc await we should wrap this inside function like below
    const loadProducts = async () => { // async here
      setIsLoading(true); // while started fetching setIsLoading to true
      await dispatch(productsActions.fetchProducts()); // await here
      setIsLoading(false); // after fetch again move this to false
    };
    loadProducts(); // then we can call load products
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };
  // isLoading is true show spinner 
  if (isLoading) {
    // we can use color to our ActivityIndicator spinner
    return (
      <View style={styles.centered}> 
        <ActivityIndicator size="large" color={Colors.primary} /> 
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    // we can use color to our ActivityIndicator spinner
    return (
      <View style={styles.centered}> 
       <Text>No Products found. May be start adding some!</Text>
      </View>
    );
  }


  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
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
    headerRight: (
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

const styles = StyleSheet.create({
  // align items centre
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default ProductsOverviewScreen;

```
* In case if we get some error in our fetch api we will get infinite spinner why ?? if we console response of wrong url

* we don't see anything being logged from this, we just get a promise rejection warning at some point of time, so it looks like we're simply getting an error and right now, we're not handling an error.

* Now if you would be using promises without async await, you would simply add catch statement. Here we are using async await so what we do is we wrap this into a try block, all that code which we ultimately want to run if everything succeeds and catch any errors here, so a try catch block. That is where we get a potential error and now with that error gotten here, we can handle it,

```js
export const fetchProducts = () => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(
        'https://rn-complete-guide.firebaseio.com/products.json'
      );

      // and in addition to just having try catch around this, we should actually also add another check here before we unpack the response body, we should also check if response okay

      // this simply is true if the response is in the 200 status code range. If it's in a different range, for example because you're not authenticated or anything like that, then the fetch API by default would not throw an error.

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
```
* But the place where I ultimately want to handle it is my component here, my screen component because there, I then want to show an error message

```js
// ProductsOverviewScreen 
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(); // initial empty error 
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

// Now however it also needs to be a dependency and therefore to avoid an infinite loop,
// it should be wrapped in useCallback, so let's import useCallback here and wrap this around this function here
// where the dependency then is my dispatch function, you can also add set isLoading and set error
// but all these functions will never change, therefore you could also omit them and therefore this will never be recreated which is good.

  const loadProducts = useCallback(async () => {
    setError(null); // setError as null
    setIsLoading(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message); // setError message
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]); // added setIsLoading, setError as 

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]); // useEffect should get called when click loadProducts

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  if (error) { // if error message we can manual trigger loadProducts by clicking  Try again
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
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
    headerRight: (
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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default ProductsOverviewScreen;

```
### Setting Up a Navigation Listener

* In case if we change something in our DB and then if we go to our product screen we should see the updated changes but its not visible.. why?? if I go back to the products overview screen because in there, we have this effect which should run whenever this component gets rendered, right??

* There we have this effect and this should run whenever the component gets rendered and it does !!! but the problem is the way React navigation, our navigation library works is such that our different screens which we go to with the drawer are actually all kept in memory so to say, they're not recreated just because we don't see them and then we come back. (drawer stack)

* Drawer - Instead they're created once when the app launches basically or when we first visit them but they're not recreated thereafter.

* It's a different thing for stack navigation, if I go to the card, this is loaded, if I leave it, it's destroyed, if I come back it's recreated but not for this drawer navigation and that's just how it works.

* So how can we refetch this whenever we reach this page? The answer is simple, you can set up a listener to navigation events and we can do that with another use effect call here

```js
// this listener which will reload our data but it doesn't fire initially because this will only be attached after the component rendered the first time, this is after willFocus fired though.

// So now we do this whenever we revisit this page 
useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus', // willFocus - Refer : https://reactnavigation.org/docs/3.x/navigation-prop
      loadProducts  // callback functon when willFocus done
    );

    return () => { // clean up function
      // this runs whenever this effect is about rerun or when this component is destroyed
      willFocusSub.remove(); 
      //then here we use willFocusSub and you can simply call remove here and this will get rid of the subscription
      // once this component is basically unmounted or whenever it will rerun because load products rebuilds which shouldn't really happen.
    };
  }, [loadProducts]); // dependency...

  // So to also fetch the products initially, we need this extra use effect call but with that we fetch it initially and we'll also refetch it

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);
```
* Refer : https://reactnavigation.org/docs/3.x/navigation-prop

### Updating & Deleting Products
* Now we know how we can store and fetch data, of course in our app, we can also edit and delete data however.

```js
export const updateProduct = (id, title, description, imageUrl) => {
  return async dispatch => {
     const response = await fetch(
      `https://react-native-d033f.firebaseio.com/products/${id}.json`, // since this is update now we want to point out specific product
      // this ${} syntax and that's vanilla Javascript, not specific to React Native
      {
        method: 'PATCH', // Put will fully override the resource with the new data, 
        // patch will update it in the places where you tell it to update it and that's what I want here.
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
```
* So this is how we can update data, now what about deleting? 

```js
export const deleteProduct = productId => {
  return async dispatch => {
    await fetch(
      `https://react-native-d033f.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE'
      }
    );
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};
```
### Handling Additional Errors

* there are two things missing. 

* One is store order in server 

* The other thing is of course that we only show a loading spinner here and we also only handle errors here. On the admin screen if something goes wrong, we get no error, also here if we edit this and we submit this, we see no loading spinner whilst we're waiting for this to be submitted.

* So here on the edit product screen when we dispatch updating or creating, in both cases this of course takes a while and indeed we get back a promise here because both in the update and create product action, we're using the Redux Thunk feature of returning an async dispatch function here which therefore returns a promise which therefore is returned as part of our dispatch function call here.

* So therefore we actually get the information, whether we're waiting for the response, whether we got an error or whether we're done, we just need to use it and of course we can use it in a similar way we did before, with use state imported from React and then by managing the loading and the error state here.

* Side note, you could of course also work with a reducer where you merge both states together if you wanted to with the help of the use reducer hook.

```js
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';

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

const EditProductScreen = props => {
  // initial error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  // Use effect here should rerun whenever error changes,

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]); 

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    // now we just need to set this as we're dispatching actions or as we're getting errors.
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        // we first of all need to wait for dispatching to be finished.
        // Now we can therefore turn this into an async function again, just so that I can use to await keyword 
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      // Now also important, if we get an error, I don't want to navigate away. So to avoid that this happens, I want to make sure that here, this props,
      // this navigation here actually only is performed if we don't end up in this catch block.
      props.navigation.goBack();
    } catch (err) {
      // now we just need to set this as we're dispatching actions or as we're getting errors.
      setError(err.message);
    }

    setIsLoading(false); // So now we can await for both dispatches to finish, of course only one
    // of the two will run because that's an if condition but we can wait for that to finish and therefore after this if block, we know that will be done dispatching so here we can set isLoading back to false.
    
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

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

  if (isLoading) {
    // to show loading spinner we need to use ActivityIndicator
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditProductScreen;
```
### Storing Orders

```js
// action/store
export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
  return async dispatch => {
    const date = new Date();
    // string order in DB
    const response = await fetch(
      'https://react-native-d033f.firebaseio.com/orders/u1.json',
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
    // Once after store dispatch
    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name, // once we're done, we get back our response data which will include that automatically generated ID
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });
  };
};
```
### Displaying an ActivityIndicator

* Now of course when storing an order, it would also be nice if we see a little spinner here when we click the order now button until this is done 

* when we click this button, and order, add order will return a promise in the end thanks to our change, so dispatch will therefore return a promise, so it's here where we can control our loading state.

```js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const sendOrderHandler = async () => { // sendOrderHandler
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler} // sendOrderHandler called here
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;

```
###  Fetching Stored Orders

```js
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://react-native-d033f.firebaseio.com/orders/u1.json'
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
```
* Dispatch action

```js
//OrdersScreen
import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    Platform,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
        setIsLoading(false);
        });
    }, [dispatch]);

    if (isLoading) {
        return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
        );
    }

    return (
        <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
            />
        )}
        />
    );
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
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
        )
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrdersScreen;

```
### Adding "Pull to Refresh"

* pull to refresh - Let's say I went to be able to fetch all the products from inside this page, so without leaving it and coming back which will fetch the latest products but from inside this page by simply using this pull to refresh pattern where you drag down and then it reloads. Thankfully that's really easy to do in React Native

* if you're using flat list or a scroll view because it's built into these components. Here in the products overview screen on flat list, you can implement it by simply adding to props to the flat list. The first prop is on refresh,

```js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true); // only when we pull changes
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false); // only when we pull changes
  }, [dispatch, setIsRefreshing, setError]); // setIsRefreshing, setError dependency

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  // below useEffect will get called only during initial load
  useEffect(() => {
    // setIsLoading only for initial load
    setIsLoading(true);
    loadProducts().then(() => {
       // where we trigger load products when the component loads and then here, using this then syntax, set this to false once we're done.
       // We can do that because load products will return a promise from above loadProducts because it's having this async keyword, therefore it returns a promise and with that

       // we get the loading spinner when this initially loads but not when it reloads and that also means that when we visit this page, we don't see the spinner but that might be fine.

      // We have some content on there anyways and if that then updates after visited this page, that might be okay. 
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts} // onRefresh - Now by adding this, we automatically get this functionality
      // also get an error, that the refreshing prop must be set because that's the other thing you always have to set when you add on refresh.

      refreshing={isRefreshing} // isRefreshing 

      // because that's the other thing you always have to set when you add on refresh. Setting on refresh automatically 
      // unlocks all this behavior and also this nice spinner you get by default, React Native will do all of that for you
      //but it only does so if you also add the refreshing prop. The refreshing prop is required to let React Native


      // this should therefore point at variable, at a stateful variable, so at some state which indicates whether you're currently loading or not and of course that's great because we have our isLoading prop here

      // so that does tell us whether we're loading or not. We'll just have one problem, if we're loading, I replace the entire content of the ActivityIndicator and that's of course not what I want to do for reloading. 
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
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
    headerRight: (
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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default ProductsOverviewScreen;
```
