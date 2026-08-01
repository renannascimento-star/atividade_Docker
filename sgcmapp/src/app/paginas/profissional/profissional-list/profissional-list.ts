import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profissional } from '../profissional';
import { ProfissionalApi } from '../profissional-api';
import { BarraComandos } from '../../../compartilhado/componentes/barra-comandos/barra-comandos';

@Component({
  selector: 'app-profissional-list',
  imports: [RouterLink, BarraComandos],
  templateUrl: './profissional-list.html',
  styles: ``,
})
export class ProfissionalList implements OnInit {
  private servico = inject(ProfissionalApi);

  registros = signal<Profissional[]>([]);

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
