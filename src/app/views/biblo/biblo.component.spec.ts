import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibloComponent } from './biblo.component';

describe('BibloComponent', () => {
  let component: BibloComponent;
  let fixture: ComponentFixture<BibloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BibloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BibloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
