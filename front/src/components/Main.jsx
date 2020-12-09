import React from "react";
import { Route, Switch } from "react-router-dom";
import TestSelector from "./TestSelector";
import TestContainer from "../containers/TestContainer";
import PreTestView from "./PreTestView";

const Main = () => (
  <Switch>
    <Route exact path="/test/intro" component={PreTestView} />
    <Route exact path="/" component={TestSelector} />
    <Route path="/tests/:name" component={TestContainer} />
  </Switch>
);

export default Main;
