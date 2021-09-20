import React from 'react';

import { Dimmer, Loader as LoaderSUI, Image } from 'semantic-ui-react';

const Loader = () => (
  <>
    <Dimmer active inverted>
      <LoaderSUI inverted>Loading</LoaderSUI>
    </Dimmer>

    <p>
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </p>
    <p>
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </p>
    <p>
      <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
    </p>
  </>
);

export default Loader;
