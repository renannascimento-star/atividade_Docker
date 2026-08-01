import { Convenio } from '../convenio/convenio';
import { Paciente } from '../paciente/paciente';
import { Profissional } from '../profissional/profissional';

export type Atendimento = {
  id: number;
  data: string;
  hora: string;
  status: string;
  convenio: Convenio | null;
  paciente: Paciente;
  profissional: Profissional;
}
