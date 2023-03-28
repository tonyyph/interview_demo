import React, {useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NextButton from './Onboard/NextButton';
import QuestionItem from './Onboard/QuestionItem';

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

export default function MainQuiz() {
  const {width} = useWindowDimensions();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPercent, setCurrentPercent] = useState(0);
  const slidesRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (selectedAnswer === data[currentIndex].answer) {
      if (currentIndex < data.length - 1) {
        slidesRef.current.scrollToIndex({index: currentIndex + 1}),
          setCurrentIndex(currentIndex + 1);
        setCurrentPercent((currentIndex + 1) * (100 / data.length));
      } else {
        setModalVisible(true);
        setCurrentPercent(100);
      }
    } else {
      setModalVisible(true);
      setCurrentIndex(0);
      setCurrentPercent(0);
    }

    setSelectedAnswer('');
  };

  const handleAnswerSelect = answer => {
    setSelectedAnswer(answer);
  };

  const renderListQuestion = () => {
    return (
      <View style={styles.buttonContainer}>
        {data[currentIndex].options.map((option, index) => (
          <TouchableOpacity
            style={[
              styles.buttonQuestion,
              {
                width: width - 64,
                borderColor: selectedAnswer !== option ? 'gray' : '#36cfc9',
              },
            ]}
            key={index}
            disabled={selectedAnswer !== ''}
            onPress={() => handleAnswerSelect(option)}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '800',
                color: selectedAnswer !== option ? 'gray' : '#36cfc9',
              }}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {currentPercent === 100
                ? 'Winner winner chicken dinner'
                : 'Sorry, you gave the wrong answer'}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>
                {currentPercent === 100 ? 'Go Home' : 'Try again'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.mainContainer}>
        <FlatList
          data={data}
          renderItem={({item}) => <QuestionItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item?.id}
          scrollEnabled={false}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        {renderListQuestion()}
      </View>
      <View style={styles.subContainer}>
        <NextButton
          scrollTo={scrollTo}
          percentage={currentPercent}
          disabled={selectedAnswer === ''}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  mainContainer: {
    flex: 0.65,
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.2,
  },
  buttonQuestion: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },

  /// Modal View

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
