import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,


    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    
    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');

import { TextField } from 'react-native-material-textfield';
const GLOBAL = require('./Global');
import axios from 'react-native-axios';
type Props = {};
import { WebView } from 'react-native-webview';
let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Instamozo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
        };

    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    componentWillUnmount() {

    }




    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'PAYMENT',
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



    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){
        //   this._handlePressLogin()


        const data = new FormData();

        data.append('purpose', 'Doctor');
        data.append('amount', 10);
        data.append('buyer_name', GLOBAL.myname);
        data.append('redirect_url', 'http://example.com');
        data.append('email', GLOBAL.myemail);
        data.append('mobile', GLOBAL.mymobile);
        data.append('send_email', true);
        data.append('webhook', 'http://www.example.com/webhook/');
        data.append('allow_repeated_payments', false);
        var url = 'https://www.instamojo.com/api/1.1/payment-requests/'

        fetch(url, {
            method: 'POST',
            headers: {
                'X-Api-Key': '7f3587dab60d7a5cc563965410250bb7',
                'X-Auth-Token': '7ae6bfc8797a7f0faec11e367c79eb94',
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        })

            .then((response) => response.json())
            .then((responseData) => {
                this.setState({started:responseData.payment_request.longurl})
//                alert(JSON.stringify(responseData.payment_request.longurl))

            })
            .catch((error) =>{
                console.error(error);
            })
    }


    login = () => {
        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (indexs) => {

        this.props.navigation.navigate('HospitalDetail')

    }



    onNavigationChange(webViewState) {
        let hitUrl = webViewState.url;
        console.log(hitUrl);
        if (hitUrl.includes('http://example.com/')) {
            console.log(hitUrl);
            // we need the payment_req_id to get the status of paymnt
            let payment_final_id = hitUrl.split("request_id=").pop();
            var response = {
                url: hitUrl,
                payment_final_id: payment_final_id
            }


            this.getPaymentDetails(payment_final_id);
        }
    }
    getPaymentDetails(trans_id) {


        //insted of this you can do whatever you wan with therequests response , loading a custom success page with details etc
        const self = this;
        axios.get(`https://www.instamojo.com/api/1.1/payment-requests/${trans_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': '7f3587dab60d7a5cc563965410250bb7',
                'X-Auth-Token': '7ae6bfc8797a7f0faec11e367c79eb94',
            }
        }).then(function (response) {
            console.log(response);
            Alert.alert('Response of txn', JSON.stringify(response.data));

        })
            .catch(function (error) {
                console.log(JSON.stringify(error));


            })
    }

    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }


    render() {


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (



            <WebView
                ref="webview"
                source={{ uri: this.state.started }}
                onNavigationStateChange={this.onNavigationChange.bind(this)}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                // renderLoading={this.renderLoading.bind(this)}
                onMessage={(event) => console.log(event.nativeEvent.data)} />
            
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

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
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:'Poppins-Regular',


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',
        textDecorationLine: 'underline',



    } ,
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
