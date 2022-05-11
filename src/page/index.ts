import Home from "./home";
import ProductPage from "./product";
import Doc from './doc'
const Routers = [
  {
    key: "index",
    path: "/",
    component: Home,
    auth: false,
    exact: true
  },
  {
    key: "productPage",
    path: "/product/:id",
    component: ProductPage,
    auth: false,
    exact: true
  },
  {
    key: "doc",
    path: "/doc",
    component: Doc,
    auth: false,
    exact: true
  },
]
export default Routers;