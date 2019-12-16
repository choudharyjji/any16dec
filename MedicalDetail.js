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
    TouchableHighlight,
    Linking,
    FlatList,
    Dimensions, Platform, AsyncStorage,


} from 'react-native';
import moment from 'moment';
import CalendarStrip from "react-native-calendar-strip";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const GLOBAL = require('./Global');
import React, {Component} from 'react';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import HTML from 'react-native-render-html';
import DateTimePicker from '@react-native-community/datetimepicker';
;
let customDatesStyles = [];
import Carousel from 'react-native-banner-carousel';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 250;

class MedicalDetail extends React.Component {
    state = {
        date: new Date('2020-06-12T14:42:42'),
        mode: 'date',
        show: false,
        type:'',
        value: 0,
        forType:'',
        radio_props: [
            {label: 'For Week', value:0},
            {label: 'For Month', value:1},

        ],
        banner:[],
    }


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight:  <TouchableOpacity onPress={() =>params.handleSave()
            }>
                <Image source={require('./cartlogo.png')}
                       style={{ height:30,width:30,resizeMode:'contain',marginRight:10}} />
            </TouchableOpacity>,
            //   header: () => null,
            title: 'EQUIPMENT',
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
    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight, resizeMode:'contain' }} source={{ uri: image }}/>
            </View>
        );
    }

    _saveDetails=()=> {
//        Alert.alert('clicked save');
        this.props.navigation.replace('EquipmentCart')
    }
