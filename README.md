# react-native-complete

## Intro 

### What is React Native?

* React Js - It's a Javascript library for building user interfaces . It runs on Javascript and it's good at building user interfaces. Typically, we use React in web development for building web apps but it's important to understand that React itself, the library actually makes no assumption about what we're building with it because it's actually another library which you'll also use when you're building web apps with React that is responsible for rendering something onto the screen and that's the React DOM library.

* and that's the library that knows about the web and knows how to render HTML elements and so on. React itself is platform-agnostic, it's just a library that's good at building trees of components, of finding out whether something changed, if something needs to be re-rendered, of managing state, of passing data around but it does so in an abstract way which is why you can use React on any platform. You're not restricted to the browser, to HTML, to the web,

* you can use the logic React gives you anywhere, it's the React DOM part that then knows how to work with HTML and so on and that is super important to understand because that's important when we think about React Native.

* React Native is a separate library which in the end is a collection of special React components it gives you, so a collection of components you can use in your React app and these components are special because React Native actually knows how to translate them, how to compile these components to native widgets for iOS and for Android. 

* So React Native kind of is like React DOM, it knows how to talk to native platform, to Android and iOS and how to render native widgets and it gives you a bunch of these widgets as React components so that you can build a user interface with these compilable components so to say because you won't be able to use your regular divs and h1 and paragraph tags in React Native apps because there are no direct equivalents for that in native code but I'll come back to that

* Now besides giving you these components, React Native is a bit more than that, it also gives you access to some native platform APIs, for example it helps you use the device camera, so things like that, common tasks you would want to do in native apps and in general, React Native gives you tools to connect Javascript code to native platform code because you typically build a React Native app by mostly writing Javascript code or depending on the app you're building, by entirely writing Javascript code.

* Now I say mostly, at least that's a possibility because you can also write native code for iOS or Android and React Native gives you the tools to connect your Javascript code to that native code, though that's a bit more advanced and in many apps, you will never need that and therefore, React Native gives you full flexibility, it gives you a way of connecting Javascript to native code and it also gives you a lot of pre-built native features which are conveniently usable from inside your Javascript code.

* So if you then combine React Native and the features that gives you with React.js which knows how to update a user interface and how to control a user interface, then you get everything you need to compile a real native mobile app and that's also what React Native gives you, it gives you everything you need to then take your Javascript code and compile that to a real native mobile app which you can then ship to the App Store for iOS or to the Google Play Store for Android,

* Refer image: Intro1 

### How React Native Works?

* let's take a brief look behind the scenes.

* Now as I mentioned, with React and React Native, we build an app (Refer : intro2)

* We build normal React Components as you know it from the web with Javascript because Javascript is the language we use to build React Native apps but in there, we use special components like view and text here. These are not your normal HTML elements because the normal HTML elements are not supported, the native platforms don't know how to use them, therefore you use special components given to you by React Native for which React Native is able to translate them to instructions the native platforms do understand, so that's how this works.(Refer : intro2)

* Now it's important to understand that your views, so the components you're working with, therefore are in the end compiled to real native widgets, to real native elements, to real native code. Your Javascript code where you manage your business logic will not be compiled but your views will be and that of course also means that you typically get a great performance when building React Native apps because the result is a real native app where a large chunk of the code is real native code.

* Now if we take a closer look at this component thing, it's important to understand that you can of course use React for building web apps but that you could also build native apps for Android and iOS with native code, so without React Native or that you can use React Native, so these are four different ways of building apps where of course React for the web won't give us a native app but just to compare how this would be related.

* Refer : intro3

* React Native gives you special components which are then compiled to native use

* for your other logic, so if you're using Redux or if you having any business logic, you're sending HTTP requests, you're transforming data, all your other Javascript code is not compiled to native code but instead, it's running on a special thread hosted by React Native.

* So you can imagine your React Native app which you get in the end as a real native app because it is one, where all the views have been compiled to native widgets but where there is an extra mini app inside of your app, a mini Javascript app running in there, hosted and started by React Native so to say, which runs all your Javascript code and your Javascript code can then talk to the native platform. (Refer : intro4)

