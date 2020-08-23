## THE SHOP APP

### Creating the Basic Project Setup

* we'll definitely need navigation and hence I'll add a navigation folder so that I can store my navigation configuration there and that's of course just one possible setup,

* We created folders for contants to have color constants ect..

* We created folders for screens (user, shop), components and redux store

* shop -> ProductsOverviewScreen -> we see when the app loads where we have all the products to work with and where we can then select a product or directly add it to the cart.

* shop ->ProductDetailScreen

* shop ->CartScreen

* shop ->OrdersScreen

* user ->UserProductsScreen - where I see a list of all the products that belong to that user 

* user ->EditProductsScreen - which is the screen we'll use for adding new products or for editing existing products,

* Install other dependencies

```js
npm install --save redux react-redux react-navigation react-navigation-header-buttons
```
* I will also already add React navigation-header buttons because I will add header buttons here and I want to have these nicely styled and positioned buttons without having to do all that styling positioning on my own and that should be it for now.

* Now besides these packages, we also need to install two other packages with the help of the expo install command

```js
expo install react-native-gesture-handler react-native-reanimated
```

### The Products Overview Screen

```js
import React from 'react';
import { FlatList } from 'react-native';

const ProductsOverviewScreen = props => {
  // I of course want to render my flat list, I want to render my flat list of products. Now of course, we have no products yet but we can add some
  return (
    <FlatList/>
  );
};

export default ProductsOverviewScreen;

```

* Now of course, we have no products yet but we can add some. Just as before, I will therefore add a models folder where I can define how a product should look like. This is not a must do but it can help you organize your data and make sure that you never accidentally work with different types of products, where you simply forgot to add a certain property in one place of your app.

```js
//models/products.js
// here I define how a product should look like
class Product {
    constructor(id, ownerId, title, imageUrl, description, price) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}

export default Product;
// we will use this model in dummy data
```
* With that set up here, we have a blueprint for a product and we will use then in Redux and we will then in the end get such a list of products here in our products overview screen. 

* Now to get it there, we need to tap into Redux and for that to be possible, we need to set up Redux. So let's go to the store folder now and in there, I want to have an store -> actions subfolder and store -> reducers subfolder, in this app by the way we will have different reducers and actions,

```js
//reducers/products.js
import PRODUCTS from '../../data/dummy-data';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};
//Now in the reducer here which is a function where we get the state which should be initialized with our initial state and should take this as a default value
export default (state = initialState, action) => {
    return state; // always return updated state in the end
};
```
 * and where we get an action, in there we will later handle different action type so that we can for example add a new product and so on. For the moment I'll just always return my state here and therefore I will always return my initial state of course and that will allow us to then tap into Redux and at least get that initial state.

 * with that our reducer for the products is set up here. we can ignore the products actions for the moment, we'll of course add some later and now we can go to the app.js file and set up Redux there as well.

 ```js
 //app.js
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import productsReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
        <View>.. ..</View>
    </Provider>
  );
}
 ```
 * Now this something we need to import from Redux here and that is of course the create store function and the combined reducers functions

 * so that we can create one root reducer. At the moment of course we have only one reducer but as I mentioned in this app, we will actually have multiple reducers in the end, so here you definitely need to combine your reducers and from React Redux,

 * we need the provider component which we wrap around our app to provide something. for the provider component, of course
we have to set the store prop and set this to the store constant or the store in general we're creating here. With that, Redux should be set up, with that we'll later be able to tap into it here from the products

### Setting Up a Navigator

```js
import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux'; // this will allow us to tap into the Redux store and get our products from there.

const ProductsOverviewScreen = props => {
  // use selector takes a function which automatically receives the state, the Redux state as an input and which then returns whatever data you want to get from there and there in the Redux state
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id} // newer version react don't need keyExtractor...
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
        />
    );
};
export default ProductsOverviewScreen;

```
* With that, talking of the screen, it's of course time to set up the navigator so that we can really see something on the screen and that we have screens.

```js
//navigation/ShopNavigator.js
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
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

export default createAppContainer(ProductsNavigator);
```
* This is now the export navigation set up and this is what we can now use in app.js

