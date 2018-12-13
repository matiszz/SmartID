/* @flow */
import React, { PureComponent } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  AppRegistry,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import { TabNavigator, createDrawerNavigator,createAppContainer, DrawerItems } from 'react-navigation';
import 'babel-preset-react-native-web3/globals';

import Web3 from 'web3';
import { abi, address } from './Ethereum/config'; 
import truffleConfig from './truffle';

import Main from './src/Main';
import Container from './src/Container';
import BasicInfo from './src/BasicInfo'; 
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import MedicalScreen from './src/MedicalScreen';
import sharedState  from './src/sharedState';

export default class App extends React.Component {
  render() {
    console.log(sharedState)
    return (
  		<MyApp />
    );
  }
}
 
const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex :1 }}>
      <View style={{ height:250, backgroundColor: 'white' }}>
        <Image source={require('./assets/icon.png')} style={{ height: 220, width: 220, alignItems: 'center', justifyContent: 'center' }} />
        <Text>Test</Text>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  )

  const AppDrawerNavigator = createDrawerNavigator({
    //Login: LoginScreen,
    Login: (props) => <LoginScreen {...props} updateUser={sharedState.set} />,
    Home: (props) => <HomeScreen {...props} user={sharedState.get()} />,
    Medical: (props) => <MedicalScreen {...props}  user={sharedState.get()} />
  }, {
    ContentComponent: CustomDrawerComponent,
    contentOptions:{
      activeTintColor: '#3700B3'
    }
});

const MyApp = createAppContainer(AppDrawerNavigator);