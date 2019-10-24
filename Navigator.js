import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
//import { AnimatedCircleBarComponent } from 'react-navigation-custom-bottom-tab-component/AnimatedCircleBarComponent';
import { FlexibleTabBarComponent } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
const GLOBAL = require('./Global');
import {Platform, StyleSheet,TouchableOpacity,Image, Text, View ,Button, Share} from 'react-native';

import Splash from './Splash.js';
import Slider from './Slider.js';
import Login from './Login.js';
import PurchaseType from './PurchaseType.js';
import Otp from './Otp.js';
import Wallet from './Wallet.js';
import LabMember from './LabMember.js';
import Register from './Register.js';
import Forgot from './Forgot.js';
import BasicDetail from './BasicDetail.js';
import Nurse from './Nurse.js';
import PackageMember from './PackageMember.js';
import Drawer from './Drawer.js';
import VideoCall from './VideoCall.js';
import Pharmacy from './Pharmacy.js';
import PharmacyOrder from './PharmacyOrder.js';
import Cart from './Cart.js';
import LabHistoryDetail from './LabHistoryDetail.js';
import AppointmentDetail from './AppointmentDetail.js';
import LabCartDetail from './LabCartDetail.js';
import NurseBooking from './NurseBooking.js';
import NurseTime from './NurseTime.js';
import MedicalService from './MedicalService.js';
import  MedicalServiceBooking from './MedicalServiceBooking.js';
import Refernearn from './Refernearn.js';
import  SurgicalPackage from './SurgicalPackage.js';
import  OpdHealth from './OpdHealth.js';
import DoctorVisit   from './DoctorVisit.js';
import Appointment from './Appointment.js';
import MedicalDetail from './MedicalDetail.js';
import MedicalEquipment from './MedicalEquipment.js';
import DoctorVisitDetail from './DoctorVisitDetail.js';
import Emergency from './Emergency.js';
import Privacyp from './Privacyp.js';
import AboutUs from './AboutUs.js';
import BookingAppointment from './BookingAppointment.js';
import BookingAppointmentDetail from './BookingAppointmentDetail.js';
import BookingDetailFinal from './BookingDetailFinal.js';
import Confirmation from './Confirmation.js';
import DoctorDetail from './DoctorDetail.js';
import HospitalList from './HospitalList.js';
import HospitalDetail from './HospitalDetail.js';
import AmbulanceBooking from './AmbulanceBooking.js';
import Speciality from './Speciality.js';
import Support from './Support.js';
import Location from './Location.js';
import Home from './Home.js';
import HealthPackege from './HealthPackege.js';
import Instamozo from './Instamozo.js';
import Payment from './Payment.js';
import Thankyou from './Thankyou.js';
import EquipmentCart from './EquipmentCart.js';
import Notification from './Notification.js';
import Chat from './Chat.js';
import FullDetail from './FullDetail.js';
import Review from './Review.js';
import AddMember from './AddMember.js';
import ListMember from './ListMember.js';
import AddAddress from './AddAddress.js';
import ListAddress from './ListAddress.js';
import AppointmentResc from './AppointmentResc.js';
import Allergies from './Allergies.js';
import Illness from './Illness.js';
import BasicSurgies from './BasicSurgies.js';
import Department from './Department.js';
import Filter from './Filter.js';
import  SpecialityFilter from  './SpecialityFilter.js';
import  HospitalFilter from  './HospitalFilter.js';
import  OnlineBooking from  './OnlineBooking.js';
import  OnlineVideo from  './OnlineVideo.js';
import  OfflineBooking from  './OfflineBooking.js';
import LabHistory from './LabHistory.js';
import EquipmentAddress  from './EquipmentAddress.js';
import  Quation from  './Quation.js';
import  Insurance from  './Insurance.js';
import  Labtest from  './Labtest.js';
import  Search from  './Search.js';
import  SearchSpeciality from  './SearchSpeciality.js';
import  NewOtp from  './NewOtp.js';
import  MyOtp from  './MyOtp.js';
import  ArticleDescription from  './ArticleDescription.js';
import React, {Component} from 'react';

