import React from "react"
import { get } from "lodash"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import Article from "../components/global/article"
import Title from "../components/global/title"

const Event = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const currentEvent = data.strapiEvent

  return (
    <Layout>
      <div>
        <Article>
          <Image
            fluid={get(currentEvent, ["image.childImageSharp.fluid"], {})}
          />
          <Title title={currentEvent.title} />
          <p>Posted By: {currentEvent.author.username}</p>
          <h2>Important Information</h2>
          <div>
            <div>{currentEvent.information.dinnerDate}</div>
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
                <Link to={previous.node.slug} rel="prev">
                  ← {previous.node.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.node.slug} rel="next">
                  {next.node.title} →
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
  query StapiEventQuery($slug: String!) {
    strapiEvent(slug: { eq: $slug }) {
      title
      author {
        username
      }
      information {
        dinnerDate(formatString: "MMMM DD, YYYY")
        address
        googleMap
        location
        id
      }
      details
      friends {
        username
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
`
