## Building Apps Without Expo

### Intro

* we built React Native apps but we built them with a tool called expo, expo mostly get out of our way but it made building these apps way simpler.

* The setup process is simple, you can test it on your real device without any special configuration neither, you can easily add native modules and you have a huge catalog of built-in native modules and so on. So developing React Native apps with the help of expo is really easy and therefore my recommended way of doing it.

* Now there can be reasons why you might want to build an app without expo,

* for one you must not forget that expo of course works such that you have the expo client on your real device or also on the simulator of course, there we also in the end installed the expo client, so this app on the device and your app kind of gets loaded into that client. Now you still will be able to publish a standalone app as you learned, so you can still publish an app which you upload to the app stores where people don't need to install the client but this published app will in the end kind of include that app wrapper, so it will be a standalone app where people don't need to install the expo client app but the expo client app is part of your app you could say, so people indirectly install it if that makes sense.

* So you always have this wrapper and therefore one reason for not using expo but could be that you want to get rid of that wrapper because as you might imagine, this wrapper whilst still giving you a native app and whilst still giving you the benefits of your views being compiled to native views, whilst all of that is the case, this wrapper of course adds a little bit of size to your app, your app gets bigger.It probably also gets a bit slower because of that extra wrapper, though I still want to emphasize you get a native compiled app, right? Your views still are compiled to native code so you don't lose that,

* it's not like Ionic where Ionic use a native app as a wrapper for a web app, that's not what's happening here, still you have that overhead.So one reason for not using expo might be that you want to get rid of that extra wrapper,

* another reason could be that you need some native device functionality outside of what we used in the native feature module that isn't included in expo, so some feature which you just can't add with the help of expo and then you're stuck. If you need some feature that's not part of expo's of which you can't find here, then you can't add it to a React Native app built with expo, there's no way for that. You can't write your own native code and connect it and you can't bring other third-party packages which tap into native device features, that's not supported in expo.

* So these could be two reasons for why you want to switch away - you want to get rid of that wrapper because every millisecond of performance matters to you and every kilobytes of size matters to you or because of a native feature that's missing.

* But in case something is missing, you can of course also build a React Native app and we can find that on the official docs too without expo.

### Alternatives to Expo

* You could say there are around three ways of building a React Native app -
  * one is with expo with the so-called managed workflow, - zero setup, it works out of the box, you can easily test the app on a real device, you got lots of native modules built in which are super easy to install and to use. It's controlled with the expo CLI, 

  * Now an alternative to that is that you still use expo but the so-called bare workflow or that you build a React Native app without expo at all with the React Native CLI.

    * Now the expo bare workflow thing can either be created from scratch or by ejecting from the managed workflow(we will see soon)

    * Now when you build an app with the bare workflow, you get a non-expo app, you build a native app as you would build it with the React Native CLI, so you get the same basis there, the difference is that you can still use special expo packages. Installing them is a bit more complex than when you're in the managed workflow, you need to do more manual wire up work, at least for some packages but many, not all but many of the expo packages which are included in the managed workflow are available as standalone packages you can bring to any React Native app as well

    * So you can bring that and with the bare workflow, it's relatively easy to add these packages, not as easy and quick as in the manage workflow but still, very easy. 

    * When building an app without expo at all, with the React Native CLI, you can still bring these packages but then more manual setup is required. Now as I said, it's relatively easy to configure and manage in the bare workflow, you have to manage more in the React Native CLI workflow, so there you really build everything without any support by expo.

    * Regarding the native modules you use, you can use any native module you want, also non-expo ones, you can bring these special expo packages which you need to wire up manually but you can bring any other native module.

    * Now when we come to building the app and distributing it, with the managed workflow you will see in the deployment module that's super easy to do, with the bare workflow it's a bit "harder" in quotes, it requires more work with Android Studio and Xcode and it's not as easy as with the expo managed workflow, you also for example and that's one important restriction, you will not be able to build iOS apps on Windows. That is possible in the managed workflow because the build won't happen on your machine there but in the cloud, with the bare workflow and with the React Native CLI, you are responsible for building the apps and therefore, you need to do it locally on your machine and therefore due to Apple's restrictions, you will not be able to build an iOS app on Windows or Linux,

* In this module I want to show you how you build an app with the React Native CLI, how you also build it with expo in the bare workflow and how you can eject from the managed workflow to the bare workflow. Refer image(alternatives1)

