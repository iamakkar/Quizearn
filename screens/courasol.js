import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import SubTopic from '../screens/subTopic';

export default function Courasol(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const setPage = event => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const sIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(sIndex);
  };
  const subtopics = props.items;
  let key = 0;
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={setPage}>
        {subtopics.map(subtopic => (
          <SubTopic
            subtopic={subtopic.subtopic}
            des={subtopic.des}
            topic={subtopic.topic}
            imageSource={subtopic.imageSource}
            key={key++}
          />
        ))}
      </ScrollView>
      <View style={styles.circleView}>
        {subtopics.map((subtopic, index) => (
          <View
            key={key++}
            style={[
              styles.circle,
              {
                height: index === selectedIndex ? 10 : 7,
                width: index === selectedIndex ? 10 : 7,
                borderRadius: index === selectedIndex ? 5 : 3.5,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },

  circleView: {
    flexDirection: 'row',
    height: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
  },

  circle: {
    height: 7,
    width: 7,
    borderRadius: 3.5,
    margin: 3,
    backgroundColor: '#ddd',
  },
});

export {Courasol};
