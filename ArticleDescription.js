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
import Button from 'react-native-button';
const window = Dimensions.get('window');

const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class ArticleDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            articled: GLOBAL.artdesc,
        };

    }

    componentWillUnmount() {

    }

    static navigationOptions = ({ navigation }) => {
        return {
            //   header: () => null,
            title: 'ARTICLE',
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
        let yeah = this.state.articled
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
                <Image style={{width:'100%', height:'30%', resizeMode:'cover'}}
                source={{uri: yeah.image}}/>

                <Text style = {{fontSize:20,margin:10,fontFamily:'Poppins-Medium',color:'#0592CC',textAlign:'left',width:'100%'}}>
                        {yeah.title}

                    </Text>
                    {yeah.description == '' && (
                <Text style = {{fontSize:17,marginLeft:10,marginRight:10,marginBottom:10,fontFamily:'Poppins-Medium',color:'black',textAlign:'left',width:'90%'}}>
                No description added for this article!

                    </Text>

                    )}

                    {yeah.description!='' &&(
                <Text style = {{fontSize:17,marginLeft:10,marginRight:10,marginBottom:10,fontFamily:'Poppins-Medium',color:'black',textAlign:'left',width:'90%'}}>
                        {yeah.description}

                    </Text>

                    )}

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
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
