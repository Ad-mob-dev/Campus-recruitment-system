import React from 'react';
import { Header,Left,Body,Right,Icon,Title,Thumbnail }  from 'native-base';
import { connect } from 'react-redux';
import { SignOut } from '../store/actions/action';
import { TouchableOpacity } from 'react-native-gesture-handler';

function CustomHeader(props) {

    return (
        <Header androidStatusBarColor='gray' rounded={true} style={{ backgroundColor: 'black' }}>
            <Left style={{ flex: 0 }}>
               <TouchableOpacity onPress={() => props.nav.navigation.openDrawer()} >
                <Icon name='menu' style={{ color: 'white' }} onPress={() => props.nav.navigation.openDrawer()} />
                </TouchableOpacity>
            </Left>
            <Body style={{ flex: 1, alignItems: 'center', width: '100%' }}>
                <Title>{props.title}</Title>
            </Body>
            <Right style={{ flex: 0 }}>
                <TouchableOpacity>
                    {props.title === 'Profile' ? <Icon name='power-off' type='FontAwesome5' style={{ color: 'white', fontSize: 22 }} onPress={() => { props.logout(props) }} /> :
                        <TouchableOpacity onPress={() => { props.nav.navigation.navigate('Profile') }}>
                     {!props.state.guser?
                     null : <Thumbnail circular={true} source={{ uri:!props.state.guser? '': props.nav.state.guser.photo}} style={{ width: 40, height:40,}} />     
                     }
                        </TouchableOpacity>}
                </TouchableOpacity>
            </Right>
        </Header>
    );
}

function mapStateToProp(state) {
    return {
        state,
    }
}

function mapDispatchToProp(dispatch) {
    return {
        logout: (props) => { dispatch(SignOut(props)) },

    }
}

export default connect(mapStateToProp, mapDispatchToProp)(CustomHeader)