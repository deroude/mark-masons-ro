import { firestore } from 'firebase';

export class EventHandle {
    id?: string;
    title: string;
    invitation: string;
    notes?: string;
    date: firestore.Timestamp;
    location: string;
    type: string;
    lodge?: string;
}
