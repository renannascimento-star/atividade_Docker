# frameworks-front-end-t9

Repositório da disciplina Frameworks Front-end (Turma 9)

## Atualizando o repositório local

O código produzido em sala de aula, e compartilhado neste repositório, pode ser atualizado no repositório local com o comando:

```console
git pull
```

No entanto, se foram feitas alterações no repositório local, o comando acima pode gerar conflitos. Para evitar lidar com isso, é possível forçar uma atualização com o repositório remoto por meio dos comandos:

```console
git fetch origin
git reset --hard origin/main
```

O primeiro comando recebe as atualizações mais recentes do repositório remoto, e o segundo descarta todas as alterações locais e atualiza com o histórico mais recente do repositório remoto (branch main).

## Dependências do projeto

As dependências do projeto não são compartilhadas no repositório. Para instalar as dependências, a partir da raiz do projeto, no prompt de comandos, digite: `npm install`.

## Ambiente de Desenvolvimento

> [!WARNING]
> A preparação adequada do ambiente de desenvolvimento é fundamental para o bom andamento das atividades da disciplina. Dedique atenção a esse passo e certifique-se de que o ambiente está corretamente configurado.

- [Preparação do Ambiente de Desenvolvimento Back-end](https://github.com/webacademyufac/tutoriais/blob/main/ambiente-desenvolvimento-backend.md)
- [Preparação do Ambiente de Desenvolvimento Front-end](https://github.com/webacademyufac/tutoriais/blob/main/ambiente-desenvolvimento-frontend.md)

## Material de Apoio

### Sites de referência

- Angular Docs: <https://v21.angular.dev/overview>
- TypeScript Documentation: <https://www.typescriptlang.org/docs/>
- MDN Web Docs - Aprendendo desenvolvimento web: <https://developer.mozilla.org/pt-BR/docs/Learn>
- Using Angular in Visual Studio Code: <https://code.visualstudio.com/docs/nodejs/angular-tutorial>
- Engenharia de Software Moderna: <https://engsoftmoderna.info/>

### SGCM - Sistema de Gerenciamento de Clínica Médica

A demonstração de uso das ferramentas e tecnologias abordadas na capacitação é baseada em um projeto de exemplo, o SGCM. A documentação do projeto está disponível [em outro repositório](https://github.com/webacademyufac/sgcmdocs):

- [Principais funcionalidades](https://github.com/webacademyufac/sgcmdocs#principais-funcionalides)
- [Histórias de usuário](https://github.com/webacademyufac/sgcmdocs#histórias-de-usuário)
- [Fluxo de Atendimento](https://github.com/webacademyufac/sgcmdocs#fluxo-de-atendimento)
- [Diagrama de Classes](https://github.com/webacademyufac/sgcmdocs#diagrama-de-classes)
- [Diagrama Entidade Relacionamento](https://github.com/webacademyufac/sgcmdocs#diagrama-entidade-relacionamento)

### Conteúdo da Disciplina

- [Texto de Referência](./docs) — Fundamentos teóricos: Frameworks JavaScript, TypeScript, Angular, componentes, roteamento, templates e comunicação com APIs REST.
- [Tutorial](./docs/TUTORIAL.md) — Construção do front-end para funcionalidade de agendamento do SGCM.

## Atividades práticas

> [!NOTE]
>
> - As atividades serão realizadas com o GitHub Classroom e podem ser acessadas pelos links nas descrições das atividades.
> - No primeiro acesso, _**cada aluno deverá selecionar seu nome na lista para vincular sua conta no GitHub**_ e aceitar o convite para a atividade prática.
> - O repositório da atividade prática será criado automaticamente para cada aluno ou grupo (compartilhado entre os membros).
> - O aluno deverá clonar o repositório para seu computador, fazer as modificações necessárias e subir o repositório para o GitHub (`git push`).
> - Não é necessário nenhuma outra ação para submeter a atividade.
> - Nas atividades em grupo, ao acessar o link da atividade, o aluno deverá criar seu grupo ou ingressar no seu respectivo grupo se existir.

> [!IMPORTANT]
> _**Todos os membros dos grupos devem participar das atividades**_, registrando esta participação por meio da identificação dos commits com seus respectivos usuários no GitHub.

> [!CAUTION]
> Para atividades avaliadas automaticamente, **não modifique ou exclua** os arquivos responsáveis pela avaliação. Dependendo do escopo da atividade, isso pode incluir arquivos localizados nos diretórios `src/test/java` e `.github/workflows`, bem como arquivos com extensão `*.spec.ts`, ou quaisquer outros destinados exclusivamente à automação da avaliação.

1. [INDIVIDUAL] Revisar conceitos básicos de JavaScript e TypeScript através de exercícios práticos.

    - Implementar funções de manipulação de arrays em JavaScript.
    - Criar classes com herança em TypeScript.
    - Trabalhar com objetos e funções de alta ordem em JavaScript.
    - Definir tipos personalizados e union types em TypeScript.
    - Link da atividade: <https://classroom.github.com/a/JmonjTY4>
    - Entrega: 26/06/2026 - 18:00h

2. [GRUPO] Criar componentes para as demais entidades do sistema, implementando os métodos necessários para as operações CRUD, de forma semelhante aos componentes `AgendaForm`, `AgendaList`, além do serviço `AtendimentoApi`, e baseado na [documentação do SGCM](https://github.com/webacademyufac/sgcmdocs).

    - As rotas para `Usuario`, `Especialidade` e `Unidade`, devem iniciar com `/config`.
      - Exemplo: `/config/usuario-list`
    - Os componentes que listam os registros devem exibir o componente `BarraComandos` e implementar a funcionalidade de filtro por termo de busca.
      - O botão "Adicionar" do componente `BarraComandos` deve direcionar para o formulário da respectiva entidade.
    - O total de registros no rodapé da tabela deve refletir a quantidade de registros exibidos.
    - Caso não haja registros, deve exibir a mensagem "Nenhum registro encontrado" no rodapé da tabela.
    - Uma mensagem de confirmação deve ser exibida quando salvar um registro, informando o ID gerado para um novo registro e que o registro foi atualizado com sucesso, e em seguida redirecionar para a tela de listagem.
      - Uma mensagem também deve ser exibida confirmando a exclusão de um registro.
    - Os botões "Salvar" e "Cancelar" nos formulários devem redirecionar para a tela de listagem da respectiva entidade.
    - O componente `AtendimentoList` deve filtrar registros com status `CHEGADA` ou `ATENDIMENTO`.
      - Quando o status do atendimento for `ATENDIMENTO`, o botão `Iniciar` deve ficar oculto e o botão `Finalizar` deve ser exibido.
      - Quando o status do atendimento for `CHEGADA`, o botão `Finalizar` deve ficar oculto e o botão `Iniciar` deve ser exibido.
    - Link da atividade: <https://classroom.github.com/a/XIuQ5yyK>
    - Entrega: 04/07/2026 - 23:59h

    **Solução:** <https://github.com/webacademyufac/frameworks-front-end-t9/commit/35101ca>
