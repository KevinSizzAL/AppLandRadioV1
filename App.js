import React from 'react';
import { Provider } from 'react-redux';
import Config from './src/Config';
import store from './src/redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <Config/>
      </Provider>
    );
  }
}
