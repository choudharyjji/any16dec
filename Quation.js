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
const GLOBAL = require('./Global');
import Button from 'react-native-button';
const window = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker';

import { TextField } from 'react-native-material-textfield';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type Props = {};

let customDatesStyles = [];
const options = {
    title: 'Select Image',
    maxWidth:300,
    maxHeight:500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Quation extends Component {
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
            value:'',
            avatarSource:'', flag:0
        };

    }

    componentWillUnmount() {

    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'Quotation',
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

    _handlePressd=()=>{
        ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);
 
  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };
    var a = response.uri
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
 
    this.setState({
      avatarSource: a,
    });
    this.setState({flag:1})
  }
});
    }
    _handlePress() {

        if(this.state.name==''){
            alert('Please enter name')
        }else if(this.state.email == ''){
            alert('Please enter email')
        }else if(this.state.mobile ==''){
            alert('Please enter mobile number')
        }else if(this.state.relation==''){
            alert('Please enter problem')
        }else if(this.state.flag==0){
            alert('Please attach image')
        }else{
        const url = GLOBAL.BASE_URL +  'add_quotation'

        let formdata = new FormData();
        formdata.append("user_id", GLOBAL.user_id)
        formdata.append("surgery_id", GLOBAL.sidq)
        formdata.append("name", this.state.name)
        formdata.append("email", this.state.email)
        formdata.append("mobile", this.state.mobile)
        formdata.append("problem", this.state.relation)
        formdata.append("flag", this.state.flag)

        formdata.append('image', {
               uri: this.state.avatarSource,
               type: 'image/jpeg', // or photo.type
               name: 'image.png'
             });
             fetch(url, {
               method: 'post',
               body: formdata,
               headers: {
                   'Content-Type': 'multipart/form-data',
                 }

             }).then((response) => response.json())
                   .then((responseJson) => {
               //this.hideLoading()

//                   alert(JSON.stringify(responseJson))
                    this.props.navigation.goBack()
                    alert('Quotation sent successfully!')


             });
               }

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },


        //     body: JSON.stringify({
        //         "user_id":GLOBAL.user_id,
        //         "surgery_id":GLOBAL.sidq,
        //         "name":this.state.name,
        //         "email":this.state.email,
        //         "mobile":this.state.mobile,
        //         "problem":this.state.relation

        //     }),
        // }).then((response) => response.json())
        //     .then((responseJson) => {


        //         if (responseJson.status == true) {
        //             this.props.navigation.goBack()
        //             alert('Quotation sent successfully!')
        //         }else{
        //             alert(responseJson.msg)
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         this.hideLoading()
        //     });

        }




    




    render() {

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

                <View style={styles.container}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>




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
                                    maxLength={10}
                                    keyboardType={'numeric'}
                                    onChangeText={ (mobile) => this.setState({ mobile }) }
                                    tintColor = {'#0592CC'}
                                />
                                <TextField
                                    label= 'Problem'
                                    value={relation}
                                    onChangeText={ (relation) => this.setState({ relation }) }
                                    tintColor = {'#0592CC'}
                                />

                            </View>

                           <Button
                                style={{padding:7,marginTop:18,fontSize: 20,borderWidth:1,borderColor:"#0592CC",color:"#0592CC",marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4, marginBottom:10}}
                                styleDisabled={{color: 'red'}}
                                onPress={() => this._handlePressd()}>
                                ATTACH IMAGE / REPORT
                            </Button>


                            {this.state.avatarSource!='' && (
                                <Image style={{width:100, height:100,marginBottom:10, marginLeft:10}}
                                source={{uri : this.state.avatarSource}}/>
                            )}
                        </View>

                        <Button
                            style={{padding:7,marginTop:18,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            PROCEED
                        </Button>
                    </KeyboardAwareScrollView>

                </View>

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
