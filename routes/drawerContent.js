import React, {useState} from 'react';
import {
  Image,
  View,
  Share,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Icon, Avatar} from 'react-native-elements';
import {Drawer, Title, Caption, Paragraph} from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';

const iconSize = 20;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const shareMessage =
  'Hey There! Download Quizearn and play exciting Quizes to earn money!!\nDo share the referal code with me to earn some free coins! \n\nhttps://reactnative.dev/docs/share#sharedaction';

const so = <Icon reverse name="login" size={iconSize} />;
const h = <Icon reverse name="home" size={iconSize} />;
const rb = <Icon reverse name="error" size={iconSize} />;
const rq = <Icon reverse name="warning" size={iconSize} />;
const s = <Icon reverse name="share" size={iconSize} />;
const sh = <Icon reverse name="shop" size={iconSize} />;
const ep = <Icon reverse name="person" size={iconSize} />;
const bc = (
  <FontAwesome5 name="coins" size={40} style={{padding: 9}} color={'gold'} />
);

const onShare = async props => {
  try {
    const result = await Share.share({
      title: 'Share and Earn',
      message: shareMessage,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

function DrawerContent(props) {
  const [getemail, setgetemail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [coins, setCoins] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mobNumber, setMobNumber] = useState('');
  const [dob, setdob] = useState('');
  const [imurl, setimurl] = useState('');

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
        await setFirstName(data.firstName);
        setLastName(data.lastName);
        setUserName(data.username);
        setCoins(data.coins);
        setStreak(data.streak);
        setMobNumber(data.mobNumber);
        setdob(data.dob);
        setimurl(data.profilePicture);
      } catch (e) {
        console.log('error is' + e);
      }
    });

  AsyncStorage.setItem('firstName', firstName);
  AsyncStorage.setItem('lastName', lastName);
  AsyncStorage.setItem('dob', dob);
  AsyncStorage.setItem('username', userName);
  AsyncStorage.setItem('mobNumber', mobNumber);

  AsyncStorage.setItem('imurl', imurl);

  const logout = props => {
    AsyncStorage.removeItem('firstName');
    AsyncStorage.removeItem('lastName');
    AsyncStorage.removeItem('username');
    AsyncStorage.removeItem('dob');
    AsyncStorage.removeItem('mobNumber');
    AsyncStorage.removeItem('imurl');
    AsyncStorage.removeItem('token').then(() => {
      props.setLoggedInStatus(false);
    });
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{paddingLeft: 20, height: 0.21 * DEVICE_HEIGHT}}>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate('Edit Profile')}>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Avatar
                rounded
                source={
                  imurl === ''
                    ? require('../image_assets/Unknown.png')
                    : {uri: imurl}
                }
                showAccessory={true}
                size={80}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title
                  style={{fontSize: 16, marginTop: 15, fontWeight: 'bold'}}>
                  {firstName}
                  {'\t'} {lastName}
                </Title>
                <Caption style={{fontSize: 14, lineHeight: 14}}>
                  @{userName}
                </Caption>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome5
                name="coins"
                size={20}
                style={{paddingRight: 5}}
                color={'gold'}
              />
              <Paragraph
                style={{
                  fontWeight: 'bold',
                  marginRight: 10,
                  fontSize: 20,
                }}>
                {coins}
              </Paragraph>
              <FontAwesome5
                name="fire"
                size={20}
                style={{paddingRight: 5}}
                color={'orange'}
              />
              <Paragraph
                style={{
                  fontWeight: 'bold',
                  marginRight: 3,
                  fontSize: 20,
                }}>
                {streak}
              </Paragraph>
            </View>
          </View>
        </View>

        {/* userInformation ends */}
        <Drawer.Section style={{borderTopColor: '#ddd', borderTopWidth: 2}}>
          <DrawerItem
            icon={({color, size}) => h}
            label="Home"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={({color, size}) => bc}
            label="Buy Coins"
            onPress={() => {
              props.navigation.navigate('Get Coins');
            }}
          />
          <DrawerItem
            icon={({color, size}) => sh}
            label="Shop"
            onPress={() => {
              props.navigation.navigate('Shop');
            }}
          />
          <DrawerItem
            icon={({color, size}) => s}
            label="Share"
            onPress={onShare}
          />

          <DrawerItem
            icon={({color, size}) => ep}
            label="Edit Profile"
            onPress={() => props.navigation.navigate('Edit Profile')}
          />

          <DrawerItem
            icon={({color, size}) => rq}
            label="Report a Question?"
            onPress={() => {
              props.navigation.navigate('Report a Question?');
            }}
          />
          <DrawerItem
            icon={({color, size}) => rb}
            label="Report a Bug?"
            onPress={() => {
              props.navigation.navigate('Report a Bug?');
            }}
          />
          <DrawerItem
            icon={({color, size}) => h}
            label="Test"
            onPress={() => {
              props.navigation.navigate('Quiz');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section
        style={{
          borderTopColor: '#ddd',
          borderTopWidth: 2,
        }}>
        <Drawer.Item
          icon={'logout'}
          label="Sign Out"
          onPress={() => logout(props)}
        />
      </Drawer.Section>
    </View>
  );
}

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
)(DrawerContent);
