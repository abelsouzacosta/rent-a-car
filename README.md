# Requisitos funcionais

Ligados as funcionalidades da aplicação, de forma com que cada reqisito funcional representa uma funcionalidade mínima da aplicação.

Ex:

* Usuário pode cadastrar categoria
* Usuário pode recuperar a sua senha através de email
* Usuário pode excluir uma especificação

## Requisitos não funcionais

Não estão ligados diretamente com a aplicação e sua regra de negócio. Assim sendo não representam funcionalidades mas sim desejos de [futuros] usuários, ou comportamentos que a aplicação deve ter.

Ex:

* Os dados devem ser salvos no banco de dados postgres
* A aplicação deve ser escrita em typescript

### Regras de Negócio

Regras que estão de fato por trás dos requisitos funcionais, assim sendo, podemos entender que as regras de negócio moldam os requisitos funcionais e a maneira como eles se comportam.

Ex:

* Não podem existir duas categorias com o mesmo nome
* Um usuário deve ter uma carteira de motorista válida

#### Cadastro de carro

* Requisitos funcionais:
  * Deve ser possível cadastrar um novo carro

* Regras de negócio:
  * Não deve ser possível cadastrar um carro com uma placa já cadastrada
  * O carro, por padrão deve estar disponível ao ser cadastrado
  * O usuário responsável ppelo cadastro dedve ser yum usuário administrador

#### Listagem de carros

* Requisitos funcionais:
  * Deve ser possível listar todos os carros disponíveis
  * Deve ser possível listar todos os carros diponíveis por categoria
  * Deve ser possível listar todos os carros disponíveis pela marca
  * Deve ser possível listar todos os carros disponíveis pelo nome

* Regras de negócio:
  * Usuário não precisa estar logado no sistema

#### Atualização de carro

* Requisitos funcionais:
  * Dev ser possível atualizar informações de um determinado carro

* Regras de negócio:
  * Não deve ser possível alterar a placa de um carro já cadastrado
  * Não deve ser possível alterar a marca de um carro
  * Não deve ser possível alterar o nome de um carro

#### Deleção de um carro

* Requisitos funcionais:
  * Deve ser possível excluir um carro da aplicação

* Regras de negócio:
  * Não deve ser possível excluir um carro alugado da aplicação

#### Cadastro de especificação

* Requisitos funcionais:
  * Deve ser possível cadastrar uma especificação

* Regras de negócio:
  * Não deve ser possível cadastrar uma especificação para um carro não cadastrado
  * Não deve ser possível cadastrar uma especificação que já foi cadastrada
  * O usuário responsável pelo cadastro deve ser um administrador

#### Listagem de especificação

* Requisitos funcionais:
  * Deve ser possível listar todas as especiificações

* Regras de negócio:
  * Qualquer um pode listar as especificações

#### Cadastro de imagens do carro

* Requisitos funcionais:
  * Deve ser possível cadastrar as imagens de um carro
  * Um usuário deve poder cadastrar mais de uma imagem para o mesmo carro
  * O usuário responsavel pelo cadastro deve ser um administrador

* Regra de negócio:
  * Não deve ser possível cadastrar uma imagem de um carro que não existe
  * Utilizar o multer para upload dos arquivos

#### Listagem de imagens de carros

* Requisitos funcionais:
  * Deve ser possível listar todas as imagens de um determinado carro

* Regras de negócio:
  * Deve ser possível a qualquer um listar todas as imagens de um carro

#### Aluguel de carros

* Requisitos funcionais:
  * Deve ser possível cadastrar um aluguel

* Regras de negócio:
  * Aluguel deve ter uma duração mínima ded 24 horas
  * Não deve ser possível alugar um carro já reservado no mesmo horário
  * Não deve ser possível alugar um carro que ainda não foi entregue
