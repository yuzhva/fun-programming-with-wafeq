import React from 'react';
import ReactDOM from 'react-dom';

import './notification.scss';

const Notification = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="notification">{children}</div>,
    window.document.body
  );
};

export default Notification;
