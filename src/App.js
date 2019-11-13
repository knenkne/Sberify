import React from 'react';

import { connect } from 'react-redux';

import Artist from './components/artist';

import './App.scss';

function App() {
  return (
    <Artist />
  );
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching,
  }
}

export default connect(mapStateToProps)(App);
