export class UserModel {
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
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
