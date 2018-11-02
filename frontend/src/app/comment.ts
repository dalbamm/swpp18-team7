import { Article } from './article'
import { User } from './user'

export class Comment {
    id: number;
    article: Article;
    content: string;
    commentAuthor: User;
  }
  