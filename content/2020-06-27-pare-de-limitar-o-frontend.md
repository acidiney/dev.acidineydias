---
date: 2020-06-27
title: Pare de limitar o frontend!
categories: programação, frontend, UI/UX, design, imagination
description: É bom prestar atenção que podemos dois tipos de usuários no nosso sistema, os que gostam do sistema e usam por isto, e aqueles que se desse nunca mais usava... simplesmente usa porque não pode mudar ( quanto a isso podem ser vários motivos ).
---

Opa boas?

*Nota importante: Quando comecei a escrever este artigo peguei uma copo com ☕ e abri a minha playlist de Jazz no spotify  então este artigo pode estar um pouco extenso...  então take your time and enjoy the article😁.*

Esse tema despertou muito interesse por parte das pessoas, quando anunciei que iria criar um artigo com um tema tão brusco, e realmente faz sentido, afinal de conta estou presumindo que muita gente faz as coisas "erradas".

Este artigo não é apenas voltado para o pessoal de desenvolvimento como também para o pessoal da área de design e sobre tudo para os encarregados por usar boas praticas de user experiencie,  e sim, o desenvolvedor frontend pode não saber sobre UX e não tem nada de errado, porém é recomendado que saiba, para seu crescimento profissional.

Antes de avançar, gostaria de dizer uma coisa muito importante **"está é a minha opinião, baseada na minha experiencia e nos meus estudos"**.

### Qual foi a motivação por trás desse tema?

Durante o todo o tempo em que atuo como developer, já tive a oportunidade de fazer muitos trabalhos onde o foco em si estava em como o cliente final interage com o site ou sistema, e isso foi muito bom para mim porque pude desenvolver um pensamento muito critico quanto a algumas práticas quando vou elaborar um projeto de grande complexidade e com grande complexidade me refiro a um projeto que dependa muito da interação do cliente final.

E esse senso critico me fez começar a investigar mais sobre UX e sobre tudo a ver como as grandes empresas de TI resolvem estes pontos. Até agora já devo té-lo situado um pouco sobre o contexto desta postagem, mas deixa te dar um exemplo: Um dos casos mais comuns de desenvolvedores que fazem BackOffice ( parte administrativa do site ou sistema ) é ter um monte na sua maioria de tabelas com ações distintas ... e nota não tem nada de errado em ter tabelas ( o ponto não é este e nunca será esse...), continuando,  basicamente eles tem um menu do usuário ( supondo), que após abrir o mesmo ele poderá listar, editar, visualizar e por aí vai.

Bem, esse exemplo que dei é um clássico e você encontra isso em quase todos sistemas se não em todos, o que eu quero analisar contigo é o seguinte qual valor você está agregando ao usuário final quando o mesmo usa o teu sistema?.

É bom prestar atenção que podemos dois tipos de usuários no nosso sistema, os que gostam do sistema e usam por isto, e aqueles que se desse nunca mais usava... simplesmente usa porque não pode mudar ( quanto a isso podem ser vários motivos ).

Eu sei, é uma pergunta bem genérica e que fora de contexto realmente é difícil de perguntar, pode ser que até você esteja a se perguntar o que eu quero dizer com isso. Bem, a minha missão com esse artigo é te explicar algo antes de te perguntar novamente, e se for o teu caso, considerares verificar o que tens feito.

Para começar, decidi ir ao google e escrever "o que é UX", podes tentar se quiseres... acredito que essa investigação pode e sempre vai agregar um pouco mais de valor mesmo para você que é experiente no caso.

Esse tópico é tão interessante que se você procurar em 3 locais diferentes sobre o que é UX, terás 3 respostas diferentes... Então vamos nos manter pelo básico que por agora deve servir.

"Experiência do usuário, do inglês user experience, é o conjunto de elementos e fatores relativos à interação do usuário com um determinado produto, sistema ou serviço cujo resultado gera uma perceção positiva  ou negativa.", Segundo o nosso querido Wikipédia.

