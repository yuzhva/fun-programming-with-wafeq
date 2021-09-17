import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAppMeta } from '../../store';

import logo from './logo.svg';

import './App.scss';

function App({ reduxStore, reduxAction }) {
  React.useEffect(() => {
    reduxAction.fetchAppMeta();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>App version: {reduxStore.appMeta.version || '...'}</p>
      </header>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
