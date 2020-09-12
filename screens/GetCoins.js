import React from 'react';
import {View, Text, Dimensions, Linking} from 'react-native';
import {Title} from 'react-native-paper';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default function App() {
  const heading =
    'We are working day and night to find you the best deals,\nuntil then...Keep Quizzing!';
  return (
    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
      <Title
        style={{
          alignSelf: 'center',
          fontSize: 45,
          paddingTop: '4%',
          fontFamily: 'futura',
        }}>
        Coming Soon...
      </Title>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          paddingTop: '4%',
          fontFamily: 'futura',
        }}>
        Note: If you are out of coins, you can mail the admin to request more
        coins.
      </Text>
      <Text
        onPress={() => Linking.openURL('mailto:makkardeepansh@gmail.com')}
        style={{
          textAlign: 'center',
          textDecorationLine: 'underline',
          color: 'blue',
          fontSize: 20,
          paddingTop: '4%',
          fontFamily: 'futura',
        }}>
        makkardeepansh@gmail.com
      </Text>
    </View>
  );
}
