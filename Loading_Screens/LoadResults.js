import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BarIndicator} from 'react-native-indicators';

export default function LoadScreen() {
  return (
    <View style={styles.screen}>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Loading Results...
      </Text>
      <View style={{height: 50, marginVertical: '15%'}}>
        <BarIndicator color="white" size={50} />
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: '15%',
          }}>
          Waiting for opponent to complete...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export {LoadScreen};
