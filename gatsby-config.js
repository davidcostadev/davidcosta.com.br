const {
  pathPrefix,
  title,
  author,
  description,
  siteUrl,
  twitter = "",
  github = "",
  medium = "",
  facebook = "",
  disqusShortName = "",
  lang = "en",
  googleTrackingId: trackingId,
} = require("./config").site
const supportedLanguages = require("./config").supportedLanguages

module.exports = {
  pathPrefix,
  siteMetadata: {
    title,
    author,
    description,
    siteUrl,
    social: {
      twitter,
      github,
      medium,
      facebook,
    },
    disqusShortName,
    lang,
    langsJson: JSON.stringify(supportedLanguages),
    langs: Object.entries(supportedLanguages),
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `David Costa Blog`,
        short_name: `davidcostadev`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#5B1D98`,
        display: `minimal-ui`,
        icon: `content/assets/dc-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: lang,
        useLangKeyLayout: false,
        pagesPaths: ["/content/blog/"],
      },
    },
  ],
}
