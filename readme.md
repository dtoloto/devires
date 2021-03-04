# Desafio Backend - Devires

Este projeto foi criado para o processo seletivo da Devires. Ele consiste em uma API REST que possibilite um cadastro de usuários e login, com as seguintes especificações:

**Usuários**

-   Cadastrar um novo usuário
-   Listar informações de um usuário
-   Alterar o nome e tipo de um usuário
-   Excluir um usuário
-   Alterar o status de um usuário(ativo e inativo)

**Tipos**

-   Listar todos os tipos cadastrados

#### Regras de negócio

-   A tabela de usuários deve conter os campos nome, senha, tipo, email e status.
-   A tabela de tipos deve a descrição do tipo.
-   Um usuário tem apenas um único tipo
-   Apenas usuários do tipo root e admin podem cadastrar novos usuários.
-   Apenas usuários do tipo root admin podem alterar qualquer informação do usuário(inclusive status);
-   Apenas usuários root podem excluir usuários
-   Usuários do tipo geral só tem acesso a listar informações de seu próprio usuário, bem como alterar suas próprias informações.
-   O login deve ser feito com email e senha.
-
## Instalação e Execução

**Banco de Dados**

Com o Docker instalado na sua máquina, crie uma imagem do banco **PostrgreSQL** através do seguinte comando:
````
$ docker run --name devires -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
````
Após a criação da imagem do banco de dados, será necessário criar o banco de dados em si, com o seguinte nome:

```
devires
```

**API**
Após clonar esse repositório, faça a instalação de todas as dependências através do comando:

```
$ yarn install
```

Para a executar a aplicação, utilize o comando:

```
  $ yarn dev:server
```

Com a aplicação rodando em `localhost:3333`, utilize os seguintes endpoints:


## **Tipos**

Para criar os Tipos, utilize:

**Post: /types**
```
{
	"type": {
		"name": "root",
		"description": "User with full access"
	}
}
```

```
{
	"type": {
		"name": "admin",
		"description": "User with some restrictions"
	}
}
```

```
{
	"type": {
		"name": "general",
		"description": "User with full restrictions"
	}
}
```

Para listar os Tipos, utilize:

**Get: /types**
Response:
```
{
  "types": []
}
```

## Usuário Root
Devido às restrições impostas pelas regras de negócio da aplicação, foi feito um endpoint para a criação de um usuário root para que se possa utilizar os demais endpoints de gerenciamento de usuários.

Para um Usuário Root, utilize:

**Post: /root**
```
{
	"name": string,
	"email": string,
	"password": string,
	"status": boolean
}
```

## Autenticação

Para autenticar um usuário, utilize:

**Post: /session**
```
{
	"email": string,
	"password": string,
}
```

## Usuários
Para gerenciar os demais usuários, foram criadas as seguintes rotas privadas, cujo acesso deve ser feito informando o `Bearer token` no header das requisições.

**Post: /users**
```
{
	"name": string,
	"email": string,
	"password": string,
	"status": boolean,
	"type_id": string
}
```

**Put: /users/:id**
```
{
	"name": string,
	"email": string,
	"password": string,
	"status": boolean,
	"type_id": string
}
```

**Delete: /users/:id**

**Get (index): /users**
Response:
```
{
	"users": [],
}
```

**Get (show): /users/profile**
Response:
```
{
	"user": {
	    "id": string,
	    "name": string,
	    "type_id": string,
	    "email": string,
	    "status": boolean,
	    "created_at": string,
	    "updated_at": string,
	    "type": {
	      "id": string,
	      "name": string,
	      "description": string
	    }
	 }
}
```
