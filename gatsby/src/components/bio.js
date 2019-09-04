import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { get } from "lodash"
import { graphql, useStaticQuery } from "gatsby"
import { setColor, setFontFamily } from "../styles"

const Section = styled.section`
  padding: 1rem;
  border: solid 1px ${setColor.accentColor};
  ${setFontFamily.main}
  h3 {
    text-align: center;
    ${setFontFamily.serif}
    font-size: 1.5rem;
  }
  small {
    text-align: center;
    display: block;
    padding: 0.25rem;
  }
  margin-bottom: 2rem;
`

const Bio = ({ className, small }) => {
  const data = useStaticQuery(query)
  const bio = get(data, ["strapiBio"])

  return (
    <Section>
      <h3>{bio.headline}</h3>
      <Img
        className={className}
        fluid={get(bio, ["image", "childImageSharp", "fluid"])}
      />
      <small>Jason</small>
      <p>{bio.content}</p>
    </Section>
  )
}

const query = graphql`
  query BioData {
    strapiBio(author: { username: { eq: "Jason" } }) {
      id
      headline
      content
      image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`

export default Bio
