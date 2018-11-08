import { Book } from './book'
import { Article } from './article'

export class User {
  id: number;
  email: string;
  password: string;
  phone?: string;
  signedIn: boolean;
  interestedBookList?: Book[];
  articleList?: Article[];
}
