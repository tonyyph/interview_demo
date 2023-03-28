import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import * as firebase from 'firebase';

import {StyleSheet} from 'react-native';
import MainQuiz from './src/screens/Onboarding';

const firebaseConfig = {
  apiKey: 'AIzaSyC34AUtd-6YKZ6yFyDyXK8B5Em9tXk4Ilg',
  authDomain: 'creditwallet-983b0.firebaseapp.com',
  projectId: 'creditwallet-983b0',
  storageBucket: 'creditwallet-983b0.appspot.com',
  messagingSenderId: '82340502159',
  appId: '1:82340502159:web:5324899e0500ca09442efa',
}; // Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default createAppContainer(
  createSwitchNavigator(
    {Loading: MainQuiz},
    {
      initialRouteName: 'Loading',
    },
  ),
);

const styles = StyleSheet.create({
  icon: {top: 30, position: 'absolute'},
  postButton: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -4,
    position: 'absolute',
  },
  customButton: {
    top: -50,
    height: 70,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
