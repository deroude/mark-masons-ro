import { Pipe, PipeTransform } from '@angular/core';
import { firestore } from 'firebase';

@Pipe({ name: 'timestamp' })
export class TimestampPipe implements PipeTransform {
    transform(tstamp: firestore.Timestamp): Date {
        return tstamp.toDate();
    }
}
