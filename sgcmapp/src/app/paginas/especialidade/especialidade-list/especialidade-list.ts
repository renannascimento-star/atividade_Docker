import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Especialidade } from '../especialidade';
import { EspecialidadeApi } from '../especialidade-api';
import { BarraComandos } from '../../../compartilhado/componentes/barra-comandos/barra-comandos';

@Component({
  selector: 'app-especialidade-list',
  imports: [RouterLink, BarraComandos],
  templateUrl: './especialidade-list.html',
  styles: ``,
})
export class EspecialidadeList implements OnInit {
  private servico = inject(EspecialidadeApi);

  registros = signal<Especialidade[]>([]);

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
