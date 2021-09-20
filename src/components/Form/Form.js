import React from 'react';

import { Form as FormSUI } from 'semantic-ui-react';

const From = ({ children, ...props }) => {
  return <FormSUI {...props}>{children}</FormSUI>;
};

export default From;
