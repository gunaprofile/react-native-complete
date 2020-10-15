## Publishing React Native Apps

### Intro

* Now obviously, you now want to get it into the app stores, into the Apple App Store and the Google Play store.

* we'll dive into how you may deploy your app, both if you're using the managed workflow expo provides or if you're having a raw app created with the React Native CLI or with the bare workflow expo offers.

### Deployment Steps

* so the next step is that we configure the app and the deployment. That means that we set a name for the app, an identifier which identifies it in the app stores, every app needs a unique identifier and so on. In the expo managed workflow, this also means that we can configure some additional nice features which I'll dive into.

* Now you obviously also want to add your own icons and a nice splash screen, so a loading screen before the app opens up to your app.

* Last but not least, it's time to then build and deploy the app. (Refer image delpoy1)

* building the app means that you now bundle up your app into a deployable app bundle and deploying then really means that you set up the store page in the Apple App Store or Google Play Store and that you then get your file into that store That's the last step

* then of course it's all about tweaking that store page and uploading some nice images there, setting description texts and so on.

* So these are the steps you typically go through and in this module, we'll have a look at the deployment related steps and the configuration steps and I will show you how you can get your app onto the devices of other users.

* Of course there also is kind of a difference if we talk about expo apps and non-expo apps if you want to call it like this. 

* With expo apps, I mean apps that use managed workflow and non-expo means bare app, so using the bare workflow offered by expo or not using expo at all created with the React Native CLI.

*  In the managed approach, you have the app.json file which you can use to configure your application, assets like icons and splash screen are automatically created for you, you just provide some input assets there and then all the creation and optimization is handled for you. 

* You have a command which you can run to publish your app and then commands to build for the different platform, for the different operating systems and that build will happen on cloud servers provided by the expo team,

* so you can even build for iOS if you're running on Windows or Linux machine, something you can not do if you have to build manually on your own, then you can only build iOS apps on a Mac and you even get a nice feature, a nice extra feature which is called over the air updates which allows you to push basic updates, code changes and so on to apps which are running on other devices over the air, so over the Internet, over expo's servers without the need for those users to update your app physically. So they don't have to install a new version from the App Store, instead you can push such code changes behind the scenes, you can live update these apps whilst they're running on other machines or on other devices which is pretty sweet.

* Now in non-expo apps, you have to configure everything manually. You have to set up the name, identifier and so on manually in different files. You have to provide all the icons manually, create them manually, so a lot of manual stuff involved there and you also have to orchestrate the entire build manually

* So you have to build the app via Android Studio and Xcode and the that's of course a lot of simply manual work you have to do and you have no built-in over the air updates. 

* There are other third party services you can use and therefore you can get that feature to work in this approach too but it's just not as easy as with the expo managed workflow, that's just something to be aware of.(Refer : deploy2)

### Configuring the App & Publishing

* What I got here is this application we built earlier in the course with the native device features, with the camera, maps and so on.

* Now we should have a look at the app.json file because that's the file where we can generally configure this app for deployment and for publishing it and I want to walk you through some of the core settings you can make here and you should make here.

* Refer : https://docs.expo.io/workflow/configuration/?redirected

* you learn all about the possible settings you can set up there and what they mean, what they do and what you would need them for. So there's a lot you can configure but for a basic deployment, most of these things don't matter.

```json
{
  "expo": {
    "name": "Great Places", // this is also a name that will show up on the home screen when you build this app as a standalone app
    "description" : "some text", // this will not show up in app store this is for expo publish page..
    "slug": "great-places", // Now here, we also can add a slug and that should be like this in the URL format so that this could be part of the URL
    "sdkVersion": "38.0.0", // The SDK version here simply identifies the SDK version of the expo SDK you're using
    "platforms": [
      "ios",
      "android",
      // "web"
    ],
    "version": "1.0.0", // you can describe for which platforms you want to publish 
    // you change that and you have three numbers which you can change, where typically the last number should be changed if a new version only includes tiny bug fixes but no major new features.

    // The middle number should be changed if you have a new version that does introduce major or important new features

    // the first number should be changed whenever you have a real major new version that might also very well include some breaking changes or some huge changes.

    "orientation": "default", // Orientation is a setting we already saw there you can lock the orientation of your app.You can set this to default to allow for rotation or for rotating the app, you can set it to portrait or landscape mode to lock it down. 
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }, // Icon and splash screen, This allows you to set an app icon and an app splash screen and you just set a pointer at an input source, at a basic file and then expo will generate a bunch of icons for different device sizes, different screen sizes which is really convenient
    "updates": {
      "fallbackToCacheTimeout": 0 // that's related to the over the air update thing which is very interesting.
    },
    "assetBundlePatterns": [
      "**/*" // this kind of has an impact on how extra assets, like images that are part of your app
    ],
    // you can also set platform specific settings here for iOS and Android.
    "ios": {
      "supportsTablet": true
    },
    // "web": {
    //   "favicon": "./assets/favicon.png"
    // }
  }
}


```
* Now if you want to publish your app, you can do this in a very simple way, you just need to run

