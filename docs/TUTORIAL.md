# Tutorial: Construindo o front-end para o módulo de agendamento e atendimento do SGCM

Tutorial prático para construção do front-end da funcionalidade de agendamento e atendimento do SGCM (Sistema de Gerenciamento de Clínica Médica) com Angular.

O foco é nas telas de listagem e formulário de agendamento (`AgendaList` e `AgendaForm`), cobrindo toda a progressão de conceitos: componentes, roteamento, templates, comunicação HTTP e interceptadores.

Para aprofundamento teórico sobre os conceitos utilizados, consulte o [Texto de Referência da Disciplina](./README.md).

## 1. Criando o Projeto Angular

### Criar o projeto com o Angular CLI

```bash
ng new sgcmapp --skip-git --defaults
```

O flag `--skip-git` omite a inicialização de um repositório Git e `--defaults` aceita todas as opções padrão sem perguntas interativas.

### Executar e verificar

```bash
cd sgcmapp
ng serve
```

A aplicação estará disponível em `http://localhost:4200/`. O mecanismo de *live reload* recompila automaticamente a aplicação a cada alteração nos arquivos.

## 2. Configuração Inicial do Layout

### Copiar os arquivos HTML e CSS

O arquivo `app.html` receberá a estrutura base de layout (header, nav, main e footer) proveniente do HTML estático da aplicação. Copiar os elementos `<header>`, `<nav>`, `<main>` e `<footer>` para `src/app/app.html`. No entanto, devido à renderização dinâmica do Angular, o conteúdo do `<main>` será substituído pelo `<router-outlet>`. Posteriormente, o conteúdo do `<main>` será preenchido pelos componentes correspondentes às rotas.

**src/app/app.html** (estrutura inicial):

```html
<header>
  <div id="logo">
    <img src="imagens/logo_branco.png" alt="Logo SGCM">
    <span id="titulo">{{ title() }}</span>
  </div>
  <div id="usuarioInfo">
    <span>Usuário: Administrador (admin)</span>
    <span>Papel: ADMIN</span>
    <a href="javascript:void(0)" class="botao">Logout</a>
  </div>
</header>
<nav>
  <ul>
    <li><a href="agenda.html">Agenda</a></li>
    <li><a href="atendimento.html">Atendimento</a></li>
    <li><a href="pacientes.html">Pacientes</a></li>
    <li><a href="profissionais.html">Profissionais</a></li>
    <li><a href="convenios.html">Convênios</a></li>
    <li id="dropdown">
      <a href="javascript:void(0)">
        Configurações
        <span>&#9660;</span>
      </a>
      <div id="dropdown_menu">
        <a href="unidades.html">Unidades</a>
        <a href="especialidades.html">Especialidades</a>
        <a href="usuarios.html">Usuários</a>
      </div>
    </li>
  </ul>
</nav>
<main>
  <router-outlet></router-outlet>
</main>
<footer>
  <span>SGCM - Sistema de Gerenciamento de Clínica Médica</span>
  <span>Suporte técnico: (68) 5555-5555 | <a href="mailto:suporte.sgcm&#64;ufac.br">suporte.sgcm&#64;ufac.br</a></span>
</footer>
```

### Importar os estilos CSS

Copiar os arquivos CSS do projeto estático para `src/assets/css/` e importá-los no arquivo de estilos globais:

**src/styles.css:**

```css
@import "assets/css/estilo.css";
```

### Ajuste do layout com CSS

No Angular, o conteúdo é renderizado dentro do elemento `<app-root>`. Por isso, o `body` e o `app-root` devem compartilhar as regras base de altura, margem e tipografia, enquanto o `app-root` recebe o layout em coluna:

```css
body, app-root {
  height: 100vh;
  margin: 0;
  font-family: system-ui, sans-serif;
  color: #1a1a1a;
}

app-root {
  display: flex;
  flex-direction: column;
}
```

## 3. Criação dos Componentes

### Gerar os componentes com o Angular CLI

```bash
ng generate component paginas/atendimento/agenda-list --inline-style
ng generate component paginas/atendimento/agenda-form --inline-style
ng generate component paginas/atendimento/atendimento-list --inline-style
```

