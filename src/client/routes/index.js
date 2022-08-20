import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Gift from "../pages/gift/Gift";
import Error from "../pages/error/Error";
import Thanks from "../pages/thanks/Thanks";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/gift" component={Gift} />
      <Route path="/thanks" component={Thanks} />
      <Route path="/error" component={Error} />

      {/* redirect user to Error page if route does not exist */}
      <Route component={Error} />
    </Switch>
  );
}
