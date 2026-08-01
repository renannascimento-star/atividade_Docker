import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Convenio } from '../convenio';
import { ConvenioApi } from '../convenio-api';
import { BarraComandos } from '../../../compartilhado/componentes/barra-comandos/barra-comandos';

@Component({
  selector: 'app-convenio-list',
  imports: [RouterLink, BarraComandos],
  templateUrl: './convenio-list.html',
  styles: ``,
})
export class ConvenioList implements OnInit {
  private servico = inject(ConvenioApi);

  registros = signal<Convenio[]>([]);

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
