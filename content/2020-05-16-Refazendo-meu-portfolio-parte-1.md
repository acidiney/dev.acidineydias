---
date: 2020-05-16
title: Refazendo meu portfolio parte 1
image: 2020-16-05-rebuild-portfolio.jpg
categories: Javascript, Nuxtjs, PWA, SSG, Markdown, JAMStack
description: Passo a passo de como foi refazer o porfolio

---

Opa, boas?

Recentemente, comecei a pensar em como terminar o meu portfolio, projecto que tinha começado em 2019 porém não terminará por conta da minha preguiça 😂.

Para essa nova versão decide abraçar algo que sempre quis fazer, manter meu proprio blog incluido no portfolio e para de usar plataformas terceiras como o [medium](https://medium.com/@acidiney) por exemplo.

Na versão antiga do meu portfolio eu usava o [quasar](https://quasar.dev), um framework para o [vue.js](https://vuejs.org) mas com um monte de componentes feitos e preparado para o [ssr](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8) e mobile usando [ionic](https://ionicframework.com/). Porém decide remover o quasar, por quase não usar nada dele, fora o [ssr](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8) ( e pessoalmente eu não gosto muito de ter a aplicação parecida com o google 😂).

Eu não queria voltar a usar [ssr](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8) e sim [JAMStack](https://jamstack.org/), sinto que não há uma necessidade de usar [ssr]( https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8) para o meu portfolio e ter arquivos *.md já me resolveriam ( Além disso, sinto que é bem desnecessário pagar uma hospedagem, como a que pagava sendo que existe ótimas opções como o [netlify](https://netlify.app)).

Sendo assim, o meu caminho fica bem mais curto, porque dos frameworks [vuejs](https://vuejs.org/) que eu já usei que têm suporte aos [SSG](https://nuxtjs.org/guide#static-generated-pre-rendering) (pelo menos os que conheço/já usei) são o [Gridsome](https://gridsome.org) e o [Nuxtjs](https://nuxtjs.org).

Pessoalmente eu já usei o [Gridsome](https://gridsome.org/) e achei ele incrível, com certeza não teria tantos problemas quanto os que eu tive a usar o [Nuxtjs](https://nuxtjs.org/). Sinceramente não tem nenhum motivo especial por trás da minha escolha de usar o [Nuxt](https://nuxtjs.org), acredito que é porque quero conhecer mais sobre ele e as coisas que posso fazer com ele✌. 

Decidido qual framework seguir, decide por a mão... Sendo sincero acho que a maior dificuldade que tive foi quanto ao loader do markdown. Eu até tinha decidido fazer um backoffice bonito com um editor que poderia escrever feliz lá 😁, até começar a ter um monte de erros de compilação 😂😂. (Enfim foi um bom aprendizado), decide manter local usando o [typora](https://typora.com).

Para a leitura dos markdowns as component, depois de algumas horas de investigação acabei por usar o [front-matter](https://github.com/jxson/front-matter) usando o tema [dracula](https://github.com/dracula/prism) este tema por pertencer a prims acabei usando o `markdown-it-prism` e `markdown-it` para o loader, gostei muito do resultado... talvez mude num futuro, mas por agora é o suficiente para mim.

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



Algo curioso é que durante o processo todo o meu mode do nuxt estava como `universal` e isso me gerava erros de 	execução quando tentava abrir um markdown de testes, alterando o mode para `spa` a situação ficou resolvida.

## Lendo conteúdo de todos markdowns de uma vez

Algo que esta a me incomodar era não ter uma descrição na lista de post's na home page, eu até consegiia por intermedio de uma gambiarra pegar a data o titulo e as categorias ( Aqui bem junto era uma GAMBIARRA daquelas  😂😂😂😂).

Como era, básicamente o nome dos meus markdowns consistem na data e o title como o desse por exemplo: `2020-05-16-rebuild-meu-portfolio`, assim com algumas regras e com alguns `slices` daqui e dali eu consigo ter a data e o titulo. Então para adicionar as categorias tinha que fazer algo do género `2020-05-16-rebuild-meu-portfolio.javascript,nuxt,pwa,ssg` e depois um split daqui e uns slices dali pronto eu tinha as categorias kkkkk.

O problema logo surge quando queremos exibir alguma descrição basicas. eu fiz tudo isso para não ter que abrir os markdowns na primeira página. depois de alguns esforços decide seguir abrindo mesmo, porém só dos que estiverem a ser vistos no momento, fiz isso usando o interception api, para o nuxt usei essa lib [Vue Observe Visibility](https://github.com/Akryum/vue-observe-visibility) e depois de algumas pesquisas descobri que não poderia passar atributos nos markdowns usando o proprio front-matter, ficando desta forma em todos os markdowns

```markdown
---
date: 2020-05-16
title: Re-build meu portfolio
image: 2020-16-05-rebuild-portfolio.jpg
categories: Javascript, Nuxtjs, PWA, SSG, Markdown, JAMStack
description: Passo a passo de como foi refazer o porfolio
---
```

Isso me abriu as portas para costumizar uma capa nos posts como no caso desse aqui.

E no meu componente foi basicamente fazer isso:

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

E voilá eu tenho as minhas description só para os posts que estiverem visíveis.

![Post With Description](/images/blog/2020-05-16-rebuild-meu-portfolio.png)

Obrigado por ler,

Com base nos feedbacks que obter nesse post posso criar uma segunda parte, citando outros situações que tive. 

^^

Acidiney Dias

