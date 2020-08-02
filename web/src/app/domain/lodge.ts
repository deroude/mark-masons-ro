import { firestore } from 'firebase';

export class Lodge {
    id?: string;
    name: string;
    number: number;
    // tslint:disable-next-line:variable-name
    created_date?: firestore.Timestamp;
    orient: { country: string, principal: string, region?: string, state?: string };
}
