import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import Subtitle from "./global/subTitle"
import ReadMoreLink from "./global/readMoreLink"

const Card = ({
  details,
  importantInformation,
  isMainEvent,
  slug,
  subtitle,
  title,
  image,
}) => {
  return (
    <div className={isMainEvent ? "grid" : ""}>
      <h3>
        <Link to={slug}>{title}</Link>
      </h3>
      {isMainEvent && <Subtitle subtitle={subtitle} />}
      <Image fluid={image.fluid} />
      {isMainEvent && (
        <p>
          <strong>Next Event Date: </strong>
          {importantInformation.dinnerDate}
        </p>
      )}
      <p>{details}</p>
      <ReadMoreLink to={slug}>
        {isMainEvent ? "All Information" : "Read More"} &rarr;
      </ReadMoreLink>
    </div>
  )
}

export default styled(Card)`
  align-self: center;
`
