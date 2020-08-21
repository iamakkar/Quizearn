import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

export default function reportBug({navigation}) {
  const [titleField, setTitleField] = useState('');
  const [desField, setDesField] = useState('');
  const MoreOptions = <FontAwesome5 name={'menu'} solid />;

  function titleInputHandler(enteredText) {
    setTitleField(enteredText);
  }

  function desInputHandler(enteredText) {
    setDesField(enteredText);
  }

  async function sendReportHandler() {
    if (titleField == '' && desField == '') {
      Alert.alert('Please enter both Fields');
      return;
    } else if (titleField == '' && desField != '') {
      Alert.alert(
        'Please enter both Fields',
        'You have not entered the Title!',
      );
      return;
    } else if (titleField != '' && desField == '') {
      Alert.alert(
        'Please enter both Fields',
        'You have not entered the Description!',
      );
      return;
    } else {
      await fetch('https://6d78d89c5ce7.ngrok.io/reportbug', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title: titleField,
          description: desField,
        }),
      })
        .then(ToastAndroid.show('Report Sent Succesfully!', ToastAndroid.SHORT))
        .then(setTitleField(''))
        .then(setDesField(''));
    }
  }

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
        <View>
          <Text style={styles.heading}>Report a Bug!</Text>
        </View>
      </View>
      <View style={styles.inputField}>
        <Text style={styles.title}>Title:</Text>
        <TextInput
          mode="flat"
          placeholder="Enter the title"
          style={styles.titlefield}
          onChangeText={titleInputHandler}
        />
        <Text style={styles.title}>Description:</Text>
        <TextInput
          style={styles.desfield}
          mode="outlined"
          multiline={true}
          numberOfLines={8}
          selectionColor="#87ceeb"
          placeholder="Enter the description here"
          onChangeText={desInputHandler}
          value={desField}
        />
      </View>
      <Button
        color="orange"
        mode="contained"
        labelStyle={{color: '#fff'}}
        onPress={sendReportHandler}
        style={{width: 0.4 * DEVICE_WIDTH, alignSelf: 'center'}}>
        Send Report
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bugPage: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 0.2 * DEVICE_HEIGHT,
    alignItems: 'center',
    minHeight: '10%',
    justifyContent: 'center',
    backgroundColor: '#00bbf9',
    flexDirection: 'row',
    borderBottomLeftRadius: 30,
  },
  heading: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  message: {
    fontSize: 21,
    marginVertical: '7%',
  },
  inputField: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 7,
  },
  titlefield: {
    marginVertical: '3%',
    height: 40,
    borderRadius: 5,
    padding: 10,
    width: '98%',
    marginLeft: 5,
  },
  desfield: {
    marginTop: '2%',
    borderRadius: 8,
    padding: 10,
    marginBottom: '5%',
    width: '99%',
    textAlignVertical: 'top',
  },
  titleFieldFocus: {
    marginVertical: '3%',
    height: 40,
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 10,
    width: '98%',
    borderColor: 'blue',
    borderWidth: 2,
  },
});
