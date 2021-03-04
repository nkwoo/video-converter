import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Main from "./component/main/Main";
import Upload from "./component/upload/Upload";
import RouterNotFound from "./component/exception/RouterNotFound";

function App() {
  return (
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/upload" component={Upload} />
        <Route component={RouterNotFound}/>
      </Switch>
  );
}

export default App;
