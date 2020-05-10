export interface User {
    uid?: Number;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    dateOfBirth : Date;
    address : String;
    city: String;
    zipCode: String;
    country: String;
    username: String;
    password: String;
    requests?: Request[]; 
}
