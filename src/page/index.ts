import Home from "./home";
const Routers = [
  {
    key: "index",
    path: "/",
    component: Home,
    auth: false,
    exact: true
  }
]
export default Routers;