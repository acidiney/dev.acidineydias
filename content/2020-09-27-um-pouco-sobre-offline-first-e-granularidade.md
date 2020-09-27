---

date: 2020-09-27
title: Um pouco sobre offline first e granularidade!
image: https://res.cloudinary.com/dsfsfcdyo/image/upload/q_30/v1593874655/AcidineyDias.me/2020-06-28-pare-de-limitar-o-frontend/2020-06-28-pare-de-limitar-o-frontend_chbyab.jpg
categories: programação, javascript, indexdb
description: Hoje escrevo sobre um assunto que fiz uma POC, para perceber como poderia funcionar toda essa maracutaia que é offline first ( Esse assunto é absurdamente grande, o que vou trazer hoje  é apenas um pedaço desse tópico ). Caso tenha interesse em saber mais sobre, podemos trocar umas ideias na secção dos comentários abaixo 😉.
link: /blog/2020-09-27-um-pouco-sobre-offline-first-e-granularidade

---

Opa, tranquilo?

Sou eu novamente, nesta madrugada escrevendo mais um artigo... Faz tempo que não passo por aqui, tenho pensado em algumas coisas, em breve ficarei muito feliz em anunciar 🤪.

Hoje escrevo sobre um assunto que fiz uma POC, para perceber como poderia funcionar toda essa maracutaia que é offline first ( Esse assunto é absurdamente grande, o que vou trazer hoje  é apenas um pedaço desse tópico ). Caso tenha interesse em saber mais sobre, podemos trocar umas ideias na secção dos comentários abaixo 😉.

Então, o que eu voz trago hoje é a experiência de como foi fazer essa POC ( tive muito pouco tempo para fazer mas acho que o resultado foi bem satisfatório para as metas que pretendia alcançar ).

Mas antes de entrar na experiência, vou introduzir ao assunto para que todos possamos ficar no mesmo nível de ideia do que se trata no final de contas esse artigo... Bora lá,  um exemplo para os mais desligados é o facebook, já esteve conectado a Internet e precisou desligar ela mais conseguia ter acesso as informações que já tinha? 

[🧐 Mas Acidiney isso é cache !!!!]

( Cache é todo o dado que você já possui em memoria, o que significa que eles podem desaparecer facilmente se você fizer lixo ou se o tempo de validade dele expirar), capitche? 🤓

R: Ora ora, 😏 temos um Sherlock Holmes... Sim meu caro, é cache...  o Cache é um recurso muito usado quando se trata de offline first.

Basicamente não importa muito como você aplica e quais técnicas você usa para transformar seu site ou app offline first porque você irá consumir algum recurso do teu cliente ( telefone, pc ou até fogão do usuário final ) para isso. Ou seja, offline first consiste na verdade em você ter uma certa granularidade de dados entre o servidor e o cliente.... Durante minhas pesquisas vi que já existem "muitas" formas catalogadas... umas melhores que outras então se você quiser fazer dê uma olha nos links que deixarei no final do artigo, talvez ajudem...

Até aqui estamos de boa? easy? 

[ 🤨 Então, essa conversa é muito bonita, mas como posso fazer de verdade esse troço? ]

Bem, sem tirar mérito de ninguém eu acredito que fazer offline em apps mobiles ou desktops sejam mais simples que fazer numa página web... até porque você consegue pelo menos aumentar um nível na veracidade dos dados e não ter que colocar aqueles textos vermelhos em alerta que o facebook ou twitter ou sei lá o que mostra quando você abre o dev tools do navegador.

Porquê eu acho isso? simples, permissões, infelizmente não a muita a se fazer quanto a isso, nem agora e sinceramente não acredito que um dia teremos isso. Mas prontos vamos usar os recursos que temos então na web.

( Para quem procura como fazer offline first mobile, infelizmente não consigo ajudar porque ainda não é o meu interesse ).

## O que usei na POC

Bem sempre que eu faço algo eu coloco no máximo três coisas para mim ou revisar ou aprender, principalmente nestes side-projects, desta vez fui de:

