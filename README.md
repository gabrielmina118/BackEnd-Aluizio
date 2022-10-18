# BackEnd-Aluizio

## Desenvolvido por:
### :construction_worker: Gabriel Mina da Silva

#### Primeiros passos

1. Clone o repositório;
2. Dê um  npm install;
4. Acesse o nosso código

## config de typescript
### tsc --init --rootDir ./src --outdir ./build \
### esModuleInterop --resolveJsonModule --lib es6 \
### module commonjs --allowJs true --noImplicitAny true

## config de eslint
#### instalação eslint -> npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

## config de prettier
### instalação prettier -> npm install eslint-config-prettier eslint-plugin-prettier -D

## config de docker
### rodar o docker -> docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres . Configs iguais a do arquivo ormConfig.json

## config de redis
### container do redis -> docker run --name redis -p 6379:6379 -d -t redis:alpine

## config de migrations
### criar migrations -> yarn typeorm migration:create -n <NomeDaTabela>
### - roda a ultima migration -> yarn typeorm migration:run
