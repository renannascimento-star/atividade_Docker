import { Component, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Atendimento } from '../atendimento';
import { AtendimentoApi } from '../atendimento-api';
import { BarraComandos } from '../../../compartilhado/componentes/barra-comandos/barra-comandos';

@Component({
  selector: 'app-atendimento-list',
  imports: [NgClass, BarraComandos],
  templateUrl: './atendimento-list.html',
  styles: `
    ::ng-deep  div#comandos a.botao { visibility: hidden; }
  `,
})
export class AtendimentoList implements OnInit {
  private servico = inject(AtendimentoApi);

  registros = signal<Atendimento[]>([]);

  ngOnInit(): void {
    this.consultar();
  }

  consultar(termoBusca?: string): void {
    const status = ['CHEGADA', 'ATENDIMENTO'];
    this.servico.consultar(termoBusca, status).subscribe({
      next: resposta => this.registros.set(resposta)
    });
  }

  atualizarStatus(id: number): void {
    if (confirm('Confirma alteração no status do atendimento?')) {
      this.servico.atualizarStatus(id).subscribe({
        next: status => alert(`Novo status: ${status}`),
        complete: () => this.consultar()
      });
    }
  }
}
