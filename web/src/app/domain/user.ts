import { firestore } from 'firebase';

export interface User {
    id?: string;
    email: string;
    name: string;
    password?: string;
    rank?: string;
    privilege: string;
    status: string;
    joinedDate?: firestore.Timestamp;
}
