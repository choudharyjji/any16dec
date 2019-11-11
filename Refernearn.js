import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Clipboard,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    AsyncStorage,
    Share
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Refernearn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            ref_code:''
        };

    }

    componentWillUnmount() {

    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'REFER AND EARN',
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

_fancyShareMessage=()=>{
        var reefercode = this.state.ref_code
        var a = 'Hey! Checkout Anytimedoc app. ' +'https://play.google.com/store/apps/details?id=com.anytimedoc' +' .Use my referral code ' + reefercode+ ' to get 500 wallet points.'

        Share.share({
                message:a
            },{
                tintColor:'green',
                dialogTitle:'Share this app via....'
            }
        ).then(this._showResult);
    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

copytoclipboard = async () => {
    //To copy the text to clipboard
    await Clipboard.setString(this.state.ref_code);
    alert('Copied to Clipboard!');
  };

    call1 = ()=>{
        const url = GLOBAL.BASE_URL +  'get_profile'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "type":"home_patient"
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
//                alert(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                    this.setState({ref_code: responseJson.refer_code})
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
  //      this.setState({location:GLOBAL.location})
    }



    componentDidMount(){
        this.call1()

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

       <View style={{width : Dimensions.get('window').width,height: Dimensions.get('window').height,backgroundColor:'#F2F5F7'}}>
         <View style={{width : Dimensions.get('window').width,height : Dimensions.get('window').height-250,flexDirection:'column',backgroundColor:'white'}}>
          <Image source={require('./referlogo1.png')}
           style={{ height:135,width:135,alignSelf:'center',borderRadius:3, marginTop:50,resizeMode:'contain'}} />

           <Text style={{fontSize:18,fontFamily:'Poppins-Regular',color:'#575353',alignSelf:'center',marginTop:30}}>Welcome to the Anytimedoc App</Text>
           <Text style={{fontSize:12,fontFamily:'Poppins-Regular',color:'#575353',alignSelf:'center',marginTop:10,marginLeft:15,marginRight:15}}>Get 300 anytimedoc point for each friend that signup and</Text>
           <Text style={{fontSize:12,fontFamily:'Poppins-Regular',color:'#575353',alignSelf:'center'}}>complete a transaction. They get 100 points as well!</Text>

           <Text style={{fontSize:19,alignSelf:'center',fontFamily:'Ubuntu-Regular',marginTop:40,color:'#575353'}}>Share your referral code</Text>

           <Image source={require('./curlview.png')}
            style={{ height:140,width:290,alignSelf:'center',resizeMode:'contain',marginTop:10}}>
            </Image>

           <View style={{borderWidth:1,height:1,borderStyle:'dashed',width:250,borderRadius:1,alignSelf:'center',marginTop:-97,borderColor:'#57535326'}}>
           </View>

           <TouchableOpacity onPress={()=> this.copytoclipboard()}>
           <Text style={{fontSize:19,fontFamily:'Poppins-Regular',color:'#575353',alignSelf:'center',marginTop:10}}>{this.state.ref_code}</Text>
</TouchableOpacity>
           <View style={{borderWidth:1,height:1,borderStyle:'dashed',width:250,borderRadius:1,alignSelf:'center',marginTop:10,borderColor:'#57535326'}}>
           </View>


          </View>

         <Text style={{fontSize:21,fontFamily:'Ubuntu-Regular',marginTop:25,marginLeft:25,color:'#385C8E'}}>Share Via</Text>

         <View style={{flexDirection:'row',marginTop:20,marginLeft:27,alignItems:'center'}}>

         <TouchableOpacity onPress={()=>this._fancyShareMessage()}>
         <Image source={require('./referlogo2.png')}
          style={{ height:60,width:60,resizeMode:'contain'}} />
         </TouchableOpacity>

         <TouchableOpacity onPress={()=>this._fancyShareMessage()}>
          <Image source={require('./referlogo3.png')}
           style={{ height:60,width:60,resizeMode:'contain',marginLeft:33}} />
        </TouchableOpacity>

         <TouchableOpacity onPress={()=>this._fancyShareMessage()}>
          <Image source={require('./referlogo4.png')}
           style={{ height:60,width:60,resizeMode:'contain',marginLeft:33}} />
          </TouchableOpacity>

         <TouchableOpacity onPress={()=>this._fancyShareMessage()}>
          <Image source={require('./referlogo5.png')}
           style={{ height:60,width:60,resizeMode:'contain',marginLeft:33}} />
        </TouchableOpacity>

         </View>

         <TouchableOpacity style={{alignSelf:'center',marginTop:25}}
         onPress={()=> this.props.navigation.goBack()}>
         <Image source={require('./referlogo6.png')}
          style={{ height:50,width:50,resizeMode:'contain'}} />
        </TouchableOpacity>


       </View>

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
