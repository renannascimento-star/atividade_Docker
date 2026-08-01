import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../usuario';
import { UsuarioApi } from '../usuario-api';

@Component({
  selector: 'app-usuario-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './usuario-form.html',
  styles: ``,
})
export class UsuarioForm implements OnInit {
  private servico = inject(UsuarioApi);
  private roteador = inject(Router);
  private rota = inject(ActivatedRoute);

  registro = signal(<Usuario>{});

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
        this.roteador.navigate(['/config/usuario-list']);
      }
    });
  }
}
