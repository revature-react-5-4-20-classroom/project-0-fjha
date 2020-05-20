//Reimbursement 
/*
create table ReimbursementType(
 typeid SERIAL PRIMARY KEY,
 "type" text unique not null
);

);*/

export class ReimbursementType {
   typeid: number;
   type:string;

  
  constructor(typeid: number,  type:string){
    this.typeid = typeid;
    this.type = type;
   
   
  }
}