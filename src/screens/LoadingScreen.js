import LottieView from 'lottie-react-native';
import React, {useEffect, useSate} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Img from '../assets/images';
import * as firebase from 'firebase';

const animationSize = 300;
const LoadingScreen = ({navigation}) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      navigation.navigate(user ? 'App' : 'Auth');
    });
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={Img.skeleton}
        autoPlay
        loop
        style={{width: animationSize, height: animationSize}}
      />
      {/* <LottieView
        source={Img.coin}
        autoPlay
        loop
        style={[styles.loadingIcon]}
      /> */}
      {/* <LottieView
        source={Img.flipCoin}
        // autoSize
        autoPlay
        loop
        style={styles.loadingFlipIcon}
      /> */}
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLoading: {
    textAlign: 'center',
    fontWeight: '600',

    // color: 'white',
  },
  loadingIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: animationSize / 1.5,
    height: animationSize / 1.5,
  },
  loadingFlipIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: animationSize / 1.5,
    height: animationSize / 1.5,
  },
});
