# Aplicação para aluguel de carro (rentx)

Essa aplicação foi construída com propósitos acadêmicos, meramente para aprendizado e sem nenhum fim comercial.

## Para rodar a aplicação:

1. Faça clone do arquivo: `git clone git@github.com:abelsouzacosta/rent-a-car.git`
2. `cd rent-a-car`
3. Baixar pacotes: `npm install` ou `yarn`
4. Criar variáveis:
4.1. Modificar o nome do arquivo `ormconfig copy.json` apenas para `ormconfig.json`, mantendo o conteúdo interno
4.2. Crie um arquivo `.env` e dentro dele insira uma vairável chamada *disk*, essa vairável pode ter dois valores distintos, dependendo do ambiente. Por padrão defina essa variável com o valor **local**.
  * Dessa forma: `disk=local`
5. É necessário possuir o **docker** instalado na máquina, além de também possuir o *docker compose*, para instalar o docker você pode seguir [este tutorial](https://docs.docker.com/engine/install/), para o docker compose pode ser seguir [este outro](https://docs.docker.com/compose/install/).
6. Criando e rodando os containers:
6.1. Para criar os containers é preciso executar o comando `docker compose up`, vai levar um tempo até que o container esteja pronto
7. Rodar as migrations:
7.1. Após criar o banco de dados da aplicação é preciso executar as migrations do projeto a fim de que as tabelas do banco sejam criadas, para isso use: `yarn typeorm migration:run`

Após feito o processo abra o terminal e você verá uma mensagem como **`Server running on port 3333`**
