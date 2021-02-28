import React ,{ useEffect } from 'react';
import { connect } from 'react-redux';
import {Container,Content,Text, Left,Icon, Body,View,Thumbnail ,Card,CardItem,DeckSwiper, Badge} from 'native-base';
import { ImageBackground, Linking } from 'react-native';
import {CuSaver} from '../store/actions/action';
import {StyleSheet,Image,Dimensions} from 'react-native';
import CustomHeader from '../components/header';


function Home(props) {
  useEffect(() => {          
          
      props.update(props);
        
       
    },[])

    const {users} = props.state;
    const {guser}= props.state;
   
    return (
    <Container>
          <>
          <CustomHeader title ="Home" nav={props}/>
          <Content>
          <ImageBackground source={require('../assets/home_cover.jpg')} style={{width:'auto',height:131}} resizeMode='stretch'>

          </ImageBackground>
              <Text style={{justifyContent:'center',alignItems:'center',color:'white',fontSize:25,textAlign:'center' ,backgroundColor:'black',width:'100%',height:42}} >All Donors</Text>
       
           <View style={{height:455,width:Dimensions.get('screen').width,alignSelf:'center'}}>          
           {props.state.users? <DeckSwiper
            dataSource={users}
            renderItem={item => 
              <Card style={{ elevation: 1,}}>
                <CardItem header bordered style={{backgroundColor:'black'}} >
                  <Left>
         
                    <Thumbnail source={{uri:item.photo}} />
                    <Body>
                      <Text style={{color:"white"}} numberOfLines={1} ellipsizeMode='head'>{item.name}</Text>
                      <Text  note>{item.location}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem style={{backgroundColor:'black'}}  bordered>
                  <Image style={{ height: 180, flex: 1,resizeMode:'cover'}} source={{uri:item.photo}} />
                </CardItem>
                
                <CardItem bordered style={{justifyContent:'space-evenly',alignItems:'center',backgroundColor:'black'}}>
       
                {/* 1 */}
                <CardItem button style={{elevation:1,backgroundColor:'white'}}>
                <Icon name="mail" style={{ color:item.gender === 'Male' || item.gender === 'male' || item.gender === 'm' || item.gender === 'M'? '#0d0514' : '#ED4A6A',fontSize:28,textAlign:'center'}} 
                  onPress={()=>{Linking.openURL(`mailto:${item.email}`)}}
                  />
                </CardItem>
                

                
                {/* 2 */}
                <CardItem button style={{elevation:1,borderColor:'gray',backgroundColor:'white'}}>
                  <Icon name="old-phone" type='Entypo' style={{ color:item.gender === 'Male' || item.gender === 'male' || item.gender === 'm' || item.gender === 'M'? '#0d0514' : '#ED4A6A' ,fontSize:28,textAlign:'center'}} 
                  onPress={()=>{Linking.openURL(`tel:${item.phone}`)}}
                   />
                
                </CardItem>
                
                {/* 3 */}
                <CardItem button  style={{elevation:1,backgroundColor:'white'}}>
                  <Icon name="whatsapp" type='FontAwesome' style={{ color:item.gender === 'Male' || item.gender === 'male' || item.gender === 'm' || item.gender === 'M'? '#0d0514' : '#ED4A6A',fontSize:28,textAlign:'center'}} 
                  onPress={()=>{Linking.openURL(`whatsapp://send?text= Hello Dear ( ${item.name} ), I Hope you're Fine !! I've Found you on Donor's Dock with location ( ${item.location} ),I need ( ${item.bloodgrp} ) blood type urgently.. Can you help ?? &phone= ${item.phone}`)}}
                  />
                
                </CardItem>
                

                </CardItem>
                
                <CardItem bordered style={{justifyContent:'space-evenly',alignItems:'center',backgroundColor:'black'}}>

                 <CardItem button style={{elevation:1,backgroundColor:'white'}}>
                  <Icon style={{fontWeight:'bold'}} name= {item.gender === 'Male' || item.gender === 'male' || item.gender === 'm' || item.gender === 'M' ? 'gender-male' : 'gender-female'} type='MaterialCommunityIcons' style={{ color:item.gender === 'Male' || item.gender === 'male' || item.gender === 'm' || item.gender === 'M' ? '#0d0514' : '#ED4A6A'}} />
                  <Text style={{fontWeight:'bold'}}>{item.gender.slice(0,1)}</Text>
                </CardItem>
  
                  
                <CardItem button style={{elevation:1,backgroundColor:'white'}}>
                  <Icon style={{fontWeight:'bold'}} name="sort-amount-up" type="FontAwesome5" style={{color:item.gender === 'Male' || item.gender === 'male' || item.gender === 'm' || item.gender === 'M' ? '#0d0514' : '#ED4A6A'}} />
                  <Text style={{fontWeight:'bold'}}>{item.age}</Text>
                </CardItem>
                  
                <CardItem button style={{elevation:1,backgroundColor:'white'}}>
                  <Icon style={{fontWeight:'bold'}} name="drop" type="Entypo" style={{ color:item.gender === 'Male' || item.gender === 'male' || item.gender === 'm' || item.gender === 'M' ? '#0d0514' : '#ED4A6A' }} />
                  <Text  style={{fontWeight:'bold'}}>{item.bloodgrp}</Text>
                </CardItem>
                  
                </CardItem>
                 </Card> 
                   
            }
            /> : <Text>No Data Available</Text>
          }
            </View>

            <Image source={require('../assets/chart.jpg')} style={{width:'100%',height:260,}} resizeMode='cover'/>
            <ImageBackground source={require('../assets/frnd.gif')} style={{width:'100%',height:300,}} resizeMode='contain'>

            </ImageBackground>

         </Content>
        </>

    </Container>

  );
}

const styles = StyleSheet.create({
    themetextcolor : { 
        color:'white'
        
    }
})

function mapStateToProp(state){
return ({
    state,
})
}

function mapDispatchToProp(dispatch){
    return ({
        update : (props)=>{dispatch(CuSaver(props)) }
    })
    }
    
export default connect(mapStateToProp,mapDispatchToProp)(Home);
