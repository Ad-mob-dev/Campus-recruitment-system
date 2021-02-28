import { Alert } from 'react-native';
import database from '@react-native-firebase/database';
import auth, { firebase } from '@react-native-firebase/auth';
import ActionTypes from '../constants/constant';


export  function SignUpWithEmail (email,password,props,role){
    const {users} = props.state;   
    
    return async (dispatch)=>{

    await firebase.auth().createUserWithEmailAndPassword(email,password).then((user)=>{
            user = user.user;       
            if(role === 'Student'){

                const guser = {
                    name : user.displayName,
                    id : user.uid,
                    age: null,
                    email : user.email,
                    photo : 'https://www.washingtonfirechiefs.com/Portals/20/EasyDNNnews/3593/img-blank-profile-picture-973460_1280.png',
                    emailV : user.emailVerified,
                    creation : Date.now(),
                    phone : user.phoneNumber,
                    gender : null,
                    location: null,
                    role : role,
                }
                const filtereduser = users.filter((v)=> v.id === guser.id);
                dispatch({type:ActionTypes.authState,payload:guser})

                    if(filtereduser.length <= 0){
                    
                        props.navigation.navigate('UserRegistry')
    
                    }else{
                       props.navigation.navigate('Dashboard')
                     }      
            }else if(role === 'Company'){
                const guser = {
                    name : user.displayName,
                    id : user.uid,
                    description: null,
                    email : user.email,
                    photo : 'https://www.washingtonfirechiefs.com/Portals/20/EasyDNNnews/3593/img-blank-profile-picture-973460_1280.png',
                    emailV : user.emailVerified,
                    creation : Date.now(),
                    phone : user.phoneNumber,
                    location: null,
                    role : role,
                }
                const filtereduser = users.filter((v)=> v.id === guser.id);
                dispatch({type:ActionTypes.authState,payload:guser})

                    if(filtereduser.length <= 0){
                    
                        props.navigation.navigate('UserRegistry')
    
                    }else{
                       props.navigation.navigate('Dashboard')
                     }      
                }else if(role === 'Admin'){
                    const guser = {
                        name : user.displayName,
                        id : user.uid,
                        description: null,
                        email : user.email,
                        photo : 'https://www.washingtonfirechiefs.com/Portals/20/EasyDNNnews/3593/img-blank-profile-picture-973460_1280.png',
                        emailV : user.emailVerified,
                        creation : Date.now(),
                        phone : user.phoneNumber,
                        location: null,
                        role : role,
                    }
                    const filtereduser = users.filter((v)=> v.id === guser.id);
                    dispatch({type:ActionTypes.authState,payload:guser})
    
                        if(filtereduser.length <= 0){
                        
                            props.navigation.navigate('UserRegistry')
        
                        }else{
                           props.navigation.navigate('Dashboard')
                         }      
                }
                        
    }).catch( 
            (e)=>{
                props.navigation.navigate('Sign In');
                 Alert.alert("ERROR",`Code :${e.code +' Message:'+ e.message}`)
                });
     
    }
}

