import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'


export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen
})
