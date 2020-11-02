## React.js Refresher

### What is React ? 

* It's a Javascript library for building user interfaces and as such, it's all about running Javascript in the browser, it's a Javascript library for browser side Javascript code, it's not a Node.js library, it's a browser side Javascript library.

* React.js itself is referred to as a library because it's very focused on that user interface thing but it actually started a huge ecosystem with other third-party packages that for example help us with app wide state management or with routing, frontend routing and therefore effectively you could also call it a framework I would argue but these are semantics, not too important right now, let's instead understand how React works and how we use it. 

* React helps us build user interfaces that are shown in the browser, that run in the browser and therefore we use it to build the frontend of web applications, what the user sees, React does not run on a server, React does not communicate with databases, we use it to build highly reactive modern user interfaces and we do so by following a declarative approach, which means that in React we rather define the result and maybe different states of the result and under which state we want to render what and want to show what on the screen instead of the steps that lead to the result, that would be an imperative approach which is basically what we have if we use vanilla Javascript, where we have to define every step - add this element, add this CSS class to an element, remove this element - this is what we do in vanilla Javascript and this can be very cumbersome and very complex user interfaces, we typically don't want to do that if we're building bigger applications because managing and orchestrating all these steps and ensuring that when something changes, we execute the right steps is very error prone and takes a lot of effort and work away from our actual business logic and from building nice user interfaces and instead forces us to spend a lot of work on Javascript primitives, on reinventing the wheel and so on and we don't want to do that.

* So in React.js, we instead focus on the result and we do so by using components. Components is a concept introduced by React, basically these are UI building blocks which we define and you will learn how you do that in this module of course, which we define and then we compose our user interface from these components and every component can also define what it should render, under which circumstance

### Create a new react app

* https://github.com/facebook/create-react-app

* Now why do we need such a tool, why don't we just import a script in a HTML file and get started?

* Because React is a bit more complex than vanilla Javascript. In the end we ship vanilla Javascript code but the way we write the code is a bit more convenient to us as a developer.

* We can use certain features which wouldn't run in the browser and therefore this project setup here has a couple of tools included which take the code we write as a developer and actually convert it to code that runs in the browser so that we have normal code that is executed in the browser but we have an easier time writing that code as a developer.

* In addition we get a development server, which is a simple server that serves our frontend application, so which has no backend, only serves that frontend application and which automatically reloads or injects changes whenever we change and save something in one of our source code files.

* In addition here with React, we're building a single page application, that's not a must do but it's a common choice.

*  In a single page application, you only have one HTML file which in the end is returned by the server serving that application,

* which itself is relatively empty but this file will then later include script imports, they will be added automatically by these tools which in the end host and run our React application which we in turn write here in the source folder with our files we got there

* we have a web application, a frontend which consists of one HTML file, where then Javascript is used to render something on the screen and re-render that something on the screen when it's needed and that allows us to build highly reactive modern user interfaces, where everything happens instantly because Javascript runs the browser, things happen instantly.

* We don't need to wait for a new HTML file to be downloaded from a server, instead everything is already there.

* So when a user clicks a button and we want to show a box on the screen in response to that click, boom it happens instantly because of Javascript. That's the feeling we want to provide and we can do that with React.

* in the source folder where we find an index.js file and an app.js file, both very simple files. Now let's have a look at the index.js file,

```js

ReactDOM.render(<App />, document.getElementById('root'));  //here we are selecting root from index.html
```

###  Understanding JSX

* Index.js  in the end includes the code which executes first when we start our app 

* Here we rendered our App component from app.js file

```js
import React from 'react';

const App = () => {
  return <h1>A React App!</h1>;
};

export default App;
```
* This is a regular function, an arrow function stored in this constant and then we export this constant and therefore this function, pretty straightforward

* but the thing inside of the function is not straightforward. What we return here looks like HTML, just like this looks like HTML but it's in a Javascript file, it can't be HTML right, you can't add HTML in a Javascript file.

