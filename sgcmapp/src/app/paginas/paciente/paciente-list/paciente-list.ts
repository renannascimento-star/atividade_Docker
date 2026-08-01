import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Paciente } from '../paciente';
import { PacienteApi } from '../paciente-api';
import { BarraComandos } from '../../../compartilhado/componentes/barra-comandos/barra-comandos';

@Component({
  selector: 'app-paciente-list',
  imports: [RouterLink, BarraComandos],
  templateUrl: './paciente-list.html',
  styles: ``,
})
export class PacienteList implements OnInit {
  private servico = inject(PacienteApi);

  registros = signal<Paciente[]>([]);

  ngOnInit(): void {
    this.consultar();
  }

  consultar(termoBusca?: string): void {
    this.servico.consultar(termoBusca).subscribe({
      next: resposta => this.registros.set(resposta)
    });
  }

  remover(id: number): void {
    if (confirm('Confirma exclusão do registro?')) {
      this.servico.remover(id).subscribe({
        complete: () => {
          alert('Registro excluído com sucesso.');
          this.consultar();
        },
      });
    }
  }
}
