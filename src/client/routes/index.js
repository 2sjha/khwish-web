import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Gift from "../pages/gift/Gift";
import Error from "../pages/error/Error";
import Thanks from "../pages/thanks/Thanks";

class AllRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/gift" element={<Gift />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/error" element={<Error />} />

        {/* redirect user to Error page if route does not exist */}
        <Route component={Error} />
      </Routes>
    );
  }
}

export default AllRoutes;