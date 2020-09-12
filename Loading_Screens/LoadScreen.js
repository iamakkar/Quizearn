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
        Loading Questions...
      </Text>
      <View style={{height: 50, marginVertical: 35}}>
        <BarIndicator color="white" size={50} />
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
