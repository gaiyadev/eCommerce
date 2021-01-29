import "./App.css";
import Navbar from "./components/Navigation/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignIn from "./components/Auth/Signin";
import SignUp from "./components/Auth/Signup";
import Footer from "./components/Footer/Footer";
import AdminSignIn from "./components/administrator/Auth/Signin";
import AdminSignUp from "./components/administrator/Auth/Signup";
import Dashboard from "./components/administrator/Dashbaord/Dashboard";
import UserDashboard from "./components/Dashbaord/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/signin" exact component={SignIn}></Route>
          <Route path="/signup" exact component={SignUp}></Route>
          <Route path="/admin" exact component={AdminSignIn}></Route>
          <Route path="/admin/signup" exact component={AdminSignUp}></Route>
          <Route path="/home" exact component={Dashboard}></Route>
          <Route path="/dashboard" exact component={UserDashboard}></Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
