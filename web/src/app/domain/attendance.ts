import { User } from './user';
import { firestore } from 'firebase';

export class Attendance {
    id?: string;
    event: string;
    date: firestore.Timestamp;
    email: string;
    status: string;
    reply?: string;
    present?: boolean;
    contribution?: number;
    user?: User;
    lodge: string;
}