* The way you write your components and so on and which components you use from React Native, that does not differ at all because there was nothing specific about expo in that. Put it in other words if we have a look at the project we worked on earlier in the course, this native module project, essentially what you'll lose when you're not using the managed workflow is all the expo related imports, everything you're importing from expo, that basically is something which now is harder or which you now need to do differently.

* If you're not using expo like in this file, such a file would not need to change at all, only files where you use something from expo need to be adjusted or need to be implemented differently when not using the managed workflow or to be precise, you might not be able to use certain packages anymore or you can still use them and you probably don't even need to touch your code at all but in order to use them you need to do more manual setup work than you need to do with expo and the managed workflow.

### Building Apps with Just the React Native CLI

* So what are our alternatives to the managed workflow? One alternative is to use the React Native CLI, Refer : https://reactnative.dev/docs/environment-setup

* Based on your Development OS and Targeted OS we have to follow different steps just follow that.. but android studio and Xcode are mandtory tools.

* Now you also no matter for which platform you're working, you also need to install the React Native CLI,

```js
sudo npm install -g react-native-cli
```
* this will now globally install the React Native CLI, for that you also need NodeJS installed, Now with the React Native CLI installed, we can start creating a project totally without expo

```js
react-native init RNWithoutExpo
```
* Now important again, you now need to have Android Studio and Xcode installed and configured as mentioned in the official docs

* So now let's wait for this setup to finish here and once this is done you can follow the instructions here to in the end run your app.

* move to your project and then run emulator

```js
~ cd RNWithoutExpo
~ react-native run-ios
```
* Now let's have a look at the code that is responsible for that, does that now look totally different than what we saw thus far? For that, I loaded the project here again with Visual Studio Code, so the same set up as before and what you see looks a bit different but mostly, we have a bunch of different configuration files, fair enough but that doesn't really change the way we write our code. Very important, we got an Android and an iOS folder, we didn't have that before,

* but those folders contain the real native app projects which are built with the help of Android Studio and Xcode and your code gets kind of built into that you could say, React Native does all that for you

* but if we have a look at the concrete code in the app.js file, well that is just what we already used, right? 

* We write the same code, we use the same components, they get compiled to native widgets, that all does not change when we use expo, the only difference is that with expo, we don't have to set up as much, the build is a bit faster and adding native modules is super easy, testing on real devices is super easy, it's simply easier, we build the app in the same way though and that's something you can see here as well.

* Now one extra thing you'll find here is the index.js file, we didn't have that in expo, that kind of is the basic configuration file that launches your app you could say, that makes sure that this app component gets rendered to the screen, that's something expo did for you in the React Native expo app but other than that, it's really just the same and you would build an app in the same way.

### Live Reload and RN CLI Apps

* In the current "RN-CLI only" setup, the app wouldn't reload when changing code

* Unlike in Expo apps, "live reload" needs to be enabled.

* To do this, open the developer menu on the device

* For Android Emulators: CTRL + M (or CMD + M on a Mac)

* For iOS Simulators: CMD + D

* Or (both platforms): Shake the device, Then "Enable Live Reload"

### Adding Native Modules to Non-Expo Apps

* Now what I want to do here is I want to show you how you can of course change the code but then also how we could add a native functionality in such a vanilla React Native app.

```js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Button
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const App: () => React$Node = () => {


  // onPress, I want to open the image picker. Now how can we add this?
  // Now since this is a React Native project without expo in any way, we can't easily use the expo APIs here.
  // There actually is a way of using them and I'll come back to that later in this module

  //  if you're working with a vanilla React Native app,

  // we search for React Native image picker for example to find a package that helps us with that, for example this one, the React Native image picker package

  // Refer : https://www.npmjs.com/package/react-native-image-picker

  // and now we can install this because now we can bring any third-party package, no matter if it adds native functionalities or not into your app.
  //Previously with expo, this was not really possible, there you could only bring third-party packages that did not tap into native device features, now you got no restrictions.

  // "npm install --save react-native-image-picker"

  // and then this "react-native link react-native-image-picker"

  // Now I will say there are third-party packages that take more effort, it really depends on the package. For expo,

  // it obviously was very easy, you just ran expo install, that was very fast, didn't take that long and you didn't need to do anything else.

  // Here you need to run one extra command but of course that's also not too bad but again, I will say not all packages support this command,

 // some packages require way more manual wire up work, manual work where you then actually need to dive into the Android and iOS folders to start working on some configuration files there.

  // That's what the React Native link command did for you, for example on Android if you dive into the app

  // folder and there, source and then in the source folder into build gradle, you will see that there, this line was added.

  // This wasn't there from the beginning, this was added by the React Native link command

  // some packages even support autolinking where this linking will be done automatically once installation

  // finished but not all packages have that support, so that's something to be aware of. Behind the scenes, a lot of configuration was changed.
  const pickImage = () => {
    // copied from package
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.uri)
      }
    });
  }
  return (
    <View>
      <Button title="Take Image" onPress={pickImage}></Button> 
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex : 1,
    justifyContent : 'center',
    alignItems: 'center'
  }
});

export default App;
```
* On running android i faced issue "Deprecated Gradle features were used in this build, making it incompatible with Gradle 7.0.
Use '--warning-mode all' to show the individual deprecation warnings." Could not determine the dependencies of task ':app:installDebug'.