```js
expo publish
``` 
* Now when you first run this, you will be prompted to log in with your expo account or create a new one if you don't have one yet.

* So simply create one, it's free, it doesn't cost you anything, you just need to create one, you can do this on the fly after running expo publish, as I said you will be prompted to create an account or log in if you aren't already and there you can create the account on the go in this command line here.

* All you need is an email, a username and a password. Once you did this and you run expo publish, this will try to publish your app and no worries, it will not immediately publish it to the app stores.

* with all of that, it's now uploading the Javascript bundles, we don't know where but we'll see in a second,

* So did it now create an app and upload it to the app stores? No, that's not what happened here.

* Instead what it did here is it created a deployment, it published our app to expo. that will create a link like below:

```js
https://expo.io/@linkguna/rn-native
```
* what you find is your app now hosted on expo servers so to say and you can scan this barcode here with a real device, with the expo client app. So basically what we already did during development can now be done with our published app,

* Here's my iPhone and now again I just point my camera at this QR code or with Android, you open your expo app and scan the barcode there and now you can open that app in expo. Now again, you need the expo client installed for this.mNow what you'll also see here on the screen however is a warning that I can't open this app because I'm not the author of the experience.

* So the expo client on iOS site as you see here can no longer open published projects that don't belong to the signed in user. Now that's an iOS limitation, on Android you would be able to open this app but of course the question is in general, why would we publish our app like this?

* It's very hard to reach users with this,they need to have the expo client app installed which almost no one has in the world, probably just a couple of React Native developers, so this is not really how we want to distribute our app, right?

* Well this is just one step of distributing our app and this is actually not how we aim to target it or how we aim to get it to all users over the world, instead this is just one step of publishing it to the app stores. 

* So for this, it's nice but of course, this is not the final solution for really publishing this to unknown users.

### Configuring Icons & The Splash Screen

* Now what I'm interested in right now is the icon and splash screen part because that's the icon people will see on the home screen, of course not yet because right now we're not publishing the apps to the App Store but that will change and the splash screen,well that's what users see when our app loads and both are things you typically want to customize.

* we want to provide our own icon, our own splash screen image here. 

* Now you're really flexible regarding what you provide here but in general, it's a good idea to provide an icon in the 1024 x 1024 resolution, so a square icon as an input 

* and for the splash screen, you can build a splash screen as described in the official docs. Refer : https://docs.expo.io/guides/splash-screens/?redirected

* we can place our new icon and splashscreen inside assets folder and update the corresponding name in our app.json

```json
    "icon": "./assets/places.png",
    "splash": {
      "image": "./assets/splash_icon.png",
      "resizeMode": "contain", // resize mode here can be set to contain or cover, 
      // cover will basically stretch the icon to take the full available width and height, 
      // contain will keep the icon size, center it and have that background color behind the icon. 
      "backgroundColor": "#171717"
    },
```

* lets try with our emulator

* Now as you can tell, the icon doesn't look that great on Android though. The reason for that is that Android depending on the version of Android you're running on your device uses different icons, newer more recent versions of Android use these so-called adaptive icons which are these rounded icons where you have your icon in the middle and then some background color or a background image even behind them,older versions would use square icons.

* Refer that doc for platform based configuration for icon and splash screen.

* Now the interesting thing is for Android, you can not just set a specific icon splash screen, you can also set an adaptive icon here with the adaptive icon configuration, that's not available for iOS because adaptive icons are exclusive to Android.

* Adaptive icon takes a Javascript object so to say as a configuration value, not a string and this object can have three keys - a foreground image, a background color or a background image.

* Now you have either a background color or a background image but you always should have a foreground image.

```json
"android": {
  "adaptiveIcon":{
    "foregroundImage": "./assets/places-adaptive.png",
    "backgroundColor" : "#171717"
  }
}
```
* he new one will be taken into account though once we built this app as a standalone app and distribute it to the app stores. In general, the recommendation is that for Android, you do set such an adaptive icon because you cover more Android versions which doesn't hurt of course. 

