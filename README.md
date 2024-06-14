<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">API NodeJs com MySQL.</p>
    <p align="center">

## Descrição

Repositório com frameworks [Nest](https://github.com/nestjs/nest), [TypeScript](https://github.com/microsoft/TypeScript), [Prisma](https://github.com/prisma/prisma) e [MySQL](https://github.com/mysql).

## Instalação

```bash
$ npm install
```

## Configuração do Banco de Dados

```bash
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente (ajuste conforme necessário para o seu ambiente):

#env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

#api-key para autenticação
API_KEY= ""

# Executar as migrações do Prisma para configurar o banco de dados
$ npx prisma migrate dev

#popular banco de dados com emblemas
$ npm run seed

```

## Executando o aplicativo

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build
$ npm run build

# production mode
$ npm run start:prod
```

### Explicações Adicionais:

1. **Configuração do Banco de Dados**: Inclui instruções para configurar a conexão do banco de dados no arquivo `.env`.
2. **Executar Migrações**: Instruções claras sobre como rodar as migrações do Prisma para configurar o banco de dados corretamente.
3. **Popular Banco de Dados com Emblemas**: Mantém a instrução existente para rodar o comando `seed`.

- Author - Bruno Santos
- [LinkenId](https://www.linkedin.com/in/bruno-santos-850a28159/)
