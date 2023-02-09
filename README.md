# API AÇIKLAMASI

<p>
      <a href="https://www.npmjs.com/package/@acildeprem/api"><img src="https://img.shields.io/npm/v/@acildeprem/api.svg?style=flat&colorA=002438&colorB=28CF8D" alt="Version"></a>
      <a href="https://www.npmjs.com/package/@acildeprem/api"><img src="https://img.shields.io/npm/dm/@acildeprem/api.svg?style=flat&colorA=002438&colorB=28CF8D" alt="Downloads"></a>
      <a href="./LICENSE"><img src="https://img.shields.io/github/license/acildeprem/storage.svg?style=flat&colorA=002438&colorB=28CF8D" alt="License"></a>
      <a href="https://github.com/acildeprem/api">
      <img src="https://img.shields.io/github/stars/acildeprem/api.svg?style=social&label=Star&maxAge=2592000" alt="Github Stars"> </a>
</p>


`@acildeprem/api` server paketi olmadan sadece apilerin ve servislerin bulunduğu pakettir. Servis paketleri içine `@acildeprem/storage` paketinden gelen db algorithmlarını kullanıyoruz. Client tarafında gerekli olan tüm yapıları buradan çıkıyor. Dilersek bu apiyi genişletip farklı bir şekilde kullanabiliriz. 

## NPM Paketi


### Kurulum
```bash
pnpm install @acildeprem/api
```

###  Kullanım
```ts
import { ... } from '@acildeprem/api' 
```

## Gereksinimler

- [Node.js](https://nodejs.org/en/) 18.0.0+
- [pnpm](https://pnpm.io/) 7.26.3+

## Kullandığımız teknolojiler
- [abraham/reflection 0.12.0](https://www.npmjs.com/package/@abraham/reflection)
- [AWS 3.264.0](https://aws.amazon.com/tr/sdk-for-javascript/)
- [clickhouse 0.0.12](https://clickhouse.com/docs/en/intro/)
- [envelop/generic-auth 5.0.4](https://www.npmjs.com/package/@envelop/generic-auth)
- [graphql 8.3.29](https://graphql.org/learn/)
- [huntersofbook/relay-cursor-paging 1.0.0](https://www.npmjs.com/package/@huntersofbook/relay-cursor-paging)
- [Faker 7.6.0](https://fakerjs.dev/guide/)

## Local Geliştirme - Development

### Kurulum
```bash
pnpm install
```

### Dev
```bash
pnpm dev
```

### Build
```bash
pnpm build
```


# Linkler

- [Web Sitesi](https://acildeprem.com)
- [Discord](https://discord.acildeprem.com)
- [Twitter](https://twitter.com/acildepremcom)
