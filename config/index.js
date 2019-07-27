const site = {
  pathPrefix: "/",
  title: "David Costa",
  author: "David Costa",
  description:
    "Student TI, Javascript Developer, maintainer of @withmoney project and fastexpress packager and work at @EvoluxBR",
  siteUrl: "https://davidcosta.com.br",
  twitter: "davidcostadev",
  github: "davidcostadev",
  disqusShortName: "davidcostadev",
  googleTrackingId: "UA-144325709-1",
  lang: "en",
}

const text = {
  tHome: "Home",
  tRelativePosts: "Relative Posts",
  tFollowTwitterDescription: "You should follow him on Twitter",
  tTags: "Tags",
  tIndTitle: "All posts",
  taIndKeywords: [`blog`, `gatsby`, `javascript`, `react`],
  tfIndCountPosts: count => `${count} Posts`,
  tfTagHeader: (totalCount, tag) =>
    `${totalCount} post${totalCount === 1 ? "" : "s"} tagged with "${tag}"`,
  t404Title: "Not Found",
  t404Content: "You just hit a route that doesn&#39;t exist... the sadness.",
  "pt-br": {
    tHome: "Home",
    tRelativePosts: "Posts Relacionados",
    tTags: "Tags",
    tIndTitle: "Todos os Posts",
    taIndKeywords: [`blog`, `gatsby`, `javascript`, `react`],
    tfIndCountPosts: count => `${count}Posts`,
    tfTagHeader: (totalCount, tag) =>
      `${totalCount} post${totalCount === 1 ? "" : "s"} tageado com "${tag}"`,
  },
}

const supportedLanguages = {
  en: "English",
  "pt-br": "Português Brasil",
}

module.exports = {
  site,
  text,
  supportedLanguages,
}
