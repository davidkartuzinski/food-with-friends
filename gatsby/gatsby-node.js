// const events = require("./src/seedData").events
const path = require("path")

exports.createPages = async ({ graphql, node, getNode, actions }) => {
  const { createPage } = actions
  const eventTemplate = path.resolve("./src/templates/event.js")
  const results = await graphql(
    `
      {
        allStrapiEvent {
          totalCount
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `
  )

  if (results.error) {
    throw results.error
  }

  const events = results.data.allStrapiEvent.edges

  // Create the event pages
  events.forEach((event, index) => {
    const previous = index === events.length - 1 ? null : events[index + 1]
    const next = index === 0 ? null : events[index - 1]

    createPage({
      path: event.node.slug,
      component: eventTemplate,
      context: {
        slug: event.node.slug,
        previous,
        next,
      },
    })
  })
}
