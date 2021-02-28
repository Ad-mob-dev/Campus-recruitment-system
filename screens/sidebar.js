import * as React from 'react';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
import { Icon } from 'native-base';
import { Image,View,Text,Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


  function SideBar(props) {
    return (

      <DrawerContentScrollView style={{width:'100%',backgroundColor:'black'}} {...props}>
        <DrawerItem  label="Campus Recruitment System" labelStyle={{fontWeight:'bold',fontSize:15,alignSelf:'center',color:'white'}} icon={({focused,color,size})=>{
         return <TouchableOpacity onPress={()=>{props.navigation.closeDrawer()}}>
         <Icon name='menu' style={{color:'white'}} color={color} fontSize={size}/>
         </TouchableOpacity>
        }} />


        <View style={{backgroundColor:'black',opacity:1}}>
       
           <Image source={require('../assets/logo2.png')} style={{width:'100%',height:250,marginBottom:10}}/>

        </View>
         
      
        <DrawerItemList itemStyle={{borderColor:'white',borderWidth:1,marginTop:0}} activeBackgroundColor='white' activeTintColor='red' inactiveTintColor='white' inactiveBackgroundColor='black' labelStyle={{fontWeight:'bold',fontSize:15}} {...props}/>
      
        <TouchableOpacity style={{marginTop:22,borderWidth:1,width:'92%',borderColor:'white',alignSelf:'center',padding:5}}>
        <Text note suppressHighlighting={true} onPress={()=>{Linking.openURL('fb://profile/100000476703235')}}  style={{color:'white',textAlign:'center',fontWeight:'bold'}}>
        POWERED BY ADEEL KHAN </Text>
        
          </TouchableOpacity>
      
      </DrawerContentScrollView>

      

    );
  }

    


  export default SideBar;