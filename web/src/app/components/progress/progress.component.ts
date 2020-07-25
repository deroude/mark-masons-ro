import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgressService } from 'src/app/services/progress';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  constructor(private progress: ProgressService) {
    this.loading$ = this.progress.loading$;
  }

  loading$: Observable<boolean>;

  ngOnInit() {
  }

}
