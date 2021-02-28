import ActionTypes from '../constants/constant'

const INITIAL_STATE = {
    users : [],
    guser : {},
    search : [],
}

export default(state=INITIAL_STATE,action) =>{

    switch(action.type){
            case ActionTypes.authState:
                return({
                    ...state,
                    guser: action.payload,
                })

            case ActionTypes.StoreToDB:
                    return({
                    ...state,
                    guser:action.payload,
                    users :state.users,
                    })
          
            case ActionTypes.getUsers:
                return({

                    users: [...state.users,action.payload.new],
                })

            case ActionTypes.updateUser:
                    return({
                        ...state,
                        guser: action.payload,
                    })        
            case ActionTypes.SIGNOUT:
                return(

                    {
                        guser : [],
                        search : [],
                        users : [],
                        
                    }
                
                    )
             case ActionTypes.QUERYDB:
                return({
                        ...state,
                       search : action.payload ,
                    }) 
            case ActionTypes.CLEAR_USERS:
                return({
                                guser: {...state.guser},
                                users: [],
                      }) 
                                          
        default:
            return state;
    }
}

// case ActionTypes.welcome:
//             return ({
//                 ...state,
//                 name : action.payload.name
//            } )
  // case ActionTypes.SignUpWithEmail:
        //     return({
        //         ...state,
        //         emailuserdata: action.payload,
        //     })