import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConvenioApi } from '../../convenio/convenio-api';
import { PacienteApi } from '../../paciente/paciente-api';
import { ProfissionalApi } from '../../profissional/profissional-api';
import { Atendimento } from '../atendimento';
import { AtendimentoApi } from '../atendimento-api';
import { Convenio } from '../../convenio/convenio';
import { Paciente } from '../../paciente/paciente';
import { Profissional } from '../../profissional/profissional';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agenda-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './agenda-form.html',
  styles: ``,
})
export class AgendaForm implements OnInit {
  private servico = inject(AtendimentoApi);
  private servicoConvenio = inject(ConvenioApi);
  private servicoPaciente = inject(PacienteApi);
  private servicoProfissional = inject(ProfissionalApi);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  registro = signal<Atendimento>(<Atendimento>{});
  convenios = signal<Convenio[]>([]);
  pacientes = signal<Paciente[]>([]);
  profissionais = signal<Profissional[]>([]);

  compararPorId = (a: any, b: any) => (a && b && a.id == b.id) || (!a && !b);

  ngOnInit(): void {
    this.servicoConvenio.consultar().subscribe({
      next: resposta => this.convenios.set(resposta)
    });

    this.servicoPaciente.consultar().subscribe({
      next: resposta => this.pacientes.set(resposta)
    });

    this.servicoProfissional.consultar().subscribe({
      next: resposta => this.profissionais.set(resposta)
    });

    const id = this.rota.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.consultarPorId(+id).subscribe({
        next: resposta => this.registro.set(resposta)
      });
    }
  }

  salvar(): void {
    this.servico.salvar(this.registro()).subscribe({
      next: resposta => {
        if (resposta) {
          alert(`ID gerado: ${resposta}`);
        }
      },
      complete: () => {
        alert('Agendamento salvo com sucesso!');
        this.roteador.navigate(['/agenda-list']);
      }
    })
  }
}