* for that i updated Gradle

```js
cd android
./gradlew wrapper --gradle-version 6.5

* and then run "gradlew clean"

* Move to root cd.. and run react-native start

* In another console run in your project react-native run-android

```
* Now here's the app coming up and if I press it, I get this overlay, I can click take photo and nothing happens.Reason for that is missing permissions and that's the manual work I meant. 

* We have to go into the Android folder, there into source, main, AndroidManifest which configures the Android app and there you have to add a new permission. 

* there you can now add the camera permission which you need to add for this app to be able to access the device camera, otherwise this is not supported.
```js
// RNWithoutExpo/android/app/src/main/AndroidManifest.xml
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```
* On iOS by the way, you also need to do something similar whilst this rebuilds.f you go into your RNWithoutExpo file, you find the info.plist file and in that file, you also need to add an entry to ask for this permission.

* Refer : https://github.com/react-native-image-picker/react-native-image-picker#readme
* Refer : https://github.com/react-native-image-picker/react-native-image-picker/blob/master/docs/Install.md

* similary for IOS

```js
// RNWithoutExpo/ios/RNWithoutExpo/Info.plist
<key>NSPhotoLibraryUsageDescription</key>
<string>$(PRODUCT_NAME) would like access to your photo gallery</string>
<key>NSCameraUsageDescription</key>
<string>$(PRODUCT_NAME) would like to use your camera</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>$(PRODUCT_NAME) would like to save photos to your photo gallery</string>
<key>NSMicrophoneUsageDescription</key>
<string>$(PRODUCT_NAME) would like to use your microphone (for videos)</string>
<key>UILaunchStoryboardName</key>
<string>LaunchScreen</string>
```
* This however is how you can bring third-party packages that tap into native device features to a React Native only app for your component code which you write, that's the same code we srote throughout the entire course - same components, same logic, same way of how you build your app. You can create the same folders, you can add React navigation, that all doesn't change.

### Understanding Expo's "Bare Workflow"

* So you learned how you can use to React Native CLI to create React Native projects. These are projects which have no connection to expo and which are therefore totally managed by you

* where you can therefore add any third-party package actually, including some expo packages which are available outside of the managed workflow as well but you need to configure everything on your own, that can be easy depending on the package you're using but it also can be harder. Now there is kind of a middle way between the expo managed workflow and the pure, you need to do everything on your own, workflow and that's the expo bare workflow

* Now what's the bare workflow here?

* The bare workflow includes a React Native app as you would created with the React Native CLI, so not a managed app with expo as a wrapper but a native app, that however is already preconfigured to support a lot of the expo packages, not all but the expo team is working on making more and more available outside of the managed workflow but a lot of them are already included and you could check the supported APIs 

* Refer : https://docs.expo.io/bare/unimodules-full-list/

* The idea behind the bare workflow is that you have this raw native development experience where you need to use Android Studio and Xcode, so you don't have the expo CLI and the expo client helping you, so you need to do that manually with the help of the React Native CLI but where adding native functionality is easier, so where you need to do less configuration maybe, where you can use these powerful native packages that expo offers you where you can use all of that without having the limitations expo gives you,though I want to put limitations into quotes because you don't have that many limitations actually in the managed workflow.

* So let me show you how to get started with that bare workflow and of course for that, you can also check the official docs.

* Refer : https://docs.expo.io/bare/hello-world/

* For base workflow we need both expo-cli and react-native-cli

```js
npm i -g expo-cli

npm i -g react-native-cli

expo init PROJECT_NAME   //chose bare minimum template
```
* This will create a new project, a new React Native project pretty much like React Native init would do, so if you only used the React Native CLI but preconfigured such that you can already use a lot of these supported or all of these supported APIs.