O flag `--inline-style` evita a criação de um arquivo CSS separado, definindo os estilos diretamente na classe TypeScript. Isso é adequado para componentes que não possuem estilos próprios específicos.

Cada comando cria uma pasta com o nome do componente contendo:

- `*.ts`: classe TypeScript do componente
- `*.html`: template HTML
- `*.spec.ts`: arquivo de testes

### Copiar os templates HTML

Copiar o conteúdo HTML inicial para os templates de cada componente:

- `<table>` da listagem de agendamentos → `agenda-list.html`
- `<form>` do formulário de agendamento → `agenda-form.html`

## 4. Roteamento

O Angular Router permite associar caminhos de URL a componentes, habilitando a navegação sem recarregar a página (SPA).

### Configurar as rotas

**src/app/app.routes.ts:**

```typescript
import { Routes } from '@angular/router';
import { AgendaList } from './paginas/atendimento/agenda-list/agenda-list';
import { AgendaForm } from './paginas/atendimento/agenda-form/agenda-form';
import { AtendimentoList } from './paginas/atendimento/atendimento-list/atendimento-list';

export const routes: Routes = [
  { path: 'agenda-list', component: AgendaList },
  { path: 'agenda-form', component: AgendaForm },
  { path: 'atendimento', component: AtendimentoList },
  { path: '**', redirectTo: '' }
];
```

A rota `**` captura qualquer caminho não mapeado e redireciona para a raiz da aplicação.

### Adicionar o router-outlet e os routerLinks

O elemento `<router-outlet>` no template do `App` (já adicionado na etapa anterior) define onde o Angular injeta o componente correspondente à rota ativa.

Os links de navegação no `<nav>` devem utilizar a diretiva `routerLink` em vez do atributo `href`. Atualizar os links de Agenda e Atendimento conforme exemplo abaixo:

```html
<!-- De: -->
<li><a href="agenda.html">Agenda</a></li>
<li><a href="atendimento.html">Atendimento</a></li>

<!-- Para: -->
<li><a routerLink="/agenda">Agenda</a></li>
<li><a routerLink="/atendimento">Atendimento</a></li>
```

> [!TIP]
> Para verificar: ao clicar nos links do menu, a URL deve mudar e o componente correspondente deve aparecer no `<main>`, sem recarregar a página inteira.

## 5. Criação dos Modelos (Types)

Os modelos TypeScript representam as entidades da aplicação e garantem tipagem estática em todo o código front-end. No projeto-exemplo, cada entidade fica em sua própria pasta dentro de `src/app/paginas/`:

### src/app/paginas/atendimento/atendimento.ts

```typescript
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
```

### src/app/paginas/convenio/convenio.ts

```typescript
export type Convenio = {
  id: number;
  ativo: boolean;
  nome: string;
  cnpj: string;
  email: string;
  razaoSocial: string;
  telefone: string;
  representante: string;
}
```

### src/app/paginas/paciente/paciente.ts

```typescript
export type Paciente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  grupoSanguineo: string;
  sexo: string;
  cep: string;
  cidade: string;
  estado: string;
  endereco: string;
}
```

### src/app/paginas/profissional/profissional.ts

```typescript
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
```

### src/app/paginas/especialidade/especialidade.ts

```typescript
export type Especialidade = {
  id: number;
  nome: string;
}
```

### src/app/paginas/unidade/unidade.ts

```typescript
export type Unidade = {
  id: number;
  nome: string;
  endereco: string;
}
```

> [!TIP]
> Note que `convenio` é declarado como `Convenio | null`. Isso reflete a regra de negócio onde um atendimento pode não ter convênio associado. O TypeScript força o tratamento explícito desse caso em todo o código.

### Estruturar as classes dos componentes

Agora que os tipos estão definidos, editar as classes TypeScript para adicionar as propriedades e métodos que serão utilizados nos templates. A implementação completa será feita na Seção 9.

**src/app/paginas/atendimento/agenda-list/agenda-list.ts:**

