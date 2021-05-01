export class SignInData {
    userName: string;
    userPassword: string;

    constructor(username: string, password: string) {
        this.userName = username;
        this.userPassword = password;
    }

    get Login(): string {
        return this.userName;
    }

    get Password(): string {
        return this.userPassword;
    }
}