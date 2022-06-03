import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from "react";
import RouteList from "./page"
const allPath = () => {
  let paths = RouteList;
  RouteList.forEach((item: any) => {
      if (item.children !== undefined && item.children.length > 0) {
          paths = [...paths, ...item.children]
      }
  })
  return paths;
}
const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        {
          allPath().map((item:any) => {           
            return (
                <Route
                  key={item.key}
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