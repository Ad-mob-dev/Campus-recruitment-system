import React ,{ useEffect } from 'react';
import { connect } from 'react-redux';
import {Container,Text, Left,Item,Icon,Thumbnail ,ListItem,Card,CardItem, H3, Separator} from 'native-base';
import CustomHeader from '../components/header';
import { CuSaver } from '../store/actions/action';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {ImageBackground} from 'react-native';



function Dashboard(props) {
    const [modalVisible, setModalVisible] = React.useState(false);
    
    
 useEffect(() => {
     props.update(props);
}, [])


const xew= ()=>{
    const uxr = Object.values(props.state.users);

    switch (props.state.guser.role){
        case "Admin":
            return <>


                </>
            
            break;
        case "Company":
            return <>
            <H3  style={{alignSelf:'center'}}>Student Resume Details</H3>
            
            <FlatList 
            scrollEnabled={true}
                    data ={uxr}
                    ItemSeparatorComponent = {()=>{
                        return <Separator style={{height:1}}/>
                    }}
                      keyExtractor = {(item, index) => index.toString()}
                      key={(item)=> item.key}
                      ListEmptyComponent = { ()=>{
                        return <Text style={{alignSelf:'center',marginTop:300}}>No results Available</Text>
                      }}
                      renderItem={({item})=>{
                        return item.role === 'Student' ?
                            <ListItem key={item.id} avatar={true} style={{justifyContent:'flex-start',padding:10}}>
                              <Thumbnail circular={true} source={{uri:item.photo,}} style={{height:50,width:50,marginRight:10,borderRadius:200}}/>
                                <Text style={{color:'black',overflow:'hidden'}}>{item.name.substring(0,15)}</Text>
                                <Text style={{color:'black',overflow:'hidden'}}>{item.marks}</Text>
                                <Text style={{color:'black',overflow:'hidden'}}>{item.grades}</Text>

                             
                              <Item style={{borderWidth:0,borderColor:'transparent',marginLeft:'auto'}}>
                    <Icon name="mail" type="Octicons" style={{fontSize:30,textAlign:'center'}} 
                  onPress={()=>{Linking.openURL(`mailto:${item.email}`)}}
                  />
                    <Icon name="phone" type='MaterialIcons' style={{ color:'orange',fontSize:30,textAlign:'center'}} 
                  onPress={()=>{Linking.openURL(`tel:${item.phone}`)}}
                   />
                    
                  </Item>
                            </ListItem> 
          :  null
          
          
          
          
          
                      }}
                   
                />
            
                </>

                break;
        case "Student":
                    return <Text style={{alignSelf:'center'}}>Welcome Student</Text>
                    break;
         default:
              return <Text>Default</Text>
               
    }
    
}



return  <Container>
    <CustomHeader title ="Dashboard" nav={props}/>
        {xew()}
        
      
    
</Container>

}

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
        
    export default connect(mapStateToProp,mapDispatchToProp)(Dashboard);
