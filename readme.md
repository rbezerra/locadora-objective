# Locadora Objective

API com operações de locadora feita com o objetivo de atender às expectativas passadas através de teste técnico

## Executando a aplicação

  - Clonar a aplicação

    ```git clone https://github.com/rbezerra/locadora-objective```

  - Instalar dependências
    ```npm install```

  - criar um .env baseado no .env.example preenchendo com os seguintes valores
    ```bash
      PORT= # Porta onde a api estará respondendo às requisições
      MONGODB_PORT= # Porta onde a api se conectará com o banco de dados
    ```
  - subir o container da aplicação com o comando
    ```bash
      docker-compose up --build # utilize a flag -d caso deseje subir o container como um processo em background 
    ``` 
## Testando a aplicação

  Para executar a suíte de testes da aplicação basta seguir os seguintes passos
  ```bash
  cd server # para entrar na pasta onde está a api
  npm test # para executar a suíte de testes
  ```

## Operações

A API conta com as sseguintes operações

- /api/all - listagem de todos os filmes disponíveis para download
- /api/book - criação de reserva para um filme
- /api/confirm - confirmação da reserva
- /api/return - devolução de um filme alugada

- /swagger - Documentação das rotas disponíveis com mais detalhes e possibilidade de testes
 
## Tecnologias utilizadas

- Docker
- Git
- NodeJS (v18.19.0)
- MongoDB
