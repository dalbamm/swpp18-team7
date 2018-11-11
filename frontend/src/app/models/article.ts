import { User } from './user';
import { Book } from './book';
import { Comment } from './comment';

export class Article {
    id: number;
    title: string;
    content: string;
    articleAuthor: User;
    external: boolean;
    linkage: string;
    book: Book;
    bookStatus: string;
    price: number;
    commentList?: Comment[];
  }
