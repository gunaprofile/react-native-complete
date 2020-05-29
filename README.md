# react-native-complete

## Debugging React Native Apps

### Running the App on a Real Device & Debugging

* Don't forget, with Expo, you can easily run your app on real devices, too!

* Simply download the Expo app from the App Stores and scan the barcode the Expo DevTools (that browser tab which opened when you ran npm start) show.

* On iOS devices, you don't scan the barcode with the Expo app but instead with your normal device camera (simply point it at the barcode and you should be prompted whether you want to open that app in the Expo app).

* On Android devices, you find an integrated barcode scanner in the Expo app.

---

* With the app running on a real device, you can debug it from there, too. Shake the device a little to bring up the developer menu. There, you can enable the remote debugger and the other features covered in this module.

### Using the Remote Debugger & Breakpoints

* Now sometimes, console log alone doesn't get you that far, you need more help and in such cases, you can debug your code remotely.

* Now for that, you need to open the debugging menu on these emulators or on real devices too if you you're working with those. You do that by pressing on the iOS simulator, command + d and it will open this menu here, on Android, you press command or control + m and it will open this menu.

* Now you see some options there and we'll have a look at the important ones throughout this module. The option we'll now choose is debug js remotely.If you press this, a new tab should open up in the browser which automatically navigated to localhost

* Now for this to work correctly, make sure that in your expo dev tools, you have setup the connection to be LAN or local, not tunnel otherwise this will be super slow 

* Then if you open developer tool you could see same logs there also (Refer Refer-image/debug/debug1) there you could see all your logs

* You can dive into sources for example to dive into your source code and set breakpoints. There simply expand this debugger worker js thing here, expand these folders and you'll find the folder structure you're also working with, for example there in your users folder here, you'll find the app.js file, you find the components.(Refer-image/debug/debug2)

* you can add a breakpoint by clicking on the left of the line number here so that you have this blue mark and now your code execution will stop the next time you hit this code line here. Now I enabled debugging on the Android emulator, so it will not stop if I try it on iOS, it will stop if I try it on Android. We could have enabled it on iOS too, here with debug remote js but I didn't do that, so let's go with Android.(Refer : Refer-image/debug/debug3)

### Working with the Device DevTools Overlay

* So on Android, again you open it with command or control m and first of all I'll stop at remote js debugging. You always need to stop this once you're done and you should stop it when you're not in need of it anymore because it slows down your app even if it's running 

* Let's start with the performance monitor. If you enable this, you get this overlay which basically informs you about the performance you are having and there you can see at how many frames your app is running, how many frames were dropped and so on.(Refer : Refer-image/debug/debug4)

* Now please be aware that the performance you are seeing here is not the final performance of your app though because it's still in development mode, we're not having the debugger attached but development mode also means that there is a lot of overhead in your code, for example the overlay you're seeing here which is part of the app so to say, which makes your apps slower than it would typically be. So this can be an indicator but it's not the final production ready testing you should do.

### Debugging the UI & Using React Native Debugger

* Now there also is one thing in that developer overlay you can open which is extremely helpful for debugging your user interface and that's the toggle inspector option. To toggle this, you'll see this overlay at the bottom here and now you can click onto items in your user interface to get information about them, for example here the button.

* and now you can click onto items in your user interface to get information about them, for example here the button.You can always close this again by opening the developer overlay and then again clicking toggle inspector 

* However, there is an even better tool for inspecting this and therefore I'll close this here and that's the React Native debugger.

* Link - https://github.com/jhen0409/react-native-debugger

* Then select release link then download dmg file, and then let me simply execute this and finish up the installation by simply walking through the installer

* Once its installed you can open React native debugger tool but still it won't work untill you connect your application.

* Now with this opened up, press command + t on Mac or control+t on Windows or Linux in here to open a new tab and open and confirm that React Native debugger port which the Chrome tab also used before and confirm this. and also make sure you enabled remote debugger in your stimulator developer tool also.


* and now this should connect here and you'll see your console output here now in the debugger tools. You'll also see, if I expand this, that in sources, you can again dive into your code here if you want to just as before and the big difference of course is not that you can do this because that's the same you could do in the browser but that here, you now have the pretty neat tools here on the left. So you can still of course set breakpoints and everything but here, you now for one got your Redux debugging tools and we're not using Redux here, so they're pretty
empty, nothing going on here 

* Refer : https://docs.expo.io/workflow/debugging/?redirected

* Expo Debugging Docs: https://docs.expo.io/versions/v34.0.0/workflow/debugging/