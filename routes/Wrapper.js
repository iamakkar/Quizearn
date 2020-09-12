import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import DrawerNavigator from './drawer';
import LoginStack from './logInStack';
import {View} from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../Loading_Screens/LoadingApp';

function Wrapper(props) {
  const [flag, setFlag] = useState(false);

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      await props.setLoggedInStatus(true);
    } else {
      await props.setLoggedInStatus(false);
    }
    setFlag(true);
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <View style={{width: '100%', height: '100%'}}>
      {flag === false ? (
        <Loading />
      ) : props.isloggedin === true ? (
        <DrawerNavigator />
      ) : (
        <LoginStack />
      )}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    isloggedin: state.userDetails.isloggedin,
  };
};

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
  mapStateToProps,
  mapDispatchToProps,
)(Wrapper);
