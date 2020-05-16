---
date: 2020-05-16
title: Meu segundo test
categories: Javascript, Coding
img: test.jpg
imagePosition: object-bottom
description: Asian Kung-Fu Generation (アジアン・カンフー・ジェネレーション Ajian Kanfū Jenerēshon, stylized as ASIAN KUNG-FU GENERATION) is a Japanese alternative rock band formed in Yokohama, Japan, in 1996.

---

```js
  async asyncData({ params }) {
    try {
      let post = await import(`~/content/${params.slug}.md`)
      return {
        date: new Date(post.attributes.date).toLocaleDateString('pt'),
        title: post.attributes.title,
        categories: post.attributes.categories.split(','),
        singlePostComponent: post.vue.component
      }
    } catch (err) {
      console.debug(err)
      return false
    }
  },
```

Asian Kung-Fu Generation (アジアン・カンフー・ジェネレーション Ajian Kanfū Jenerēshon, stylized as ASIAN KUNG-FU GENERATION) is a Japanese alternative rock band formed in Yokohama, Japan, in 1996.

For its entire career, the band has consisted of vocalist Masafumi Gotoh, guitarist Kensuke Kita, bassist Takahiro Yamada, and drummer Kiyoshi Ijichi.

Starting out as a college band, Asian Kung-Fu Generation released a series of independent EPs featuring lyrics mostly sung in English. In 2002, they released their major-label EP debut Hōkai Amplifier, from that point singing their lyrics in Japanese. The band's musical style is influenced by seminal Western alternative rock acts as well as their own local Japanese indie-rock and punk scene.

![Image of Yaktocat](/icon.png)

Their songs incorporate various aspects of the genres, most typically expressing fast tempos and prominent power chord guitar riffs in addition to rhythmic groove and emotional lyrics. Despite the indie nature of their music, the band has enjoyed worldwide commercial success in addition to critical acclaim. Asian Kung-Fu Generation has been cited as one of the best, most balanced modern rock bands to emerge from Japan in the 2000s.

[Asian Kung-Fu Generation - Wikipedia](https://en.wikipedia.org/wiki/Asian_Kung-Fu_Generation)
