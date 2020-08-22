import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Button} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('window').width;

import {socket} from '../routes/socket';

const itemWidth = 0.98 * DEVICE_WIDTH;
const imageDiameter = 0.2 * DEVICE_WIDTH;
const modalImageDiameter = 0.2 * DEVICE_WIDTH;

function App(props) {
  let navigation = props.navigation;
  const [osocketid, setosocketid] = useState('');
  const [imurl, setimurl] = useState('');
  const [mysocketid, setMysocketid] = useState('');
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

  fetch(`https://f2b638937c4b.ngrok.io/display`, {
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
      try {
        await setMysocketid(data.socketid);
      } catch (e) {
        console.log('error is' + e);
      }
    });

  const Item = props => {
    // Each Item to be rendered //
    const [modalVisible, setModalVisisble] = useState(false);

    return (
      <View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisisble(false);
          }}
          onDismiss={() => {
            setModalVisisble(false);
          }}
          transparent={true}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{position: 'absolute', left: 20, top: 20}}
              onPress={() => {
                setModalVisisble(false);
              }}>
              <FontAwesome5 name="times" size={30} />
            </TouchableOpacity>
            <View style={styles.modalImageView}>
              <View
                style={{
                  justifyContent: 'space-around',
                  marginRight: 20,
                  alignItems: 'flex-end',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {props.itemData.firstName + ' ' + props.itemData.lastName}
                </Text>
                <Text style={{color: 'grey'}}>{props.itemData.username}</Text>
              </View>
              <Image
                style={styles.modalImage}
                source={{uri: props.itemData.profilePicture}}
              />
            </View>
            <View style={styles.modalDetailsView}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <FontAwesome5 name="coins" size={30} solid color="gold" />
                <Text style={{fontSize: 20, paddingLeft: 15}}>
                  {props.itemData.coins}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <FontAwesome5 name="fire" size={30} solid color="orange" />
                <Text style={{fontSize: 20, paddingLeft: 15}}>
                  {props.itemData.streak}
                </Text>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            setModalVisisble(true);
          }}>
          <View style={styles.item}>
            <View style={styles.userDetails}>
              <View style={styles.imageView}>
                <Image
                  style={styles.itemImage}
                  source={{uri: props.itemData.profilePicture}}
                />
              </View>
              <View style={styles.dataView}>
                <Text style={styles.fullName}>
                  {props.itemData.firstName + ' ' + props.itemData.lastName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.username}>{props.itemData.username}</Text>
                  <View style={styles.buttonContainer}>
                    <Button
                      mode="text"
                      color="green"
                      style={styles.itemButton}
                      disabled={props.itemData.socketid !== '' ? false : true}
                      onPress={() => {
                        invite(props);
                      }} // Invite Function
                      //
                    >
                      Invite
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  async function invite(props) {
    if (props.itemData.coins < props.bid) {
      Alert.alert('Wait', `You opponent have ${props.itemData.coins} only!`, [
        {
          text: 'Okay',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      await setimurl(props.itemData.profilePicture);
      await setosocketid(props.itemData.socketid);
      let sid = props.itemData.socketid;
      let t = props.topic;
      let st = props.subtopic;
      let b = props.bid;
      await socket.emit('invite', {
        mysocketid: mysocketid,
        socketid: sid,
        topic: t,
        subtopic: st,
        bid: b,
      });
      navigation.navigate('Quiz');
    }
  }

  props.setreduximurl(imurl);
  props.setsocketid(osocketid);

  const renderItem = (
    {item}, //Function that takes the data and render the corresponding item for that to be passed to the flatlist
  ) => (
    <Item
      itemData={item}
      topic={props.topic}
      subtopic={props.subtopic}
      bid={props.bid}
    />
  );

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  function handleSearch(text) {
    setSearch(text);
    fetch(`https://f2b638937c4b.ngrok.io/finduser`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: text,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        await setFilteredData(data);
      });
  }

  return (
    <View style={styles.screen}>
      <SearchBar
        placeholder="Search player by name..."
        onChangeText={handleSearch}
        value={search}
        round={true}
      />
      <FlatList
        style={styles.itemList}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, itemIndex) => itemIndex.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  item: {
    height: 'auto',
    width: itemWidth,
    borderRadius: 20,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginVertical: '1%',
    borderWidth: 1,
    alignSelf: 'center',
    padding: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  userDetails: {
    flexDirection: 'row',
  },
  itemImage: {
    height: imageDiameter,
    width: imageDiameter,
    borderRadius: imageDiameter / 2,
  },
  dataView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    marginLeft: 20,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userName: {
    color: 'grey',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    position: 'relative',
    top: 0.7 * DEVICE_HEIGHT,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalImage: {
    height: modalImageDiameter,
    width: modalImageDiameter,
    borderRadius: modalImageDiameter / 2,
  },
  modalImageView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalDetailsView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});

const mapStateToProps = state => {
  return {
    topic: state.topicState.topic,
    subtopic: state.topicState.subtopic,
    bid: state.topicState.bid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setreduximurl: data => {
      dispatch({
        type: 'SET_IMURL',
        reduximurl: data,
      });
    },
    setsocketid: data => {
      dispatch({
        type: 'SET_OSOCKETID',
        socketid: data,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
