import { DatePipe, SlicePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Atendimento } from '../atendimento';
import { BarraComandos } from '../../../compartilhado/componentes/barra-comandos/barra-comandos';
import { AtendimentoApi } from '../atendimento-api';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-agenda-list',
  imports: [DatePipe, SlicePipe, NgClass, BarraComandos, RouterLink],
  templateUrl: './agenda-list.html',
  styles: ``,
})
export class AgendaList implements OnInit {
  private servico = inject(AtendimentoApi);

  registros = signal<Atendimento[]>([]);

  ngOnInit(): void {
    this.consultar();
  }

  consultar(termoBusca?: string): void {
    const status = ['AGENDADO', 'CONFIRMADO'];
    this.servico.consultar(termoBusca, status).subscribe({
      next: resposta => this.registros.set(resposta),
      error: () => alert('Deu errado!')
    });
  }
  
  remover(id: number): void {
    if (confirm('Confirma cancelamento do agendamento?')) {
      this.servico.cancelar(id).subscribe({
        complete: () => {
          alert('Agendamento cancelado com sucesso.');
          this.consultar();
        }
      });
    }
  }

  atualizarStatus(id: number): void {
    if (confirm('Confirma alteração no status do agendamento?')) {
      this.servico.atualizarStatus(id).subscribe({
        next: status => alert(`Novo status: ${status}`),
        complete: () => this.consultar()
      });
    }
  }
}
