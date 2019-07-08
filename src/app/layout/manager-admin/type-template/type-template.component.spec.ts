import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTemplateComponent } from './type-template.component';

describe('TypeTemplateComponent', () => {
  let component: TypeTemplateComponent;
  let fixture: ComponentFixture<TypeTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