```js
//App.js
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

export default function App() {
  // here we used ShopNavigator inside Provider
  return (
    <Provider store={store}>
      <ShopNavigator />  
    </Provider>
  );
}
```
* On loading this we did see navigation header title lets add that in ProductsOverviewScreen
```js
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.title}</Text>}
        />
  );
};

ProductsOverviewScreen.navigationOptions = { // here we added navigation title
  headerTitle: 'All Products'
};

export default ProductsOverviewScreen;
```
### Styling the Product Items

* Instead of just showing simple Text as product let style with a seperate Product Items component (components->shop->ProductItem)

```js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Colors from '../../constants/Colors';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) { // based on OS and version we are apply..
    TouchableCmp = TouchableNativeFeedback;
  }
// here we wrapped Touchable component and onpresseing that will call onViewDetail
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onViewDetail} useForeground> 
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={props.onViewDetail}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={props.onAddToCart}
              />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 4
  },
  price: {
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  }
});

export default ProductItem;
```
* Let us use this ProductItem component in our ProductOverviewScreen

```js
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem'; // we imported ProductItem

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
};

export default ProductsOverviewScreen;
```
* Let us add product Details screen

```js
//ProductDetailScreen
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId'); // we are getting productId which we will pass from ProductOverview screen
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle') // we are getting productTitle which we will pass as params 
  };
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;

```
* the first thing I want to do is adjust the navigation and for that in the ShopNavigator.js file in the navigation folder, we can import the product detail screen

```js
// Navigation/shopNavigator
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen, // This will be our starting screen because this is the first key-value pair,
        ProductDetail: ProductDetailScreen // this is a screen we can go to though, we can navigate to and to go there, we need to go to our products overview screen and when we click on view detail, this is in the end the signal that we want to go to that product detail screen.
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

export default createAppContainer(ProductsNavigator);

```
* when we click on view detail, this is in the end the signal that we want to go to that product detail screen.

```js
// ProductsOverviewScreen
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', { // here onPress onViewDetail call ProductDetail with param
              productId: itemData.item.id, // forwading productId to ProductDetail we are trying to get above
              productTitle: itemData.item.title // forwading productTitle to ProductDetail which we are trying to get above
            });
          }}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
};

export default ProductsOverviewScreen;

```
### Working on the Product Details Screen
* Now its time to work on the Product Details screen

```js
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );

  // here we output image , description, price and button to cart....
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default ProductDetailScreen;
```
###  Using Custom Fonts

* In assets folder we have fonts now we have to load that in app.js folder

* Make sure you installed "npm install --save expo-font"

