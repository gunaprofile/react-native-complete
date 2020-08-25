## THE SHOP APP - Handling User Input

###  Configuring TextInputs

* we currently have a very basic input handling, we are at least fetching the user input and storing it with the help of the React state, with the use state hook, we're then feeding the  values back into the input and that's it. This allows us to capture and use the user input 

* we can improve how we do that, we can write this in a more reusable way and we're not doing any validation whatsoever, so these are the things I want to change in this module.

* In addition, we also are not configuring our inputs in any way, that means that right now all text inputs are equal. We don't change the type of keyboard we're presenting, we're not offering multiline input for example for longer texts like here for the description, none of that is happening and therefore let's actually start with configuring these inputs before we move on to validation and so on.

* One important configuration which you can add to your keyboards is the keyboard type. The keyboard type prop can be set and there you've got a couple of values available.

* As per the doc says he have android specific and IOS specific type we can choose either with platform check and third option is cross platform type..

* Hence, I will stick to the cross platform types, so that I don't have to add an extra platform check and there, typically for let's say normal text, we would stick to default which of course therefore is a type we don't have to assign

```js
<TextInput
      style={styles.input}
      value={title}
      onChangeText={text => setTitle(text)}
      keyboardType="default"
  />
```
* but that for example changes when we have a look at our price input. There I want to make sure that people only enter valid numbers, that they don't enter any text and therefore of course I want to show the right keyboard to help them with this

```js
 <TextInput
    style={styles.input}
    value={price}
    onChangeText={text => setPrice(text)}
    keyboardType="decimal-pad"
    />
```
* decimal pad is an input which allows the user to enter decimal numbers which is just what I want here for my price.

* So therefore setting this keyboard type here makes a lot of sense because now if we have a look at this price input here and I toggle the soft keyboard which you can do with the command k shortcut here on iOS or  hardware menu -> keyboard, -> toggle software keyboard, you see that now I got this decimal keyboard opening up

* we can do other configurations like 

```js
<TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect // autoCorrect= {false}
            returnKeyType="next" // keyboard close bth done or next button
            onEndEditing={() => console.log('onEndEditing')}
            onSubmitEditing={() => console.log('onSubmitEditing')}
          />
```
* Refer : https://reactnative.dev/docs/textinput

###  Adding Basic Validation