* Setting such a general icon is also not a bad idea and of course we can either use one and the same icon for both iOS and Android or you set specific icons for iOS and for Android, as mentioned for Android possibly, the adaptive icon.

Refer Splash Screen : https://docs.expo.io/guides/splash-screens/?redirected
Refer Icon : https://docs.expo.io/guides/app-icons/?redirected

### Working with Offline Asset Bundles

* Now besides icons and splash screen, our app also might include other assets. This app actually doesn't but you might have other images here in the asset folder which you're using in your app with image component, so not network images but local images as we also use them earlier or you might be using custom fonts as I did

* Now if you do that, there is actually something interesting happening in a managed expo app. When you publish your app and even if you later deploy it to the app stores which I will show you, these assets by default are actually taken by expo, are optimized and so on and are then uploaded onto one of their servers for free but they're uploaded there and your app is configured to download them from the servers when it launches.

* Now the advantage of this is that your app bundle is kept a bit smaller because the files are not included in your app but instead live on a server and are downloaded into the running app

* but the disadvantage of this approach can be that your app always needs an Internet connection because if you don't have an internet connection, your images and your fonts can't be loaded into the app and that of course might lead to your app not working in the way it should.

* So therefore, you actually might not want to have your images or fonts uploaded to expo's servers or at least not all of them and that's what you can control with that asset bundle patterns setting in the app.json file. Whichever path or paths you provide here will be excluded from uploading and you can use wild cards.

```json
"assetBundlePatterns": [
      "**/*"
    ],
```
* Now as you see, what this basically says is all files should not be uploaded, so all files should be included into the app bundle.

* If this would be an empty array or if this would not be set at all, this option, then you would have the default behavior of uploading all assets to the servers.

* With this approach which was preconfigured here, you say upload everything to expo's servers except for what you find in this path and this path on the other hand is a wild card that says everything, so every file in every folder of this project should be part of the app bundle, so actually nothing will be uploaded with this setting.

* You could also be saying everything in assets or maybe everything in assets and subfolders of assets should be part of the asset bundle, if you had any other files which you use the app in other folders, you would upload them. So you can really control this in great detail

```json
"assetBundlePatterns": [
      "assets/**/*"
    ]
```

* and therefore you can control what's part of your bundle, therefore increasing the size of it a little bit and the loading time of the app a little bit or what should be stored on servers, which might make your bundle a bit smaller but which forces you to always have an internet connection.

* Refer : https://docs.expo.io/guides/offline-support/?redirected

### Using "Over the Air Updates" (OTA Updates)

* There also are more things you can set up of course, one thing I want to dive into are the over the air updates though which you control with the updates key in the app.json file.

* Now that's a neat feature, which means that people running your app on their device no matter if it's just running in the expo client because they scan such a barcode which as I mentioned isn't too useful or if they really downloaded it from the app stores, as long as you build your app in the managed expo workflow, you get the over the air update functionality built in your code.

* that means that if you change something in your code, no matter what you do, whenever you publish this update with the expo publish command, all your users, even if they installed the app from the app stores will get this update in their app the next time they open the app and that's important. 

* You can configure the functionality here in the updates key. 

```js
 "updates": {
  "fallbackToCacheTimeout": 0 // you can configure how long the app when users launch it
// on their device should check for updates and try to load them before it displays the recent available version
// By setting this to zero, you're saying whenever the app launches, it immediately displays what it has.
},
```
*  Again in the official docs, you learned more about this update key and what you can set there. What you can set, for example is if it's generally enabled which by default it is

*  It looks for updates behind the scenes and for the next launch, it might then take them into account but it doesn't try to look for updates and download them before actually loading the app.

```js
 "updates": {
  "fallbackToCacheTimeout": 5000 
},
```
* Now you could change this to let's say five seconds, this is a millisecond value, so five thousand milliseconds which is five seconds.This would mean that when people launch the app, they will see the launch screen for up to five seconds which is of course quite long because after loading everything else, expo or your app tries to look for an update and if it finds an update, it tries to download it and take it into account.That might be done in five seconds, it might be done faster in which case your app will also launch faster

* but if it takes longer than five seconds, then it'll continue with the updating but not immediately load it but instead load the most recent version that is available. Now it's of course up to you what you prefer,

* this approach  ("fallbackToCacheTimeout": 0 )makes sure that users have the fastest possible startup experience but they only get your updated code the next time the app is launched.

* This approach or setting this to an even higher value like 10 seconds means that users get newer versions more frequently or quicker because they get it on the next app launch already but the downside is that the app launch might take a bit longer, which is maybe not what you want.

* So it really depends on which type of app you're building and which type of users you're targeting, what you want to set there.

