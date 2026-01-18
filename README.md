# 🥋 WebDojo - A Jornada do Ninja do Cypress

![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/Status-Evoluindo%20a%20cada%20café-orange?style=for-the-badge)

## 🚧 Sobre o Projeto

Bem-vindo ao meu dojo! ⛩️

Este repositório é o diário de bordo da minha evolução no **Curso Ninja do Cypress**. Aqui não tem "Hello World" básico não, aqui a gente automatiza a vida real!

O **WebDojo** simula uma aplicação completa (Front, Back e Banco), e minha missão é garantir que nada quebre enquanto eu durmo, cobrindo as funcionalidades críticas com testes End-to-End (E2E) robustos.

## 🚀 O que está rolando (Features Automatizadas)

A suíte de testes já está batendo forte nos seguintes cenários da interface Web:

- **🔐 Autenticação:** Login (porque se não logar, nem adianta testar o resto).
- **🖱️ Interações de Respeito:**
  - **Drag and Drop:** Arrastando cards no Kanban como se fosse mágica.
  - **Iframes:** Entrando em "sites dentro de sites" sem medo.
  - **Hover & Tooltips:** Caçando elementos que tentam se esconder.
- **📂 Arquivos:** Upload e Download testados e aprovados.
- **🔗 Navegação:** Verificando se os links levam para onde devem (e não para o limbo).

## 🛠️ O Arsenal Tecnológico

A stack cresceu! Agora o projeto conta com:

### 🧪 Testes & Front
- **[Cypress](https://www.cypress.io/):** O dono da festa.
- **JavaScript:** Porque tipagem estática é para os fracos (brincadeira... ou não).
- **Node.js:** O motor de tudo.

### ⚙️ Backend & Infra (Novidade!)
- **Docker & Compose:** Ambiente subindo em containers, sem o clássico "na minha máquina funciona".
- **Express & Prisma:** API moderna para servir os dados.
- **PostgreSQL:** Banco de dados relacional rodando liso no Docker.

## 🏃 Como Rodar (Sem dor de cabeça)

Quer ver a mágica acontecer na sua máquina? Segue o roteiro:

### 1. Subindo a Infraestrutura (Modo Deus)
Como já temos Docker, você não precisa instalar banco de dados na mão. Só rode:

```bash
docker-compose up -d