import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Profissional } from '../profissional';
import { Especialidade } from '../../especialidade/especialidade';
import { Unidade } from '../../unidade/unidade';
import { ProfissionalApi } from '../profissional-api';
import { EspecialidadeApi } from '../../especialidade/especialidade-api';
import { UnidadeApi } from '../../unidade/unidade-api';

@Component({
  selector: 'app-profissional-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './profissional-form.html',
  styles: ``,
})
export class ProfissionalForm implements OnInit {
  private servico = inject(ProfissionalApi);
  private servicoEspecialidade = inject(EspecialidadeApi);
  private servicoUnidade = inject(UnidadeApi);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  registro = signal(<Profissional>{});
  especialidades = signal<Especialidade[]>([]);
  unidades = signal<Unidade[]>([]);

  compararPorId = (a: any, b: any) => (a && b && a.id == b.id) || (!a && !b);

  ngOnInit(): void {
    this.servicoEspecialidade.consultar().subscribe({
      next: resposta => this.especialidades.set(resposta)
    });

    this.servicoUnidade.consultar().subscribe({
      next: resposta => this.unidades.set(resposta)
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
        } else {
          alert('Registro atualizado com sucesso.');
        }
      },
      complete: () => {
        this.roteador.navigate(['/profissional-list']);
      }
    });
  }
}
