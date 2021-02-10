import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeScrollComponent } from './joke-scroll.component';

describe('JokeScrollComponent', () => {
  let component: JokeScrollComponent;
  let fixture: ComponentFixture<JokeScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
