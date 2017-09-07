export interface UserState {
    id : string;
    username: string;
    password: string;
    nickname: string;
    avatarUrl: string;
    empno: string;
    position: string;
    department: string;
    patternCode: string;
    myNineCode: string;
    mobile: string;
    telephone: string;
    email: string;
    autoLogin: boolean;
    rememberPWD: boolean;
    preferLang: string
}
export class UserModel implements UserState{
    id: string;
    username: string;
    password: string;
    nickname: string;
    avatarUrl: string;
    empno: string;
    position: string;
    department: string;
    patternCode: string;
    myNineCode: string;
    mobile: string;
    telephone: string;
    email: string;
    autoLogin: boolean;
    preferLang: string;
    rememberPWD: boolean;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
