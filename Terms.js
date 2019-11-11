import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,

    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import { WebView } from 'react-native-webview';

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Terms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',

        };

    }

    componentWillUnmount() {

    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'TERMS & CONDITION',
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

                <Text style = {{fontSize:20,margin:10,fontFamily:'Poppins-Medium',color:'#0592CC',textAlign:'left',width:'100%'}}>
                    Terms and Conditions

                </Text>

                <Text style = {{fontSize:17,marginLeft:10,marginRight:10,marginBottom:10,fontFamily:'Poppins-Medium',color:'black',textAlign:'left',width:'90%'}}>Welcome to anytimedoc!
                    These terms and conditions outline the rules and regulations for the use of NJT Healthcare Pvt.
                    Ltd.&#39;s Website, located at http://www.anytimedoc.in.
                    By accessing this website we assume you accept these terms and conditions. Do not continue
                    to use anytimedoc if you do not agree to take all of the terms and conditions stated on this page.
                    Our Terms and Conditions were created with the help of the Terms And Conditions
                    Generator and the Terms &amp; Conditions Generator.
                    The following terminology applies to these Terms and Conditions, Privacy Statement and
                    Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log
                    on this website and compliant to the Company’s terms and conditions. &quot;The Company&quot;,
                    &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to
                    both the Client and ourselves. All terms refer to the offer, acceptance and consideration of
                    payment necessary to undertake the process of our assistance to the Client in the most
                    appropriate manner for the express purpose of meeting the Client’s needs in respect of
                    provision of the Company’s stated services, in accordance with and subject to, prevailing law of
                    Netherlands. Any use of the above terminology or other words in the singular, plural,
                    capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to
                    same.

                </Text>


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