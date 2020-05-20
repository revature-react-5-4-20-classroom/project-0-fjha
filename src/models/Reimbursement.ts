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
);*/




export class Reimbursement {
   reimbursementId: number;
   author:number;
   amount:number;
   datesubmitted:string;
   dateresolved:string;
   description:string;
   resolver:number;
   status:number;
   type:number;

  
  constructor(reimbursementId: number,  author:number, amount:number, datesubmitted:string,dateresolved:string,description:string, resolver:number,status:number,type:number) {
    this.reimbursementId = reimbursementId;
    this.author = author;
    this.amount = amount;
    this.datesubmitted = datesubmitted;
    this.dateresolved = dateresolved;
    this.description = description;
    this.resolver=resolver;
    this.status = status;
    this.type = type;
   
  }
}