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
    AsyncStorage,
    Platform
} from 'react-native';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import DeviceInfo from 'react-native-device-info';
// or ES6+ destructured imports
import { getUniqueId, getManufacturer } from 'react-native-device-info';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],
        results:[],

    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
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


    login = () => {
        if (this.state.phone == ''){
            alert('Please Enter Username')
        }    else if (this.state.company == '') {
            alert('Please Enter Password')
        }  else {
            this.showLoading()
            const url = GLOBAL.BASE_URL + 'Signin'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: this.state.phone,
                    password: this.state.company,
                    deviceID: DeviceInfo.getUniqueId(),
                    deviceType: Platform.OS,
                    deviceToken: GLOBAL.firebaseToken,
                    model_name: '',
                    carrier_name: '',
                    device_country: '',
                    device_memory: '',
                    has_notch: '',
                    manufacture: '',
                    ip_address: '',
                    voip_token:GLOBAL.voip,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                   // alert(JSON.stringify(responseJson))

                    this.hideLoading()
                    if (responseJson.status == true) {
                        this.setState({results: responseJson.user_detail})
                        GLOBAL.user_id = this.state.results.user_id
                        AsyncStorage.setItem('userID', this.state.results.user_id);
                        AsyncStorage.setItem('image', this.state.results.image);
                        AsyncStorage.setItem('name', this.state.results.name);
                        AsyncStorage.setItem('email', this.state.results.email);
                        AsyncStorage.setItem('mobile', this.state.results.mobile);
                       this.props.navigation.replace('TabNavigator')
                    } else {
                        alert('Invalid Credentials!')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }
    otp =  () => {
        this.props.navigation.replace('MyOtp')
    }
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
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

                <View style={styles.container}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

                        <Image style = {{width :300 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                               source={require('./loginlogo.png')}/>


                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'2%'}}>


                            <TextField
                                label= 'Email /Mobile No'
                                value={phone}
                                onChangeText={ (phone) => this.setState({ phone }) }
                                tintColor = {'#0592CC'}
                            />
                            <TextField
                                label= 'Password'
                                value={company}
                                secureTextEntry={true}
                                tintColor = {'#0592CC'}
                                onChangeText={ (company) => this.setState({ company }) }
                            />

                        </View>


                        <TouchableOpacity onPress={() => this.props.navigation.replace('Forgot')
                        }>
                        <Text style={{textAlign:'right',marginRight:40 ,width:'95%',color :'black',fontFamily:'Poppins-Regular',fontSize: 16,marginTop:20}} >

                            Forgot Password ?
                        </Text>
                        </TouchableOpacity>






                        <Button
                            style={{padding:4,marginTop:14,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            SIGN IN
                        </Button>





                        <Text style={{textAlign:'center',marginRight:40 ,width:'95%',color :'#4A4A4A',fontFamily:'Poppins-Medium',fontSize: 22,marginTop:10}} >

                           OR
                        </Text>
                        <Button
                            style={{padding:4,marginTop:8,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.otp()}>
                            SIGN IN WITH OTP
                        </Button>


                        <TouchableOpacity onPress={() => this.props.navigation.replace('Register')
                        }>
                            <Text style={styles.createaccount} >

                                <Text style={styles.account} >
                                    Don't have an account?
                                </Text>


                                <Text style={styles.createaccounts} >
                                    &nbsp;Sign Up
                                </Text>


                            </Text>

                        </TouchableOpacity>

                    </KeyboardAwareScrollView>

                </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
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
})