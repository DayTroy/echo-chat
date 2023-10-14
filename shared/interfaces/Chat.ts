import { Message } from './Message';
export interface Chat {
  id: string;
  title: string;
  creatorID: string | undefined;
  message: Message[];
}
