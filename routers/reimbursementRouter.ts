import { PoolClient, QueryResult } from "pg";
import { connectionPool } from "../repository";
import express, { Application, Response, Request } from "express";
import { Reimbursements } from "../models/Reimbursements";
import {findReimbursementByStatusId, findReimbursementByUserId, addNewReimbursement, findReimbursementById} from "../repository/reimbursement-data-access"
import { checkLogin} from "../middleware/authMiddleware";

export const reimbursementRouter: Application = express();

reimbursementRouter.get('/status/:id', checkLogin());
reimbursementRouter.get('/status/:id', async (req: Request, res: Response)=>
{
    const id = +req.params.id;
    if(isNaN(id))
    {
        res.status(400).send('Must include numeric id in path');
    }
    else if(id !== 1 && id !== 2 && id !== 3)
    {
        res.status(400).send('Enter a valid status ID: 1, 2 or 3');
    }
    else if(req.session && req.session.user.role !== 'Financial Manager')
    {
        res.status(401).send('You are not authorized to view this page');
    }
    else
    {
        const reimbursements: Reimbursements[] = await findReimbursementByStatusId(id);
        res.json(reimbursements);
        
    }

})

reimbursementRouter.get('/userId/:id', checkLogin());
reimbursementRouter.get('/userId/:id', async (req: Request, res: Response)=>
{
    
    const id = +req.params.id;
    if(isNaN(id))
    {
        res.status(400).send('Must include numeric id in path');
    }
    else if(req.session && (req.session.user.role !== 'Financial Manager' && req.session.user.id !== id))
    {
        res.status(401).send('You are not authorized to view this page');
    }
    else
    {
        const reimbursements: Reimbursements[] = await findReimbursementByUserId(id);
        if(reimbursements.length==0)
        {
            res.status(400).send('No reimbursements Requests submitted by a user with that ID')
        }
        else
        {
        res.json(reimbursements);
        }
    }

})

reimbursementRouter.post('/', async (req: Request, res: Response)=>
{
    console.log("reimbursement router");
    let{reimbursementid ,author, amount, date_submitted, date_resolved, description, resolver, status, type} = req.body;
    if(reimbursementid && author && amount && date_submitted && date_resolved && description && resolver && status && type)
    {
        let newReim = new Reimbursements(reimbursementid, author, amount, date_submitted, date_resolved, description, resolver, status, type)
        await addNewReimbursement(newReim)
        res.status(201).json(newReim);
    }
    else
    {
        res.status(400).send('Please include the required fields');
    }
})
reimbursementRouter.patch('/', checkLogin())
reimbursementRouter.patch('/', async (req: Request, res: Response)=>
{
    console.log(" In the patch");
    const args=req.body;
    if(req.session && req.session.user.role !== 'Financial Manager')
    {
        res.status(401).send('Not authorized to view this page');   
    }
    else
    {
        let client: PoolClient = await connectionPool.connect();
        //client.query("SET search_path TO project_zero");
        if(!args.reimbursementid)
        {
            res.status(400).send(' Please include id in request');
        }
        else
        {
            for(let i in args)
            {
                if(i === "reimbursementid"){}
                else if(i==="author")
                {
                    console.log(" author "+ args.reimbursementid);
                    let result: QueryResult = await client.query(`UPDATE reimbursements SET author = $1 WHERE reimbursementid = $2`, [args[i], args.reimbursementid])
                }
                else if(i==="amount")
                {
                    console.log(" amount "+ args.reimbursementid);
                    let result: QueryResult = await client.query(`UPDATE reimbursements SET amount = $1 WHERE reimbursementid = $2`, [args[i], args.reimbursementid])
                }
                else if(i==="dateSubmitted")
                {
                    let result: QueryResult = await client.query(`UPDATE reimbursements SET dateSubmitted = $1 WHERE reimbursementid = $2`, [args[i], args.reimbursementid])
                }
                else if(i==="dateResolved")
                {
                    console.log(" dateResolved  "+ args.reimbursementid);
                    let result: QueryResult = await client.query(`UPDATE reimbursements SET dateResolved = $1 WHERE reimbursementid = $2`, [args[i], args.reimbursementid])
                }
                else if(i==="description")
                {
                    console.log(" description  "+ args.reimbursementid);
                    let result: QueryResult = await client.query(`UPDATE reimbursements SET description = $1 WHERE reimbursementid = $2`, [args[i], args.reimbursementid])
                }
                else if(i==="resolver")
                {
                    console.log(" resolver  "+ args.reimbursementid);
                    let result: QueryResult = await client.query(`UPDATE reimbursements SET resolver = $1 WHERE reimbursementid = $2`, [args[i], args.reimbursementid])
                }
                else if(i==="status")
                {
                    console.log(" status  "+ args.reimbursementid);
                    let result: QueryResult = await client.query(`UPDATE reimbursements SET status = $1 WHERE reimbursementid = $2`, [args[i], args.reimbursementid])
                }
                else if(i==="type")
                {
                    console.log(" type  "+ args.reimbursementid);
                    let result: QueryResult = await client.query(`UPDATE reimbursements SET type = $1 WHERE reimbursementid = $2`, [args[i], args.reimbursementid])
                }
            }
            const reimbursements: Reimbursements[] = await findReimbursementById(+args.reimbursementid);
            res.json(reimbursements);
        } 
    }
})


