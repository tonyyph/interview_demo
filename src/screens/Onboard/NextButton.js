import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Svg, {G, Circle} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NextButton = ({percentage, scrollTo, disabled}) => {
  const size = 128;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashOffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset: strokeDashOffset,
          });
        }
      },
      [percentage],
    );
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation={-90} origin={center}>
          <Circle
            r={radius}
            cy={center}
            cx={center}
            stroke="#d8d8d8"
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            r={radius}
            cy={center}
            cx={center}
            stroke="#08979c"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        disabled={disabled}
        onPress={scrollTo}
        style={disabled ? styles.buttonInActive : styles.buttonActive}
        size={32}
        activeOpacity={0.6}>
        <Ionicons name="arrow-forward-circle-sharp" size={36} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInActive: {
    position: 'absolute',
    backgroundColor: '#d8d8d8',
    borderRadius: 100,
    padding: 24,
  },
  buttonActive: {
    position: 'absolute',
    backgroundColor: '#36cfc9',
    borderRadius: 100,
    padding: 24,
  },
});
