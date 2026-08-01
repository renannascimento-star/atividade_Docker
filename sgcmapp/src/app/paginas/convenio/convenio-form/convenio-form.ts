import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Convenio } from '../convenio';
import { ConvenioApi } from '../convenio-api';

@Component({
  selector: 'app-convenio-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './convenio-form.html',
  styles: ``,
})
export class ConvenioForm implements OnInit {
  private servico = inject(ConvenioApi);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  registro = signal(<Convenio>{});

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
        this.roteador.navigate(['/convenio-list']);
      }
    });
  }
}
