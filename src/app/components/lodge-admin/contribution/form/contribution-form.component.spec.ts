import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionEditorComponent } from './user-form.component';

describe('ContributionEditorComponent', () => {
  let component: ContributionEditorComponent;
  let fixture: ComponentFixture<ContributionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
