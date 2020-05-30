import express, { Router, Request, Response } from 'express';
import { Book } from '../models/Book';
import { PoolClient, QueryResult } from "pg";
import { connectionPool } from "../repository";

export const bookRouter : Router = express.Router();

bookRouter.get('/', async (req:Request, res: Response)=>
{
    
        const books: Book[] = await getAllBooks();
        res.json(books);
    
});


export async function getAllBooks(): Promise<Book[]> {
  let client : PoolClient;
  client = await connectionPool.connect();
  try {
    let result : QueryResult;
    result = await client.query(
      `SELECT books.id, books.title, books.author, books.year_published, books.word_count
      FROM books;`
    );
    // result.rows contains objects that almost match our User objects.  Let's write a map()
    // that finishes the conversion
    for(let row of result.rows) {
      console.log(row.username);
    }
    return result.rows.map((u) => {
      return new Book(u.id, u.title, u.author, u.year_published, u.word_count);
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
 let result: QueryResult;
        result = await client.query(`SELECT users.id, users.username, users.password, users.first_name, 
        users.last_name, users.email, roles.role_name FROM users INNER JOIN roles ON users.role_id = roles.id`);
        console.log(result.rows);
        return result.rows.map((u)=>
        {
            return new User(u.id, u.username, u.password, u.first_name, u.last_name, u.email, u.role_name);
        })
function getBookById(id: number): Book {
  // Filter book array by id, then return the first/only book left
  return books.filter((book) => {
    return book.id === id;
  })[0];
}

function getAllBooks(): Book[] {
  return books;
}

// Responsible for putting completed Book objects in DB, not for constructing books
// Returns the book that was added
function addNewBook(book: Book): Book {
  // We should validate that the id is not already taken
  const booksMatchingId : Book[] = books.filter(
    (bookElement: Book) => {
      return bookElement.id === book.id;
    }
  );
  if (booksMatchingId.length === 0) {
    books.push(book);
    return book;
  } else {
    throw new Error('Book Id already taken');
  }
}
bookRouter.post('/', (req:Request, res:Response) => {
  // Lets at least validate by checking for the existence of fields
  // We'll use a tool called Object destructuring:
  // This sets id, title, author, yearPublished, and wordCount
  let {id, title, author, yearPublished, wordCount} = req.body;
  // validate we received required fields:
  if(id && title && author && yearPublished) {
    addNewBook(new Book(id, title, author, yearPublished, wordCount));
    //If an error gets thrown, res.sendStatus(201) won't run.
    res.sendStatus(201);
  } else {
    // set response status to 400 and send appropriate message:
    res.status(400).send('Please include required fields.')
  }
});

//We're going to use a path parameter to get by id.  The syntax
// for parameter in the path is :param
// this will match books/1, books/2, books/50, ... (also books/notanum)
bookRouter.get('/:id', (req: Request, res: Response) => {
  // We access path paramers with req.params.param
  const id = +req.params.id; //The '+' converts our param to a number
  if(isNaN(id)) {
    res.status(400).send('Must include numeric id in path');
  } else {
    res.json(getBookById(id));
  }
});
*/