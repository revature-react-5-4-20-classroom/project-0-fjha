//Reimbursement 
/*
create table ReimbursementStatus(
 statusid SERIAL PRIMARY KEY,
 status text unique not null
);


);*/

export class ReimbursementStatus {
   statusid: number;
   status:string;

  
  constructor(statusid: number,  status:string){
    this.statusid = statusid;
    this.status = status;
      
  }
}