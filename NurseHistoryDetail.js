import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    TextInput,
    Image,
    ImageBackground,
    Linking,
    FlatList,
    Dimensions,
    ActivityIndicator,


} from 'react-native';


import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');


class NurseHistoryDetail extends React.Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,results:[],
        visible:false,a_details:''
    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'NURSE DETAILS',
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
        this.showLoading()
        this.timeoutCheck = setTimeout(() => {
            this.setState({a_details: GLOBAL.appointment_details})
            this.hideLoading()

        }, 1000);
    }

    confirmCancel=()=>{
        this.showLoading()
        const url = GLOBAL.BASE_URL + 'cancel_appointment'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "booking_id": GLOBAL.appointment_details.booking_id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.hideLoading()
//                alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    alert('Appointment cancelled successfully!')
//                    this.loadAppointments()


                } else {
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    onPressCancel=(item, index)=>{
        Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to cancel this appointment?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => this.confirmCancel(item,index)
                }
            ],
            {
                cancelable: false
            }
        );
        return true;
    }


    getDirections=()=>{
        var lat= GLOBAL.appointment_details.doctor_lat
        var lot= GLOBAL.appointment_details.doctor_long

        var url = `https://www.google.com/maps?saddr=My+Location&daddr=`+lat+','+lot;
//    alert(url)
        Linking.openURL(url);


    }

    clickResc=()=>{

        this.props.navigation.navigate('AppointmentResc')
    }

    render() {
        var yeah =  GLOBAL.nurseDetail

        if(this.state.loading){
            return(
                <View style={{
                    flex:1,
                    backgroundColor :'#f1f1f1'

                }}>
                    <ActivityIndicator style = {{
                        position: 'absolute',
                        left: window.width/2 - 30,

                        top: window.height/2,

                        opacity: 0.5,

                        justifyContent: 'center',
                        alignItems: 'center'
                    }}

                                       size="large" color='#006FA5' />
                </View>
            )
        }

        return(
            <ScrollView>

                <View style={{width : Dimensions.get('window').width,height: Dimensions.get('window').height, flexDirection:'column'}}>

                    <View style={{flexDirection:'row',marginLeft:20,marginTop:15,alignItems:'center'}}>


                        <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'#2D2D32',marginLeft:10}}>{yeah.name}</Text>

                    </View>

                    <View style={{borderBottomWidth:1,width:'100%',borderBottomColor:'#0000001A',marginTop:20}}>
                    </View>

                    <Text style={{fontSize:15,fontFamily:'Poppins-Regular',color:'#757585',marginLeft:20,marginTop:20}}>Date and Day</Text>
                    <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'#2D2D32',marginLeft:20,marginTop:10}}>{yeah.booking_date}, {yeah.days}</Text>


                    {yeah.cancel_power == 0 && (
                        <Text style={{height:1}}></Text>
                    )}
                    {yeah.cancel_power != 0 && (
                        <View style={{flexDirection:'row',marginLeft:20,marginTop:17,alignItems:'center'}}>




                            <Button style={{fontSize:18,color:'#FF2D00',fontFamily:'Poppins-Medium'}}
                                    containerStyle={{marginLeft:25,backgroundColor:'white'}}
                                    onPress={()=> this.onPressCancel()}>
                                CANCEL
                            </Button>

                        </View>

                    )}

                    <View style={{borderBottomWidth:1,width:'100%',borderBottomColor:'#0000001A',marginTop:20}}>
                    </View>

                    <Text style={{fontSize:15,fontFamily:'Poppins-Regular',color:'#757585',marginLeft:20,marginTop:20}}>Address</Text>
                    <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'#2D2D32',marginLeft:20,marginTop:10}}>{yeah.address}</Text>
                    {/*        <Text style={{fontSize:15,fontFamily:'Poppins-Regular',color:'#27272D',marginLeft:20,marginTop:6}}>19, Maurya Enclave, Poorvi Pitampura</Text>
*/}
                    <View style={{flexDirection:'row',marginLeft:20,marginTop:17,alignItems:'center'}}>

                        {yeah.cancel_power == 0 && (
                            <Text style={{height:1}}></Text>
                        )}


                    </View>

                    <View style={{borderBottomWidth:1,width:'100%',borderBottomColor:'#0000001A',marginTop:20}}>
                    </View>

                    <Text style={{fontSize:15,fontFamily:'Poppins-Regular',color:'#757585',marginLeft:20,marginTop:20}}>Service</Text>
                    <Text style={{fontSize:18,fontFamily:'Poppins-Regular',color:'#2D2D32',marginLeft:20,marginTop:10}}>{yeah.service_name}</Text>

                    <View style={{borderBottomWidth:1,width:'100%',borderBottomColor:'#0000001A',marginTop:20}}>
                    </View>



                    {yeah.current_nurse != '' && (
                        <View>
                        <Text style={{fontSize:15,fontFamily:'Poppins-Regular',color:'#757585',marginLeft:20,marginTop:20}}>Current Nurse</Text>
                        <Text style={{fontSize:18,fontFamily:'Poppins-Regular',color:'#2D2D32',marginLeft:20,marginTop:10}}>{yeah.current_nurse.name}</Text>
                        </View>

                    )}

                </View>

            </ScrollView>
        );
    }
}

export default NurseHistoryDetail;