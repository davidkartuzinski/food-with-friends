import React from "react"
import { get } from "lodash"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import Article from "../components/global/article"
import Title from "../components/global/Title"
import * as seedData from "../seedData"

const Event = ({ data, path, pageContext }) => {
  const slug = path.replace("/", "")
  const { previous, next } = pageContext
  console.log(pageContext)
  const currentEvent = seedData.events.find(event => event.slug === slug)
  const fluid = get(
    data,
    ["allFile", "edges", "0", "node", "sharp", "fluid"],
    {}
  )

  return (
    <Layout>
      <div>
        <Article>
          <Image fluid={fluid} />
          <Title tiel={currentEvent.title} />
          <p>Posted By: {currentEvent.author}</p>
          <h2>Important Information</h2>
          <div>
            <div>Dinner date: dinner date</div>
          </div>
          <div>{currentEvent.details}</div>
        </Article>
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.slug} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.slug} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  )
}

export default Event

export const pageQuery = graphql`
  query imageHom($slug: String!) {
    allFile(filter: { name: { eq: $slug } }) {
      edges {
        node {
          publicURL
          name
          sharp: childImageSharp {
            fluid(maxWidth: 1100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
