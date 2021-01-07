import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgeEditorComponent } from './lodge-editor.component';

describe('LodgeEditorComponent', () => {
  let component: LodgeEditorComponent;
  let fixture: ComponentFixture<LodgeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodgeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
