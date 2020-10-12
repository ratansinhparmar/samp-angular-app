import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductDialogComponent } from './add-edit-product-dialog.component';

describe('AddEditProductDialogComponent', () => {
  let component: AddEditProductDialogComponent;
  let fixture: ComponentFixture<AddEditProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
