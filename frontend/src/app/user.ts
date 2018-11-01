import { Book } from './book'

export class User {
  id: number;
  email: string;
  password: string;
  phone: string;
  signed_in: boolean;
  interestedBookList?: Book[];
}