```js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert 
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

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : ''); // initial state
  const [titleIsValid, setTitleIsValid] = useState(false); // initial validity state
  const [imageUrl, setImageUrl] = useState( 
    editedProduct ? editedProduct.imageUrl : ''
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  );

  const submitHandler = useCallback(() => {
    if (!titleIsValid) { //if not valid don't submit just return with alert
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, description, imageUrl)
      );
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price, titleIsValid]); // we must add titleIsValid also as dependency, otherwise this function will not be rebuilt when that validity changes which means we won't be able to submit it thereafter. 

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const titleChangeHandler = text => { // titleChangeHandler
    if (text.trim().length === 0) {
      setTitleIsValid(false); // check IsValid
    } else {
      setTitleIsValid(true);
    }
    setTitle(text); // setTitle
  };
  // if titleIsValid failed show error message
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={titleChangeHandler}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onEndEditing={() => console.log('onEndEditing')}
            onSubmitEditing={() => console.log('onSubmitEditing')}
          />
          {!titleIsValid && <Text>Please enter a valid title!</Text>} 
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
              keyboardType="decimal-pad"
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
* Now since we used Javascript here, you can of course also bring in other third-party validation libraries, like for example ValidateJS which is a package you can install into your project and start using it to then easily validate strings for certain patterns if you wanted to do that Ref : https://validatejs.org/

* let's make sure that we now actually also move towards a form and input management that is more scalable and doesn't involve tons of states which we have to manage manually.

### Getting Started with useReducer()

* The problem with our current approach is that we manage different states to store the input for the different inputs and then we also have different validity states, at least potentially if we start managing our validity, like this and for very large forms, of course this means a lot of copy and pasting, a lot of state management.

* Now if you have that many states that are kind of connected, you also can do this in a more elegant way, instead of having your separate states for each input, you can have one big state which merges all input values and which merges all validities and then use a concept called a reducer, not a Redux reducer!!! but one supported by React out the box to manage that state.(useReducer)

* You do this with the use reducer hook which again has nothing to do with Redux,the concept of a reducer is not Redux exclusive, a reducer in the end is just a function that takes input and spits out some output and therefore React also supports this

* So what's the idea of a reducer? 

* Now first it's important to understand that use reducer is a hook that helps you have state management. Typically you use it if you have connected states or more complex state and you don't want have a bunch of individual use state calls and a bunch of individual states which you manage. You then can use use reducer

```js
import React, { useEffect, useCallback, useReducer } from 'react'; //useReducer
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Platform,
    Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

 //You start by creating a reducer, let's say a form reducer here and please note I create it outside of my form component (EditProductScreen),

 //but if you don't depend on props, you can do it outside of there so that this won't rebuild with every re-render cycle and you don't even have to use use callback which of course also costs some performance if you use it. 

 // So use it outside of there, build it outside of there to avoid unnecessary recreations of that function 

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
      // state here is passed automatically...
    if (action.type === FORM_INPUT_UPDATE) {
        // 
        const updatedValues = {
          ...state.inputValues, // copy the existing state input values
          [action.input]: action.value // then I want to replace the key value pair for the input for which this action was dispatched,... dynamically override a key here in the copied input values eg ['title'] : 'xyz..'
        };
        const updatedValidities = {
          ...state.inputValidities, // copy the existing state input inputValidities
          [action.input]: action.isValid // dynamically override a key here in the copied input values eg ['title'] : false
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
          updatedFormIsValid = updatedFormIsValid && updatedValidities[key];  // based on all form fields we checking updatedFormIsValid
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
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    // now use reducer take such a reducer function hence I will npass in my form reducer 

    // Use reducer also takes some optional second argument which is the initial state you want to pass (inputValues,inputValidities, overall formIsValid)

    // So this is now my initial state I pass in here and that's the state which I later want to change from inside the form reducer.


    // I want to dispatch reducer update and now this is done with the result of the use reducer call because use reducer of course return something, just like use state did. It also returns an array with exactly two elements and therefore we can destructure it with this array destructuring syntax which we also used on use state and there I get my form state as a first value and a dispatch function as a second value.

    const [formState, dispatchFormState] = useReducer(formReducer, {
        //These are our initial state
        inputValues: { 
          // previously we managed this in seperate use state Now I will merged this all into one object managed through that reducer.
          title: editedProduct ? editedProduct.title : '',
          imageUrl: editedProduct ? editedProduct.imageUrl : '',
          description: editedProduct ? editedProduct.description : '',
          price: ''
        },
        inputValidities: {
          title: editedProduct ? true : false,
          imageUrl: editedProduct ? true : false,
          description: editedProduct ? true : false,
          // These are our initial state. Therefore I know if I am editing, I should treat this as valid because it can't be changed anyways and therefore I don't care about this input but I don't want to block form submission because of setting this to false when we can't edit it anyways. So I will set it to true if this is not planned to be edited, if we're not editing a product but we're adding one, the price will be editable and therefore we will start in a false state because the price input will be empty initially, that's what we're setting up here. 
          price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    // now the above reducer function should be able to change that state when actions are dispatched and an action should be dispatched whatever we type into one of our text inputs, that will be the trigger.

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
        Alert.alert('Wrong input!', 'Please check the errors in the form.', [
            { text: 'Okay' }
        ]);
        return;
        }
        if (editedProduct) {
          // sending updated formState.inputValues to updateProduct and createProduct
        dispatch(
            productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
            )
        );
        } else {
        dispatch(
            productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
            )
        );
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]); // If the form states changes, which it will on every keystroke, then this
        // function should be rebuilt and it needs to be rebuilt because the information that's used by the function
        // changes with every keystroke, the validity can change with every keystroke, the values you want to submit can change with every keystroke.
    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const textChangeHandler = (inputIdentifier, text) => { 

        // The text argument!!! will also be received because that's the default argument which React Native would pass us anyways and this will then automatically be received as a last argument in that function.

        let isValid = false;
        if (text.trim().length > 0) {
        isValid = true;
        }
        // dispatchFormState call for EditProductScreen
        dispatchFormState(
          // we are calling below object to describe our action.
          {
          type: FORM_INPUT_UPDATE, // we will check this type inside reducer
          value: text, // that's the text which was entered, so I just forward that to the reducer so that we can store it in our state there 
          isValid: isValid, // forwarding isValid or not
          input: inputIdentifier
        });
    };

    return (
        <ScrollView>
        <View style={styles.form}>
            <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={formState.inputValues.title} // We pass back in the value for this text input by accessing form state
                onChangeText={textChangeHandler.bind(this, 'title')} //  title is inputIdentifier 
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect
                returnKeyType="next"
                onEndEditing={() => console.log('onEndEditing')}
                onSubmitEditing={() => console.log('onSubmitEditing')}
            />
            {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
            </View>
            <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
                style={styles.input}
                value={formState.inputValues.imageUrl}
                onChangeText={textChangeHandler.bind(this, 'imageUrl')}  //  imageUrl is inputIdentifier 
            />
            </View>
            {editedProduct ? null : (
            <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                style={styles.input}
                value={formState.inputValues.price}
                onChangeText={textChangeHandler.bind(this, 'price')} //  price is inputIdentifier 
                keyboardType="decimal-pad"
                />
            </View>
            )}
            <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={formState.inputValues.description}
                onChangeText={textChangeHandler.bind(this, 'description')} //  description is inputIdentifier 
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
###  Moving Input Logic Into A Separate C omponent

* The above code looks clumsy and lot of repetition let create a ui component for input logic

* I want to manage this value and the validity of this single input inside of the input component, so that I then only report back to my parent component, so to the edit product screen in the end what the current value is and whether it's valid or not so that validation doesn't need to happen inside of the parent component but again that is totally up to you whether you want to do that or not.

```js
//components/UI/input
import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE: // if it is INPUT_CHANGE then update state 
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true // if it is touched then update state as true
      };
    default:
      return state;
  }
};

const Input = props => {
  // and also manage my value of that input.

  //initial state for inputReducer...
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false// so whether the user did actually type here and this can be useful for helping us with providing a better user experience
     // regarding when we show validation errors and here I will set this to false initially.
  });


  /// !!! of course I still need to forward the value and the information, whether that input is valid or not, to my parent (EditProductScreen)
  const { onInputChange, id } = props; // id and onInputChange are input component property...

  // now to avoid an infinite rendering loop here, we can use the object destructuring syntax and pull out on input change,
  // so that if other props change, we don't refire this effect because on input change is what
  // we need down there and now we can add this is a dependency and the other things, other changes in the props will not trigger this.

  useEffect(() => {
    // Now the important thing is when should this use effect run and it shouldn't run after every keystroke? Instead this 
    // should run whenever our input state value or is valid changes of course, because that's what we depend on or to be //precise,
    // we might even only send this information if input state touched is true because otherwise the parent component might not care.
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]); 

  const textChangeHandler = text => {
    // text change handler where I get this enter text
    // This will now therefore trigger on every keystroke and hence now here, I want to check whether this is valid or not
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });  // dispatch INPUT_CHANGE action
  };

  const lostFocusHandler = () => {
    // touched should be updated when we actually lose focus because that means the user is done entering content for the moment,
    dispatch({ type: INPUT_BLUR }); // on calling onBlur  dispatch INPUT_BLUR action
  };

  return (
    // want to create an input component which can be used for any input, that for example means that the label here needs to be dynamic,
    // label, errorText will set form outside 
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler} // we don't need the identifier here anymore, 
        // don't need bind therefore because this is inside of a single input, we don't need an identifierthere.
        onBlur={lostFocusHandler} // onBlur call lostFocusHandler
      />
      {!inputState.isValid && <Text>{props.errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Input;
```
* Lets use this Input component in our parent component (EditProductScreen)

```js
import React, { useEffect, useCallback, useReducer } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Platform,
    Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input'; // import inputs from components folder

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

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
        Alert.alert('Wrong input!', 'Please check the errors in the form.', [
            { text: 'Okay' }
        ]);
        return;
        }
        if (editedProduct) {
        dispatch(
            productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
            )
        );
        } else {
        dispatch(
            productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
            )
        );
        }
        props.navigation.goBack();
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
        // so this effect will rerun whenever this changes. So it shouldn't change too often to avoid unnecessary effect runs
        // and here we therefore need to state our dependencies and the only dependency we have is dispatchFormState which will actually never change,
        // so we're good, this should never rebuild because the logic in there doesn't change,
    );

    return (
        <ScrollView>
        <View style={styles.form}>
            <Input // Input components 
            id="title"
            label="Title" // Input components label props
            errorText="Please enter a valid title!" // Input components errorText 
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler} // Input components inputChangeHandler 
            initialValue={editedProduct ? editedProduct.title : ''} // Input components initialValue
            initiallyValid={!!editedProduct}    // Input components initiallyValid
            required
            />
            <Input
            id="imageUrl" // Input components 
            label="Image Url" // Input components label props
            errorText="Please enter a valid image url!" // Input components errorText 
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler} // Input components inputChangeHandler 
            initialValue={editedProduct ? editedProduct.imageUrl : ''} // Input components initialValue
            initiallyValid={!!editedProduct} // Input components initiallyValid
            required
            />
            {editedProduct ? null : (
            <Input
                id="price" // Input components 
                label="Price" // Input components label props
                errorText="Please enter a valid price!" // Input components errorText 
                keyboardType="decimal-pad"
                returnKeyType="next"
                onInputChange={inputChangeHandler} // Input components inputChangeHandler 
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
            multiline // his which allows for multiline editing 
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
            />
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
    }
});

export default EditProductScreen;

```

### Tweaking Styles & Handling the Soft Keyboard

* I want to apply some styles to error message from input component and also don't always want to show it as if it's invalid but instead I want to show it if it's invalid end this input has been touched.

```js
//component/UI/Input 

// I also don't always want to show it as if it's invalid but instead I want to show it if it's invalid end this input has been touched.
{!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}

....
....

const styles = StyleSheet.create({
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  }
});

export default Input;
```
* Now we have another issue my keyboard is overlapping the description inputs it will have to fix this.

* we need to import and wrap KeyboardAvoidingView around entire scroll view

```js

import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView
} from 'react-native';

// add a lot of padding so that we really move up all the inputs quite a bit
// because there they're rather large with a label we have that the input itself which isn't super small so I definitely want to move it up quite a bit.

<KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
  >
      <ScrollView>
          <View style={styles.form}>
              <Input // Input components 
              id="title"
              label="Title" // Input components label props
              errorText="Please enter a valid title!" // Input components errorText 
              keyboardType="default"
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onInputChange={inputChangeHandler} // Input components inputChangeHandler 
              initialValue={editedProduct ? editedProduct.title : ''} // Input components initialValue
              initiallyValid={!!editedProduct}    // Input components initiallyValid
              required
              />
              <Input
              id="imageUrl" // Input components 
              label="Image Url" // Input components label props
              errorText="Please enter a valid image url!" // Input components errorText 
              keyboardType="default"
              returnKeyType="next"
              onInputChange={inputChangeHandler} // Input components inputChangeHandler 
              initialValue={editedProduct ? editedProduct.imageUrl : ''} // Input components initialValue
              initiallyValid={!!editedProduct} // Input components initiallyValid
              required
              />
              {editedProduct ? null : (
              <Input
                  id="price" // Input components 
                  label="Price" // Input components label props
                  errorText="Please enter a valid price!" // Input components errorText 
                  keyboardType="decimal-pad"
                  returnKeyType="next"
                  onInputChange={inputChangeHandler} // Input components inputChangeHandler 
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
              multiline // his which allows for multiline editing 
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
```
* You need to add this to the keyboard avoiding view which you wrap around your scroll view to have an effect because it basically needs to reserve for itself the entire screen size. There is a scroll view in there and that will still be able to scroll but you also need that now with that 

* Refer : https://reactnative.dev/docs/keyboardavoidingview

* You can also check https://formik.org/docs/guides/react-native for form validations 