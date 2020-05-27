# react-native-complete

## Diving into the Basics [COURSE GOALS APP] 

### How to work with React Native Components

* A crucial part of React Native are these components which are built into React Native because as you learned in the first section of this course, these are special components for which React Native knows how to translate, how to compile them to Native platform widgets and you can only use such components in React Native apps.

* You can build your own components but these then also in the end have to be made up of these built-in components,

* you can't use divs or paragraphs or anything like that. So we have to work with the ones built into React Native because there React Native knows how to translate them and there, we have things like the view, text, button, touchable text input, image, these are some of the components you will see throughout this course, there are more and we'll see plenty of them throughout the course and you will learn how to work with those, how to configure them and how to compose nice user interfaces with the help of these components.

* Now you, as I just mentioned of course, build your user interfaces, your custom components with the help of these built-in components here, so you compose your user interface, your components from these built in components 

* You build your own my title component by taking the built-in ones and mixing and matching them together to get the look or the component you need. (Refer : basic1)

```js
const MyTitle = props => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
}
```
* Styling also is an important part in React Native apps and there it's important to understand that React Native doesn't use web technologies

* it doesn't use HTML, it uses Javascript arguably but doesn't use HTML and it also doesn't use CSS, so CSS which you use for styling in the web is not supported in React Native but it gives you styling commands, styling configuration you can add to your components, so to these components that are built into React Native either with the help of inline styles or with so-called stylesheet objects and there, you write these style instructions in Javascript but you use a syntax which is based on CSS.

* So it's not directly related to CSS but of course it's influenced by CSS, many of the instructions you use here are inspired by CSS and many of the rules or of the properties you know from CSS also work here in Javascript, in your React Native app.

* Now regarding the inline styles vs stylesheet objects thing, I will show both but I will already say that using stylesheet object is preferred but I'll come back to that once we do use it. (Refer : basic2)

### Setting Up A New Project

* Let us create a new project 
```js
expo init rn-complete-guide --npm
```

### Working with Core Components

* React Native is all about these built-in core components like text and view. A view would be your div from web development in case you're a web developer which you probably are if you know React.

* So it's a great container component, you can style it and you can wrap other content with it.

```js
<View style={styles.container}>
  <Text>Open up App.js to start working on your app!</Text>
</View>
```
* Now a text on the other hand is a core component for outputting text, that's its goal, not there to output an image but there to output text.
* Now what you can't do in React Native and that's the first important thing, you can't for example output text between a view like this. If we would try to save this without that text wrapper, you see we get an error. 

```js
<View style={styles.container}>
  Open up App.js to start working on your app! 
</View>
```
* Here for example is a pretty clear error message telling us that text strings must be rendered within the text component Refer (app4.png)

* why is that so important? Why am I emphasizing this? ecause that's an important difference to web development, there you can put text anywhere. 

* In web development, you could have a div and between the div opening and closing tags, you could have any text and this will not work on React Native, not only because we're using a div that's not supported there but of course because on React Native, you really can only output text between text tags, so you need to use that text component provided by React Native to output text and that's a crucial difference to the web where you can throw your text anywhere and in React Native, it's way more important that you use the right built-in component for the job you want to get done and for styling, for setting up a container where you structure different content, that would be a view, for outputting text, that could be a text. For outputting an image for example, you will have an image component. So that's how React Native works

* and speaking of styling, of layouting, the view has this as a main job, it's mainly there to apply styles and to layout the content you have in there and speaking of that, let's get started with layout.

* Let's say in our app, we want to have two main areas here on that screen. At the top, I want to allow the user to enter some text and on the right of that, I want to have a button to confirm this choice and below that, so that's part one, the input area and below that, we have the second part and that's the list of goals the user entered.

* So therefore here in app.js, we can get started by having a wrapping view because just like in normal React, you need to have one parent component and that will typically be a view in React Native because that gives you most layouting and styling options.

* and inside of that view, we could have another view for the input area where we then add our input and below that, yet another view to have our list of goals and it's pretty normal in React Native that you have quite a lot of views nested into each other, so that you can build any layout you want.

```js
<View style={styles.container}>
  <View>
    Input text
  </View>
  <View>
    button to add list
  </View>
</View>
```
* Important takeaway right now is each component provided by React Native has its own job,there aren't that many components but the ones that are there have clearly defined roles

* and you do then build your UI by nesting these components into each other depending on what you want to achieve, for example if you want to build a layout, you start with nesting a couple of views and then once you're at the part where you want to output content, you'll start adding texts and so on and we'll do all of that over the next lectures

* You can also always go to the official React Native docs and there if you click on Guides, Components and APIs, you'll get an overview over these core building blocks. You'll find the view here, the text, the image, the text input which I mentioned earlier already and a couple of other core components

### Getting Started with Styles

* In that first nested view here, in this block, I went to have a text input and a button.Conveniently, both is provided by React Native, we have a text input here and we also have a button component. 

* So we can import both text input which allows the user to enter text and button and then here in that view, in that first nested view, I'll add a text input as a self closing tag because there is nothing we could pass between opening and closing tags and for the button, 

```js
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View>
      <View>
          <TextInput/>
          <Button title="ADD"/>
      </View>
      <View>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});

```
* if we save this and this reloads, we see the button here but we don't see the text input, right? So that's not working as intended.(Refer app5.png) 

* The reason for that is actually that the text input will be hidden here below the status bar.

* So now is the time where we should get started with adding some layout, some structure to this page because just adding components alone won't do the trick, a React Native app is all about using components and then adding the right layout, the right structure to your components.

* So here for example, it would make sense to add some general padding around that view, so on this top view, so padding basically is some distance from the border of that view which is basically the device frame in our case here since I'm talking about the topmost view to the content of the view, so some spacing between the borders of the topmost, of that surrounding view and the content in the view and for that, we can add the style property here on the view.

