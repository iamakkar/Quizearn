import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';
import {connect} from 'react-redux';

const DEVICE_HEIGHT = Dimensions.get('screen').height;
const DEVICE_WIDTH = Dimensions.get('screen').width;
const buttonWidth = 0.75 * DEVICE_WIDTH;
const buttonHeight = 0.075 * DEVICE_HEIGHT;
const textInputHeight = 0.08 * DEVICE_HEIGHT;
const bid1 = 100;
const bid2 = 500;
const bid3 = 1000;

function BidScreen(props) {
  let navigation = props.navigation;

  const [bid, setBid] = useState(bid1);
  const [balance, setBalance] = useState(null);
  const [getemail, setgetemail] = useState('');

  const getEmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('email');

      if (jsonValue !== null) {
        // We have data!!
        setgetemail(jsonValue);
      }
    } catch (e) {
      console.log(e + 'badbadbabd');
    }
  };

  getEmail();

  fetch(`https://6d78d89c5ce7.ngrok.io/display`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: getemail,
    }),
  })
    .then(res => res.json())
    .then(async data => {
      await setBalance(data.coins);
    });

  async function sendBid() {
    props.setReduxBid(bid);
    const socket = await io('https://6d78d89c5ce7.ngrok.io');
    await socket.emit('setBid', bid);
    navigation.navigate('Select Player');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Icon name="coins" size={20} solid color="gold" />
        <Text style={styles.balanceView}>{balance}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.header}>
          <Text style={styles.heading}>Make a Bid</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.bidShow}
            editable={false}
            value={bid.toString()}
          />
        </View>
      </View>
      <View style={{marginBottom: 30}}>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.bidOption}
            mode="contained"
            onPress={() => {
              setBid(bid1);
            }}
            disabled={balance < bid1}>
            <Text style={styles.buttonText}>{bid1}</Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.bidOption}
            mode="contained"
            onPress={() => {
              setBid(bid2);
            }}
            disabled={balance < bid2}>
            <Text style={styles.buttonText}>{bid2}</Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.bidOption}
            mode="contained"
            onPress={() => {
              setBid(bid3);
            }}
            disabled={balance < bid3}>
            <Text style={styles.buttonText}>{bid3}</Text>
          </Button>
        </View>
      </View>
      <Button
        mode="contained"
        color="green"
        style={styles.submitButton}
        onPress={sendBid}>
        <Text style={styles.buttonText}>Play</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#950740',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  bidOption: {
    backgroundColor: '#5AB9EA',
    width: buttonWidth,
    height: buttonHeight,
    borderRadius: buttonHeight / 2,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 0.12 * DEVICE_HEIGHT,
    justifyContent: 'center',
  },
  bidShow: {
    backgroundColor: 'white',
    width: buttonWidth,
    textAlign: 'center',
    height: textInputHeight,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    borderWidth: 2,
    borderColor: 'red',
  },
  inputContainer: {
    height: 0.2 * DEVICE_HEIGHT,
    justifyContent: 'center',
  },
  header: {
    padding: 25,
  },
  heading: {
    fontSize: 55,
    fontWeight: 'bold',
    color: 'yellow',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  submitButton: {
    height: buttonHeight,
    width: buttonWidth / 2,
    display: 'flex',
    justifyContent: 'center',
  },
  balanceView: {
    height: 30,
    width: 120,

    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  topBar: {
    height: 0.05 * DEVICE_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    paddingTop: 20,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    setReduxBid: amount => {
      dispatch({
        type: 'SET_BID',
        bid: amount,
      });
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(BidScreen);
