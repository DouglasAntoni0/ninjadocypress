# 🥷 WebDojo | Portfólio Avançado de QA Automation com Cypress, API, Banco de Dados e Docker

![Capa do projeto](.github/cover.png)

![Cypress](https://img.shields.io/badge/Cypress-E2E%20%26%20API-69D3A7?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-API-111111?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-0db7ed?style=for-the-badge&logo=docker&logoColor=white)
![Bruno](https://img.shields.io/badge/Bruno-API%20Collection-F37021?style=for-the-badge&logo=bruno&logoColor=white)

> 🚀 Um projeto de automação full stack construído para demonstrar domínio prático em testes de interface, testes de API, isolamento de ambiente, gestão de massa de dados, integração com banco relacional e desenho de cenários que se aproximam de problemas reais de produto.

---

## 📚 Sumário

- [✨ Visão geral](#visao-geral)
- [🎯 O que este projeto demonstra](#o-que-este-projeto-demonstra)
- [🏗️ Arquitetura da solução](#arquitetura-da-solucao)
- [🧰 Stack tecnológica](#stack-tecnologica)
- [📂 Estrutura do projeto](#estrutura-do-projeto)
- [🧪 Estratégia de testes](#estrategia-de-testes)
- [🌐 Cobertura da automação web](#cobertura-da-automacao-web)
- [🔌 Cobertura da automação de API](#cobertura-da-automacao-de-api)
- [⚔️ Técnicas avançadas aplicadas](#tecnicas-avancadas-aplicadas)
- [🧱 Controle de massa e confiabilidade](#controle-de-massa-e-confiabilidade)
- [🐳 Infraestrutura e serviços](#infraestrutura-e-servicos)
- [🚀 Como executar localmente](#como-executar-localmente)
- [🕹️ Scripts e comandos úteis](#scripts-e-comandos-uteis)
- [📮 Coleção Bruno](#colecao-bruno)
- [🎥 Evidências e artefatos](#evidencias-e-artefatos)
- [💼 Competências técnicas evidenciadas](#competencias-tecnicas-evidenciadas)
- [🛣️ Próximas evoluções](#proximas-evolucoes)
- [🏁 Fechamento](#fechamento)

---

<a id="visao-geral"></a>

## ✨ Visão geral

O **WebDojo** é uma vitrine técnica de QA moderna. Em vez de limitar a automação a um conjunto superficial de cliques, este repositório cobre o ecossistema completo da aplicação:

- 🌐 **Front-end web** servido a partir de uma build estática pronta para teste
- 🔌 **API REST em Node.js + Express**
- 🗃️ **Banco de dados PostgreSQL**
- 🧠 **ORM Prisma** para modelagem e migração
- 🧪 **Cypress** atuando em duas frentes: E2E e API testing
- 🐳 **Docker Compose** para padronizar infraestrutura local
- 📮 **Bruno** como coleção complementar para exploração e validação manual de endpoints

Mais do que “rodar testes”, o foco aqui é demonstrar capacidade de:

- pensar a automação por camadas
- estabilizar o ambiente
- preparar e limpar dados
- reduzir flakiness
- acelerar execução sem sacrificar cobertura
- documentar com clareza a estratégia adotada

---

<a id="o-que-este-projeto-demonstra"></a>

## 🎯 O que este projeto demonstra

- ✅ Automação E2E cobrindo autenticação, cadastro, formulários, integrações externas, iframes, alerts, hover, drag and drop e manipulação de links
- ✅ Testes de API cobrindo operações de criação, leitura, atualização e remoção de usuários
- ✅ Validação de contratos HTTP com foco em status code, mensagens de erro e regras básicas de negócio
- ✅ Interação com banco de dados para limpar massa antes da execução dos testes
- ✅ Uso de `cy.task()` para integrar Cypress com consultas SQL
- ✅ Login programático via `localStorage` e `cookies`, acelerando cenários que não precisam validar a tela de autenticação
- ✅ Mock de chamadas externas com `cy.intercept()` para garantir previsibilidade
- ✅ Geração de dados dinâmicos com `@faker-js/faker`
- ✅ Estrutura modular com comandos customizados e support files organizados
- ✅ Separação clara entre automação de API, automação web, infraestrutura e utilitários

---

<a id="arquitetura-da-solucao"></a>

## 🏗️ Arquitetura da solução

```mermaid
flowchart LR
    QA["Pessoa QA / Execução dos testes"] --> WEBTEST["Cypress E2E<br/>módulo web"]
    QA --> APITEST["Cypress API<br/>módulo api"]
    WEBTEST --> FRONT["WebDojo Front-end<br/>build estática em web/dist"]
    APITEST --> API["Express API<br/>localhost:3333"]
    API --> PRISMA["Prisma ORM"]
    PRISMA --> POSTGRES["PostgreSQL 13"]
    APITEST --> TASKS["cy.task + pg-promise"]
    TASKS --> POSTGRES
    BRUNO["Bruno Collection"] --> API
    DOCKER["Docker Compose + PgAdmin"] --> POSTGRES
```

### 🔎 Leitura prática da arquitetura

- O módulo **web** consome uma aplicação já publicada em build estática, o que concentra a atenção do repositório na engenharia de testes sobre uma interface funcional.
- O módulo **api** expõe uma API REST em `Express`, persistindo dados em `PostgreSQL`.
- O **Prisma** conecta a aplicação ao banco e mantém a estrutura do modelo `User`.
- O **Cypress** atua de duas maneiras:
  - como suíte E2E sobre a aplicação web
  - como suíte de testes de API contra endpoints reais
- O **pg-promise**, acionado via `cy.task()`, ajuda a preparar e limpar dados diretamente no banco para manter os testes independentes.

---

<a id="stack-tecnologica"></a>

## 🧰 Stack tecnológica

| Camada | Tecnologia | Papel no projeto |
| --- | --- | --- |
| Linguagem | JavaScript (ES6+) | Implementação da API e automações |
| Testes E2E e API | Cypress | Execução da suíte principal |
| Interações reais de UI | `cypress-real-events` | Hover e eventos mais próximos do uso humano |
| Feedback visual de API | `cypress-plugin-api` | Inspeção amigável de requisições e respostas |
| Back-end | Node.js + Express | Exposição dos endpoints REST |
| Banco de dados | PostgreSQL 13 | Persistência dos usuários |
| ORM | Prisma | Modelagem, geração de client e migrations |
| Limpeza de dados | `pg-promise` | Acesso direto ao banco em tasks do Cypress |
| Geração de massa | `@faker-js/faker` | Dados variáveis e mais próximos do mundo real |
| Infraestrutura | Docker Compose | Orquestração do banco e do PgAdmin |
| Testes manuais de API | Bruno | Coleção de requests para exploração complementar |

---

<a id="estrutura-do-projeto"></a>

## 📂 Estrutura do projeto

```text
.
├── .github/
│   └── cover.png
├── api/
│   ├── bruno/
│   │   └── WebDojo/
│   ├── cypress/
│   │   ├── e2e/
│   │   ├── fixtures/
│   │   └── support/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── cypress.config.js
│   ├── index.js
│   ├── package.json
│   └── prismaClient.js
├── web/
│   ├── cypress/
│   │   ├── downloads/
│   │   ├── e2e/
│   │   ├── fixtures/
│   │   ├── support/
│   │   └── videos/
│   ├── dist/
│   ├── webdojo-beta4/
│   │   └── dist/
│   ├── cypress.config.js
│   └── package.json
├── docker-compose.yaml
└── README.md
```

### 🧩 Organização por responsabilidade

- `api/`: contém a API, modelagem do banco, testes de API e coleção Bruno.
- `web/`: contém a suíte E2E, fixtures, comandos customizados, vídeos e a build estática da aplicação.
- `docker-compose.yaml`: sobe o PostgreSQL e o PgAdmin.
- `.github/cover.png`: banner visual para apresentação pública do projeto.

---

<a id="estrategia-de-testes"></a>

## 🧪 Estratégia de testes

Este projeto não trata automação como um bloco único. A estratégia foi separada em camadas com objetivos distintos:

| Camada | Objetivo | Tipo de validação | Ganho principal |
| --- | --- | --- | --- |
| E2E Web | Validar experiência do usuário e integrações visíveis | Fluxo completo pela interface | Segurança sobre comportamento real do produto |
| API Testing | Validar regras de negócio e contratos HTTP | Requisições diretas aos endpoints | Feedback mais rápido e diagnóstico mais preciso |
| Banco de Dados | Controlar massa e garantir independência | Limpeza via SQL com `cy.task()` | Redução de acoplamento entre cenários |
| Mocking seletivo | Estabilizar dependências externas ou focar na UI | `cy.intercept()` | Execução mais previsível |
| Exploração manual | Complementar observação técnica | Bruno collection | Visibilidade rápida da API fora da automação |

### 🧠 Filosofia adotada

- O que precisa ser validado **pela interface**, é testado pela interface.
- O que pode ser validado com mais precisão **pela API**, é validado pela API.
- O que pode gerar instabilidade por dependência externa, é **mockado de forma consciente**.
- O que precisa de previsibilidade entre execuções, recebe **controle explícito de massa de dados**.

---

<a id="cobertura-da-automacao-web"></a>

## 🌐 Cobertura da automação web

A suíte web está focada em comportamento funcional e também em recursos mais avançados de automação, indo além do fluxo feliz básico.

### 📋 Cenários automatizados no front-end

| Spec | Cobertura principal | Técnicas e pontos de destaque |
| --- | --- | --- |
| `login.cy.js` | Login com sucesso e falhas de autenticação | Validação de cookie, `localStorage` e token |
| `signup.cy.js` | Cadastro de usuário pela interface | `faker`, repetição controlada, intercept de cadastro |
| `consultancy.cy.js` | Formulário de consultoria individual e corporativa | Upload de arquivo, validação de obrigatórios, fixtures |
| `cep.cy.js` | Consulta de endereço por CEP | Mock de API externa com `cy.intercept()` |
| `github.cy.js` | Cadastro e remoção de perfis GitHub | Tabela dinâmica e validação de links |
| `hover.cy.js` | Comportamento de mouseover | `realHover()` com interação real |
| `iframe.cy.js` | Interação com conteúdo em iframe | Acesso ao `contentDocument` |
| `kanban.cy.js` | Movimento de cards entre colunas | Drag and drop com `DataTransfer` |
| `links.cy.js` | Links em nova guia e navegação controlada | Remoção de `target` para manter o fluxo no Cypress |
| `alerts.cy.js` | Alert, confirm e prompt | `window:alert`, `window:confirm`, `stub` de prompt |
| `expert.cy.js` | Experimentos avançados com elementos e teclado | `invoke()`, foco via `press()`, geração fake de dados |
| `studio.cy.js` | Exemplo de uso do Cypress Studio | Espaço de exploração e referência |

### 🧭 Fluxos relevantes presentes na suíte web

- 🔐 autenticação com credenciais válidas e inválidas
- 🧾 cadastro de conta com dados dinâmicos
- 🧠 login programático para acelerar jornadas autenticadas
- 📨 preenchimento de formulário complexo com:
  - máscara de telefone
  - seleção de tipo de consultoria
  - alternância entre pessoa física e jurídica
  - múltiplos canais de descoberta
  - upload de PDF
  - inclusão de stack tecnológica
  - aceite de termos
- 🌎 consulta de CEP com preenchimento automático de campos
- 🧲 interação com recursos menos triviais da UI, como hover, iframe, alertas e drag and drop

### 🔐 Credenciais de demonstração usadas nos testes web

| Campo | Valor |
| --- | --- |
| E-mail | `papito@webdojo.com` |
| Senha | `katana123` |

> 💡 Em parte dos cenários autenticados, o login é feito por injeção de token no `localStorage` e gravação de cookie de data para reduzir custo de setup e acelerar a suíte.

---

<a id="cobertura-da-automacao-de-api"></a>

## 🔌 Cobertura da automação de API

A suíte de API exerce o back-end de forma direta, com foco em retorno HTTP, mensagens de erro e persistência básica.

### 📋 Endpoints cobertos

| Método | Rota | Objetivo |
| --- | --- | --- |
| `GET` | `/` | Health check simples da API |
| `POST` | `/api/users/register` | Cadastro de usuário |
| `GET` | `/api/users` | Listagem de usuários |
| `PUT` | `/api/users/:id` | Atualização de usuário |
| `DELETE` | `/api/users/:id` | Remoção de usuário |

### ✅ O que está sendo validado na API

| Spec | Cobertura principal | Regras verificadas |
| --- | --- | --- |
| `post.cy.js` | Cadastro de usuário | sucesso, duplicidade e obrigatoriedade de campos |
| `get.cy.js` | Listagem de usuários | retorno 200 e integridade dos registros esperados |
| `put.cy.js` | Atualização de usuário | update com sucesso, 404 para usuário inexistente e validações obrigatórias |
| `delete.cy.js` | Exclusão de usuário | remoção bem-sucedida e 404 para usuário inexistente |

### 🧠 Regras importantes observadas no back-end

- O endpoint de cadastro impede e-mails duplicados com retorno `409`.
- Campos obrigatórios retornam `400` com mensagens específicas.
- JSON inválido recebe tratamento para retorno `400`.
- O endpoint de atualização valida existência prévia do usuário.
- O endpoint de exclusão valida se o registro ainda existe antes de remover.

---

<a id="tecnicas-avancadas-aplicadas"></a>

## ⚔️ Técnicas avançadas aplicadas

Este é um dos pontos mais fortes do repositório. Há várias decisões que elevam a automação para um nível mais profissional:

- 🧼 **Controle de massa no banco** com `cy.task("deleteUser")` antes de testes críticos
- ⚡ **Login programático** usando `localStorage` e cookies para evitar repetição desnecessária da UI
- 🛰️ **Mock seletivo de serviços externos** como a consulta de CEP, reduzindo flakiness
- 🧪 **Comandos customizados** para tornar a suíte mais legível e reutilizável
- 🧠 **Fixtures estruturadas** para representar cenários de consultoria e endereço
- 🎲 **Dados dinâmicos com faker** para evitar colisões previsíveis
- 🖱️ **Eventos reais de mouse** com `cypress-real-events`
- 📦 **Upload de arquivos** em fluxo de formulário
- 🪟 **Trabalho com iframe** e acesso ao DOM interno
- 🪄 **Interceptação de requests** para isolar comportamento da interface
- 🧲 **Drag and drop** usando `DataTransfer`
- ⌨️ **Navegação por teclado** com `cy.press()`
- 🔔 **Tratamento de alert, confirm e prompt** diretamente na janela do navegador
- 📡 **Visualização aprimorada das chamadas HTTP** com `cypress-plugin-api`

---

<a id="controle-de-massa-e-confiabilidade"></a>

## 🧱 Controle de massa e confiabilidade

Em automação madura, estabilidade não é sorte. Ela é desenhada.

Neste projeto, a previsibilidade da suíte é reforçada com:

- exclusão de usuários por e-mail antes de cenários que dependem de unicidade
- isolamento de dados entre execuções
- uso de `failOnStatusCode: false` quando o objetivo do teste é justamente validar respostas de erro
- separação entre fluxo real e fluxo mockado conforme a intenção do cenário
- validação explícita de payloads e mensagens retornadas pela API

### 🗄️ Como a limpeza funciona

O arquivo `api/cypress/support/database.js` usa `pg-promise` para conectar no PostgreSQL local e executar:

```sql
delete from public."User" where email = $1
```

Essa rotina é exposta ao Cypress via `task` em `api/cypress.config.js`, permitindo que a automação prepare o estado do banco antes de determinadas execuções.

Resultado prático:

- menos acoplamento entre testes
- menos falsa falha por sujeira de ambiente
- mais confiança para reexecutar a suíte várias vezes

---

<a id="infraestrutura-e-servicos"></a>

## 🐳 Infraestrutura e serviços

O `docker-compose.yaml` sobe dois serviços:

| Serviço | Imagem | Porta | Finalidade |
| --- | --- | --- | --- |
| `db` | `postgres:13` | `5432` | Banco principal da aplicação |
| `pgadmin` | `dpage/pgadmin4` | `15432` | Administração visual do banco |

### 🔑 Credenciais padrão da infraestrutura

| Recurso | Valor |
| --- | --- |
| Banco | `UserDB` |
| Usuário do banco | `dba` |
| Senha do banco | `dba` |
| PgAdmin e-mail | `dba@pgadmin.com` |
| PgAdmin senha | `dba` |
| Fuso configurado | `America/Sao_Paulo` |

### 📝 Observações importantes

- O Docker Compose **não sobe a API nem o front-end**; ele prepara a infraestrutura de suporte.
- A API roda localmente em `http://localhost:3333`.
- O front-end é servido localmente em `http://localhost:3000`.
- O módulo web é disponibilizado a partir de uma **build estática versionada**.

---

<a id="como-executar-localmente"></a>

## 🚀 Como executar localmente

### 1. Pré-requisitos

- Node.js 18+ instalado
- npm instalado
- Docker e Docker Compose disponíveis
- Git instalado

### 2. Clonar o repositório

```bash
git clone <url-do-seu-repositorio>
cd NinjaDoCypress
```

### 3. Subir a infraestrutura com Docker

Na raiz do projeto:

```bash
docker compose up -d
```

Se quiser validar os containers:

```bash
docker compose ps
```

### 4. Configurar e iniciar a API

Entre na pasta da API:

```bash
cd api
npm install
```

Crie o arquivo `.env` em `api/.env` com:

```env
DATABASE_URL="postgresql://dba:dba@localhost:5432/UserDB?schema=public"
```

Gere o client do Prisma e aplique a migration:

```bash
npx prisma generate
npx prisma migrate deploy
```

Agora suba a API:

```bash
npm run dev
```

API disponível em:

```text
http://localhost:3333
```

### 5. Configurar e iniciar o módulo web

Em outro terminal:

```bash
cd web
npm install
npm run dev
```

Aplicação disponível em:

```text
http://localhost:3000
```

### 6. Executar os testes de API

Ainda na pasta `api`:

```bash
npx cypress open
```

Ou em modo headless:

```bash
npx cypress run
```

### 7. Executar os testes web

Na pasta `web`:

```bash
npx cypress open
```

Ou em modo headless:

```bash
npx cypress run
```

---

<a id="scripts-e-comandos-uteis"></a>

## 🕹️ Scripts e comandos úteis

### `web/package.json`

| Script | O que faz |
| --- | --- |
| `npm run dev` | Serve a build estática em `localhost:3000` |
| `npm run test` | Executa toda a suíte web em headless |
| `npm run test:login` | Executa apenas o spec de login |
| `npm run test:cep` | Executa apenas o spec de consulta de CEP |
| `npm run test:consultancy` | Executa apenas o formulário de consultoria |
| `npm run test:github` | Executa apenas o spec de perfis GitHub |
| `npm run test:hovers` | Executa apenas o spec de hover |
| `npm run test:iframe` | Executa apenas o spec de iframe |
| `npm run test:kanban` | Executa apenas o spec de kanban |
| `npm run test:links` | Executa apenas o spec de links |
| `npm run test:login:mobile` | Executa login simulando viewport mobile |

### `api/package.json`

| Script | O que faz |
| --- | --- |
| `npm run start` | Sobe a API com Node |
| `npm run dev` | Sobe a API com Nodemon |

### Comandos rápidos de apoio

```bash
# validar health check da API
curl http://localhost:3333
```

PgAdmin disponível em:

```text
http://localhost:15432
```

---

<a id="colecao-bruno"></a>

## 📮 Coleção Bruno

Além do Cypress, o repositório também inclui uma coleção Bruno em:

```text
api/bruno/WebDojo
```

Ela contém requests para:

- `Online`
- `Create new user`
- `Get Users`
- `update a user`
- `Delete a user`

### 💡 Por que isso é valioso?

- permite inspeção rápida dos endpoints sem depender da suíte automatizada
- ajuda em validações manuais, smoke tests e exploração técnica
- complementa a visão de qualidade com uma abordagem híbrida entre automação e inspeção direta

---

<a id="evidencias-e-artefatos"></a>

## 🎥 Evidências e artefatos

O projeto já mantém artefatos que fortalecem sua apresentação pública:

- 🖼️ banner do projeto em `.github/cover.png`
- 🎬 vídeos de execução em `web/cypress/videos/`
- 📁 fixtures para cenários repetíveis em `web/cypress/fixtures/` e `api/cypress/fixtures/`
- 📮 coleção Bruno para exploração de endpoints
- 🗃️ migration do banco em `api/prisma/migrations/`

### 📌 Exemplos de evidências presentes no repositório

- gravações dos fluxos de login, CEP, consultoria, GitHub, hover, iframe, kanban, links e signup
- fixtures com dados de CEP, formulário individual e formulário empresarial
- modelagem explícita da entidade `User`

---

<a id="competencias-tecnicas-evidenciadas"></a>

## 💼 Competências técnicas evidenciadas

Este repositório foi pensado para mostrar domínio prático em áreas que costumam diferenciar um trabalho mais básico de um trabalho mais robusto:

- arquitetura de automação por camadas
- desenho de cenários com intenção clara
- uso estratégico de mocks e fluxos reais
- controle de estado e massa de dados
- integração entre automação e banco relacional
- testes de API com validação de contrato e regras de negócio
- automação de interface com foco em comportamento real
- reutilização via comandos customizados
- organização de projeto voltada para manutenção
- documentação técnica orientada à leitura pública

---

<a id="proximas-evolucoes"></a>

## 🛣️ Próximas evoluções

Embora o projeto já demonstre uma base forte, ele também abre espaço para evoluções interessantes:

- 📊 integração com relatórios como Mochawesome ou Allure
- 🔄 pipeline CI/CD para execução automática em pull requests
- 🧪 contract testing mais formalizado
- 🧬 geração de dados ainda mais sofisticada por factories
- 🌍 parametrização por ambientes
- 📸 screenshots automáticos para falhas críticas
- 📦 script raiz para orquestrar subida completa de ambiente
- 🛡️ validações adicionais de segurança e autenticação na API

---

<a id="fechamento"></a>

## 🏁 Fechamento

O **WebDojo** não é apenas uma coleção de testes. Ele funciona como um laboratório técnico de automação full stack, combinando interface, API, banco de dados, infraestrutura local e documentação em uma mesma solução.

Se a ideia é transmitir profundidade técnica, clareza de raciocínio e maturidade na forma de automatizar, este repositório foi estruturado exatamente para isso: mostrar não só que os testes existem, mas que existe uma **estratégia** por trás deles. 🥷🔥

---

## ☕ Nota final

Projeto construído com foco em qualidade, consistência, legibilidade e demonstração prática de automação aplicada de ponta a ponta.
