import React from "react"
import { Link } from "gatsby"
import { get } from "lodash"
import styled from "styled-components"
import Slider from "react-animated-slider"
import "react-animated-slider/build/horizontal.css"
import { events } from "../seedData"
import { setColor, setFontFamily } from "../styles"
import { graphql, useStaticQuery } from "gatsby"
import useImages from "../hooks/useImages"

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

const ImageSlider = () => {
  // const query = graphql`
  //   query image {
  //     allFile {
  //       edges {
  //         node {
  //           publicURL
  //           name
  //         }
  //       }
  //     }
  //   }
  // `
  // const data = useStaticQuery(query)

  // const images = get(data, "allFile.edges", []).reduce((acc, current) => {
  //   const {
  //     node: { name, publicURL },
  //   } = current
  //   acc[name] = publicURL
  //   return acc
  // }, {})
  const images = useImages()

  return (
    <Section>
      <Slider>
        {events.slice(0, 3).map((event, index) => (
          <OuterDiv
            key={index}
            className="slider-content"
            style={{
              backgroundImage: `url(${window.location.origin}${images[event.slug].publicURL})`,
              height: `350px`,
            }}
          >
            <InnerDiv>
              <p>{event.information.dinnerDate}</p>
              <h2>
                <Link
                  style={{ color: `${setColor.mainBlack}` }}
                  to={event.slug}
                >
                  {event.title} &rarr;{" "}
                </Link>
              </h2>
            </InnerDiv>
          </OuterDiv>
        ))}
      </Slider>
    </Section>
  )
}

export default ImageSlider