* Most components in React Native support the style property, the view does and there, you use this dynamic content binding here which you know from normal React too with the single curly braces and style expects a Javascript object now. 

* So we add another pair of curly braces here and now a common mistake is that you think this is a special syntax which requires double curly braces, indeed it's the normal React syntax with similarly curly braces where then the dynamic value you're passing to style just happens to be a Javascript object hence we have another pair of curly braces.

* And in this object, you can now have key-value pairs where the keys are your style property names and the values are the values for these style properties and these style property names are influenced by CSS.

```js
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={{padding : 50}}>
      <View>
          <TextInput/>
          <Button title="ADD"/>
      </View>
      <View>
       
      </View>
    </View>
  );
}
```
* So now we can see that input because now it's not behind that status bar anymore. So adding that padding probably made sense because now, we made sure that our layout is inside of our screen here.

* now let's go back to TextInput component and let's make sure we can see something, we can see that there is a text input and we don't just have to guess it. we could add placeholder like this

```js
 <TextInput placeholder="Course Goal" style={{borderColor : 'black', borderWidth :1, padding:10}}/>
```
* I can also see that a border bottom width of let's say 1 and what this does is it should set a bottom border on this input so that now if we go back, we have that underlining here, we can clearly see it

### Flexbox & Layouts (Intro)

* So we got started with the text input, right now we're not doing anything with the values the user enters but before we do that, let's make sure that actually the button is not below that input but next to it on the right and for that again, we need to work on the layout.

* That's why I have this extra view here around the text input in the button. We wouldn't need that but now with that nested view, we can control how these two items are aligned to each other, by again adding the style property here

* and now for layouting, for positioning things, React Native uses flexbox which you also might know from the web,

* flexbox work such that it positions elements inside of a view next to each other or above each other, by default above each other in React Native and you can change that by setting flex direction from column which is the default to row and by just adding this, on this view

```js
<View style={{padding : 50}}>
  <View style={{flexDirection : 'row'}}>
      <TextInput placeholder="Course Goal" style={{borderColor : 'black', borderWidth :1, padding:10}}/>
      <Button title="ADD"/>
  </View>
  <View>
  
  </View>
</View>
```
* we'll see that the button in the text input sit next to each other,doesn't look that great yet but they're sitting next to each other (Refer : app6)

* Now to make that look better, we can also add more, for example you can define how things are aligned and distributed in their row or column.For example with justify content, you can control how items are distributed along their main axis and with row, the main axis is from left to right,if that would be column, the main axis would be from top to bottom.

* we could specify a value of space between for example. What this means is that all the remaining free space is between the two elements,

```js
<View style={{padding : 50}}>
  <View style={{flexDirection : 'row', justifyContent: 'space-between'}}>
      <TextInput placeholder="Course Goal" style={{borderColor : 'black', borderWidth :1, padding:10}}/>
      <Button title="ADD"/>
  </View>
  <View>
  
  </View>
</View>
```
* so they're now not sitting directly next to each other but instead, there is some free space between them as you can tell.(Refer : app7.png)

* Now we can also align them on their cross axis, so main axis for flex direction row was left to right, cross axis then is top to bottom. For flex direction column, the main axis would be top to bottom and the cross axis would be left to right, so the cross axis simply is the opposite of the main axis so to say. 

* Justify content positions along the main axis, with align items you can control how the child elements of this view are aligned along the cross axis and there you have different values, like for example center.

```js
<View style={{flexDirection : 'row', justifyContent: 'space-between', alignItems:'center'}}>
    <TextInput placeholder="Course Goal" style={{borderColor : 'black', borderWidth :1, padding:10}}/>
    <Button title="ADD"/>
</View>
```
* So in this case, since we have flex direction row, this should vertically center all items which means that the button now looks nicer and is simply centered there in the middle of this input. (Refer : app8.js)

* now we can also ramp up the width of that input a little bit by going to the text input and there on the style we can also add a width of let's say 200, to give this a width of 200 pixels which means that this now is a bit bigger. Alternatively by the way, you could have also chosen a percentage value like 80%, which means that this takes 80% of the available width made available by its parent component, so by the view that surrounds it

```js
<TextInput placeholder="Course Goal" style={{ width : '80%', borderColor : 'black', borderWidth :1, padding:10}}/>
```

### React Native Flexbox Deep Dive