```typescript
import { Component, OnInit, signal } from '@angular/core';
import { Atendimento } from '../atendimento';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.html',
  styles: []
})
export class AgendaList implements OnInit {
  registros = signal<Atendimento[]>([]);

  ngOnInit(): void {
  }

  atualizarStatus(id: number): void {
  }

  remover(id: number): void {
  }
}
```

**src/app/paginas/atendimento/agenda-form/agenda-form.ts:**

```typescript
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Atendimento } from '../atendimento';
import { Convenio } from '../../convenio/convenio';
import { Paciente } from '../../paciente/paciente';
import { Profissional } from '../../profissional/profissional';

@Component({
  selector: 'app-agenda-form',
  imports: [FormsModule],
  templateUrl: './agenda-form.html',
  styles: []
})
export class AgendaForm implements OnInit {
  private rota = inject(ActivatedRoute);

  registro = signal<Atendimento>({} as Atendimento);
  convenios = signal<Convenio[]>([]);
  pacientes = signal<Paciente[]>([]);
  profissionais = signal<Profissional[]>([]);

  ngOnInit(): void {
  }

  salvar(): void {
  }
}
```

> [!NOTE]
> As classes possuem os stubs necessários para que o template não gere erros de tipo. A lógica completa será implementada na **Seção 9** quando os serviços forem integrados.

## 6. Templates e Diretivas

### Interpolação de texto e pipes

Os templates utilizam interpolação (`{{ }}`) para exibir dados dinâmicos. No `App`, o título é definido em uma variável reativa (`title = signal('SGCM')`), então qualquer mudança nesse valor aparece automaticamente no `header` via `{{ title() }}`.

Trecho parcial de `src/app/app.ts`:

```typescript
export class App {
  protected readonly title = signal('SGCM');
}
```

O pipe `date` formata datas e o pipe `slice` extrai uma parte de uma string:

```html
<span id="titulo">{{ title() }}</span>
<td>{{ item.data | date: 'dd/MM/yyyy' }}</td>
<td>{{ item.hora | slice: 0:5 }}</td>
```

O pipe `slice: 0:5` exibe apenas os primeiros 5 caracteres do horário (`HH:mm`), ignorando os segundos (`HH:mm:ss`).

### Fluxo de controle: @for e @if

Para renderizar a lista de registros, usa-se `@for`. O bloco `@if/@else` exibe o total de registros ou uma mensagem quando a lista está vazia:

**agenda-list.html:**

```html
<table>
  <thead>
    <tr>
      <th>Data</th>
      <th>Hora</th>
      <th>Paciente</th>
      <th>Profissional</th>
      <th>Unidade</th>
      <th>Convênio</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    @for (item of registros(); track item) {
      <tr>
        <td class="fit">{{ item.data | date: 'dd/MM/yyyy' }}</td>
        <td class="fit">{{ item.hora | slice: 0:5 }}</td>
        <td>{{ item.paciente.nome }}</td>
        <td>{{ item.profissional.nome }}</td>
        <td>{{ item.profissional.unidade.nome }}</td>
        <td>{{ item.convenio?.nome || 'Sem convênio' }}</td>
        <td>
          <a (click)="atualizarStatus(item.id)"
            class="botao chegada"
            [ngClass]="{ inativo: item.status == 'AGENDADO' }">Chegada</a>
          <a (click)="atualizarStatus(item.id)"
            class="botao confirmacao"
            [ngClass]="{ inativo: item.status == 'CONFIRMADO' }">Confirmar</a>
          <a routerLink="/agenda-form"
            [queryParams]="{ id: item.id }"
            class="botao">Editar</a>
          <a (click)="remover(item.id)"
            class="botao cancelar">Cancelar</a>
        </td>
      </tr>
    }
  </tbody>
  <tfoot>
    <tr>
      <td colspan="7">
        @if (registros().length > 0) {
          <span>Total de registros: {{ registros().length }}</span>
        } @else {
          <span>Nenhum registro encontrado</span>
        }
      </td>
    </tr>
  </tfoot>
</table>
```

