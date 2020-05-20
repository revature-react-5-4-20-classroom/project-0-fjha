//Reimbursement 
/*
reimbursementId serial primary key,
author integer references Users(id),
amount integer not null,
datesubmitted varchar not null,
dateresolved varchar not null,
description varchar not null,
resolver integer references Users(id),
status integer references ReimbursementStatus(statusid),
"type" integer references ReimbursementType(typeid)
);
select Users.id , Users.firstname ,Users.lastname ,Users.email , Reimbursement.amount ,Reimbursement.datesubmitted ,
      Reimbursement.dateresolved ,Reimbursement.status, Reimbursement."type" 
*/




export class ReimbursementWithId {
   id: number;
   firstname:string;
   lastname:string;
   email:string;
   amount:number;
   datesubmitted:string;
   dateresolved:string;
   status:number;
   type:number;

  
  constructor(id: number,  firstname:string, lastname:string, email:string,amount:number,datesubmitted:string, 
    dateresolved:string,status:number,type:number) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.amount = amount;
    this.datesubmitted = datesubmitted;
    this.dateresolved=dateresolved;
    this.status = status;
    this.type = type;
   
  }
}