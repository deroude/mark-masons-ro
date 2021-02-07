import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceAftermathComponent } from './attendance.aftermath.component';

describe('AttendanceAftermathComponent', () => {
  let component: AttendanceAftermathComponent;
  let fixture: ComponentFixture<AttendanceAftermathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceAftermathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceAftermathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
