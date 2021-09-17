import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAppMeta } from '../../store';

import logo from './logo.svg';

import './about.scss';

const About = ({ reduxStore, reduxAction }) => {
  React.useEffect(() => {
    reduxAction.fetchAppMeta();
  }, []);

  return (
    <div className="about-page">
      <header className="about-header">
        <img src={logo} className="about-logo" alt="logo" />
        <p>
          Edit <code>src/pages/about/About.js</code> and save to reload.
        </p>
        <a
          className="about-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <br />

        <p>App version: {reduxStore.appMeta.version || '...'}</p>
      </header>
    </div>
  );
};

const mapStateToProps = (store) => ({
  reduxStore: {
    appMeta: store.appMeta,
  },
});

const mapDispatchToProps = (dispatch) => ({
  reduxAction: bindActionCreators(
    {
      fetchAppMeta,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
