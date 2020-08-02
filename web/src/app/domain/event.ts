import { firestore } from 'firebase';
import { Article } from './article';
import { Lodge } from './lodge';

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

export class EventInstance {
    id?: string;
    title: string;
    invitation: Article;
    notes?: string;
    date: firestore.Timestamp;
    location: string;
    type: string;
    lodge?: Lodge;
}
