import React, {Component} from 'react';
import { StyleSheet,Text,TextInput, View,Image ,Alert,ScrollView,FlatList,Dimensions ,TouchableOpacity,TouchableNativeFeedback,ActivityIndicator,Linking} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
let textRef = React.createRef();
let menuRef = null;
const GLOBAL = require('./Global');
//import Geolocation from '@react-native-community/geolocation';
type Props = {};
import moment from 'moment';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;

import Carousel from 'react-native-banner-carousel';
import VideoPlayer from 'react-native-video-controls';

var length = 0;
var commonHtml = "";

var booking_type ='';

export default class Home extends Component {



    state = {
        text: '',
        currentLongitude: 'unknown',//Initial Longitude
        currentLatitude: 'unknown',
        username: '',
        password: '',
        status :'',
        ipAdd : '',
        loading:'',
        marker :[],
        statuss :'',
        isok:0,
        detail:'',
        package :[],
        speciality:[],
        banner:[],
        call:'',
        articles:[],
        location:'',
        moviesList :[
            {

                title :'Doctor@Doorstep',
                image:require('./doorstep.png')
            },


            {

                title :'Nursing care@ Home',
                image:require('./nurse.png')
            },

            {

                title :'Medical Services @ Doorstep',
                image:require('./medical.png')
            },

            {

                title :'24x7 Online Consultation',
                image:require('./online-consultation.png')
            },

            {

                title :'Doctor Appointment @ Clinic',
                image:require('./appointment.png')
            },
            {

                title :'Hospital Admissions',
                image:require('./hospital.png')
            },
            {

                title :'Ambulance Booking',
                image:require('./ambulance.png')
            },
            {

                title :'Lab Test Booking',
                image:require('./lab-test.png')
            },
            {

                title :'Medical Equipments',
                image:require('./medical.png')
            },
            {

                title :'OPD Health Plans',
                image:require('./health.png')
            },

            {

                title :'Health Packages',
                image:require('./packages.png')
            },
            {

                title :'Best Surgical Packages',
                image:require('./surgical.png')
            },
            {
                title :'Pharmacy',
                image:require('./health.png')
            },


        ],

        results: [],
        selected:[],
        name :'',

    };

    static navigationOptions = ({ navigation }) => {
        return {
              header: () => null,

        }
    }

    hideLoading() {
        this.setState({loading: false})
    }
    getRespone = (res) => {
//        alert(JSON.stringify(res.user_detail))
        GLOBAL.user_details = res.user_detail
        GLOBAL.another = res.doctor_id,
        GLOBAL.anothername = res.doctor_name
        GLOBAL.referal = res.user_detail.referral_code
        GLOBAL.bookingid = res.chat_g_id
        GLOBAL.mybookingid = res.booking_id
        GLOBAL.emergency_number = res.emergency_number
        booking_type = res.booking_type

        this.setState({isok:res.is_booking})
        this.setState({call:res.emergency_number})
        this.setState({speciality:res.specialty})
        this.setState({banner:res.banners})
        this.setState({articles:res.articles})
        this.setState({package:res.package})

    }

    call1 = ()=>{
        const url = GLOBAL.BASE_URL +  'get_check_chat_flag'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id":GLOBAL.user_id
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
              //  alert(JSON.stringify(responseJson))
             //   this.call1()
                if (responseJson.status == true) {
                        this.setState({detail:responseJson.detail})
                        GLOBAL.bookingflag = responseJson.list.flag;
                    GLOBAL.bookingid = responseJson.list.g_booking_id
                    GLOBAL.another = responseJson.list.doctor_id
                    GLOBAL.bookingstatus = responseJson.list.booking_status
                    this.setState({statuss:"0"})
                    if (GLOBAL.bookingflag == "1"){
                        this.setState({statuss:"1"})
                    }
                }else{
//                    this.call1()
                    this.setState({statuss:"0"})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
  //      this.setState({location:GLOBAL.location})
    }
    _handleStateChange = state =>{
//        alert(GLOBAL.user_id)
        Geolocation.getCurrentPosition(
            (position) => {
                this.getlog(position)

                //  alert(JSON.stringify(position))
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        length = 500
        GLOBAL.time=''
        GLOBAL.date=''
        GLOBAL.selectedAddress=[]

        const url = GLOBAL.BASE_URL +  'home_patient'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "type":"home_patient",
                "user_id":GLOBAL.user_id,




            }),
        }).then((response) => response.json())
            .then((responseJson) => {
            //    alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
                    this.getRespone(responseJson)
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });






