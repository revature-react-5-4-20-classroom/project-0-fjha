// We're going to let users login and have basic authentication/authorization
export class User {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string; // Role will correspond to what level of authorization the user has.
  
  constructor(id:number, username:string, password:string, firstname:string,lastname:string,email:string, role:string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
  }
}