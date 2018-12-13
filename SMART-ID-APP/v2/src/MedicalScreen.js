import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet,
    AppRegistry,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import {Header,Left,Right,Icon} from 'native-base'
import * as eth from '../Ethereum/Api';

class MedicalScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        lenght: ''
    };
  }
  
  async componentDidMount() {
    const {match} = this.props;
    //console.log(this.props.user);
          this.setState({loading: true})

    const res = await eth.getNumberClinicRecords(this.props.user)
    this.setState({lenght: res, loading: false});
  }

  async componentDidUpdate(prevProps) {
    //console.log(this.props.user);
    if (this.props.user !== prevProps.user) {
      const {match} = this.props;
      this.setState({loading: true})
      const res = await eth.getNumberClinicRecords(this.props.user)
      this.setState({lenght: res, loading: false});
    }
  } 
    
  static navigationOptions = {
    drawerIcon : ( {tintColor}) => (
        <Icon name="heart" style={{fontSize:24, color:tintColor}}/>
      )
  }    
  
  render() {
    var pic = require ('../assets/smart-ID.png');

    return this.state.loading
        ? (<ActivityIndicator style={styles.loader} size="large" color="#0000ff" />)
        : (
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
                      <Text style={styles.id}>ID: {this.props.user}</Text>
                      <Text style={styles.info}>Name: {this.state.lenght}</Text>
                      <Text style={styles.info}>Alergies: </Text>
                      <Text style={styles.info}>Download blood tests: Download</Text>
                      <Text style={styles.info}>Blood: </Text>
                      <Text style={styles.info}>Last Dr.: </Text>
                  </View>
              </View>
              <View style={styles.QR}>
                <Image source={pic} style={styles.image2}/>
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
   infoblock: {
    marginLeft: 30,
    marginTop: 50,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 25,
    height: 80,
  },
  loader: {
    marginTop: 300
  },
  image2: {
    marginBottom:50,
    marginLeft:50,
    width: 200,
    height: 60,
  }
}); 
