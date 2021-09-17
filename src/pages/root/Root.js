import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import { LayoutWrapper } from '../../containers';

const RootPage = () => (
  <LayoutWrapper.Content>
    <Container text textAlign="center">
      <Header
        as="h1"
        content="🦄 => creating the next unicorn <= 🦄"
        style={{
          fontSize: '2.5em',
          fontWeight: 'normal',
          marginBottom: '0.5em',
          marginTop: '4.5em',
        }}
      />
      <iframe
        title="welcome"
        src="https://giphy.com/embed/ASd0Ukj0y3qMM"
        width="480"
        height="360"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
      <p>
        <a href="https://giphy.com/gifs/the-simpsons-hello-hi-ASd0Ukj0y3qMM">
          via GIPHY
        </a>
      </p>
    </Container>
  </LayoutWrapper.Content>
);

export default RootPage;
