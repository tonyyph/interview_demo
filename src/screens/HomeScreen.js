import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';

const data = [
  {
    id: 1,
    question: ` What is the Capital Of India ?`,
    options: [`New Delhi`, `Mumbai`, `Kolkatta`],
    answer: `New Delhi`,
  },
  {
    id: 2,
    question: `Who is the CEO of Tesla Motors?`,
    options: [`Bill Gates`, `Steve Jobs`, `Elon Musk`],
    answer: `Elon Musk`,
  },
  {
    id: 3,
    question: `Name World's Richest Man?`,
    options: [`Jeff Bezo`, `Bill Gates`, `Mark Zuckerberg`],
    answer: `Jeff Bezo`,
  },
];

const HomeScreen = () => {
  const renderItem = item => {
    const dataItem = item?.item;
    
    return (
      <View style={{top: 300}}>
        <Text>{dataItem?.question}</Text>

      </View>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={data}
        keyExtractor={item => item?.id}
        renderItem={renderItem}
        // contentContainerStyle={{backgroundColor: }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
