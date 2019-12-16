import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Platform,
    TextInput,
    View,
    Image,
    Alert,
    AsyncStorage,
    Dimensions,
    TouchableOpacity,

    ActivityIndicator,
    FlatList
} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import Button from 'react-native-button';
import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Select Avatar',
    maxWidth : 500,
    maxHeight : 500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
import DateTimePicker from '@react-native-community/datetimepicker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
type Props = {};
export default class EditProfile extends Component {
    state = {
        text: '',
        passwordtext :'',
        isSecure : true,
        username: '',
        city:'',
        address:'',
        password: '',
        status :'',
        ipAdd : '',
        name:'',
        description:'',

        newsHeading :[],
        loading:'',
        states:'',
        results: [],
        avatarSource:'',
        image :'',username:'', date:new Date('2020-06-12T14:42:42'),
    mode: 'date',
    show: false,

    };


    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'EDIT PROFILE',
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

  setDate = (event, date) => {
    const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
//    alert(formattedDate)

    //date = date || this.state.date;
    this.setState({dob :formattedDate})
    // this.setState({
    //   show: Platform.OS === 'ios' ? true : false,
    //   date,
    // });
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

    showLoading() {
        this.setState({loading: true})
    }

    getNewsUpdate(){

        const url = GLOBAL.BASE_URL +  'get_profile'


        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id : GLOBAL.user_id,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
//                alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {



                    this.setState({name :responseJson.user_details.name})
                    this.setState({address: responseJson.user_details.address})
                    this.setState({area: responseJson.user_details.area})
                    this.setState({city: responseJson.user_details.city})
                    this.setState({description :responseJson.user_details.email})
                    this.setState({image :responseJson.user_details.image})
                    this.setState({username: responseJson.user_details.username})
                    if(responseJson.user_details.dob==''){
                        this.setState({dob:'Select Date of Birth'})
                    }else{
                        this.setState({dob: responseJson.user_details.dob})
                    }
                    GLOBAL.profileImage = responseJson.user_details.image
                }else {
                    alert('No News Found')
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
    changeImage=()=>{
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

                GLOBAL.profileImage = response.uri
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });

    }



