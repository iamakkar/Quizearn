import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import DrawerNavigator from './drawer';
import LoginStack from './logInStack';
import {View} from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';

function Wrapper(props) {
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      props.setLoggedInStatus(true);
    } else {
      props.setLoggedInStatus(false);
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <View style={{width: '100%', height: '100%'}}>
      {props.isloggedin === true ? <DrawerNavigator /> : <LoginStack />}
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
