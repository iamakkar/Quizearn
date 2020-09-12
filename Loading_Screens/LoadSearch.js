import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';

export default function LoadScreen() {
  return (
    <View style={styles.screen}>
      <View style={{height: 50, marginVertical: 35}}>
        <SkypeIndicator color="black" size={70} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {LoadScreen};
