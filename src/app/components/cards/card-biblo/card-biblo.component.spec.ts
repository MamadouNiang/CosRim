import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBibloComponent } from './card-biblo.component';

describe('CardBibloComponent', () => {
  let component: CardBibloComponent;
  let fixture: ComponentFixture<CardBibloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBibloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBibloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