```js
import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font'; // import expo-font

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

//Font.loadAsync to load fonts asynchronously..
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false); // initailly fontLoaded state false

  if (!fontLoaded) {
    return (
      <AppLoading // fallback untill font loaded
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

* Now our fonts get loaded and now we can use them 

```css
description: {
    fontFamily: 'open-sans-bold',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
```

* Like above where-ever its possible

* Now that's not all actually, in the shop navigator in my main navigator here, in the default navigation options, I also want to use that font in the header, so the header title style here should actually be an object where I set the font family to open-sans-bold

```js
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTitleStyle: { // here we used as default option for open-sans-bold
        fontFamily: 'open-sans-bold'
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans' // here we used as default option for open-sans-bold
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(ProductsNavigator);

```
### Adding Items to the Cart

* more important first step is that we add the logic to manage cart items and that involves Redux.

* I'll add a brand new reducer, a second reducer which I'll name cart, cart.js and also an actions file

```js
//actions/cart.js
export const ADD_TO_CART = 'ADD_TO_CART';
// add to cart which receives let's say the full product object which I want to add, so that I can pull out the information I need
export const addToCart = product => {
  // here we are passing  ADD_TO_CART type with product as payload
  return { type: ADD_TO_CART, product: product };
};
```
* lets add reducers before that we need cart item model to

```js
//model/cart-item.js
class CartItem {
  constructor(quantity, productPrice, productTitle, sum) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;

```
* Now lets add cart reducer logic 

```js
import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product; // pull product out of action
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // if already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,    //Existing Qty + 1 = totalQty
          prodPrice,                                    //Price
          prodTitle,                                    //Title
          state.items[addedProduct.id].sum + prodPrice  //Existing sum+ added prod price = totalSum
        );
      } else {
        // If we newly add this item to cart
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice); //Qty, Price, Title, TotalSum
      }
      return {
        
        ...state, // One other side note, copying the state here of course is always redundant because you always set both items and total amount. So if you always only have these two fields in here and you always change the both, you don't need to copy the existing state, but in future if you add another piece of data to your state  this might need ... now its not needed not necessary...

        // however, you need to copy your old state so that you don't lose that additional data. Hence here I will leave that copying functionality even though we don't technically need it here but if we ever should change our state where saved and we don't forget to copy it and we therefore lose data.

        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem }, // {..existing state items, [id] : updatedOrNewCartItem}
        totalAmount: state.totalAmount + prodPrice // Grand cart total
      };
  }
  return state; // return new state which is used by redux
};
```

* we can start dispatching this action and of course, I want to dispatch it from the product overview and the product detail because in both screens, I have add to cart buttons.

* So let's start on the products overview screen, there to dispatch Redux actions

```js
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart'; // import cart actions

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch(); // we need to include the use dispatch hook here,
// with that here we can simply get access to this dispatch function by calling useDispatch function

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
          }}
          onAddToCart={() => {
            // now when we click on add to cart down there, we can dispatch our action here
            dispatch(cartActions.addToCart(itemData.item)); 
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
};

export default ProductsOverviewScreen;

```
* in the product detail screen. Therefore we do the exact same thing, we import use dispatch from React Redux, therefore here we can get access to the dispatch function by calling use dispatch

```js
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart'; // import cart actions

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch(); // we need to include the use dispatch hook here,
// with that here we can simply get access to this dispatch function by calling useDispatch function
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            // now when we click on add to cart down there, we can dispatch our action here
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default ProductDetailScreen;
```
* This hopefully dispatches actions such that the item is added to the cart but of course right now we can't confirm this.Well actually we can. You can spin up React Native debugger 

* Open react debugger tool in your system

* them in your emulator if it is IOS click CMD+D this will open some menu in that select "Remote debug" on select it will open a tab on the chrome the in your react native debugger tool open new window with CMD+T and then close chrome remote window then once referesh your emulator then you could see remote debugger tool enabled...

* now this should connect here and now not only can you inspect your app here as I explained it earlier, no, you can also have a look at the part up there and that is your Redux debugger,

* there you can see what Redux is doing for you. The only thing you have to do for this to make it work is install a new package with 

```js
npm install --save-dev redux-devtools-extension
```
* make sure you connecte store with the change in app.js
```js
import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // we imported composeWithDevTools with dev only mode so no need to remove this for production mode

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer, composeWithDevTools());// then while createStore invoke composeWithDevTools also

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
* reload and connect to proper port of react native debugger like 19002 and the reload your app again

* Now you could see @INIT at the top of the react native debugger screen.

* If I now click on to cart here, you'll also see the add to cart action and now here, you can view details about that action like the data that was attached to it and about your state

* where is my cart state? Well that's of course missing because whilst we have the reducer in the action set up, in the app.js

```js
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart'; // here

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer // here
});
```
* Refer image : Redux/Redux2

* with that working, of course we can now work on adding an action button at the top right header and make sure we can go to the cart page from that or with the help of that action button

### Implementing Header Buttons

* To add the action item to the header, I'll do something which I did in the navigation section as well, in the components folder,I want to add my own header button and now for this, I'll add a new subfolder in there which I'll name UI

* before that make sure we installed "npm install --save react-navigation-header-buttons" and "npm install --save @expo/vector-icons"

```js
//component/UI/HeaderButton
import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props} // we should forward all the props we get as part of CustomHeaderButton param
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
  );
};

export default CustomHeaderButton;

```
* Now we can use that to add an icon here on the products overview screen,navigation options

```jsx
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton'; //custom headerbutton
...
...

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerRight: ( // right of the header
      // here we are providing our custom header component to react-navigation-header
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
              navData.navigation.navigate('Cart') // On Press we want to naviagte to cart screen
          }}
        />
      </HeaderButtons>
    )
  };
};
```
* Lets add cart sceen details before that lets design our cart iteam for flatlist 

