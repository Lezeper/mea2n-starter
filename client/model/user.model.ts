export class User {
    email: String;
    name: String;
    password: String;

    constructor(email: String, name: String, password: String ) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
}