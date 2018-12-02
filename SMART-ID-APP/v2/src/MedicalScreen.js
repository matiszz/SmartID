import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    AppRegistry,
    SafeAreaView,
    ScrollView,
    Dimensions
} from "react-native";
//import * as eth from '../Ethereum/Api';

import {Header,Left,Right,Icon} from 'native-base'

class MedicalScreen extends Component {
    
  static navigationOptions = {
    drawerIcon : ( {tintColor}) => (
        <Icon name="heart" style={{fontSize:24, color:tintColor}}/>
      )
  }    
  callFun = () =>
  {
    alert("Show QR Code");
  }
  
  render() {
    var pic = require ('../assets/john-doe.jpg');
    
    return (
      <View style={styles.container}>
        <Header style={styles.header}> 
          <Left>
            <Icon name="menu" onPress={() =>
              this.props.navigation.openDrawer()} />  
          </Left>
          </Header>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.infoblock}>
                <Text style={styles.title}>Medical Information</Text>
                <Text style={styles.id}>ID: 1234567Z </Text>
                <Text style={styles.info}>Name: John Doe</Text>
                <Text style={styles.info}>Alergies: xxxx</Text>
                <Text style={styles.info}>Download blood tests: Download</Text>
                <Text style={styles.info}>Blood: O+</Text>
                <Text style={styles.info}>Last Dr.: Maria Roma</Text>
            </View>
          </View>
        </View>
    );
  }
}
export default MedicalScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6200EE',
    justifyContent: 'flex-start',
  },
  title: {
    color: "white",
    fontSize: 40,
    marginBottom: 20,
  },
  id: {
    color: "white",
    fontSize: 30,
    marginBottom: 10,
  },
  info: {
    color: "white",
    fontSize: 22,
  },
  image: {
    marginBottom:70,
    width: 160,
    height: 200,
    marginTop: 70,
  },
  picblock: {
    position: 'absolute',
    right: 0
  },
  header: {
    backgroundColor: '#3700B3',
    marginTop: 22
  }
}); 
