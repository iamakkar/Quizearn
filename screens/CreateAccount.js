import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SocialIcon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import Loading from '../Loading_Screens/LoadingApp';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

function CreateAccount(props) {
  let navigation = props.navigation;

  const [flag, setFlag] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
  const [details, setDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    check_passwordInputChange: false,
    check_cPasswordInputChange: false,
    isValidPassword: true,
    isValidCPassword: true,
  });

  //add password to this details
  const passwordInputChange = val => {
    if (val.trim().length >= 8) {
      setDetails({
        ...details,
        password: val,
        check_passwordInputChange: true,
        isValidPassword: true,
      });
    } else {
      setDetails({
        ...details,
        password: val,
        check_passwordInputChange: false,
        isValidPassword: false,
      });
    }
  };

  //add comfirm password to this details
  const cpasswordInputChange = valc => {
    if (details.password === valc) {
      setDetails({
        ...details,
        confirmPassword: valc,
        check_cPasswordInputChange: true,
        isValidCPassword: true,
      });
    } else {
      setDetails({
        ...details,
        confirmPassword: valc,
        check_cPasswordInputChange: false,
        isValidCPassword: false,
      });
    }
  };

  //password hidden/shown functions
  function passwordShowHandler() {
    setPasswordHidden(!passwordHidden);
    if (passwordIcon == 'eye') {
      setPasswordIcon('eye-slash');
    } else {
      setPasswordIcon('eye');
    }
  }
  function confirmPasswordShowHandler() {
    setConfirmPasswordHidden(!confirmPasswordHidden);
    if (confirmPasswordIcon == 'eye') {
      setConfirmPasswordIcon('eye-slash');
    } else {
      setConfirmPasswordIcon('eye');
    }
  }

  //on press create
  function submitDetails() {
    if (
      details.email == '' ||
      details.password == '' ||
      details.confirmPassword == ''
    ) {
      alert('Each field is compulsary');
      return;
    }

    if (details.password.length < 8) {
      alert('password too short');
      return;
    }

    if (details.password !== details.confirmPassword) {
      alert('Password entered does not match Confirm Password!');
      setDetails({...details, password: '', confirmPassword: ''});
      return;
    }

    var emailValidator = require('email-validator');
    let check = emailValidator.validate(details.email);
    if (check === false) {
      alert('Please enter a valid e-mail!');
      setDetails({...details, email: ''});
      return;
    }
    console.log('everything is right');
    sendCred();
    console.log('now sending');
  }

  //sending to database
  const sendCred = async () => {
    setFlag(true);
    fetch('http://ec2-100-26-254-177.compute-1.amazonaws.com:3000/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        try {
          props.signup(details.email);
          await AsyncStorage.setItem('signuptoken', data.token);
          navigation.navigate('Update Profile');
        } catch (e) {
          console.log('error', e);
        }
      })
      .catch(err => console.error(err));
  };

  return flag === true ? (
    <Loading />
  ) : (
    <ScrollView style={styles.screen}>
      <View style={styles.topImageContainer}>
        <Image
          style={styles.topImage}
          source={require('../image_assets/CreateAcoountBackground.png')}
        />
      </View>
      <View style={styles.form}>
        <View style={styles.imageContainer}>
          <View style={styles.namesField} />
        </View>
        <View style={styles.textField}>
          <Text style={styles.label}>E-mail :</Text>
          <TextInput
            style={styles.inputField}
            keyboardType="email-address"
            value={details.email}
            onChangeText={enteredText => {
              setDetails({...details, email: enteredText.toLowerCase()});
            }}
          />
        </View>
        <View style={styles.textField}>
          <Text style={styles.label}>Password :</Text>
          <TextInput
            style={styles.inputField}
            secureTextEntry={passwordHidden}
            value={details.password}
            onChangeText={val => passwordInputChange(val)}
          />
          <TouchableOpacity
            onPress={passwordShowHandler}
            style={{position: 'absolute', top: '53%', left: '93%'}}>
            <FontAwesome5 name={passwordIcon} solid size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.errorText}>
          {details.isValidPassword ? null : (
            <View>
              <Text style={styles.errorMsg}>
                Password must be at least 8 characters long.
              </Text>
            </View>
          )}
        </View>
        <View style={styles.textField}>
          <Text style={styles.label}>Confirm Password :</Text>
          <TextInput
            style={styles.inputField}
            secureTextEntry={confirmPasswordHidden}
            value={details.confirmPassword}
            onChangeText={valc => cpasswordInputChange(valc)}
          />
          <View style={styles.errorText}>
            {details.isValidCPassword ? null : (
              <View>
                <Text style={styles.errorMsg}>Password doesn't match!</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={confirmPasswordShowHandler}
            style={{position: 'absolute', top: '45%', left: '93%'}}>
            <FontAwesome5
              name={confirmPasswordIcon}
              solid
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textField}>
          <TouchableOpacity style={styles.button} onPress={submitDetails}>
            <LinearGradient
              colors={['#f89b29', '#ff0f7b']}
              style={styles.button}>
              <Text style={styles.textsignin}>CREATE!</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10%',
            }}>
            <View style={styles.line} />
            <Text style={styles.india}>Made with</Text>
            <FontAwesome5 name="heart" size={20} solid color="red" />
            <Text style={styles.india}>in India</Text>
            <View style={styles.line} />
          </View>
        </View>
        {/* <View style={styles.textField}>
          <TouchableOpacity style={styles.button}>
            <SocialIcon
              title="Sign Up With Facebook"
              button
              type="facebook"
              style={styles.button}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textField}>
          <TouchableOpacity style={styles.button}>
            <SocialIcon
              title="Sign Up With Google"
              button
              type="google"
              style={styles.button}
            />
          </TouchableOpacity>
        </View> */}
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
    width: '20%',
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: '2%',
    height: 0,
  },
  india: {
    marginHorizontal: '1.5%',
    color: 'white',
    letterSpacing: 2,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  errorText: {
    marginBottom: '2%',
    marginLeft: '10%',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    signup: email => {
      dispatch({
        type: 'SIGN_UP',
        email: email,
      });
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(CreateAccount);
