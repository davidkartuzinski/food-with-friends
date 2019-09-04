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

// const Home = () => {
//   const LatestEvent = events[0]

//   const query = graphql`
//     query imageHome {
//       allFile {
//         edges {
//           node {
//             publicURL
//             name
//           }
//         }
//       }
//     }
//   `
//   // const data = useStaticQuery(query)

//   // const images = get(data, "allFile.edges", []).reduce((acc, current) => {
//   //   const {
//   //     node: { name, publicURL },
//   //   } = current
//   //   acc[name] = publicURL
//   //   return acc
//   // }, {})

//   // console.log(images)
//   return (
//     <div>
//       <Helmet>
//         <html lang="en" />
//         <title>Food with Friends | Home Page</title>
//         <meta
//           name="description"
//           content="There is more to Life than Hustle & Grind. It is about spending time with those you care about, eating good food, drinking great drinks and simply enjoying life."
//         />
//       </Helmet>
//       <Header />
//       <ImageSlider />
//       <Layout>
//         <div>
//           <Title center title="Food with Friends" />
//           <Article>
//             <h3>
//               <Link to={LatestEvent.slug}>{LatestEvent.title}</Link>
//             </h3>

//             <SubTitle subTitle="Latest Food with Friends Announcement" />

//             <Div>Image</Div>

//             <p>
//               <strong>Next Event Date: </strong>
//               {LatestEvent.importantInformation.dinnerDate}
//             </p>
//             <p>{LatestEvent.Details}</p>

//             <ReadMoreLink to={LatestEvent.slug}>
//               All Information &rarr;
//             </ReadMoreLink>
//           </Article>
//         </div>
//       </Layout>
//     </div>
//   )
// }

// export default Home

const IndexPage = () => {
  const images = useImages()
  const orderedEvents = orderBy(
    seed.events,
    data => {
      const date = new Date(
        get(data, ["importantInformation", "dinnerDate"])
      ).toISOString()

      return date
    },
    ["desc"]
  )
  const getDiffDays = event => {
    const currentDate = new Date()
    const eventDate = new Date(
      get(event, ["importantInformation", "dinnerDate"])
    )
    const diffTime = eventDate.getTime() - currentDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }
  const nextEventDate = orderBy(
    orderedEvents,
    event => {
      return getDiffDays(event)
    },
    "asc"
  ).filter(event => {
    return getDiffDays(event) > 0
  })[0]

  return (
    <Layout topComponent={ImageSlider}>
      <div>
        <Title center title="Food with Friends" />
        <Article>
          <Card
            {...nextEventDate}
            image={images[nextEventDate.image.replace(".jpg", "")].fluid}
            isMainEvent
          />

          {orderedEvents.map((event, index) => {
            return (
              <Card
                {...event}
                key={event.id}
                image={images[event.image.replace(".jpg", "")].fluid}
              />
            )
          })}
        </Article>
      </div>
    </Layout>
  )
}

export default IndexPage
