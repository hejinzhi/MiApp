export class UserModel {
    username: string;
    password: string;
    nickname: string;
    avatarUrl: string;
    empno: string;
    position: string;
    department: string;
    patternCode: string;
    myNineCode: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}