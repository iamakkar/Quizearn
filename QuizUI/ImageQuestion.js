import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

function ListItem(props) {
  var [optionColor, setOptionColor] = useState('white');
  var [optionTextColor, setOptionTextColor] = useState('black');

  function handleOptionSelect() {
    setOptionTextColor('white');

    if (props.optionText == props.correctAnswer) {
      setOptionColor('green');
      props.setCorrect(true);
    } else {
      setOptionColor('red');
    }

    props.setAnswered(true);

    setTimeout(() => {
      setOptionColor('white');
      setOptionTextColor('black');
    }, props.timeout);
  }

  return (
    <TouchableOpacity
      onPress={handleOptionSelect}
      disabled={!props.optionsEnabled}>
      <View style={[styles.option, {backgroundColor: optionColor}]}>
        <Text style={[styles.optionText, {color: optionTextColor}]}>
          {props.optionText}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function GridOptionContainer(props) {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.questionImage}
          source={{uri: props.imageSource}}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.childContainer}>
          <ListItem
            optionText={props.optionA}
            correctAnswer={props.correctAnswer}
            setAnswered={props.setAnswered}
            hasAnswered={props.hasAnswered}
            timeout={props.timeout}
            increaseCurrentIndex={props.increaseCurrentIndex}
            currentIndex={props.currentIndex}
            maxIndex={props.maxIndex}
            incrementScore={props.incrementScore}
            optionsEnabled={props.optionsEnabled}
            setCorrect={props.setCorrect}
          />

          <ListItem
            optionText={props.optionB}
            correctAnswer={props.correctAnswer}
            setAnswered={props.setAnswered}
            hasAnswered={props.hasAnswered}
            timeout={props.timeout}
            increaseCurrentIndex={props.increaseCurrentIndex}
            currentIndex={props.currentIndex}
            maxIndex={props.maxIndex}
            incrementScore={props.incrementScore}
            optionsEnabled={props.optionsEnabled}
            setCorrect={props.setCorrect}
          />
        </View>
        <View style={styles.childContainer}>
          <ListItem
            optionText={props.optionC}
            correctAnswer={props.correctAnswer}
            setAnswered={props.setAnswered}
            hasAnswered={props.hasAnswered}
            timeout={props.timeout}
            increaseCurrentIndex={props.increaseCurrentIndex}
            currentIndex={props.currentIndex}
            maxIndex={props.maxIndex}
            incrementScore={props.incrementScore}
            optionsEnabled={props.optionsEnabled}
            setCorrect={props.setCorrect}
          />

          <ListItem
            optionText={props.optionD}
            correctAnswer={props.correctAnswer}
            setAnswered={props.setAnswered}
            hasAnswered={props.hasAnswered}
            timeout={props.timeout}
            increaseCurrentIndex={props.increaseCurrentIndex}
            currentIndex={props.currentIndex}
            maxIndex={props.maxIndex}
            incrementScore={props.incrementScore}
            optionsEnabled={props.optionsEnabled}
            setCorrect={props.setCorrect}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    width: DEVICE_WIDTH,
  },
  childContainer: {
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  option: {
    width: 0.4 * DEVICE_WIDTH,
    height: 0.08 * DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  optionText: {
    paddingVertical: 15,
    fontFamily: 'Helvetica',
  },
  imageContainer: {
    height: 0.25 * DEVICE_HEIGHT,
    width: 0.8 * DEVICE_WIDTH,
    marginVertical: 15,
    alignSelf: 'center',
  },
  questionImage: {
    height: '100%',
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    hasAnswered: state.quizReducer.hasAnswered,
    timeout: state.quizReducer.timeout,
    currentIndex: state.quizReducer.currentIndex,
    maxIndex: state.quizReducer.maxIndex,
    optionsEnabled: state.quizReducer.optionsEnabled,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAnswered: boolVar => {
      dispatch({type: 'SET_ANSWERED', data: boolVar});
    },
    increaseCurrentIndex: () => {
      dispatch({type: 'INCREMENT_CURRENT_INDEX'});
    },
    incrementScore: incrementValue => {
      dispatch({type: 'INCREMENT_SCORE', data: incrementValue});
    },
    setCorrect: boolVar => {
      dispatch({type: 'SET_CORRECT', data: boolVar});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GridOptionContainer);
