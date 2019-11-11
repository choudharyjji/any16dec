import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,FlatList,ActivityIndicator,StatusBar,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';


const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';

const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
class HealthRecord extends Component<Props> {

static navigationOptions = {
          title: 'Notifications',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:200
          },
      };





  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      name: '',
      email: '',
       message: '',
       status :'' ,
       loading : '',
       userid : '',
       notificationslist:[],
    }
}
  _keyExtractor = (item, index) => item.productID;

  renderRowItem = (itemData) => {
    
let added_buttons_goes_here = itemData.item.images.map( (data, index) => {
        return (
    <Image style={{width:130, height:130, margin:10}} source={{uri: data}}/>
        )
      });
    return (
      <View style={{flexDirection: 'column',
    flex : 1, backgroundColor:'white',borderRadius:5,  width : window.width-20 ,marginLeft : 10,marginRight:10,marginTop:10,marginBottom:10,}}>

    <View style={{flexDirection:'row', width:'100%'}}>
    <Text style= {{color:'#006FA5',fontSize:18,fontFamily:'Poppins-Regular',margin:10,}}>

      Booking Type:
     </Text>
    <Text style= {{color:'black',fontSize:18,fontFamily:'Poppins-Regular',marginTop:10}}>
{itemData.item.type}
     </Text>

    </View>
    <Text style= {{color:'#006FA5',fontSize:18,fontFamily:'Poppins-Regular',marginLeft:10}}>
    Attachments
     </Text>


    {added_buttons_goes_here}
    <View style={{flexDirection:'column', width:'100%'}}>


    </View>
 


</View>



    )
  }

showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }



componentDidMount(){



  this.getReviews()
}

   getReviews= () =>{
      this.showLoading();
      const url = GLOBAL.BASE_URL +  'list_user_reports'
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: GLOBAL.user_id

  }),
}).then((response) => response.json())
    .then((responseJson) => {

//       alert(JSON.stringify(responseJson))
       this.hideLoading()
       if (responseJson.status == true) {


       this.setState({notificationslist : responseJson.history})

       }

    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }

  render() {



    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

        size="large" color='#0592CC' />


        </View>
      )
    }
    return (

      <View style={styles.container}>




{this.state.notificationslist.length == 0 &&(
    <Text style={{fontSize:20, margin:10,alignSelf:'center', fontFamily: 'AvenirLTStd-Roman'}}>No health records found!</Text>
  )}

  {this.state.notificationslist.length !=0 &&(
      <FlatList style= {{flexGrow:0, marginBottom:20}}
          data={this.state.notificationslist}
          numColumns={1}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={this.renderRowItem}
        />

    )}




     </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#f2f2f2',
  },
  statusBar: {
  height: STATUSBAR_HEIGHT,
},
 appBar: {
   backgroundColor:'black',
   height: APPBAR_HEIGHT,
 },
 loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center'
      },

});

export default HealthRecord;
