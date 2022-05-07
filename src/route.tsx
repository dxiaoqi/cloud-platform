import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from "react";
import RouteList from "./page"
 
const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        {
          RouteList.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                element={<item.component />}
              />
            )
          })
        }
      </Routes>
    </Router>
  );
}

export default RouterComponent;