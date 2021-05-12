import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './scss/main.scss';
import NavBar from './components/commons/NavBar';
import { Paths } from './utils/types/basicTypes.d';
import CategoryForm from './containers/CategoryForm';
import Lists from './containers/Lists';

function App(): JSX.Element {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path={Paths.HOME}>
              <Lists />
            </Route>
            <Route path={Paths.ADD_CATEGORY}>
              <CategoryForm />
            </Route>
          </Suspense>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
