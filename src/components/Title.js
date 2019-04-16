import React from 'react'
import { Hero, Container, Heading } from 'react-bulma-components/full'

const Title = () => {
  return (
    <div>
      <Hero color="primary">
        <Hero.Body>
          <Container>
            <Heading size={1}>YouMovie</Heading>
            <Heading subtitle size={5}>
              with The Movie Database API
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    </div>
  )
}

export default Title
