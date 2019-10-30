const site = {
  pathPrefix: '/',
  title: 'David Costa',
  author: 'David Costa',
  description:
    'Student of Information Systems, JavaScript Engineer, maintainer of withmoney project, fastexpress package and works at EvoluxBR',
  siteUrl: 'https://davidcosta.com.br',
  twitter: 'davidcostadev',
  github: 'davidcostadev',
  googleTrackingId: 'UA-144325709-1',
  lang: 'en',
};

const text = {
  tDescription:
    'Student of Information Systems, JavaScript Engineer, maintainer of withmoney project, fastexpress package and works at EvoluxBR',
  tHome: 'Home',
  tRelativePosts: 'Relative Posts',
  tFollowTwitterDescription: 'You should follow him on Twitter',
  tTags: 'Tags',
  tIndTitle: 'Home',
  taIndKeywords: [`blog`, `gatsby`, `javascript`, `react`],
  tfIndCountPosts: count => `${count} Posts`,
  tfTagHeader: (totalCount, tag) =>
    `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`,
  t404Title: 'Not Found',
  t404Content: 'You just hit a route that doesn&#39;t exist... the sadness.',
  tDiscuss: 'Discuss on Twitter',
  tEdit: 'Edit on GitHub',
  tFollow: 'Follow me on',
  tRead: 'read',
  'pt-br': {
    tDescription:
      'Estudante de Sistemas de Informação, Engenheiro JavaScript, mantenedor do projeto withmoney, do pacote do fastexpress e trabalha na EvoluxBR',
    tHome: 'Home',
    tRelativePosts: 'Posts Relacionados',
    tTags: 'Tags',
    tIndTitle: 'Página inicial',
    taIndKeywords: [`blog`, `gatsby`, `javascript`, `react`],
    tfIndCountPosts: count => `${count} artigos`,
    tfTagHeader: (totalCount, tag) =>
      `${totalCount} artigo${totalCount === 1 ? '' : 's'} marcado com "${tag}"`,
    tDiscuss: 'Comente no Twitter',
    tEdit: 'Edite no Github',
    tFollow: 'Siga me no',
    tRead: 'de leitura',
  },
};

const supportedLanguages = {
  en: 'English',
  'pt-br': 'Português Brasil',
};

module.exports = {
  site,
  text,
  supportedLanguages,
};
