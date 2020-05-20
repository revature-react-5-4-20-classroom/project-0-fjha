drop table users;
drop table roles;
drop table reimbursement ;
drop table reimbursementtype ;
drop table reimbursementstatus ;


select * from users ;
select * from roles ;
select * from reimbursement ;
select * from reimbursementstatus;
select * from reimbursementtype;


--INSERT INTO roles(role_name) VALUES ('Employee'), ('Manager');
INSERT INTO roles(role_name) VALUES ('Admin'), ('User');
INSERT INTO users VALUES (DEFAULT, 'empl', 'wasspord','empl','empl', 'empl@gmail.com', 1);
INSERT INTO users VALUES (DEFAULT, 'manage', 'wasspord','mana','mana', 'mana@gmail.com', 2);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role_name TEXT UNIQUE NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL, -- username should be UNIQUE
  "password" TEXT NOT NULL, -- one of the stretch goals is to hash + salt passwords.
  -- storing passwords as plaintext is a bad idea.  You can use bcrypt off npm
  firstname text not null,
  lastname  text not null,
  email TEXT NOT NULL,
  -- We can have a FOREIGN KEY constraint, where role_id references a role.
  -- REFERENCES makes a FK referencing id on the roles table.
  role_id INTEGER REFERENCES roles(id)
  -- another option for foreign key:
  -- CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

create table ReimbursementStatus(
 statusid SERIAL PRIMARY KEY,
 status text unique not null
);
insert into ReimbursementStatus values(default,'pending');
insert into ReimbursementStatus values(default,'approved');
insert into ReimbursementStatus values(default,'denied');


insert into reimbursementtype values(default, 'Lodging');
insert into reimbursementtype values(default, 'Travel');
insert into reimbursementtype values(default, 'Food');
insert into reimbursementtype values(default, 'Other');



truncate table reimbursementstatus 
truncate table reimbursement 


create table ReimbursementType(
 typeid SERIAL PRIMARY KEY,
 "type" text unique not null
);


create table Reimbursement(
reimbursementId serial primary key,
author integer references Users(id),
amount integer not null,
datesubmitted varchar not null,
dateresolved varchar not null,
description varchar not null,
resolver integer references Users(id),
status integer references ReimbursementStatus(statusid),
"type" integer references ReimbursementType(typeid)
);

INSERT INTO Reimbursement VALUES (DEFAULT, 1, 200,'5/9/2020','5/18/2020',
'employee general description',2,2,1);


SELECT * FROM Reimbursement;
select * from users;
select * from reimbursementstatus;
select * from reimbursementtype;
select * from roles;

-- See ticket "for" an id .

/* Reimbursement details seen by the Admin */

select Users.id , Users.firstname ,Users.lastname ,Users.email , Reimbursement.amount ,Reimbursement.datesubmitted ,
Reimbursement.dateresolved ,Reimbursement.status, Reimbursement."type" from Users join reimbursement 
on Users.id=reimbursement .author 
join reimbursementtype on reimbursement ."type" =reimbursementtype .typeid 
join reimbursementstatus on reimbursement .status =reimbursementstatus .statusid 


SELECT Reimbursement.ReimbursementId, Reimbursement.author, Reimbursement.amount,Reimbursement.datesubmitted,
      Reimbursement.dateresolved, Reimbursement.description, Reimbursement.resolver,Reimbursement.status,Reimbursement.type
      FROM Reimbursement;




