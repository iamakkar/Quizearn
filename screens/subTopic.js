import React from 'react';
import {Text, View, Image, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

function SubTopic(props) {
  const navigation = useNavigation();

  function GoToButton() {
    props.setData({
      topic: props.topic,
      subtopic: props.subtopic,
    });
    navigation.navigate('Make Bid');
  }

  const DEVICE_WIDTH = Dimensions.get('window').width;
  return (
    <View
      style={{
        width: DEVICE_WIDTH,
        height: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderRightWidth: 1,
        borderRightColor: 'white',
        borderLeftWidth: 1,
        borderLeftColor: 'white',
        borderRightWidth: 1,
        borderRightColor: 'white',
      }}>
      <View
        style={{
          height: '20%',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 40,
          }}>
          {props.subtopic}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}>
        <View
          style={{
            padding: 10,
            flex: 2,
            justifyContent: 'space-between',
            marginBottom: '25%',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              marginBottom: '20%',
              fontSize: 20,
              color: 'black',
              marginLeft: '3%',
              fontFamily: 'futura',
            }}>
            {props.des}
          </Text>
          <Button
            mode="contained"
            icon="arrow-right"
            style={{width: '100%'}}
            onPress={GoToButton}>
            Play!
          </Button>
        </View>
        <View
          style={{
            flex: 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={props.imageSource}
            style={{
              height: '60%',
              width: '90%',
            }}
          />
        </View>
      </View>
    </View>
  );
}

// export {SubTopic};

const mapDispatchToProps = dispatch => {
  return {
    setData: data => {
      dispatch({
        type: 'SET_STATE',
        topic: data.topic,
        subtopic: data.subtopic,
      });
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(SubTopic);
