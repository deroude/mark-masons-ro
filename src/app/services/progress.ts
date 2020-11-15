import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProgressService {

    public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private taskCount = 0;

    public start(): void {
        if (this.taskCount++ === 0) {
            this.loading$.next(true);
        }
    }

    public stop(): void {
        if (--this.taskCount === 0) {
            this.loading$.next(false);
        }
    }
}