### Design Cart Items
```js
//component/shop/CartItem
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default CartItem;
```
* Now we can use this CartItem in our cart screen.
### Cart Screen
```js
import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount); // fetching TotalAmount from redux
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
        return transformedCartItems;
    });

    return (
        <View style={styles.screen}>
        <View style={styles.summary}>
            <Text style={styles.summaryText}>
            Total:{' '}
            <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
            </Text>
            <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            />
        </View>
        <FlatList
            data={cartItems} // transformedCartItems
            keyExtractor={item => item.productId}
            // renderItem
            renderItem={itemData => (
            <CartItem
            // we used the below props for CartItem  component
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                amount={itemData.item.sum}
                onRemove={() => {}}
            />
            )}
        />
        </View>
    );
    };

    const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row', // to position items in one row.
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
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
### Adding Logic to Delete Items

* For the delete button, let's again start with the Redux logic.

```js
//actions/cart.j
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'; // here REMOVE_FROM_CART

export const addToCart = product => {
  return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = productId => {
  return { type: REMOVE_FROM_CART, pid: productId }; // here type and pid is payload 
};
```
* Next in reducer 

```js
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };
    // now we simply need to add another case here and that case is the remove from cart case.
    case REMOVE_FROM_CART: // REMOVE_FROM_CART
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1, // reduce just 1 qty
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice // reduce just 1 qty price
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        // erase it completely from cart
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
  }

  return state;
};
```
* So let's go to the cart screen where I in the end have this on remove function and there, I now want to dispatch an action, so I will need access to the dispatch function with the help of the use dispatch hook

```js
import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; // import useDispatch to dispatch actions

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart'; // imported cart actions here

const CartScreen = props => {
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
    return transformedCartItems.sort((a, b) => // sorting based on product id 
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId)); // here we dispatch removeFromCart action with productId payload
            }}
          />
        )}
      />
    </View>
  );
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
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
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
### Adding Redux Logic for Orders

* To make sure that we can also have orders in this application, we'll repeat something we did before, we'll work on the orders screen and we'll work on our Redux logic so that we can store orders.

* Before that lets decice our order model

```js
class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}

export default Order;
```
* Actions...
```js
//store/actions/orders
export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount }
  };
};
```
* Order Reducers...

```js
//store/reducer/orders
import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order( // Order is model class name
        new Date().toString(),  // for Unique id timebeing we added date later in db it will be automatically generated
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      // would want to make sure you copy the other state so that you don't lose it.
      // That's why I add it here and then I set orders equal to state orders and now call concat on this array
      // which is a built-in Javascript function that adds a new item to an array and returns a new array that
      // includes that item.
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
      // So the old array stays untouched, the new array is returned and that of course allows us to update this in an 
      //immutable way where we never touch the original data but we set the new state by creating a brand new array that 
      //includes the new object and there I simply concatenate my new order.
  }

  return state;
};
```
* finally lets add orderReducer to our combineReducers in App.js

```js
import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders'; // order reducer
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer // order reducer
});

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
* Now this should be a available and now we can dispatch actions, namely here our add order action, now the goal is to place an order and also clear our cart. 

```js
import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
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
  const dispatch = useDispatch(); // to dispatch action call useDispatch function

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount)); // addOrder dispatch
          }}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
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
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
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
### SideDrawer & The Orders Screen

```js
// screens/shop/order
import React from 'react';
import { FlatList, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux'; // data we need should come from redux
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

const OrdersScreen = props => {
   // state.orders => orders is the name we assinged in combine reducer
   // state.orders.orders => 2nd orders is the name we assinged in reducer file which is actual array of orders

    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
        />
    );
};

// hamburger menu button
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
        ),
    };
};

export default OrdersScreen;
```
* Let us use this order screen in ShopNavigator , now here the important thing is I don't want to add it to this stack navigator because it's not part of this stack, instead I want to reach it with a menu, with a side menu.

