import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraComandos } from './barra-comandos';

describe('BarraComandos', () => {
  let component: BarraComandos;
  let fixture: ComponentFixture<BarraComandos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraComandos],
    }).compileComponents();

    fixture = TestBed.createComponent(BarraComandos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
