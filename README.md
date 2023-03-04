# Facilita Bancos Api

## Environments

- DEV - https://dfacilita-bancos-api.produto-financeiro.grupoboticario.digital
- HML - https://hfacilita-bancos-api.produto-financeiro.grupoboticario.digital
- PRD - https://facilita-bancos-api.produto-financeiro.grupoboticario.digital

## Getting Started

Copy env file for local development

```sh
cp .env{.example,}
```

Running the application:

```sh
nvm use
```

> To use specific node version of project (.nvmrc) 👆🏽. Necessary NVM (node version manager)

```sh
yarn install
yarn run start:dev
```

Testing

```sh
yarn test
```

Test coverage

```sh
yarn test:coverage
```

```sh
curl http://localhost:3000/healthcheck
curl http://localhost:3000/healthcheck/complete

curl http://localhost:3000
{"message":"Hi There!, I'm Alive!"}%
```

## Scaffolding

This code was generated using [Scafflater](https://github.com/chicoribas/scafflater) and has some scaffold options (or partials code) are enabled.

To see the available scaffold possibilities, please run:

```sh-session
yarn install -g scafflater-cli

scafflater-cli partial:list
```

If some fits on your needs, just scaffold it:

```sh-session
scafflater-cli partial:run [PARTIAL_NAME]
```