* If it's a business app let's say which you distribute to your employees which needs to be updated all the time and where the user experience is not that important, you might want to take a value like 10 seconds here,

* if it's an app you share with normal end users around the world, you might want to go for a faster start up time to provide a good user experience and sacrifice update speed for that, so users would then only get the update on the next launch after this launch.

* With all of that out of the way, let's actually have a look at all of this and also at this over the air update feature.

* I changed a couple of settings here and therefore what I'll now do is I'll run expo publish again, still that's the command which will not get it in the app stores but which will share it here on this expo page so to say. 

* Now let's change that in our code. So let's go to the code here and on the screen here in the new place screen where we set this title, let's change this to add new place, it's a tiny change but still. So now if I run expo publish again, this app will be bundled up and will be published to the expo servers again.

* since we used "fallbackToCacheTimeout": 0 you could see the update only after the second launch.

* Now the app on the device technically didn't change, just what's in there changed, our Javascript code changed and since we have this expo wrapper, this means that expo can take this into account and use this new code

* and this will also work if you publish your app to the app stores because there whilst you will build a standalone app and people won't need the expo client, you will still include that expo client app into your standalone app as I mentioned earlier, so your standalone app kind of has the thin expo wrapper the expo client built in and wrapped around your app, that's why over the air updates will even work there.

### Building the Apps for Deployment (iOS & Android)

Refer : https://docs.expo.io/distribution/building-standalone-apps/?redirected

* When building for the app stores, the expo CLI,will help you but you might need to tweak your configuration in the app.json file depending on which features your application uses.

* So our application here uses a bunch of native modules, these modules all need to request permissions and we kind of do this with the permissions API, like for example in the image picker here when we ask for permissions but for Android for example, you also need to provide a list of the permissions your app needs in a configuration file which you, when you use React Native only have but which you don't have when using expo because expo provides this wrapper and does all of that for you in the expo client

* but now we don't plan on using the expo client anymore and whilst it will include this into your standalone app as I mentioned, you now need to tell expo which permissions it should request there.

* In addition for example if you're using Google Maps, you also need to provide your Google Maps API key and with that, I don't mean as we're doing it here which we use in some parts of our Javascript code but to use the React Native maps package.

* Again the expo client app basically uses its own key for development and so on but as soon as you plan on offering a standalone app, you need to bring your own keys so that the expo wrapper which will be included in your standalone app will use your key because the expo team won't give you a key owned by them for that.

* Again, the official docs are your friends, there you can learn what you can set up in the app.json file and let's start with Android because there, you'll have to configure a bit more before we dive into what's specific about iOS.

* So for Android, besides icon and so on, what you can configure there are the permissions.

* Now the thing is you can just omit the permissions key and in that case as you see here, expo will actually setup your app to request all permissions.

* Now I would not recommend doing that because people will look at your app in the App Store and if they see that your basic place management app wants permissions to read their contacts or make calls, well I don't know about you but I wouldn't download such an app.

* So my recommendation would be that you are specific regarding the permissions your app needs and you do that by going to your app.json file and there in the Android node, you add the permissions key and now you add permissions.

* Refer : https://docs.expo.io/versions/latest/config/app/#permissions

* Now some base permissions will always be requested and you find these permissions here, for example permissions to get data from the Internet and so on but you can now also for example add permissions to use the user location and access the camera because that's something we will do.

```json
"android": {
  "adaptiveIcon":{
    "foregroundImage": "./assets/places-adaptive.png",
    "backgroundColor" : "#171717"
  },
  "permissions" : ["ACCESS_FINE_LOCATION","CAMERA","WRITE_EXTERNAL_STORAGE"]
}
```
* So let's add these keys here to permissions like this, to string keys with double quotes by the way, that's important in this file, added to this permissions array.

* but of course depending on the application you're building, carefully check which permissions your app will need,

* So permissions are one thing, in addition if you're using Google Maps, you should add the Google Maps node to your Android configuration.

* Again you didn't need that for the expo client when we publish the app to this expo page and used the expo client app because there the expo team basically gives you their own Google Maps key but if you're building a standalone app, you need to provide your own one.

```json
"android": {
      "adaptiveIcon":{
        "foregroundImage": "./assets/places-adaptive.png",
        "backgroundColor" : "#171717"
      },
      "permissions" : ["ACCESS_FINE_LOCATION","CAMERA"],
      "config": {
        "googleMaps" : {
          "apiKey": "Get_REAL_API_KEY"
        }
      }
    }
```

