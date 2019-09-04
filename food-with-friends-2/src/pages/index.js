import React from "react"
import Header from "../components/header"
import Layout from "../components/layout"
import ImageSlider from "../components/imageSlider"
import Helmet from "react-helmet"
import Title from "../components/global/title"
import SubTitle from "../components/global/subTitle"
import { Link } from "gatsby"
import { events } from "../seedData"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { get, orderBy } from "lodash"
import ReadMoreLink from "../components/global/readMoreLink"
import Article from "../components/global/article"
import * as seed from "../seedData"

import { setColor, setFontFamily } from "../styles"
import Img from "gatsby-image"
import useImages from "../hooks/useImages"
import Card from "../components/card"

const Div = styled.div`
  width: 100%;
  height: 320px;

  @media (min-width: 736px) {
    height: 640px;
  }

  img {
    object-fit: contain;
    height: 320px;
    text-align: left;

    @media (min-width: 736px) {
      height: 640px;
    }
  }
`

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
