import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Slider from "react-animated-slider"
import "react-animated-slider/build/horizontal.css"
import { setColor, setFontFamily } from "../styles"
import { graphql, useStaticQuery } from "gatsby"

const Section = styled.section`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${setColor.accentColor};
  height: 350px;
`

const OuterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
  background-size: cover;
`

const InnerDiv = styled.div`
  width: 100%;
  max-width: 550px;
  padding: 0.5rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);

  a {
    text-decoration: none;
    ${setFontFamily.main}
  }

  p {
    font-size: 1.2rem;
    font-style: italic;
    margin-bottom: 0.5rem;
    ${setFontFamily.serif}
  }
`

const query = graphql`
  {
    allStrapiEvent(filter: { featured: { eq: true } }) {
      totalCount
      edges {
        node {
          id
          title
          slug
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

const ImageSlider = () => {
  const {
    allStrapiEvent: { edges },
  } = useStaticQuery(query)

  return (
    <Section>
      <Slider>
        {edges.map((event, index) => {
          const { node } = event
          return (
            <OuterDiv
              key={node.id}
              className="slider-content"
              style={{
                backgroundImage: `url(${node.image.childImageSharp.fluid.src})`,
                height: `350px`,
              }}
            >
              <InnerDiv>
                <p>{node.information.dinnerDate}</p>
                <h2>
                  <Link
                    style={{ color: `${setColor.mainBlack}` }}
                    to={node.slug}
                  >
                    {node.title} &rarr;{" "}
                  </Link>
                </h2>
              </InnerDiv>
            </OuterDiv>
          )
        })}
      </Slider>
    </Section>
  )
}

export default ImageSlider
