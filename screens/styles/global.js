import {StyleSheet,Dimensions} from 'react-native';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen';
const gstyles = new StyleSheet.create({
 
    socialloginbtn : {
        color:'white',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        alignSelf:'center',
        borderRadius:30,
        width:wp('90%'),
    },
     sociallogin : {
        color:'white',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        width:'45%'
     },

     socialloginicn:{
         color:'white',
         fontSize:13.5,

     },
     
     inputicn:{
         color:'black',
         fontSize:18,
         marginLeft:5,
     },
     inputicnr:{
        color:'black',
        fontSize:18,
        marginRight:5,
    },
     sociallogintxt:{
        color:'white',
        fontSize:13.5,
    },
     card :{
         alignSelf:'center',
         width:wp('100%'),
         height:hp('100%'),
         backgroundColor:'white',
         elevation:2,
     },
     cardBody:{
         flexDirection:'column',
         width:wp('100%'),         
     },

     cardfooter:{
        flexDirection:'column',
        width:wp('100%'),        
    }

})

export default gstyles;