import { USER_LOGOUT, USER_UPDATE } from './../actions/user.action';
import { UserState, UserModel } from './../models/user.model';
import * as user from '../actions/user.action';

const initialState: UserState = (() => {
    let localUserStr = localStorage.getItem('currentUser');
    let initUser = new UserModel('', '');
    if(localUserStr) {
        let user:UserState = Object.assign(initUser,JSON.parse(localUserStr));
        if(user.hasOwnProperty('rememberPWD') && ! user.rememberPWD) {
            user.password = '';
            user.myNineCode = '';
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
    }else {
        return initUser;
    }
})();


export function userReducer(state = initialState, action: user.UserActions): UserState {
    switch (action.type) {
        case user.USER_LOGIN:
            return update(state,action);
        case user.USER_LOGOUT:
            if (state.rememberPWD) {
                return state;
            } else {
                let new_user = Object.assign(state, { password: '' });
                console.log(new_user);
                localStorage.setItem('currentUser', JSON.stringify(new_user));
                return new_user
            }
        case user.USER_UPDATE:
            return update(state,action);
        case user.USER_CHINESECOV :
            return Object.assign(state, action.payload );
        case user.USER_CLEAR:
            localStorage.removeItem('currentUser')
            return new UserModel('','');
        default:
            return state;
    }
}


const update = (state: UserState, action: user.UserActions) => {
    let new_user = Object.assign(state, action.payload);
    localStorage.setItem('currentUser', JSON.stringify(new_user));
    return new_user;
}