> [!NOTE]
> O operador `?.` (optional chaining) em `item.convenio?.nome` evita um erro de JavaScript quando `convenio` é `null`. O operador `||` funciona como fallback: se `convenio?.nome` for `null` ou `undefined`, exibe `'Sem convênio'`.

### Diretiva NgClass

A diretiva `[ngClass]` aplica condicionalmente classes CSS. No exemplo acima, a classe `inativo` é aplicada ao botão quando ele não está disponível para o status atual:

```html
<a [ngClass]="{ inativo: item.status == 'AGENDADO' }">Chegada</a>
```

Quando o status é `'AGENDADO'`, o botão "Chegada" fica inativo (o paciente ainda não chegou). Quando for `'CONFIRMADO'`, o botão "Confirmar" fica inativo.

### Formulário com ngModel

O template do formulário usa `[(ngModel)]` (two-way binding) para vincular os campos ao objeto de dados, e variáveis de template para controlar o estado do formulário:

**agenda-form.html:**

```html
<form (submit)="salvar()" #form="ngForm">
  <div class="grid">
    <label for="profissional">Profissional</label>
    <select name="profissional" id="profissional" required
            [(ngModel)]="registro().profissional" [compareWith]="compareById">
      @for (item of profissionais(); track item.id) {
        <option [ngValue]="item">{{ item.nome }}</option>
      }
    </select>

    <label for="paciente">Paciente</label>
    <select name="paciente" id="paciente" required
            [(ngModel)]="registro().paciente" [compareWith]="compareById">
      @for (item of pacientes(); track item.id) {
        <option [ngValue]="item">{{ item.nome }}</option>
      }
    </select>

    <label for="data">Data</label>
    <input type="date" name="data" id="data" required [(ngModel)]="registro().data" />

    <label for="hora">Hora</label>
    <select name="hora" id="hora" required [(ngModel)]="registro().hora">
      <option value="">Selecione</option>
      <option value="14:00:00">14:00</option>
      <option value="14:30:00">14:30</option>
      <option value="15:00:00">15:00</option>
      <option value="15:30:00">15:30</option>
      <option value="16:00:00">16:00</option>
      <option value="16:30:00">16:30</option>
      <option value="17:00:00">17:00</option>
      <option value="17:30:00">17:30</option>
      <option value="18:00:00">18:00</option>
      <option value="18:30:00">18:30</option>
      <option value="19:00:00">19:00</option>
      <option value="19:30:00">19:30</option>
      <option value="20:00:00">20:00</option>
    </select>

    <label for="convenio">Convênio</label>
    <select name="convenio" id="convenio"
            [(ngModel)]="registro().convenio" [compareWith]="compareById">
      <option [ngValue]="null">Sem convênio</option>
      @for (item of convenios(); track item.id) {
        <option [ngValue]="item">{{ item.nome }}</option>
      }
    </select>
  </div>

  <input type="button" value="Cancelar" routerLink="/agenda-list" />
  <input type="submit" value="Salvar" [disabled]="form.invalid" />
</form>
```

Pontos importantes:

- `#form="ngForm"`: cria uma variável de template vinculada ao objeto `NgForm`, que expõe o estado do formulário.
- `[disabled]="form.invalid"`: desabilita o botão "Salvar" enquanto houver campos inválidos.
- `[compareWith]="compareById"`: necessário nos selects com `ngModel` quando o valor é um objeto. O Angular precisa de uma função comparadora para identificar qual `<option>` corresponde ao valor atual do modelo, comparando por ID.
- `[ngValue]="item"`: no lugar de `value`, usa-se `[ngValue]` para vincular um objeto inteiro como valor da opção (não apenas uma string).

## 7. Componente Compartilhado: BarraComandos

A barra de comandos é um componente compartilhado reutilizável que exibe um botão "Adicionar" e um campo de busca. Ele utiliza `input()` e `output()` para comunicação com o componente pai.

### Criar o componente

```bash
ng generate component compartilhado/componentes/barra-comandos --inline-style
```

### Template do componente

**barra-comandos.html:**

