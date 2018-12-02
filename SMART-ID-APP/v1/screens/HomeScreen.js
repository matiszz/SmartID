import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    AppRegistry,
    TouchableOpacity
} from "react-native";

class HomeScreen extends Component {
    
    callFun = () =>
    {
        alert("Show QR Code");
    }
    
    render() {
        var pic = require ('../assets/john-doe.jpg');
        
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={styles.infoblock}>
                        <Text style={styles.title}>Information</Text>
                        <Text style={styles.id}>ID: 1234567Z </Text>
                        <Text style={styles.info}>Name: John Doe</Text>
                        <Text style={styles.info}>Birthday: 10-02-1976</Text>
                        <Text style={styles.info}>Gender: Male</Text>
                        <Text style={styles.info}>Nacionality: Spain</Text>
                        <Text style={styles.info}>Residence: Spain</Text>
                        <Text style={styles.info}>City: Barcelona</Text>
                        <Text style={styles.info}>Phone: +34 933 234 321</Text>
                    </View>
                    <View style={styles.picblock}>
                        <Image source={pic} style={styles.image}/> 
                    </View>
                </View>
                <View style={styles.QR}>

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
                        
                      />
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
    padding: 30,
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
  }

}); 
