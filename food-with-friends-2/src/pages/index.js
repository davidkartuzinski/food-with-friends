import React from "react"
import Layout from "../components/layout"
import ImageSlider from "../components/imageSlider"
import Title from "../components/global/title"
import { graphql } from "gatsby"
import { get, orderBy } from "lodash"

import Article from "../components/global/article"
import Card from "../components/card"

const IndexPage = ({ data }) => {
  const getDiffDays = event => {
    const currentDate = new Date()
    const eventDate = new Date(get(event, ["information", "dinnerDate"]))
    const diffTime = eventDate.getTime() - currentDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }
  const nextEventDate = orderBy(
    data.allStrapiEvent.edges,
    event => {
      console.log(event)
      return getDiffDays(event.node)
    },
    "asc"
  ).filter(event => {
    return getDiffDays(event.node) > 0
  })[0]

  return (
    <Layout topComponent={ImageSlider}>
      <div>
        <Title center title="Food with Friends" />
        <Article>
          <Card
            {...nextEventDate.node}
            image={nextEventDate.node.image.childImageSharp.fluid}
            isMainEvent
          />

          {data.allStrapiEvent.edges.map((event, index) => {
            return (
              <Card
                {...event.node}
                key={event.node.id}
                image={event.node.image.childImageSharp.fluid}
              />
            )
          })}
        </Article>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allStrapiEvent(sort: { fields: information___dinnerDate, order: DESC }) {
      edges {
        node {
          title
          slug
          details
          information {
            dinnerDate(formatString: "MMMM DD, YYYY")
          }
          image {
            childImageSharp {
              fluid(maxWidth: 1100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
