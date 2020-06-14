---
date: 2020-05-16
title: Refazendo meu portfolio parte 1
image: 2020-16-05-rebuild-portfolio.jpg
categories: Javascript, Nuxtjs, PWA, SSG, Markdown, JAMStack, Front-matter
description: Passo a passo de como foi refazer o portfolio

---

Opa, boas?

Recentemente, comecei a pensar em como terminar o meu portfolio, projeto que tinha começado em 2019 porém não terminará por conta da minha preguiça 😂.

Para esta nova versão decidi abraçar algo que sempre quis fazer, manter meu próprio blog incluído no portfolio e parar de usar plataformas terceiras como o [medium](https://medium.com/@acidiney) por exemplo.

Na versão antiga do meu portfolio eu usava o [quasar](https://quasar.dev), um framework para o [vue.js](https://vuejs.org). Mas, com um monte de componentes feitos e preparado para o [ssr](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8) e mobile usando [ionic](https://ionicframework.com/). Porém decidi remover o quasar, por não usar quase nada dele, fora o [ssr](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8) ( e pessoalmente eu não gosto muito de ter a aplicação parecida com o google 😂).

Eu não queria voltar a usar [ssr](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8) e sim [JAMStack](https://jamstack.org/). Sinto que não há uma necessidade de usar [ssr]( https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8) para o meu portfolio e ter arquivos `*.md` já me resolvem ( além disso, sinto que é bem desnecessário pagar uma hospedagem, como a que pago sendo que existe ótimas opções como o [netlify](https://netlify.app)).

Sendo assim, o meu caminho fica bem mais curto, porque dos frameworks [vuejs](https://vuejs.org/) que eu já usei que têm suporte aos [SSG](https://nuxtjs.org/guide#static-generated-pre-rendering) são o [Gridsome](https://gridsome.org) e o [Nuxtjs](https://nuxtjs.org).

Eu já usei o [Gridsome](https://gridsome.org/) e achei ele incrível, com certeza não teria tantos problemas quanto os que eu tive a usar o [Nuxtjs](https://nuxtjs.org/). Sinceramente não houve nenhum motivo especial por trás da minha decisão de escolher usar o [Nuxt](https://nuxtjs.org). Acredito que é porque quero conhecer mais sobre ele e as coisas que posso fazer com ele✌. 

Decidido qual framework usar, vamos por a mão na massa... Sendo sincero acho que a maior dificuldade que tive até agora foi quanto ao loader do markdown. Eu até tinha decidido fazer um backoffice bonito com um editor, que poderia escrever feliz lá 😁... até começar a ter um monte de erros de compilação 😂😂. (Enfim foi um bom aprendizado), Por agora decidi pivotar e manter os posts local e escrever usando o [typora](https://typora.com) (Uma aplicação desktop muito fixe, recomendo).

Depois de algumas horas de investigação acabei por usar o [front-matter](https://github.com/jxson/front-matter) (para a leitura dos markdowns como componentes) usando o tema [dracula](https://github.com/dracula/prism) este tema por pertencer a prims acabei usando o `markdown-it-prism` e `markdown-it` para auxiliar no loader, gostei muito do resultado... talvez mude no futuro, mas por agora é o suficiente para mim.

Feito isso a minha configuração ficou assim:


```js
const Mode = require('frontmatter-markdown-loader/mode')
const MarkdownIt = require('markdown-it')
const mip = require('markdown-it-prism')
const md = new MarkdownIt({
    html: true,
    typographer: true
})
md.use(mip)
// dentro module.exports
extend (config, ctx) {
    config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, 'content'),
        loader: 'frontmatter-markdown-loader',
        options: {
            mode: [Mode.VUE_COMPONENT, Mode.META],
            vue: {
                root: 'dynamicMarkdown'
            },
            markdown (body) {
                return md.render(body)
            }
        }
    }
}
```
Algo curioso é que durante o processo todo o meu `mode` do nuxt estava como `universal` e isso me gerava erros de 	execução quando tentava abrir um markdown de testes, alterando-o para `spa` a situação ficou resolvida.
## Lendo conteúdo de todos markdowns de uma vez
Algo que estava a me incomodar era não ter uma descrição na lista de post's na home page, eu até consegia por intermedio de uma gambiarra pegar a `data` o `titulo ` e as `categorias ` ( Aqui no teu ouvido... era uma GAMBIARRA daquelas  😂😂😂😂).
Como era: basicamente o nome dos meus markdowns consistem na `data` e o `title` como o desse por exemplo: `2020-05-16-refazendo-meu-portfolio`, assim com algumas regras e com alguns `slices` daqui e dali eu consigo ter a data e o titulo. Então para adicionar as categorias teria que fazer algo do género `2020-05-16-refazendo-meu-portfolio.javascript,nuxt,pwa,ssg` e depois um `split` daqui e uns `slices` dali e pronto eu tinha as categorias 😂✌ (Avisei).
O problema logo surge quando queremos exibir alguma descrição básica, eu fiz tudo isso para não ter que abrir os markdowns na primeira página. depois de alguns esforços fracassados decidi seguir abrindo-os mesmo. Porém só dos que estiverem a ser vistos no momento, fiz isso usando o interception api do HTML, para facilitar usei essa lib [Vue Observe Visibility](https://github.com/Akryum/vue-observe-visibility) e depois de algumas pesquisas descobri que poderia passar atributos nos markdowns usando o próprio front-matter, ficando desta forma em todos os markdowns.
```markdown
---
date: 2020-05-16
title: Re-build meu portfolio
image: 2020-16-05-rebuild-portfolio.jpg
categories: Javascript, Nuxtjs, PWA, SSG, Markdown, JAMStack
description: Passo a passo de como foi refazer o porfolio
---
```
Isso me abriu as portas para customizar uma capa nos posts como no caso desse aqui.
E no meu componente foi basicamente fazer isso, quando um post estiver visível para o usuário:
```js
async loadFrontMatterDescription (visibility, entry, link) {
    let post = await import(`~/content/${link}.md`)
    this.articles = this.articles.map(article => {
    if (article.link === link) {
       return {
    	...article,
        description: post.attributes.description,
        categories: post.attributes.categories.split(',')
        }
    }
    return {
     ...article
    }
 })
```
E *voila* eu tenho as minhas `description` só para os posts que estiverem visíveis.
![Post With Description](/images/blog/2020-05-16-rebuild-meu-portfolio.png)
Obrigado por ler,
Com base nos feedbacks que obter nesse post posso criar uma segunda parte, citando outros situações que tive. 
^^
Acidiney Dias