* so in the Google cloud console when you check your API library, you make sure that the maps SDK for Android is enabled for this project to which this API key you provided belongs. So here it is enabled,this has to belong to the project for which you created that API key which you now are providing here, otherwise this won't work.

* So these are the permissions and Google Map settings and you might need other specific settings which you can learn about here in the app.json file depending on which features you're using.

* one thing you absolutely need to provide to build your app is also this package key.This is something you always have to add no matter what your app uses, here in the Android node, you need to provide the package key

* and this now has to have a certain format. It's basically an inverse URL, a fictional URL which doesn't have to exist but which acts as a unique identifier across the entire Google Play Store,

* so it should be an inverse URL which no one else has used before and therefore typically if you own a domain, you would use your domain for example com.cisco, 

```json
"android": {
      "package": "com.cisco.great-places",
      "adaptiveIcon":{
        "foregroundImage": "./assets/places-adaptive.png",
        "backgroundColor" : "#171717"
      },
      "permissions" : ["ACCESS_FINE_LOCATION","CAMERA"],
      "config": {
        "googleMaps" : {
          "apiKey": "Get_REAL_API_KEY"
        }
      }
    }
```
* so an inverse domain and then a unique identifier, like great places. You can come up with any URL you want here but of course again it should be unique and you should therefore use your own domain or a fictional domain which isn't owned by anyone,

* You also need to provide something similar on iOS, there if you go to iOS, you don't need to provide this permission setting stuff because iOS permissions work differently, you would need to provide a Google Maps API key if you use the Google Maps version of the maps package for iOS, the default of this package however is to use Apple Maps and I haven't changed this in my app so I don't need to provide Google Maps API here but what you definitely need to provide here is a bundle identifier.