* You can picture this like this here as already mentioned, your code can be split into two things here - your views and your business logic,

* as already mentioned multiple times, your views are compiled to native views, to native widgets for these platforms and your code however is kept as Javascript code and you can tap into native platform features like the camera because your Javascript code runs in a special virtual machine in the end, spun up and hosted by React Native inside of your app, 

* so the right part here is all inside of our native app which we ship to the app stores and that Javascript code, this Javascript virtual machine, knows how to talk to the native platform features, so to the operating system your app is running on in the end through a special bridge you could say and that bridge and that virtual machine, that's all automatically provided by React Native. You don't have to care about this, all you do is you write your React Native app with Javascript and with these special components( Refer : intro5) this is how a React Native app works behind the scenes

* and of course, you also understand that you have a real native app therefore in the end. Not all your code is compiled, that would be pretty impossible but your views are compiled and of course, the views, so the part the user sees, is the most important part when it comes to performance for an app because re-rendering the UI and all of that, that's typically the performance intensive part and therefore it's very good that this is compiled and that's one of the huge strengths of React Native.

### Expo vs React Native CLI

* So we want to create a new React Native app and as it turns out, we actually got two options for that.

* You have the Expo CLI quick start and the React Native CLI quick start. Now what's the difference and which approach should you use ??

* So we can use the Expo CLI, the expo tool for generating and managing our React Native app or we use the React Native CLI.

* Now if you first have that choice, you would probably go for the React Native CLI because you want to build a React Native app after all, right? Well let's have a look at what expo is.

* It's a third-party service which is completely free to use, you don't need to sign up to get started and you don't have to pay to build an app which you can publish to the App Store,so it's really free to use. What expo gives you is kind of a managed app development workflow.

* It takes a lot of the complexity away from you because building React Native apps can be very complex, especially when it comes to integrating certain native device features like accessing the camera and expo simply gives you a lot of convenience there, it makes development of React Native apps a breeze and so much easier.

* The downside is that you're limited to the expo ecosystem because expo in the end is like a wrapper you could say around your app, a thin extra layer between your app and the native raw React Native experience and you still get a native app in the end and you still use React Native under the hood, that's all happening but expo abstracts away some of the complexity, which also means it of course removes some of the finegrained control you would normally have if you build a raw React Native app because if we have a look at that other workflow, the React Native CLI, that's in the end managed by the React Native team or parts of the React Native community

* and there you have a barebone development setup, which means you get a native app, you need to install Android Studio, you need to install Xcode to build that app and you need to configure and manage a lot on your own.

* As soon as you start adding certain native device features, like let's say as soon as you want to use the device camera, you will have to bring in third-party packages where the set up process can be quite complex and therefore, this can be more cumbersome.

* You have pretty much no convenience or utility features to tap into but of course, the advantage would be that you have full control, you can control every tiny piece, you can easily write your own native Android and iOS code and connect this to your Javascript code, that's not really possible with expo.

* So if you are a super advanced developer and you already know you'll be building a very complex app where you need to do a lot of manual workarounds, a lot of finegrained configuration, then you definitely want the full bare bones experience on the right.

* If you are getting started or if you're building a normal app, then the Expo CLI will very likely give you everything you need, it gives you wrappers for the most common native device features you need, like using the camera, like using maps, that's all made super simple and if you ever get to a point where you find out oh I need more control, then you can always also switch from the expo workflow to the native workflow, you can eject and then you have the full flexibility. 

* Refer : Intro6

* Behind the scenes, this expo tool work such that you have your native device or your simulator, so your iPhone or your Android phone and you have your app, your React Native app you'll be writing, so your Javascript code where you write your React Native app. Now on your native device or on the simulator, you will install extra app from the App Store, the expo client app

* Now your app can then be loaded into the client app which is this extra wrapper to see it there, to run it there, to test it there and that's of course great for development.

* You can also publish your app as expo app so that other people who have the expo client installed can easily run your app, they don't even need to install it from the Google Play Store or the Apple App Store but of course typically you want to build an app which you can publish to these app stores and no worries, that's possible with expo too.