### Momento história
Teve um momento onde precisei redesenhar a tela de contactos do [WeSender](https://www.wesender.co.ao) porque não estava muito satisfeito com o que tinha atualmente, e achei que poderia melhorar e entregar uma melhor experiência para o usuário final então resolvi investigar como serviços semelhantes tratavam daquele assunto em especifico, e peguei um porrada de exemplos... Uns que achei muito nada haver, outros muito 😒😒(também quero), e foi nas falhas dos que achei nada haver e nos quase surreais que vi que comecei a desenhar uma tela ( eu não sou designer, é bom isso ficar explicado aqui ). Porém, ao terminar de desenhar, o primeiro feeling que tive que que estava muito bom! Mas depois de algum tempo a analisar o que tinha feito, percebi que o que eu tinha feito, não resolvia o problema do software ... Por mais bonito que aquele primeiro desenho tinha ficado.

E qual era o problema do software no caso? Era enviar mensagens... E sim, nós tínhamos uma zona assim como muitos softwares dedicados a enviar mensagem para enviar as benditas mensagens. 😒, ué o problema é enviar mensagens... Mas tem um sitio para enviar mensagens? 😒 Como isso é um problema? 😒

" Continue lendo ... " 😘

Então qual era o real problema do desenho? Bem, quando eu  fiz aquela interface esqueci de algo que eu uso muito quando programo... ** atalhos ** ( E sim faz real diferença ) ... e talvez seja interessante explicar que um atalho é um caminho mais curto do que o **costume**. E costume é o ponto! 

Muitas das vezes um nós vemos fazendo sempre a mesma coisa, e desconsideramos que existem melhores maneiras de fazer a mesma por que temos o costume de fazer elas assim, no mundo do desenvolvimento também é comum isso acontecer, mas isso chega a ser bem perigoso, quando você desenvolve coisas que o teu usuário final tem experiência e uma ideia totalmente diferente da que você está fez. Ex: Muitas vezes uma simples opção de editar sem o usuário sem a necessidade dele abrir o detalhes é faz uma diferença enorme. Porquê? Porque ele fez o que queria e não precisou dar muita volta para o fazer, eu vou explorar mais esse exemplo no futuro, então mantenha ele em mente.

#### Descontraia um pouco, o mundo não é tão sério assim.
Mas, como eu estou  a gostar da música que estou ouvindo, vou citar mais um ponto crítico, este acontece normalmente quando nós trabalhos com API e ficamos muito focados em como o backend espera receber ou retorna as informações e a partir deste ponto começamos a criar a nossa interface... Em alguns casos começamos a inventar um monte de "coisas" ou começamos a pensar em determinadas tools para resolver um problema que não necessariamente é um problema. " O problema nem sempre é um problema, o teu desconhecimento é mais problemático que o problema em muitos casos."  ( Acidiney Dias, 2020 ) 😂😂😂😂😂

Em alguns casos, só o facto de você conhecer 70% da ferramenta que você está usando consegues resolver a maioria dos casos que te aparecem a frente... Tem um post muito antigo que li quando queria aprender mais sobre GraqQL que dizia o seguinte: "Se você está a fugir do REST, porque não achaste uma forma de resolver o que procuras, então o mesmo acontecerá em tudo que você tentar usar.". O que isso quer dizer? Não é que GraphQL é mau ou coisa do género... e pode ser que ele realmente resolva melhor o que você está tentando fazer. Mas desmerecer uma ferramenta por uma incapacidade tua gera um loop infinito no desmerecimento.

Mesmo da pior forma possível, tens que achar uma maneira de resolver o teu problema, porque isso demostra o teu nível de crescimento não com a plataforma, mas sim, a resolver problemas 🤗.

Se não acha que consegue, então lamento te informar, mas podes ter esquecido do foco desse mundo maravilhoso que é  a programação. 😒 Assim só queres dinheiro mesmo? Depois não vais ficar rico '-'. ( Se ficares, nunca leste esse comentário )🙈

#### voltando ao contexto

No caso em especifico do WeSender, eu parei e comecei a analisar quais pontos realmente poderiam ser atalhos para a zona de contactos, e para saber que pontos poderiam ser atalhos precisamos primeiramente saber qual é o objetivos da ferramenta ( E olha que interessante, nesse ponto você consegue ir buscar mais um conceito bem interessante cujo a base se resume a *contexto*, deixa nos comentários se você sabe qual conceito é esse 😉) . No caso do WeSender que é um serviço de envio de mensagens, faz sentido que tenha um atalho para enviar mensagens a partir da zona de contactos, assim como o aplicativo de agenda telefónica te permite ligar para um número a partir da lista telefônica.  Bom quanto a isto acredito estarmos fechados! No fundo tudo é contexto, saber em que contexto estais, te permite criar soluções que realmente ajudem o teu usuário final, então ao perceber o meu contexto, pude tomar nota que faz sentido eu conseguir enviar mensagens para um ou múltiplos contactos a partir da zona de contactos, e deixando assim ela de ser uma simples decoração e começando a realmente ajudar muitas pessoas. 

"Abre parenteses aqui..."
( Aqui eu poderia simplesmente colocar os números que o usuário pretende enviar em uma sessão e mudar de página, mas aqui eu deixo a reflexão sobre o ponto que falei antes. Faz sentido para ti isto? Bem para mim não, porque mudar de página é mais um custo para enviar uma mensagem. E presta atenção que a única coisa que ele terá que fazer é redigir o que quer enviar e enviar... Então nesse ponto, fica mais fluído um modal do que mover de página.

Mas se ele precisa-se de fazer algo mais complexo, tipo carregar um arquivo para manipular um template, não faria sentido usar um modal... Porque o ação que ele vai realizar tem mais dependências do que uma simples mensagem ^^. )

Quando parei para analisar essa situação percebi que o que o WeSender tinha em comum com aquelas opções que tinha visto que não tinha gostado muito era que ambas tinham muitas áreas que poderiam ser mais interativas levando em conta o objetivo de cada app que tinha analisado.

( Eu amo o google por conta disso, até o [contacts.gooogle.com](https://contacts.google.com)... consegue ser tão simples, mas tão interativo 🤗🤗)

E essa opinião só começou a literalmente se formar quando comecei a olhar para as soluções que outras pessoas faziam, principalmente quando os devs criavam determinadas zonas limitando a sua imaginação porque tinham que fazer com base no que o backend iria enviar ou receber.

Se eis frontend deixa te contar um segredo, tudo bem em usar o mesmo endpoint em dois sítios diferentes, e/ou usar informação antigas no caso de só ter uma mudança ^^.

Olhar para o backend como uma fonte de verdade pode deixar as coisas mais simples (desenvolvendo) ou mais complexas para quem vai usar o teu sistema... O não analisar o que estas a receber ou simplesmente desenvolvendo algo orientado ao que o backend retorna pode ser assustador para o Usuário final.

Vou dar mais um exemplo prático de algo que considero bem besta mais as pessoas normalmente não pensam nisso, vai saber porquê?! 😐

Muitas vezes quando o pessoal desenvolve uma funcionalidade de editar alguma coisa, eles esperam que você ao fazer o submit das informações editadas lhes envie os todos campos, sejam eles com as informações antigas no caso de não terem sido editas, ou mesmo vazias somente por conta do modelo que eles fizeram(DTO)... E em alguns casos ( que pessoalmente mais gosto ) somente enviando o que realmente foi alterado. Pode não parecer mas a forma com que você pede algo para alguém do frontend fazer, acaba limitando muito a imaginação dele, sobre como poderia fazer algo, e acaba fazer o costume ( presta atenção que não estou a dizer que é errado, estou a dizer que existem formas mais criativas em mais interessantes ).

Qual é o sentido em precisar ir para as definições gerais somente para alterar o meu nome? Percebe? Quando digo não limitar o frontend, estou a dizer para seres criativo, o frontend pode fazer muitas coisas mesmo com pouco recurso. Ir para as definições gerais deve ser somente, quando realmente o usuário final precise de alterar alguma informação mas sensível e que não necessariamente fica disponível no profile por exemplo. Essa abordagem do exemplo de não precisar ir tão longe é muito usada pelo facebook ( quando queres alterar a foto por exemplo, e toma cuidado, para o facebook que trabalha com ** dados ** o teu nome é uma informação sensível, então tudo é contexto ) e f6s ou o github ( Para alterar a biografia por exemplo ) e acho ela muito incrível e transparente, porquê eles têm um caminho mas longo para você fazer essa alteração, mas eles têm o que as pessoas usam com mais facilidade. Os atalhos... E se você chorar que o teu atalho não é usado... então é porque não é um atalho! ✌ Querendo ou não as pessoas sempre procuram por atalhos, então se realmente for um atalho terias pessoas usando.

Muitos devs quando projetam as interfaces se deixam levar muitos sobre como a API foi projetada, tipo, se a API tem uma rota `/profile/update` que recebe 10 campos no body, ele cria uma rota na aplicação para fazer isso e pronto o serviço acabou. E é nesse ponto que você se apercebe das capacidades de cada um.

Como desenvolvedor devemos sempre pensar em como podemos deixar mais simples o que estamos a  fazer e isso não necessariamente se prende ao frontend mas também ao backend ( Mas isso é assunto para um outro artigo ). Afinal de contas programar é literalmente facilitar, automatizar.

### Os Meus Queridos Modal

Muita gente vai me prometer surra por isso 😂😂😂😂😂, vou tomar cuidado para não falar algo que me comprometa 😥.

" Txé, estou nem aí vou falar mesmo 😤, não gostou faz b.o "

A pessoas que deveriam ser presas de tantos modais que têm no site, os modais são um atalho sim, são simples de se usar sim, porém NÃO É PARA TUDO!

Perceba algo, modal é uma informação a mais que fica na página e trabalha sobre a página atual. Ou seja o comportamento da página atual afeta indiretamente o comportamento do modal.

O que isso quer dizer? É simples, modais foram concebidos para serem atalhos simples a informações simples! Como por exemplo uma notificação, detalhar alguma informação simples e editar informações simples.

Infelizmente o pessoal esqueceu disso por conta da sua facilidade! Eu já vi um pessoal usando um modal para preencher uns 20 campos lá dentro '-', man... Take it easy.

Isso não é somente uma questão de estética, é uma de experiencia de utilização mesmo! Don't use if you dont need.

Os modais são bons para atalhos mais quando mal usados, podem se tornar uma grande dor de cabeça, não só a nível de conceito, mas também como é uma informação que sempre existe na página, o uso descuidado do mesmo, pode impactar de forma negativa a construção do teu site ou sistema.. então tome cuidado. Hoje o assunto não é esse, mais vou deixar alguns links abaixo para você dar uma olhada 😎.

Por hoje é tudo pessoal, esse assunto é longo, então posso escrever uma outra parte um outro dia, mas sendo mais especifico num assunto específico.

Obrigado a todos os 30 que votaram sobre qual dos artigos lançar primeiro 🤗 vocês são incríveis.

### Recursos interessantes
- [JAZZ - SPOTIFY](https://open.spotify.com/playlist/37i9dQZF1DWTbzY5gOVvKd?si=4J9hGW1-QAyhNl4TxukQUQd)
- [Modal Or Not](https://medium.com/allenhwkim/modal-or-not-modal-3d65de64d82c)
- [Why We Should Avoid Modal Dialog](https://medium.com/allenhwkim/why-not-modal-84d9f5d7c646)
- [Best Practices for Modals / Overlays / Dialog Windows](https://uxplanet.org/best-practices-for-modals-overlays-dialog-windows-c00c66cddd8c)
- [Modality Is the One UX Concept That Most Designers Don’t Fully Understand](https://uxplanet.org/modality-the-one-ux-concept-you-need-to-understand-when-designing-intuitive-user-interfaces-e5e941c7acb1)
- [O que é UX?](https://www.organicadigital.com/blog/o-que-e-ux/)
- [Don Norman: O termo "UX"](https://www.youtube.com/watch?v=9BdtGjoIN4E&feature=emb_logo)
- [O que é UX – User Experience](https://www.hostinger.com.br/tutoriais/ux-o-que-e-user-experience/)
- [How You Are Destroying Your Creativity and Imagination](https://medium.com/@mikeschoultz/how-you-are-destroying-your-creativity-and-imagination-479a6d962c3b)
