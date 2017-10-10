export interface UserState {
    id : string;
    companyId: string;
    companys: any[];
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
    preferLang: string;
    privilege?: Privilege[];
}
export class UserModel implements UserState{
    id: string;
    companyId: string;
    companys: any[];
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

export interface Privilege {
    moduleID:number;
    function:{FUNCTION_ID:string,FUNCTION_NAME:string,FUNCTION_URL:string,ROLE_ID:number,ROLE_NAME:string}[];
}