import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

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
        <Animatable.Text
          style={[styles.optionText, {color: optionTextColor}]}
          animation="fadeIn"
          duration={1000}
          delay={1500}>
          {props.optionText}
        </Animatable.Text>
      </View>
    </TouchableOpacity>
  );
}

function ListOptionContainer(props) {
  return (
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
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    width: DEVICE_WIDTH,
    backgroundColor: 'black',
    marginTop: 0.05 * DEVICE_HEIGHT,
  },
  childContainer: {
    width: DEVICE_WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  option: {
    width: 0.9 * DEVICE_WIDTH,
    height: 0.075 * DEVICE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: '2%',
  },
  optionText: {
    paddingVertical: 15,
    fontFamily: 'Helvetica',
    fontSize: 18,
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
)(ListOptionContainer);
