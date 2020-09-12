import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SocialIcon, Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import Loading from '../Loading_Screens/LoadingApp';

const DEVICE_HEIGHT = Dimensions.get('window').height;

function SignOutScreen(props) {
  let navigation = props.navigation;

  const [flag, setFlag] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const [Details, setDetails] = useState({
    email: '',
    password: '',
  });

  //Secure Text Entry
  function passwordShowHandler() {
    setPasswordHidden(!passwordHidden);
    if (passwordIcon == 'eye') {
      setPasswordIcon('eye-slash');
    } else {
      setPasswordIcon('eye');
    }
  }

  //sending to database
  const sendCred = async () => {
    const ase = AsyncStorage.setItem('email', Details.email);

    if (Details.email == '' || Details.password == '') {
      alert('You have to fill both the fields!');
      return;
    }

    setFlag(true);
    fetch('http://ec2-100-26-254-177.compute-1.amazonaws.com:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: Details.email,
        password: Details.password,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        try {
          await AsyncStorage.setItem('token', data.token);
          props.setLoggedInStatus(true);
          setFlag(false);
        } catch (e) {
          console.log('error hai', e);
          Alert(e);
        }
      });
  };

  return flag === true ? (
    <Loading />
  ) : (
    <View style={styles.page}>
      <ImageBackground
        source={require('../image_assets/background.png')}
        style={styles.bgImage}
        resizeMode="stretch">
        <Animatable.Text
          style={styles.greet}
          animation="fadeIn"
          delay={500}
          duration={2000}>
          Welcome!
        </Animatable.Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}>
          <Animatable.View
            style={styles.container}
            animation="fadeIn"
            delay={1500}
            duration={2000}>
            <View style={styles.field}>
              <Icon name="person" reverse />
              <TextInput
                style={styles.Input}
                placeholder="E-Mail ID"
                value={Details.email}
                keyboardType="email-address"
                onChangeText={text => {
                  setDetails({...Details, email: text.toLocaleLowerCase()});
                }}
                placeholderTextColor="#ddd"
              />
            </View>
            <View style={styles.field}>
              <Icon reverse name="lock" />
              <TextInput
                style={styles.Input}
                placeholder="Password"
                placeholderTextColor="#ddd"
                value={Details.password}
                onChangeText={text => {
                  setDetails({...Details, password: text});
                }}
                secureTextEntry={passwordHidden}
              />
              <TouchableOpacity
                onPress={passwordShowHandler}
                style={{position: 'absolute', left: '90%'}}>
                {passwordHidden ? (
                  <FontAwesome5 name="eye" color="grey" size={20} />
                ) : (
                  <FontAwesome5 name="eye-slash" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  sendCred();
                }}>
                <LinearGradient
                  colors={['#f89b29', '#ff0f7b']}
                  style={styles.button}>
                  <Text style={styles.textsignin}>LOGIN</Text>
                </LinearGradient>
              </TouchableOpacity>
              {/* <TouchableOpacity style={[styles.button, {marginTop: '5%'}]}>
                <SocialIcon
                  title="Sign Up With Facebook"
                  button
                  type="facebook"
                  style={styles.button}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {marginTop: '5%'}]}>
                <SocialIcon
                  title="Sign Up With Google"
                  button
                  type="google"
                  style={styles.button}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={[styles.button, {marginTop: '5%'}]}
                onPress={() => navigation.navigate('Create an Account')}>
                <LinearGradient
                  colors={['#40c9ff', '#e81cff']}
                  style={styles.button}>
                  <Text style={styles.textsignin}>NEW USER?</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  greet: {
    color: '#fff',
    fontSize: 75,
    textAlign: 'center',
    marginTop: '25%',
    fontFamily: 'futura',
  },
  field: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '1%',
    marginHorizontal: '5%',
    alignItems: 'center',
    marginLeft: '5%',
  },
  Input: {
    height: 50,
    width: '80%',
    marginLeft: 10,
    justifyContent: 'center',
    padding: 9,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  container: {
    marginVertical: '30%',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginTop: '5%',
    marginLeft: '10%',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    minHeight: DEVICE_HEIGHT,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 50,
  },
  textsignin: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  errorText: {
    marginBottom: '2%',
    marginLeft: '20%',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    setLoggedInStatus: status => {
      dispatch({
        type: 'LOGGED_STATUS',
        status: status,
      });
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(SignOutScreen);