* That extra client app which you have, which wraps your app, is great for development because it speeds up the entire development workflow

### Creating Our First React Native App

* it's time to get started though and for this, visit expo.io. There you can click on get started and you'll find the starting steps here.

* we can jump right into step number: 2 which is that you need NodeJS. Now you need NodeJS which is a Javascript runtime that allows you for example to build server-side apps with Javascript. You don't need that because we're about to write any NodeJS code in this course, it's not a Node course, no worries, you don't need to know NodeJS but it's a package which allows us to run Javascript on our machine and for example, the expo client behind the scenes also runs on Javascript, it's totally not related to React Native, that's just for this tool to work correctly.

* So the first step is that you visit nodejs.org and there, download the latest version,

* So with NodeJS installed, let do step 3 : 

```js
npm install expo-cli --global
```
* Native projects with the help of expo globally on your machine, so that you can use it from anywhere on your machine,

* So with this, we got Expo CLI installed, the next step is to create our project, so step 4 here.

```js
expo init my-new-project
```
* and this will now create a new folder in the place where you ran this command and set up a React Native app there using expo.

* Now you probably are asked which template you want to use and there you can go with the blank template for now.Make sure you don't choose bare minimum because that would be a setup without the expo environment with all the convenience features,so definitely go with blank here.

* Now next, you'll probably be asked to enter a name for your app, that's in the end the name which is displayed in the task switcher of your app on the home screen and so on.

* Npm start will now start up the expo development tool, the expo dev tools and a new tab should open up in your browser.

* Here is that tab which did open,this here is the expo development tool or the expo dev tools as it's called.(Refer: app1)

* It's a window which allows you to run your app on different connected devices or add simulators and it allows you to generally manage parts of your app, you see some output from your app here, some warnings you might be getting and this is a very convenient window for managing your app and for running your app.

* Now also make sure that here in the terminal where you ran npm start, you'll leave that process running. (Refer : app2)

*  if you are then done for the day, you can quit it and restart it on the next day because this process will also watch your code and whenever you change something in your code and you save that change, it will automatically save this and publish it to your connected device.

* Now to device install expo client in you device and then  once this is finished,

* you can open this and now with the expo app installed, you don't need to sign up here, instead on Android you should be able to scan that barcode right from inside your expo app. On iOS, simply open up the camera app and then you can go also to the dev tools here and you'll see that barcode here, simply hold your camera onto that on iOS or the expo app scanner here on Android and you should be prompted whether you want to open an app in expo then. Simply hit open there and now this should open your app here in the expo client which you installed,

* So now this will build the Javascript bundle as you see here at the bottom or put in other words, this will now take your app and compile it basically and prepare it and then load it here over expo's servers into your app and you can simply hit got it here on the first screen and then this is your starting React Native app.

### Working on Our First App

* Now let me quickly walk you through what we have here and then show you what you can change in code to change something in your app.

* the .expo folder just hold some configuration for expo, you don't need to touch this

* The assets folder, that hold some images in this case, like the icon of your app and the splash screen image and we'll dive into how you can customize this towards the end of the course and we'll use other assets like images in general 

* Watchmenconfig, that's something you can ignore as you see it's empty here, it's a tool used behind the scenes by expo in the end 

* app.js file then the file which holds the code that is responsible for rendering what we see here on the screen.

* app.json hold some configuration for our React Native app powered by expo and we'll dive into this throughout this course as well for now, let's ignore it.

* Babel config configures how the Javascript code is optimized and compiled, you can leave the default here as well

* package.json file manages your dependencies and there you see that you're using expo but also React DOM because expo actually also supports building React apps for web but then also React Native here and React Native web because again, expo gives you the option of also building web apps with the help of React Native, it's not something we'll focus on in this course though.

* So that's the setup we have here, the important file for us at the moment is the app.js file because that's in the end responsible for getting something onto the screen.

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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

* we do import React just as we would do it in a React web app. We need to import React because here, you can also see we're using jsx which is this special Javascript syntax that looks like HTML but in the end is just Javascript