* That's a special syntax invented by the React team, it's called jsx and it allows us HTML looking code in Javascript files and under the hood, this will be translated to instructions React understands. 

* In detail, this here is similar to React create element, a method provided on this React object

* Start app with npm start

* Now when you start this server, when you run npm start, it should automatically open up a new tab in the browser on localhost:3000, if it doesn't, simply do so on your own and visit it

* React gives us this alternative jsx syntax which in the end is just translated to React create element 

* That's also why we need to import React here, even though it looks like we're not using this React object anywhere in this file,

* we tell React which elements that should render and under the hood, it then will translate this into commands that the DOM understands, that the browser understands to render real DOM elements.

* let's say another HTML element, we would have to nest multiple React create element calls into each other, which quickly becomes very hard to manage, that's why this jsx syntax here is a great idea, a great invention.

### Understanding Components

* React is all about components, now what does this mean? This here, this function here is of course a regular Javascript function but it's also a React component. What makes up a React component?

* A React component can be one of two things, it can be a function which returns jsx or returns React create element calls or it can be a Javascript class that has a render method.

```js
import React from 'react';
// class based component
class App extends React.Component {
  render() {
    return <h1>A React App!</h1>;
  }
}

```
* In modern react we will used functional components only, React component should start with the uppercase character

* the cool thing now is that we can build up our application from small reusable components and compose our user interface with the help of such components

### Working with Multiple Components

* So, React is all about components and therefore typically we split our app in components.

* Let us create a custom component and use in our app.js file

```js
// GoalList
import React from 'react';

import './GoalList.css';

const GoalList = () => {
  // className is a keyword in Js that is why we used className here
  return (
    <ul className="goal-list">
      <li>Finish the Course</li>
      <li>Learn all about the Course Main Topic</li>
      <li>Help other students in the Course Q&amp;A</li>
    </ul>
  );
};

export default GoalList;

```
* Now we can use this componenet in our parenet componenet app.js file

```js
import React from 'react';

import GoalList from './components/GoalList';
import './App.css';

const App = () => {
  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <GoalList />
    </div>
  );
};

export default App;
```
### Working with Props

* Now thus far, everything in our app is hardcoded though, now a more realistic would be that lets say our goal list is managed here in app.js as data and we want to render the GoalList.html items or jsx items based on that data.

* We can pass data from component to component with a concept called props, short for properties.

* Let us pass dynamic data to the custom component through attributes

```js
import React from 'react';

import GoalList from './components/GoalList';
import './App.css';

const App = () => {
  const courseGoals = [
    {id: 'cg1', text: 'Finish the Course'},
    {id: 'cg2', text: 'Learn all about the Course Main Topic'},
    {id: 'cg3', text: 'Help other students in the Course Q&A'},
  ];
  // attribute={array} - So goals will be a prop that holds a reference to this array
  return (
    <div className="course-goals"> 
      <h2>Course Goals</h2>
      <GoalList goals={courseGoals} />
    </div>
  );
};

export default App;
```
* We could receive this attributes data in child component as Props

* Every function that is used as a React component, which means it returns jsx, also receives props.

```js
import React from 'react';

import './GoalList.css';

const GoalList = props => {
  // This is an object passed to your React functional component automatically by React and it's an object that bundles all the props you passed to the component,
  console.log(props.goals);
  return (
    <ul className="goal-list">
      
    </ul>
  );
};

export default GoalList;
```
### Rendering Lists of Data

* The map method takes a function, here I'll pass in an arrow function which is executed on every element of the array you call map on and then this function here will return a transformed version of that element in the original array and overall map will then return a new array full of these transformed data pieces.

```js
import React from 'react';

import './GoalList.css';

const GoalList = props => {
  // we need to map every object into a jsx equivalent, so into a renderable element.
  return (
    <ul className="goal-list">
      {props.goals.map(goal => {
        return <li key={goal.id}>{goal.text}</li>;
      })}
    </ul>
  );
};

export default GoalList;
```
* So now what happens here is I map my array of plain Javascript objects to an array of jsx elements and such an array of jsx elements is renderable

