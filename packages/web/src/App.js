import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Chat } from './components/chat/chat';
import { PageNotFound } from './components/page.not.found';
import { AuthPage } from './components/auth.page';
import { LoginForm } from './components/login/login.form';

import { Routes_Enum } from './constants';

import { StoreContext } from "./context/store.context"

import { authStore } from "./store/auth.store"
import { messagesStore } from "./store/messages.store"

function App() {
  return (
    <StoreContext.Provider
          value={{
            authStore,
            messagesStore,
          }}
        >
    <Fragment>
      <Router>
        <Switch>
          <Route exact path={Routes_Enum.MAIN} component={AuthPage} />
          <Route path={Routes_Enum.AUTH} component={LoginForm} />
          <Route path={`${Routes_Enum.CHAT}`} component={Chat} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </Fragment>
  </StoreContext.Provider>
  );
}

export default App;
