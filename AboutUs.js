import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import { WebView } from 'react-native-webview';

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',

        };

    }

    componentWillUnmount() {

    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'ABOUT US',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'white',
            },
            headerTintColor :'#0592CC',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }




    componentDidMount(){


    }




    render() {

        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (

            <ScrollView style={styles.container}>

                <Text style = {{fontSize:20,margin:10,fontFamily:'Poppins-Medium',color:'#0592CC',textAlign:'left',width:'100%'}}>
                    About Us

                </Text>

                <Text style = {{fontSize:17,marginLeft:10,marginRight:10,marginBottom:10,fontFamily:'Poppins-Medium',color:'black',textAlign:'left',width:'90%'}}>
                    Company is providing 24 X 7 health care services
                    Anytimedoc App is designed with different verticals as 24x7 online consultation for all age groups patients by highly qualified & experienced doctors over video conferencing, mobile app chat and Audio call, 24 x 7 emergency doctor assistance at home within 30minutes, Nursing care at home with highly qualified / trained Para-medical staff, Clinic appointment bookings for nearby doctors, Medical ICU care at home with CMS (Centralized Monitoring System) by highly experienced doctors, E-lab for all type pathology investigations, Ambulance Services at doorstep within 30minutes, Elderly care at home, Medical Equipments available on rental or for sale. Anytimedoc team is dedicatedly working 24X7 to manage all medical emergencies in Delhi/NCR and rapidly scaling to provide best services to millions.

                </Text>


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'#f1f1f1',

    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})