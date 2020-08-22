import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Modal,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import {Card, Title, IconButton, Button} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Courasol} from '../screens/courasol';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import mathsSubTopics from '../Subjects/MathsSubTopics';
import physicsSubTopics from '../Subjects/PhysicsSubTopics';
import chemistrySubTopics from '../Subjects/ChemistrySubTopics';
import codingSubTopics from '../Subjects/CodingSubTopics';
import gkSubTopics from '../Subjects/GKSubTopics';
import movieSubTopics from '../Subjects/MoviesSubTopics';
import techSubTopics from '../Subjects/TechSubTopics';
import wordsSubTopics from '../Subjects/WordsSubTopics';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MoreOptions = <FontAwesome5 name={'menu'} solid />;

import {socket} from '../routes/socket';

function Home(props) {
  let navigation = props.navigation;

  const [mathematicsModalVisible, setMathematicsModalVisible] = useState(false);
  const [physicsModalVisible, setPhysicsModalVisible] = useState(false);
  const [chemistryModalVisible, setChemistryModalVisible] = useState(false);
  const [codingModalVisible, setCodingModalVisible] = useState(false);
  const [GKModalVisible, setGKModalVisible] = useState(false);
  const [techModalVisible, setTechModalVisible] = useState(false);
  const [moviesModalVisible, setMoviesModalVisible] = useState(false);
  const [wordsModalVisible, setWordsModalVisible] = useState(false);

  const [email, setgetemail] = useState('');

  useEffect(() => {
    const backAction = () => {
      Alert.alert('What?!', 'Are you sure you want to EXIT the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: Disconnect},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  function Disconnect() {
    socket.emit('disconnect', email);
    BackHandler.exitApp();
  }
  const [socketdata, setSocketdata] = useState([]);
  const [reqmodalvisible, setreqmodalvisible] = useState(false);
  socket.on('invite', data => {
    console.log(data);
    setSocketdata(data);

    setreqmodalvisible(true);
  });

  const string = `You hav been invited to play ${socketdata.topic} - ${
    socketdata.subtopic
  } with a bid of ${socketdata.bid}!!`;

  function Rejected() {
    socket.emit('rejected', {
      socketid: socketdata.mysocketid,
      message: 'Challenge Rejected!!',
    });
    setreqmodalvisible(!reqmodalvisible);
  }

  function Accepted() {
    socket.emit('accepted', {
      topic: socketdata.topic,
      subtopic: socketdata.subtopic,
      socketid: socketdata.socketid,
      mysocketid: socketdata.mysocketid,
    });
    props.setosocketid(socketdata.mysocketid);
    setreqmodalvisible(!reqmodalvisible);
    navigation.navigate('Quiz');
  }

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
  socket.emit('connected', email);

  return (
    <View
      style={{
        backgroundColor: '#fee440',
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <Modal visible={reqmodalvisible} transparent={true}>
        <View style={styles.centered}>
          <View style={styles.invitation_modal}>
            <Text style={{padding: 6}}>{string}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Button mode="text" onPress={Accepted}>
                Accept
              </Button>
              <Button mode="text" onPress={Rejected}>
                Reject
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={mathematicsModalVisible}
        onRequestClose={() =>
          setMathematicsModalVisible(!mathematicsModalVisible)
        }
        onDismiss={() => setMathematicsModalVisible(!mathematicsModalVisible)}>
        <View style={styles.modal}>
          <IconButton
            icon="close"
            size={40}
            style={styles.icon}
            onPress={() => setMathematicsModalVisible(!mathematicsModalVisible)}
          />
          <Courasol items={mathsSubTopics} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={physicsModalVisible}
        onRequestClose={() => setPhysicsModalVisible(!physicsModalVisible)}
        onDismiss={() => setPhysicsModalVisible(!physicsModalVisible)}>
        <View style={styles.modal}>
          <IconButton
            icon="close"
            size={40}
            style={styles.icon}
            onPress={() => setPhysicsModalVisible(!physicsModalVisible)}
          />
          <Courasol items={physicsSubTopics} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={chemistryModalVisible}
        onRequestClose={() => setChemistryModalVisible(!chemistryModalVisible)}
        onDismiss={() => setChemistryModalVisible(!chemistryModalVisible)}>
        <View style={styles.modal}>
          <IconButton
            icon="close"
            size={40}
            style={styles.icon}
            onPress={() => setChemistryModalVisible(!chemistryModalVisible)}
          />
          <Courasol items={chemistrySubTopics} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={codingModalVisible}
        onRequestClose={() => setCodingModalVisible(!codingModalVisible)}
        onDismiss={() => setCodingModalVisible(!codingModalVisible)}>
        <View style={styles.modal}>
          <IconButton
            icon="close"
            size={40}
            style={styles.icon}
            onPress={() => setCodingModalVisible(!codingModalVisible)}
          />
          <Courasol items={codingSubTopics} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={GKModalVisible}
        onRequestClose={() => setGKModalVisible(!GKModalVisible)}
        onDismiss={() => setGKModalVisible(!GKModalVisible)}>
        <View style={styles.modal}>
          <IconButton
            icon="close"
            size={40}
            style={styles.icon}
            onPress={() => setGKModalVisible(!GKModalVisible)}
          />
          <Courasol items={gkSubTopics} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={techModalVisible}
        onRequestClose={() => setTechModalVisible(!techModalVisible)}
        onDismiss={() => setTechModalVisible(!techModalVisible)}>
        <View style={styles.modal}>
          <IconButton
            icon="close"
            size={40}
            style={styles.icon}
            onPress={() => setTechModalVisible(!techModalVisible)}
          />
          <Courasol items={techSubTopics} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={moviesModalVisible}
        onRequestClose={() => setMoviesModalVisible(!moviesModalVisible)}
        onDismiss={() => setMoviesModalVisible(!moviesModalVisible)}>
        <View style={styles.modal}>
          <IconButton
            icon="close"
            size={40}
            style={styles.icon}
            onPress={() => setMoviesModalVisible(!moviesModalVisible)}
          />
          <Courasol items={movieSubTopics} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={wordsModalVisible}
        onRequestClose={() => setWordsModalVisible(!wordsModalVisible)}
        onDismiss={() => setWordsModalVisible(!wordsModalVisible)}>
        <View style={styles.modal}>
          <IconButton
            icon="close"
            size={40}
            style={styles.icon}
            onPress={() => setWordsModalVisible(!wordsModalVisible)}
          />
          <Courasol items={wordsSubTopics} />
        </View>
      </Modal>
      <IconButton
        icon="menu"
        size={40}
        onPress={() => navigation.toggleDrawer()}
      />
      <Text
        style={{
          fontSize: 60,
          textAlign: 'center',
        }}>
        Select a
      </Text>
      <Text
        style={{
          fontSize: 95,
          color: '#00bbf9',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Topic
      </Text>
      <View
        style={{
          flex: 1,
          height: 10000000,
          backgroundColor: '#fff',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}>
        <ScrollView
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          style={{
            marginHorizontal: 5,
          }}>
          <Card
            elevation={10}
            style={styles.card}
            onPress={() => {
              setMathematicsModalVisible(!mathematicsModalVisible);
            }}>
            <Card.Content>
              <Title style={styles.cardtitle}>Mathematics</Title>
              <Card.Cover
                source={require('../image_assets/maths.png')}
                resizeMode={'contain'}
                style={{borderRadius: 5}}
              />
            </Card.Content>
          </Card>

          <Card
            elevation={10}
            style={styles.card}
            onPress={() => {
              setCodingModalVisible(!codingModalVisible);
            }}>
            <Card.Content>
              <Title style={styles.cardtitle}>Coding</Title>
              <Card.Cover
                resizeMode={'contain'}
                source={require('../image_assets/coding.png')}
                style={{borderRadius: 5}}
              />
            </Card.Content>
          </Card>

          <Card
            elevation={10}
            style={styles.card}
            onPress={() => {
              setMoviesModalVisible(!moviesModalVisible);
            }}>
            <Card.Content>
              <Title style={styles.cardtitle}>Movies</Title>
              <Card.Cover
                resizeMode={'contain'}
                source={require('../image_assets/Movies.png')}
                style={{borderRadius: 5}}
              />
            </Card.Content>
          </Card>

          <Card
            elevation={10}
            style={styles.card}
            onPress={() => {
              setPhysicsModalVisible(!physicsModalVisible);
            }}>
            <Card.Content>
              <Title style={styles.cardtitle}>Physics</Title>
              <Card.Cover
                resizeMode={'contain'}
                source={require('../image_assets/physics.png')}
                style={{borderRadius: 5}}
              />
            </Card.Content>
          </Card>

          <Card
            elevation={10}
            style={styles.card}
            onPress={() => {
              setTechModalVisible(!techModalVisible);
            }}>
            <Card.Content>
              <Title style={styles.cardtitle}>Tech</Title>
              <Card.Cover
                resizeMode={'contain'}
                source={require('../image_assets/tech.png')}
                style={{borderRadius: 5}}
              />
            </Card.Content>
          </Card>

          <Card
            elevation={10}
            style={styles.card}
            onPress={() => {
              setGKModalVisible(!GKModalVisible);
            }}>
            <Card.Content>
              <Title style={styles.cardtitle}>General Knowledge</Title>
              <Card.Cover
                resizeMode={'contain'}
                source={require('../image_assets/general_knowledge.png')}
                style={{borderRadius: 5}}
              />
            </Card.Content>
          </Card>

          <Card
            elevation={10}
            style={styles.card}
            onPress={() => {
              setChemistryModalVisible(!chemistryModalVisible);
            }}>
            <Card.Content>
              <Title style={styles.cardtitle}>Chemistry</Title>
              <Card.Cover
                source={require('../image_assets/chemistry.png')}
                resizeMode={'contain'}
                style={{borderRadius: 5}}
              />
            </Card.Content>
          </Card>

          <Card
            elevation={10}
            style={styles.card}
            onPress={() => {
              setWordsModalVisible(!wordsModalVisible);
            }}>
            <Card.Content>
              <Title style={styles.cardtitle}>Words</Title>
              <Card.Cover
                source={require('../image_assets/words.png')}
                resizeMode={'contain'}
                style={{borderRadius: 5}}
              />
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: '20%',
  },
  invitation_modal: {
    backgroundColor: '#fff',
  },
  child1: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH,
    height: '100%',
  },

  centered: {
    //
    marginHorizontal: '5%',
    backgroundColor: 'white',
    //borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    position: 'relative',
    top: 0.5 * DEVICE_HEIGHT,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  child2: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH,
    height: '100%',
  },
  child3: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    width: DEVICE_WIDTH,
    height: '100%',
  },
  icon: {
    position: 'absolute',
    bottom: '92%',
    zIndex: 1,
    alignSelf: 'flex-start',
  },
  cardtitle: {
    fontSize: 25,
    fontFamily: 'Poppins-SemiBold',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    setosocketid: data => {
      dispatch({
        type: 'SET_OSOCKETID',
        socketid: data,
      });
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Home);
