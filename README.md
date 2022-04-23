# Sobre

- Projeto de Alinhamento da Equipe que lidero na QuikDev. Nesse projeto é possivel realizar um cadastro simples de pessoas/usuários.
- Aqui é utilizado o banco de dados MySQL.
- Para facilitar minha conexão usei o Sequelize, um ORM para NodeJs baseado em promise, fazendo um mapeamento de dados relacionais (tabelas, colunas e linhas) para objetos JavaScript.
- Utilizei Docker.
- O Freamework Express do NodeJS

# Aprendizados

- Docker.
- Sequelize com MySQL.
- Desenvolvimento de um CRUD completo.


# Iniciar o Projeto

- Comandos
  - npm i -> para instalar as bibliotecas necessárias para o funcionamento do porojeto.
  - docker-compose build -> para buildar o projeto com o Docker.
  - docker-compose up -d -> para subir o conteiner do projeto no Docker.

- Rotas do People
  - /people/me -> GET
  - /people/ -> GET
  - /people/ -> POST
  - /people/login -> POST
  - /people/:id -> PUT
  - /people/:id -> delete
