import { Fragment } from 'react';
import { Chat } from './components/chat/chat';
import { Routes_Enum } from './constants';
import { PageNotFound } from './components/page.not.found';
import { AuthPage } from './components/auth.page';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StoreContext } from "./context/store.context"


function App() {
  return (
    // <StoreContext.Provider
    //       value={{
    //         AuthStore,
    //         MessagesStore,
    //       }}
    //     >
    <Fragment>
      <Router>
        <Switch>
          <Route exact path={Routes_Enum.MAIN} component={AuthPage} />
          <Route path={Routes_Enum.AUTH} component={AuthPage} />
          <Route path={`${Routes_Enum.CHAT}`} component={Chat} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </Fragment>
  //  </StoreContext.Provider>
  );
}

export default App;
