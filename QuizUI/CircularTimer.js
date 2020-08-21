import React, {useState, useEffect} from 'react';
import {View, Animated, Easing} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import HourGlass from './hourGlass';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {socket} from '../routes/socket';

function CircularTimer(props) {
  let navigation = useNavigation();
  const circleSize = props.outerRadius;
  const loadingWidth = props.timerWidth;
  const innerCircleRadius = (circleSize - loadingWidth) / 2;
  const circumfrence = 2 * innerCircleRadius * Math.PI;

  const colorValue = useState(new Animated.Value(0))[0];
  var timeElapsed = useState(new Animated.Value(0))[0];
  let stopValue;

  const offsetLength = timeElapsed.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 2 * Math.PI * innerCircleRadius],
  });

  const loadingColor = colorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#00F5D4', 'red'],
  });

  function resetTimer() {
    Animated.timing(timeElapsed, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();

    Animated.timing(colorValue, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }

  function startTimer() {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(timeElapsed, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(timeElapsed, {
          toValue: 20,
          duration: props.roundDuration * 1000,
          easing: Easing.linear(),
          useNativeDriver: false,
        }),
      ]),

      Animated.sequence([
        Animated.timing(colorValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
        Animated.timing(colorValue, {
          toValue: 1,
          duration: props.roundDuration * 1000,
          easing: Easing.linear(),
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      props.setAnimRunning(false);
      props.setOptions(false);

      setTimeout(() => {
        if (props.currentIndex < 4) {
          props.incrementIndex();
        } else {
          props.resetState();
          navigation.navigate('Result');
          console.log('Match Over!');
        }
      }, props.timeout);
    });
  }

  function stopTimer() {
    Animated.timing(colorValue).stop();
    Animated.timing(timeElapsed).stop();
  }

  resetTimer();

  if (!props.hasAnswered) {
    setTimeout(() => {
      startTimer();
      props.setAnimRunning(true);
      props.setOptions(true);
    }, 3000);
  }

  if (props.hasAnswered) {
    stopTimer();
  }

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <View>
      <Svg height={circleSize + 5} width={circleSize + 5} style={props.style}>
        <Circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={innerCircleRadius}
          fill="black"
          strokeWidth={loadingWidth}
          stroke="#ddd"
        />
        <HourGlass />
        <AnimatedCircle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={innerCircleRadius}
          fill="none"
          stroke={loadingColor}
          strokeWidth={loadingWidth}
          strokeDasharray={circumfrence}
          strokeDashoffset={offsetLength}
        />
      </Svg>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    hasAnswered: state.quizReducer.hasAnswered,
    roundDuration: state.quizReducer.roundDuration,
    currentIndex: state.quizReducer.currentIndex,
    timeout: state.quizReducer.timeout,
    isCorrect: state.quizReducer.userCorrect,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAnimRunning: boolVar => {
      dispatch({type: 'SET_ANIMATION_RUNNING', data: boolVar});
    },
    incrementIndex: () => {
      dispatch({type: 'INCREMENT_CURRENT_INDEX'});
    },
    setAnswered: boolVar => {
      dispatch({type: 'SET_ANSWERED', data: boolVar});
    },
    incrementScore: value => {
      dispatch({type: 'INCREMENT_SCORE', data: value});
    },
    setOptions: boolValue => {
      dispatch({type: 'SET_OPTIONS', data: boolValue});
    },
    resetState: () => {
      dispatch({
        type: 'RESET_ALL',
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CircularTimer);
