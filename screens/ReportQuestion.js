import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default function ReportQuestion({navigation}) {
  const [Topic, setTopic] = useState('');
  const [Subtopic, setSubtopic] = useState('');
  const [Question, setQuestion] = useState('');
  const [Description, setDescription] = useState('');

  const send = async () => {
    if (Topic === '' || Subtopic === '' || Question === '') {
      Alert.alert('First 3 fields are compulsary!');
      return;
    } else {
      await fetch('https://f2b638937c4b.ngrok.io/reportquestion', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          topic: Topic,
          subtopic: Subtopic,
          question: Question,
          description: Description,
        }),
      })
        .then(ToastAndroid.show('Report Sent Succesfully!', ToastAndroid.SHORT))
        .then(setTopic(''))
        .then(setSubtopic(''))
        .then(setQuestion(''))
        .then(setDescription(''));
    }
  };

  return (
    <ScrollView>
      <View style={{backgroundColor: '#00bbf9'}}>
        <IconButton
          icon="menu"
          color="#fff"
          size={40}
          onPress={() => navigation.toggleDrawer()}
        />
      </View>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 45,
            color: 'white',
            fontWeight: 'bold',
            marginHorizontal: 25,
            textAlign: 'center',
          }}>
          Report a Question
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.dropDown}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Select the topic:
          </Text>
          <TextInput
            value={Topic}
            style={styles.topicInput}
            onChangeText={val => setTopic(val)}
          />
        </View>
        <View style={styles.dropDown}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Select the sub-topic:
          </Text>
          <TextInput
            value={Subtopic}
            style={styles.topicInput}
            onChangeText={val => setSubtopic(val)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Type the Question:{' '}
          </Text>
          <TextInput
            value={Question}
            style={styles.questionInput}
            multiline={true}
            numberOfLines={5}
            onChangeText={val => setQuestion(val)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Type the Description(Optional):{' '}
          </Text>
          <TextInput
            style={styles.questionInput}
            multiline={true}
            numberOfLines={5}
            onChangeText={val => setDescription(val)}
            value={Description}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          color="orange"
          labelStyle={{color: '#fff'}}
          width={100}
          onPress={send}>
          Report
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 0.2 * DEVICE_HEIGHT,
    backgroundColor: '#00bbf9',
    justifyContent: 'flex-start',
    borderBottomLeftRadius: 30,
  },
  dropDown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingLeft: 15,
  },
  topicInput: {
    height: 50,
    width: 0.5 * DEVICE_WIDTH,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ddd',
    marginRight: '4%',
  },
  mainContainer: {
    paddingVertical: 0.05 * DEVICE_HEIGHT,
  },
  inputContainer: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  questionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 20,
    paddingBottom: 20,
  },
});
