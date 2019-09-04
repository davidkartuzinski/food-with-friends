import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { bioData } from "../seedData"
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

  return (
    <Section>
      <h3>{bioData.headline}</h3>
      <Img className={className} fluid={data.logo.childImageSharp.fluid} />
      <small>{bioData.author}</small>
      <p>{bioData.content}</p>
    </Section>
  )
}

const query = graphql`
  query bioImage {
    logo: file(relativePath: { eq: "bbq-jason.jpg" }) {
      relativePath
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default Bio
