import { firestore } from 'firebase';

export class Article {
    id?: string;
    title: string;
    text: string;
    slug?: string;
    publishTimestamp: firestore.Timestamp;
    author: string;
    audience: string;
    cutoff?: string;
    imageUrl?: string;
}