const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: Home ,

    navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: 'black',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  }

},{
    initialRouteName: 'Home',
    contentComponent: Drawer,
    drawerWidth: 280
});

const TabNavigator = createBottomTabNavigator({
           DrawerNavigator: { screen: DrawerNavigator ,
                navigationOptions : {
    title:'Home',
    tabBarLabel: 'Home',
    tabBarOptions: {
        activeTintColor: '#0592CC',
        inactiveTintColor: '#808080',
        style: {
    backgroundColor: 'white',
  },
},
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor, focused }) =>{
      const image = focused
      ? require('./bottom/home_active.png')
              : require('./bottom/home_inactive.png')
  return(
    <Image
      source={image}
      style={{width:20, height:20}}
    />

  )

    }
      }
    },

    Search: { screen: Search,
    navigationOptions : {
title:'Health Record',

tabBarLabel: 'Health Record',
tabBarOptions: {
    activeTintColor: '#0592CC',
    inactiveTintColor: '#808080',
    style: {
backgroundColor: 'white',
},

},

// Note: By default the icon is only shown on iOS. Search the showIcon option below.
tabBarIcon: ({ tintColor,focused }) =>{
const image = focused
? require('./bottom/health_active.png')
      : require('./bottom/health_inactive.png')
return(
<Image
source={image}
style={{width:20, height:20}}
/>

)
  }
}

},

    BookingAppointment: { screen: BookingAppointment ,
          navigationOptions : {
    title:'Consult Now',
    tabBarLabel: 'Consult Now',
    tabBarOptions: {
        activeTintColor: '#0592CC',
        inactiveTintColor: '#808080',
        style: {
    backgroundColor: 'white',
  },

},

    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor, focused }) =>{
    const image = focused
    ? require('./bottom/consult_active.png')
            : require('./bottom/consult_inactive.png')


return(
  <Image
    source={image}
    style={{width:20, height:20,alignSelf:'center',resizeMode:'contain'}}
    />

)
}
}
},


      Notification: { screen: Notification ,
            navigationOptions : {
      title:'Notification',
      tabBarLabel: 'Notification',
      tabBarOptions: {
          activeTintColor: '#0592CC',
          inactiveTintColor: '#808080',
          style: {
      backgroundColor: 'white',
    },

  },

      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      tabBarIcon: ({ tintColor, focused }) =>{
      const image = focused
      ? require('./bottom/bell_active.png')
              : require('./bottom/bell_inactive.png')


  return(
    <Image
      source={image}
      style={{width:20, height:20,alignSelf:'center',resizeMode:'contain'}}
      />

  )
}
  }
},
    Cart: { screen: Cart ,
          navigationOptions : {
    title:'Cart',
    tabBarLabel: 'Cart',
    tabBarOptions: {
        activeTintColor: '#0592CC',
        inactiveTintColor: '#808080',
        style: {
    backgroundColor: 'white',
  },

},

    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor, focused }) =>{
    const image = focused
    ? require('./bottom/my_cart_active.png')
            : require('./bottom/my_cart_inactive.png')


return(
  <Image
    source={image}
    style={{width:20, height:20,alignSelf:'center',resizeMode:'contain'}}
    />

)

}
      }
    },

  },
  {
    tabBarComponent: FlexibleTabBarComponent,
  },
 {
    defaultNavigationOptions: ({ navigation }) => ({

      tabBarIcon: () => (
      <Image
        source={require('./bottom/home_active.png')}
        style={{width:20, height:20}}
      />
      )
    }),
    tabBarOptions: {
      activeTintColor: '#0592CC',
      showLabel:false,
      inactiveTintColor: 'white',
      inactiveBackgroundColor:'white',
      activeBackgroundColor:'white',
      showIcon:'true'
    },

  }
);

