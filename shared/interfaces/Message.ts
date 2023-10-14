export interface Message {
    id: string;
    text: string;
    currentUser: {
        id: string;
        email: string;
    }
    time: string;
}