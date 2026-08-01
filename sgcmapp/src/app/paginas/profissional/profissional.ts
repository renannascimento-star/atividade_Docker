import { Especialidade } from '../especialidade/especialidade';
import { Unidade } from '../unidade/unidade';

export type Profissional = {
  id: number;
  nome: string;
  registroConselho: string;
  telefone: string;
  email: string;
  especialidade: Especialidade;
  unidade: Unidade;
}