    _handleStateChange = state => {
        this.setState({newsHeading:GLOBAL.array})

    };
    buttonClickListener = () =>{



        if (this.state.name == ''){
            alert('Please Enter Name')
        } else if (this.state.description == ''){
            alert('Please Enter Email')
        }


        else {
            //   this.showLoading()
            const url = GLOBAL.BASE_URL +  'update_profile'
            const data = new FormData();
            data.append('user_id', GLOBAL.user_id);
            data.append('name', this.state.name);
            data.append('email', this.state.description);
            data.append('gender', '');
            data.append('dob', '');
            data.append('flag',1);
            data.append('address', this.state.address)
            data.append('area', this.state.area)
            data.append('city', this.state.city)

            // you can append anyone.
            data.append('image', {
                uri: GLOBAL.profileImage,
                type: 'image/jpeg', // or photo.type
                name: 'image.png'
            });
            fetch(url, {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }

            }).then((response) => response.json())
                .then((responseJson) => {
                    //       this.hideLoading()
//                    alert(JSON.stringify(responseJson))
                    const { navigation } = this.props;
                    navigation.goBack();

                    alert('Profile Updated Successfully!')



                });
        }

    }
    delete = (index) => {
        alert(index)
        let { newsHeading } = this.state;
        let targetPost = newsHeading[index];

        // Flip the 'liked' property of the targetPost


        var array = [...this.state.newsHeading]; // make a separate copy of the array

        if (index !== -1) {
            array.splice(index, 1);
            this.setState({newsHeading: array});
            GLOBAL.array = array
        }

    }





    componentWillUnmount() {

    }

    handleConnectionChange = (isConnected) => {

        this.setState({ status: isConnected });
        if (this.state.status == false){
            alert('You are not connected to Internet')
        }
        console.log(`is connected: ${this.state.status}`);
    }



    hideLoading() {
        this.setState({loading: false})
    }

    componentDidMount(){
        this.getNewsUpdate()
//        this.props.navigation.addListener('willFocus',this._handleStateChange);
        this.setState({newsHeading:GLOBAL.array})
    }


    render() {
    const { show, date, mode } = this.state;


        return (
            <View style={styles.container}>


                <View style={{marginTop:0,width:window.width,height:window.height}}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>






                        <View style = {{flexDirection:'row',width:window.width,marginTop:40}}>
                            <TouchableOpacity
                                onPress={() => this.changeImage()}>

                                {this.state.avatarSource != '' && (

                                    <Image style = {{width :80 ,height : 80 ,marginLeft: 20,borderRadius:40}}
                                           source={this.state.avatarSource} />
                                )}
                                {this.state.avatarSource == '' && (

                                    <Image style = {{width :80 ,height : 80 ,marginLeft: 20,borderRadius:40}}
                                           source={{uri:this.state.image}}/>
                                )}

                            </TouchableOpacity>

                            <Text style = {{marginLeft:10,fontSize: 20,color:'grey',marginTop:25}}>
                                Add Profile Pic
                            </Text>




                        </View>


                        <TextInput
                            style={{ height: 50, borderColor: 'gray',fontSize:20, borderBottomWidth: 1, marginTop:60 ,marginBottom: 20 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Enter Name"
                            placeholderTextColor = 'grey'
                            maxLength={35}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.name}
                            onChangeText={(text) => this.setState({name:text})}
                        />
                        <TextInput
                            style={{ height: 50, borderColor: 'gray',fontSize:20, borderBottomWidth: 1, marginTop:0 ,marginBottom: 20 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Address"
                            placeholderTextColor = 'grey'
                            maxLength={35}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.address}
                            onChangeText={(text) => this.setState({address:text})}
                        />

                        <TouchableOpacity onPress={()=>this.datepicker()}>
                        <TextInput
                            style={{ height: 50, borderColor: 'gray',fontSize:20, borderBottomWidth: 1, marginTop:0 ,marginBottom: 20 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            value={this.state.dob}
                            editable={false}
                            placeholderTextColor = 'grey'
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.dob}

                        />
                        </TouchableOpacity>
        { show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={(event,date)=>this.setDate(event, date)} />
        }

                        <TextInput
                            style={{ height: 50, borderColor: 'gray',fontSize:20, borderBottomWidth: 1, marginTop:0 ,marginBottom: 20 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Area"
                            placeholderTextColor = 'grey'
                            maxLength={35}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.username}
                            onChangeText={(text) => this.setState({username:text})}
                        />

                        <TextInput
                            style={{ height: 50, borderColor: 'gray',fontSize:20, borderBottomWidth: 1, marginTop:0 ,marginBottom: 20 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="City"
                            placeholderTextColor = 'grey'
                            maxLength={35}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            value = {this.state.city}
                            onChangeText={(text) => this.setState({city:text})}
                        />

                        <TextInput
                            style={{ height: 50, borderColor: 'gray',fontSize:20, borderBottomWidth: 1, marginTop:0 ,marginBottom: 20 ,marginLeft:20,width:window.width -40,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Enter Email"
                            placeholderTextColor = 'grey'
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.setState({description:text.replace(/\s+/g,'')})}
                            value = {this.state.description}
                        />










                        <Button
                            style={{ fontSize: 20, color: 'white' }}
                            containerStyle={{ marginTop:20,marginLeft:15,width:window.width-30,padding: 10, height: 45, overflow: 'hidden', borderRadius: 20, backgroundColor: '#0592CC',margin:15}}

                            onPress={() => this.buttonClickListener()}
                        >
                            SUBMIT
                        </Button>





                    </KeyboardAwareScrollView>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,

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