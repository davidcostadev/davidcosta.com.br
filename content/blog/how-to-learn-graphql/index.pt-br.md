---
title: Como aprender GraphQL
date: '2020-04-11T12:56:55.681Z'
lang: pt-br
tags: ['graphql']
description: insert description here
---

Antes de começar a explicar como aprender GraphQL, acho interessante explicar o que é, o que resolve, e o porquê de aprender.

Contanto um pouco da história do GraphQL, ele é uma tecnologia criada pela equipe do Facebook, com objetivo de criar uma forma de obter várias informações de uma vez só, para dinimuir o tempo de carregamento de uma página, tendo em vista que por exemplo o aplicativo do facebook, ela precisa de uma serie de informações para o carregamento da página terminar, por exemplo, dados, do usuário, timeline, notificações, anuncios e possivelmente outras coisas. E fazer várias requisições para cada uma destas coisas pode levar um tempo. Com o GraphQL é possivel obeter tudo isso de uma vez só, e de uma forma que você pode dizer exatamente o que está precisando. É muito comum se reutilizar um mesmo endpoint para varias situações e com isso, mas, uma determinada informação algo não é relevante, por exemplo, você precisa do nome e sobrenome do usuário, pensando em reutilização, as vezes já mandamos outras informações junto, acabamos que isso afeta o tempo de carregamento e de download destas informações que talvez nem seram uteis, com o GraphQL essa econimia de dados é super valiosa, especialmente em conecção de internet lenta.

Se você deseja saber mais informações sobre como isso foi pensando, tem um video documentação explicando exatamente o processo eles tiveram para criar essa tecnologia.

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/783ccP__No8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

https://www.youtube.com/watch?v=783ccP__No8

---

Introdução a partes vamos entender como ele funciona. Até aqui vou assumir que você pelo menos saiba o que seja `JSON` e Javascript. É possivel utilizar GraphQL em outras linguagens isso porque ele é um padrão de comunicação entre serviços diferentes. Mas, como tenho mais habilidade com Javascript vou optar por ele, quando precisa colocar algo para rodar de fato.

Descrevendo uma entidade, por exemplo de usuário, a onde tenho as informações de nome, sobrenome, idade e email. Para qualquer tipo de informações é interessante que ela possue um indentificador único, chamarei isso de ID, que é a referencia para cada usuário individualmente. Então temos o seguinte JSON:

```json
{
  "id": 42,
  "firstName": "David",
  "lastName": "Costa",
  "age": 27,
  "email": "davidcostadev@gmail.com"
}
```

Para a necessidade de mostrar a informação de quem está logado no momento, vou precisa apenas do nome e sobrenome. Em contraste da outra maneira popular de pegar essas informações provavelmente viria outras informações juntos, isso por que é muito custoso criar outro endpoint para informações que são necessárias, isso demandaria de ajustes quando isso mudasse.

Usando o schema do graphql fica fica desta forma:

```graphql
query {
  getUser (id: 42) {
    firstName
    lastName
  }
}
```

O retorno desta query será algo assim:

```json
{
  "data": {
    "getUser": {
      "firstName": "David",
      "lastName": "Costa"
    }
  }
}
```

Agora vamos supor que também é necessário visualizar os as postagem mais recetens feitas pelas conecções deste usuário, normalmente, iriamos fazer uma outra requisição para obter essa informação. Com GraphQL, isso ficaria desta forma:

```graphql
query {
  getUser (id: 42) {
    firstName
    lastName
  }
  timeline {
    id
    picture
    text
  }
}
```

E o retorno deito seria:

```json
{
  "data": {
    "getUser": {
      "firstName": "David",
      "lastName": "Costa"
    },
    "timeline": [
      {
        "id": 1,
        "picture": "https://imageserver.com/asdf.jpg",
        "text": "Lorem Ipsu"
      }
    ]
  }
}
```