* We always have another import here and that's the React Native import where we import stylesheet, text and view from there.

* Now these are these special components and features I was talking about earlier, text and view are components provided by React Native that are compiled to native platform widgets and stylesheet is an extra feature provided by React Native that helps you with styling.

* We are having a functional component here and with the help of React hooks, we can work with functional components only as you probably know and this functional component return some jsx code that is rendered onto the screen 

* and here we're using the view widget or the view component provided by React Native and the text component and the view component is like a div, it's a good wrapper, also good for applying some styles for some containers and detects is then used for outputting some text which you put between its opening and closing tags.

* And down here, we have some styles defined, React Native does not use CSS but it uses a styling syntax that is based on CSS or follow a similar naming conventions but we'll dive deeper into how to style your React Native apps throughout this course of course.

* So with that, let's change what we see on the screen and let's actually add a button here.

* Now the good thing is, we can import a button from React Native, that's another core component provided by React Native, so we can add this import and then use a button down there. However we don't use it with an opening and closing tag

```js
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Change Text"/>
    </View>
  );
}
```
* but as a self closing element and then we can add a title prop here to set the text we see on a button, for example change text. Now when we tap this button, we might want to change this text here

* and for this, we need to manage some state here because I want to change some data which should lead to this component being re-rendered and for this, you need state.

* Now prior to React 16.8 which is supported here though, you would have to convert this to a class based component to useState, since React 16.8, we can use React hooks

* we need the useState hook which allows us to manage state in a functional component.

```js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  // we can use array destructuring to get our output text and get a function to change or reset or override this output text and that's just how the useState hook works,
  const [outputText, setOutputText] = useState('Open up App.js to start working on your app!');
  return (
    <View style={styles.container}>
      <Text>{outputText}</Text>
      <Button title="Change Text" onPress={() => setOutputText('The text changed!')}/>
    </View>
  );
}
```
* With that, we can use that hook by calling useState here and giving it a default value which could be this text here,

* it gives you an array with exactly two elements, where the first element is your current state snapshot, so either our starting state or thereafter for subsequent re-render cycles, whatever we set our state to and the second is a function that allows you to set your state to a new value and calling that function will re-render the entire component and outputText will then refer to the latest new state.

* So here between text, I want to output outputText and upon a press of this button, I want to change this.So on the button, we can therefore register onPress which is basically the equivalent to onClick which we would have in the web,

* On press we have to update state.. then you don't need to scan this code here again, just by changing the code and saving this file, it should automatically reload here. And now if we now tap change text here, you see the text changed and that's your first React Native app doing its job powered by expo

### React Native Apps Are Hard Work!

* it's important to understand that React Native is not about writing Javascript once and running it everywhere, it's instead about learning React Native once and then write code that is flexible regarding the platform it's running on.

* there aren't that many components React Native ships with that would automatically adapt the way they look to the underlying platform, you as a developer instead have to find out on which platform your code is running and then adjust your styles to that platform to get a look that fits the platform or maybe even adjust your logic to that platform.

* writing React Native code is not about writing code once but instead, you will have to add some if checks to find out on which platform you're running, to adjust the look and feel of your app based on the platform and device size your app runs on.

* So to sum it up, you have no or very little cross-platform styling of components, most components that are built into React Native don't come with a lot of styling attached to them, you have to take care about styling instead

* you only have a basic set of pre-built components anyways, don't expect a vast amount of pre-built components. If you worked with other alternatives like Flutter or Ionic, you're used to having a bunch of components which are prestyled and give you a lot of awesome functionality out of the box. React Native is much more barebone, you got some basic components

* all components that would be a bit more complex are components you will have to build on your own based on these primitives you're given 

* and indeed, you will see these primitives you're getting are actually all you need but again we're back to you will need to combine them manually and style them manually and that's something other alternatives sometimes do for you, for React Native, you have to do it on your own.

* Also as I just mentioned, for creating responsive designs where your app looks good on different device sizes and different device orientations, you don't really have tools that help you with that, you will have to write code that is flexible, that checks the available device size and that then automatically adjusts.