```html
<div id="comandos">
  <a [routerLink]="linkForm()" class="botao" id="add">Adicionar</a>
  <div>
    <input
      type="search"
      name="busca"
      id="busca"
      placeholder="Digite para buscar"
      #inputBusca="ngModel"
      ngModel
      (ngModelChange)="buscar(inputBusca.value)" />
  </div>
</div>
```

### Classe do componente

**barra-comandos.ts:**

```typescript
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-barra-comandos',
  imports: [RouterLink, FormsModule],
  templateUrl: './barra-comandos.html',
  styles: ``,
})
export class BarraComandos {
  eventoBusca = output<string>();
  linkForm = input<string>();

  buscar(termoBusca: string) {
    if (termoBusca.length >= 3 || termoBusca.length == 0) {
      this.eventoBusca.emit(termoBusca);
    }
  }
}
```

- `output<string>()`: declara um evento de saída que o componente pai pode escutar.
- `input<string>()`: declara uma propriedade de entrada que o componente pai pode definir.
- A busca só é acionada quando o usuário digita ao menos 3 caracteres, ou quando limpa o campo completamente (`length == 0`), evitando buscas a cada tecla pressionada.

### Integrar BarraComandos nos componentes de listagem

Adicionar o componente `BarraComandos` nos templates de `agenda-list.html` e `atendimento-list.html`:

**src/app/paginas/atendimento/agenda-list/agenda-list.html:**

```html
<app-barra-comandos 
  [linkForm]="'/agenda-form'" 
  (eventoBusca)="consultar($event)">
</app-barra-comandos>

<table>
  <!-- conteúdo da tabela -->
</table>
```

**src/app/paginas/atendimento/atendimento-list/atendimento-list.html:**

```html
<app-barra-comandos 
  [linkForm]="'/atendimento-form'" 
  (eventoBusca)="consultar($event)">
</app-barra-comandos>

<table>
  <!-- conteúdo da tabela -->
</table>
```

E importar o componente em ambas as classes:

```typescript
import { BarraComandos } from '../../../compartilhado/componentes/barra-comandos/barra-comandos';

@Component({
  selector: 'app-agenda-list',  // ou 'app-atendimento-list'
  imports: [BarraComandos],  // adicionar aqui
  templateUrl: './agenda-list.html',  // ou './atendimento-list.html'
  styles: ``,
})
```

Para ocultar o botão "Adicionar" apenas na tela de atendimento, adicionar no CSS do componente `AtendimentoList`:

**atendimento-list.ts:**

```typescript
@Component({
  selector: 'app-atendimento-list',
  imports: [BarraComandos],
  templateUrl: './atendimento-list.html',
  styles: `
    ::ng-deep  div#comandos a.botao { visibility: hidden; }
  `,
})
export class AtendimentoList {}
```

> [!NOTE]
> `::ng-deep` permite que o CSS do componente pai afete elementos dentro de componentes filhos, contornando o encapsulamento de estilos do Angular. Embora marcado como obsoleto em versões mais recentes do Angular, ainda é amplamente utilizado para casos como este.

## 8. Camada de Serviço (HTTP)

### Configurar variáveis de ambiente

```bash
ng generate environments
```

Isso cria os arquivos de ambiente. Adicionar a URL da API:

**src/environments/environment.development.ts:**

```typescript
export const environment = {
  API_URL: 'http://localhost:9000'
};
```

**src/environments/environment.ts** (produção):

```typescript
export const environment = {
  API_URL: 'http://localhost:9000'
};
```

### Habilitar o HttpClient

Adicionar `provideHttpClient()` na lista de `providers` do `app.config.ts`:

**src/app/app.config.ts:**

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
```

### Criar o serviço AtendimentoApi

```bash
ng generate service paginas/atendimento/atendimento-api
```

**src/app/paginas/atendimento/atendimento-api.ts:**

```typescript
import { inject, Injectable } from '@angular/core';
import { Atendimento } from './atendimento';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoApi {
  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/atendimento`;

  consultar(termoBusca?: string, status?: string[]): Observable<Atendimento[]> {
    let url = `${this.apiUrl}/consultar`;
    let parametros = new HttpParams();

    if (termoBusca) {
      parametros = parametros.set('termoBusca', termoBusca);
    }
    if (status) {
      parametros = parametros.set('status', status.join(','));
    }

    return this.http.get<Atendimento[]>(url, { params: parametros });
  }

  consultarPorId(id: number): Observable<Atendimento> {
    let url = `${this.apiUrl}/consultar/${id}`;
    return this.http.get<Atendimento>(url);
  }

  salvar(objeto: Atendimento): Observable<number | void> {
    let url = `${this.apiUrl}`;
    if (objeto.id) {
      url += '/atualizar';
      return this.http.put<void>(url, objeto);
    } else {
      url += '/inserir';
      return this.http.post<number>(url, objeto);
    }
  }

  cancelar(id: number): Observable<void> {
    let url = `${this.apiUrl}/remover/${id}`;
    return this.http.delete<void>(url);
  }

  atualizarStatus(id: number): Observable<string> {
    let url = `${this.apiUrl}/status/${id}`;
    return this.http.put<string>(url, null);
  }
}
```

### Criar os serviços auxiliares

Criar serviços para convênio, paciente e profissional:

```bash
ng generate service paginas/convenio/convenio-api
ng generate service paginas/paciente/paciente-api
ng generate service paginas/profissional/profissional-api
```

**src/app/paginas/convenio/convenio-api.ts:**

```typescript
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Convenio } from './convenio';

@Injectable({ providedIn: 'root' })
export class ConvenioApi {
  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/convenio`;

  consultar(): Observable<Convenio[]> {
    let url = `${this.apiUrl}/consultar`;
    return this.http.get<Convenio[]>(url);
  }
}
```

**src/app/paginas/paciente/paciente-api.ts:**

```typescript
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Paciente } from './paciente';