```json
"ios": {
      "bundleIdentifier": "com.cisco.great-places",
      "supportsTablet": true
    },
```
 * Now besides these identifiers, you also need to set something else, on iOS you need to add a build number

 * build number should be a string which identifies your build. There, you should have a build number just like this version up there and working in the way I explained it up there.

 * So it should be a number consisting of three digits where you have a patch number for patches, bug fixes, then this minor update number for new features which don't break everything though and this major update number,

 ```json
 "ios": {
      "bundleIdentifier": "com.cisco.great-places",
      "buildNumber" : "1.0.0",
      "supportsTablet": true
    },
 ```
 * you can change this however you want but you should change it for every new version you publish and you deploy and you should of course change it such that you reflect what changed.

 * Now you need something similar for Android, ie versionCode , and now here this is not a string but a number which you should simply increment by one for every new release. So you start at one,the next version you release, even if it's just containing some tiny fixes should be two and then to three and so on.

 ```json
 "android": {
      "package": "com.cisco.great_places",
      "versionCode": 1,
      "adaptiveIcon":{
        "foregroundImage": "./assets/places-adaptive.png",
        "backgroundColor" : "#171717"
      },
      "permissions" : ["ACCESS_FINE_LOCATION","CAMERA"],
      "config": {
        "googleMaps" : {
          "apiKey": "Get_REAL_API_KEY"
        }
      }
    }
 ```
 * we're now prepared to deploy this or to build it first and as I mentioned, the cool thing about expo managed is that now you can build this on expo's cloud servers.

 * So what you should do is you should run expo publish to publish the latest version of your app to expo's servers just like that which will not yet build it as a standalone app 

 * Now the difference between publishing and building is that publishing just pushes your code and configuration to expo's servers and you can then scan the barcode with the expo client and so on.

 * Building means that you'll leverage expo's cloud build service to really build an Android app bundle or an iOS IPA file, these are the files which you then upload to the app stores thereafter so there is a huge difference here. 

 * Now these bundles which you build as mentioned before include the expo client so to say, they include this as a wrapper around your app but it's a real native app therefore after all, so it's a native app with just this little extra tiny wrapper around it taking into account the configuration you set up here for example regarding the permissions.

 * In addition, these apps which you build on expo's servers which you then can distribute through the app stores will talk to expo's servers for the over the air updating functionality. So you will still just publish new updates with expo publish thereafter and your standalone apps which are running on other devices will get these published updates,

 * so publishing is still important even if you're building standalone apps, if you're building app bundles because these app bundles will continue to talk to expo's servers to get new versions.

 * But speaking of that, how do we build these bundles now?

 ```js
 expo build:android
 ```
 * Refer : https://docs.expo.io/distribution/building-standalone-apps/?redirected

 * When building for android you can choose to build APK (expo build:android -t apk) or Android App Bundle (expo build:android -t app-bundle). 

 * Now first of all, it will ask you because apps need to be signed, that happens with a private public key pair which in the end is used to identify you as the author of the app, future updates of the app and with that I don't mean updates which you published to expo's servers with the expo publish command but when you rebuild the app, when you rebuild the package which you then reupload to the app stores which you'll occasionally need to do if you for example change the icon or something else which can't be shared with expo publish, in such cases, you need to sign the update with the same keys you used for creating the original app to identify you as the author otherwise the App Store will deny this update, it will not accept your next version of the app.

 * So therefore you need to sign your app and if you know what you're doing, you can create and upload your own keys store but here I will stick to version one and let expo handle that which means it will create such a key for assigning and do all the signing stuff for you on their servers, so that's what I choose here.

 * now it's just doing the same as expo publish it but thereafter, it will schedule this to be built on expo's servers. So now publishing is done and now it schedules such a build and it queues it up

 * by the way is a process you can now quit as it says here, you can always check the status of your build by entering this URL,

 * something like this https://expo.io/accounts/linkguna/builds/c4ad56a6-de80-4d10-bedd-fdb6a1785ba0

 * Now important, this build can take very long, the build itself not so much but until your build is built because it's scheduled keep in mind that this is a free service, so of course it's not built immediately but when the expo's servers have room for it. This can take a couple of minutes, even hours until that happens,
 so don't worry if that takes some time, you can always check this URL which you're seeing in your command line to see what's happening

 * now, let's do the same for iOS therefore. This can be done by running expo build iOS. Now important, to build iOS apps, you need a paid Apple Developer account, that's a must have.

 * So you will need to go to developer.apple.com and there, you will need to login with your Apple ID and then basically get such a paid account, so you will need to add your credit card and pay a fee of $99. That is required, there is no way around that, Apple requires that for you to build apps which you want to publish to their stores.

 * You don't need that during development but now for sharing the app, you need to have that. It's basically a fee that's there to only allow people to the store who have at least some kind of serious goals there I guess.

 * So make sure you sign in here and set up your paid Apple Developer account to join the Apple Developer Program and thereafter, you can run this command and it will ask you to log in with your apple developer account. So you log in with your Apple ID and password and that data will not be stored on expo's servers, no worries but it needs it to set up everything to build your app because for the Apple build process, you need special certificates and so on which it can request on your behalf with this data.

 * Now there is one important thing you also have to do after this Android build is done which it isn't yet, you should run

 ```js
 expo fetch:android:keystore
 ```

 * Again this only works after the build completed because this will then fetch this automatically generated keystore which expo generates for you if you chose that in the setup which you need for future updates of this app. 

 * You will definitely need that and in future updates when you rebuild the app, you then have to choose that you provide your own keystore and you need to provide this keystore

 * so enter the path to this keystore which you then download. So this command will in the end download a file generated on expo's servers which you need to store on your system for future update of the same app, otherwise you'll not be able to update.

 * Now you can also check the official docs on how you can continue with testing this on your device or simulator or then go to the part where you upload the app to the Apple App Store and Google Play Store.

 * So we build the app, now you can upload it by running

 ```js
 expo upload:ios
 ```
 * this will by default use your latest app and upload it to the App Store.

 * Now follow the steps you find here in the docs to create the appropriate accounts and set up everything correctly so that this command can succeed and with that, you will have your app deployed to the Apple App Store and to the Google Play Store so that you can get your app to any user around the world as a standalone app, not dependent on the expo client being installed on the devices which is pretty neat.

### Publishing iOS Apps without Expo

* So we saw how we can build and deploy an app with expo in the managed workflow which was pretty convenient.

* Now let's say we have an app for example built with the React Native CLI. Here I'm not using any native modules but if I were, I would of course have updated my Android and iOS configuration files to request the right permissions and so on and I showed all of that in the non-expo module earlier

* So now let's say we're happy with the app and we want to publish it to the Apple App Store and the Google Play Store.

* To run you app on device Refer : https://reactnative.dev/docs/running-on-device#docsNav

* Important, you can only build for iOS on macOS now, Linux and Windows don't work because now we're not building the app in the cloud as we did with expo but locally on our machine and there, Apple has this restriction that you can only build iOS apps on a Mac, it is what it is.

* So now what you need now is an apple developer account, right now not necessarily a paid one, just build the app however if you want to build it, for the app stores you need a paid one

* So you should set up such an Apple Developer account and then open your project here, your iOS project to be precise with Xcode. There you can click open another project, go into your project folder, there to the iOS folder and there select this XC workspace folder or file here to open this with Xcode. (Refer Image : deploy3)

