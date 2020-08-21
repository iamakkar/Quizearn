import React, {useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

function ScoreTimer(props) {
  if (props.animationRunning == true) {
    var timer = setTimeout(() => {
      // console.log(`My timer is running successfully ${props.timerValue}`);
      props.setTimerValue(props.timerValue - 1);
    }, 1000);
  }
  if (props.animationRunning === false) {
    clearTimeout(timer);

    useEffect(() => {
      if (props.isUserCorrect) {
        props.incrementScore(2 * (props.timerValue + 1));
      }
    }, []);

    props.resetTimer();
  }
  return <View />;
}

const mapStateToProps = state => {
  return {
    animationRunning: state.quizReducer.animationRunning,
    hasAnswered: state.quizReducer.hasAnswered,
    timerValue: state.quizReducer.timerValue,
    isUserCorrect: state.quizReducer.userCorrect,
    currentIndex: state.quizReducer.currentIndex,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetTimer: () => {
      dispatch({
        type: 'RESET_TIMER',
      });
    },
    setTimerValue: data => {
      dispatch({
        type: 'SET_TIMER',
        data: data,
      });
    },
    incrementScore: value => {
      dispatch({type: 'INCREMENT_SCORE', data: value});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreTimer);
