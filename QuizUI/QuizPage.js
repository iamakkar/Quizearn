import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  ToastAndroid,
  BackHandler,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import CircularTimer from './CircularTimer';
import ListOptionContainer from './NormalQuestion';
import ScoreTimer from './ScoreTimer';
import GridOptionContainer from './ImageQuestion';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {LoadScreen} from '../Loading_Screens/LoadScreen';
import AsyncStorage from '@react-native-community/async-storage';

import {socket} from '../routes/socket';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

function QuizPage(props) {
  let navigation = props.navigation;

  const [getimurl, setgetimurl] = useState('');

  //Back Behaviour
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Warning!',
        'You can not leave a quiz in between, you will lose the bid',
        [
          {
            text: 'Okay',
            onPress: () => null,
            style: 'cancel',
          },
        ],
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const get = async () => {
    try {
      var jsonValue = await AsyncStorage.getItem('imurl');

      if (jsonValue !== null) {
        // We have data!!
        setgetimurl(jsonValue);
      }
    } catch (e) {
      console.log(e + 'badbadbabd');
    }
  };

  get();

  const timerRadius = 120;
  var questionTextOpacity = useState(new Animated.Value(0))[0];

  function questionAnimation() {
    Animated.timing(questionTextOpacity, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }

  function resetAnimation() {
    Animated.timing(questionTextOpacity, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }
  resetAnimation();
  questionAnimation();

  function startRound() {
    console.log('Round Started');
    props.setAnswered(false);
    props.setCorrect(false);
  }

  startRound();

  //SOCKET CODE HERE
  socket.on('rejected', msg => {
    console.log(msg);
    ToastAndroid.show(msg, ToastAndroid.SHORT);
    navigation.navigate('Home');
  });

  socket.on('sendmyscore', data => {
    props.setOpponentScore(data);
    props.setFlag(true);
    console.log('opponent has completed the quiz');
  });

  socket.on('accepted', async ques => {
    await props.setQuestionSet(ques);
    await console.log(ques);
  });
  //SOCKET CODE ENDS HERE

  return props.questionSet.length != 5 ? (
    <LoadScreen />
  ) : (
    <ScrollView style={styles.screen}>
      <ScoreTimer />
      <View
        style={[styles.questionContainer, {paddingBottom: 0.2 * DEVICE_WIDTH}]}>
        <View style={styles.profileBar}>
          <Avatar
            rounded
            source={
              getimurl === ''
                ? require('../image_assets/Unknown.png')
                : {uri: getimurl}
            }
            size={45}
          />
          <Avatar
            rounded
            source={
              props.reduximurl == ''
                ? require('../image_assets/Unknown.png')
                : {uri: props.reduximurl}
            }
            size={45}
          />
        </View>
        <View style={styles.questionBox}>
          <Animatable.Text
            style={styles.question}
            delay={500}
            duration={1000}
            animation="fadeIn">
            {props.questionSet[props.currentIndex].question}
          </Animatable.Text>
        </View>
      </View>
      <View style={styles.timerContainer}>
        <CircularTimer
          outerRadius={timerRadius}
          timerWidth={15}
          style={{position: 'relative', top: -timerRadius / 2}}
        />
      </View>
      <View style={{position: 'relative', top: -timerRadius / 2}}>
        {props.questionSet[props.currentIndex].image != '' ? (
          <GridOptionContainer
            imageSource={props.questionSet[props.currentIndex].image}
            optionA={props.questionSet[props.currentIndex].option1}
            optionB={props.questionSet[props.currentIndex].option2}
            optionC={props.questionSet[props.currentIndex].option3}
            optionD={props.questionSet[props.currentIndex].option4}
            correctAnswer={props.questionSet[props.currentIndex].correctOption}
          />
        ) : (
          <ListOptionContainer
            optionA={props.questionSet[props.currentIndex].option1}
            optionB={props.questionSet[props.currentIndex].option2}
            optionC={props.questionSet[props.currentIndex].option3}
            optionD={props.questionSet[props.currentIndex].option4}
            correctAnswer={props.questionSet[props.currentIndex].correctOption}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'black',
  },
  questionContainer: {
    borderBottomLeftRadius: 30,
    backgroundColor: '#fff',
  },
  profileBar: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  questionBox: {
    marginVertical: 20,
    padding: 15,
  },
  question: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Helvetica',
  },
  timerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  optionContainer: {
    width: DEVICE_WIDTH,
    backgroundColor: 'black',
  },
  childContainer: {
    width: DEVICE_WIDTH,
    height: '100%',
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
    backgroundColor: 'white',
  },
  optionText: {
    paddingVertical: 15,
    fontFamily: 'Helvetica',
  },
});

const mapStateToProps = state => {
  return {
    currentIndex: state.quizReducer.currentIndex,
    maxIndex: state.quizReducer.maxIndex,
    reduximurl: state.topicState.reduximurl,
    questionSet: state.quizReducer.questionSet,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAnswered: boolVar => {
      dispatch({type: 'SET_ANSWERED', data: boolVar});
    },
    setCorrect: boolVar => {
      dispatch({type: 'SET_CORRECT', data: boolVar});
    },
    setOpponentScore: data => {
      dispatch({
        type: 'SET_OPPONENTSCORE',
        opponentScore: data,
      });
    },
    setFlag: data => {
      dispatch({
        type: 'SET_FLAG',
        flag: data,
      });
    },
    setQuestionSet: data => {
      dispatch({
        type: 'SET_QUESTIONS',
        questionSet: data,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuizPage);

//images
//fetch
