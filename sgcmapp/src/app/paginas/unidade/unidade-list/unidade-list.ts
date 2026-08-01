import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Unidade } from '../unidade';
import { UnidadeApi } from '../unidade-api';
import { BarraComandos } from '../../../compartilhado/componentes/barra-comandos/barra-comandos';

@Component({
  selector: 'app-unidade-list',
  imports: [RouterLink, BarraComandos],
  templateUrl: './unidade-list.html',
  styles: ``,
})
export class UnidadeList implements OnInit {
  private servico = inject(UnidadeApi);

  registros = signal<Unidade[]>([]);

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
