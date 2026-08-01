import { Routes } from '@angular/router';
import { AgendaList } from './paginas/atendimento/agenda-list/agenda-list';
import { AgendaForm } from './paginas/atendimento/agenda-form/agenda-form';
import { AtendimentoList } from './paginas/atendimento/atendimento-list/atendimento-list';
import { ConvenioList } from './paginas/convenio/convenio-list/convenio-list';
import { ConvenioForm } from './paginas/convenio/convenio-form/convenio-form';
import { PacienteList } from './paginas/paciente/paciente-list/paciente-list';
import { PacienteForm } from './paginas/paciente/paciente-form/paciente-form';
import { ProfissionalList } from './paginas/profissional/profissional-list/profissional-list';
import { ProfissionalForm } from './paginas/profissional/profissional-form/profissional-form';
import { EspecialidadeList } from './paginas/especialidade/especialidade-list/especialidade-list';
import { EspecialidadeForm } from './paginas/especialidade/especialidade-form/especialidade-form';
import { UnidadeList } from './paginas/unidade/unidade-list/unidade-list';
import { UnidadeForm } from './paginas/unidade/unidade-form/unidade-form';
import { UsuarioList } from './paginas/usuario/usuario-list/usuario-list';
import { UsuarioForm } from './paginas/usuario/usuario-form/usuario-form';

export const routes: Routes = [
  { path: 'agenda-list', component: AgendaList },
  { path: 'agenda-form', component: AgendaForm },
  { path: 'atendimento', component: AtendimentoList },
  { path: 'convenio-list', component: ConvenioList },
  { path: 'convenio-form', component: ConvenioForm },
  { path: 'paciente-list', component: PacienteList },
  { path: 'paciente-form', component: PacienteForm },
  { path: 'profissional-list', component: ProfissionalList },
  { path: 'profissional-form', component: ProfissionalForm },
  { path: 'config', children: [
    { path: 'especialidade-list', component: EspecialidadeList },
    { path: 'especialidade-form', component: EspecialidadeForm },
    { path: 'unidade-list', component: UnidadeList },
    { path: 'unidade-form', component: UnidadeForm },
    { path: 'usuario-list', component: UsuarioList },
    { path: 'usuario-form', component: UsuarioForm },
  ] }
];