### Handling Events

```js
import React from 'react';

import './NewGoal.css';

const NewGoal = () => {
  const addGoalHandler = event => {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: 'My new goal!'
    };

    console.log(newGoal);
  };

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default NewGoal;
```
* prevent default, which prevents the browser default of sending a request to some backend

### Parent-Child Communication 

* You can also pass data back and you still do this with props.  you pass a callback function from the parent component to the child component, so no array or anything like that but a callback function.

```js
import React from 'react';

import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';
import './App.css';

const App = () => {
  const courseGoals = [
    { id: 'cg1', text: 'Finish the Course' },
    { id: 'cg2', text: 'Learn all about the Course Main Topic' },
    { id: 'cg3', text: 'Help other students in the Course Q&A' }
  ];

  const addNewGoalHandler = newGoal => { // Here we have function to add a new goal
  // newGoal data we will receive from the NewGoal Component..
    courseGoals.push(newGoal);
    console.log(courseGoals);
  };
  // we are passing this function pointer "addNewGoalHandler" to the NewGoal component through onAddGoal attribute
  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
};

export default App;

```
* We should pass newGoal to onAddGoal attribute

```js
import React from 'react';

import './NewGoal.css';

const NewGoal = props => {
  const saveGoalHandler = event => {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: 'My new goal!'
    };

    props.onAddGoal(newGoal); // here we are passing newGoal data to onAddGoal props ie addGoalHandler indirectly
  };

  return (
    <form className="new-goal" onSubmit={saveGoalHandler}>
      <input type="text" />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default NewGoal;
```
### Managing State

* So now we're able to communicate back and we are actually updating our course goals array in the app component but what you see is despite the array being updated and clearly the new goal is part of the array, our output here on the screen didn't change and that leads us to a core concept of React, "state".

* React does not re-render this jsx code and therefore the real UI, all the time whenever some event is triggered anywhere in the app. So just because I click this button here does not mean that React will re-render the entire screen just to make sure it doesn't miss any data change, this is not how React works, instead in the end you have to tell React when it should re-render and you do so by using a concept called state. 

* This course goals array here is a regular Javascript array, put in other words, React totally ignores it,

```js
 const courseGoals = [
    { id: 'cg1', text: 'Finish the Course' },
    { id: 'cg2', text: 'Learn all about the Course Main Topic' },
    { id: 'cg3', text: 'Help other students in the Course Q&A' }
  ];
```
* we have to tell React that it should not ignore it and that instead, whenever we change this array, it should update the UI, the jsx code of the component in which we changed it.

* Now to do that, we import one other thing from the React package and that's use state, a function built into the React library, a so-called React hook 

* a function which we can execute inside of functional components and only inside of functional components, in class-based components, you also have a state management mechanism

* In functional components, you use these hook functions as they are called, all these functions starting with use at the beginning, to manage state, so to manage data which when changed should lead to the UI of that component in which you manage the state to re-render.



```js
import React, { useState } from 'react';

import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';
import './App.css';

const App = () => {
  // initial state
  const [courseGoals, setCourseGoals] = useState([
    { id: 'cg1', text: 'Finish the Course' },
    { id: 'cg2', text: 'Learn all about the Course Main Topic' },
    { id: 'cg3', text: 'Help other students in the Course Q&A' }
  ]);

  const addNewGoalHandler = newGoal => {
    // setCourseGoals(courseGoals.concat(newGoal));
    setCourseGoals((prevCourseGoals) => {
      prevCourseGoals.concat(newGoal)
    });
  };

  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
};

export default App;
```
* Push because push modifies the existing item, instead set course goals wants a brand new array which will replace the old array and concat will also add an item to an array but it will return a new array to which this item was added. So it gives us a brand new array, doesn't touch the old one and we then pass the brand new array to set course goals

* React will then use that brand new array to under the hood replace the old array in its internally managed state and it will re-render this component once it did so and therefore update this course goals constant with the new array in the next render cycle which in the end means that React will execute this function here and therefore when it does so, it will reflect that new data in our jsx code.

