import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {Icon} from 'react-native-elements';

import Quiz from '../QuizUI/QuizPage';
import Home from '../screens/HomeScreen';
import SelectPlayer from '../screens/SelectPlayer';
import ReportBug from '../screens/ReportBug';
import DrawerContent from '../routes/drawerContent';
import Result from '../screens/results';
import LogInStack from '../routes/logInStack';
import subTopic from '../screens/subTopic';
import MakeBid from '../screens/MakeBid';
import AboutUs from '../screens/Aboutus';
import ReportQuestion from '../screens/ReportQuestion';
import Shop from '../screens/Shop';
import EditProfilePage from '../screens/EditProfile';
import GetCoins from '../screens/GetCoins';
import CircularTimer from '../QuizUI/CircularTimer';

const Drawer = createDrawerNavigator();
const h = <Icon reverse name="home" size={20} />;
const rb = <Icon reverse name="error" size={20} />;
const rq = <Icon reverse name="warning" size={20} />;

export default function drawer(props) {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        drawerStyle={{backgroundColor: '#fff'}}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{drawerIcon: ({focused, size}) => h}}
        />
        <Drawer.Screen
          name="Quiz"
          component={Quiz}
          options={{unmountOnBlur: true}}
        />
        <Drawer.Screen
          name="Result"
          component={Result}
          options={{unmountOnBlur: true}}
        />
        <Drawer.Screen
          name="Circular Timer"
          component={CircularTimer}
          options={{unmountOnBlur: true}}
        />
        <Drawer.Screen
          name="Report a Bug?"
          component={ReportBug}
          options={{drawerIcon: ({focused, size}) => rb}}
        />
        <Drawer.Screen
          name="Report a Question?"
          component={ReportQuestion}
          options={{drawerIcon: ({focused, size}) => rq}}
        />
        <Drawer.Screen name="Shop" component={Shop} />
        <Drawer.Screen name="Edit Profile" component={EditProfilePage} />
        <Drawer.Screen name="Sign Out" component={LogInStack} />
        <Drawer.Screen name="sanchit" component={subTopic} />
        <Drawer.Screen
          name="Make Bid"
          component={MakeBid}
          options={{unmountOnBlur: true}}
        />
        <Drawer.Screen
          name="Select Player"
          component={SelectPlayer}
          options={{unmountOnBlur: true}}
        />
        <Drawer.Screen name="Get Coins" component={GetCoins} />
        <Drawer.Screen name="About Us" component={AboutUs} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
