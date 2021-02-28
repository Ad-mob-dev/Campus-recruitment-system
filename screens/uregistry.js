import {Card,CardItem,Container,Content,Icon, Separator,Text,Thumbnail,Button,Item} from 'native-base';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import gstyles from './styles/global';
import { TextInput,ImageBackground,ActivityIndicator,Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StoreToDB } from '../store/actions/action';
import { launchImageLibrary } from 'react-native-image-picker';
import { firebase } from '@react-native-firebase/storage';
  
export function Uregistry (props) {
  
  const [userx, setuserx] = React.useState(props.state.guser)
  const {role,photo,}= userx;
  const [editableStatusna,setEditableStatusna]= React.useState(false);
  const [editableStatusem,setEditableStatusem]= React.useState(false);
  const [editableStatusag,setEditableStatusag]= React.useState(false);
  const [editableStatusph,setEditableStatusph]= React.useState(false);
  const [editableStatusedu,setEditableStatusedu]= React.useState(false);
  const [editableStatusgd,setEditableStatusgd]= React.useState(false);
  const [editableStatusloc,setEditableStatusloc]= React.useState(false);
  const [editableStatusmrks,setEditableStatusmrks]= React.useState(false);
  const [editableStatusgrd,setEditableStatusgrd]= React.useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();  
  const genderRef = useRef();
  const locationRef = useRef();
  const eduRef = useRef();
  const marksRef = useRef();
  const GradeRef = useRef();

  const [isLoading,setLoading] = React.useState(false);
  const [isImgLoading,setImgLoading] = React.useState(false);
  
  const setload = (data)=>{
      setLoading(data);
  }

  const options = {
    title: 'Select Avatar',
    mediaType : 'photo',
    maxWidth: 500,
    maxHeight:500,
    customButtons: [{ name: 'upload photo', title: 'Choose Photo from Gallery' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  }

function selectImage(){
   setImgLoading(true)
  launchImageLibrary(options,(response)=>{
    var imgRef = firebase.storage().ref('Images/'+props.state.guser.id);
    if(response.didCancel){
      setImgLoading(false);
      Alert.alert("Status",'You"ve Canceled the Image Upload Request ')
    }else if(response.errorCode){
      setImgLoading(false);
      Alert.alert("Image Picker Error"+response.errorCode,response.errorMessage)
    }else{
     imgRef.putFile(response.uri).then( async (data)=>{
       let url = await imgRef.getDownloadURL()
       
        setuserx({...userx,photo:url})
        setImgLoading(false)
     
        Alert.alert('Media Ready','Your Profile Picture is Ready to Upload')
     
       }).catch( 
         (e)=>{
          setImgLoading(false)

          Alert.alert("ERROR",`Code :${e.code +' Message:'+ e.message}`)
         });
      
    }

 

  })
}

function selectrole(){

  if(role === 'Student'){
    const {name,id,age,gender,location,email,photo,emailV,creation,phone,role,education,marks,grades}= userx;
  return <Card style={gstyles.card}>
    <CardItem bordered  style={{justifyContent:'center',alignItems:'center' ,flexDirection:'column'}}>
        <ImageBackground source={{uri:photo}} style={{width:'100%',height:120}} resizeMethod='auto' resizeMode='cover'>  
         
        <TouchableOpacity  style={{alignSelf:'flex-end',backgroundColor:'white',borderRadius:10,padding:3}} onPress={()=>{selectImage()}}><Icon name='camera-retro' type="FontAwesome" style={{color:'black',fontSize:20,textAlign:'center'}} /></TouchableOpacity>
        {isImgLoading? <ActivityIndicator
       color='red'
          size='large'
          style={{height:100,width:100,backgroundColor:'lightgray',alignSelf:'center', borderWidth:2.5,borderColor:'white'}}
          /> :
        <Thumbnail large style={{height:70,width:70,resizeMode:'contain', borderWidth:2.5,borderColor:'white',alignSelf:'center'}} source={{uri:photo}}/>
        }
        <Separator style={{width:'30%',height:2,backgroundColor:'transparent',margin:3,}}/>
        </ImageBackground>
    </CardItem>
  <CardItem bordered  cardBody style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
  {/* name */}
  <Item rounded style={{marginBottom:5,marginTop:5}}>
          <Icon style={gstyles.inputicn} name='user' type='AntDesign'/>
            <TextInput 
            ref={nameRef}
            value={name}
            editable ={editableStatusna}
            onChangeText={(e)=>{setuserx({ ...userx, name : e})}}
            keyboardType='name-phone-pad'
            importantForAutofill='auto' 
            autoCapitalize="words"
            autoCorrect={true}
            autoCompleteType='name'
            enablesReturnKeyAutomatically={true}
            placeholder="Enter Student name"
            selectionColor="lightgray"
            returnKeyLabel='Next'
            returnKeyType='next'
            style={{width:'75%'}}
            onEndEditing ={()=>{setEditableStatusna(false)}}
            />
            <TouchableOpacity onPress={()=>{
              setEditableStatusna(true)
              nameRef.current.focus()
              }}>

            <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

            </TouchableOpacity>        
   </Item>
   <Separator style={{height:10,backgroundColor:'transparent'}}/>
   {/* age */}
   <Item rounded style={{marginBottom:5}}>
          <Icon style={gstyles.inputicn} name='chevron-triple-up' type='MaterialCommunityIcons'/>
            <TextInput 
            ref={ageRef}
            value={age}
            onChangeText={(e)=>{setuserx({...userx,age:e})}}
            editable ={editableStatusag}
            keyboardType='decimal-pad' 
            enablesReturnKeyAutomatically={true}
            importantForAutofill='auto'
            placeholder="Enter Student Age"
            selectionColor="lightgray"
            returnKeyLabel='Next'
            returnKeyType='next'
            style={{width:'75%'}}
            onEndEditing ={()=>{setEditableStatusag(false)}}
            />

            
            <TouchableOpacity onPress={()=>{
              setEditableStatusag(true)
              ageRef.current.focus()
           }}>
            <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

            </TouchableOpacity>        
   </Item>
   <Separator style={{height:5,backgroundColor:'transparent'}}/>
   {/* gender */}
   <Item rounded style={{marginBottom:5}}>
          <Icon style={gstyles.inputicn} name='transgender-outline' type='Ionicons'/>
            <TextInput 
            maxLength={11}
            ref={genderRef}
            value={gender}
            editable ={editableStatusgd}
            onChangeText={(e)=>{setuserx({...userx,gender:e})}}
            keyboardType='email-address' 
            autoCapitalize='words'
            enablesReturnKeyAutomatically={true}
            placeholder="Enter Student Gender"
            selectionColor="lightgray"
            returnKeyLabel='Next'
            returnKeyType='next'
            style={{width:'75%'}}
            onEndEditing ={()=>{setEditableStatusgd(false)}}
            />
            
            <TouchableOpacity onPress={()=>{
              setEditableStatusgd(true)
              genderRef.current.focus()

            }}>

            <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

            </TouchableOpacity>        

            </Item>
    <Separator style={{height:5,backgroundColor:'transparent'}}/>
    {/* Location */}
    <Item rounded style={{marginBottom:5}}>
          <Icon style={gstyles.inputicn} name='location-pin' type='SimpleLineIcons'/>
            <TextInput 
            ref={locationRef}
            value={location}
            editable ={editableStatusloc}
            onChangeText={(e)=>{setuserx({...userx,location:e})}}
            keyboardType='email-address' 
            autoCapitalize='words'
            autoCompleteType='street-address'
            importantForAutofill='yes'
            enablesReturnKeyAutomatically={true}
            placeholder="Student City/Country"
            selectionColor="lightgray"
            returnKeyLabel='Next'
            returnKeyType='next'
            style={{width:'75%'}}
            onEndEditing ={()=>{setEditableStatusloc(false)}}
            />
            
            <TouchableOpacity onPress={()=>{
              setEditableStatusloc(true)
              locationRef.current.focus()

            }}>

            <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

            </TouchableOpacity>        

            </Item>
    <Separator style={{height:5,backgroundColor:'transparent'}}/>
  {/* mail */}
  <Item rounded style={{marginBottom:5}}>
          <Icon style={gstyles.inputicn} name='mail' type='AntDesign'/>
            <TextInput 
            ref={emailRef}
            value={email}
            editable ={editableStatusem}
            keyboardType='name-phone-pad' 
            autoCapitalize='none'
            autoCompleteType='email'
            enablesReturnKeyAutomatically={true}
            importantForAutofill='auto'
            placeholder="Enter Student email"
            selectionColor="lightgray"
            returnKeyLabel='Next'
            returnKeyType='next'
            style={{width:'75%'}}
            onEndEditing ={()=>{setEditableStatusem(false)}}
            />
            
            <TouchableOpacity onPress={()=>{
              setEditableStatusem(false)
              emailRef.current.focus()

            }}>

            <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

            </TouchableOpacity>        

            </Item>
  <Separator style={{height:5,backgroundColor:'transparent'}}/>
  {/* phone */}
  <Item rounded style={{marginBottom:5}}>
   <Icon style={gstyles.inputicn} name='phone' type='AntDesign'/>
   <TextInput 
   maxLength={13}
    ref={phoneRef}
    value={phone}
    onChangeText={(e)=>{setuserx({...userx,phone:e})}}
    keyboardType='phone-pad' 
    editable ={editableStatusph}
    autoCapitalize='none'
    autoCompleteType='tel'
    enablesReturnKeyAutomatically={true}
    importantForAutofill='auto'
    placeholder="student cell # +92-xxx-xxxxxxx"
    selectionColor="lightgray"
    returnKeyLabel='Next'
    returnKeyType='next'
    style={{width:'75%'}}
    onEndEditing ={()=>{setEditableStatusph(false)}}
    />
            
            
    <TouchableOpacity onPress={()=>{
    setEditableStatusph(true)
    phoneRef.current.focus()
    }}>
    
    <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>
    </TouchableOpacity>        
    </Item>
    <Separator style={{height:5,backgroundColor:'transparent'}}/>
    </CardItem>
  {/* education */}
  <Item rounded style={{marginBottom:5,marginTop:5}}>
          <Icon style={gstyles.inputicn} name='user' type='AntDesign'/>
            <TextInput 
            ref={eduRef}
            value={education}
            editable ={editableStatusedu}
            onChangeText={(e)=>{setuserx({ ...userx, education : e})}}
            keyboardType='name-phone-pad'
            importantForAutofill='auto' 
            autoCapitalize="words"
            enablesReturnKeyAutomatically={true}
            placeholder="Enter Student Education"
            selectionColor="lightgray"
            returnKeyLabel='Next'
            returnKeyType='next'
            style={{width:'75%'}}
            onEndEditing ={()=>{setEditableStatusedu(false)}}
            />
            <TouchableOpacity onPress={()=>{
              setEditableStatusedu(true)
              eduRef.current.focus()
              }}>

            <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

            </TouchableOpacity>        
   </Item>
   <Separator style={{height:10,backgroundColor:'transparent'}}/>

    {/* Marks */}
  <Item rounded style={{marginBottom:5,marginTop:5}}>
          <Icon style={gstyles.inputicn} name='user' type='AntDesign'/>
            <TextInput 
            ref={marksRef}
            value={marks}
            editable ={editableStatusmrks}
            onChangeText={(e)=>{setuserx({ ...userx, marks : e})}}
            keyboardType='name-phone-pad'
            importantForAutofill='auto' 
            autoCapitalize="words"
            enablesReturnKeyAutomatically={true}
            placeholder="Enter Student Marks"
            selectionColor="lightgray"
            returnKeyLabel='Next'
            returnKeyType='next'
            style={{width:'75%'}}
            onEndEditing ={()=>{setEditableStatusmrks(false)}}
            />
            <TouchableOpacity onPress={()=>{
              setEditableStatusmrks(true)
              marksRef.current.focus()
              }}>

            <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

            </TouchableOpacity>        
   </Item>
   <Separator style={{height:10,backgroundColor:'transparent'}}/>

    {/* Grades */}
    <Item rounded style={{marginBottom:5,marginTop:5}}>
          <Icon style={gstyles.inputicn} name='user' type='AntDesign'/>
            <TextInput 
            ref={GradeRef}
            value={grades}
            editable ={editableStatusgrd}
            onChangeText={(e)=>{setuserx({ ...userx, grades : e})}}
            keyboardType='name-phone-pad'
            importantForAutofill='auto' 
            autoCapitalize="words"
            enablesReturnKeyAutomatically={true}
            placeholder="Enter Student Grades ex: A,B,C"
            selectionColor="lightgray"
            returnKeyLabel='Next'
            returnKeyType='next'
            style={{width:'75%'}}
            onEndEditing ={()=>{setEditableStatusgrd(false)}}
            />
            <TouchableOpacity onPress={()=>{
              setEditableStatusgrd(true)
              GradeRef.current.focus()
              }}>

            <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

            </TouchableOpacity>        
   </Item>
   <Separator style={{height:5,backgroundColor:'transparent'}}/>

  <CardItem bordered footer style={gstyles.cardBody} >
    <CardItem style={{flexDirection:'column',width:"100%"}}>
      <Button dark 
      rounded
      full                       
    disabled={((photo === null || photo === 'https://www.washingtonfirechiefs.com/Portals/20/EasyDNNnews/3593/img-blank-profile-picture-973460_1280.png') || (age === null|| age === '') || (name === null || name === '') || (location === '' || location === null || (email === null || email === '') || (phone === null || phone === ''||phone.length > 13 )||(gender !== 'M' && gender !== 'm' && gender !== 'Male'  &&  gender !== 'F' && gender !== 'f' && gender !== 'Female' ))? true :false)}
    androidRippleColor="red"
      style={gstyles.socialloginbtn}
      onPress={()=>{
       props.db(userx,props,setload) }}
      >
          <Text style={gstyles.sociallogintxt}>Update Profile</Text>
      </Button>
   </CardItem>
  </CardItem>
</Card>

}else if(role === 'Company'){
      const {name,id,description,location,email,photo,emailV,creation,phone,role}= userx;
  return <Card style={gstyles.card}>
<CardItem bordered  header style={{justifyContent:'center',alignItems:'center' ,flexDirection:'column'}}>
    <ImageBackground source={{uri:photo}} style={{width:'100%',height:150}} resizeMethod='auto' resizeMode='cover'>  
     
    <TouchableOpacity  style={{alignSelf:'flex-end',backgroundColor:'white',borderRadius:10,padding:3}} onPress={()=>{selectImage()}}><Icon name='camera-retro' type="FontAwesome" style={{color:'black',fontSize:20,textAlign:'center'}} /></TouchableOpacity>
    {isImgLoading? <ActivityIndicator
   color='red'
      size='large'
      style={{height:100,width:100,backgroundColor:'lightgray',alignSelf:'center', borderWidth:2.5,borderColor:'white'}}
      /> :
    <Thumbnail large style={{height:100,width:100,resizeMode:'contain', borderWidth:2.5,borderColor:'white',alignSelf:'center'}} source={{uri:photo}}/>
    }
    <Separator style={{width:'30%',height:2,backgroundColor:'transparent',margin:4,}}/>
    </ImageBackground>
</CardItem>
<CardItem bordered  cardBody style={{flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
{/* name */}
<Item rounded style={{marginBottom:5,marginTop:5}}>
      <Icon style={gstyles.inputicn} name='user' type='AntDesign'/>
        <TextInput 
        ref={nameRef}
        value={name}
        editable ={editableStatusna}
        onChangeText={(e)=>{setuserx({ ...userx, name : e})}}
        keyboardType='name-phone-pad'
        importantForAutofill='auto' 
        autoCapitalize="words"
        autoCorrect={true}
        autoCompleteType='name'
        enablesReturnKeyAutomatically={true}
        placeholder="Enter Company name"
        selectionColor="lightgray"
        returnKeyLabel='Next'
        returnKeyType='next'
        style={{width:'75%'}}
        onEndEditing ={()=>{setEditableStatusna(false)}}
        />
        <TouchableOpacity onPress={()=>{
          setEditableStatusna(true)
          nameRef.current.focus()
          }}>

        <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

        </TouchableOpacity>        
</Item>
<Separator style={{height:10,backgroundColor:'transparent'}}/>
{/* Company Description */}
<Item rounded style={{marginBottom:5}}>
      <Icon style={gstyles.inputicn} name='chevron-triple-up' type='MaterialCommunityIcons'/>
        <TextInput 
        ref={ageRef}
        value={description}
        onChangeText={(e)=>{setuserx({...userx,description:e})}}
        editable ={editableStatusag}
        keyboardType='name-phone-pad' 
        enablesReturnKeyAutomatically={true}
        importantForAutofill='auto'
        placeholder="Enter Company Discription"
        selectionColor="lightgray"
        returnKeyLabel='Next'
        returnKeyType='next'
        style={{width:'75%'}}
        onEndEditing ={()=>{setEditableStatusag(false)}}
        />

        
        <TouchableOpacity onPress={()=>{
          setEditableStatusag(true)
          ageRef.current.focus()
       }}>
        <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

        </TouchableOpacity>        
</Item>
<Separator style={{height:5,backgroundColor:'transparent'}}/>
<Separator style={{height:5,backgroundColor:'transparent'}}/>
{/* Location */}
<Item rounded style={{marginBottom:5}}>
      <Icon style={gstyles.inputicn} name='location-pin' type='SimpleLineIcons'/>
        <TextInput 
        ref={locationRef}
        value={location}
        editable ={editableStatusloc}
        onChangeText={(e)=>{setuserx({...userx,location:e})}}
        keyboardType='email-address' 
        autoCapitalize='words'
        autoCompleteType='street-address'
        importantForAutofill='yes'
        enablesReturnKeyAutomatically={true}
        placeholder="Company Address"
        selectionColor="lightgray"
        returnKeyLabel='Next'
        returnKeyType='next'
        style={{width:'75%'}}
        onEndEditing ={()=>{setEditableStatusloc(false)}}
        />
        
        <TouchableOpacity onPress={()=>{
          setEditableStatusloc(true)
          locationRef.current.focus()

        }}>

        <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

        </TouchableOpacity>        

        </Item>
<Separator style={{height:5,backgroundColor:'transparent'}}/>
{/* mail */}
<Item rounded style={{marginBottom:5}}>
      <Icon style={gstyles.inputicn} name='mail' type='AntDesign'/>
        <TextInput 
        ref={emailRef}
        value={email}
        editable ={editableStatusem}
        keyboardType='name-phone-pad' 
        autoCapitalize='none'
        autoCompleteType='email'
        enablesReturnKeyAutomatically={true}
        importantForAutofill='auto'
        placeholder="Enter Company email"
        selectionColor="lightgray"
        returnKeyLabel='Next'
        returnKeyType='next'
        style={{width:'75%'}}
        onEndEditing ={()=>{setEditableStatusem(false)}}
        />
        
        <TouchableOpacity onPress={()=>{
          setEditableStatusem(false)
          emailRef.current.focus()

        }}>

        <Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>

        </TouchableOpacity>        

        </Item>
<Separator style={{height:5,backgroundColor:'transparent'}}/>
{/* phone */}
<Item rounded style={{marginBottom:5}}>
<Icon style={gstyles.inputicn} name='phone' type='AntDesign'/>
<TextInput 
maxLength={13}
ref={phoneRef}
value={phone}
onChangeText={(e)=>{setuserx({...userx,phone:e})}}
keyboardType='phone-pad' 
editable ={editableStatusph}
autoCapitalize='none'
autoCompleteType='tel'
enablesReturnKeyAutomatically={true}
importantForAutofill='auto'
placeholder="Company # : +92-xxx-xxxxxxx"
selectionColor="lightgray"
returnKeyLabel='Next'
returnKeyType='next'
style={{width:'75%'}}
onEndEditing ={()=>{setEditableStatusph(false)}}
/>
        
        
<TouchableOpacity onPress={()=>{
setEditableStatusph(true)
phoneRef.current.focus()
}}>

<Icon style={gstyles.inputicnr} name='plus' type='FontAwesome'/>
</TouchableOpacity>        
</Item>
<Separator style={{height:5,backgroundColor:'transparent'}}/>
</CardItem>

<CardItem bordered footer style={gstyles.cardBody} >
<CardItem style={{flexDirection:'column',width:"100%"}}>
  <Button dark 
  rounded
  full                       
disabled={((photo === null || photo === 'https://www.washingtonfirechiefs.com/Portals/20/EasyDNNnews/3593/img-blank-profile-picture-973460_1280.png') || (description === null|| description === '') || (name === null || name === '') || (location === '' || location === null || (email === null || email === '') || (phone === null || phone === ''||phone.length > 13 ))? true :false)}
androidRippleColor="red"
  style={gstyles.socialloginbtn}
  onPress={()=>{
   props.db(userx,props,setload) }}
  >
      <Text style={gstyles.sociallogintxt}>Update Profile</Text>
  </Button>
</CardItem>
</CardItem>
</Card>
}

}

  return (
     <Container>
      {isLoading? ( <ActivityIndicator
             color='red'
                size='large'
                style={{marginTop:300}}/> ) :
    ( <Content style={{backgroundColor:'gray'}}>
      {selectrole()}
    
        </Content>
    )
  }



</Container>

    
    )
}

const mapStateToProps = (state) => {
  return({
    state,
})
}

const mapDispatchToProps = (dispatch) => {
  return({
    db : (userx,props,setload)=>{ dispatch(StoreToDB(userx,props,setload)) },
})
}

export default connect(mapStateToProps,mapDispatchToProps)(Uregistry);