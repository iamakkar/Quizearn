import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Avatar} from 'react-native-elements';
import {Button, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {connect} from 'react-redux';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

const buttonWidth = 0.9 * DEVICE_WIDTH;
const buttonHeight = 50;

function EditProfilePage(props) {
  let navigation = props.navigation;
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [username, setusername] = useState('');
  const [dob, setdob] = useState('');
  const [mobNumber, setmobNumber] = useState('');
  const [imurl, setimurl] = useState('');

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
        fetch('https://6d78d89c5ce7.ngrok.io/uploadimage', {
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
          })
          .catch(err => console.log(err));
      }
    });
  }

  const getIt = async () => {
    try {
      //retrieving old without fetch
      const asyncemail = await AsyncStorage.getItem('email');
      const asyncfn = await AsyncStorage.getItem('firstName');
      const asyncln = await AsyncStorage.getItem('lastName');
      const asyncun = await AsyncStorage.getItem('username');
      const asyncmn = await AsyncStorage.getItem('mobNumber');
      const asyncdob = await AsyncStorage.getItem('dob');
      const asyncimurl = await AsyncStorage.getItem('imurl');

      if (asyncemail !== null) {
        // We have data!!
        setEmail(asyncemail);
        setfirstName(asyncfn);
        setlastName(asyncln);
        setusername(asyncun);
        setdob(asyncdob);
        setmobNumber(asyncmn);
        setimurl(asyncimurl);
      }
    } catch (e) {
      console.log(e + 'badbadbabd');
    }
  };

  useEffect(() => {
    getIt();
  }, []);

  const handleConfirm = date => {
    let year = date.getFullYear();
    let month = Number(date.getMonth()) + 1;
    let day = date.getDate();
    let fullDate = '';
    fullDate = day + '/' + month + '/' + year;
    hideDatePicker();
    setDate(fullDate);
  };

  function hideDatePicker() {
    setDatePickerVisible(false);
  }

  function update() {
    if (firstName == '' || username == '') {
      alert('Username and First Name are COMPULSORY!');
      return;
    }

    if (mobNumber.length !== 10 && mobNumber.length !== 0) {
      alert('Enter a Valid Mobile Number!');
      return;
    }

    //setting new data
    AsyncStorage.setItem('firstName', firstName);
    AsyncStorage.setItem('lastName', lastName);
    AsyncStorage.setItem('dob', dob);
    AsyncStorage.setItem('username', username);
    AsyncStorage.setItem('mobNumber', mobNumber);
    AsyncStorage.setItem('imurl', imurl);
    sendCred();
  }

  const sendCred = async () => {
    fetch('https://6d78d89c5ce7.ngrok.io/enterUserDetails', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        dob: dob,
        mobNumber: mobNumber,
        email: email,
        profilePicture: imurl,
      }),
    }).then(navigation.navigate('Home'));
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <IconButton
          icon="menu"
          color="#fff"
          size={40}
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: 5,
          }}
          onPress={() => navigation.toggleDrawer()}
        />
        <Avatar
          rounded
          source={
            imurl === '' ? require('../image_assets/Unknown.png') : {uri: imurl}
          }
          size={100}
          showAccessory
          onPress={openPicker}
        />
      </View>
      <View style={styles.userDetailsContainer}>
        <TextInput
          placeholder="E-mail:"
          editable={false}
          defaultValue={email}
          style={styles.inputField}
        />
        <TextInput
          placeholder="First Name:"
          defaultValue={firstName}
          style={styles.inputField}
          onChangeText={val => {
            setfirstName(val);
          }}
        />
        <TextInput
          placeholder="Last Name:"
          defaultValue={lastName}
          style={styles.inputField}
          onChangeText={val => {
            setlastName(val);
          }}
        />

        <TextInput
          placeholder="Username:"
          defaultValue={username}
          style={styles.inputField}
          onChangeText={val => {
            setusername(val);
          }}
        />

        <View>
          <TextInput
            placeholder="DoB:"
            defaultValue={dob}
            style={styles.inputField}
            onChangeText={val => {
              setdob(val);
            }}
          />
          <TouchableOpacity
            style={{position: 'absolute', bottom: '10%', right: '6%'}}
            onPress={() => {
              setDatePickerVisible(true);
            }}>
            <FontAwesome5 name="calendar-alt" size={25} color="black" />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <TextInput
          placeholder="Mobile Number:"
          keyboardType="numeric"
          defaultValue={mobNumber}
          style={styles.inputField}
          onChangeText={val => {
            setmobNumber(val);
          }}
        />

        <View style={styles.buttonGroup}>
          <Button
            mode="contained"
            style={styles.button}
            width={buttonWidth}
            height={buttonHeight}
            onPress={update}>
            <FontAwesome5 name="lock" size={15} />
            Change Password
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            width={buttonWidth}
            height={buttonHeight}
            color="green">
            <FontAwesome5 name="edit" size={15} />
            Edit and Save
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 0.3 * DEVICE_HEIGHT,
    backgroundColor: '#EE204D',
    borderBottomLeftRadius: 30,
    alignItems: 'center',
  },
  inputField: {
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 18,
    textAlignVertical: 'center',
    paddingVertical: 5,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
  },
  userDetailsContainer: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  buttonGroup: {
    marginTop: 0.05 * DEVICE_HEIGHT,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: buttonWidth / 2,
  },
});

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
  undefined,
  mapDispatchToProps,
)(EditProfilePage);
