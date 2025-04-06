import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaLoginCadastroComponent } from './pagina-login-cadastro.component';

describe('PaginaLoginCadastroComponent', () => {
  let component: PaginaLoginCadastroComponent;
  let fixture: ComponentFixture<PaginaLoginCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaLoginCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaLoginCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
