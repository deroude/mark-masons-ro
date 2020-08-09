import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityEditorComponent } from './charity-editor.component';

describe('CharityEditorComponent', () => {
  let component: CharityEditorComponent;
  let fixture: ComponentFixture<CharityEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
