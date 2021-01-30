import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignIn from "./components/Auth/Signin";
import SignUp from "./components/Auth/Signup";
import Footer from "./components/Footer/Footer";
import AdminSignIn from "./components/administrator/Auth/Signin";
import AdminSignUp from "./components/administrator/Auth/Signup";
import Dashboard from "./components/administrator/Dashbaord/Dashboard";
import UserDashboard from "./components/Dashbaord/Dashboard";
import AddProduct from "./components/administrator/Products/AddProduct";
import EditProduct from "./components/administrator/Products/EditProduct";
import AdminProfile from "./components/administrator/Auth/Profile";
import UserProfile from "./components/Dashbaord/Profile";
import Orders from "./components/Dashbaord/Orders";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/signin" exact component={SignIn}></Route>
          <Route path="/signup" exact component={SignUp}></Route>

          <Route path="/admin" exact component={AdminSignIn}></Route>
          <Route path="/admin/signup" exact component={AdminSignUp}></Route>
          <Route path="/home" exact component={Dashboard}></Route>
          <Route path="/home/add" exact component={AddProduct}></Route>
          <Route path="/home/edit" exact component={EditProduct}></Route>
          <Route path="/home/profile" exact component={AdminProfile}></Route>

          <Route path="/dashboard" exact component={UserDashboard}></Route>
          <Route
            path="/dashboard/profile"
            exact
            component={UserProfile}
          ></Route>
          <Route
            path="/dashboard/profile"
            exact
            component={UserProfile}
          ></Route>

          <Route path="/dashboard/orders" exact component={Orders}></Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
