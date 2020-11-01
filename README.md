## Push Notifications

### Intro

* A feature which you actually need in quite a lot of applications is push notifications, or showing notifications in general to your users,To be precise we'll have a look at what kind of notifications we have, because it turns out that it's not just push notifications. We'll then work with the first type of notifications,which would be local notifications, and I will show you how to trigger those and how to handle those.we will dive into triggering and handling push notifications. I will also show you how you could integrate push notifications into the Shop App 

### Understanding Notifications

* As I mentioned, there are basically two types of notifications and that would be 
  * local notifications
  * and push notifications.

* Now the two types are related as you will see, but it is important to understand that we generally have these two types.

* Now, what are local notifications?

* Local notifications are notifications that are scheduled and triggered and handled on one and the same device. So they are triggered by the app and displayed locally to the user. They never leave the device.

* Local notifications are never sent or shown to other users or other devices. They stay on your device.

* Now you might wonder when this could be useful. Why would an app send a notification to itself?

* Well, here's an example you probably all know. A reminder app. If users use a reminder app, it is quite common that you can set, like, a deadline or simply a date and a time when you want to be reminded. And that can be achieved with local notifications for example. There, you don't really need a server or a backend or any other users. You just want to remind yourself. And therefore, of course, a local notification should be triggered so that even if the app is closed, that feature still works and you get this reminder.I mean, that's the whole idea of this app there. And a reminder app is just one example. You will notice that many apps on your device send you local notifications from time to time, reminders that you should use them again or anything like that.

* Push Notifications  - These are notifications which are not triggered by the app for itself, but which are received by the app, sent by someone else. (We will see how to send notifications in sometime now)

* Now, when a push notification is received, that in turn then shows such a local notification. So that's the connection we have. But a push notification is sent by someone else, by a server, by another user, by some interaction in an app on another device, a push notification is not triggered by your local app installation, but instead it is received from outside your device

* So push notifications are notifications that are sent remotely to one or many users and devices, and they then show up on those devices to lead those users to do something.

* Examples here of course, would be chat apps, email apps, where maybe you as the seller of an item get a notification if someone ordered an item. So there are plenty of applications out there where something happens and a push notification should be sent.we could also have marketing push notifications where all users of an app get a marketing push notification sent by the developer of the app.

### Sending Local Notifications

* we first of all need to install a new package.

```js
expo install expo-notifications
```
* Once installed  Lets do a simple notification trigger 

```js
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications'; // Lets import this Notifications from expo-notifications

export default function App() {
  
  const triggerNotificationHandler = () => {
    // trigger scheduleNotificationAsync
    // This is the method that will help us, well, schedule a notification. And with that, we always schedule a local notification.
    // Now, this method wants an object where you configure the notification that should be sent.

    Notifications.scheduleNotificationAsync({ 
      // Now, not all options are supported on both platforms,but you can set them all and 
      //if a platform doesn't support it, it will simply ignore it.
      content: {
        title: 'My first local notification',
        body: 'This is the first local notification we are sending!',
      },
      trigger: {
        // The trigger is also an object where you simply define when the notification should be sent.
        seconds: 10, // until the notification should be displayed.
      },
    });
  };

  return (
    <View style={styles.container}>
    <Button
      title="Trigger Notification"
      onPress={triggerNotificationHandler} // OnPress this button we will trigger the notification
    />
    <StatusBar style="auto" />
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
* Now, as you see, you could set more, you could set a color, for example, you could add extra metadata, which you later can retrieve when the notification fired, you can give it a priority which might lead to the operating system to display it with higher priority, you can add a sound, but I will keep it fairly basic here and just send this basic notification.

* For Android we need to do one extra thing in the app.json file.!!!

```js
//app.json
"android": {
      "useNextNotificationsApi" : true
    },
