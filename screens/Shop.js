import React from 'react';
import {Image, View, Dimensions} from 'react-native';
import {Caption, Title} from 'react-native-paper';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

const heading =
  'We are working day and night to find you the best deals,\nuntil then...Keep Quizzing!';

export default function Shop() {
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
      <Image
        source={require('../image_assets/underconstruction.png')}
        style={{
          justifyContent: 'center',
          height: 0.5 * DEVICE_HEIGHT,
          width: DEVICE_WIDTH,
          alignSelf: 'center',
        }}
        resizeMode={'contain'}
      />
      <Caption
        style={{
          alignSelf: 'center',
          fontSize: 20,
          paddingHorizontal: 0.17 * DEVICE_WIDTH,
          textAlign: 'justify',
        }}>
        {heading}
      </Caption>
    </View>
  );
}
