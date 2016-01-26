# API_fogoPlayer

Esta API REST possibilita a comunicação atraves de requisições web para controle e manipulação de ações do fogoPlayer. Sendo assim, é possível criar controles para manipular máquinas que possuem o fogoPlayer instalado, disponibilizando opções como selecionar máquinas, rodar o decoder, aumentar o buffer, dentre outras.

### Necessário: ###

* **[Node.js 4.1.1](https://nodejs.org/en/)** :white_check_mark:
* **[Express.js 4.13.1](http://expressjs.com/pt-br/)** :white_check_mark:

### Instalação em ambiente linux(terminal): ###

1. Após o clone da aplicação, execute o seguinte comando para instalar as dependências:
  - user@user:~/path_do_arquivo_clonado$ **npm install**
  - **OBS: Instalar manualmente as dependências que não forem instaladas pelo comando acima.** :white_check_mark:

2. Start no servidor e acesso pelo browser
  - user@user:~/path_do_arquivo_clonado$ **npm start**

## Rotas ##

|   Action                                          | Method    | URL                                               
| --------------------------------------------------|-----------|----------------------------------------------------- 
|   List fogo_controllers                           |  `GET`    | /fogo_controllers
|   Get fogo_controller                             |  `GET`    | /fogo_controllers/:magic_id
|   New fogo_controller                             |  `POST`   | /fogo_controllers/new
|   Edit fogo_controller                            |  `PUT`    | /fogo_controllers/:magic_id
|   Delete fogo_controller                          |  `DELETE` | /fogo_controllers/:magic_id
|   Get machines of a fogo_controller               |  `GET`    | /fogo_controllers/:magic_id/machines
|   New machine of a fogo_controller                |  `POST`   | /fogo_controllers/:magic_id/machines/new
|   Add increase_buffer at machines                 |  `GET`    | /fogo_controllers/:magic_id/increase_buffer
|   Run ptp at machines of a fogo_controller        |  `GET`    | /fogo_controllers/:magic_id/run_ptp
|   Run decoder at machines of a fogo_controller    |  `GET`    | /fogo_controllers/:magic_id/run_decoder
|   Set machine sender                              |  `POST`   | /fogo_controllers/:magic_id/sender
|   List fogo_machines                              |  `GET`    | /fogo_machines
|   Get fogo_machine                                |  `GET`    | /fogo_machines/:magic_id
|   New fogo_machine                                |  `POST`   | /fogo_machines/new
|   Edit fogo_machine                               |  `PUT`    | /fogo_machines/:magic_id
|   Delete fogo_machine                             |  `DELETE` | /fogo_machines/:magic_id


## Métodos ##

Para começar a controlar as máquinas do fogoPlayer é necessário criar pelo menos um fogo_controller(controle) e uma fogo_machine(fogo-PC).

### New fogo_controller ###

Para criar um fogo_controller é necessário enviar um JSON com seu endereço mac. Se tudo ocorrer corretamente o resultado será o retorno de um novo JSON com um identificador mágico gerado pela API.

* REQUEST
```
POST /fogo_controllers/new
```
```json
{
  "mac": "00:E0:4C:35:CB:C4"
}
```
* RESPONSE
```json
{
  "mac": "00:E0:4C:35:CB:C4",
  "magic_id": "23TplPdS"
}
```

### List fogo_controllers ###

É possível visualizar todos os fogo_controllers criados através deste método.

* REQUEST
```
GET /fogo_controllers
```
* RESPONSE
```json
{
  "fogo_controllers": [
    {
      "mac": "42:6F:B4:3D:EF:2B",
      "magic_id": "V18WrdmOx"
    },
    {
      "mac": "00:E0:4C:35:CB:C4",
      "magic_id": "23TplPdS"
    }
  ]
}
```

### Get fogo_controller ###

Para saber informações específicas referente a um fogo_controller informando seu magic_id.

* REQUEST
```
GET /fogo_controllers/23TplPdS
```
* RESPONSE
```json
{
  "mac": "00:E0:4C:35:CB:C4",
  "magic_id": "23TplPdS"
}
```

### New machine by fogo_controller ###

Após adicionar pelo menos uma fogo_machine (fogo-PC) e um fogo_controller (Controle) poderá adicionar ao controle os fogo-PC  disponíveis (Estes podem ser listados na seção list fogo_machines). A API entenderá que os items selecionados(fogo-PC) foram aqueles que possuírem a chave "checked" com valor "true".

* REQUEST
```
POST /fogo_controllers/23TplPdS/machines/new
```
```json
{
  "fogo_machines" : [
    {
      "name" : "fogo-pc1",
      "ip" : "192.168.0.1",
      "mac" : "00:E0:4C:30:71:A1",
      "magic_id" : "46Juzcyx",
      "checked" : true
    },
    {
      "name" : "fogo-pc2",
      "ip" : "192.168.0.2",
      "mac" : "00:E0:4C:69:6A:20",
      "magic_id" : "dBvJIh-H",
      "checked" : false
    },
    {
      "name" : "fogo-pc3",
      "ip" : "192.168.0.3",
      "mac" : "00:E0:4C:02:1B:AB",
      "magic_id" : "Eye3ileYe",
      "checked" : true
    }
  ]
}
```
* RESPONSE
```json
{
  "mac": "00:E0:4C:35:CB:C4",
  "magic_id": "23TplPdS",
  "fogo_machines": [
    {
      "name" : "fogo-pc1",
      "ip" : "192.168.0.1",
      "mac" : "00:E0:4C:30:71:A1",
      "magic_id" : "46Juzcyx",
      "checked" : true
    },
    {
      "name" : "fogo-pc3",
      "ip" : "192.168.0.3",
      "mac" : "00:E0:4C:02:1B:AB",
      "magic_id" : "Eye3ileYe",
      "checked" : true
    }
  ]
}
```

Uma vez que a resposta da API para a inclusão das máquinas a serem controladas foi recebida com sucesso, podemos realizar as solicitações para as máquinas executarem os comandos como run_ptp, run_decoder, increase_buffer, entre outros.

### Run ptp at machines of a fogo_controller ###

Para realizar a solicitação run_ptp, é necessário enviar o "status" ao fim da URL. "on" para ligar e "off" para desligar.

* REQUEST
```
GET /fogo_controllers/23TplPdS/run_ptp/on
```
* RESPONSE
```json
{
  "url": "http://fogo_machine_ip:fogo_machine_port/run_ptp/on"
}
```