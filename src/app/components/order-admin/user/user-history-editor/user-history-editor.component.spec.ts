import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoryEditorComponent } from './user-history-editor.component';

describe('UserHistoryEditorComponent', () => {
  let component: UserHistoryEditorComponent;
  let fixture: ComponentFixture<UserHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
