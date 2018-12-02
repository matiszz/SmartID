import React, {Component} from 'react';
import * as eth from '../Ethereum/Api';
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


export default class BasicInfo extends Component {
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
                idNum: ''
            },
            testing: null
        };
    }

    async componentDidMount() {
        const {match} = this.props;
        //const ID = parseInt(match.params.id, 10);
        
        eth.getCitizenBasicInfo(1).then(res =>  {
            console.log(this.res);
            this.res = res
            this.setState({citizen: res});

        });
        setTimeout(()=> {
        console.log(this.res);
            this.setState({testing: 'Hey'})
        }, 5000);
    }

    render() {
        
        return (
           <Text>{this.state.citizen.name} {this.state.citizen.surname} Test</Text>
        );
    }
}
