import React,{ useEffect } from 'react';
import { Container, Content, Body } from 'native-base';
import CustomHeader from '../components/header';
import { connect } from 'react-redux';
import { Uregistry } from './uregistry';
import { CuSaver, StoreToDB } from '../store/actions/action';


 
function Profile(props) {

    useEffect(() => {          
          
        props.update(props);
       
    },[])
    

    return (

        <Container>
         <CustomHeader title="Profile" nav={props}/>
         <Content>
         <Body>
         <Uregistry {...props}/>   
         </Body>       
         </Content>
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
        db : (userx,props,setload)=>{ dispatch(StoreToDB(userx,props,setload)) },
        update : (props)=>{dispatch(CuSaver(props)) }
    })
}
export default connect(mapStateToProp,mapDispatchToProp)(Profile);