```js
import React from 'react';
//  because now you are using components with that jsx syntax. As you know, jsx is compiled or converted to React.createElement in the end and therefore you need to import React for this syntax to work here.
import {
  createStackNavigator,
  createDrawerNavigator, // side navigator drawer
  createAppContainer
} from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen'; // imported OrdersScreen
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
    // Need need icons next our order and product icons in side drawer and adding these icons is actually very simple,

    //On ProductsNavigator and OrdersNavigator we need to add navigation option not default navigation option
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons // makesure we import Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
          // in addition to that, set a color if you wish to and now of course, that should not be colors primary because then this icon would always have that color, instead this color should be assigned by the drawer which is the thing that knows if the item is selected or not and which will change the color appropriately. So here, you should access drawer config.TintColor and this tells you which color this should have at the moment and this tint color will change dependingon whether this is currently selected or not.
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);
//  I'll create a new orders navigator here where I create another stack navigator and there,the
// only mapping I need is orders which points at orders screen,
const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    // Need need icons next our order and product icons in side drawer and adding these icons is actually very simple,

    //On ProductsNavigator and OrdersNavigator we need to add navigation option not default navigation option
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
          // in addition to that, set a color if you wish to and now of course, that should not be colors primary because then this icon would always have that color, instead this color should be assigned by the drawer which is the thing that knows if the item is selected or not and which will change the color appropriately. So here, you should access drawer config.TintColor and this tells you which color this should have at the moment and this tint color will change dependingon whether this is currently selected or not.
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);
// Now of course the goal is to create a drawer navigator which I'll name shop navigator overall because it combines different shop features you could say with the help of create drawer navigator. There I now want to merge these two stacks,the products navigator and the orders navigator into it,

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

// Now this combined ShopNavigator we are returning here
export default createAppContainer(ShopNavigator);
```
* we should above hambuger menu in product screen also

```js
ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: ( // here
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

export default ProductsOverviewScreen;
```
### Clearing the Cart
* we are dispatching this add order action in the end. Now of course, this action is currently handled in our orders reducer but we're not limited to handing it there, 

* !!!!!!! it's important to understand that every Redux action you dispatch reaches every reducer because how would the action know to which reducer it belongs?

* So the add order action can also be handled in the cart reducer, alternatively you could dispatch a separate clear cart action if you wanted to but if you don't need that anywhere else, there's not really a strong reason to create a separate action. 

```js
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
      // clear state in cart reducer after order
    case ADD_ORDER:
      return initialState;
  }

  return state;
};
```
### Styling Order Items

* Instead of just show order totalAmount lets design order items 

```js
//Component/shop/OrderItem
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888'
  }
});

export default OrderItem;

```
* Lets use this order Item component in our order screen

```js
//screens/shop/OrdersScreen
import React from 'react';
import { FlatList, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.date} // this will throw error won't work date 
            // Now this refers to objects not being valid as React should and shows us that in the end, it's the state object it's having a problem with and that makes sense because date in our order when we create it here in our Redux store is a date Javascript object.
            // Now we can't output this as text like that.
            // To output it, we can go to our model 
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

export default OrdersScreen;

```
* To output date like text we need to do some changes in model

* we can go to our model though here, which is in the end the blueprint we use for creating the orders and in the order model

* we can add a method to this model or to be precise, a getter which is a default Javascript feature of modern Javascript.

```js
class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  // So here, we can use the get keyword and then any name of your choice like readable date
  get readableDate() {
    // toLocaleDateString - which is a built-in Javascript method we can use on date objects to convert this object to a human readable date.

    // There we pass in the language for which we want to optimize it like this for example and now we can configure this with a second argument which is a Javascript object.

      return this.date.toLocaleDateString('en-EN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      });
  }
}

export default Order;
```
* Now we can use this in our orderscreen order Item as property

```js
// Screen/shop/orderScreen
 <FlatList
  data={orders}
  keyExtractor={item => item.id}
  renderItem={itemData => (
      <OrderItem
      amount={itemData.item.totalAmount} // totalAmount whis is from order model
      date={itemData.item.readableDate} // readableDate whis is from order model
      items={itemData.item.items} // items whis is from order model
      />
  )}
  />
```
* What you'll note on Android by the way is that this date isn't displayed correctly (wrong format),so that's another thing we need to fix.

* Now the reason for that not being displayed correctly is how React Native works internally, which Javascript engine it uses internally and the one it uses for Android there or on Android platforms does simply not support this nice to locale date string method I'm using here.

* The engine used on iOS does but on Android,So what can we do on Android to fix this?

```js
npm install --save moment
```
* This is a third-party library that will work on both platforms which makes formatting dates also super simple.

* Now with that installed, you import everything as moment from moments and from the library you just installed and now you can use it in this file

```js
//model/order
import moment from 'moment';

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    //   return this.date.toLocaleDateString('en-EN', {
    //       year: 'numeric',
    //       month: 'long',
    //       day: 'numeric',
    //       hour: '2-digit',
    //       minute: '2-digit'
    //   });
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Order;
```
Moment Js : https://momentjs.com/docs/#/displaying/format/
Date toLocaleDateString : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

