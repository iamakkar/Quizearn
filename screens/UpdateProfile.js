import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

function CreateAccount(props) {
  let navigation = props.navigation;
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [imurl, setimurl] = useState('');
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    username: '',
    mobNumber: '',
  });

  //image picker
  var options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  function openPicker() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const data = new FormData();
        data.append('name', 'avatar');
        console.log(response.fileName);
        console.log(response.uri);
        console.log(response.type);
        data.append('data', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
        fetch('https://f2b638937c4b.ngrok.io/uploadimage', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        })
          .then(res => res.json())
          .then(async abc => {
            await setimurl(abc.location);
            setAvatar(true);
          })
          .catch(err => console.log(err));
      }
    });
  }

  function showDatePicker() {
    setDatePickerVisible(true);
  }

  function hideDatePicker() {
    setDatePickerVisible(false);
  }

  const handleConfirm = date => {
    let year = date.getFullYear();
    let month = Number(date.getMonth()) + 1;
    let day = date.getDate();
    let fullDate = '';
    fullDate = day + '/' + month + '/' + year;
    hideDatePicker();
    setDetails({...details, dob: fullDate});
  };

  function submitDetails() {
    if (details.firstName == '' || details.username == '') {
      alert('Fields with an * are COMPULSORY!');
      return;
    }

    if (details.mobNumber.length !== 10 && details.mobNumber.length !== 0) {
      alert('Enter a Valid Mobile Number!');
      return;
    }

    props.setFirstName(details.firstName);
    props.setLastName(details.lastName);
    props.setUserName(details.username);
    AsyncStorage.setItem('firstName', details.firstName);
    AsyncStorage.setItem('lastName', details.lastName);
    AsyncStorage.setItem('dob', details.dob);
    AsyncStorage.setItem('username', details.username);
    AsyncStorage.setItem('mobNumber', details.mobNumber);
    console.log(details);
    sendCred();
    console.log('sent to database!');
  }

  const sendCred = async () => {
    console.log('EMAIL' + props.email);
    fetch('https://f2b638937c4b.ngrok.io/enterUserDetails', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        firstName: details.firstName,
        lastName: details.lastName,
        username: details.username,
        dob: details.dob,
        mobNumber: details.mobNumber,
        profilePicture: imurl,
        email: props.email,
      }),
    }).then(navigation.navigate('Log In'));
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.topImageContainer}>
        <Image
          style={styles.topImage}
          source={require('../image_assets/CreateAcoountBackground.png')}
        />
      </View>
      <View style={styles.form}>
        <View style={styles.imageContainer}>
          <View style={styles.profileImage}>
            <Avatar
              rounded
              source={
                avatar === null
                  ? require('../image_assets/Unknown.png')
                  : {uri: imurl}
              }
              size={100}
              showAccessory
              onPress={openPicker}
            />
          </View>
          <View style={styles.namesField}>
            <View style={styles.name}>
              <Text style={{color: 'white'}}>*First Name :</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingBottom: 6,
                  width: '65%',
                  paddingLeft: 15,
                  color: 'white',
                }}
                value={details.firstName}
                onChangeText={enteredText => {
                  setDetails({...details, firstName: enteredText});
                }}
              />
            </View>
            <View style={styles.name}>
              <Text style={{color: 'white'}}>Last Name :</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingBottom: 6,
                  width: '65%',
                  paddingLeft: 15,
                  color: 'white',
                }}
                value={details.lastName}
                onChangeText={enteredText => {
                  setDetails({...details, lastName: enteredText});
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.textField}>
          <Text style={styles.label}>Date of Birth :</Text>
          <TextInput
            style={styles.inputField}
            editable={false}
            value={details.dob}
          />
          <TouchableOpacity
            style={{position: 'absolute', top: '50%', left: '93%'}}
            onPress={showDatePicker}>
            <FontAwesome5 name="calendar-alt" size={25} color="#fff" />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={new Date()}
          />
        </View>
        <View style={styles.textField}>
          <Text style={styles.label}>*Username :</Text>
          <TextInput
            style={styles.inputField}
            value={details.username}
            onChangeText={enteredText => {
              setDetails({...details, username: enteredText});
            }}
          />
        </View>
        <View style={styles.textField}>
          <Text style={styles.label}>Mobile Number :</Text>
          <TextInput
            style={styles.inputField}
            keyboardType={'phone-pad'}
            value={details.mobNumber}
            onChangeText={enteredText => {
              setDetails({...details, mobNumber: enteredText});
            }}
          />
        </View>

        <View style={styles.textField}>
          <TouchableOpacity style={styles.button} onPress={submitDetails}>
            <LinearGradient
              colors={['#f89b29', '#ff0f7b']}
              style={styles.button}>
              <Text style={styles.textsignin}>SAVE</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#42047e',
  },
  form: {
    marginBottom: '10%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topImageContainer: {
    height: 0.16 * DEVICE_HEIGHT,
  },
  topImage: {
    width: DEVICE_WIDTH,
    height: '100%',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  profileImage: {
    marginLeft: '5%',
  },
  textField: {
    marginTop: '5%',
    marginHorizontal: '7%',
  },
  inputField: {
    fontSize: 15,
    marginLeft: 10,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'white',
  },
  label: {
    fontSize: 15,
    paddingLeft: 10,
    color: '#fff',
  },
  namesField: {
    flex: 1,
    marginLeft: '3%',
  },
  name: {
    flexDirection: 'row',
    marginVertical: '5%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: '4%',
  },
  textsignin: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    letterSpacing: 3,
  },
  line: {
    width: '40%',
    borderWidth: 1,
    borderColor: 'white',
    height: 0,
  },
  or: {
    marginHorizontal: '3%',
    color: 'white',
    letterSpacing: 2,
  },
});

const mapStateToProps = state => {
  return {
    email: state.userDetails.email,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFirstName: firstName => {
      dispatch({
        type: 'SET_FIRSTNAME',
        firstName: firstName,
      });
    },
    setLastName: lastName => {
      dispatch({
        type: 'SET_LASTNAME',
        lastName: lastName,
      });
    },
    setUserName: username => {
      dispatch({
        type: 'SET_USERNAME',
        username: username,
      });
    },
    setMobNumber: mobNumber => {
      dispatch({
        type: 'SET_MOBNUMBER',
        mobNumber: mobNumber,
      });
    },
    setDoB: dob => {
      dispatch({
        type: 'SET_DOB',
        dob: dob,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccount);
