export class Reimbursements
{
    reimbursementid: number
    author: number
    amount: number
    date_submitted: number
    date_resolved: number
    description: string
    resolver: number
    status: number 
    type: number

    constructor(reimbursementid: number, author: number, amount: number, date_submitted: number, date_resolved: number, description: string, resolver: number, status: number, type: number)
    {
        this. reimbursementid = reimbursementid;
        this.author = author;
        this. amount = amount; 
        this.date_submitted = date_submitted;
        this.date_resolved = date_resolved;
        this.description = description;
        this.resolver = resolver;
        this.status= status;
        this.type = type;
    }


}