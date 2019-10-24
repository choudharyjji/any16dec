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


export default class Privacyp extends Component {
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
            title: 'PRIVACY POLICY',
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
                        Privacy Policy

                    </Text>

                <Text style = {{fontSize:17,marginLeft:10,marginRight:10,marginBottom:10,fontFamily:'Poppins-Medium',color:'black',textAlign:'left',width:'90%'}}>
NJT Healthcare Pvt. Ltd. built the Anytimedoc app as a Commercial app. This SERVICE is provided by NJT
Healthcare Pvt. Ltd. and is intended for use as is.
This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal
Information if anyone decided to use our Service.
If you choose to use our Service, then you agree to the collection and use of information in relation to this
policy. The Personal Information that we collect is used for providing and improving the Service. We will not
use or share your information with anyone except as described in this Privacy Policy.
The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is
accessible at Anytimedoc unless otherwise defined in this Privacy Policy.
Information Collection and Use
For a better experience, while using our Service, we may require you to provide us with certain personally
identifiable information. The information that we request will be retained by us and used as described in this
privacy policy.
The app does use third party services that may collect information used to identify you.
Link to privacy policy of third party service providers used by the app
 Google Play Services
Log Data
We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and
information (through third party products) on your phone called Log Data. This Log Data may include
information such as your device Internet Protocol (“IP”) address, device name, operating system version, the
configuration of the app when utilizing our Service, the time and date of your use of the Service, and other
statistics.
Cookies
Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These
are sent to your browser from the websites that you visit and are stored on your device&#39;s internal memory.

This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries
that use “cookies” to collect information and improve their services. You have the option to either accept or
refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies,
you may not be able to use some portions of this Service.
Service Providers
We may employ third-party companies and individuals due to the following reasons:
 To facilitate our Service;
 To provide the Service on our behalf;
 To perform Service-related services; or
 To assist us in analyzing how our Service is used.
We want to inform users of this Service that these third parties have access to your Personal Information. The
reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or
use the information for any other purpose.
Security
We value your trust in providing us your Personal Information, thus we are striving to use commercially
acceptable means of protecting it. But remember that no method of transmission over the internet, or method of
electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
Links to Other Sites
This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site.
Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy
Policy of these websites. We have no control over and assume no responsibility for the content, privacy
policies, or practices of any third-party sites or services.
Children’s Privacy
These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable
information from children under 13. In the case we discover that a child under 13 has provided us with personal
information, we immediately delete this from our servers. If you are a parent or guardian and you are aware
that your child has provided us with personal information, please contact us so that we will be able to do
necessary actions.
Changes to This Privacy Policy

We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for
any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes
are effective immediately after they are posted on this page.

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
