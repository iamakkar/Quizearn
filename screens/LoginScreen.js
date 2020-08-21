import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
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

const deviceHeight = Dimensions.get('window').height;

function SignOutScreen(props) {
  let navigation = props.navigation;
  const [Details, setDetails] = useState({
    email: '',
    password: '',
  });

  //Password Secure Entry
  const updateSecureTextEntry = () => {
    setDetails({
      ...Details,
      secureTextEntry: !Details.secureTextEntry,
    });
  };

  //sending to database
  const sendCred = async () => {
    const ase = AsyncStorage.setItem('email', Details.email);

    fetch('https://6d78d89c5ce7.ngrok.io/signin', {
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
        } catch (e) {
          console.log('error hai', e);
          Alert(e);
        }
      });
  };

  return (
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
                onChangeText={text => {
                  setDetails({...Details, email: text});
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
                secureTextEntry={Details.secureTextEntry ? true : false}
              />
              <TouchableOpacity
                onPress={updateSecureTextEntry}
                style={{position: 'absolute', left: '90%'}}>
                {Details.secureTextEntry ? (
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
                  <Text style={styles.textsignin}>LOG IN</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {marginTop: '5%'}]}>
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
              </TouchableOpacity>
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
    fontSize: 80,
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
    minHeight: deviceHeight,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textsignin: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    letterSpacing: 3,
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
