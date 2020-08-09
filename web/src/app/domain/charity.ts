import { Article } from './article';
import { firestore } from 'firebase';
import { User } from './user';

export interface Contribution {
    from: User;
    amount: number;
    currency: string;
    payDate: firestore.Timestamp;
    status: 'PENDING' | 'ACCEPTED' | 'FAILED';
    anonymous: 'FULL' | 'NAME' | 'AMOUNT' | 'NONE';
}

export interface Charity {
    id?: string;
    title: string;
    description: Article;
    publishDate: firestore.Timestamp;
    endDate?: firestore.Timestamp;
    targetAmount?: number;
    targetCurrency: string;
    raisedAmount: number;
    status: string;
    contributions: Contribution[];
}