- SVELTE ( frontend )
- IndexDB
- Proxies ( Fiz um vídeo bem legal sobre no meu [YT](https://www.youtube.com/watch?v=Oh8dX3eza-U) ) 
- EXPRESS com SQLITE ( backend )

### Svelte

É um framework frontend, que nem o Vue / React / Angular.... Eu não gosto de falar mal de coisas que nunca usei, então sempre que dá fico vendo outras coisas para aprender e olha o Svelte me surpreendeu pela positiva.

Na verdade eu acompanhei o lançamento no ano passado, e tinha lido alguma coisa mais o framework ainda era muito criança e o sapper nem estava completo então meio que encostei ele para o lado..

Decidi então ressuscitar nesse micro projeto e eu acho que ficou muito legal ^^

### IndexDB

Então, para o browser eu poderia usar o localStorage Para armazenar os dados e talvez fosse mais tranquilo... Porém preferi ir de IndexDB, para aprender mais sobre como funciona... e vou te falar uma coisa... QUE TROÇO RUIM 😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫😫.

Fiquei estudando 3 dias, e sinceramente PELO AMOR DE DIOS, em fim, como eu tinha mesmo muito pouco tempo para terminar essa poc e como estava a ter muitas dificuldades com ele e também pelo facto de os browsers implementarem de forma diferente a API desse troço decidi usar uma lib chamada [Dexie](dexie.org) que coisa deliciosa ... props para os criadores.... deixou muito mais tranquilo com o IndexDB...  

```javascript
export const select = () => db.todos.toArray()
```

Olha no meio disso tem uma coisa que gostei muito no IndexDB pelo menos no do Chromium é que ele é bem otimizado e bem inteligente quanto a inserts e tal... deixou com certeza o meu trabalho mais simples.

### Proxies 

O vídeo no YT explica melhor o que é... mas por agora entenda que uma proxie é basicamente um estrada essa estrada pode te levar por vários caminhos até você chegar ao teu destino final.

(🥱 Estou orgulhoso dessa definição OMG 😱😱😱😱😱)

Onde eu usei?

Eu usei como switch entre chamar os métodos que fazem a comunicação com o server e os métodos que fazem a comunicação com a DB Local.

```javascript
// network.mjs

import online from './online/index.mjs'
import offline from './offline/index.mjs'

const target = {
  online,
  offline
}

const checkNetworkState = () => navigator.onLine

const handler = {
  get: function (obj, prop) {
    if (checkNetworkState()) return obj.online[prop]
    return obj.offline[prop]
  }
}

let api = new Proxy(target, handler);

export default api
```

Basicamente se eu chamar o método `getTodos()` de `api` ele vai verificar se estou conectado ou não... e se estou vai executar o método com esse nome que está dentro dos métodos que disponibilizei no modulo online... com os `fetch` e todas as maracutias, do contrario vai executar um método que nos métodos offlines que ele faz um select na DB do indexDB.

---

Quanto ao Express e o Sqlite não tem muito a dizer, é só para o backend mesmo... 

Uma vez que vocês já sabem qual é o segredo da minha POC que foi o uso da `proxie` praticamente, fica mais simples explicar as funcionalidades. Para essa POC fiz uma simples TODO APP.

### Pegando dados online

Basicamente quando eu estou conectado a Internet eu atualizo a minha BD local com as novas informações sempre:

```javascript
// online.mjs 
todos: () => {
    return fetch(API_URL)
      .then(requestModifier)
      .then((data) => data.map(todo => ({
        ...todo,
        diff: false
      })))
      .then(insertData)
  },
```

Já já explico o `diff`, por enquanto esqueça.

```javascript
// offline.mjs
todos: function () {
    console.log('[Database]> Query local data')
    return select()
}
```

```javascript
// database.mjs

export const insertData = async (data) => {
  db.todos.bulkPut(data)
    .then(() => {
      console.log('[Database]> Updated')
    })
  return data
}

export const select = () => db.todos.toArray()
```

```javascript
// app.svelte
<script>
  import network from "../assets/js/resources/network/index.mjs";
  import { onMount } from "svelte";

  let todos = [];

  async function getTodos() {
    todos = await network.todos();
  }

  onMount(getTodos);
</script>
```

Eu tinha de inicio usado aquele helper que o svelte tem para as chamadas, no template `#await`, mas depois de um tempo parou de me resolver... talvez tem alguma forma de continuar usando ele ... mas no meu contexto e para as minhas skills com ele não achei então foi pelo caminho os hooks mesmo, que é o normal e tal.

O problema que ele não estava a resolver é quando eu precisava de sincronizar e atualizar a lista....

### Modificando os dados

Bem, uma vez que eu já tenho os dados listados de boa e já tenho a minha BD atualizada chegou a hora de modificar esses dados... Até aqui tranquilo... foi um método no online, outro no offline e o um update no meu `database.mjs`.

```javascript
//online.mjs
updateTodo: (id) => {
    return fetch(API_URL + `/${id}`, {
      method: 'PUT'
    })
      .then(requestModifier)
      .then(todos => todos.map(todo => ({
        ...todo,
        diff: false
      })))
      .then(updateTodoLocal)
  },
```

```javascript
// offline.mjs
updateTodo: (id, done) => {
    done = !done
    updateTodoLocal([{ id, done, diff: true }])
    event.emit('reload')
  },
```

o `event.emit` é o `mitt` é um event emmiter bem similar ao `vue.$emit` super recomendo.. eu sei ele para mandar a instrução para atualizar toda a lista quando a alteração foi feita, isso porque ao contrário do server que me retornava o novo estado da da linha, ao usar a db local que é síncrona se não atualizar os dados na tela ficariam atrasados embora a db já estivesse atualizada.

```javascript
// database.mjs
export const updateTodoLocal = (todos) => {
  todos.forEach(todo => {
    db.todos.where('id').equals(todo.id).modify({ done: todo.done, diff: todo.diff ? 1 : 0 });
  });
}
```

Por algum motivo muito estranho no dexie quando fazes queries e aplicas um boolean no where ele dá erro por isso tive que transformar em `0 e 1` o diff.

```javascript
//app.svelte
<script>
  import network from "../assets/js/resources/network/index.mjs";

  function onChange(id, done) {
    network.updateTodo(id, done);
  }

</script>

<main>
  <table class="table is-striped mgh-auto">
    <thead>
      <tr>
        <th>#</th>
        <th>Todo</th>
        <th>Estado</th>
        <th>Ações</th>
      </tr>
    </thead>
    {#each todos as todo}
        <tr>
          <td>{todo.id}</td>
          <td>{todo.todo}</td>
          <td>
            <input
              type="checkbox"
              checked={todo.done}
              on:change={() => onChange(todo.id, todo.done)} />
          </td>
        </tr>
    {/each}
  </table>
</main>

```

A API do Svelte bebe muito do Vuejs e do React então foi bem de boa ver as coisas e aplicar.

### Criar um novo todo

O dilema aqui era saber como eu sei que esse dado é novo? Tipo, o diff me ajuda a saber que ele foi modificado e o backend espera ele para fazer um update, mas se foi criado um novo como ele vai saber?

Lembrando que essas analogias, é para o cenário que o usuário fez algumas ações offline e precisou sincronizar depois... 

Resolvi isso adicionando mais uma key no indexDB chamado created, que só existe quando o usuário for criado.

```javascript
/// online.mjs
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

  createTodo: (todo) => {
    return fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        todo
      }),
      headers: myHeaders
    })
    .then(() => {
      event.emit('reload')
    })
  },
```

```javascript
/// offline.mjs
createTodo(todo) {
    return (new Promise(function () {
        insertData([{ todo, created: 1, diff: 1, done: 0 }])
        event.emit('reload')
    }))
},
```

E novamente aquela situação do `true` e da interface estar desatualizada.

Não colocarei o código da database por já ter mandado uma vez... só reutilizei aqui 😉.

```javascript
/// app.svelte
<script>
  import network from "../assets/js/resources/network/index.mjs";

  let todo = "";
  let errorMessage = "";

  function onClick() {
    network.createTodo(todo).then(() => {
      todo = "";
    });
  }


</script>

<main>
  <div class="mb-3">
    <input required minlength="1" type="text" bind:value={todo} />
    <span class="error-message">{errorMessage}</span>
    <button on:click={onClick}>Criar todo</button>
  </div>
</main>

```



Pensei em validar mais depois fiquei com preguiça kkkk, desculpa.

### Eliminando informação.

Bem aí tem uma armadilha... ou talvez não... não sei kkkk são 4h, e ainda não dormi.

O fluxo de eliminar é bem normal quando você está online, porém quando você está offline é que tem que se tomar cuidado porque você não apaga os dados, porque quando for sincronizar o servidor precisa de saber que aquele dado foi apagado, para ele seguir caminho.

```javascript
/// online.mjs
  deleteTodo: (id) => {
    return fetch(API_URL + `/${id}`, {
      method: 'DELETE'
    })
      .then(requestModifier)
      .then(() => {
        removeTodo(id)
        event.emit('reload')
      })
  },
```

```javascript
// offline.mjs
deleteTodo(id) {
    updateTodoLocal([{ id, removed: 1, diff: true, done: 1 }])
    event.emit('reload')
  },
```

Eu resolvi o problema simplesmente adicionando uma propriedade `removed` que é o "bool" também

```javascript
// database.mjs
export const removeTodo = (id) => {
  db.todos.where('id').equals(id).delete()
}
```

E na view fiz um simples if para só listar o que não foi removido.

```javascript
// app.svelte
{#if !todo.removed}
        <tr>
          <td>{todo.id}</td>
          <td>{todo.todo}</td>
          <td>
            <input
              type="checkbox"
              checked={todo.done}
              on:change={() => onChange(todo.id, todo.done)} />
          </td>
          <td>
            <button on:click={() => onDelete(todo.id)}>Eliminar</button>
          </td>
        </tr>
      {/if}
```

Com isso fechei os métodos básicos... 

O ponto foi agora adicionar o mecanismo que sincroniza automaticamente quando o usuário está offline e muda para online por algum motivo...

### Sync

Bem, para isso usei um método nativo do browser o `navigator.onLine` que retorna um `boolean`, fora o navigator também é possível adicionar um ele ao addEventListener do window... e foi isso que eu fiz.

```javascript
// network.mjs
window.addEventListener('online', function () {
   api.sync()
})
```

Basicamente quando ele está online ele pede para sincronizar chamando o método `sync` que só existe no `online.mjs`, até poderia padronizar e adicionar ele ao `offline.mjs` também, mas sinceramente, não acredito que para uma POC seja algo realmente separador de águas.

Então, basicamente essa função faz isso aqui: 

```javascript
// online.mjs

sync: async () => {
    console.log('[app]> sync...')

    const todosWithDiff = await diffData()
    return fetch(API_URL, {
      method: 'PATCH',
      body: JSON.stringify({
        todos: todosWithDiff
      }),
      headers: myHeaders
    })
      .then(requestModifier)
      .then(todos => todos.map(todo => ({
        ...todo,
        diff: false
      })))
      .finally(() => {
        deleteAll()
        event.emit('reload')
        console.log('[app]> sync end :-)')
      })
  }
```

E é aqui onde tudo se encaixa, as propriedades `diff`, `removed` e `created`, que até então existiam sem nenhum propósito. Basicamente eu envio todas as linhas que foram modificadas para o servidor, essas linhas podem ser updates, deletes ou create, eu sei isso no frontend pelo diff.

```javascript
// database.mjs
export const diffData = () => db.todos.where('diff').equals(1).toArray();

export const deleteAll = async () => {
  await db.todos.where("done").anyOf(1, 0).delete()
}
```

e no servidor eu tenho o meu método que recebe e trata

```javascript
// algures no backend
  app.patch('/todos', function (req, res) {
    const { todos = [] } = req.body
    todos.forEach(todo => {
      if(todo.created) {
        db.create({ todo: todo.todo, done: todo.done })
        return
      }

      if (todo.removed) {
        db.delete(todo.id)
        return
      }

      db.update({ done: todo.done }, todo.id)
    });
    return res.json(todos)
  })

```

Depois de receber a confirmação de atualização do servidor, o frontend elimina todos os dados anteriores e recarrega a base de dados local enviando um event `reload` para o observador que executará essa chamada.

e é isso, um breve resumo de como foi fazer a POC... Espero que tenham gostado e tenham aprendido alguma coisa comigo ^-^.

Bye bye...

Acidiney Dias



## Links úteis

- [Link do projecto no Github](https://github.com/acidiney/DATABASE-GRANULARITY)
- [Dexie](dexie.org/)
- [Design guide to offline first apps](https://hasura.io/blog/design-guide-to-offline-first-apps/)
- [Offline first](http://offlinefirst.org/)
- [Playlist Soul Coffee](https://open.spotify.com/playlist/37i9dQZF1DXaXDsfv6nvZ5?si=AWai2ghyRSSngJPf4rGOyg)
