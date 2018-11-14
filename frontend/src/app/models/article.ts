import { User } from './user';
import { Book } from './book';
import { Comment } from './comment';

export class Article {
    // common
    site: string;
    title: string;
    author: string;
    price: number;
    link: string;

    // boogle article
    id?: number;
    content?: string;
    articleAuthor?: User;
    book?: Book;
    bookStatus?: string;
    commentList?: Comment[];
  }