* So there is a lot of manual work to be done by you as you can tell but that also gives you a lot of power and in this course, you will get all the knowledge you need to master this and build truly amazing React Native applications. (Refer : app3)

### React Native alternative

* I also don't want to hide that React Native is a fast moving target, we got new versions being published almost every month. Breaking changes do happen and of course, I'll do my very best to keep this course updated to let you know about changes and how to adjust your code but sometimes, you just have to go back to an app you built six months ago and you have to change something there because something changed in the latest version of React Native and in order to continue working on your app, you need to change something in the code which used to work before,

* Also in React Native, you typically have a high dependency on third-party packages. Now the good thing is when working with expo, that's only partly true because expo already itself is such a wrapper with a lot of cool features built in, therefore you have a high dependency on expo when working with that but you don't have to find dozens of other third-party packages to access the camera, to work with Bluetooth or anything like that. If you're building a bareboned React Native app, that would be different, there only a basic set of features is built right into React Native and for most things that you want to add to your native app, you would have to reach out to other community managed packages to make them work.and even with expo, we'll need a couple of third-party packages to have everything we want.

* And React Native simply also has some bugs, not crucial ones, you can build basically any app you want with React Native but sometimes, things just don't work as you would expect them to work and you need to get creative, find workarounds and so on

* when building React Native apps, you have to be willing to stay updated, to use Google, to dive into issue discussions and to simply try things out. With expo you have a pretty smooth development experience but still, the road can be bumpy from time to time.

Refer : https://academind.com/learn/flutter/react-native-vs-flutter-vs-ionic-vs-nativescript-vs-pwa/

* we overall got tools and we can acquire knowledge that helps us overcome the challenges React Native sometimes poses, React Native is an awesome way of building native apps. You can share a code, you get great performance, you can distribute it through the app stores, that's pretty nice.

* Now one side note, you also got alternatives like Flutter or Native Script, those alternatives follow a similar approach as React Native does, you get a compiled app there, they simply use different programming languages, different frameworks

### Running the App on an Android Emulator

* Now we tested the application on a real device which is of course pretty nice and also amazing to see it run there but for development, I will actually use a simulator which is a virtual device running on my machine

* You probably also want to test the app on a simulator at some point, for example because you probably only own either Android or an iOS device and you also want to test and see your app on the respective other platform or you have both devices, you have an iPhone, you have an Android phone but you also want to test your app on an older iPhone, on a smaller Android device and with simulators and emulators, you can launch different types of devices and test your app there. 

*  To get started with that, go to the guides section down there and click on Up and Running, doesn't matter where you click though, in the end you just need to get to https://docs.expo.io/versions/v37.0.0/workflow/android-studio-emulator/

* So let's now install these things and let's start with the Android Studio emulator.

* First install android studio download from : https://developer.android.com/studio

*  Now with the Android Studio installed and the installation finished, Now follow the emulation steps as per the document.

* Do steps till bash_profile update then go to the android studio main screen -> click Configure -> select SDK Manager -> SDK Tools (Make sure you select Android SDK Build Tools, Android Emulator, Android SDK Platform-Tools, Android SDK Tools, Intel x86 Emulator, Google Services) with these checked click apply (Refer emu1)

* Next step still in main screen -> click Configure -> select AVD Manager then configure virtual device 

* I would recommend going with one that has the Play Store installed, that can help with testing certain features which we might need later but in general, you can pick any image here which you want,

* Then click green play button to launch emulator and then now we have to restart your "npm start" , this will open http://localhost:19002/ then click "Run on Android device" this will emulate our app in emulator

### Running the App on an iOS Simulator

* now let's do the same on iOS and this as I mentioned before only works on MacOS,

* First install xcode and then open Xcode preferences in the top left corner and then make sure you got command line tools installed
here by selecting the most recent entry you have here under command line tools.(Refer emu2)

* you can now launch a simulator by going to Xcode and then open developer tool simulator here and this will now launch up an iOS simulator,then click "Run on IOS device" this will emulate our app in emulator
