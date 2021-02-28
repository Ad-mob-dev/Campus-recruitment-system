import 'react-native-gesture-handler';
import React  from 'react';
import CustomStack from './config/stacknav';
import {NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './store/index';


function App (){
  
  return (
    <Provider store={store}>
      <NavigationContainer>
      <CustomStack/>
      </NavigationContainer>
      </Provider>
  );
};




export default App;

 
