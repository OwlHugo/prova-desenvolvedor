# Prova Técnica – Desenvolvedor Full Stack

## Stack

* Laravel 12
* ReactJS
* InertiaJS
* MySQL
* Docker / Docker Compose

---

## Objetivo

Desenvolver uma aplicação full stack para cadastro de **Alunos** e **Cursos**, seguindo boas práticas de arquitetura, organização de código e uso correto das tecnologias propostas.

---

## Requisitos Funcionais

### Cursos

Campos:

* Código do Curso
* Nome do Curso

Funcionalidades:

* CRUD completo
* Filtros por todos os campos
* Paginação (5 registros por página)
* Criação, edição e exclusão

### Alunos

Campos:

* Matrícula
* Nome
* Curso
* Endereço

Funcionalidades:

* CRUD completo
* Filtros por todos os campos
* Paginação (5 registros por página)
* Criação, edição e exclusão

---

## Relatórios

1. Quantitativo de alunos por curso
2. Listagem de alunos agrupados por curso e ordenados alfabeticamente

---

## Requisitos Técnicos

* Uso obrigatório de migrations e seeders
* Relacionamentos Eloquent bem definidos
* Backend com Laravel 12
* Frontend em ReactJS utilizando InertiaJS
* Paginação e filtros realizados no backend
* Aplicação totalmente containerizada (incluindo banco de dados)

### Diferenciais (Bônus)

* Observers
* Schedules / Cron
* Clean Code
* Soft Deletes
* Testes automatizados

---

## Docker

A aplicação deve subir com um único comando:

```bash
docker-compose up -d
```

Containers esperados:

* App Laravel
* MySQL

---

## Entrega

1. Fazer fork do repositório
2. Criar uma branch com seu **nome completo**
3. Implementar a solução
4. Gravar um vídeo demonstrando todas as funcionalidades
5. Publicar o vídeo no YouTube
6. Inserir o link do vídeo abaixo

### Vídeo de Demonstração

**Link do vídeo:** [https://youtu.be/bZzVuCU4MGI](https://youtu.be/bZzVuCU4MGI)

---

## Observações

* A clareza do código será avaliada
* Organização e padronização são essenciais
* Commits pequenos e descritivos são recomendados