### Making the "Show Details" Button Work

* Pressing the detail button here in the order items should expose all items we have and for this I want to use the cart item here.

* One way of doing this is to handle some internal state here with the help of the use state hook which we import from React where we control whether we're currently viewing the details or not.

```js
import React, { useState } from 'react'; //useState hook used to change showDetails
import { View, Text, Button, StyleSheet } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false); //initial state as false

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'} // change btn text based on state
        onPress={() => {
          setShowDetails(prevState => !prevState); // then we are updating state to true and vice versa
        }}
      />
      {showDetails && (
        // based on showDetails we are showing CartItems here...
        <View style={styles.detailItems}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
});

export default OrderItem;
```

* Now the cart item if you have a look took the quantity and the title as inputs and it also wanted the amount. In addition, we had the delete button there which I don't want on the order item, so we have to do something about that

```js
// component/CartItem
{props.deletable && (
  <TouchableOpacity
    onPress={props.onRemove}
    style={styles.deleteButton}
  >
    <Ionicons
      name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
      size={23}
      color="red"
    />
  </TouchableOpacity>
)}
```
* Remove btn will be visible only for deletable props

* To make this visible we need to send this props in cart screen

```js
//Screens/cartScreens
<FlatList
  data={cartItems}
  keyExtractor={item => item.productId}
  renderItem={itemData => (
    <CartItem
      deletable
      quantity={itemData.item.quantity}
      title={itemData.item.productTitle}
      amount={itemData.item.sum}
      onRemove={() => {
        dispatch(cartActions.removeFromCart(itemData.item.productId));
      }}
    />
  )}
/>
```
### Building the "User Products" Screen

*  it's time to move towards the last part of this application which is of course the part where you can add new products.

* To get started, the user product screen and the edit product screen will become important now because these are the screens where we see all our products and where we can also then edit the products. So let's start with the userProducts screen 

* We have no logged in user at the moment but if you remember the products reducer, there we are faking that we have because there we have that user products array which holds all the products which in this case here have a user ID, an owner ID of U1 

```js
import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    return state;
};

```
* Lets use this u1 userProducts

```js
//Screens/shop/UserProductsScreen
import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    return (
        <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {}} // call when the item in general is tapped as of nothing 
            >
            // here we passed Button as {props.children}... soon we will do corresponding changes in ProductItem
            <Button color={Colors.primary} title="Edit" onPress={() => {}} /> 
            <Button
                color={Colors.primary}
                title="Delete"
                onPress={() => {
                dispatch(productsActions.deleteProduct(itemData.item.id));
                }}
            />
            </ProductItem>
        )}
        />
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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

export default UserProductsScreen;

```
* Let us use this screen in our navigation as AdminNavigator

```js
import React from 'react';
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
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

const AdminNavigator = createStackNavigator( // here we created new createStackNavigator
    {
      UserProducts: UserProductsScreen
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
    Admin: AdminNavigator // here we used  AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(ShopNavigator);

```
### Reorganizing the ProductItem Component

* Currently in our product item component here in the components folder, the buttons are part of the component, so is the wrapping touchable component.

* In admin screen here, I also want the items to be touchable but I want to go to my edit screen in that case. I also want to have two buttons - one for editing and one for deleting but of course the captions and the actions should be different.

* Now we could pass in this caption text in productItem component as props and rename the props we trigger when the buttons are pressed in a more generic way, so that that we could use it for viewing the details on the products overview screen and for editing or deleting on the user product screen. 

* There also is an alternative way of handling this.

```js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
    // here we changed to props.onSelect
    // instead of button here we changed to  {props.children} we will get btn as props.children
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  }
});

export default ProductItem;
```
* before making changes in user product screen let us do changes in productOverview screen

```js
//screen/shop/productOverview
import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => { // here we are passing product to selectItemHandler
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };
  // now go to your ProductItem and change it from a self closing component to a component which you've close and open with your own component tags. In between these tags, you can now re-add these two buttons
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
        // and now of course, don't use props on view detail and props on add to cart here but instead, add your logic right here because now we're dynamically passing this in the product item component but therefore we're able to pass different buttons depending on where we use that product item component. 

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
              dispatch(cartActions.addToCart(itemData.item)); // here we are dispatching delete action
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

export default ProductsOverviewScreen;
```
### Deleting Items