* Now important, the project setup we're getting here could also be achieved with this React Native CLI created set up where I didn't use the expo CLI at all because the magic happens with the help of these React Native unimodules here.

* This is a package in the end provided by the expo team which helps you tap into the native device features you can get in the managed workflow outside of the managed workflow as well.

* Refer : https://docs.expo.io/bare/installing-unimodules/

* Here you find instructions how you need to configure this and all this configuration which is described here so all these things here right, which you need to do if you would want to use this package and therefore the expo native features in a normal React Native non-expo app,

* Refer : https://github.com/unimodules/react-native-unimodules/tree/%40wkozyra95/ignore-enabled-modules-directory

* you would have to do them manually for such a project created with the React Native CLI and that's exactly what expo init with this bare workflow does for us, it gives us such a React Native project as if we would have created it with the React Native CLI and it preconfigures it following all these steps,so then we don't have to do that.

* So that's something we can take advantage of of course,so let me open this project

* In the end, you'll get the same setup as with the React Native CLI but as I mentioned with the Android and iOS folder with these Android and iOS projects preconfigured as described on the unimodules page so that you don't have to do this

* and with this preconfiguration, you can now easily add third-party packages, you can add any third-party package, you could for example now also again use the React Native image picker,

* so what we added before, what we couldn't add to a managed workflow app, this package here, you can easily add this to a bare workflow app because this is just a React Native app without expo, so you can add this but now unlike in a normal React Native only app without expo, you can also bring any of the expo APIs which are listed here, like the expo location package which we used

* You can now easily install this by following the installation instructions you're linked to here for the bare workflow, you would then have to follow the installation instructions you find here on the expo location package

* Refer : https://github.com/expo/expo/tree/master/packages/expo-location

* there you learn that you can install it with this command, then run port install in the iOS directory and no extra setup for Android is required. So fair enough, not too difficult and therefore you could maybe say you get the best of both worlds, you have a native app with React Native CLI and you can still tap into some expo features, though

* be aware of course that if you run this app, if you do this of course with react-native run-android for example and therefore this requires Android Studio, it builds it locally on your system, you therefore take a bit longer, you need to set up everything on your system and for deploying the app and so on you also have to manage it all here on your local machine, 

* so you get no convenience features which expo gives you in the managed workflow where this building and testing is super quick, where you can quickly test it on a real device and so on, all of that is missing here too.

* You have a React Native project without expo but using certain expo APIs is easier, that's the idea behind the bare workflow and since expo has many amazing APIs, that of course is a pretty good reason for using it because these APIs, these packages are also pretty guaranteed to be continued and maintained which is not necessarily the case for all other third-party packages

### Ejecting from Expo's "Managed Workflow"

* Now besides setting up a new project from scratch with React Native CLI or with the expo CLI and then choosing the bare workflow,

* you can even convert a managed project into a React Native bare workflow project and that's pretty cool because that means you can get all the convenience features of the managed workflow during development and once you're done for example or once you need a certain third-party package which integrates some feature you don't have built into expo and you absolutely need, in such a case you can still switch and you don't have to rebuild the app from scratch and create a brand new project and copy over your code.

* How? Well in your project and this is the native device feature

* we build earlier in the course where we can add places, where we are of course using the location, maps, the camera, SQLite,where we are using all these things, there in this project, you can simply run 

```js
expo eject
```
* this transforms your project into a non-expo managed workflow project. Important though, there is no going back, of course you can copy your folder and make a backup copy and save this or if you're using git, you can of course go back to an earlier commit but if you haven't saved your project, once you eject it, you can't transform it back, so be aware of this.

* So here if you run expo eject, you should actually be asked to which kind of project you want to eject and here I got two options in the end

* the two options I have are bare and expo kit. Expo kit is deprecated, this is basically what we had before we had the bare workflow, so you shouldn't really switch to this, instead you can switch to bare here which simply means that now this will be transformed to a React Native project, as if it would be created with the React Native CLI without the expo wrapper but it will be preconfigured as mentioned here on the react-native-unimodules page which is it is kind of this package which expo needs to expose all these expo APIs to a non-expo app.

* So it will preconfigure all these things during ejection so that you don't have to do that, so you get a React Native plus app so to say. So if I hit enter here and now important, you can't go back once this completed, 

* but that's up to you and now this will do its job. It transforms the project, it adds an Android folder and since I'm on macOS, it also adds an iOS folder. 

