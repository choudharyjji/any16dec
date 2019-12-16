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
    SafeAreaView,
    AsyncStorage
} from 'react-native';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
const window = Dimensions.get('window');
var validator = require("email-validator");

import { TextField } from 'react-native-material-textfield';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
             name:'',
            email:'',
            mobile:'',
            relation:'',
            gender:'',
            dob:'',
            value:0,

        };

    }

    componentWillUnmount() {

    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'ADD MEMBER',
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
        //   this._handlePressLogin()
    }
_handlePress() {
        var type;
        if (this.state.value == 0){
            type = "Male"
        }else{
            type = "Female"
        }

        if (this.state.name == ''){
            alert('Please enter name')

        }else if (this.state.email == ''){
            alert('Please enter email')

        }else if (validator.validate(this.state.email) == false){
            alert('Please enter Valid email')
        }

        else if (this.state.mobile == ''){
            alert('Please enter mobile')

        }else if (this.state.relation == ''){
            alert('Please enter relation')

        }else if (this.state.dob == ''){
            alert('Please enter dob')
        }else {


            const url = GLOBAL.BASE_URL + 'add_member'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify({
                    "user_id": GLOBAL.user_id,
                    "member_name": this.state.name,
                    "member_email": this.state.email,
                    "member_mobile": this.state.mobile,
                    "member_relation": this.state.relation,
                    "member_dob": this.state.dob,
                    "gender": type,


                }),
            }).then((response) => response.json())
                .then((responseJson) => {


                    if (responseJson.status == true) {
                        this.props.navigation.goBack()
                        alert('Member Added Successfully')
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.hideLoading()
                });

        }

    }
    
    login = () => {
        this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (indexs) => {

        this.props.navigation.navigate('BookingAppointmentDetail')

    }
    selectedFirsts = () => {
        var a = this.state.images

        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }

        var index = a[1]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[1] = index
        this.setState({images:this.state.images})

    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>

                {index == 0 && (

                    <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                           source={require('./myself.png')}/>




                )}
                {index != 0 && (

                    <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                           source={require('./add.png')}/>


                )}

                {index == 0 && (
                    <Text style={{fontSize : 14,color :'#0592CC',fontFamily:'Poppins-Regular',textAlign:'center'}}>

                        {item.name}
                    </Text>
                )}

                {index != 0 && (
                    <Text style={{fontSize : 14,color :'rgba(0,0,0,0.5)',fontFamily:'Poppins-Regular',textAlign:'center'}}>

                        {item.name}
                    </Text>
                )}

            </TouchableOpacity>
        )
    }
    render() {

        var speciality =  GLOBAL.speciality

        var radio_props_one = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { mobile } = this.state;
        let { gender } = this.state;
        let { relation } = this.state;
        let { dob } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <KeyboardAwareScrollView>




                        <View style = {{backgroundColor:'white',borderRadius:8,marginLeft:10,width:window.width - 20}}>
                            <View style = {{marginLeft:10}}>
                                <TextField
                                    label= 'Name'
                                    value={name}
                                    onChangeText={ (name) => this.setState({ name }) }
                                    tintColor = {'#0592CC'}
                                />
                                <TextField
                                    label= 'Email'
                                    value={email}
                                    onChangeText={ (email) => this.setState({ email }) }
                                    tintColor = {'#0592CC'}
                                />

                                <TextField
                                    label= 'Mobile'
                                    value={mobile}
                                    keyboardType={'numeric'}
                                    maxLength={10}
                                    onChangeText={ (mobile) => this.setState({ mobile }) }
                                    tintColor = {'#0592CC'}
                                />
                                <TextField
                                    label= 'Relation'
                                    value={relation}
                                    onChangeText={ (relation) => this.setState({ relation }) }
                                    tintColor = {'#0592CC'}
                                />
                                <Text style={{fontSize : 12,color :'rgba(0,0,0,0.5)',fontFamily:'Poppins-Medium',}}>

                                    Gender
                                </Text>

                                <RadioForm style={{ marginTop:12}}
                                           labelStyle={{paddingRight:20}}
                                           radio_props={radio_props_one}
                                           initial={0}
                                           buttonSize={10}
                                           formHorizontal={true}
                                           buttonColor={'#0592CC'}
                                           labelHorizontal={true}
                                           animation={false}
                                           labelColor={'black'}
                                           selectedButtonColor={'#0592CC'}
                                           onPress={(value) => {this.setState({value:value})}}
                                />
                                <TextField
                                    label= 'Date of Birth'
                                    value={dob}
                                    placeholder={'yy-mm-dd'}
                                    onChangeText={ (dob) => this.setState({ dob }) }
                                    tintColor = {'#0592CC'}
                                />



                            </View>
                        </View>

                        <Button
                            style={{padding:7,marginTop:18,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            PROCEED
                        </Button>
                    </KeyboardAwareScrollView>

                </View>
            </SafeAreaView>
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