        this.setState({location:GLOBAL.location})
    }





    renderPage(image, index) {
//        alert(image)
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight ,resizeMode:'stretch'}} source={{ uri: image }} />
            </View>
        );
    }


    showLoading() {
        this.setState({loading: true})
    }

    getlog = (position)=>{
        var s = position.coords.latitude
        var e = position.coords.longitude
        GLOBAL.lat = s.toString()
        GLOBAL.long = e.toString()

        const url =  GLOBAL.BASE_URL  + 'lat_long_address'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "latitude": GLOBAL.lat,
                "longitude":GLOBAL.long,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true) {
                    this.setState({location:responseJson.address})
                    GLOBAL.location = responseJson.address
                    GLOBAL.currLoc = responseJson.address

                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    componentDidMount(){
//        setInterval(() => alert('hi'), 1000)

        var s = moment().format('YYYY-MM-DD')
        GLOBAL.date = s
        GLOBAL.time=''
        GLOBAL.selectedAddress=[]

        this.showLoading()

        this.timeoutCheck = setTimeout(() => {
            this.loadHome()
                    this.hideLoading()

   }, 1000);
           this.props.navigation.addListener('willFocus', this._handleStateChange);

    }


    loadHome=()=>{
                Geolocation.getCurrentPosition(
            (position) => {
                this.getlog(position)

//               alert(JSON.stringify(position))
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

        length = 500
        {this.setState({location:GLOBAL.location})}

    }





    selectedFirst123 = (item) =>{
        GLOBAL.lab = item
        this.props.navigation.navigate('PackageMember')
      //  alert(JSON.stringify(item))
    }

    renderRowItem3=({item}) => {
//        alert(JSON.stringify(item))

        // var test_included = item.test_included
         var s = "";
        // if (test_included.length == 1){
        //     s = test_included[0]
        // }else {
        //     s = test_included.join(",")
        // }
        return(
            <TouchableNativeFeedback 
            style={{width:Dimensions.get('window').width-20, height:'auto'}}onPress={() => this.selectedFirst123(item)
            }>

                <View style={{backgroundColor:'white',color :'white',flexDirection:'column' ,margin: 10,borderRadius :6,width : Dimensions.get('window').width-20, shadowColor: '#D3D3D3',
                    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2,elevation: 5, height:'auto'}}>
                    <View style={{flexDirection: 'row', marginTop:6}}>
                        <Text style={{color:'black', fontSize:15,marginLeft:5,fontFamily:'Poppins-Medium',alignItems:'flex-start'}}>{item.package_name}</Text>

                    </View>

                    <View style={{flexDirection:'column', marginTop:5}}>
                        <View style={{flexDirection:'row', marginTop:5}}>
                            <Text style={{color:'#808080', fontSize:13,fontFamily:'Poppins-Regular',marginLeft:5}}>
                                Includes
                            </Text>
                            <Text style={{color:'black',fontSize:13,fontFamily:'Poppins-Medium',marginLeft:3}}>{item.includes} Tests</Text>
                        </View>
                        <Text style={{color:'#808080',fontFamily:'Poppins-Regular',fontSize:15,marginTop:3,marginLeft:5}}
                        maxLines={2}>{item.include_string}</Text>
                    </View>


                    <View style={{flexDirection:'row',marginTop:8}}>
                        <Button style={{fontSize:12,color:'black',fontFamily:'Poppins-Regular',marginRight:5}}
                                containerStyle={{height:25,width:183,backgroundColor:'white',overflow:'hidden',marginLeft:5,borderRadius:3,borderWidth:1,borderColor:'#D3D3D3',justifyContent:'center'}}
                                disabled={true}>
                            <Text style={{fontSize:12,color:'#808080',fontFamily:'Poppins-Regular',marginLeft:3}}>Recomended for:</Text>
                            {item.recommed_for}
                        </Button>

                        <Button style={{fontSize:12,color:'black',fontFamily:'Poppins-Regular',marginRight:40}}
                                containerStyle={{height:25,width:122,backgroundColor:'white',overflow:'hidden',marginLeft:9,borderRadius:3,borderWidth:1,borderColor:'#D3D3D3',justifyContent:'center'}}
                                disabled={true}>
                            <Text style={{fontSize:12,color:'#808080',fontFamily:'Poppins-Regular',marginLeft:3}}>Age group:</Text>
                            {item.age_group}yrs.
                        </Button>

                    </View>


                    <View style={{flexDirection:'row',marginTop:10,width:'100%',marginBottom:20}}>
                        <View style = {{flexDirection:'row',width:'50%'}}>

                            {item.discount_price != "0.00" && (

                                <Text style={{fontSize:15,color:'#FF2D00',textDecorationLine:'line-through',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹{item.base_price}/-</Text>

                            )}
                            {item.discount_price != "0.00" && (

                                <Text style={{fontSize:15,color:'black',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹{item.discount_price}/-</Text>

                            )}

                            {item.discount_price == "0.00" && (

                                <Text style={{fontSize:15,color:'#FF2D00',marginLeft:5,fontFamily:'Poppins-Medium'}}>₹{item.base_price}/-</Text>

                            )}
                            {item.discount_price == "0.00" && (

                                <Text style={{fontSize:15,color:'#FF2D00',textDecorationLine:'line-through',marginLeft:5,fontFamily:'Poppins-Medium'}}></Text>

                            )}


                    </View>

                    </View>



                </View>
            </TouchableNativeFeedback>

        );
    }
    setMenuRef = ref => menuRef = ref;
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }


    selectedFirst = (index) =>{
        GLOBAL.date=''
        GLOBAL.time=''
        GLOBAL.selectedAddress=[]
        GLOBAL.price=''
        if (index == 0){
            this.props.navigation.navigate('DoctorVisit')
        }else if (index == 1){
            this.props.navigation.navigate('Nurse')
        }else if (index == 2){
            this.props.navigation.navigate('MedicalService')
        }else if (index == 3){
            this.props.navigation.navigate('BookingAppointment')
        }else if (index == 4){
            this.props.navigation.navigate('OfflineBooking')
        }else if (index == 5){
            this.props.navigation.navigate('Insurance')
        }else if (index == 6){
            this.props.navigation.navigate('AmbulanceBooking')
        }else if (index == 7){
            this.props.navigation.navigate('Labtest')
        }else if(index == 8){
            this.props.navigation.navigate('PurchaseType')            
        }
        else if (index == 9){
    this.props.navigation.navigate('OpdHealth')
}else if (index == 10){
            this.props.navigation.navigate('HealthPackege')
        }
        else if (index == 11){
            this.props.navigation.navigate('SurgicalPackage')
        }else if (index == 12){
            this.props.navigation.navigate('Pharmacy')
        }
    }
    selectedFirst1 = (itemData) => {
        GLOBAL.artdesc= itemData.item
 //       alert(JSON.stringify(itemData.item))
        this.props.navigation.navigate('ArticleDescription')
    }
    selectedFirstsd = (item) => {
        GLOBAL.searchSpeciality = item
        this.props.navigation.navigate('SearchSpeciality')
    //  this.props.navigation.navigate('ArticleDescription')
}
    renderRowItem2s = (itemData) => {


        return (
            <TouchableOpacity onPress={() => this.selectedFirst1(itemData)
            }>

                <View   style  = {{width:window.width/2.2 - 8,margin:4, height:'auto',backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
                >




                    <Image source={{uri :itemData.item.image}}
                           style  = {{width:window.width/2.2 - 8, height:150,marginTop: 3,alignSelf:'center',marginLeft:5,
                           }}

                    />

                    <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'#0592CC',textAlign:'center',width:window.width/2.2 - 8}}>
                        {itemData.item.title}

                    </Text>

                </View>
            </TouchableOpacity>

        )
    }

    renderRowItem2 = (itemData) => {


        return (
            <TouchableOpacity onPress={() => this.selectedFirstsd(itemData.item.title)
            }>
                <View   style  = {{width:window.width/2.2 - 8,margin:4, height:200,backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                }}
                >




                    <Image source={{uri :itemData.item.image}}
                           style  = {{width:window.width/2.2 - 8, height:150,marginTop: 3,alignSelf:'center',marginLeft:5,
                           }}

                    />

                    <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'#0592CC',textAlign:'center',width:window.width/2.2 - 8}}>
                        {itemData.item.title}

                    </Text>

                </View>
            </TouchableOpacity>

        )
    }

    renderRowItem1 = (itemData) => {
        return (
            <TouchableNativeFeedback onPress={() => this.selectedFirst(itemData.index)
            }>
                <View   style  = {{width:'31.5%',margin:4, height:105,backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,elevation:5
                }}
                >




                    <Image source={itemData.item.image}
                           style  = {{width:45, height:45,marginTop: 3,alignSelf:'center',marginLeft:5,resizeMode:'contain'
                           }}

                    />

                    <Text style = {{fontSize:12,margin:1,fontFamily:'Poppins-Medium',color:'black',textAlign:'center'}}>
                        {itemData.item.title}

                    </Text>

                </View>
            </TouchableNativeFeedback>

        )
    }

    calls = () =>{
        var phoneNumber = `tel:${this.state.call}`;
          Linking.openURL(phoneNumber);
    }


call = () =>{
       var phoneNumber = `tel:${this.state.call}`;
      //  Linking.openURL(phoneNumber);
        if (booking_type == "chat"){
            this.props.navigation.navigate('Chat')
        }else {
            this.props.navigation.navigate("VideoCall", {
                channelName: GLOBAL.bookingid,
                onCancel: (message) => {
                    this.setState({
                        visible: true,
                        message
                    });
                }
            })
        }


    }

        render() {


        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#0592CC' />
                </View>
            )
        }
        return (

                <View style={styles.container}>

                    <View style = {{flexDirection:'row',width:'100%',marginTop: 10,marginBottom: 20, justifyContent:'space-between'}}>

                        <TouchableOpacity onPress={() =>this.props.navigation.toggleDrawer()}>
                        <Image source={require('./drawer.png')}
                               style  = {{width:30, height:30,marginLeft:10,resizeMode:'contain'
                               }}

                        />
                        </TouchableOpacity>


                        <TouchableOpacity style = {{width:'60%',marginLeft:10}} onPress={() => this.props.navigation.navigate('Location')
                        }>
                        <Text style = {{color:'black',fontFamily:'Poppins-Regular',fontSize:12,width:200,height:40}}
                        numberOfLines={2}>
                            {this.state.location}

                        </Text>
                        </TouchableOpacity>
                        <View style = {{flexDirection:'row',width:'22%'}}>
                        {this.state.isok==1 &&(
                          <TouchableOpacity onPress={() => this.call()
                            }>
                            <Image source={require('./call.png')}
                                   style  = {{width:25, height:25,marginLeft:10,resizeMode:'contain'
                                   }}

                            />
                            </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')
                            }>
                            <Image source={require('./search.png')}
                                   style  = {{width:25, height:25,resizeMode:'contain'
                                   }}

                            />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.calls()
                            }>
                            <Image source={require('./call.png')}
                                   style  = {{width:25, height:25,marginLeft:20,resizeMode:'contain'
                                   }}

                            />
                            </TouchableOpacity>

                        </View>
                    </View>
 {this.state.statuss == "1" && (
                        <TouchableOpacity onPress = {()=> this.props.navigation.navigate('Chat')}>

                            <View style = {{width:window.width,height:50,backgroundColor:'black'}}>
                                <Text style = {{alignSelf:'center',marginTop:8,color:'white'}}>
                                    Your Booking Start on {this.state.detail}

                                </Text>


                            </View>
                        </TouchableOpacity>
                    )}


                    <ScrollView keyboardShouldPersistTaps='always'>

                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        showsPageIndicator={false}
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {this.state.banner.map((image, index) => this.renderPage(image, index))}
                    </Carousel>

                    <FlatList style = {{marginLeft:5,width:window.width - 10}}
                              data={this.state.moviesList}
                              numColumns={3}

                              keyExtractor={this._keyExtractor}
                              renderItem={this.renderRowItem1}
                              extraData={this.state}
                    />

                        <View style = {{flexDirection:'row',width:'100%'}}>
                            <Text style= {{color:'black',fontSize:20,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,width:'70%'}}>

                                Specialities

                            </Text>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Speciality')
                            }>

                                <Text style= {{color:'#0592CC',fontSize:14,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,alignSelf:'flex-end',marginRight:20}}>

                                    View All

                                </Text>
                            </TouchableOpacity>


                        </View>

                        <View style = {{marginLeft:15,backgroundColor:'#0592CC',height:2,width:20}}>

                        </View>

                        <FlatList style = {{marginLeft:5,width:window.width - 10}}
                                  data={this.state.speciality}
                                  horizontal={true}

                                  keyExtractor={this._keyExtractor}
                                  renderItem={this.renderRowItem2}
                                  extraData={this.state}
                        />
                        <View style = {{flexDirection:'row',width:'100%'}}>
                            <Text style= {{color:'black',fontSize:20,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,width:'70%'}}>

                                Packages

                            </Text>


                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('HealthPackege')}>
                            <Text style= {{color:'#0592CC',fontSize:14,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,alignSelf:'flex-end',marginRight:20}}>

                                View All

                            </Text>
                            </TouchableOpacity>

                        </View>

                        <View style = {{marginLeft:15,backgroundColor:'#0592CC',height:2,width:20}}>

                        </View>

                        <FlatList style = {{marginLeft:5,width:window.width - 10}}
                                  data={this.state.package}
                                  horizontal={true}

                                  keyExtractor={this._keyExtractor}
                                  renderItem={this.renderRowItem3}
                                  extraData={this.state}
                        />
                        <View style = {{flexDirection:'row',width:'100%'}}>
                            <Text style= {{color:'black',fontSize:20,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,width:'70%'}}>

                                Articles

                            </Text>



                            <Text style= {{color:'#0592CC',fontSize:14,fontFamily:'Poppins-Regular',marginLeft:15,marginTop:15,alignSelf:'flex-end',marginRight:20}}>

                            </Text>


                        </View>

                        <View style = {{marginLeft:15,backgroundColor:'#0592CC',height:2,width:20}}>

                        </View>
                        <FlatList style = {{marginLeft:5,width:window.width - 10}}
                                  data={this.state.articles}
                                  horizontal={true}

                                  keyExtractor={this._keyExtractor}
                                  renderItem={this.renderRowItem2s}
                                  extraData={this.state}
                        />

                        <View style = {{height:10}}>

                        </View>
    </ScrollView>



                </View>


        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'#f7f8f9'
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
    }
})