import { User } from './user'
import { Book } from './book'

export class Article {
    id: number;
    title: string;
    content: string;
    author: User;
    
    book: Book;
    bookStatus: string;
    price: number;
  }
  