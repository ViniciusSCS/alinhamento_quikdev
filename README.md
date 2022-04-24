# Sobre

- Projeto de Alinhamento da Equipe que lidero na QuikDev. Nesse projeto é possivel realizar um cadastro simples de pessoas/usuários.
- Utilizado o banco de dados MySQL.
- Para facilitar minha conexão usei o Sequelize, um ORM para NodeJs baseado em promise, fazendo um mapeamento de dados relacionais (tabelas, colunas e linhas) para objetos JavaScript.
- Utilizei Docker.
- O Freamework Express do NodeJS.
- O projeto se trata de um cadastro de Pessoas, onde cada pessoa tem seu perfil e cada perfil tem suas responsabilidades.

# Aprendizados

- Docker.
- Sequelize com MySQL.
- Desenvolvimento de um CRUD completo.
- Relacionamento entre tabelas


# Iniciar o Projeto

- Comandos
  - npm i -> para instalar as bibliotecas necessárias para o funcionamento do porojeto.
  - docker-compose build -> para buildar o projeto com o Docker.
  - docker-compose up -d -> para subir o conteiner do projeto no Docker.

- Rotas do People
  - /people/me -> GET (precisa estar logado)
  - /people/ -> GET (precisa estar logado)
  - /people/ -> POST
  - /people/login -> POST
  - /people/:id -> PUT (precisa estar logado)
  - /people/:id -> delete (precisa estar logado)
