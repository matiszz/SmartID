import React, {Component} from 'react';
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
import {Header,Left,Right,Icon} from 'native-base'
import * as eth from '../Ethereum/Api';

class LoginScreen extends Component {

  constructor(props) {
    super(props);
  
    this.state = { id: ''};
  }

  static navigationOptions = {
    header: null,
    drawerIcon : ( {tintColor}) => (
        <Icon name="home" style={{fontSize:24, color:tintColor}}/>
      )
  }    
  
  render() {
   
    var pic = require ('../assets/smart-ID.png');
    
    return (
      
      <View style={styles.container}> 
        <Image source={pic} style={styles.image}/> 
        <Text style={styles.title}>User</Text>
        <TextInput
        style={{padding: 10,  marginBottom: 10, height: 40, width: 200, backgroundColor:'white'}}
        onChangeText={(id) => this.setState({id})}
        value={this.state.id}
        />
        <Text style={styles.title}>Password</Text>
        <TextInput
        secureTextEntry={true} 
        style={{padding: 10, marginBottom: 10, height: 40, width: 200, backgroundColor:'white'}}
      />
      <Button
        onPress={()=> this.props.navigation.navigate('Home', {user: this.state.id})}
        //onPress={onPressLearnMore}
        title="Login"
        color="#BB86FC"
        containerStyle={{
          width: 200,
          height: 40,
          marginTop: 20,
        }}
        buttonStyle={{
          width: 200,
          height: 40,
          marginTop: 20,
        }}
        
      />
      </View>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    marginBottom:70,
    width: 350,
    height: 75,
    marginTop: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: "white",
  },
}); 
