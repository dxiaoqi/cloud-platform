import Home from "./home";
import ProductPage from "./product";
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
  }
]
export default Routers;