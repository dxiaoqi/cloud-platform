import Home from "./home";
import ProductPage from "./product";
import Login from "./login";
import Register from "./register";
import OrderList from "./orderlist";
import Purchase from "./purchase";
import SubmitOrder from "./submitorder";
import ControlBoard from "./menus";
import videoAvatar from './video-avatar'
import Language from './language'
import UserComponent from "./user";
import ApplicationComponent from "./application";
import PasswordComponent from "./password";
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
    key: "login",
    path: "/login",
    component: Login,
    auth: true,
    exact: true
  },
  {
    key: "register",
    path: "/register",
    component: Register,
    auth: true,
    exact: true
  },
  {
    key: "password",
    path: "/password",
    component: PasswordComponent,
    auth: false,
    exact: true
  },
  {
    key: "orderlist",
    path: "/orderlist",
    component: OrderList,
    auth: false,
    exact: true
  },
  {
    key: "purchase",
    path: "/purchase/:id",
    component: Purchase,
    auth: false,
    exact: true
  },
  {
    key: "submit",
    path: "/submitorder/:id",
    component: SubmitOrder,
    auth: false,
    exact: true
  },
  // {
  // key: "user",
  // path: "/user",
  // component: UserComponent,
  // auth: false,
  // exact: true
  // },
  // {
  // key: "application",
  // path: "/application",
  // component: ApplicationComponent,
  // auth: false,
  // exact: true
  // },
  {
    key: "controlboard",
    path: "/controlboard",
    component: ControlBoard,
    auth: false,
    exact: true,
  },
   {
    key: "doc",
    path: "/doc",
    component: Doc,
    auth: false,
    exact: true
  },
  {
    key: 'videoAvatar',
    path: '/videoAvatar',
    component: videoAvatar,
    auth: false,
    exact: true
  }
  , 
  {
    key: 'language',
    path: '/language',
    component: Language,
    auth: false,
    exact: true
  }
]
export default Routers;