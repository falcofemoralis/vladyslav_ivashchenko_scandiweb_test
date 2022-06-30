import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import './styles/App.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <Switch>
            <Route exact path='/'>
              <CategoryPage />
            </Route>
            <Route exact path='/product'>
              <ProductPage />
            </Route>
            <Route exact path='/:category'>
              <CategoryPage />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
