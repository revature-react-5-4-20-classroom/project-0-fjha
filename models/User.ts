export class User
{
    id: number
    username : string
    password: string
<<<<<<< HEAD
    firstName: string
    lastName:string
    email: string
    role: string 

    constructor(id:number, username:string, password:string, firstName: string, lastName: string,email:string, role:string)
=======
    first_name: string
    last_name:string
    email: string
    role: string 

    constructor(id:number, username:string, password:string, first_name: string, last_name: string,email:string, role:string)
>>>>>>> 1c9c02bb697034ee56a69d33687682b809815206
    {
        this.id = id;
        this.username = username;
        this.password = password;
<<<<<<< HEAD
        this.firstName = firstName;
        this.lastName = lastName;
=======
        this.first_name = first_name;
        this.last_name = last_name;
>>>>>>> 1c9c02bb697034ee56a69d33687682b809815206
        this.email = email;
        this.role = role;
    }
}