```

* this will not be the only thing we need to change. And therefore still, you will see nothing. If I expand this, I see no notification here. Well, there is a reason for that.

* If your app is in the foreground, so if it's currently running as it is here, local notifications by default are not shown. Now therefore, if I click this again and now I go to my home screen so that the app is no longer in the foreground and it's no longer running, Now you will see notification in homescreen

* Now what about iOS? Let me start the app there again as well. And let's try the same thing here.If I click on trigger notification and I go to the home screen, let's see whether we get a notification after 10 seconds there. I can tell you that we don't need to set anything up in the app.json file for iOS, but still I don't see any notification here. We definitely have no new notification here. Well, there is an important difference between Android and iOS here.

* On Android, it works just like that out of the box, on iOS, you need to grant explicit permissions to receive notifications.

### Getting Permissions

* So in order to also get local notifications on iOS, we need to ask the user for permission.

* And for this, we an use another package which we also install with expo install,

```js
expo install expo-permissions
```
* The expo-permissions package, as the name implies, helps us manage permissions. So once this is installed,

* we need to ask the user for permission to show notifications before we try doing that.

* Now, it depends on your application when you want to ask the user. Maybe you want to ask when the app starts up,After all, you wanna ask for permissions when it's very likely that the user gives you the permission, right?

* Now here we'll do it right when the app starts up, so I will actually import the useEffect hook from react so that we can run logic when this component mounts, simply by passing an empty dependencies array here.

* On Android this will do nothing, on iOS it will find out whether we already are allowed   to send permissions.

```js
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'; // import Permissions

