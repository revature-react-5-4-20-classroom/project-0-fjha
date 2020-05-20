import express, { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import {Reimbursement} from '../models/Reimbursement'
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
  
  res.json(getAllReimbursementRequest());
  

});

reimbursementRouter.get('/:reimbyid' , async (req: Request, res: Response) => {

  const id= +req.params.reimbyid;
  console.log(" In get by id " + id);
  //if(isNaN(id)) {
  //  res.status(400).send('Must include numeric id in path');
 // } else {
  try{

   //res.setHeader('Content-Type', 'application/json');
  console.log(JSON.stringify(getreimById(id)));
  res.json(JSON.stringify(getreimById(id)));
  //res.(JSON.stringify(getreimById(id)));
  
  //.json(getreimById(id));
  //res.send(getreimById(id));
  }
  catch(e)
  {
    console.log(e.meaage);
  }
  //}
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