* So now with the product item component reorganized, it's time to be able to let's say delete the items lets start with redux action

```js
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};
```
* Now we have to do changes in reducer for delete product.

```js
//reducer/products.js
import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
            ...state,
            userProducts: state.userProducts.filter(
                product => product.id !== action.pid // filtering action.pid 
            ),
            availableProducts: state.availableProducts.filter(
                product => product.id !== action.pid // filtering action.pid 
                ),
            };
    }
    return state;
};
```
* This is one change we need to make, another change needs to be made in the cart however because when we delete a product, it should be removed from the cart as well because otherwise we have a product in the cart which doesn't exist anymore.

```js
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT: //DELETE_PRODUCT
      if (!state.items[action.pid]) {
        return state; // if pid not there in the state just return state
      }
      const updatedItems = { ...state.items }; //filter items ==> updatedItems
      const itemTotal = state.items[action.pid].sum; //sum(itemTotal) value of the deleted item
      delete updatedItems[action.pid]; // delete product
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      };
  }

  return state;
};

```
### Adding Basic Editing & Navigation Logic

```js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

const EditProductScreen = props => {
    
    return (
        <View >
            <Text> The Edit Product Screen! </Text>
        </View>
    );
};

const styles = StyleSheet.create({
   
});

export default EditProductScreen;

```
* We need to register this in our navigator 

```js
const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen, 
    EditProduct: EditProductScreen  // here we added EditProduct
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
```
* Lets add edit product handler

```js
//screen/UserProductsScreen
import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => { // here...
      props.navigation.navigate('EditProduct', { productId: id });
    };

    return (
    <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => (
        <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
            editProductHandler(itemData.item.id);
            }}
        >
            <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
                editProductHandler(itemData.item.id);
            }}
            />
            <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
                dispatch(productsActions.deleteProduct(itemData.item.id));
            }}
            />
        </ProductItem>
        )}
    />
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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
        //add Product 
        headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
            title="Add"
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => {
                navData.navigation.navigate('EditProduct');
            }}
            />
        </HeaderButtons>
        )
    };
};

export default UserProductsScreen;
```

* Now to add new products, I want to go to the same screen but without passing in an ID and that will allow us to then find out whether we're in edit or add mode on that edit product screen by checking whether we have an ID or not.

### Handling User Input

* So to save the user input, we can use the use state hook from React and simply manage the state for each of these text inputs

```js
import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId'); // receive productId sent from UserProductScreen
    //each initialized to an empty string initially , if edit will get product from product id
    const editedProduct = useSelector(state => // useSelector to get product from prodId
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(
        editedProduct ? editedProduct.imageUrl : ''
    );
    const [price, setPrice] = useState(''); // only for add form
    const [description, setDescription] = useState(
        editedProduct ? editedProduct.description : ''
    );
    // useCallback will return a memoized version of the callback that only changes if one of the inputs has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders

    const submitHandler = useCallback(() => {
        console.log('Submitting!');
    }, []); // useCallback like this would actually recreate it everytime this re-renders, we need to pass in that second argument which should be an empty array, now this function will never be recreated and now we avoid an infinite loop.

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler }); //submitting  submitHandler through useEffect as param
    }, [submitHandler]);

    return (
        <ScrollView>
        <View style={styles.form}>
            <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={text => setTitle(text)} // onChangeText save state
            />
            </View>
            <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
                style={styles.input}
                value={imageUrl}
                onChangeText={text => setImageUrl(text)} // onChangeText save state
            />
            </View>
            {editedProduct ? null : (
            <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                style={styles.input}
                value={price}
                onChangeText={text => setPrice(text)} // onChangeText save state
                />
            </View>
            )}
            <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={text => setDescription(text)} // onChangeText save state
            />
            </View>
        </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit'); // get 'submit' param which is set in useEffect
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
            onPress={submitFn} // on press onPress submitFn
            />
        </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;
```
### Dispatching Actions for Creating & Updating

* we need to make sure that we now dispatch actions for creating a new product or for updating a product and therefore first of all we need to add these actions here in our actions folder.