export function LoginWithEmail (email,password,props,setload,role){
    const {users} = props.state;  
    setload(true) 
    return (dispatch)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
                user = user.user;       
                if(role === 'Student'){

                    const guser = {
                        name : user.displayName,
                        id : user.uid,
                        age: null,
                        email : user.email,
                        photo : 'https://www.washingtonfirechiefs.com/Portals/20/EasyDNNnews/3593/img-blank-profile-picture-973460_1280.png',
                        emailV : user.emailVerified,
                        creation : Date.now(),
                        phone : user.phoneNumber,
                        gender : null,
                        location: null,
                        role : role,
                    }
                    const filtereduser = users.filter((v)=> v.id === guser.id);
                      dispatch({type:ActionTypes.authState,payload:guser})

                        if(filtereduser.length <= 0){
                            setload(false)
                            props.navigation.navigate('UserRegistry')
        
                        }else{
                            setload(false)
                            props.navigation.navigate('Dashboard')
                         }
                }else if(role === 'Company'){
                    const guser = {
                        name : user.displayName,
                        id : user.uid,
                        description: null,
                        email : user.email,
                        photo : 'https://www.washingtonfirechiefs.com/Portals/20/EasyDNNnews/3593/img-blank-profile-picture-973460_1280.png',
                        emailV : user.emailVerified,
                        creation : Date.now(),
                        phone : user.phoneNumber,
                        location: null,
                        role : role,
                    }
                    const filtereduser = users.filter((v)=> v.id === guser.id);
                      dispatch({type:ActionTypes.authState,payload:guser})

                        if(filtereduser.length <= 0){
                            setload(false)
                            props.navigation.navigate('UserRegistry')
        
                        }else{
                            setload(false)
                            props.navigation.navigate('Dashboard')
                         }
    
                    }else if(role === 'Admin'){
                        const guser = {
                            name : user.displayName,
                            id : user.uid,
                            description: null,
                            email : user.email,
                            photo : 'https://www.washingtonfirechiefs.com/Portals/20/EasyDNNnews/3593/img-blank-profile-picture-973460_1280.png',
                            emailV : user.emailVerified,
                            creation : Date.now(),
                            phone : user.phoneNumber,
                            location: null,
                            role : role,
                        }
                        const filtereduser = users.filter((v)=> v.id === guser.id);
                      dispatch({type:ActionTypes.authState,payload:guser})

                        if(filtereduser.length <= 0){
                            setload(false)
                            props.navigation.navigate('UserRegistry')
        
                        }else{
                            setload(false)
                            props.navigation.navigate('Dashboard')
                         }
                    }
                        
                     
                    
        }).catch( 
                (e)=>{
                    setload(false)
                    props.navigation.navigate('Sign In');
                     Alert.alert("ERROR",`Code :${e.code +' Message:'+ e.message}`)
                    });
    }
}


export function getUsers(){
    return (dispatch)=>{

        firebase.database().ref('users/').orderByChild('name').once('value',async (v) => {
            v.forEach((value) => {
              dispatch({ type: ActionTypes.getUsers, payload: { new: value.val() } });
            });
        })
}
}


     
export function StoreToDB(user,props,setload){
    setload(true)
    return (dispatch)=>{
  database().ref('users/').child(user.id).set(user).then(
     ()=>{ 
        dispatch({type: ActionTypes.StoreToDB,payload:user})
        Alert.alert('Congratulations','profile Updated Successfully')
        props.navigation.navigate('Dashboard');
        setload(false)

    }
).catch((e)=>{ 
    
    setload(false)
    Alert.alert(e.code,e.message)})

    }
    
}


export function SignOut(props){
    return (dispatch)=>{
        if (auth().currentUser.emailVerified === false){
          auth().signOut().then(()=>{
            Alert.alert('Logged Out','User Successfully Logged Out');            
             dispatch({type:ActionTypes.SIGNOUT,payload :{}})
            props.nav.navigation.replace('Sign In');

        }).catch( 
            (e)=>{
             Alert.alert("ERROR",`Code :${e.code +' Message:'+ e.message}`)
            });    
        }else{
         GoogleSignin.revokeAccess();
         GoogleSignin.signOut().then(()=>{
            Alert.alert('Logged Out','User Successfully Logged Out');
            dispatch({type:ActionTypes.SIGNOUT,payload :{}})
            props.nav.navigation.replace('Sign In');

        }).catch( 
            (e)=>{
             Alert.alert("ERROR",`Code :${e.code +' Message:'+ e.message}`)
            }); 
        }

    }
}

export function CuSaver(props){
    const {users} = props.state;
    return (dispatch)=>{
     users.map((v)=>{
        
        if(v.id === props.state.guser.id)
        {     
            dispatch({type:ActionTypes.updateUser,payload : v})

        }

    })

        
        }
} 



export function clear(){
    return (dispatch) =>{
        dispatch({type:ActionTypes.CLEAR_USERS,payload:{}})


    }
}