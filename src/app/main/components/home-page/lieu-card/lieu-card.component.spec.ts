import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuCardComponent } from './lieu-card.component';

describe('LieuCardComponent', () => {
  let component: LieuCardComponent;
  let fixture: ComponentFixture<LieuCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LieuCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LieuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