```js
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price
    }
  };
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
* Now in the reducer we need to handler create and update user product

```js
import PRODUCTS from '../../data/dummy-data';
import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT
} from '../actions/products';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
        const newProduct = new Product(
            new Date().toString(),
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
        const updatedUserProducts = [...state.userProducts]; // copy fo userProducts
        updatedUserProducts[productIndex] = updatedProduct; // replace updatedUserProducts with productIndex
        const availableProductIndex = state.availableProducts.findIndex(
            prod => prod.id === action.pid
        );
        const updatedAvailableProducts = [...state.availableProducts]; // copy fo updatedAvailableProducts
        updatedAvailableProducts[availableProductIndex] = updatedProduct; // replace updatedAvailableProducts with availableProductIndex
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
* Now lets dispatch update/create event from inside edit product screen

```js
import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(
        editedProduct ? editedProduct.imageUrl : ''
    );
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(
        editedProduct ? editedProduct.description : ''
    );
    //  I use my use callback method here to wrap the submit handler right and I do this to avoid unnecessary recreations of the functions. The problem is I initially set this to have an empty array as a dependency list which means this never is recreated which made sense when we only had console log in there but now we're doing stuff in there and now we actually do have dependencies.

    const submitHandler = useCallback(() => {
        if (editedProduct) { //dispatch if editedProduct
        dispatch(
            productsActions.updateProduct(prodId, title, description, imageUrl) 
        );
        } else { //dispatch if create
        dispatch(
            productsActions.createProduct(title, description, imageUrl, +price) // here we added + before price variable just to convert this to number
        );
        }
        props.navigation.goBack(); // navigation goBack screen.. after add, update
    }, [dispatch, prodId, title, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
        <View style={styles.form}>
            <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={text => setTitle(text)}
            />
            </View>
            <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
                style={styles.input}
                value={imageUrl}
                onChangeText={text => setImageUrl(text)}
            />
            </View>
            {editedProduct ? null : (
            <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                style={styles.input}
                value={price}
                onChangeText={text => setPrice(text)}
                />
            </View>
            )}
            <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={text => setDescription(text)}
            />
            </View>
        </View>
        </ScrollView>
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
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});

export default EditProductScreen;
```
### Time to Improve the App!

* Let's start with the confirmation dialog here in edit product screen. We can simply import the alert API from React Native which allows us to show a nice alert

```js
import React from 'react';
import { FlatList, Button, Platform, Alert } from 'react-native'; // Here we imported Alert API
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', { productId: id });
    };

    const deleteHandler = (id) => {
      // this is deleteHandler...we will use in your button press event
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
        { text: 'No', style: 'default' },
        {
            text: 'Yes',
            style: 'destructive',
            onPress: () => {
              dispatch(productsActions.deleteProduct(id)); // here we need to forward id
            }
        }
        ]);
    };

    return (
        <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
                editProductHandler(itemData.item.id);
            }}
            >
            <Button
                color={Colors.primary}
                title="Edit"
                onPress={() => {
                editProductHandler(itemData.item.id);
                }}
            />
            <Button
                color={Colors.primary}
                title="Delete"
                // when the delete handler is called down there, we need to make sure it gets the ID. 
                // So there are two ways of doing that, an anonymous function in which we execute delete handler manually and forward itemData.item.id

                // onPress={() => {
                //  deleteHandler(itemData.item.id) 
                // }}

                // alternative is passing the delete handler like this but use bind to preconfigure any arguments this function will get. Bind always needs value for the this keyword inside of the function it'll execute. 

                onPress={deleteHandler.bind(this, itemData.item.id)}
            />
            </ProductItem>
        )}
        />
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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
            title="Add"
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => {
                navData.navigation.navigate('EditProduct');
            }}
            />
        </HeaderButtons>
        )
    };
};

export default UserProductsScreen;
```
* I want to optimize the product item a little bit more and the way we're reusing our card look here with the shadow and so on because we're using that in multiple components and if you find yourself using something in multiple components, you might always want to think about whether you can optimize this a bit more and indeed here, we have optimization potential.

* So how can we optimize this though?

* Well we could create a separate component here in our UI folder card.js where we just store this card look. A card component can be a very simple component in the end. 

```js
//component/UI/Card.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  // So now we can even set a style prop when we use our cart and pass in our own styles that will be merged together with these default card styles
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  }
});

export default Card;
```

* Now we can use this card component in our ProductItem component

```js
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Card from '../UI/Card'; // here we imported Card component

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  // still pass in my product specifics here in Card component
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  }
});

export default ProductItem;
```