export default function App() {

  useEffect(() => {
    // we need to ask the user for permission to show notifications before we try doing that.
    Permissions.getAsync(Permissions.NOTIFICATIONS) // get the permissions
      .then((statusObj) => {
        if (statusObj.status !== 'granted') { // if permissions denied
          return Permissions.askAsync(Permissions.NOTIFICATIONS); // if current permissions status not granted ask permission
        }
        return statusObj; // So here we should return statusObj in that first then block
          // so that in the next then block it is available for the cases where we already had permission. 
          // This is a change you should implement to ensure that your application properly detects its notifications permission status and does not think it doesn't have permissions, when it actually has them.
      })
      .then((statusObj) => {
        // this then block after askAsync finished.
        if (statusObj.status !== 'granted') {
          // Because of course, just because we're asking does not mean that we're getting the permission.
          // So the user might still deny the permission, and in this case there is nothing we can do.
          return; 
        }
      });
  }, []); // called when the apps startsup

  const triggerNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the first local notification we are sending!',
      },
      trigger: {
        seconds: 10,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Trigger Notification"
        onPress={triggerNotificationHandler}
      />
      <StatusBar style="auto" />
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
*  because the worst case scenario is that we don't have permissions and therefore nothing happens.

* But now that we're asking, the best case scenario is that we did get the permission and therefore this here will succeed.

### Controlling How Notifications Are Displayed

* So what can we do if we get a notification whilst the app is running? Currently, as you saw, the notification is lost.

* And sometimes that might be what you want. But sometimes that's also not what you want.

* Well, for that, we can again, use the notifications package, because there we can actually define what should happen if we get a notification whilst the app is running.

* And there we can set a Notification Handler. Now this one's an object. And in that object, we in the end define how incoming notifications should be handled if the app is running.But now that it should show it when the app is running.
```js
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function App() {

  Notifications.setNotificationHandler({
    // what should happen when a notification is received while the app is running.
    handleNotification: async () => {  //async promise handler
      // value that promise will eventually yield
      return {
        shouldShowAlert: true,
      };
    },
  }); 

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return;
        }
      });
  }, []);

  const triggerNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the first local notification we are sending!',
      },
      trigger: {
        seconds: 10,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Trigger Notification"
        onPress={triggerNotificationHandler}
      />
      <StatusBar style="auto" />
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
* And now into the object you got a couple of options. For example, you can let the operating system know whether it should play the default notification sound. Whether it should set a batch to let the user know that something happened. Whether it should show an alert. And here I will set should Show Alert to true. And this tells the operating system that it should show this default alert, which it also shows if the app is closed.

### Reacting to Foreground Notifications

* So now it would nice to not just show a notification to the user but to actually do something in our code when such a notification is received or when the user taps on it,

* because often that is what you wanna do. If a chat application sends a notification and the user taps on it, typically you wanna take the user to that chat the notification belongs to. And, therefore, here in our dummy app we can also do something when a notification is received.

```js
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return;
        }
      });
  }, []);
  // i will add another useEffect here..
  // We could use the same useEffect but still we are having seperate useEffect that should only run when the component here loaded for the first time
  useEffect(() => {
    // addNotificationReceivedListener - allow us to define function when incomming notification is received when app is running

    // For every incomming notification this function will be triggered but sometimes we need to stop.
    // in somescreen we want to clear the notification when component unmount. subscription help us to clear the notification
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );
    // clean up the function called automatically by react when this effect about to run again. or when the component is unmount
    return () => {
      subscription.remove();
    };
  }, []);

  const triggerNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the first local notification we are sending!',
        data: { mySpecialData: 'Some text' }, // we can pass some metadata like this to the notification and react based on that.
      },
      trigger: {
        seconds: 10,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Trigger Notification"
        onPress={triggerNotificationHandler}
      />
      <StatusBar style="auto" />
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
* Console will display the below

```js
Object {
  "date": 1604199128474,
  "request": Object {
    "content": Object {
      "autoDismiss": true,
      "badge": null,
      "body": "This is the first local notification we are sending!",
      "data": Object {
        "mySpecialData": "Some text",
      },
      "sound": "default",
      "sticky": false,
      "subtitle": null,
      "title": "My first local notification",
    },
    "identifier": "95e368d1-30d4-437b-8a37-43b0b644bb99",
    "trigger": Object {
      "channelId": null,
      "repeats": false,
      "seconds": 10,
      "type": "timeInterval",
    },
  },
}
```
### Reacting to Background Notifications

* So let's now make sure we can also react to a notification if the app was closed. And for this notifications, this notifications package, this one here, simply has a number useful method.

* So again in use effect, and here I'll use the same effect as I did for handling incoming notifications if the app was open,

```js
useEffect(() => {
    // This now allows you to define a function that should run when a user interacted with a notification whilst the app was not running.
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);
```
* Well, let's look into this and see what's inside of that response. So for that, again, I'll trigger the notification on Android, 

* And actually it's almost the same as the notification we got before, it's just an object that holds the notification but it also gives us this action identifier, which we can actually ignore here. Instead, we see we have a notification key, and there will again be able to get the data, the body, the title, and whatever we need.

* If we will get same response but sime data field difference but generally our data is here 

* And that's how you can handle notifications when they arrive when your app is not running. And again here, instead of console logging, you can of course do whatever you need to do. Navigate to a different screen, send a HTTP requests to a server, lock the user out, do what you wanna do in your app.

### How Push Notifications Work

* This is an important prerequisite because with push notifications, we are going to trigger local notifications, but that's the difference, the trigger is not coming from inside our app like it currently does, keep in mind, that currently in the end, we trigger our local notification here with the trigger notification handler with the schedule notification async method.That's how we currently trigger the notification. And that will no longer be the case.

* Instead now with push notifications, the trigger will be outside of our application. It could be the developer of the app manually sending push notifications. It could be server side code that leads to a push notification being sent. For example, when a new chat message is stored in a database

* we will need to learn how we can send push notifications to other devices and not just to our own device. For that, we need to understand how push notifications work.

* We got our app, and typically of course, it runs on multiple devices for multiple users. Then, we got some event that should lead to a push notification to be delivered. That could be a chat message that's being posted, but it could also be that we, as the owner of the app, decide to send a marketing message or anything like that to our users.

* So we want to deliver our message or our notification to a device, but this is not how it works. We can't directly send messages to devices. That's a security mechanism because if anyone could just start sending push notifications to random devices out there, our phones would get spammed.

* So instead, to deliver push notifications to our apps on our devices, we have to use official push notification servers And both Android, as well as iOS, so Google and Apple, have their own push notification servers.

* And you have to use those to deliver your message to the devices. Why ?

* Because those servers will only deliver messages to devices and app installations that identified themselves. Essentially, your app will have to identify itself with Google's and Apple's servers, it will get a unique token, an ID you could say, and only that ID can then later be used to deliver a push notification through those official push servers to your app installations, because then the official servers can verify that your app opted into getting those push notifications. That's the security mechanism here.

* And therefore, instead of directly sending messages to devices, we, in the end, use that event in conjunction with those official servers to send our push notification through those official push servers to the different devices we want to target. That's how push notifications work. (Refer : push1) So we have that extra security step in between, which matters.

### Expo & Push Notifications

* Thankfully, handling push notifications is made easy with Expo.

* And there are various steps which we already implemented, which we will also need to implement if we are looking to handle push notifications.

* For example, we also need to ask for permission, if we want to get push notifications. So that permission, which we're getting here for receiving notifications, that will in the end enabled both local and push notifications you could say.So that is code we absolutely need on iOS only, but they are we need it.

* We will also need our handlers for handling incoming notifications when the app is in foreground and when the app is in background, because actually push notifications will still cause a local notification once they arrive. So for handling the message, once it's on our device, our code is exactly the same. So this does not change.

* But what will change, of course, is how we schedule a notification. (triggerNotificationHandler)

* first of all wanna start with showing you how a message could be sent from totally outside of the device.

* And then as a second step, I will show you how our app here, could send a notification to itself, but to itself or running on a different device on a different user.

* But for that one important step is missing. And that's that identification with Google's and Apple's push servers, because as I mentioned, we will need to do that. And those servers will then give us this token, this ID, which we ultimately need to send push notifications.

* Besides asking for permission here, if we plan on receiving push notifications, we also need to sign this app installation up with those official push servers.

* So this app running on a device of our user, needs to register itself with those official push servers. And for that, we need to add some code.

* Now we will need to make some changes here, to our permissions though or not to the permissions we'll still need those.But after we have those permissions will now need to get that token, that ID. We'll need to sign our app up with those official push notification servers and get that ID which then allows us to use the ID to push notifications to this app installation on this device.

* Now, thankfully, Expo makes that super, super easy. It makes it very simple. Because the team behind Expo, basically did not just give us all these nice JavaScript functions and API's for building React Native apps in a convenient way, they also have their own backend server, to which you can talk through some functions, where they have all the logic for signing up an app with those official push servers and getting that permission.

* Actually, to be precise, Expo does not sign our app up with those services. Instead, Expo signed itself up with those services.

* And it allows us to use its sign up you could say. So Expo, the team and the software does all the heavy lifting behind the scenes for us, so that we don't manually need to sign up our app, but we can leverage Expo's existing server to push notifications through Expo's subscription with those official servers to our different app installations, users and devices.

* That is how you can think about that. And that will make implementing push notifications with Expo very, very easy.

* I can tell you that if you would need to sign up manually, that would be a lot of steps, a lot of work. And Expo is handling this for you in a very, very elegant way. Expo really makes it easy to deliver push notifications to your applications.

* What do you need to do? Well, after we got our permissions here, in the next then block, we want to tell Expo and their own server which they have for us, to sign our app up with those official push servers.

* We'll need to tell Expo to basically sign our app up so to say. Behind the scenes Expo will do all of that, behind the scenes Expo will sign up, and then our app will leverage Expo to deliver push notifications.

```js
export default function App() {
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          throw new Error('Permission not granted!');
          // Previously we return here now we removed that return
          // because then the next then block would still be triggered, even though we don't have permission.
        }
      })
      .then(response => {
      
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }, []);
```
### Getting a Push Token

```js
useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          throw new Error('Permission not granted!');
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync(); // get Expo Push Token
      })
      .then(response => {
        const token = response.data; // Token received in promise callback
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }, []);
```
* we can do this, but this won't work on those simulators.So we're not able to test this on simulators. Instead, we'll need real devices.

### Sending Push Notifications

* So finally, we got that token.

* Now, we'll not need that token here for the moment, instead, I wanna use it to manually send a push notification to our real device.

* And testing push notifications is made easy with the Expo push notification tool. (https://expo.io/notifications)

* This is a tool which allows you to test push notifications you wanna send to your Expo projects. In reality, you would probably not use this tool, but you would use one of Expos server side STKs to trigger a push notification on the server, or you would send it from directly inside your app, As I will show you later in this module, depending on your use case.

* But for testing, this is a great tool. here you need that token("don't share public this might leads to spam") and with that you cans send push notifications

### Using Expo's Push Server

* So now that we got push notifications working, let's see how we can work with them from inside the app

* so that when we press this trigger notification button, we send a push notification. For that, Expo has got us covered as well.

* in the place where you wanna trigger that a push notification should be delivered to some device, you need to send a http request to Expo's servers.

* So we can do this with the fetch API, which is available in React-Native,

```js
import React, { useEffect, useState } from 'react';

export default function App() {
  const [pushToken, setPushToken] = useState(); // pushToken set to empty initial state

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          throw new Error('Permission not granted!');
        }
      })
      .then(() => {
        return Notifications.getExpoPushTokenAsync();
      })
      .then((response) => {
        const token = response.data;
        setPushToken(token); // setPushToken to useState
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  }, []);

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  const triggerNotificationHandler = () => {
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'My first local notification',
    //     body: 'This is the first local notification we are sending!',
    //     data: { mySpecialData: 'Some text' },
    //   },
    //   trigger: {
    //     seconds: 10,
    //   },
    // });
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: pushToken, // Token !!This is a required property, which then needs our token, the token we're getting when we're registering
        // we can simply use useState to manage the token as state of our component.
        data: { extraData: 'Some data' },
        title: 'Sent via the app',
        body: 'This push notification was sent via the app!',
      }),
    });
  ...
  ....
```
### More on Push Tokens

* Now I will actually here send it to the same device as I'm running on,but this could be sent to any other device as well. But if I press trigger notification, you see sent via the app.

* Which clearly is that brand new message we prepared. So that is this push notification sent through Expo's push servers And whilst I sent it to myself here, which of course might not be what you want to do in most scenarios. You still see the idea behind it. This could have been sent to any other application of which we had the push token.

* Now, speaking of that push token, though, how should you manage that?

* Because at the moment you could argue that the only push token we can know in this application is the one off this device on which this app is installed. So ho could we know the push token of some other device? How could that work?

* So we learned that we can leverage Expo push servers to deliver push notifications.

* But we need a push token for that. That's no problem because we can get that token as we do it here with get get.ExpoPushTokenAsync. The problem with that, however, is that, of course we can get a token with that and we can store this in state thereafter, but then we only have to token off this device on which this app installations running. So when we later want to send a push notification, the only token we know is our own token.

* but in reality, we of course want to send a push notification to other devices. So to the same app installed on other devices of other users, how would we get their tokens?

* Well, just as we get their emails or whatever else we need in an application. You can of course write code where once you got that token, you don't, or maybe not just manage it in your local state, but instead you send an HTTP request to your own API where you then have some logic to receive that token and store it in a database.

* This token of course can, and in reality will, be shared and stored in a database. So that any user of your app submits not just his or her email address and password, but also his or her push token.

* And with that data stored in a database on your server, you can, of course, always retrieve that token and use it in your app when you need it. So you can share that token, just like you share other user data as needed.

*  if a user creates a product in a shop application, we also store that product in a database to show it to other users as well. With a token, it's no different. We won't show it to other users, but we can still fetch it on the devices of our users and there use it in the code to send push notifications as shown here.

* In addition, it is worth pointing out that when it comes to sending notifications, there is a separate article on the Expo docs, Refer : https://docs.expo.io/push-notifications/sending-notifications/

* But if you don't really need to trigger the push notification from inside the app, but instead you want to trigger it from inside your own server. So now I'm talking about your server, which you as developer own.

* The Expo team gives you many SDKs for Node, for Python, for PHP, which make it very easy to trigger push notifications on your own server.

* Under the hood, those SDKs will basically do what we do here. They will send the request to the Expo push server.

###  Adding Push Notifications to the Shop App 

* While add product i want to add push token also to the database so that we can fetch and use token later, When we add order we will add data to the database and then we will send push notification to the owner of the product.

* For Android we need to do one extra thing in the app.json file.!!!

```js
//app.json
"android": {
      "useNextNotificationsApi" : true
    },
```
* We also need to ask the user for permission. So, the question is where we wanna do that, of course. 

* Since it's the creator of a product who should receive push notifications, I will ask for permission right before we create a new product.

* Let's first of all add the required packages

```js
expo install expo-notifications
expo install expo-permissions
```
* So with that installed, here in create product, before we do anything else, we wanna use the notifications API.

```js
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // any async code you want!
    let pushToken;
    let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS); // So we should use permissions and get the information about the notifications permission.
    //  This returns a promise, and since we're in the async function here, we can simply await it.
    if (statusObj.status !== 'granted') {
      // if not granted ask Permission
      // And that's all just what we had before,now just with asyn await, instead of then. But other than that, it's the same.
      statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (statusObj.status !== 'granted') {
      pushToken = null;
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data; // promise that is why here we used await
    }
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://rn-push-58aba.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
          ownerPushToken: pushToken,
        }),
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
        ownerId: userId,
        pushToken: pushToken, //sending pushToken to the server
      },
    });
  };
};

```
* Now let us fetch and use Token ... Refer Push finished

* In orders action addOrder we are getting cartItems, which we are dispacth from cartscreen

* In cart item array we have to add pushToken also 

```js
// CartScreen.js
 transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        productPushToken: state.cart.items[key].pushToken
      });
  ... 
  ................................
  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };
```
* Now this is a field (productPushToken) which won't be there yet because we first of all need to make some changes to our store.

```js
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const pushToken = addedProduct.pushToken; // here

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          pushToken, // we also need the push token. 
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          pushToken, //we also need the push token. 
          prodPrice
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
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
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
  }

  return state;
};

```
* Now we added new item to the cartItem constructor Now for that, we need to change the card item constructor(models)

```js
//models
class CartItem {
  constructor(quantity, productPrice, productTitle, pushToken, sum) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.pushToken = pushToken; // here..
    this.sum = sum;
  }
}

export default CartItem;
```
* But we're still not there because now I'm storing this for every card item. But I'm getting this from my product, and a product doesn't have a token yet.

* here in the products actions file here, products.js in actions where we do fetch all products,here, fetch products, what we do is we extract things like the ID, title, price, and so on and create a new product based on our product model with that information.

```js
// 
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://rn-push-58aba.firebaseio.com/products.json'
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
            resData[key].ownerPushToken, // ownerPushToken fetched from DB
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
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};
```
* Now we need to change our product model also 

```js
class Product {
  constructor(id, ownerId, ownerPushToken, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken; // pushToken
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

export default Product;
```
* because push token is the field name which I now also used here in the cart reducer. There, I'm accessing added product dot push token.

* So if you use the different name here to retrieve the token for a given product, you also need to adjust this name here in the product model.

* But with all those changes, we're making sure that we're fetching the token that is stored for every product and we're using it and storing it in the front end in our models as well.

* And we're storing it in every product model which we're creating every product instance. And we're also storing it in our cart items which we're adding to our cart here in the Redux store.

* So now every card item will have a push token, and our card item model also stores that in a key named push token. And therefore, now we'll finally be able to get that data when an order is placed.

* Now we don't just need to update how we create products here in the products.js file in the actions file, but also in the reducers. In the product.js file in reducers, there, we have to create product case which we handle where we also instantiate our product.

```js
//Product reducer
case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.pushToken, // here ...
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
```
* we need to check where we dispatch create product to ensure that the action that adds product data also adds a push token to that product data.

```js
case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        state.userProducts[productIndex].pushToken, // pushToken is the name in the model
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
```
* Push token is the name we have here because that here will act as a product stored in our user products field and that product will have the form a flower product model, and there, I pick push token as a name, so this also is push token as a name here.

* And with that, we ensure that we don't get an error when we create a new product. So back here in the orders actions file, in the add order action. Here, we now want to get our token from inside the card item and send such push notification request

* So therefore, after this request was sent here, after we added the order in our Redux store,after all of that, we want to send our push notifications.

```js
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://rn-push-58aba.firebaseio.com/orders/${userId}.json?auth=${token}`,
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

    for (const cartItem of cartItems) {
      const pushToken = cartItem.productPushToken;

      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: pushToken,
          title: 'Order was placed!',
          body: cartItem.productTitle
        })
      });
    }
  };
};
```
* Make sure you have logic to show notifications if you are in foreground 

```js
//app.js
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});
```

* You can still use Expo's powerful Push Notification services and features, even if you're NOT working in a managed Expo project.

* Detailed setup instructions can be found here: https://github.com/expo/expo/tree/master/packages/expo-notifications#installation-in-bare-react-native-projects

* Once configured and set up, you can work with push notifications just as shown in this module.

* Expo Push Notification Guide: https://docs.expo.io/push-notifications/overview/

* Expo Push Notification API Docs: https://docs.expo.io/versions/latest/sdk/notifications/