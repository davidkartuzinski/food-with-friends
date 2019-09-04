import React from "react"
import { get } from "lodash"
import { graphql } from "gatsby"
import Header from "../components/header"
import Layout from "../components/layout"

const Friends = ({ data }) => {
  const friends = data.allStrapiUser.edges

  return (
    <div>
      <Layout>
        <ul>
          {friends.map(friend => {
            const joinedEvents = get(friend, "node.joinedEvents", [])
            const joinedEventsNumber = joinedEvents.length

            return (
              <li key={friend.node.id}>
                {friend.node.username}&nbsp; ({joinedEventsNumber})
                <ul>
                  {joinedEvents.map(event => {
                    return <li key={event.id}>{event.title}</li>
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </Layout>
    </div>
  )
}

export default Friends

export const pageQuery = graphql`
  query {
    allStrapiUser {
      edges {
        node {
          id
          username
          joinedEvents {
            id
            title
            slug
          }
        }
      }
    }
  }
`