* State is a crucial concept in React and therefore it's important to me that you understand how it works.

* Use state is how you manage state in functional components and your state can be anything, it doesn't have to be an array, it could be some text, a number, an object, an array, a boolean, anything like that.

* Use state always returns an array with two elements, no matter what your state is,  if your state is a number, use state still returns an array with exactly two elements 

* because the first element then always is your latest state snapshot and the second element is a function that allows you to update that state snapshot.

* Whenever you update the state snapshot, React will do two things;

* it will update the internally stored state data,

* so for example here when we add our first new goal, it will replace the initial state with our brand new state, in this case with the brand new array we created with concat

* and once it did update the data internally, it will call this component function again and execute the entire function and hence also re-render this jsx code.

* Now under the hood, it will not re-render the entire DOM, it will just check which parts of the DOM need to be updated but it will re-evaluate the entire component.

* This also means of course that it re-executes use state but use state internally works such that it only initializes that state when the component is rendered for the first time and for subsequent re-render cycles, it just pulls out the latest state snapshot and basically ignores the initial value we set up initially. This is how state works.

* Now it is also important to understand that this way of updating our state in this scenario is not the best possible way,

```js
// Not recommended way of updating state
setCourseGoals(courseGoals.concat(newGoal));
```
* This approach clearly works and in most cases it will work but you have to be aware that this whole state updating re-rendering part of React is in the end managed by React

* and when you set a new state, it doesn't pause everything and immediately re-render your app, instead it schedules the state update and if you have an application with a lot of ongoing state updates and a lot of work being performed, which is not the case in this application but can be the case in other applications, then your state update might be deferred by a few milliseconds.

* the course goals which are currently rendered on the screen might not be our latest state because not all state updates might have been processed yet, therefore there is a better form of updating this, instead of passing our new state data to set course goals, you can pass a function to set course goals,

```js
// best and suggested way to update state
 setCourseGoals((prevCourseGoals) => {
      prevCourseGoals.concat(newGoal)
  });
```
* React will then schedule all these function calls and guarantee you that they are executed in the right order so that even if a state update was deferred, by the time the update thereafter executes, it guarantees you the first one executed as well

* there is basically no chance of React deferring updates so long that we would end up with an incorrect state but this is the bulletproof approach which will always work.

* You only need it if your state update depends on the previous state's data if your state update is a new data piece which doesn't depend on the previous state, you can always safely use this non-functional form.

* And here, side note, we can of course also shorten this, take advantage of arrow function syntax and get rid of the return statement and the curly braces since we have only one expression which we immediately return.

* So now with that, it works as before but this is a bit of a safer approach and the recommended approach if your state update depends on the previous state.

### User Input & Two-Way Binding

* we don't just create a dummy goal but we actually reflect the real user input.

* What do we want to do is we want to store the user input in some variable on every keystroke so that we have the latest value entered by the user and then pass that entered value to props on add goal or to our new goal here instead of that hardcoded dummy text we have at the moment.

* So here in new goal, I want to capture the user input here and send this instead of my hardcoded text

```js
import React, { useState } from 'react';

import './NewGoal.css';

const NewGoal = props => {
  const [enteredText, setEnteredText] = useState('');

  const addGoalHandler = event => {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: enteredText
    };

    setEnteredText(''); // reset after adding a new goal

    props.onAddGoal(newGoal);
  };

  const textChangeHandler = event => {
    setEnteredText(event.target.value);
  };
  // value={enteredText} represent updated text - current value stored in entered text.
  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" value={enteredText} onChange={textChangeHandler} />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default NewGoal;

```
* here we are using state management to create something which is also sometimes called two-way binding.

* We're binding the value of the input and on every keystroke, we're updating to value which we then bind back to the input, so that we always reflect the latest value inside of the input but we also are able to manage this in a state-driven way so that we also have a chance of manipulating the value from inside our code up here and reflect this back into the input in this case.