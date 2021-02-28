import React,{ useEffect } from 'react';
import { Card, CardItem, Container, Content,Button, Icon, Separator, Text, Thumbnail , Item, Label, H3} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import gstyles from './styles/global';
import { ActivityIndicator, Alert, Dimensions, TextInput } from 'react-native';
import {connect} from 'react-redux';
import { getUsers,LoginWithEmail, SignInGoogle,clear } from '../store/actions/action';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen';

function LandingScreen(props) {
    const [email,setEmail] = React.useState('');
    const [pass,setPass] = React.useState('');
    const [isLoading,setLoading] = React.useState(false);
    const [isBtnActive,setbtnactive] = React.useState(true);
    const [authRole,setAuthRole] = React.useState('default');


    useEffect(() => {

    props.getdbusers();
       },[])

    
const setload = (data)=>{
    setLoading(data);
}
    return (
        
        <Container>
            {console.log(props)}
            {isLoading ? ( 
                <>
                <Thumbnail  style={{marginTop:230,marginBottom:10,width:100,height:100,alignSelf:'center'}} source={require('../assets/logo2.png')}/>
                   <Text style={{alignSelf:'center',fontWeight:'bold',marginBottom:30}}>Campus Recruitment System</Text>
                <ActivityIndicator
                     color='red'
                     size='large'
                /> 
                </> ) :(
                    <Content style={{backgroundColor:'lightgray'}}>
                    <Card style={gstyles.card}>

                    <CardItem header style={{justifyContent:'center',alignItems:'center' ,flexDirection:'column'}}>
                        <Text selectable={true} suppressHighlighting={true} style={{fontSize:20,fontWeight:'bold'}}>Campus Recruitment System</Text>
                    </CardItem>
                    <CardItem cardBody style={gstyles.cardBody} >
                    <Separator style={{width:'30%',height:10,backgroundColor:'transparent',margin:4}}/>
                    <Thumbnail circular resizeMode='contain' large style={{marginTop:0,marginBottom:10,width:wp('100%'),height:hp('40%')}} source={require('../assets/logo2.png')}/>
                    </CardItem>

                   {isBtnActive ? <CardItem footer style={gstyles.cardBody} >      
                   
                    <Button style={{marginBottom:10}} full dark onPress={
                      ()=> { 
                        setAuthRole('Admin');
                        setbtnactive(false);

                      }
                      }><Text>Login as Admin</Text></Button>
                   
                    <Button style={{marginBottom:10}} full danger onPress={ ()=>
                        {   
                            setAuthRole('Student');
                            setbtnactive(false);
                       }   }><Text>Login as Student</Text></Button>
                   
                   
                    <Button style={{marginBottom:10}} full onPress={ ()=>{
                        setAuthRole('Company');
                        setbtnactive(false);
                    }
                        }><Text>Login as Company</Text></Button>
                   
                   
                   <Item>
                       <Text>OR</Text>

                   </Item>
                   <Item style={{borderColor:'transparent',marginTop:10}}>
                   <Text>Don't have account yet?</Text>
                   <TouchableOpacity onPress={()=>{props.navigation.navigate('Sign Up')}}><Text style={{color:'blue'}}> Sign up</Text></TouchableOpacity>      
                   </Item>             
                    </CardItem> : 
                        <CardItem footer style={gstyles.cardBody} >
                          <Item style={{width:'95%',borderWidth:0,borderColor:'transparent'}}>
                            <Icon name='arrow-back' onPress={()=>{setbtnactive(true)}} style={{marginRight:"15%"}}/>
                           <H3 style={{marginRight:0}}>{authRole} Login</H3> 
                           </Item>
                            {/* email Input */}
                             <Item bordered fixedLabel  style={{width:'95%',marginTop:20,alignSelf:'center'}}>
                             <Icon style={gstyles.inputicn} name='user' type='AntDesign'/>
                               <TextInput 
                               value={email}
                               onChangeText={(e)=>setEmail(e)}
                               keyboardType='email-address' 
                               autoCapitalize='none'
                               autoCompleteType='email'
                               enablesReturnKeyAutomatically={true}
                               importantForAutofill='yes'
                               placeholder="Enter your email"
                               selectionColor="lightgray"
                               returnKeyLabel='Next'
                               returnKeyType='next'
                               style={{width:'90%'}}
                               />
                               </Item>
     
                             {/* Pass Input */}
                             <Item bordered fixedLabel  style={{width:'95%',marginTop:20,marginBottom:20,alignSelf:'center'}}>
                               <Icon style={gstyles.inputicn} name='key' type='AntDesign'/>
                               <TextInput 
                               value={pass}
                               onChangeText={(e)=>setPass(e)}
                               autoCapitalize='none'
                               autoCompleteType='password'
                               enablesReturnKeyAutomatically={true}
                               importantForAutofill='yes'
                               placeholder="Enter your Password"
                               secureTextEntry={true}
                               selectionColor="lightgray"
                               returnKeyLabel='Login'
                               returnKeyType='send'
                               style={{width:'90%'}}
                               />
                               </Item>
     
                             <Button dark 
                             rounded
                             full
                             androidRippleColor="red"
                             style={gstyles.socialloginbtn}
                             onPress={()=>{
                                if(email !== '' && pass !==""){
                                 
                                 props.loginemail(email,pass,props,setload,authRole)
                                }else if(pass ===""){
                                    return Alert.alert('Empty Password Error','Password Field is Empty')
                                }else if(email ===""){
                                 return Alert.alert('Empty Email Error','Email Field is Empty')
                             }else{
                                 return Alert.alert('Empty Email/Pass Error','Email & Pass Fields are Empty')
                             }
                             }
                             }
                             >
                                 <Text style={gstyles.sociallogintxt}>Sign in</Text>
                             </Button>
                         </CardItem>
                    }


                </Card>     
                </Content>
                )
            }

        </Container>



    )
}

const mapStateToProp = (state)=>{
    return({
        state,
    })
}

const mapDispatchToProp = (dispatch)=>{
    return({
        google : (props,setload)=>{ dispatch(SignInGoogle(props,setload))},
        getdbusers: ()=>{dispatch(getUsers())},
        loginemail : (email,pass,props,setload,authRole)=>{dispatch(LoginWithEmail(email,pass,props,setload,authRole))},
        clearusers : ()=>{dispatch(clear())},
    })
}
export default connect(mapStateToProp,mapDispatchToProp)(LandingScreen);