* Now it's there where you now configure this app, where you set up your identifier for example, that's this inverse URL

* where you set a version number which your users will see and your build number which can simply be a number that you increment here,

* where you should choose automatically manage signing and where you now need to choose a team which should be shown here, if not add an account and there, log in with your Apple ID to add your apple developer account as an account here and thereafter, you should be able to choose your team here which will be required for automatically signing the app which will then be done by Apple. (Refer : deploy4)

* You can in general configure your app here of course and prepare it for deployment and one important configuration is of course related to the icons you want to use.

*  In expo, we set up the icons conveniently in a configuration and expo generated all the icons for us. Now it won't work like this, now you need to set up these icons on your own. and you do this by clicking on this arrow here (Refer : deploy5)

* which takes you to the assets catalog and there you can now provide icons and you need to provide icons in different sizes here as you can tell. (Refer : deploy6) Now obviously that was a convenient thing by expo, it did create these icons for you and you didn't have to manually create all these icons.

* Then you could upload appropriate image icon configured.

* You also might want to configure the launch screen, for that you can expand this folder and there you find this launch screen zip file. This in the end allows you to customize your launch screen, there you can add new widgets to it, drag images into it, change the text, you see here for example and configure the launch screen in general. (Refer : deploy7)

* Refer : https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/launch-screen/
* Refer : https://justinnoel.dev/2019/02/19/adding-a-splash-screen-image-in-xcode/

* once you did configure all of that, you can build your app here. before that run your app on simulator.thereafter of course, we can also build it for deployment.and now this succeeded and it launches the app on a simulator.

* In official documentation - Building your app for production - https://reactnative.dev/docs/running-on-device#docsNav

* we now got two important things to do.

* The first important thing is that in our project view , info.plist and now there, you'll find this app transport security settings key.

* This kind of controls how iOS controls to which web pages or web servers your app may talk and by default, it only allows access to https servers, so SSL secure servers. That's a good default but you might have some exceptions which you can add here and one exception in the exception domains list is localhost.(Refer image: deploy8)

* Now that's required for development because your React Native app in the end talks to this development server here which runs on your localhost which is not using SSL. Normally iOS would block this, now to not block it, this is in the exceptions list. To build this for production, you should remove this,(Refer Image: deploy9) you can simply clear this key here by removing it with the delete key and that's it. That's one thing

* and then you need to configure such a release scheme. go to Product → Scheme → Edit and set this from debug to release and then close this. (Refer Image : deploy10) 

* With that, you can now run product build here to build your app and now this is built for release, built for production, so it's optimized and so on.So this builds your app now for production.

* let's make sure we can also upload it to the Apple App Store and for this, you should go to your Apple Developer account and here you now definitely need a paid account and there, you now need to set up a couple of things. 

* You need to go to certificates ,IDs and profiles -> identifiers -> add a new app ID, you need to add the app ID which is set up in your project, so the app ID, the bundle identifier you find here, that exact identifier needs to be added here.

* You can add a description, whatever you want but then here (Build Id) you need to add this ID. 

* Now you can check any special capabilities your app requires which my app doesn't, so I don't need to check anything there and then I can continue, confirm this and register. Now this is required, otherwise you won't be able to publish your app.

