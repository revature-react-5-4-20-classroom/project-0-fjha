// This model holds data and typically corresponds to a table stored in a DB.
export class Book {
  id: number; //Unique identifier, useful for anything stored in a database
  title: string;
  author: string;
  year_published: number;
  word_count: number; // mark as optional

  // optional wordcount param
  constructor(id:number, title:string, author:string, year_published: number, word_count:number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year_published = year_published;
    this.word_count = word_count;
  }
}
