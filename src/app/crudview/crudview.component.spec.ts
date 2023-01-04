import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudviewComponent } from './crudview.component';

describe('CrudviewComponent', () => {
  let component: CrudviewComponent;
  let fixture: ComponentFixture<CrudviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