* Now with that ID registered, you need to go to iTunes Connect (https://itunesconnect.apple.com/) where you now need to set up your app. 

* There you can go to my apps and add a new app here by clicking the plus new app here, then give it a name, then choose the language you're building your app for, choose the bundle ID and there, choose the ID you just set up, if it's not showing up yet, come back a couple of minutes later it will be there then. then also add your own custom identifier which will show up on your invoices basically and so on, RNNoExpo, whatever you want and click create and this now creates the app here in iTunes Connect.

* This is then also where you can manage the app for the App Store and set it up, set up its pricing and so on.

* Now with all of that done, let's wait for our build to finish here , if it failed then

* If you're still getting an error as I do, press command 1 here in Xcode, click on build settings here with all these things selected as you see it here, in the linking section which you'll find if you scroll down a bit and in that code stripping part here, under release, set this from yes to no. (Refer Image : deploy11)

* This is a workaround around this error which seems to be related to the automatic tests which are set up and once you did this, try this again, run the build one more time and now this should succeed.

* Once this build succeeded, you can go back to product -> now the archive option is available.

* If you now run this, this archives your app which is nothing else than building that bundle which previously was built on expo's cloud servers, so let's wait for this to finish.

* Once this is done, you should see your archive or archives if you are in the process more than once here and now here you could distribute your app to the App Store with the configurations made on iTunes Connect and so on which I showed earlier.

* this is how you would deploy your React Native only app without expo managed.

### Publishing Android Apps without Expo

* the official React Native docs, under guides, Android, you find instructions on how to publish your app to the Google Play Store and in the end, you can just follow the instructions you find here.

* Refer : https://reactnative.dev/docs/signed-apk-android#docsNav

* It all starts with creating such a keystore which I already mentioned in the expo managed workflow but there expo did that for us on their servers, here we need to do that and we can do this inside of our project

```js
keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

```

* So here, you can enter an arbitrary password what you want to choose and then some information about you which technically could be wrong but which should be correct kind of since this is your identifier with instance, since this is used for assigning your app in the end and once you entered all this and confirmed it and you chose your passwords, this now creates this "my-upload-key.keystore" file, and now you can use that to sign your application. 

*  Next you need to set up some gradle variables as you see here and for that make sure you move the key storage to the Android app folder, (android -> app folder -> y-upload-key.keystore)  move it up into Android and there into the app folder so that the file is there

* and then go to the gradle properties file, the Android gradle properties file (android -> gradle.properties)

* and in there add the below lines

```js
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```
* Once you did that, you can close that file, you should go to the Android app build gradle file,(android/app/build.gradle)

```js
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release { //  append this 
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release //this
        }
    }
}
...
```

* and now you can generate your APK with these command

```js
$ cd android
$ ./gradlew bundleRelease
```

* and this should now build your app and sign it for production and give you such an app bundle in the end which you can then upload to the Google Play Store.

* So let's wait for that to finish and once this build succeeded, you can actually take that app bundle (android/app/build/outputs/bundle/release/app-release.aab), that's your release bundle, that's what you can upload to the Google Play Store.

* For that, you can search for Google Play console and you need a Google Developer account for that which also costs you money but unlike Apple's program, it's not a subscription, it's a one-time fee of $25

* in the Google Play console, you can now create a new application once you're logged in with your paid account, choose an app name like this, create it and then here you can manage your entire store appearance

* and under app releases -> click on production track, production manage, create a release there and now here you need to upload your app bundle.

* Now you can click continue here with the default settings normally but in general, I would recommend that you dive into the Google Play Store or Google Play console documentation to learn all about the things you can set up here but in the end, this is now where you can upload the bundle which you built.

* So here, you would upload this bundle file and thereafter, you can finish up your store appearance and you can publish your app in the Google Play Store as well.

* Now of course you might wonder, how do you add icons and so on because I haven't touched on this yet?

* A convenient and easy way of doing that is with the help of Android Studio.

* There, you can open an existing Android Studio project and open your Android folder in your React Native project here with Android Studio, just the Android folder, not the entire React Native project. 

* you can go to the app folder -> source -> main -> res and there right click on it, you can select new and there, image asset and this opens an editor where you can conveniently add and generate new image assets, new icons for example. There you can choose launch your icons, adaptive and legacy and now what you can do, you can leave the name, you can setup your icon, you can configure it there.

* You can choose a foreground layer and there, you can for example choose the path of an image you want to use, a background layer where you can set a solid color or also an image you want to use in the background and then therefore generate your icon with that tool. 

* Simply click finish and of course provide your own image there if you want to and it will set everything up for you to have a nice icon which of course is pretty sweet. Now regarding how to customize the splash screen, attached you find some documentation on how you may do this on Android to set your own splash screen. Of course whenever you change your icons and/or your splash screen, you will need to rerun this build with that gradle w command and then also redeploy your new app bundle to the Google Play Store with the Google Play console and with that, this is how you would build and deploy React Native only apps.

### Configuring Android Apps

* As shown earlier (when adding native modules to non-Expo apps), you can manage certain aspects of your Android app with the AndroidManifest.xml file.

* There, you can configure three important things:

- The App name as it appears on the home screen: https://stackoverflow.com/questions/5443304/how-to-change-an-android-apps-name

- The bundle identifier & package name of the app (also requires tweaking in other files): https://developer.android.com/studio/build/application-id

- The permissions of the app: https://developer.android.com/guide/topics/manifest/manifest-intro#perms

* You should also set an app version and change it with every app update. This is done in the build.gradle file, see: https://developer.android.com/studio/publish/versioning

* These resources might be helpful:

* Expo Deployment Docs: https://docs.expo.io/versions/v34.0.0/distribution/introduction/

* React Native - Android App Signing (Non-Expo): https://facebook.github.io/react-native/docs/signed-apk-android

* React Native - Building the iOS App: https://facebook.github.io/react-native/docs/running-on-device#building-your-app-for-production