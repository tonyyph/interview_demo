import React from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';

const QuestionItem = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <View style={styles.textContainer}>
        <Text numberOfLine={2} style={styles.title}>
          {item?.question}
        </Text>
      </View>
    </View>
  );
};

export default QuestionItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.4,
  },
  title: {
    fontWeight: '800',
    marginBottom: 10,
    fontSize: 28,
    textAlign: 'center',
    color: '#520339B2',
  },
  description: {
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
