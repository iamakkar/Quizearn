import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';
import {Avatar, SocialIcon} from 'react-native-elements';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

const cardHeight = DEVICE_HEIGHT / 2.1;
const cardWidth = DEVICE_WIDTH * 0.8;
const profileRadius = 150;

function openLink(link) {
  if (link != '' && link != null) {
    Linking.openURL(link);
  } else {
    console.log('No url was mentioned');
  }
}

function DevCard(props) {
  let key = 0;

  return (
    <View style={styles.cardPage}>
      <View style={styles.infoCard}>
        <View style={styles.profileView}>
          <Avatar
            rounded
            source={{
              uri: props.dev.devProfile,
            }}
            size={profileRadius}
          />
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.name}>{props.dev.devName}</Text>
          <Text style={styles.post}>{props.dev.devPost}</Text>
          <Text style={styles.description}>{props.dev.devDescription}</Text>
        </View>
        <View style={styles.iconsContainer}>
          {props.dev.devSocial.map(socialApp => (
            <SocialIcon
              type={socialApp.name}
              onPress={() => {
                openLink(socialApp.link);
              }}
              key={key++}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const dev1 = {
    devName: 'Deepansh Makkar',
    devPost: 'Co-Founder | CEO | Full Stack Developer',
    devProfile:
      'https://instagram.fdel3-2.fna.fbcdn.net/v/t51.2885-15/e35/s150x150/79585417_863784707372374_7072827225261320508_n.jpg?_nc_ht=instagram.fdel3-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=LAdb4lm-4zAAX_i8Q_Y&oh=08cdee9e7afcbfcf8bc63afc9da7e7bd&oe=5F799192',
    devDescription: `Hello Dear Players!\nI hope that you all must be enjoying quizzing with your friends and famalies. Quizearn is the very first startup of my life and I really want it to be specal for you all too! As the CEO, I'm sure one day Quizearn will become one of the top grossing apps.\nUntill then...\n\nKeep Quizzing!`,
    devSocial: [
      {
        name: 'linkedin',
        link: 'http://www.linkedin.com/in/deepansh-makkar-175012197/',
      },
      {name: 'instagram', link: 'https://www.instagram.com/iamakkar/'},
      {name: 'google', link: 'mailto:makkardeepansh@gmail.com'},

      {name: 'twitter', link: 'http://twitter.com/MakkarDeepansh'},
    ],
  };

  const dev2 = {
    devName: 'Sanchit Khurana',
    devPost: 'Co-Founder | CTO | Front-End Developer',
    devProfile:
      'https://scontent.fdel15-1.fna.fbcdn.net/v/t1.0-0/p600x600/85214420_1093376794376063_7537149850467434496_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=uLIviLXMVCgAX-Wzxi3&_nc_ht=scontent.fdel15-1.fna&tp=6&oh=4e5d462341eba2d17a714549a87373a7&oe=5F754F04',
    devDescription:
      'Quizearn is my first experience of developing an app in a team and also the first startup of my life. It is thus very special to me. I had a great experience developing the app as a front-end developer and I am sure you would also have a great experience quizzing with your friends, family etc through the app.',
    devSocial: [
      {name: 'instagram', link: 'https://www.instagram.com/sanchit4545/'},
      {name: 'facebook', link: 'https://www.facebook.com/sanchit.khurana.733'},
      {
        name: 'linkedin',
        link:
          'https://www.linkedin.com/in/sanchit-khurana-72767a193?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BAq6yJV2dQqeb3i%2FaziuvxQ%3D%3D',
      },
      {name: 'github', link: 'https://github.com/Sanchit-sk'},
    ],
  };

  const dev3 = {
    devName: 'Nidhi Sharma',
    devPost: 'Chief Content Analyst',
    devProfile:
      'https://instagram.fdel3-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/104608418_150682996555137_6027683254407136271_n.jpg?_nc_ht=instagram.fdel3-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=tlj-HhpslxUAX9oXMoZ&oh=ac0565bb3499a665da62d8a9ab7d3db0&oe=5F7C0F7E',
    devDescription:
      'Hello guys!! Hope you all are enjoying our company. As a part of Quizearn, I always take care of your interest and praise your level of entertainment....So lets play quizee and make youself busy!',
    devSocial: [
      {
        name: 'instagram',
        link: 'https://instagram.com/_0516.nidhii_?igshid=1ate6o7yfeh30',
      },
      {name: 'google', link: 'mailto:ns0870835@gmail.com'},
      {
        name: 'linkedin',
        link: 'http://www.linkedin.com/in/nidhi-sharma-562299184',
      },
    ],
  };

  return (
    <ScrollView pagingEnabled>
      <DevCard dev={dev1} />
      <DevCard dev={dev2} />
      <DevCard dev={dev3} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardPage: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginVertical: '3%',
  },
  infoCard: {
    elevation: 10,
    borderColor: 'grey',
    width: cardWidth,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#fff',
  },
  profileView: {
    alignItems: 'center',
    position: 'absolute',
    top: -profileRadius / 2,
    left: cardWidth / 2 - profileRadius / 2,
  },
  name: {
    fontSize: 30,
    fontFamily: 'futura',
  },
  descriptionView: {
    alignItems: 'center',
    marginTop: profileRadius / 2 + 20,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  post: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#043927',
    marginTop: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'space-evenly',
    backgroundColor: '#1ebf89',
  },
});
