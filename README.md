# Cadastro de Pacientes — Angular

Aplicação acadêmica para **cadastrar, consultar, editar e excluir pacientes** em uma interface Angular. O projeto é um exercício de componentes, formulários e gerenciamento de estado no frontend; **não constitui um sistema de prontuários para uso clínico real**.

## Funcionalidades identificadas no código

O serviço `src/app/services/paciente.service.ts` implementa:

- Listagem reativa dos registros com `BehaviorSubject` e `Observable`.
- Cadastro com identificador incremental.
- Edição e exclusão de pacientes.
- Busca por identificador e limpeza da lista.
- Registro inicial de exemplo para demonstrar a interface.

O modelo `src/app/paciente.model.ts` declara os campos: identificador, nome completo, CPF, data de nascimento e e-mail.

**Persistência:** os dados são mantidos em memória pelo serviço Angular. Não foi identificada persistência em banco de dados nesse serviço; alterações podem ser perdidas ao recarregar a aplicação.

## Tecnologias

- Angular e TypeScript
- RxJS
- Angular CLI

## Executar

Requer Node.js e npm compatíveis com a versão instalada do Angular.

```bash
git clone https://github.com/gusty22/CadastroPacientes-Angular.git
cd CadastroPacientes-Angular
npm ci
npm start
```

Se a versão do projeto não tiver o script `start`, utilize `npx ng serve`. Acesse o endereço local exibido no terminal (normalmente `http://localhost:4200`).

## Organização

```text
src/app/
├── paciente.model.ts          # Modelo de dados
├── services/
│   └── paciente.service.ts    # Operações de cadastro em memória
├── app.component.*            # Interface principal
└── app.module.ts
```

## Limitações e evolução

- Projeto demonstrativo; **não utilizar dados pessoais reais**.
- A ausência de persistência no serviço limita o uso à sessão da aplicação.
- Para evolução: API, banco de dados, validações adicionais, controle de acesso e testes de integração.

## Propósito

Estudo de operações CRUD e atualização reativa de estado com Angular.
