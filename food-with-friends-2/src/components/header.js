import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"
import { RowMenu } from "../components/menu"
import Logo from "../components/global/logo"
import { setColor, setFontFamily, setFontSize } from "../styles"
import { sloganWords } from "../seedData"
import MobileMenu from "../components/mobileMenu"
import GlobalStyles from "../components/global/GlobalStyles"

const HeaderHTML = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${setColor.accentColor};
  padding: 1rem 0;
`
const P = styled.p`
  ${setFontFamily.main};
  ${setFontSize.larger};
  color: ${setColor.mainBlack};
  font-weight: normal;
  width: 250px;
  text-align: center;
`

const query = graphql`
  {
    site {
      siteMetadata {
        menuLinks {
          name
          link
        }
      }
    }
  }
`

const Header = () => {
  const {
    site: {
      siteMetadata: { menuLinks },
    },
  } = useStaticQuery(query)

  return (
    <>
      <GlobalStyles />
      <MobileMenu right menuItems={menuLinks} />
      <HeaderHTML>
        <Logo />
        <P> {sloganWords}</P>
      </HeaderHTML>
      <RowMenu center menuItems={menuLinks} />
    </>
  )
}

export default Header
