import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Especialidade } from '../especialidade';
import { EspecialidadeApi } from '../especialidade-api';

@Component({
  selector: 'app-especialidade-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './especialidade-form.html',
  styles: ``,
})
export class EspecialidadeForm implements OnInit {
  private servico = inject(EspecialidadeApi);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  registro = signal(<Especialidade>{});

  ngOnInit(): void {
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
        this.roteador.navigate(['/config/especialidade-list']);
      }
    });
  }
}
