# BackEnd-Aluizio

## config de typescript
### tsc --init --rootDir ./src --outdir ./build \
### esModuleInterop --resolveJsonModule --lib es6 \
### module commonjs --allowJs true --noImplicitAny true

#### instalação eslint -> npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

### instalação prettier -> npm install eslint-config-prettier eslint-plugin-prettier -D

### rodar o docker -> docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres . Configs iguais a do arquivo ormConfig.json


### criar migrations -> yarn typeorm migration:create -n <NomeDaTabela>
### - roda a ultima migration -> yarn typeorm migration:run