* In this lecture, I want to dive a bit deeper into flexbox, especially regarding how you use it in React Native apps.(Refer : https://reactnative.dev/docs/flexbox)

* So for this, I prepared a simple dummy application, it's a normal React Native app built with expo and in the app.js file here, what I have in the end is just a view with three views in there where each view then has a text with text one, two, three, this simply creates some boxes with different colors - red, blue and green (Refer : flexbox1)

* now we'll use flexbox to move these boxes around so that you can get a feeling for how flexbox works because it's so important.

* Now first things first, by default every view in React Native, even if you assign no special styles uses flexbox and that's different to the web for example, there if you have a div which would be your equivalent to a view kind of, it doesn't use flexbox by default.In React Native, it does, every view by default organizes its children with the help of this flexbox thing, flexbox simply is a term, is simply a concept from CSS that is all about organizing child
elements in a one-dimensional space,

* so here for example in a column. That's also another default, not only does every view by default use flexbox, it also by default organizes children in a column, so from top to bottom. That's also a difference to the web and I don't want to emphasize these differences too much because of course you don't need to be a web developer to build React Native apps but I think a lot of people do know web development,do know CSS flexbox and therefore it makes sense to also talk about the differences. So in the web when you use flexbox, not only is it not turned on by default, in addition if you do turn it on, the default is to organize all child elements in a row and here, the default is to organize them in a column.

* You can change that default though, so in this case on the view which holds my boxes, by adding flex direction here (Refer : flexbox2)

```js
<View style={{ padding: 50, flexDirection:'row'}}>
...
...
</View>
```
*  now you will see that these three boxes are organized in a row from left to right. Now besides row and column, you also have row reverse and column reverse and this simply also does what the name implies

```js
<View style={{ padding: 50, flexDirection:'row-reverse'}}>
...
...
</View>
```
* Another important thing about flexbox is how child elements are sized, here I gave every child element a width and a height of 100. Now if we would remove that width and height thing on every child element, then you will see that now we have a very small row here because every box now is only as wide as its child requires it to be and only as tall as its child requires it to be, so every box here which holds a number is only as wide and tall as the number it's containing.

* Now you can change that with the surrounding flexbox container too. Let's give that a width of let's say 300 pixels or of 80% of the parent width, so in this case since it's the root element, of the device width and let's give it a height of let's say 300. If we do that and now really important, I'm doing this on the view which holds all these boxes, I'm not doing it on the boxes themselves.

```js
<View style={{ padding: 50, flexDirection:'row', width:'80%', height: '300px'}}>
      <View
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>1</Text>
      </View>
      <View
        style={{
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>2</Text>
      </View>
      <View
        style={{
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>3</Text>
      </View>
    </View>
```

* you see something interesting, the height is assumed for all the elements, now all the views in the flexbox take the height of the parent, the width has no impact here. (Refer : flexbox3) That's also a default behaviour you've got here, obviously since we haven't changed anything. The default behaviour here indeed is that the child elements in a flexbox, so in this outer view here, are organized such that they align themselves along the cross axis by stretching.

* Okay, that were a lot of terms, what does this mean? 

* Now when working with flexbox, we have two important axis. 
  * The main axis depends on your flex direction, for a row which we have here, flex direction row, the main axis is from left to right. For row reverse, it would be right to left, 
  
  * for column, it would be top to bottom and for column reverse, it would be bottom to top, so that's the main axis

  * and then you also have a cross axis and that's simply the opposite of the main axis. So for a row where the main axis is from left to right, the cross axis would be from top to bottom. 
  
  * If the main axis is from right to left which would be the case for row reverse, then the cross axis would be from bottom to top.

* Okay, so that's the main axis and cross axis concept.

* Now you can organize your child elements, so in this view where we have the three boxes as child elements, you can organize these child elements along this axis.You use justify content to organize elements along the main axis and you have align items to organize elements around the cross axis. 

```js
<View style={{ padding: 50, flexDirection:'row', width:'80%', height: '300px', justifyContent: 'space-between', alignItems: 'center'}}>
...
...
</View>
```

* Now you will see there taking the width of the surrounding container, every box itself still is pretty small but they're split or they're distributed across the width of the parent container and they're no longer taking the height because along the cross axis, we're aligning them with align items and there, I set this to center.(Refer : flexbox4)

* The default here is stretch and if I set it back to stretch, then unsurprisingly they do stretch for the entire height. (Refer : flexbox5)

```js
<View style={{ padding: 50, flexDirection:'row', width:'80%', height: '300px', justifyContent: 'space-between', alignItems: 'stretch'}}>
...
...
</View>
```
* Now if you want to make sure that they take the available width, you can't set stretch here on justify content which is your main axis positioning vehicle, so you can't set stretch here(justifyContent). So what can you do regarding that then?

* Well, that is something you now configure on every child item itself. You can tell a child item how much space it should take off the space it's potentially can get along the main axis.

* Stretch here is kind of a special case, there you set this up on the parent item, normally you set this up on the child item.So for example if I set this to center now so that the parent doesn't tell the child how much space it should take,

```js
<View style={{ padding: 50, flexDirection:'row', width:'80%', height: '300px', justifyContent: 'space-between', alignItems: 'center'}}>
...
...
</View>
```
* then we can fully control the space a child takes by going to the child style and there, you can add flex, the flex property.  The flex property is applied to items that are inside of a flexbox, so that are inside of a view in this case here and that can be a view itself but that could also be another component like a text

* So now here, you can add flex and you can set this to a value of one for example, so flex needs to be a number. If you set this to one,

```js
<View style={{ padding: 50, flexDirection:'row', width:'80%', height: '300px', justifyContent: 'space-between', alignItems: 'stretch'}}>
      <View
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          flex:1
        }}
      >
        <Text>1</Text>
      </View>
      <View
        style={{
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>2</Text>
      </View>
      <View
        style={{
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>3</Text>
      </View>
    </View>
```

* If you set this to one, what you will see is that now the red container where I did set flex to 1 takes all the available width it can get just so much that it leaves enough space for the blue and the green container so that they can squeeze their content into the surrounding flexbox.(Refer : flexbox6)

* Now we can't see the boundaries of the surrounding container but the boundaries would essentially be where the red item starts and the green item and so on the horizontal axis here.

* So now flex one makes sure that the red item gets as big as it can get, so it takes as much space as it can get.By default, views only take as much space as their child elements require, so as this one character (red) required but with flex one, you change this and they now take as much space along
the main axis,so along the width here, as they can get

* For the cross axis, again that's a special case, you have to do this on the parent. For the main axis and since we have row here, the main axis is a horizontal axis from left to right, you do this with the flex property on a child.

* Now of course you can add flex to other child elements as well, like that second to the blue container with the two in there, you can add flex one there as well. So now I have flex one on the red container and flex one on the blue container and what now happens is that both of them take the available free space and amongst these two boxes, the space is distributed evenly and that's what this number here indicates. This number is a relative number, all items in the same flexbox, with the flex property distribute the available space by considering the number you assign here and these numbers are relative to each other.(Refer : flexbox7)

* So if I give the blue container flex two here, then this means that of the available space you have in that surrounding container, after deducting the space every element needs to squeeze its content in there, the blue container will take twice as much space as this one because here we have flex one, here we have flex two, if we had flex three here, then this would take three-fifths of the available free space because we have three plus two, so we have 5 available segments so to say and here the red container would take 3 segments, blue container would take 2 segments. If we have 1 and 2, then we have three available segments and the blue container takes two of them, red takes one, so you always add up these flex numbers and then distribute or that's automatically done of course but then the available space is distributed accordingly.(Refer : flexbox8)

```js
<View style={{ padding: 50, flexDirection:'row', width:'80%', height: '300px', justifyContent: 'space-between', alignItems: 'stretch'}}>
      <View
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          flex:1
        }}
      >
        <Text>1</Text>
      </View>
      <View
        style={{
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          flex:2
        }}
      >
        <Text>2</Text>
      </View>
      <View
        style={{
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>3</Text>
      </View>
    </View>
```

* So this is how you can work with flex, you can organize how items are positioned with flex direction, with justify content and with align items and you can also make your items grow and shrink with the help of flex.

* here, there I also use justify content and align items to center my numbers in these boxes, so that 1, 2 and 3 are centered there horizontally and vertically and that works because we have flexbox turned on by default and we can't turn it off by the way and therefore, I just use these two properties here to align my content of this view along the main and the cross axis and here since I set no special flex direction for this view, the main axis is top to bottom because the default flex direction is column and the cross axis is left to right.

### Inline Styles & StyleSheet Objects

* Inline styles are very easy to apply but their downside is that the more complex your app gets and your setup gets, your component gets, the harder it is to follow along with all these inline styles.

* You will have a lot of code up there, in your jsx code and it can be hard to read it, to understand it.

* Therefore whilst you can use inline styles, it's actually recommended to use a stylesheet object 

* This uses stylesheet which is a class in the end provided by React Native which is why we import it from there and this in the end creates a Javascript object which contains all your style configuration.

* The difference to a vanilla Javascript object which you could also create on your own like this is simply that Stylesheet.create could in the future also apply some performance optimizations and apply your styles more efficiently in the end.Therefore, you should use that because you lose nothing but in the future, you might benefit from additional optimizations

* you should use Stylesheet.create because it won't hurt and you might get additional performance optimizations in the future. Another advantage of using the stylesheet is that this will automatically add some validation which means that if you're using an incorrect style property or an incorrect value, React Native will detect this and will throw an error which simply makes it easier for you to spot such errors,

* if there would be no validation, it would fail silently, it would just not apply the style and you might not even see that instantly or you'll see that the styling isn't correct but you don't really see why it's not working, therefore this built-in validation is another advantage of using that stylesheet object here

```js
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Course Goal" style={styles.input} />
        <Button title="ADD" />
      </View>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  }
});

```

### Working with State & Events

* Now in this course, I will use functional components only with the React hooks feature which is relatively new, so in case you don't know React hooks yet, definitely learn about them first

* we'll need React hooks to for example get the user input. We used the useState hook for that which we import from React, not from React Native but from React, it's a core React feature

```js
import React, {useState} from 'react';
```

* and then here in this functional component, in this app component, we can get the entered goal and also get the set entered goal function to update the state with the help of useState and by default, we have an initial state which is an empty string because the user hasn't entered anything at the beginning.

```js
export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('')
  ....
  ...
}
```
* Now we can bind this to the text input, that means when the user types a character, we want to update our state and save the entered text in the state here which we can then access through entered goal and we'll pass the entered goal back into the text input. That's this two-way binding, it's a so-called controlled component which you also know from React for web with normal HTML input elements.

* So here we can listen to onChangeText, a prop provided by text input which takes a function that will execute for every keystroke.

* so we can use our state or set entered goal function here, by simply adding a new function here,

```js
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText)
  }

  return (
    <View style={{padding : 50}}>
      <View style={{flexDirection : 'row', justifyContent: 'space-between', alignItems:'center'}}>
          <TextInput placeholder="Course Goalz" style={{ width : '80%', borderColor : 'black', borderWidth :1, padding:10}} onChangeText={goalInputHandler}/>
          <Button title="ADD"/>
      </View>
      <View>
      
      </View>
    </View>
  );
}
```
* Now that's important, don't add parentheses down there because this would execute this function when this code gets parsed, so when the UI gets rendered for the first time. You don't want to execute this immediately

* you want to execute it on every keystroke and therefore, you just take the name of the function, you pass that name of the function to onChangeText and that effectively tells React Native, hey that's the function I should execute for every keystroke, so don't add parentheses here so that this can run on every keystroke.

* Okay, so now we have this function connected, we update our state with whatever the user entered on every keystroke,

* now we also have to pass that text back into the text input, so that it's displayed there correctly by simply binding the value property to entered goal, so to our state which will change with every keystroke.

* And with that, we're getting access to the user input because it will now always be stored in an entered goal.

```js
 <TextInput 
          placeholder="Course Goalz" 
          style={{ width : '80%', borderColor : 'black', borderWidth :1, padding:10}} 
          onChangeText={goalInputHandler}
          value={enteredGoal}
          />
```
* Now when the user presses the button, we want to use that entered goal, so for that I'll add another function here,

* in the function body, I want to add my entered goal to a list of goals
```js
const addGoalHandler = () => {
    console.log(enteredGoal);
  }
```
* For this to execute, we need to connect it to the button

```js
<Button title="ADD" onPress={addGoalHandler}/>
```
* of course we don't want to console log it, we want to output it below our input here instead, we want of a list of our goals below this input area.  I want to output all the elements we added, all the goals we added

* For that we first of all need to manage our goals and we can set up another state for that which initially is an empty array, hence I pass an empty array as a value to useState and there we have our course goals and a set course goals function.

```js
const [courseGoals, setcourseGoal] = useState('');

const addGoalHandler = () => {
    setcourseGoal([...courseGoals,enteredGoal])
  }
```

* initially an empty list but then this will grow over time because we then also add a new goal when we press that button.Now a tiny side note, when working with set course goals, course goals here is our previous state and the way React updates the state, this should always be your most current state snapshot but it's not 100% guaranteed

* to have that 100% guarantee, when you update your state based on the old state, you can use the function form of this set function where you don't pass the value of your new state here but instead you pass it in a function, typically an anonymous function where you get your current state or current goals, so your current state snapshot and then you return your updated value,

```js
 const addGoalHandler = () => {
    setcourseGoal(currentGoals => [...currentGoals, enteredText])
  }
```
* This syntax is a bit better, the other syntax would have worked as well but this is guaranteed to always work because React Native will here always go ahead and give you the guarantee, the latest state snapshot before it then applies your state change here.

* an array of goals managed here. How can we now output this though?

### Outputting a List of Items

* Now to output our list of goals, here in the view, I want to simply output a couple of text components for now 

```js
<View>
  {courseGoals.map((goal)=> <Text>{goal}</Text>)}
</View>
```
* So this is working and this is how we can output a simple, a very trivial list of items here. Now of course, these items look rather boring though, so maybe we can apply some styling there to make them look better

* Before we do that though, please note that we have an waring here in our terminal. "Each child in a list should have a unique "key" prop" and that's a normal React rule, nothing React Native specific.Indeed, you should always, when mapping this to a list of widgets, assign a key here so that React is able to efficiently update this list behind the scenes if it needs to. You do this by adding a key prop here

```js
<View>
  {courseGoals.map((goal)=> <Text key={goal}>{goal}</Text>)}
</View>
```
* for now let's go with the goal itself which isn't strictly unique, you could enter the same goal with the same text twice which would give you an error but for now let's assume you're not doing that,

### Styling List Items

* So let's style these components there and for that, we want to apply some style to the text components.

* The text component does indeed support the style property as you can verify in the official docs but the text component actually does support less styling features than the view does

* and therefore, I'll wrap this into another view component and that's just the view component  you only got a couple of base components but they'll get you very far because you work with views and buttons and texts all the time.nd now here, we have more styling options.

```js
<View>
  {courseGoals.map((goal)=> <View style={styles.listItem}><Text key={goal}>{goal}</Text></View>)}
</View>
```
* Now one thing we have to adjust now by the way, the key here always has to be on the root element in your list, so the element which you are repeating and we're not just repeating the text anymore, instead we're now repeating the entire view,

```js
<View>
  {courseGoals.map((goal)=> <View key={goal} style={styles.listItem}><Text>{goal}</Text></View>)}
</View>
```
### Making it Scrollable with ScrollView!

* Now there's one thing you will notice. If you enter a goal here and here, I will quickly use the same goal over and over again even though that gives me an error but the app will continue to work, so let's ignore the warning at the bottom. If I entered this, often enough you see at some point of time, we'll exceed the boundaries of the screen but by default, you can't scroll and that's something which can be really confusing if you're getting started with React Native because if you're coming from the web, there, you can always scroll, the browser by default makes your page scrollable if your content exceeds the boundaries of the page. Here, that's not the same, you don't get scrolling just because your content goes beyond the boundaries of your screen, instead your content is just not reachable anymore.

* Now obviously, that's not an option, that's a horrible user experience, we want to have a scrollable content but in native apps, you have to be explicit about the fact that this page or a part of this page should be scrollable and it's the same in React Native therefore.

* we can use another component baked React Native and that's the scroll view and as the name suggests, this is a view which is scrollable.

```js
import { StyleSheet, Text, View, TextInput, Button,ScrollView } from 'react-native';

<ScrollView>
  {courseGoals.map((goal)=> <View key={goal} style={styles.listItem}><Text>{goal}</Text></View>)}
</ScrollView>
```
* On the scroll view, you also got properties that allow you to configure it, you can check out the official docs, for example you could set horizontal to scroll horizontally but here, I'll leave the default which is vertical scrolling and by just adding this

* We could have wrapped it around the entire page, so we could have replaced this view here with a scrollview

*  this is of course a super important component for any content where you can't guarantee that it fits onto the screen. for dynamic content like this list we definitely need scroll view

###  A Better List: FlatList

* Now I just showed you the scroll view and it's already time to let go and to get rid of the scroll view, why? The scroll view is great if you have a scrollable area on your screen but it's not so great if you have a list where you don't know how long it will be or which might be very long.

* Now if you know you have some content, maybe a list of data but you know it's only 20 items, so it will probably exceed my screen boundaries but it will never be more than 20 or 15 items, then you can use a scroll view

* but if you have very long lists, then a scroll view can be very inefficient because what it does is it renders all the elements in advance, even the ones that are not on the screen. That means that even the goals down there which are currently not visible are fully rendered and when you scroll such a very long list with a lot of elements or if you do anything else on the screen, that can really slow down your app.

* If you have a list with hundreds or thousands of elements and there are all always rendered even if you don't see them, that can really slow down your app.

* So in order to speed that up, there is a component built into React Native that handles such infinite lists or lists that are potentially very long in a more efficient way and that's the FlatList component which you also import from React Native.

* FlatList which is a self closing element and FlatList has two important properties 

* the first property is the data property where you point at your input data and this should point at an array.So here, I point at course goals because that's the data I want to output.

* The second important property is render item, that takes a function which is called for every item in your data to render a list item.

```js
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

<FlatList data={courseGoals} renderItem={itemData => (
        <View style={styles.listItem}><Text>{itemData.item}</Text></View>
      )}/>
```
* Now you don't need to set a key here anymore, we will see in few second why.

* An item data is a more complex object but in there what you'll have is an item property, besides item you also have the index, so the number, the position of that item in the array starting at 0 and separators which would allow you to basically render separators dynamically between list items, not something we'll do here but item will be your data,so one element from your input data and that here is therefore one of our goals.

* If you run this I can scroll but you'll see that there is a warning. We expand this, we see virtualize list missing keys for items, so that is another warning related to keys.The reason for that is that FlatList automatically adds keys to your items but only if your data, your input data has a certain shape and our current shape where we simply have an array of strings is not supported.

*  The shape it would expect is that you don't have goals which are just strings but instead that your list is a list of objects where you must have a key property in that object 

```js
const addGoalHandler = () => {
    setcourseGoal(currentGoals => [...currentGoals, 
      {key : Math.random.toString(), value: enteredGoal}
    ])
  }
```
*  now an object and not just a string anymore but item will have a key and a value property now because that's what we're setting up up there and I can simply access the value property to output the text. 

```js
 <FlatList data={courseGoals} renderItem={itemData => (
        <View style={styles.listItem}><Text>{itemData.item.value}</Text></View>
      )}/>
```
*  if we try this again with Learn React Native, close the keyboard, you see we no longer get the warning and we can still scroll this of course, we get no error here either because now, we have that key property here.

* instead of key if you add id also it will support but if you add anything other than key or id it will throw waring 

* in that case you can also add another property to FlatList besides data and render item, you can add the key extractor property which takes a function that tells FlatList how to extract your key and by default,

* the logic is I'll have a look at the item and look for a key property but now with key extractor, you can change this

*  Key extractor takes a function which takes two arguments - the item it's looking at and the index of that item and now you need to return a key and by default,

```js
const addGoalHandler = () => {
    setcourseGoal(currentGoals => [...currentGoals, 
      {uniqueId : Math.random.toString(), value: enteredGoal}
    ])
  }

<FlatList keyExtractor={(item, index)=> item.uniqueId} data={courseGoals} renderItem={itemData => (
        <View style={styles.listItem}><Text>{itemData.item.value}</Text></View>
      )}/>
```

* you also get rid of the warning because you inform React Native's FlatList how to get a unique key for every item in your list.

* So that's FlatList and you should use FlatList for very long lists, for lists where you don't know how long they will be but where they potentially are very long because that gives you a better performance than a scroll view which on the other hand is great if you know you only have a limited amount of items which will probably go beyond your screen boundaries but where you won't have too many redundant items rendered outside of the screen.

* Overal changes below

```js
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');

  const [courseGoals, setcourseGoal] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText)
  }
  const addGoalHandler = () => {
    setcourseGoal(currentGoals => [...currentGoals, 
      {uniqueId : Math.random.toString(), value: enteredGoal}
    ])
  }

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title="ADD" onPress={addGoalHandler} />
      </View>
      <FlatList keyExtractor={(item, index)=> item.uniqueId} data={courseGoals} renderItem={itemData => (
        <View style={styles.listItem}><Text>{itemData.item.value}</Text></View>
      )}/>
        {/* {courseGoals.map((goal)=> )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  listItem:{
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  }

});

```
### Splitting the App Into Components

* I want to create two new component for list item and Input text box

* GoalItem component
```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoalItem = props => {
  return (
    <View style={styles.listItem}>
      <Text>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  }
});

export default GoalItem;

```

### Passing Data Between Components

* GoalInput Component

```js
//GoalInput js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Course Goal"
        style={styles.input}
        onChangeText={goalInputHandler}
        value={enteredGoal}
      />
      <Button title="ADD" onPress={props.onAddGoal.bind(this, enteredGoal)} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  }
});

export default GoalInput;

```
* Use the above component in App.js

```js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList
} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
  };

  return (
    <View style={styles.screen}>
      <GoalInput onAddGoal={addGoalHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => <GoalItem title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});

```
### Working with Touchable Components

* what we're not able to do is delete them and that's the next step I want to take

* We got our FlatList with all these goal items and it would be nice if we could tap such a goal item, so such a list item and when we tap it, we simply remove it from the list.

* Now the good thing is we can uniquely identify every item because every item here has an ID, so we can use that ID for it and getting rid of the item,the missing thing is that we can tap it. Now on our own component, we can't simply add onPress or anything like that, this will not work,

* So we'll have to go into that component and make sure that this view is pressable.Now actually, a view has various props that help us with listening to events,

* for example onTouchEnd actually helps us with listening when the user basically touch this and is done touching this.

* The issue with that is that onTouchEnd and a couple of other listeners we got here are on a too low level. We can set up very detailed listeners to various events here but for example onTouchEnd doesn't tell us how long the user pressed this and if you ever need to find out if it was a long press or a short press, you would have to manually set a timer when the user starts touching this with onTouchStart, wait for onTouchEnd and then manually decide if that was long enough or not. It's typically not what you want to do though, it's of course great that you have the full flexibility of doing that but if you want these standard touch events like long press, well then this is not ideal because you would have to do all the heavy lifting on your own, you would have to write a lot of code to find out which kind of touch it was on your own.

* There is a built-in touchable component which you can import and touchable is a component you can wrap around any other component you have,

```js
import { View, Text, StyleSheet, Touchable } from 'react-native';

const GoalItem = props => {
  return (
    <Touchable>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </Touchable>
  );
};
```
* and it's not visible, it doesn't render anything you can see on the screen but it will wrap this and register the touch event on the child you wrap touchable around and touchable then gives you finished touch event, so more detailed touch events which were pre configured for you.

* Now to be exact, touchable like this can't be used as a component, it acts more as a parent class for React Native because there are multiple specific versions of touchable which you then actually should use, for example there is touchable opacity.

* Let's use touchable opacity instead of touchable because that now really is a component you can use and now here, you will see that if you type on, you get a couple of high level touch events you can listen to, like onPress or onLongPress and that's of course way more helpful.

```js
//GoalItems.js
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = props => {
  return (
    <TouchableOpacity onPress={props.onDelete}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
```
* and now we can go to the place, to app.js where we use goal item and add the onDelete prop

```js
//App.js
<View style={styles.screen}>
  <GoalInput onAddGoal={addGoalHandler} />
  <FlatList
    keyExtractor={(item, index) => item.id}
    data={courseGoals}
    renderItem={itemData => <GoalItem onDelete={()=> console.log("Does that work ? ")} title={itemData.item.value} />}
  />
</View>
```
*  And you also see the effect of touchable opacity,this actually gives us a visual feedback about our touch by changing the opacity of the element we touched.

* You can also control this opacity by setting the active opacity prop here, on touchable opacity and setting this to a number, for example to .8

```js
<TouchableOpacity  activeOpacity={0.8} onPress={props.onDelete}>
  <View style={styles.listItem}>
    <Text>{props.title}</Text>
  </View>
</TouchableOpacity>
```

* Now touchable opacity is not the only component you can use though, besides touchable opacity, you also have touchable highlight

```js
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const GoalItem = props => {
  return (
    <TouchableHighlight onPress={props.onDelete}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
};
```
* Now you can also configure underlayColor to use highlist color

```js
<TouchableHighlight underlayColor="#ccc" onPress={props.onDelete}>
  <View style={styles.listItem}>
    <Text>{props.title}</Text>
  </View>
</TouchableHighlight>
```

* you can configure which delay is assumed for a long press, you could have done that on touchable opacity as well, so you can configure that effect and you can simply play around with that to get a feeling for how to use it

* Besides touchable opacity and touchable highlight, you also have touchable native feedback

```js
 <TouchableNativeFeedback onPress={props.onDelete}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableNativeFeedback>
```
*  of course, you can also configure this effect here with props you can set and as always, the official docs are also a great place to go if you want to learn more about how to configure this,

* And last but not least, there also is touchable without feedback 

```js
<TouchableWithoutFeedback onPress={props.onDelete}>
  <View style={styles.listItem}>
    <Text>{props.title}</Text>
  </View>
</TouchableWithoutFeedback>
```
* it allows you to register these events but it gives no visual feedback because sometimes you just want to have something which you can tap but where you indeed don't want to give any feedback to the user.

* So here, I can tap this as much as I want, the tap is registered and hence I see the output here but we get no visual feedback.

* So these touchable components are really important in React Native because they allow you to attach the normal high level touch listeners, like onPress, onLongPress and so on to any component in React Native and with that you can build your own touchable components, your own buttons, your own links, whatever you need.

### Deleting Items

* Now to delete the item which was pressed, I'll add a new function here in my app component,

```js
const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals =>{
      return currentGoals.filter((goal)=> goal.id !=goalId);
    });
  }
```

##### Option 1
* We have to use this function on delete key press 

```js
<FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => <GoalItem onDelete={removeGoalHandler} title={itemData.item.value} />}
      />
```
* Keep in mind we have to pass id to this function.

```js
<FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => <GoalItem  id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value} />}
      />
```
* then we have to bind this id as props to the custom GoalItem function

```js
const GoalItem = props => {
  return (
    <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
```

##### Option 2

* we can directly pass goal id to this function as below

```js
<GoalItem onDelete={removeGoalHandler.bind(this, itemData.item.id)} title={itemData.item.value} />
```

### Adding a Modal Overlay

* let me show you another exciting component that's built into React Native and that also shows how easily you can add cool features to React Native apps and that's the modal component.

* You find it of course in the official docs in that components and APIs guide Now it's under others and here, this modal is a nice component that allows you to add such a nice overlay, full screen overlay with a little effort.

* Now let's add a modal for actually hosting our goal input, right now the goal input is here at the top and that's all right but I actually want to move that into a modal so that we have it on a full screen overlay in the end and we only have a button here at the top, so in place of goal input which opens that modal.

* so here we import the modal component from react-native and then we will wrap this custom component with modal

```js
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
  };

  return (
    <Modal>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Course Goal"
              style={styles.input}
              onChangeText={goalInputHandler}
              value={enteredGoal}
            />
            <Button title="ADD" onPress={props.onAddGoal.bind(this, enteredGoal)} />
          </View>
    </Modal>
    
  );
};
```

* let's see if that already changes something a bit yes, our styling is off, we're losing that padding which we set up originally, right? In app.js, we have that general padding on our screen view which is that outer view, it's certainly not getting applied on the two platforms anymore, on the two devices because our content is way outside of this screen, so that modal is already doing something and of course we're not really seeing that much.

* Now for modal, so for this modal component, you can set a visible key that defines whether this is currently visible or not

```js
<Modal visible={false}>
  <View style={styles.inputContainer}>
    <TextInput
      placeholder="Course Goal"
      style={styles.input}
      onChangeText={goalInputHandler}
      value={enteredGoal}
    />
    <Button title="ADD" onPress={props.onAddGoal.bind(this, enteredGoal)} />
  </View>
</Modal>
```

* now we obviously hardcoding this is not the solution. Instead in app.js, I now want to have a button which allows us to open that modal and then we will close the modal from inside the modal when we press the add button there.

```js
//App.js
import { StyleSheet, View, Button, FlatList } from 'react-native';

<View style={styles.screen}>
  <Button title="Add New Goal"></Button>
  <GoalInput onAddGoal={addGoalHandler} />
  <FlatList
    keyExtractor={(item, index) => item.id}
    data={courseGoals}
    renderItem={itemData => <GoalItem  id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value} />}
  />
</View>
```

* and now when we press that button, we want to show that modal, right? Now for that, we need to manage more state.So in here besides managing the course goals, I will now also manage whether we're currently in course add mode or if we're not.
```js
const [isAddMode, setIsAddMode] = useState(false);

<View style={styles.screen}>
  <Button title="Add New Goal" onPress={()=> setIsAddMode(true)}></Button>
  <GoalInput onAddGoal={addGoalHandler} />
  <FlatList
    keyExtractor={(item, index) => item.id}
    data={courseGoals}
    renderItem={itemData => <GoalItem  id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value} />}
  />
</View>
```

* Now we can take that isAddMode state we're changing and pass this to goal input to then change the visibility of the modal in there.

```js
//App.js
<GoalInput modalVisible={isAddMode} onAddGoal={addGoalHandler} />
```

* Then in our Goal input component instead of hardcoded we can get from state props

```js
 <Modal visible={props.modalVisible}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title="ADD" onPress={props.onAddGoal.bind(this, enteredGoal)} />
      </View>
</Modal>
```

* so here we can use props modalVisible, now referring to the modalVisible prop we got on the goal input which we then forward to the visible prop of the modal.

* if I press add new goal here, indeed you see that modal content up here again. Now obviously, it's not looking that beautiful here, so we should change this and one other thing I want to change is that an animation would be nice here for opening the modal, right?

```js
<Modal visible={props.modalVisible} animationType="slide" >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Course Goal"
              style={styles.input}
              onChangeText={goalInputHandler}
              value={enteredGoal}
            />
            <Button title="ADD" onPress={props.onAddGoal.bind(this, enteredGoal)} />
          </View>
    </Modal>
```
* animationType has three options fade, none , slide

### More Flexbox Styling

* For centering the content in the middle, we can use a technique I already covered earlier, styling and there specifically, flexbox.

* So on our modal we have that view or in our modal we have that view, that's our root view, it's the only element in the modal and then this view of course has other child elements but that's the only direct child of our modal.

* There, we have the inputContainer style which we apply and there, we currently set a flex direction of row.Now of course we could leave that but I'd say in the modal if we present it on a full screen like this, I'm actually fine with a vertical orientation so that we have the input and below that, the button.So I'll change this back to column or since this is the default, simply delete this flex direction

* and now I want to center this horizontally and vertically though and for that, we can set justify content to center here and align items to center but that alone won't do the trick.

* the reason for that is that our input container, so that view we're assigning this style to, by default doesn't take the full available space it can get in the surrounding view,so in this case in the modal.

* The modal theoretically takes the full height and width of the screen but the view simply doesn't take that full available space by default,that's just how it works, that's the default setting. It only takes the space its children require, so the text input and the button.

* So the view essentially has the height of text input and button combined and then also the width of the broadest child in this case, so of the text input here

* So to make the view take the full available space here, you can simply go to the style you apply to the view, in this case our input container style here and set flex to one here. 

* Flex is a property which is used in conjunction with flexbox, flex allows you to control how much space your different items inside of a flexbox take and if it's the only item, this simply ensures that this container will take all the available space. You could also set this to flex two, the exact value doesn't matter here if it's the only child but you need to set flex to make sure that this takes the full available space.

* If you don't do it, it will just take as much space as its child elements do, if you set flex, it will take as much space as its parent element gives it, so as the parent element of that view, the modal in this case gives the view.

```js
const styles = StyleSheet.create({
  inputContainer: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom:10
  }
});
```

### Closing the Modal & Clearing Input

* So in order to make sure that the modal disappears, we simply have to change isAddMode again inside of the app.js file because the new value will then automatically be forwarded to goal input.

* So all we have to do is in add goal handler where we set the course goals, we also have to set isAddMode to false because we're done adding.

```js
const addGoalHandler = goalTitle => {
  setCourseGoals(currentGoals => [
    ...currentGoals,
    { id: Math.random().toString(), value: goalTitle }
  ]);
  setIsAddMode(false);
};
```
* Now a little side note, the way React works if you're setting two states after each other, it will batch these together, it will not re-render the component twice after first change and after the second change, instead it will basically apply all state changes at once and only re-render the component once which of course is good,otherwise we would have an unnecessary re-render cycle there and this is simply a nice optimization React does for us.


* So we can absolutely change two different states after each other like this and with that, the modal should know actually also disappear if we set this to false.

* Now two tiny improvements I still want to apply, for one I want to clear the input once we're done and in addition, I want to provide a cancel button, so that alternatively instead of adding this, we could also cancel here to close the modal without adding an item because right now, that's not something we can do.

* Let's start with clearing our input here after we entered something. For that in goal input, in the end, we have that entered goal and we need
to reset this once we add a new goal.

* Now of course, we add a new goal when we press that add button and there in the end, we trigger a function which we get with the help of the onAddGoal prop.Now to also clear our input

```js
<Modal visible={props.modalVisible} animationType="slide" >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Course Goal"
            style={styles.input}
            onChangeText={goalInputHandler}
            value={enteredGoal}
          />
          <Button title="ADD" onPress={addGoalHandler} />
        </View>
  </Modal>
```

```js
const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal('');
  }
```
* Then add cancel button

```js
// Goal input handler
<Button title="CANCEL" color="red" onPress={props.onCancelGoal} />
```

* In app.js add cancel funtion reference and its function to update modalVisible to false

```js
const cancelGoalHandler = () =>{
    setIsAddMode(false);
  }
```

### Finishing the Modal Styling

* The key here is to use flexbox and another view because again as I mentioned earlier and as is really important to understand, view components are your core component for organizing other components or for being used as a container which you can also style but here in this case, to organize other components. So I'll move the two buttons inside of that view

```js
<View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="CANCEL" color="red" onPress={removeGoalHandler} />
              </View>
              <View style={styles.button}>
                <Button title="ADD" onPress={addGoalHandler} />
              </View>
            </View>
          </View>

....
,......

const styles = StyleSheet.create({
  inputContainer: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom:10
  },
  buttonContainer: {
    width: '60%',
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  button : {
    width: '40%',
  }
});


```
