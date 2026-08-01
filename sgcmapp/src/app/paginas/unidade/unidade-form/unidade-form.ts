import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Unidade } from '../unidade';
import { UnidadeApi } from '../unidade-api';

@Component({
  selector: 'app-unidade-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './unidade-form.html',
  styles: ``,
})
export class UnidadeForm implements OnInit {
  private servico = inject(UnidadeApi);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  registro = signal(<Unidade>{});

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
        this.roteador.navigate(['/config/unidade-list']);
      }
    });
  }
}
