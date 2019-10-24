import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Platform,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
var randomString = require('random-string');



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Register extends Component {
    state = {
        text: '',
        passwordtext :'',
        isSecure : true,
        username: '',
        password: '',
        email : '',
        mobile : '',
        status : '',
        iPAddress : '',
        loading:'',
        results: [],
        company:'',

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



    valide = () => {

        if (this.state.username == ''){
            alert('Please Enter Username')
        }
        else if (this.state.mobile == ''){
            alert('Please Enter Mobile')
        }   else if (this.state.email == ''){
            alert('Please Enter Email')
        }

        else if (this.state.company == '') {
            alert('Please Enter Referral Code')
        }

        else {


                const url = GLOBAL.BASE_URL +  'verify_referral'

                this.showLoading()
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email : this.state.email,
                        mobile: this.state.mobile,
                        referral_code:this.state.company,
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                        this.hideLoading()
                    //    alert(JSON.stringify(responseJson))
                        if (responseJson.status == true) {
//                            alert(JSON.stringify(responseJson))
                            alert("Referral code applied successfully! Rs. 500 will be credited to your wallet after successfull signup.")
                            GLOBAL.is_refer_verify = "1"
                            GLOBAL.apply_to = responseJson.apply_to
                            GLOBAL.referral_code = this.state.company


                        }else {
                            alert(responseJson.message)
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });

        }

    }

    login = () => {
       // this.props.navigation.navigate('Otp')


        GLOBAL.myname = this.state.username
        GLOBAL.mymobile= this.state.mobile
        GLOBAL.myemail= this.state.email
        GLOBAL.mypassword= this.state.password
        GLOBAL.mydeviceID= ''
        GLOBAL.mydeviceType= Platform.OS
        GLOBAL.mydeviceToken= ''
        GLOBAL.mymodel_name= ''
        GLOBAL.mycarrier_name= ''
        GLOBAL.mydevice_country= ''
        GLOBAL.mydevice_memory= ''
        GLOBAL.referral_code_other = this.state.company
//EmailValidator.validate("test@email.com");
        if (this.state.username == ''){
            alert('Please Enter Username')
        }
        else if (this.state.mobile == ''){
            alert('Please Enter Mobile')
        }   else if (this.state.email == ''){
            alert('Please Enter Email')
        }


        else if (this.state.password == '') {
            alert('Please Enter Password')
        }  else {
            var x = randomString({
                length: 4,
                numeric: true,
                letters: false,
                special: false,
            });
            if (this.state.username == ''){
                alert('Please Enter Mobile Number')
            }    else {
                const url = GLOBAL.BASE_URL +  'otp'

                this.showLoading()
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email : this.state.email,
                        mobile: this.state.mobile,
                        otp:x
                    }),
                }).then((response) => response.json())
                    .then((responseJson) => {
                        this.hideLoading()
                        if (responseJson.status == true) {
                           // alert(JSON.stringify(responseJson))
                            GLOBAL.otps =  x;
                            GLOBAL.fmobile= this.state.mobile;
                            GLOBAL.isScreen = '0';
                          //  alert(responseJson.msg)
                            this.props.navigation.replace('Otp')
                        }else {
                            alert(responseJson.msg)
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        }
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
//        alert('dd')
        this.setState({selected:true})
    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }
    render() {


        let { mobile } = this.state;
        let { email } = this.state;
        let { username } = this.state;
        let { password } = this.state;
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
                    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">



                        <Text style = {{marginLeft: '5%',width:'70%',color:'black',fontSize: 24,marginTop: '16%',fontFamily:'Poppins-Medium'}}>
                            Create an account

                        </Text>


                        <View style = {{marginLeft:'5%',width:'90%',marginTop:'2%'}}>
                            <TextField
                                label= 'Name'
                                value={username}
                                onChangeText={ (username) => this.setState({ username }) }
                                tintColor = {'#0592CC'}
                            />

                            <TextField
                                label= 'Email'
                                value={email}
                                onChangeText={ (email) => this.setState({ email }) }
                                tintColor = {'#0592CC'}
                            />




                            <TextField
                                label= 'Mobile No'
                                value={mobile}
                                keyboardType={'numeric'}
                                maxLength={10}
                                onChangeText={ (mobile) => this.setState({ mobile }) }
                                tintColor = {'#0592CC'}
                            />
                            <TextField
                                label= 'Password'
                                value={password}
                                secureTextEntry={true}
                                tintColor = {'#0592CC'}
                                onChangeText={ (password) => this.setState({ password }) }
                            />
                            <TextField
                                label= 'Referral Code'
                                value={company}

                                tintColor = {'#0592CC'}
                                onChangeText={ (company) => this.setState({ company }) }


                            />
                            <TouchableOpacity 
    style={{width:'20%',marginTop:-40, alignSelf:'flex-end'}}
                            onPress={() => this.valide()
                            }>
                            <Text style={{textAlign:'right',width:'100%',color :'#0592CC',fontFamily:'Poppins-Regular',fontSize: 16}} >
                             Apply
                            </Text>

                            </TouchableOpacity>

                        </View>

                        <Button
                            style={{padding:4,marginTop:40,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.login()}>
                            SIGN UP
                        </Button>





                        <Text style={styles.createaccount} >

                            <Text style={styles.account} >
                               By clicking Sign Up,you agree to our
                            </Text>
                            <Text style={styles.createaccounts} >
                                &nbsp;Terms and Conditions
                            </Text>
                            <Text style={styles.account} >
                                &nbsp; and that you have  read your
                            </Text>
                            <Text style={styles.createaccounts} >
                                &nbsp;Privacy Policy
                            </Text>
                        </Text>



                        <Text style={styles.createaccount} >

                            <Text style={styles.account} >
                                Already have an account?
                            </Text>
                            <Text style={styles.createaccounts}
                            onPress={()=> this.props.navigation.replace('Login')} >
                                &nbsp;Login Now
                            </Text>

                        </Text>



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
        fontSize: 14,
        justifyContent:'center',
        color : '#262628',
        fontFamily:'Poppins-Regular',



    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 14,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 14,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',
        textDecorationLine: 'underline',



    } ,
})