componentDidMount(){
    this.props.navigation.setParams({ handleSave: this._saveDetails });
//        alert(JSON.stringify(GLOBAL.medicalEquipment))
    let startDate = moment();
    for (let i=0; i<700; i++) {
        customDatesStyles.push({
            startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
            dateNameStyle: styles.dateNameStyle,
            dateNumberStyle: styles.dateNumberStyle,

            // Random color...
            dateContainerStyle: {shadowOpacity: 1.0,
                shadowRadius: 1,
                shadowColor: 'black',
                shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' },
        });
    }
    var date = new Date()
    var s = moment(date).format('YYYY-MM-DD')

    var my = [];
    {GLOBAL.medicalEquipment.gallery.map((message) =>
        my.push(GLOBAL.imagePath + message.image)

    )
    }
    this.setState({banner:my})
    this.setState({type:my.for_month_week})
    this.setState({forType:GLOBAL.medicalEquipment.for})
    if (GLOBAL.medicalEquipment.for != "Purchase"){
        if(GLOBAL.medicalEquipment.for_month_week == "3"){

        }
        else if (GLOBAL.medicalEquipment.for_month_week == "2"){

         var  radio_props = [
                {label: 'For Month', value:1},


            ]
            this.setState({
                radio_props:radio_props
            })

        }
        else if (GLOBAL.medicalEquipment.for_month_week == "1"){
            var  radio_props = [
                {label: 'For Week', value:0},


            ]
            this.setState({
                radio_props:radio_props
            })

        }

    }
}







    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    login = (discounts) => {

        if (this.state.forType == "Rental"){
            var a = '';
            if (this.state.value == 0) {
                a = "Week"
            }else {
                a = "Month"
            }

            const url = GLOBAL.BASE_URL + 'add_to_cart_equipment'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: GLOBAL.medicalEquipment.id,
                    user_id: GLOBAL.user_id,
                    for: a,
                    equipment_type: 'Rental',
                    quantity: '1',
                    order_price: discounts.toString(),
                    start_date: GLOBAL.date

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                  //  alert(JSON.stringify(responseJson))


                    if (responseJson.status == true) {
                        this.props.navigation.replace('EquipmentCart')
                        alert('Equipment added to Cart Successfully!')

                    } else {
                        alert('Equipment already in cart')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });



    }else {


            const url = GLOBAL.BASE_URL + 'add_to_cart_equipment'

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: GLOBAL.medicalEquipment.id,
                    user_id: GLOBAL.user_id,
                    for: '',
                    equipment_type: 'Purchase',
                    quantity: '1',
                    order_price: discounts.toString(),
                    start_date: ''

                }),
            }).then((response) => response.json())
                .then((responseJson) => {



                    if (responseJson.status == true) {
                        this.props.navigation.replace('EquipmentCart')

                    } else {
                        alert('Equipment already in cart')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }


    }
    dates = (date)=>{
        var t = new Date( date );
        var s = moment(t).format('YYYY-MM-DD')
        GLOBAL.date = s

    }

    render(){

        var disc = parseInt(GLOBAL.medicalEquipment.rent_price)
        var discp = parseInt(GLOBAL.medicalEquipment.rent_discount)
        var discount = disc - discp

        var discs = parseInt(GLOBAL.medicalEquipment.purchase_price)
        var discps = parseInt(GLOBAL.medicalEquipment.purchase_discount)
        var discounts = discs - discps
        var s= "";

        if  (GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_discount == "0.00" ){
            s = GLOBAL.medicalEquipment.rent_price
        }

        if  (GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_discount != "0.00" ){
            s = GLOBAL.medicalEquipment.rent_discount

        }

        if  (GLOBAL.medicalEquipment.for == "Purchase" && GLOBAL.medicalEquipment.purchase_discount == "0.00" ){
            s = GLOBAL.medicalEquipment.purchase_price

        }

        if  (GLOBAL.medicalEquipment.for == "Purchase" && GLOBAL.medicalEquipment.purchase_discount != "0.00" ){
            s = GLOBAL.medicalEquipment.purchase_discount
        }

        const { show, date, mode } = this.state;

        return(
            <ScrollView>


                    <View style={{flex:1,backgroundColor:'transparent',flexDirection:'column'}}>


                        <Carousel
                            autoplay
                            autoplayTimeout={5000}
                            loop
                            index={0}
                            pageSize={BannerWidth}>
                            {this.state.banner.map((image, index) => this.renderPage(image, index))}
                        </Carousel>

                        <View style={{height:200,width:'100%',backgroundColor:'white',flexDirection:'column',elevation:2}}>
                            <Text style={{fontSize:19,fontFamily:'Poppins-Medium',color:'#000000',marginTop:15,marginLeft:15}}>{GLOBAL.medicalEquipment.name}</Text>
                            <View style={{flexDirection:'row',marginLeft:25,alignItems:'center'}}>
                                <Image source={require('./moneylogo.png')}
                                       style={{ height:40,width:40,resizeMode:'contain',marginTop:17}} />

                                <View style={{flexDirection:'column',marginLeft:22,marginTop:15}}>

                                    {GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_discount == "0.00" && (
                                        <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'black',textAlign:'center',width:window.width/2.2 - 8}}>
                                            Rs. {GLOBAL.medicalEquipment.rent_price}

                                        </Text>

                                    ) }


                                    {GLOBAL.medicalEquipment.for == "Rental" && GLOBAL.medicalEquipment.rent_discount != "0.00" && (
                                        <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'black'}}>
                                            Rs. {GLOBAL.medicalEquipment.rent_discount}

                                        </Text>

                                    ) }



                                    {GLOBAL.medicalEquipment.for == "Purchase" && GLOBAL.medicalEquipment.purchase_discount == "0.00" && (
                                        <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'black'}}>
                                            Rs. {GLOBAL.medicalEquipment.purchase_price}

                                        </Text>

                                    ) }


                                    {GLOBAL.medicalEquipment.for == "Purchase" && GLOBAL.medicalEquipment.purchase_discount != "0.00" && (
                                        <Text style = {{fontSize:15,margin:1,fontFamily:'Poppins-Medium',color:'black'}}>
                                            Rs. {GLOBAL.medicalEquipment.purchase_discount}

                                        </Text>

                                    ) }



                                    <Text style={{fontSize:12,fontFamily:'Poppins-Regular',color:'#989696'}}>All prices inclusive of taxes, delivery and setup</Text>
                                </View>

                            </View>


                            {GLOBAL.rentPurchase=='Rental' && (
                                <View style={{flexDirection:'row',marginLeft:22,alignItems:'center'}}>
                                    <Image source={require('./trucklogo.png')}
                                           style={{ height:48,width:48,resizeMode:'contain',marginTop:20}} />

                                    <View style={{flexDirection:'column',marginLeft:18,marginTop:18}}>
                                        <Text style={{fontSize:13,fontFamily:'Poppins-Regular',color:'#989696'}}>Free shipping and setup by</Text>
                                        <Text style={{fontSize:20,fontFamily:'Poppins-Medium',color:'#000000'}}>{GLOBAL.shipTime} hours</Text>
                                    </View>

                                </View>


                            )}



                        </View>




                        <View style={{height:30,width:'100%',backgroundColor:'#F5F5F5',flexDirection:'column'}}>
                        </View>

                        <View style={{width:'100%',backgroundColor:'white',flexDirection:'column',elevation:2}}>
                            <Text style={{fontSize:19,fontFamily:'Poppins-Medium',color:'#000000',marginLeft:15,marginTop:15}}>Product Description</Text>


                            <View style = {{margin:10, width:'100%', backgroundColor:'white', flexDirection:'column'}}>
                                <HTML html={GLOBAL.medicalEquipment.description} imagesMaxWidth={Dimensions.get('window').width} />
                            </View>
                            {this.state.forType != "Purchase" &&  (
                                <View style = {{margin :5}}>
                                    <Text style={{fontSize:19,fontFamily:'Poppins-Medium',color:'#000000',marginLeft:15,marginTop:15}}>Booked For</Text>
                                    <RadioForm
                                        radio_props={this.state.radio_props}
                                        initial={0}
                                        onPress={(value) => {this.setState({value:value})}}>
                                        <RadioButtonInput
                                            borderWidth={1}
                                            buttonInnerColor={'#0592CC'}
                                            buttonOuterColor={'#0592CC'}
                                            buttonWrapStyle={{marginLeft:5}}

                                        />
                                        <RadioButtonLabel

                                            labelStyle={{fontSize:16,fontFamily:'Poppins-Medium',color: '#2ecc71'}}

                                        />
                                    </RadioForm>
                                </View>
                            )}



                            {this.state.forType != "Purchase" && (
                            <CalendarStrip

                                calendarAnimation={{type: 'sequence', duration: 30}}
                                daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#80D8CF'}}
                                style={{height:120, paddingTop: 15}}
                                calendarHeaderStyle={{color: 'black'}}
                                calendarColor={'white'}
                                highlightDateNameStyle={{color:'white'}}
                                highlightDateNumberStyle  ={{color:'white'}}


                                customDatesStyles={customDatesStyles}
                                dateContainerStyle = {{shadowOpacity: 1.0,
                                    shadowRadius: 1,
                                    shadowColor: 'black',
                                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' }}

                                iconContainer={{flex: 0.1}}
                                onDateSelected={(date)=> this.dates(date)}
                            />

                            )}

                        </View>


                        <View style={{height:340,width:'100%',backgroundColor:'#F5F5F5',flexDirection:'column'}}>
                        </View>


                        <View style={{flexDirection:'row',height:80,width:'100%',position:'absolute',bottom:0,left:0,right:0,backgroundColor:'white',alignItems:'center',elevation:2}}>
                            {this.state.forType == "Purchase" && (
                                <Text style={{fontSize:23,fontFamily:'Poppins-Regular',color:'#000000',marginLeft:25,width:'50%'}}>₹{s}</Text>
                            )}

                            {this.state.forType != "Purchase" && (
                                <Text style={{fontSize:23,fontFamily:'Poppins-Regular',color:'#000000',marginLeft:25,width:'50%'}}>₹{s}</Text>
                            )}
                            {GLOBAL.medicalEquipment.add_in_cart_status == 1 && (
                                <Button style={{fontSize:17,color:'white',fontFamily:'Poppins-Regular'}}
                                        onPress={() => this.props.navigation.replace('EquipmentCart')}
                                        containerStyle={{height:45,width:135,borderRadius:6,elevation:1,justifyContent:'center',backgroundColor:'#0592CC'}}>
                                    GO to cart

                                </Button>
                            )}
                            {GLOBAL.medicalEquipment.add_in_cart_status == 0 && this.state.forType == "Purchase" && (
                            <Button style={{fontSize:17,color:'white',fontFamily:'Poppins-Regular'}}
                                    onPress={() => this.login(discounts)}
                                    containerStyle={{height:45,width:135,borderRadius:6,elevation:1,justifyContent:'center',backgroundColor:'#0592CC'}}>
                                Add to cart

                            </Button>
                            ) }

                            {GLOBAL.medicalEquipment.add_in_cart_status == 0 && this.state.forType == "Rental" && (
                                <Button style={{fontSize:17,color:'white',fontFamily:'Poppins-Regular'}}
                                        onPress={() => this.login(s)}
                                        containerStyle={{height:45,width:135,borderRadius:6,elevation:1,justifyContent:'center',backgroundColor:'#0592CC'}}>
                                    Add to cart

                                </Button>
                            ) }
                        </View>




                    </View>

            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',
        height: window.height,
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
})
export default MedicalDetail;