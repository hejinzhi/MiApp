import { UserState } from './../models/user.model';
import { Action } from '@ngrx/store';

export const USER_LOGIN = '[User] login';
export const USER_UPDATE = '[User] update ';
export const USER_LOGOUT = '[User] logout';
export const USER_CLEAR = '[User] clear';
export const USER_CHINESECOV = '[User] chineseConv';

export class User_Login implements Action {
  readonly type = USER_LOGIN;
  payload: UserState;
  constructor(token: UserState) {
    this.payload = token;
  }
}

export class User_Logout implements Action {
  readonly type = USER_LOGOUT;
  payload: any;
}

export class User_Clear implements Action {
  readonly type = USER_CLEAR;
  payload: any;
}

export class User_ChineseConv implements Action {
  readonly type = USER_CHINESECOV;
  payload: any;
  constructor(avatar: any) {
    this.payload = avatar;
  }
}

export class User_Update implements Action {
  readonly type = USER_UPDATE;
  payload: any;
  constructor(avatar: any) {
    this.payload = avatar;
  }
};


export type UserActions = User_Login | User_Logout | User_Update | User_ChineseConv | User_Clear;
