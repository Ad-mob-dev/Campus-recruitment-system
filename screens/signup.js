import React from 'react';
import { Card, CardItem, Container, Content, Icon, Separator, Text, Thumbnail ,Button, Item } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import gstyles from './styles/global';
import { TextInput,Alert ,Dimensions, SafeAreaView} from 'react-native';
import { connect } from 'react-redux';
import { SignUpWithEmail } from '../store/actions/action';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen';


function SignUp(props) {
    const [emailR,setEmailR] = React.useState("");
    const [passR,setPassR] = React.useState("");
    const [passRc,setPassRc] = React.useState("");
    const [isBtnActive,setbtnactive] = React.useState(true);
    const [authRole,setAuthRole] = React.useState('default');

    return (

        <Container>

                <Card style={gstyles.card}>
                <CardItem header style={{justifyContent:'center',alignItems:'center' ,flexDirection:'column'}}>
                        <Text selectable={true} suppressHighlighting={true} style={{fontSize:20,fontWeight:'bold'}}>Campus Recruitment System</Text>
                 </CardItem>
                 <CardItem cardBody style={gstyles.cardBody} >
                    <Separator style={{width:'30%',height:10,backgroundColor:'transparent',margin:4}}/>
                    <Thumbnail circular resizeMode='cover' large style={{marginTop:0,width:wp('100%'),height:hp('40%')}} source={require('../assets/logo2.png')}/>
                    </CardItem>


                    {isBtnActive ? <CardItem footer style={gstyles.cardBody} >      
                   
                    <Button style={{marginBottom:10}} full danger onPress={ ()=>
                       {   
                           setAuthRole('Student');
                           setbtnactive(false);
                      }   }><Text>Sign Up as a Student</Text></Button>
                  
                  
                   <Button style={{marginBottom:10}} full onPress={ ()=>{
                       setAuthRole('Company');
                       setbtnactive(false);
                   }
                       }><Text>Sign Up as a Company</Text></Button>
                  
                  
                  <Item>
                      <Text>OR</Text>

                  </Item>
                  <Item style={{borderColor:'transparent',marginTop:10}}>
                  <Text>Already Registered?</Text>
                  <TouchableOpacity onPress={()=>{props.navigation.navigate('Sign Up')}}><Text style={{color:'blue'}}> Sign In</Text></TouchableOpacity>      
                  </Item>             
                   </CardItem> :
                    <CardItem footer style={gstyles.cardfooter} >                    
                    {/* email Input */}
                        <Item bordered fixedLabel  style={{width:'100%',marginTop:10,alignSelf:'center'}}>
                        <Icon style={gstyles.inputicn} name='user' type='AntDesign'/>
                          <TextInput 
                          value={emailR}
                          onChangeText={(e)=>setEmailR(e)}
                          keyboardType='email-address' 
                          autoCapitalize='words'
                          autoCompleteType='email'
                          enablesReturnKeyAutomatically={true}
                          importantForAutofill='yes'
                          placeholder="Enter your email"
                          secureTextEntry={true}
                          selectionColor="lightgray"
                          returnKeyLabel='Next'
                          returnKeyType='next'
                          style={{width:'90%'}}
                          />
                          </Item>

                    {/* Passcon Input */}
                        <Item bordered fixedLabel  style={{width:'100%',marginTop:20,marginBottom:20,alignSelf:'center'}}>
                          <Icon style={gstyles.inputicn} name='key' type='AntDesign'/>
                          <TextInput 
                          value={passR}
                          onChangeText={(e)=>setPassR(e)}
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
                    
                <Item bordered fixedLabel  style={{width:'100%',marginBottom:20,alignSelf:'center'}}>
                          <Icon style={gstyles.inputicn} name='key' type='AntDesign'/>
                          <TextInput 
                          value={passRc}
                          onChangeText={(e)=>setPassRc(e)}
                          autoCapitalize='none'
                          autoCompleteType='password'
                          enablesReturnKeyAutomatically={true}
                          importantForAutofill='yes'
                          placeholder="Confirm your Password"
                          secureTextEntry={true}
                          selectionColor="lightgray"
                          returnKeyLabel='Login'
                          returnKeyType='send'
                          style={{width:'90%'}}
                          />
                          </Item>

                        <Button dark
                        rounded
                        block
                        androidRippleColor="red"
                        onMagicTap={()=>{}}
                        style={gstyles.socialloginbtn}
                        onPress={()=>{
                            if(emailR !== "" && passR !== ""){
                                props.signupemail(emailR,passR,props,authRole)
                            }else if(passR ===""){
                                return Alert.alert('Empty Password Error','Password Field is Empty')
                            }else if(emailR ===""){
                             return Alert.alert('Empty Email Error','Email Field is Empty')
                         }else{
                             return Alert.alert('Empty Email/Pass Error','Email & Pass Fields are Empty')
                         }
                         }
                         }
                        >
                            <Text style={gstyles.sociallogintxt}>Sign up</Text>
                        </Button>
                        <Item style={{borderWidth:0,borderColor:'transparent',marginTop:10}}>
                        <Text style={{fontWeight:'100',fontSize:11}}>Already Registered? 
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>{props.navigation.navigate('Sign In')}}><Text style={{fontSize:11,color:'royalblue'}}>Sign in</Text></TouchableOpacity>
                        </Text>
                        </Item>

                        
                      </CardItem>
                  }
            </Card>
            
        </Container>



    )
}

const matchStateToProp = (state) =>{
return({
    state,
})
}

const matchDispatchToProp = (dispatch) =>{
    return({
        signupemail : (email,password,props,authRole)=>{dispatch(SignUpWithEmail(email,password,props,authRole))},
    })
    }
    
export default connect(matchStateToProp,matchDispatchToProp)(SignUp);
