/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Food with Friends",
    description:
      "Experience Food with Friends, Portland. There's more to life than Hustle & Grind",
    siteUrl: `localhost:8000`,
    menuLinks: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "About",
        link: "/about",
      },
      {
        name: "Friends",
        link: "/friends",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: "images",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "posts",
        path: "./src/posts/",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "src",
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `meat_with`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            // Headings
            family: `Quattrocento`,
            variants: [`700`],
            subsets: [`latin`],
          },
          {
            // Regular text
            family: `Quattrocento Sans`,
            variants: [`400`],
            subsets: [`latin`],
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "http://localhost:1337",
        contentTypes: ["bio", "user", "event"],
      },
      queryLimit: 1000,
    },
  ],
}