* and it preconfigures everything and installs a couple of dependencies so that you can use your existing code and all the expo packages you already installed in this bare setup, so it does not just set up all the unimodules stuff here, it also makes sure that all the packages you are already using, like expo location or expo SQLite, that those packages also work.

* Once eject done! you see it actually tells me that it generally did its job but there were two packages which require some manual setup.

* You can simply click on these links to get instructions on what you need to do there, it's the expo image picker and the React Native maps package where you need to do some manual installation to finish it up.

* So here on the expo image picker page, in the end what we need to do is we need to run port install in the iOS folder, so we need to do all the things after installing the package. So in the project folder, I'll navigate into iOS and run port install, port is like npm for iOS, it installs some dependencies which iOS needs to work correctly, so that's what's happening now and once this is done, we'll also need to add this entry here to the Android manifest, so that's also something we'll need to do. So we need to go to the Android folder, the app folder there and in the source folder, the AndroidManifest and then as described here, add this inside of the application tags. So here is application and in there, we should add this activity entry here, like this, that's required.

* Now we have to minor configuration as per the github page suggest.. the we can run as usual..

### When To Use Which?

* which approach should you use for your application?

* using expo in general is an awesome development experience, everything is super fast, it's easy to test changes both on simulators and real devices. You don't need to build locally, therefore you can also build and test for and on iOS, on Windows systems and Linux which is not possible without the managed workflow and that's all pretty cool.

* But when we compare expo to non-expo setups and with non-expo, I mean both creating it with React Native CLI or using a bare expo workflow, then of course we have to compare all the things.

* So as mentioned with expo, with the managed workflow, it's easy to use that, easy to develop, non-expo means more manual setup and so on.

* Now you also will have an easy time deploying your app as you will also see in the deployment section and you can even build and deploy for iOS if you're on the Windows or Linux machine, something which is not possible without the managed workflow.

* When in the expo managed workflow world, we also have a rich suit of native modules, so all these expo APIs which are always easy to use, just an expo installed away, don't need any setup so that's really amazing and you got pretty much everything you could want in a native app there - camera, location, filesystem, it's all there.

* If you sometimes need something which is not supported though or you need to write your own native code that you want to connect to React Native, your own package or whatever it is, then non-expo is the solution. So there you can use any native code but of course, you need to set it up manually and that might be easy with React Native link as you saw or even some autolinking libraries but you might also have libraries that take more effort.

* In addition, it's worth noting that of course third-party libraries need to be maintained to stay up to date with React Native and newer versions of React Native but also they need to stay up to date with Android and iOS,
right, because these platforms also evolve and introduce new features or deprecate old features. The expo APIs are pretty guaranteed to be maintained because the expo team is active, is working on that and it's a whole ecosystem that works together. That might not be true for all third-party packages, so this extra security you get with the expo packages is definitely pretty nice.

* That being said as you saw with the bare workflow, you can of course also add certain but not all expo APIs to non-managed apps, that is possible but takes a bit more work.

* Now of course the managed workflow has downsides, it's a wrapper around your app and that of course impacts both the size and performance, most likely not in a way that you will feel or see but it's worth noting, there is a thin extra wrapper and you don't have that in the bare workflow or when just working with the React Native CLI and of course as mentioned, you're restricted to the built-in native modules.

* There are a bunch of those and probably everything you might ever need but if you need something else which is not built into expo, so an API which is not supported by expo, then there is no way to get it to work, then you need to eject because only non-expo and with that I mean non-managed workflow apps support all third-party packages and all native modules

* So therefore my suggestion would be that for most apps, pretty much all apps probably, you work with expo because of the great development experience and the great flexibility you have there.

* Since you can always eject, there there's not much to lose, you can always go back to a non-expo managed app if you want to as you saw

*  starting with such a non-expo app, so with a bare app or even with just a React Native CLI app is a good idea
if you know that you will need a lot of native functionalities that are not supported by expo or if you're building a high performance application where every kilobytes of extra wrapping matters, then of course you might start with such an app but otherwise I really see no strong reason for why not to use expo and especially if you're not working in a huge team, in a corporation or anything like that, being able to build iOS apps on Windows too is really a nice thing, so that alone is also good reason for staying in the managed world.

* Refer : alternatives2 image

* These resources might be helpful:

* "Why Not Expo?": https://docs.expo.io/versions/v34.0.0/introduction/why-not-expo/

* React Native Setup without Expo: https://facebook.github.io/react-native/docs/getting-started#installing-dependencies