@Injectable({ providedIn: 'root' })
export class PacienteApi {
  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/paciente`;

  consultar(): Observable<Paciente[]> {
    let url = `${this.apiUrl}/consultar`;
    return this.http.get<Paciente[]>(url);
  }
}
```

**src/app/paginas/profissional/profissional-api.ts:**

```typescript
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profissional } from './profissional';

@Injectable({ providedIn: 'root' })
export class ProfissionalApi {
  private http = inject(HttpClient);
  private apiUrl = `${environment.API_URL}/profissional`;

  consultar(): Observable<Profissional[]> {
    let url = `${this.apiUrl}/consultar`;
    return this.http.get<Profissional[]>(url);
  }
}
```

## 9. Integrando Serviços nos Componentes

### AgendaList

**src/app/paginas/atendimento/agenda-list/agenda-list.ts:**

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { NgClass, DatePipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Atendimento } from '../atendimento';
import { AtendimentoApi } from '../atendimento-api';
import { BarraComandos } from '../../../compartilhado/componentes/barra-comandos/barra-comandos';

@Component({
  selector: 'app-agenda-list',
  imports: [NgClass, DatePipe, SlicePipe, RouterLink, BarraComandos],
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
      next: resposta => this.registros.set(resposta)
    });
  }

  remover(id: number): void {
    if (confirm('Confirma cancelamento do agendamento?')) {
      this.servico.cancelar(id).subscribe({
        complete: () => {
          alert('Agendamento cancelado com sucesso!');
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
```

Pontos importantes:

- `signal<Atendimento[]>([])`: cria um Signal reativo iniciado com uma lista vazia. O Signal notifica o Angular para re-renderizar o template quando o valor muda.
- `registros.set(resposta)`: atualiza o Signal com os dados recebidos da API.
- `consultar()` filtra por status `['AGENDADO', 'CONFIRMADO']`, exibindo apenas agendamentos pendentes.
- O método `remover()` cancela o agendamento (exclusão lógica via `DELETE`) e recarrega a lista.
- `implements OnInit`: interface que obriga a implementação do método `ngOnInit()`, chamado pelo Angular logo após a inicialização do componente.

### AgendaForm

**src/app/paginas/atendimento/agenda-form/agenda-form.ts:**

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Atendimento } from '../atendimento';
import { Convenio } from '../../convenio/convenio';
import { Paciente } from '../../paciente/paciente';
import { Profissional } from '../../profissional/profissional';
import { AtendimentoApi } from '../atendimento-api';
import { ConvenioApi } from '../../convenio/convenio-api';
import { PacienteApi } from '../../paciente/paciente-api';
import { ProfissionalApi } from '../../profissional/profissional-api';

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

  registro = signal(<Atendimento>{});
  convenios = signal<Convenio[]>([]);
  pacientes = signal<Paciente[]>([]);
  profissionais = signal<Profissional[]>([]);

  compareById = (a: any, b: any) => (a && b && a.id == b.id) || (!a && !b);

  ngOnInit(): void {
    this.servicoConvenio.consultarAtivos().subscribe({
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
    });
  }
}
```

Pontos importantes:

- `ActivatedRoute`: permite ler parâmetros da URL atual. `queryParamMap.get('id')` recupera o parâmetro `id` da query string (ex: `/agenda-form?id=5`).
- O operador `+id` converte a string `'5'` para o número `5`.
- `compareById`: função comparadora necessária para que o Angular identifique qual opção de um `<select>` corresponde ao objeto atual no modelo, comparando pelo campo `id`.
- Quando existe um `id` na URL, o formulário carrega os dados do registro para edição. Caso contrário, opera em modo de criação.
- `Router` permite navegar programaticamente. Após salvar, o usuário é redirecionado para a lista.

### Testar a comunicação com o back-end

Ao executar `ng serve` e navegar para `/agenda-list`, a aplicação tentará acessar `http://localhost:9000/atendimento/consultar?status=AGENDADO,CONFIRMADO`. Verifique no console do navegador (F12) se há erros de CORS.

> [!IMPORTANT]
> Certifique-se de que o back-end está configurado para aceitar requisições da origem `http://localhost:4200`. No Spring Boot, adicionar a origem ao `FiltroCors`:
>
> ```java
> config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
> ```

## 10. Interceptador de Erros

O interceptador centraliza o tratamento de erros HTTP, exibindo um alerta ao usuário em caso de falha, sem precisar tratar o erro em cada chamada individualmente.

### Criar o interceptador

```bash
ng generate interceptor compartilhado/interceptor/erro
```

**erro-interceptor.ts:**

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((erro) => {
      let mensagemErro = 'Falha na requisição.';
      alert(mensagemErro);
      return throwError(() => erro);
    })
  );
};
```

- `catchError` intercepta qualquer erro na resposta HTTP e exibe uma mensagem de alerta via `alert()`.
- `throwError(() => erro)` repassa o erro para que os componentes também possam tratá-lo se necessário.

### Registrar o interceptador

**app.config.ts** (atualizar):

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { erroInterceptor } from './compartilhado/interceptor/erro-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([erroInterceptor])),
  ],
};
```

## Resumo da Estrutura Final

```text
src/app/
├── compartilhado/
│   ├── componentes/
│   │   └── barra-comandos/
│   │       ├── barra-comandos.ts
│   │       └── barra-comandos.html
│   └── interceptor/
│       └── erro-interceptor.ts
├── paginas/
│   ├── atendimento/
│   │   ├── agenda-form/
│   │   │   ├── agenda-form.ts
│   │   │   └── agenda-form.html
│   │   ├── agenda-list/
│   │   │   ├── agenda-list.ts
│   │   │   └── agenda-list.html
│   │   ├── atendimento-list/
│   │   │   ├── atendimento-list.ts
│   │   │   └── atendimento-list.html
│   │   ├── atendimento.ts
│   │   └── atendimento-api.ts
│   ├── convenio/
│   │   ├── convenio.ts
│   │   └── convenio-api.ts
│   ├── paciente/
│   │   ├── paciente.ts
│   │   └── paciente-api.ts
│   └── profissional/
│       ├── profissional.ts
│       └── profissional-api.ts
├── app.ts
├── app.html
├── app.routes.ts
└── app.config.ts
```
