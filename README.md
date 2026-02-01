# 🥋 WebDojo - QA Automation Portfolio

![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

> **Projeto de Automação Full Stack:** Testes End-to-End (Web) e Testes de Integração (API) em ambiente containerizado.

## 📋 Sobre o Projeto

Este repositório demonstra uma estratégia robusta de **Garantia de Qualidade (QA)** aplicada a uma aplicação moderna (Full Stack). O objetivo não é apenas testar a interface, mas garantir a confiabilidade do sistema em diferentes camadas.

O **WebDojo** simula uma aplicação real com Front-end, Back-end (API REST) e Banco de Dados, onde aplico cenários complexos de automação.

### 🎯 Destaques Técnicos (Para Recrutadores)
* **Arquitetura Híbrida:** Testes de API para validação rápida de regras de negócio e Testes E2E para validação de fluxo do usuário.
* **Ambiente Isolado:** Uso de **Docker Compose** para orquestrar Banco de Dados e ferramentas de administração, garantindo que os testes rodem em qualquer máquina sem conflitos.
* **Controle de Estado:** Uso de `cy.task` e queries ao banco (Postgres) para criar e limpar massa de dados antes/depois dos testes, garantindo independência e atomicidade.
* **Bypass de GUI:** Login programático via manipulação de `localStorage` e Cookies para acelerar os testes que não focam na tela de login.
* **Feedback Visual:** Implementação de testes visuais e interações reais (hovers, drag-and-drop) utilizando `cypress-real-events`.

---

## 🛠️ Stack Tecnológica

* **Automação:** [Cypress](https://www.cypress.io/) (v13+)
* **Linguagem:** JavaScript (ES6+)
* **API Testing Plugin:** `cypress-plugin-api` (para feedback visual das chamadas REST)
* **Banco de Dados:** PostgreSQL 13 (via Docker)
* **ORM:** Prisma (para migrações e seeding)
* **Gerador de Massa:** `@faker-js/faker`
* **Infraestrutura:** Docker & Docker Compose

---

## 🧪 Cobertura de Testes

O projeto está dividido em duas frentes de testes:

### 1. 🌐 Web (End-to-End)
Foco na experiência do usuário e fluxos críticos.
* **Autenticação:** Login (Sucesso, Falhas, Validação de Token JWT).
* **Cadastro:** Fluxos de registro de novos usuários.
* **Usabilidade Avançada:**
    * **Kanban:** Testes de *Drag and Drop*.
    * **Iframes:** Interação com elementos dentro de contextos isolados.
    * **Hovers:** Validação de elementos que aparecem apenas com o mouse.
    * **Upload/Download:** Manipulação de arquivos.
* **Consultoria:** Validação de formulários complexos e cadastros.

### 2. 🔌 API (Backend)
Foco em regras de negócio, contratos e códigos de status HTTP.
* **Rotas de Usuários (`/users`):**
    * `POST`: Criação de usuários (validação de campos obrigatórios, e-mails duplicados).
    * `GET`: Listagem e busca de usuários.
    * `PUT`: Atualização cadastral.
    * `DELETE`: Remoção de usuários.
* **Validações:** Schema check, Status Code (200, 201, 400, 409, etc.) e Mensagens de Erro.

---

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para levantar o ambiente e executar os testes.

### Pré-requisitos
* [Node.js](https://nodejs.org/) (v18 ou superior)
* [Docker](https://www.docker.com/) & Docker Compose
* [Git](https://git-scm.com/)

### 1. Clone o Repositório
```bash
git clone [https://github.com/seu-usuario/ninjadocypress.git](https://github.com/seu-usuario/ninjadocypress.git)
cd ninjadocypress