const StackNavigator = createStackNavigator({

        Splash:{screen:Splash},
        Slider: { screen: Slider },
        Login: { screen: Login },
        MyOtp: { screen: MyOtp },
    ArticleDescription:{screen:ArticleDescription},
   TabNavigator: { screen: TabNavigator,
navigationOptions: ({ navigation }) => ({
  header:null,
 }),
 },
        Home:{screen:Home},
        SpecialityFilter:{screen:SpecialityFilter},
            Department:{screen:Department},
        BasicDetail: { screen: BasicDetail },
        Refernearn:{screen: Refernearn},
        AppointmentDetail:{screen:AppointmentDetail},
        Allergies: { screen: Allergies },
        AppointmentResc:{screen:AppointmentResc},
        Illness: { screen: Illness },
        PackageMember:{screen: PackageMember},
        BasicSurgies: { screen: BasicSurgies },
        PurchaseType :{screen: PurchaseType },
        Pharmacy:{screen: Pharmacy},
        ListAddress: { screen: ListAddress },
        Privacyp:{screen:Privacyp},
        AddAddress: { screen: AddAddress },
        LabHistory : {screen: LabHistory},
        AboutUs:{screen: AboutUs},
        Labtest: { screen: Labtest },
        Wallet:{screen:Wallet},
        LabCartDetail:{screen: LabCartDetail},
        PharmacyOrder:{screen: PharmacyOrder},
        EquipmentAddress : {screen: EquipmentAddress},
        LabHistoryDetail:{screen: LabHistoryDetail},
        LabMember:{screen: LabMember},
        Cart:{screen: Cart},
        Insurance:{screen:Insurance},
        EquipmentCart:{screen:EquipmentCart},
        MedicalDetail:{screen:MedicalDetail},
        MedicalEquipment:{screen:MedicalEquipment},
        VideoCall:{screen:VideoCall},
            Filter:{screen:Filter},
        OnlineBooking:{screen:OnlineBooking},
        Search:{screen:Search},
        Appointment:{screen: Appointment},
        NewOtp:{screen:NewOtp},

        AmbulanceBooking:{screen:AmbulanceBooking},
        HospitalList:{screen:HospitalList},
            BookingAppointment:{screen:BookingAppointment},
            DoctorVisit:{screen:DoctorVisit},
        OpdHealth:{screen:OpdHealth},
        SurgicalPackage:{screen:SurgicalPackage},
        MedicalService:{screen:MedicalService},
        Nurse: { screen: Nurse },
        Support:{screen:Support},
        OnlineVideo: { screen: OnlineVideo },
    SearchSpeciality:{screen:SearchSpeciality},

        Otp: { screen: Otp },
        Register: { screen: Register },
        Forgot: { screen: Forgot },
        OfflineBooking:{screen:OfflineBooking},
        NurseTime:{screen:NurseTime},
        Payment:{screen:Payment},
        Thankyou:{screen:Thankyou},
        Instamozo:{screen:Instamozo},
        NurseBooking:{screen:NurseBooking},
        MedicalServiceBooking:{screen:MedicalServiceBooking},
            DoctorVisitDetail:{screen:DoctorVisitDetail},
            Emergency:{screen:Emergency},
        BookingAppointmentDetail:{screen:BookingAppointmentDetail},
        BookingDetailFinal:{screen:BookingDetailFinal},
        Confirmation:{screen:Confirmation},
        DoctorDetail:{screen:DoctorDetail},
        HospitalDetail:{screen:HospitalDetail},
        Location:{screen:Location},
        HealthPackege:{screen:HealthPackege},
        Speciality:{screen:Speciality},
        Chat:{screen:Chat},
        FullDetail:{screen:FullDetail},
            Review:{screen:Review},
            AddMember:{screen:AddMember},
            ListMember:{screen:ListMember},
            HospitalFilter:{screen:HospitalFilter},
        Quation:{screen:Quation},
    },

   // {headerMode :'none'},
);

export default createAppContainer(StackNavigator);
//LabourLaw