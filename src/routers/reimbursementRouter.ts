import express, { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import {Reimbursement} from '../models/Reimbursement'
import {ReimbursementAll} from '../models/ReimbursementAll'
import {ReimbursementWithId} from '../models/ReimbursementWithId'
import { authAdminMiddleware, authRoleFactory } from '../middleware/authMiddleware';
import { getAllUsers, addNewUser} from '../repository/user-data-access';

import {getAllUsersReimbursement ,addNewReimbursement ,getAllReimbursementRequest ,getreimById} from '../repository/reimbursement-data-access';
export const reimbursementRouter: Router = express.Router();
export const userRouter: Router = express.Router();



//Apply our Admin Middleware on userRouter
//reimbursementRouter.use(authRoleFactory(['Admin']));

// have an async callback to work with our asynchronous data access
//changed
reimbursementRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
  // get all users, using async/await
  const users : Reimbursement[] = await getAllUsersReimbursement();
  res.json(users);
  } catch (e) {
    next(e);
  }
});

reimbursementRouter.post('/', async (req: Request, res: Response) => {
 
  let {reimbursementId, author, amount, datesubmitted , dateresolved , description ,resolver ,status ,type } = req.body;
  console.log(" Post submission :" + reimbursementId + author + amount+ datesubmitted+  dateresolved+ description + resolver +status+type);
  if(reimbursementId && author && amount && datesubmitted && dateresolved && description && resolver && status && type) {
    
    console.log(" Post submission :"  );
    await addNewReimbursement(new Reimbursement(reimbursementId, author, amount, datesubmitted, dateresolved, description, resolver, status, type));
    res.sendStatus(201);
  } else {
    res.status(400).send('Please include required fields.');
  }
});



reimbursementRouter.get('/allreq' , async (req: Request, res: Response) => {
  
  try {
    // get all users, using async/await
    const reim : ReimbursementAll[] = await getAllReimbursementRequest();
    res.json(reim);
    } catch (e) {
     // next(e);
    }
 // res.json(getAllReimbursementRequest());
  

});

reimbursementRouter.get('/:reimbyid' , async (req: Request, res: Response) => {

  const id= +req.params.reimbyid;
  console.log(" In get by id " + id);
  if(isNaN(id)) {
   res.status(400).send('Must include numeric id in path');
 } else {
   /*
  try{
  
      let resultsreceived=JSON.stringify(getreimById(id));
      let resultsreceivedJson=JSON.parse(resultsreceived);
     // console.log("  Results "+ getreimById(id));
     // res.status(400).send('You are getting records '+ resultsreceived) ;
     //res.type('application/json');
    // res.send(getreimById(id));
    // res.set('Content-Type', 'text/csv').send(getreimById(id));
     //  let requestString=   (JSON.stringify(getreimById(id)));
    //   requestString= requestString.replace("[" ,"");
    //   requestString= requestString.replace("]" ,"");
    console.log("  request received :"+( (getreimById(id))).toString);
    console.log("  request sending :");
    //res.send(resultsreceived);
     //res.json(JSON.stringify(getreimById(id)));
    //  res.json(requestString);
    // res.format(res.send(getreimById(id)));
    res.json(getreimById(id));
*/
try {
  // get all users, using async/await
  const reim : ReimbursementWithId[] = await getreimById(id);
  res.json(reim);
  } catch (e) {
   // next(e);
  

  }
  
}
 // res.json(getAllReimbursementRequest());
 //res.json(getreimById(id));

});

/*

userRouter.get('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  if(isNaN(id)) {
    res.status(400).send('Must include numeric id in path');
  } else {
    res.json(getUserById(id));
  }
});
*/