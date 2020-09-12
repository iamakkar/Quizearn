import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BarIndicator} from 'react-native-indicators';

export default function LoadScreen() {
  return (
    <View style={styles.screen}>
      <View style={{height: 50, marginVertical: 35}}>
        <BarIndicator color="white" size={50} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export {LoadScreen};
