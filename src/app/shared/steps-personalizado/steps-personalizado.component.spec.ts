import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsPersonalizadoComponent } from './steps-personalizado.component';

describe('StepsPersonalizadoComponent', () => {
  let component: StepsPersonalizadoComponent;
  let fixture: ComponentFixture<StepsPersonalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsPersonalizadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsPersonalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
