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

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        citizen: {
            name: '',
            surname: '',
            birthDate: '',
            gender: '',
            nationality: '',
            residence: '',
            city: '',
            idNum: '',
            image: ''
        },
        testing: null
    };
  }
  
  async componentDidMount() {
    const {match} = this.props;
    //console.log(this.props.navigation.state.params.user);
          this.setState({loading: true})

    const res = await eth.getCitizenBasicInfo(this.props.navigation.state.params.user)
    this.setState({citizen: res, loading: false});

  }

  async componentDidUpdate(prevProps) {
    //console.log(this.props.navigation.state.params.user);
    if (this.props.navigation.state.params.user !== prevProps.navigation.state.params.user) {
      const {match} = this.props;
      this.setState({loading: true})
    const res = await eth.getCitizenBasicInfo(this.props.navigation.state.params.user)
    this.setState({citizen: res, loading: false});
    }
  } 


  static navigationOptions = {
    drawerIcon : ( {tintColor}) => (
        <Icon name="home" style={{fontSize:24, color:tintColor}}/>
      )
  }  
  callFun = () =>
  {
      alert("Show QR Code");
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
                      <Text style={styles.title}>Information</Text>
                      <Text style={styles.info}>
                        <Text style={{fontWeight: "bold"}}>Name:</Text>
                        <Text> {this.state.citizen.name} {this.state.citizen.surname}</Text>
                      </Text>
                      <Text style={styles.info}>
                        <Text style={{fontWeight: "bold"}}>Birthday:</Text>
                        <Text> {this.state.citizen.birthDate}</Text>
                      </Text>
                      <Text style={styles.info}>
                        <Text style={{fontWeight: "bold"}}>Gender:</Text>
                        <Text> {this.state.citizen.gender}</Text>
                      </Text>
                      <Text style={styles.info}>
                        <Text style={{fontWeight: "bold"}}>Nacionality:</Text>
                        <Text> {this.state.citizen.nationality}</Text>
                      </Text>
                      <Text style={styles.info}>
                        <Text style={{fontWeight: "bold"}}>Address:</Text>
                        <Text> {this.state.citizen.residence}</Text>
                      </Text>
                      <Text style={styles.info}>
                        <Text style={{fontWeight: "bold"}}>City:</Text>
                        <Text> {this.state.citizen.city}</Text>
                      </Text>
                  </View>
                  <View style={styles.picblock}>

                      <Image source={{uri:`https://cloudflare-ipfs.com/ipfs/${this.state.citizen.image}`}} style={styles.image}/> 
                  </View>
              </View>
              <View style={styles.QR}>
                <Image source={pic} style={styles.image2}/> 
              </View>
          </View>
      );
  }
}
export default HomeScreen;


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

/*
   <Button
                      onPress={this.callFun}
                      //onPress={onPressLearnMore}
                      title="Show QR"
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
                      
                    />*/