import express, { Application, Request, Response } from "express";
import bodyParser from 'body-parser';
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from "../repository";
import { User } from "../models/User";
import { userRouter } from "../routers/userRouter";
import { findUserByUsernamePassword } from "../repository/user-data-access";
import { sessionMiddleware } from "../middleware/sessionMiddleware";
import { reimbursementRouter } from "../routers/reimbursementRouter";

const app: Application = express();
const PORT = 1995;

app.use(bodyParser.json());
app.use(sessionMiddleware);



app.post('/login',  async (req: Request, res: Response)=>
{
    const {username, password} = req.body;
    
    console.log(username ) ;
    
    console.log(password ) ;
    if(!username || !password)
    {
        res.status(400).send('Please include username and password');
    }
    else
    {
        try
        {
            const user = await findUserByUsernamePassword(username, password);
            if(req.session)
            {
                req.session.user = user;
            }
            res.json(user)
        }
        catch (e)
        {
            console.log(e.message);
            res.status(400).send('invalid Credentials');
        }
    }
})

app.listen(1995, () => {

    // The following involves 3 different async steps.  Right now we're in a callback
    // function that runs asynchronously when the express application starts.
    // In this callback, we connect to the database, which is asynchronous, so we specify
    // a callback for that.  In that callback, we query the database, which is asynchronous,
    // so we specify a callback for it too.
    // One of the reasons async/await was added to JS was to avoid "callback hell"
  
    console.log("app has started, testing connection:");
    // connectionPool.connect() returns a Promise of a PoolClient
    // we specify functionality for when the PoolClient arrives via callbacks:
    // .then(onSuccess) specifies behaviour when the Promise resolves successfully
    // .catch(onFailure) specifies behaviour when the Promise is rejected (fails).
    connectionPool.connect().then(
      (client: PoolClient)=>{
        console.log('connected');
        // try to query tracks
        // client.query returns a Promise of a query result
        
        client.query('SELECT * FROM users;').then(
          (result : QueryResult) => {
            console.log(result.rows[0]);
          }
        )
    }).catch((err)=>{
      console.error(err.message);
    })
  });
  

app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);