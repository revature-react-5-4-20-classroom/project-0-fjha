// We're going to let users login and have basic authentication/authorization
export class Roles {
  id: number;
  role_name: string; // Role will correspond to what level of authorization the user has.
  
  constructor(id:number,  role_name:string) {
    this.id = id;
    
    this.role_name = role_name;
  }
}