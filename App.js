import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Alert,StatusBar, AsyncStorage} from 'react-native';
import AppNavigator from './Navigator';
import NotifService from './NotifService';
const GLOBAL = require('./Global');
import appConfig from './app.json';
import PushNotification from 'react-native-push-notification';
var Sound = require('react-native-sound');


type Props = {};



export default class App extends Component<Props> {
  constructor(props) {
      super(props);
      this.state = {
        senderId: appConfig.senderID,
        gotNotif:0
      };

      this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    //  this.notif.localNotif()
    }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (

             <AppNavigator>

{/*      <View style={{flex:1}}>
{this.state.gotNotif==1 && (
  <View>
    <Text>title</Text>
    <Text>body</Text>
  </View>


  )}

       <AppNavigator/>
       </View>
     */}
     </AppNavigator>
    );
  }
  onRegister(token) {
      AsyncStorage.setItem('token', token.token);
      GLOBAL.firebaseToken= token.token
      console.log( 'TOKEN:', token );
      this.setState({ registerToken: token.token, fcmRegistered: true });
    }

    onNotif(notif) {
      console.log(notif);
//      Alert.alert(notif.title, notif.message);
      this.setState({gotNotif: 1})
    }

    handlePerm(perms) {
      Alert.alert("Permissions", JSON.stringify(perms));
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    button: {
      borderWidth: 1,
      borderColor: "#000000",
      margin: 5,
      padding: 5,
      width: "70%",
      backgroundColor: "#DDDDDD",
      borderRadius: 5,
    },
    textField: {
      borderWidth: 1,
      borderColor: "#AAAAAA",
      margin: 5,
      padding: 5,
      width: "70%"
    },
    spacer: {
      height: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
    }
  });
