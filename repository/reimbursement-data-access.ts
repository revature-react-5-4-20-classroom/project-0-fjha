import {  Reimbursements } from "../models/Reimbursements";
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";


export async function findReimbursementByStatusId(id: number): Promise<Reimbursements[]> 
{
     let client: PoolClient
    client = await connectionPool.connect();
   // client.query("SET search_path TO project_zero");
    try
    {
        let result: QueryResult
        result = await client.query(`SELECT * FROM reimbursements WHERE $1 = status ORDER BY date_submitted`, [id]);
        const matchingReim = result.rows.map((r)=>
        {
            return new Reimbursements(r.id, r.author, r.amount, r.date_submitted, r.date_resolved, r.description, r.resolver, r.status, r.type)
        })
        console.log(matchingReim);
        return matchingReim;
   
    }
    catch(e)
    {
        throw new Error(`Query failed ${e.message}`);
    }
    finally
    {
        client && client.release();
    }
}
export async function findReimbursementByUserId(id: number): Promise<Reimbursements[]> 
{
    let client: PoolClient
    client = await connectionPool.connect();
   // client.query("SET search_path TO project_zero");
    try
    {
        let result: QueryResult
        result = await client.query(`SELECT * FROM reimbursements WHERE $1 = author ORDER BY date_submitted`, [id]);
        const matchingReim = result.rows.map((r)=>
        {
            return new Reimbursements(r.id, r.author, r.amount, r.date_submitted, r.date_resolved, r.description, r.resolver, r.status, r.type)
        })
        return matchingReim;
   
    }
    catch(e)
    {
        throw new Error(`Query failed ${e.message}`);
    }
    finally
    {
        client && client.release();
    }
}

export async function findReimbursementById(id: number): Promise<Reimbursements[]> 
{
     let client: PoolClient
    client = await connectionPool.connect();
   // client.query("SET search_path TO project_zero");
    try
    {
        let result: QueryResult
        result = await client.query(`SELECT * FROM reimbursements WHERE $1 = reimbursementid ORDER BY date_submitted`, [id]);
        const matchingReim = result.rows.map((r)=>
        {
            return new Reimbursements(r.reimbursementid, r.author, r.amount, r.date_submitted, r.date_resolved, r.description, r.resolver, r.status, r.type)
        })
        return matchingReim;
   
    }
    catch(e)
    {
        throw new Error(`Query failed ${e.message}`);
    }
    finally
    {
        client && client.release();
    }
}

export async function addNewReimbursement(r: Reimbursements): Promise<Reimbursements>
{
      console.log("reimbursement data access");
   
    let client: PoolClient = await connectionPool.connect();
    //client.query("SET search_path TO project_zero");
    try
    {   
       // const idRes: QueryResult = await client.query(`SELECT * FROM users WHERE id = $1`, [r.reimbursementid]);
       // const reimbursementid = idRes.rows[0].id;
        const authorRes: QueryResult = await client.query(`SELECT * FROM users WHERE id = $1`, [r.author]);
        const author = authorRes.rows[0].id;
        const resolverRes: QueryResult = await client.query(`SELECT * FROM users WHERE id = $1`, [r.resolver]);
        const resolver = resolverRes.rows[0].id;
        const statusRes: QueryResult = await client.query(`SELECT * FROM reimbursement_status WHERE statusid = $1`, [r.status]);
        const status = statusRes.rows[0].id;
        const typeRes: QueryResult = await client.query(`SELECT * FROM reimbursement_type WHERE typeid = $1`, [r.type]);
        const type = typeRes.rows[0].id;
        let insertReimResult: QueryResult = await client.query(`INSERT INTO reimbursements (reimbursementid,author, amount, date_submitted, date_resolved, description, resolver, status, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9)`, [r.reimbursementid,r.author, r.amount, r.date_submitted, r.date_resolved, r.description, r.resolver, r.status, r.type])
        return r;

    }
    catch(e)
    {
        throw new Error(`Failed to add new reimbursement: ${e.message}`);
    }
    finally
    {
        client && client.release();
    }
}



