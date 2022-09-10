import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import User from "./pages/user";
import Admin from "./pages/admin";
import Home from "./pages/user/Home/Home";
import Contacts from "./pages/user/Contacts";
import ArticlesPanel from "./pages/user/Articles/Index";
import LoginAdmin from "./pages/admin/Login";
import Article from "./pages/user/Articles/Detail/index";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import SignIn from "./pages/user/Login/index";
import SignUp from "./pages/user/Signup/Signup";
import Detail from "./pages/user/Vounchers/Detail/detail";
import Cart from "./pages/user/Cart/Cart";
import Notfound from "./pages/user/notfound/notfound";
import Categorys from "./pages/user/Categorjy/Categorys";
import UserProfile from "./pages/user/UserProfile/UserProfile";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={"/admin/:path?"}>
            <Admin>
              <Switch>
                <Route path={"/admin"} exact component={LoginAdmin}></Route>

                <Route exact path={"/admin/dashboard"}>
                  <Dashboard />
                </Route>
              </Switch>
            </Admin>
          </Route>

          <Route>
            <User>
              <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/contact" component={Contacts}></Route>
                <Route path="/blog" component={ArticlesPanel}></Route>
                <Route path="/post/:postid" component={Article}></Route>
                <Route path="/vouchers/:slug" component={Detail}></Route>
                <Route path="/login" component={SignIn}></Route>
                <Route path="/register" component={SignUp}></Route>
                <Route path="/cart" component={Cart}></Route>
                <Route path="/categorys/:type" component={Categorys}></Route>
                <Route
                  path="/profile/:username"
                  exact
                  component={UserProfile}
                ></Route>
                <Route component={Notfound} />
              </Switch>
            </User>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
