import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {LoadScreen} from './LoadResults';
import AsyncStorage from '@react-native-community/async-storage';

import {socket} from '../routes/socket';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const ShareMessage =
  'I am feeling great today!\n\nNow let me see what it takes to beat you...\n\nlets have a match: https://reactnative.dev/docs/share#sharedaction';

const onShare = async () => {
  try {
    const result = await Share.share({
      title: 'Share and Earn',
      message: ShareMessage,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
      }
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (error) {
    alert(error.message);
  }
};

let flag = 0;
function Result(props) {
  let navigation = props.navigation;

  const score1 = useState(props.score);
  const [score2, setScore2] = useState(props.opponentScore);
  const [isWinner, setIsWinner] = useState(9);

  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');

  const get = async () => {
    try {
      var jsonValue = await AsyncStorage.getItem('email');
      var jsonValue1 = await AsyncStorage.getItem('firstName');

      if (jsonValue !== null) {
        // We have data!!
        setEmail(jsonValue);
        setfirstName(jsonValue1);
      }
    } catch (e) {
      console.log(e + 'badbadbabd');
    }
  };

  get();

  socket.emit('sendmyscore', {
    score: props.score,
    socketid: props.socketid,
  });

  if (score2 !== 0) {
    compare();
  }

  socket.on('sendmyscore', data => {
    setScore2(data);
  });

  function compare() {
    console.log(score1);
    console.log(score2);
    if (score1 > score2) {
      setIsWinner(1);
      socket.emit('winner', email);
    } else if (score1 < score2) {
      setIsWinner(0);
      socket.emit('notwinner', email);
    } else if (score1 === score2) {
      setIsWinner(-1);
    }
    flag = 1;
  }

  return score2 !== 0 && isWinner !== 9 ? (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={styles.title}>
          {isWinner === -1
            ? 'A Tie!'
            : isWinner == 1
            ? 'Congrats!'
            : 'Next Time,'}
        </Text>
        <Text style={styles.name}>{firstName}</Text>
        <Animatable.View animation="zoomIn" delay={500} duration={1500}>
          <Image
            source={require('../image_assets/trophy.png')}
            style={styles.image}
            resizeMode={'contain'}
          />
        </Animatable.View>
        <Text style={styles.ratio}>
          {score1} : {score2}
        </Text>
        <View style={styles.optionContainer}>
          <View style={styles.childContainer}>
            <TouchableOpacity>
              <View style={{...styles.option, backgroundColor: '#00F5D4'}}>
                <Text style={styles.optionText}>Rematch?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <View style={{...styles.option, backgroundColor: '#00BBF9'}}>
                <Text style={styles.optionText}>Share</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.childContainer}>
            <TouchableOpacity>
              <View style={{...styles.option, backgroundColor: '#FEE440'}}>
                <Text style={styles.optionText}>Details</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <View style={{...styles.option, backgroundColor: '#9B5DE5'}}>
                <Text style={styles.optionText}>Home</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  ) : (
    <LoadScreen />
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#ff0f7b',
    fontSize: 0.2 * DEVICE_WIDTH,
    textAlign: 'left',
    marginTop: '5%',
    paddingHorizontal: '2%',
    fontFamily: 'futura',
  },
  name: {
    color: '#42047e',
    fontSize: 0.2 * DEVICE_WIDTH,
    textAlign: 'left',
    paddingHorizontal: '2%',
    fontFamily: 'futura',
  },
  ratio: {
    color: '#ddd',
    fontSize: 0.22 * DEVICE_WIDTH,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '15%',
    letterSpacing: -5,
  },
  image: {
    height: 0.19 * DEVICE_HEIGHT,
    width: 1 * DEVICE_WIDTH,
    alignSelf: 'center',
  },
  optionContainer: {
    width: DEVICE_WIDTH,
    marginTop: '5%',
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
  },
  optionText: {
    paddingVertical: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const mapStateToProps = state => {
  return {
    score: state.quizReducer.score,
    socketid: state.topicState.socketid,
    opponentScore: state.quizReducer.opponentScore,
  };
};

export default connect(
  mapStateToProps,
  undefined,
)(Result);
