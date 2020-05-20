
import { User } from '../models/User';

import { PoolClient, QueryResult } from 'pg';
import { connectionPool } from '.';
import { Reimbursement} from "../models/Reimbursement";
import { ReimbursementStatus} from "../models/ReimbursementStatus";
import { ReimbursementType} from "../models/ReimbursementType";



// an async function can await Promises instead of using callbacks
// async functions return Promises
// changed
export async function getAllUsersReimbursement(): Promise<Reimbursement[]> {
  let client : PoolClient;
  console.log("in getallusersreimbursement");
  client = await connectionPool.connect();
  console.log("in getallusersreimbursement");
  try {
    let result : QueryResult;
    console.log("in getallusersreimbursement");
    result = await client.query(
      ` SELECT Reimbursement.ReimbursementId, Reimbursement.author, Reimbursement.amount,Reimbursement.datesubmitted,
      Reimbursement.dateresolved, Reimbursement.description, Reimbursement.resolver,Reimbursement.status,Reimbursement.type
      FROM Reimbursement; `
      
    );
    // result.rows contains objects that almost match our User objects.  Let's write a map()
    // that finishes the conversion
    console.log("in getallusersreimbursement after result");
    for(let row of result.rows) {
      console.log(row.username);
    }
    return result.rows.map((u) => {
      return new Reimbursement(u.ReimbursementId, u.author, u.amount, u.datesubmitted,u.dateresolved,u.description, 
        u.resolver,u.status,u.type);
    });
  } catch(e) {
    throw new Error(`Failed to query for all users: ${e.message}`);
  } finally {
    //as a reminder, finally always runs, regardless of success or failure.
    // One of the main uses of finally is to "clean up" whatever you were doing in try{}.
    // In our case, that means releasing our connection back into the pool:
    client && client.release();
  }
}
/*
export function getUserById(id: number) : User {
  return users.filter((user)=>{return user.id === id;})[0];
}
*/
// Add Reimbursement Request.
export async function getAllReimbursementRequest(){
  let client : PoolClient;
  console.log(" In getAllReimbursementRequest "  );
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    console.log(" In getAllReimbursementRequest  Query"  );
    result = await client.query(
      `select Users.id , Users.firstname ,Users.lastname ,Users.email , Reimbursement.amount ,Reimbursement.datesubmitted ,
      Reimbursement.dateresolved ,Reimbursement.status, Reimbursement."type" from Users join reimbursement 
      on Users.id=reimbursement .author 
      join reimbursementtype on reimbursement ."type" =reimbursementtype .typeid 
      join reimbursementstatus on reimbursement .status =reimbursementstatus .statusid ;`
    );
    
    console.log(" Results : " +result );
    return result;
  }
  catch(e)
  {
    throw new Error(`Failed to get all reimbursement results: ${e.message}`);
  } finally {
    client && client.release();
  }
}

// Reimbursement by Id
export async function getreimById(id:number)
{
  let anotherResult = new Array();
  let client : PoolClient;
  console.log(" In getreimById "  + id );
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    console.log(" In getreimById  Query"  );
    result = await client.query(
      `select Users.id , Users.firstname ,Users.lastname ,Users.email , Reimbursement.amount ,Reimbursement.datesubmitted ,
      Reimbursement.dateresolved ,Reimbursement.status, Reimbursement."type" from Users join reimbursement 
      on Users.id=reimbursement .author 
      join reimbursementtype on reimbursement ."type" = reimbursementtype .typeid 
      join reimbursementstatus on reimbursement .status = reimbursementstatus .statusid where Users.id = $1 ;`,[id]
    );
   /*
    let i=result.rowCount;
    let row;
    for(let j=0 ;j<i;j++)
    {
      row=result.rows[j];
      anotherResult.push(row);
      console.log(" In getreimById  Query" + row );
    }*/
   
    //console.log(result.rows[0]);

    return result;
  }
  catch(e)
  {
    throw new Error(`Failed to get all reimbursement results: ${e.message}`);
  } finally {
    client && client.release();
  }
}





export async function addNewReimbursement(reimbursement: Reimbursement) : Promise<Reimbursement> {
  let client : PoolClient = await connectionPool.connect();
  try {
    // We need to send another query to get the appropriate role_id for the user's role.
   // const roleIdResult : QueryResult = await client.query(
    //  `SELECT * FROM roles WHERE roles.role_name = $1`, [reimbursement.author]
    //);
    // Get the id we need from that query result
  //  const roleId = roleIdResult.rows[0].id;
    
    // Actually add the Reimbursement Request, with appropriate role_id
    //u.ReimbursementId, u.author, u.amount, u.datesubmitted,u.dateresolved,u.description, u.resolver,u.status,u.type
    let insertUserResult : QueryResult = await client.query(
      `INSERT INTO Reimbursement (reimbursementId, author, amount, datesubmitted, dateresolved, description, resolver, status, "type") VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, [reimbursement.reimbursementId, reimbursement.author,reimbursement.amount,reimbursement.datesubmitted,
         reimbursement.dateresolved, reimbursement.description ,reimbursement.resolver,reimbursement.status,reimbursement.type]
    )
    
    // Since we're returning the user, pull our newly created user back out of the db:
    let result : QueryResult = await client.query(
      `SELECT reimbursement.reimbursementId, reimbursement.author, reimbursement.amount, reimbursement.datesubmitted,
      reimbursement.dateresolved,reimbursement.description, reimbursement.resolver,reimbursement.status,reimbursement.type
      FROM Reimbursement   WHERE Reimbursement.reimbursementId = $1;`, [reimbursement.reimbursementId]
    );

    return result.rows.map(
      (u)=>{return new Reimbursement(u.reimbursementId, u.author, u.amount,u.datesubmitted,u.dateresolved, u.description, u.resolver,
        u.status,u.type
        )}
    )[0];
  } catch (e) {
    throw new Error(`Failed to add user to DB: ${e.message}`);
  } finally {
    client && client.release();
  }
}

export async function findUserByUsernamePassword(username: string, password: string) : Promise<User> {
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    // above, when retrieving all users, we used a plain old string for our SQL query
    // Using a string is fine provided you never do string concatenation or template literals
    // -- provided you don't produce the string programmatically.
    // If we're producing the string programmatically, then we open ourselves up to SQL Injection
    // SQL Injection is when somehow the user is able to cause unintended SQL queries to be run.
    // We need to be worried about someone attempting to login with the username ';DROP TABLE users'

    // To solve this, we have parameterized queries, where we send a query and the values we want
    // to plug into it together to the database, and the database prevents anything fishy from happening.
    // This will replace the $1 and $2 with username and password respectively:
    result = await client.query(
      `SELECT users.id, users.username, users.password, users.email, roles.role_name
      FROM users INNER JOIN roles ON users.role_id = roles.id
      WHERE users.username = $1 AND users.password = $2;`, [username, password]
    );
    const usersMatchingUsernamePassword = result.rows.map((u) => {
      return new User(u.id, u.username, u.password,u.firstname,u.lastname, u.email, u.role_name);
    })
    if(usersMatchingUsernamePassword.length > 0) {
      return usersMatchingUsernamePassword[0];
    } else {
      throw new Error('Username and Password not matched to a valid user');
    }
  } catch (e) {
    throw new Error(`Failed to validate User with DB: ${e.message}`);
  } finally {
    client && client.release();
  }

  
}
