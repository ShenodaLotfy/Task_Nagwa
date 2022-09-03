import React, { Component } from "react";

// react router dom
import { HashRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

// component
import Navbar from "./components/Navbar";
import Practice from "./pages/Practice";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";

class App extends Component {
  render() {

    return (
      <>
        <Router>
          <div className="container ">
            <Switch>
              <Route exact path="/" component={Practice} />
              <Route exact path="/practice" component={Practice} />
              <Route exact path="/result/:rank" component={Result} />
              <Route exact component={NotFound} />
              <Route exact path="*" component={NotFound} />
              <Route exact path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
          {/* <Footer /> */}
        </Router>
      </>
    );
  }
}

export default App;
