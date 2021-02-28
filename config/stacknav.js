import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LandingScreen from '../screens/landingscreen';
import SignUp from '../screens/signup';
import Uregistry  from '../screens/uregistry';
import Drawerr from './drawernav';

const Stack = createStackNavigator();

function CustomStack (){

    return(

        <Stack.Navigator>
            <Stack.Screen name='Sign In'  options={{headerShown:false}} component={LandingScreen}/>
            <Stack.Screen name='Sign Up'  options={{headerShown:false}} component={SignUp}/>
            <Stack.Screen name='UserRegistry' options={{headerShown:false}}  component={Uregistry}/>
            <Stack.Screen name='Dashboard' options={{headerShown:false}}  component={Drawerr}/>
        </Stack.Navigator>


    )
}
export default CustomStack;